const url = "https://git.cafe/screen/col";

/**
 * Col's home on git.cafe, which holds the code, stars, issues, and roadmap.
 * GitHub stays a mirror that Vercel deploys from until Vercel and Cloudflare
 * can deploy from git.cafe directly.
 */
export const repo = {
  url,
  cloneUrl: `${url}.git`,
  issues: `${url}/issues`,
  newIssue: `${url}/issues/new`,
  pulls: `${url}/pulls`,
  /** Public JSON API for this repository. It sends no CORS headers, so browsers must go through `/api/stars`. */
  api: "https://git.cafe/api/repos/screen/col",
} as const;

/** Link to a file on the default branch. */
export const repoFile = (path: string) => `${url}/blob/main/${path}`;
