import { Effect, Schema } from "effect";
import { repo } from "./repo.ts";

/** Public GitHub identity on an issue or pull request. */
export const Actor = Schema.Struct({
  login: Schema.String,
  type: Schema.String,
  html_url: Schema.String,
  avatar_url: Schema.NullOr(Schema.String),
});

export type Actor = Schema.Schema.Type<typeof Actor>;
export type Profile = { key: string; name: string; url: string; avatarUrl: string | null };

export function profileOf(actor: Actor): Profile {
  return { key: actor.login, name: actor.login, url: actor.html_url, avatarUrl: actor.avatar_url };
}

const PAGE_SIZE = 100;
const headers = { Accept: "application/vnd.github+json" };

/** Reads GitHub list pages, validating every record and retaining the caller's cache policy. */
export function listAll<A, I>(
  request: typeof fetch,
  path: string,
  item: Schema.Schema<A, I>,
  { maxPages, revalidate }: { maxPages: number; revalidate: number },
) {
  return Effect.gen(function* () {
    const items: A[] = [];
    for (let page = 1; page <= maxPages; page += 1) {
      const query = new URLSearchParams({ state: "all", per_page: String(PAGE_SIZE), page: String(page) });
      const response = yield* Effect.tryPromise(() =>
        request(`${repo.api}/${path}?${query}`, { headers, next: { revalidate } }),
      );
      if (!response.ok) return yield* Effect.fail(new Error(`GitHub ${path} returned ${response.status}`));
      const payload: unknown = yield* Effect.tryPromise(() => response.json());
      items.push(...(yield* Schema.decodeUnknown(Schema.Array(item))(payload)));
      if (!response.headers.get("link")?.includes('rel="next"')) break;
    }
    return items;
  });
}

const Star = Schema.Struct({ stargazers_count: Schema.Number });

/** The repository's star count, cached for five minutes, or null when GitHub is unavailable. */
export function getStarCount(request: typeof fetch = fetch): Promise<number | null> {
  const load = Effect.gen(function* () {
    const response = yield* Effect.tryPromise(() => request(repo.api, { headers, next: { revalidate: 300 } }));
    if (!response.ok) return yield* Effect.fail(new Error(`GitHub stars returned ${response.status}`));
    const payload: unknown = yield* Effect.tryPromise(() => response.json());
    return (yield* Schema.decodeUnknown(Star)(payload)).stargazers_count;
  });
  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load the GitHub star count", error);
    return null;
  }))));
}
