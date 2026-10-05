/**
 * Reuse permission for documentation snapshots, recorded before anything from
 * a source is ingested. "unknown" is the honest default: a snapshot without a
 * recorded permission is never served.
 */
export type PermissionStatus = "granted" | "denied" | "unknown";

export interface ReusePermission {
  status: PermissionStatus;
  /** Where the permission decision is recorded (license page, issue, or written grant). */
  source: string;
  /** ISO timestamp the permission was last checked against that source. */
  checkedAt: string;
}

/** One captured documentation page from a library's official site. */
export interface DocSnapshot {
  /** Page title as the source presents it. */
  title: string;
  /** Canonical URL the snapshot was fetched from. */
  url: string;
  /** ISO timestamp of the fetch. */
  fetchedAt: string;
  /** Source revision (git tag, commit, or version) the page documented. */
  sourceRevision: string;
  /** The retrieved evidence: setup steps, API surface, or example code. */
  content: string;
}

/** Deep-coverage documentation entry for one library. */
export interface LibraryCorpusEntry {
  /** Owning library slug, matching `data/libraries.ts`. */
  slug: string;
  /** The recorded reuse decision gating everything below. */
  permission: ReusePermission;
  snapshots: DocSnapshot[];
}
