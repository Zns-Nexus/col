import assert from "node:assert/strict";
import { test } from "node:test";
import { validateCorpusEntry, admissibleSnapshots } from "./corpus.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { libraries } from "../data/libraries.ts";

// The seam under test is the corpus validator: what it refuses to admit, and
// what it will serve. Ingestion is blocked without a recorded permission.

const permission = { status: "granted", source: "https://example.com/license", checkedAt: "2026-10-01" };
const snapshot = {
  title: "Installation",
  url: "https://example.com/docs/install",
  fetchedAt: "2026-10-01",
  sourceRevision: "v1.2.3",
  content: "npm i example",
};

test("rejects an entry with no recorded permission", () => {
  const issues = validateCorpusEntry({ slug: "example", permission: { ...permission, status: "unknown" }, snapshots: [snapshot] });

  assert.ok(issues.some(({ message }) => /permission/i.test(message)));
});

test("rejects a snapshot without its fetch date and source revision", () => {
  const stale = { ...snapshot, fetchedAt: "", sourceRevision: "" };
  const issues = validateCorpusEntry({ slug: "example", permission, snapshots: [stale] });

  assert.ok(issues.some(({ message }) => /fetchedAt/.test(message)));
  assert.ok(issues.some(({ message }) => /sourceRevision/.test(message)));
});

test("a granted permission with complete snapshots validates clean", () => {
  assert.deepEqual(validateCorpusEntry({ slug: "example", permission, snapshots: [snapshot] }), []);
});

test("snapshots are served only under a granted permission", () => {
  const entry = { slug: "example", permission: { ...permission, status: "denied" }, snapshots: [snapshot] };

  assert.deepEqual(admissibleSnapshots(entry), []);
  assert.deepEqual(admissibleSnapshots({ ...entry, permission }), [snapshot]);
});

test("every corpus entry validates clean and names a real library", () => {
  for (const entry of libraryCorpus) {
    assert.deepEqual(validateCorpusEntry(entry), [], `corpus entry "${entry.slug}" must pass its own validator`);
    assert.ok(libraries.some(({ slug }) => slug === entry.slug), `no library named "${entry.slug}"`);
  }
});
