import { Effect, Schema } from "effect";
import { listAll } from "./git-cafe.ts";

const PullRequest = Schema.Struct({
  number: Schema.Number,
  title: Schema.String,
  state: Schema.String,
  targetBranch: Schema.String,
});

/** Reads merged changes to main, ordered by PR number, with a five-minute cache. */
export function getVersionHistory(request: typeof fetch = fetch) {
  const load = listAll(request, "pulls", PullRequest, { maxPages: Infinity, revalidate: 300 }).pipe(
    Effect.map((pulls) => pulls.filter((pull) => pull.state === "merged" && pull.targetBranch === "main").sort((a, b) => b.number - a.number)),
  );

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load git.cafe version history", error);
    return null;
  }))));
}
