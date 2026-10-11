import { Effect, Schema } from "effect";
import { Actor, listAll, profileOf, type Profile } from "./git-cafe.ts";

const PullRequest = Schema.Struct({
  number: Schema.Number,
  state: Schema.String,
  author: Actor,
});

type PullRequest = Schema.Schema.Type<typeof PullRequest>;

/** A person with at least one merged pull request; `contributions` counts them. */
export type Contributor = Profile & { contributions: number };

/** Enough for every pull request in the repo today, while bounding the work if it grows. */
const MAX_PAGES = 10;

/** Groups merged pull requests by author, skipping bots and removed accounts, most contributions first. */
function toContributors(pulls: readonly PullRequest[]): Contributor[] {
  const byKey = new Map<string, Contributor>();

  for (const pull of pulls) {
    if (pull.state !== "merged") continue;
    if (pull.author.kind === "github" && pull.author.accountType === "bot") continue;
    const profile = profileOf(pull.author);
    if (!profile) continue;
    const existing = byKey.get(profile.key);
    byKey.set(profile.key, existing ? { ...existing, contributions: existing.contributions + 1 } : { ...profile, contributions: 1 });
  }

  return [...byKey.values()].sort((a, b) => b.contributions - a.contributions || a.name.localeCompare(b.name));
}

/** Loads contributors from the repo's git.cafe pull requests, cached for an hour. Returns an empty list when the data is unavailable or invalid. */
export function getContributors(request: typeof fetch = fetch): Promise<Contributor[]> {
  const load = listAll(request, "pulls", PullRequest, { maxPages: MAX_PAGES, revalidate: 3600 }).pipe(Effect.map(toContributors));

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load git.cafe contributors", error);
    return [] as Contributor[];
  }))));
}
