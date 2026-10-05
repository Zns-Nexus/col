import type { DocSnapshot, LibraryCorpusEntry, ReusePermission } from "../data/library-corpus/types";

/**
 * The corpus validator: what may be ingested into the documentation corpus,
 * and what may be served from it.
 *
 * `validateCorpusEntry` reports every reason an entry would be refused at
 * contribution time; `admissibleSnapshots` is the serving-side check that
 * re-looks at the recorded permission instead of trusting the entry.
 */

export interface CorpusIssue {
  path: string;
  message: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[0-9:.]+Z?)?$/;

function validatePermission(permission: ReusePermission, issues: CorpusIssue[]): void {
  if (!["granted", "denied", "unknown"].includes(permission.status)) {
    issues.push({ path: "permission.status", message: `permission.status must be granted, denied, or unknown, got "${permission.status}"` });
  }
  if (permission.status === "unknown") {
    issues.push({ path: "permission", message: "permission must be recorded (granted or denied) before ingestion; unknown blocks the entry" });
  }
  if (permission.source.trim() === "") {
    issues.push({ path: "permission.source", message: "permission.source must name where the decision is recorded" });
  }
  if (!ISO_DATE.test(permission.checkedAt)) {
    issues.push({ path: "permission.checkedAt", message: `permission.checkedAt must be an ISO date, got "${permission.checkedAt}"` });
  }
}

function validateSnapshot(snapshot: DocSnapshot, path: string, issues: CorpusIssue[]): void {
  if (snapshot.title.trim() === "") issues.push({ path: `${path}.title`, message: `${path}.title must not be empty` });
  if (!/^https:\/\//.test(snapshot.url)) issues.push({ path: `${path}.url`, message: `${path}.url must be an https URL` });
  if (!ISO_DATE.test(snapshot.fetchedAt)) {
    issues.push({ path: `${path}.fetchedAt`, message: `${path}.fetchedAt must be an ISO date, got "${snapshot.fetchedAt}"` });
  }
  if (snapshot.sourceRevision.trim() === "") {
    issues.push({ path: `${path}.sourceRevision`, message: `${path}.sourceRevision must name the revision the page documented` });
  }
  if (snapshot.content.trim() === "") issues.push({ path: `${path}.content`, message: `${path}.content must not be empty` });
}

/** Reports every problem with an entry; empty means the entry may be ingested. */
export function validateCorpusEntry(entry: LibraryCorpusEntry): CorpusIssue[] {
  const issues: CorpusIssue[] = [];
  if (entry.slug.trim() === "") issues.push({ path: "slug", message: "slug must not be empty" });

  if (entry.permission.status !== "granted" && entry.snapshots.length > 0) {
    issues.push({
      path: "snapshots",
      message: `permission is "${entry.permission.status}", so the entry must hold no snapshots; ingestion is blocked until permission is granted`,
    });
  }
  validatePermission(entry.permission, issues);
  entry.snapshots.forEach((snapshot, index) => validateSnapshot(snapshot, `snapshots[${index}]`, issues));
  return issues;
}

/** The snapshots this entry may serve — empty unless permission is granted. */
export function admissibleSnapshots(entry: LibraryCorpusEntry): DocSnapshot[] {
  return entry.permission.status === "granted" ? entry.snapshots : [];
}
