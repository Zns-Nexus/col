import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveCompatibility, compatibilityReport } from "./compatibility.ts";
import { compatibility } from "../data/compatibility.ts";
import { libraries } from "../data/libraries.ts";

// The seam under test is the compatibility resolver: what it reports for a
// subject, and that unknowns stay explicit rather than being substituted.

const facts = [
  { subject: "react", constraint: ">= 18", status: "supported", evidence: "https://example.com/docs" },
  { subject: "react-dom", constraint: ">= 18", status: "supported", evidence: "https://example.com/docs" },
];
const subjects = ["react", "react-dom", "vue", "node"];

test("resolves a recorded fact with its constraint and evidence", () => {
  const fact = resolveCompatibility(facts, "react");

  assert.equal(fact.status, "supported");
  assert.equal(fact.constraint, ">= 18");
  assert.equal(fact.evidence, "https://example.com/docs");
});

test("an unrecorded subject is unknown, never inferred from a neighbour", () => {
  const fact = resolveCompatibility(facts, "vue");

  assert.equal(fact.status, "unknown");
  assert.equal(fact.constraint, "");
  assert.equal(fact.evidence, "");
});

test("the report distinguishes supported, unsupported, and unknown", () => {
  const report = compatibilityReport(
    [...facts, { subject: "node", constraint: "< 14", status: "unsupported", evidence: "https://example.com/docs" }],
    subjects,
  );

  assert.equal(report.supported.map(({ subject }) => subject).join(","), "react,react-dom");
  assert.equal(report.unsupported.map(({ subject }) => subject).join(","), "node");
  assert.deepEqual(report.unknown, ["vue"]);
});

test("recorded facts name a real library and cite an official source", () => {
  for (const entry of compatibility) {
    assert.ok(libraries.some(({ slug }) => slug === entry.slug), `no library named "${entry.slug}"`);
    for (const fact of entry.facts) {
      if (fact.status === "unknown") continue;
      assert.ok(fact.constraint !== "", `${entry.slug}/${fact.subject} must state its constraint`);
      assert.match(fact.evidence, /^https:\/\//, `${entry.slug}/${fact.subject} must cite its source`);
    }
  }
});
