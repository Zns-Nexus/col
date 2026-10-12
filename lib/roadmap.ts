import { Effect, Schema } from "effect";
import { listAll } from "./git-cafe.ts";
import { repo } from "./repo.ts";

const Issue = Schema.Struct({
  number: Schema.Number,
  title: Schema.String,
  state: Schema.Literal("open", "closed"),
  state_reason: Schema.optional(Schema.NullOr(Schema.String)),
  labels: Schema.Array(Schema.Union(Schema.String, Schema.Struct({ name: Schema.String }))),
  closed_at: Schema.NullOr(Schema.String),
  // GitHub's issues endpoint also returns pull requests.
  pull_request: Schema.optional(Schema.Unknown),
});

type Issue = Schema.Schema.Type<typeof Issue>;

export type Milestone = {
  number: number;
  title: string;
  url: string;
  /** Completed, labelled "in progress", or planned work. */
  status: "shipped" | "in-progress" | "planned";
  closedAt: string | null;
};

/** Milestones in timeline order: shipped (oldest first), then upcoming (in progress first, then longest planned). */
export type Roadmap = { shipped: Milestone[]; upcoming: Milestone[] };

/** Label that hand-picks milestones. When no issue has it, feature requests stand in. */
const ROADMAP_LABEL = "roadmap";
const FEATURE_LABEL = "enhancement";
/** Open issues with this label are in progress. */
const IN_PROGRESS_LABEL = "in progress";
const SHIPPED_LIMIT = 3;
const UPCOMING_LIMIT = 3;
/** Enough for every issue in the repo today, while bounding the work if it grows. */
const MAX_PAGES = 3;

const hasLabel = (issue: Issue, label: string) => issue.labels.some((entry) => (typeof entry === "string" ? entry : entry.name) === label);

const isInProgress = (issue: Issue) => hasLabel(issue, IN_PROGRESS_LABEL);

/** The roadmap or enhancement label selects planned work. */
const isUpcoming = (issue: Issue) => issue.state === "open";

const toMilestone = (issue: Issue): Milestone => ({
  number: issue.number,
  title: issue.title,
  url: `${repo.issues}/${issue.number}`,
  status: issue.state === "closed" ? "shipped" : isInProgress(issue) ? "in-progress" : "planned",
  closedAt: issue.closed_at,
});

/**
 * Picks the timeline's milestones from labelled GitHub issues. Pull requests
 * and issues closed as not planned are ignored. Shipped keeps the most recent few; upcoming
 * puts in-progress work first, then the oldest open issues.
 */
function toRoadmap(issues: readonly Issue[]): Roadmap {
  const eligible = issues.filter((issue) => issue.pull_request === undefined && issue.state_reason !== "not_planned");
  const curated = eligible.filter((issue) => hasLabel(issue, ROADMAP_LABEL));
  const pool = curated.length > 0 ? curated : eligible.filter((issue) => hasLabel(issue, FEATURE_LABEL));
  const shipped = pool
    .filter((issue) => issue.state === "closed")
    .sort((a, b) => (a.closed_at ?? "").localeCompare(b.closed_at ?? "") || a.number - b.number)
    .slice(-SHIPPED_LIMIT);
  const upcoming = pool
    .filter(isUpcoming)
    .sort((a, b) => Number(isInProgress(b)) - Number(isInProgress(a)) || a.number - b.number)
    .slice(0, UPCOMING_LIMIT);
  return { shipped: shipped.map(toMilestone), upcoming: upcoming.map(toMilestone) };
}

/**
 * Loads the roadmap from the repo's GitHub issues, cached for five minutes
 * to match the homepage's revalidation. Returns null when GitHub is
 * unavailable or the response is not the expected shape, so the page can show
 * a fallback.
 */
export function getRoadmap(request: typeof fetch = fetch): Promise<Roadmap | null> {
  const load = listAll(request, "issues", Issue, { maxPages: MAX_PAGES, revalidate: 300 }).pipe(Effect.map(toRoadmap));

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load the GitHub roadmap", error);
    return null;
  }))));
}
