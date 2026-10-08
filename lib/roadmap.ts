import { Effect, Schema } from "effect";
import { listAll } from "./git-cafe.ts";
import { repo } from "./repo.ts";

const Issue = Schema.Struct({
  number: Schema.Number,
  title: Schema.String,
  /** git.cafe's workflow state. Triage, backlog, and unstarted are open; completed and canceled are closed. */
  stateType: Schema.Literal("triage", "backlog", "unstarted", "started", "completed", "canceled"),
  labels: Schema.Array(Schema.Struct({ name: Schema.String })),
  closedAt: Schema.NullOr(Schema.String),
});

type Issue = Schema.Schema.Type<typeof Issue>;

export type Milestone = {
  number: number;
  title: string;
  url: string;
  /** Completed, started (or labelled "in progress"), or accepted but not started. */
  status: "shipped" | "in-progress" | "planned";
  closedAt: string | null;
};

/** Milestones in timeline order: shipped (oldest first), then upcoming (in progress first, then longest planned). */
export type Roadmap = { shipped: Milestone[]; upcoming: Milestone[] };

/** Label that hand-picks milestones. When no issue has it, feature requests stand in. */
const ROADMAP_LABEL = "roadmap";
const FEATURE_LABEL = "enhancement";
/** Issues imported from GitHub mark ongoing work with this label instead of the started state. */
const IN_PROGRESS_LABEL = "in progress";
const SHIPPED_LIMIT = 3;
const UPCOMING_LIMIT = 3;
/** Enough for every issue in the repo today, while bounding the work if it grows. */
const MAX_PAGES = 3;

const hasLabel = (issue: Issue, label: string) => issue.labels.some(({ name }) => name === label);

const isInProgress = (issue: Issue) => issue.stateType === "started" || hasLabel(issue, IN_PROGRESS_LABEL);

/** Accepted, still-open work. Triage is excluded until someone accepts the issue. */
const isUpcoming = (issue: Issue) => issue.stateType === "backlog" || issue.stateType === "unstarted" || issue.stateType === "started";

const toMilestone = (issue: Issue): Milestone => ({
  number: issue.number,
  title: issue.title,
  url: `${repo.issues}/${issue.number}`,
  status: issue.stateType === "completed" ? "shipped" : isInProgress(issue) ? "in-progress" : "planned",
  closedAt: issue.closedAt,
});

/**
 * Picks the timeline's milestones from git.cafe issues. Canceled and
 * untriaged issues are ignored. Shipped keeps the most recent few; upcoming
 * puts in-progress work first, then the oldest open issues.
 */
function toRoadmap(issues: readonly Issue[]): Roadmap {
  const curated = issues.filter((issue) => hasLabel(issue, ROADMAP_LABEL));
  const pool = curated.length > 0 ? curated : issues.filter((issue) => hasLabel(issue, FEATURE_LABEL));
  const shipped = pool
    .filter((issue) => issue.stateType === "completed")
    .sort((a, b) => (a.closedAt ?? "").localeCompare(b.closedAt ?? "") || a.number - b.number)
    .slice(-SHIPPED_LIMIT);
  const upcoming = pool
    .filter(isUpcoming)
    .sort((a, b) => Number(isInProgress(b)) - Number(isInProgress(a)) || a.number - b.number)
    .slice(0, UPCOMING_LIMIT);
  return { shipped: shipped.map(toMilestone), upcoming: upcoming.map(toMilestone) };
}

/**
 * Loads the roadmap from the repo's git.cafe issues, cached for five minutes
 * to match the homepage's revalidation. Returns null when git.cafe is
 * unavailable or the response is not the expected shape, so the page can show
 * a fallback.
 */
export function getRoadmap(request: typeof fetch = fetch): Promise<Roadmap | null> {
  const load = listAll(request, "issues", Issue, { maxPages: MAX_PAGES, revalidate: 300 }).pipe(Effect.map(toRoadmap));

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load the git.cafe roadmap", error);
    return null;
  }))));
}
