import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveCompatibility, compatibilityReport } from "./compatibility.ts";
import { compatibility } from "../data/compatibility.ts";
import { libraries } from "../data/libraries.ts";
import { libraryDetails } from "../data/library-details/index.ts";

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

test("recorded compatibility never contradicts the library's own getting-started text", () => {
  const claim = /react\s*(\d+(?:\.\d+)?)\s*(?:\+| or newer| or later)/i;
  const violations = [];
  for (const library of libraries) {
    const details = libraryDetails[library.slug];
    const text = [...(details?.gettingStarted ?? []), details?.agentPrompt ?? ""].join(" ");
    const match = text.match(claim);
    if (!match) continue;
    const recorded = compatibility.flatMap((entry) => (entry.slug === library.slug ? entry.facts : []));
    const reactFacts = recorded.filter((fact) => fact.subject === "react" && fact.status === "supported");
    if (!reactFacts.some((fact) => fact.constraint.includes(match[1]))) {
      violations.push(`${library.slug} (docs claim React ${match[1]}+)`);
    }
  }
  assert.deepEqual(violations, [], "these libraries claim a React version in text with no matching recorded fact");
});
