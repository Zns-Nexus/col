import { Effect, Schema } from "effect";

const Issue = Schema.Struct({
  number: Schema.Number,
  title: Schema.String,
  html_url: Schema.String,
  state: Schema.Literal("open", "closed"),
  state_reason: Schema.optional(Schema.NullOr(Schema.String)),
  labels: Schema.Array(Schema.Struct({ name: Schema.String })),
  closed_at: Schema.NullOr(Schema.String),
  /** Present only on pull requests, which the issues endpoint also returns. */
  pull_request: Schema.optional(Schema.Unknown),
});

const Issues = Schema.Array(Issue);

type GitHubIssue = Schema.Schema.Type<typeof Issue>;

export type Milestone = {
  number: number;
  title: string;
  url: string;
  /** Closed as completed, open with the "in progress" label, or open and planned. */
  status: "shipped" | "in-progress" | "planned";
  closedAt: string | null;
};

/** Milestones in timeline order: shipped (oldest first), then upcoming (in progress first, then longest planned). */
export type Roadmap = { shipped: Milestone[]; upcoming: Milestone[] };

/** Label that hand-picks milestones. When no issue has it, feature requests stand in. */
const ROADMAP_LABEL = "roadmap";
const FEATURE_LABEL = "enhancement";
const IN_PROGRESS_LABEL = "in progress";
const SHIPPED_LIMIT = 3;
const UPCOMING_LIMIT = 3;
/** Enough for every issue in the repo today, while bounding the work if it grows. */
const MAX_PAGES = 3;

const hasLabel = (issue: GitHubIssue, label: string) => issue.labels.some(({ name }) => name === label);

const toMilestone = (issue: GitHubIssue): Milestone => ({
  number: issue.number,
  title: issue.title,
  url: issue.html_url,
  status: issue.state === "closed" ? "shipped" : hasLabel(issue, IN_PROGRESS_LABEL) ? "in-progress" : "planned",
  closedAt: issue.closed_at,
});

/**
 * Picks the timeline's milestones from GitHub issues. Pull requests and issues
 * closed as anything but completed are ignored. Shipped keeps the most recent
 * few; upcoming puts in-progress work first, then the oldest open issues.
 */
function toRoadmap(issues: readonly GitHubIssue[]): Roadmap {
  const real = issues.filter((issue) => issue.pull_request === undefined);
  const curated = real.filter((issue) => hasLabel(issue, ROADMAP_LABEL));
  const pool = curated.length > 0 ? curated : real.filter((issue) => hasLabel(issue, FEATURE_LABEL));
  const shipped = pool
    .filter((issue) => issue.state === "closed" && issue.state_reason === "completed")
    .sort((a, b) => (a.closed_at ?? "").localeCompare(b.closed_at ?? "") || a.number - b.number)
    .slice(-SHIPPED_LIMIT);
  const upcoming = pool
    .filter((issue) => issue.state === "open")
    .sort((a, b) => Number(hasLabel(b, IN_PROGRESS_LABEL)) - Number(hasLabel(a, IN_PROGRESS_LABEL)) || a.number - b.number)
    .slice(0, UPCOMING_LIMIT);
  return { shipped: shipped.map(toMilestone), upcoming: upcoming.map(toMilestone) };
}

/**
 * Loads the roadmap from the repo's GitHub issues, cached for five minutes to
 * match the homepage's revalidation. Returns null when GitHub is unavailable or
 * the response is not the expected shape, so the page can show a fallback.
 */
export function getRoadmap(request: typeof fetch = fetch): Promise<Roadmap | null> {
  const load = Effect.gen(function* () {
    const issues: GitHubIssue[] = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const response = yield* Effect.tryPromise(() =>
        request(`https://api.github.com/repos/screen-gd/Col/issues?state=all&per_page=100&page=${page}`, {
          headers: { Accept: "application/vnd.github+json", "User-Agent": "Col-directory" },
          next: { revalidate: 300 },
        }),
      );

      if (!response.ok) return yield* Effect.fail(new Error(`GitHub issues returned ${response.status}`));

      const payload: unknown = yield* Effect.tryPromise(() => response.json());
      const batch = yield* Schema.decodeUnknown(Issues)(payload);
      issues.push(...batch);
      if (batch.length < 100) break;
    }

    return toRoadmap(issues);
  });

  return Effect.runPromise(load.pipe(Effect.catchAll((error) => Effect.sync(() => {
    console.warn("Unable to load the GitHub roadmap", error);
    return null;
  }))));
}
