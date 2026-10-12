const url = "https://github.com/Zns-Nexus/col";

/** Col's code, stars, issues, roadmap, and pull requests live on GitHub. */
export const repo = {
  url,
  cloneUrl: `${url}.git`,
  issues: `${url}/issues`,
  newIssue: `${url}/issues/new`,
  pulls: `${url}/pulls`,
  pull: (number: number) => `${url}/pull/${number}`,
  /** Public repository API; the site caches requests server-side. */
  api: "https://api.github.com/repos/Zns-Nexus/col",
} as const;

/** Link to a file on the default branch. */
export const repoFile = (path: string) => `${url}/blob/main/${path}`;
