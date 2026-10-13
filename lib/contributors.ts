import { Effect, Schema } from "effect";
import { Actor, listAll, profileOf, type Profile } from "./git-cafe.ts";

const PullRequest = Schema.Struct({
  number: Schema.Number,
  merged_at: Schema.NullOr(Schema.String),
  user: Schema.NullOr(Actor),
});

type PullRequest = Schema.Schema.Type<typeof PullRequest>;

export type Contributor = Profile;

/** Retain Luneri, whose merged git.cafe PRs #36 and #38 are absent from GitHub's PR list. */
const HISTORIC_CONTRIBUTORS: readonly Contributor[] = [
  {
    key: "itsluneri",
    name: "Luneri",
    url: "https://github.com/itsluneri",
    avatarUrl: "https://avatars.githubusercontent.com/u/208310261?v=4",
  },
];

/** Enough for every pull request in the repo today, while bounding the work if it grows. */
const MAX_PAGES = 10;

/** Lists unique authors of merged pull requests, skipping bots and retaining contributors from the old PR source. */
function toContributors(pulls: readonly PullRequest[]): Contributor[] {
  const byKey = new Map(HISTORIC_CONTRIBUTORS.map((contributor) => [contributor.key, contributor]));

  for (const pull of pulls) {
    if (pull.merged_at === null || pull.user === null || pull.user.type === "Bot") continue;
    const profile = profileOf(pull.user);
    if (!byKey.has(profile.key)) byKey.set(profile.key, profile);
  }

  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Loads GitHub pull request authors, cached for an hour, with the historical contributor as a fallback. */
export function getContributors(request: typeof fetch = fetch): Promise<Contributor[]> {
  const load = listAll(request, "pulls", PullRequest, { maxPages: MAX_PAGES, revalidate: 3600 }).pipe(Effect.map(toContributors));

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load GitHub contributors", error);
    return [...HISTORIC_CONTRIBUTORS];
  }))));
}
