import assert from "node:assert/strict";
import { test } from "node:test";
import { createCatalogueTools } from "./mcp-tools.ts";
import { libraries } from "../data/libraries.ts";
import { componentIndex } from "../data/components.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { compatibility } from "../data/compatibility.ts";

/**
 * The evaluation harness: realistic agent queries mapped to expected hits.
 *
 * Each fixture is grounded in the catalogue as it stands (verified against the
 * data before the expectation was written), so this suite is the gate evidence
 * for search quality: a fixture here fails when ranking regresses, and a
 * future retrieval upgrade must keep these green before it is considered.
 */

const tools = createCatalogueTools({
  libraries,
  componentIndex,
  details: libraryDetails,
  corpus: libraryCorpus,
  compatibility,
});

const call = (name, args) => {
  const result = tools.invoke(name, args);
  assert.equal(result.isError, undefined, `unexpected error: ${result.content[0].text}`);
  return JSON.parse(result.content[0].text);
};

test("the headline agent query finds a fitting library and the component that matched", () => {
  const result = call("search_libraries", { query: "Find an accessible React command menu for our Tailwind setup" });

  const hit = result.results.find(({ slug }) => slug === "shadcn-ui");
  assert.ok(hit, "shadcn/ui is the documented fit for an accessible React command menu");
  assert.ok(
    hit.matchedComponents.some(({ name }) => name === "Command"),
    "the Command component must explain why shadcn/ui matched",
  );
});

test("a natural component phrase resolves through a recorded alias", () => {
  const result = call("search_components", { query: "command palette" });

  assert.deepEqual(
    result.results.map(({ id }) => id),
    ["shadcn-ui/Command", "mantine/Spotlight", "shadcn-svelte/Command", "cmdk/Command"],
    "'command palette' is a recorded alias of Command and Mantine Spotlight",
  );
});

test("alias search also resolves single-word search terms people type", () => {
  assert.ok(
    call("search_components", { query: "typewriter" }).results.some(({ id }) => id === "react-bits/Text Type"),
    "'typewriter' is a recorded alias of react-bits' Text Type",
  );
  assert.ok(
    call("search_components", { query: "datepicker" }).results.some(({ id }) => id === "shadcn-ui/Date Picker"),
    "'datepicker' is a recorded alias of shadcn/ui's Date Picker",
  );
});

test("a stack constraint answers the framework the user is actually on", () => {
  const result = call("search_libraries", { query: "date picker", stacks: ["Svelte"] });

  const hit = result.results.find(({ slug }) => slug === "shadcn-svelte");
  assert.ok(hit, "shadcn-svelte is the documented Svelte fit for a date picker");
  assert.ok(hit.matchedComponents.some(({ name }) => name === "Date Picker"));
  assert.equal(
    result.results.some(({ slug }) => slug === "shadcn-ui"),
    false,
    "a React-only library must not answer a Svelte query",
  );
});

test("a query about nothing in the catalogue returns an honest empty result", () => {
  const result = call("search_libraries", { query: "purple dinosaur zeppelin" });

  assert.deepEqual(result.results, []);
  assert.equal(result.total, 0);
  assert.ok(result.evidence.gaps.length > 0, "even an empty answer states what its coverage cannot rule out");
});

test("every search hit carries source links and explicit gaps", () => {
  for (const result of [
    call("search_libraries", { query: "command menu" }),
    call("search_components", { query: "accordion" }),
  ]) {
    for (const hit of result.results) {
      const url = hit.colListingUrl ?? hit.url;
      assert.match(url, /^https:\/\//, "every hit links to a source");
      assert.ok(["verified", "unverified"].includes(hit.evidence.verification.page));
    }
    assert.ok(result.evidence.gaps.length > 0, "partial coverage must state its gaps on the response");
  }
});

test("compatibility answers stay explicit about what is unknown", () => {
  const recorded = call("get_library", { slug: "ant-design" });
  const react = recorded.compatibility.supported.find(({ subject }) => subject === "react");
  assert.equal(react.status, "supported");
  assert.equal(react.constraint, ">= 18");
  assert.match(react.evidence, /^https:\/\/ant\.design\//);

  const unrecorded = call("get_library", { slug: "reui" });
  assert.deepEqual(unrecorded.compatibility.supported, []);
  assert.ok(
    unrecorded.compatibility.unknown.length > 0,
    "a library with no recorded facts must name its unknown subjects, never guess one",
  );
  assert.ok(unrecorded.evidence.gaps.some((gap) => /unknown/i.test(gap)));
});
