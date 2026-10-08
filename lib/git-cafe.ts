import { Effect, Schema } from "effect";
import { repo } from "./repo.ts";

const origin = "https://git.cafe";

/** Who opened an issue or pull request: a git.cafe account, a GitHub account imported with the repo, or a removed account. */
export const Actor = Schema.Union(
  Schema.Struct({
    kind: Schema.Literal("local"),
    handle: Schema.String,
    avatarUrl: Schema.NullOr(Schema.String),
  }),
  Schema.Struct({
    kind: Schema.Literal("github"),
    login: Schema.String,
    accountType: Schema.Literal("user", "organization", "bot"),
    avatarUrl: Schema.NullOr(Schema.String),
    /** The git.cafe account this GitHub account is linked to, if any. */
    linkedProfile: Schema.NullOr(Schema.Struct({ handle: Schema.String, avatarUrl: Schema.NullOr(Schema.String) })),
  }),
  Schema.Struct({ kind: Schema.Literal("unavailable") }),
);

export type Actor = Schema.Schema.Type<typeof Actor>;

/** A person's public identity. `key` is shared by a git.cafe account and the GitHub account linked to it. */
export type Profile = { key: string; name: string; url: string; avatarUrl: string | null };

/** git.cafe serves avatars as site-relative paths. */
const absolute = (path: string | null) => (path === null ? null : new URL(path, origin).href);

/**
 * Resolves an actor to a profile: their git.cafe page when they have an
 * account, otherwise their GitHub page. Removed accounts have none.
 */
export function profileOf(actor: Actor): Profile | null {
  switch (actor.kind) {
    case "local":
      return { key: actor.handle, name: actor.handle, url: `${origin}/${actor.handle}`, avatarUrl: absolute(actor.avatarUrl) };
    case "github": {
      const linked = actor.linkedProfile;
      return linked
        ? { key: linked.handle, name: linked.handle, url: `${origin}/${linked.handle}`, avatarUrl: absolute(linked.avatarUrl ?? actor.avatarUrl) }
        : { key: `github:${actor.login}`, name: actor.login, url: `https://github.com/${actor.login}`, avatarUrl: absolute(actor.avatarUrl) };
    }
    case "unavailable":
      return null;
  }
}

const PAGE_SIZE = 100;

/**
 * Reads up to `maxPages` pages of a git.cafe list endpoint (`issues`,
 * `pulls`, ...) through its `next` cursor. Fails on an HTTP error or a
 * response that does not match `item`.
 */
export function listAll<A, I>(
  request: typeof fetch,
  path: string,
  item: Schema.Schema<A, I>,
  { maxPages, revalidate }: { maxPages: number; revalidate: number },
) {
  const Page = Schema.Struct({ items: Schema.Array(item), next: Schema.NullOr(Schema.String) });

  return Effect.gen(function* () {
    const items: A[] = [];
    let after: string | null = null;

    for (let page = 0; page < maxPages; page += 1) {
      const query = new URLSearchParams({ limit: String(PAGE_SIZE), ...(after === null ? {} : { after }) });
      const response = yield* Effect.tryPromise(() =>
        request(`${repo.api}/${path}?${query}`, { headers: { Accept: "application/json" }, next: { revalidate } }),
      );

      if (!response.ok) return yield* Effect.fail(new Error(`git.cafe ${path} returned ${response.status}`));

      const payload: unknown = yield* Effect.tryPromise(() => response.json());
      const batch = yield* Schema.decodeUnknown(Page)(payload);
      items.push(...batch.items);
      after = batch.next;
      if (after === null) break;
    }

    return items;
  });
}

const Star = Schema.Struct({ count: Schema.Number });

/** The repo's star count, cached for five minutes, or null when git.cafe is unavailable. */
export function getStarCount(request: typeof fetch = fetch): Promise<number | null> {
  const load = Effect.gen(function* () {
    const response = yield* Effect.tryPromise(() =>
      request(`${repo.api}/star`, { headers: { Accept: "application/json" }, next: { revalidate: 300 } }),
    );
    if (!response.ok) return yield* Effect.fail(new Error(`git.cafe stars returned ${response.status}`));
    const payload: unknown = yield* Effect.tryPromise(() => response.json());
    return (yield* Schema.decodeUnknown(Star)(payload)).count;
  });

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load the git.cafe star count", error);
    return null;
  }))));
}
