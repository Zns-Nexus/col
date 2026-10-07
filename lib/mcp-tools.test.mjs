import assert from "node:assert/strict";
import { test } from "node:test";
import { createCatalogueTools } from "./mcp-tools.ts";
import { libraries } from "../data/libraries.ts";
import { componentIndex } from "../data/components.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { compatibility } from "../data/compatibility.ts";

// The seam under test is `invoke`: one pure request-to-result entry point over
// the real catalogue data. Nothing here goes through HTTP or the MCP SDK.
const tools = createCatalogueTools({
  libraries,
  componentIndex,
  details: libraryDetails,
  corpus: libraryCorpus,
  compatibility,
});

const call = (name, args) => {
  const result = tools.invoke(name, args);
  const text = result.content[0].text;
  return result.isError ? { isError: true, text } : JSON.parse(text);
};

test("search_libraries answers with library ids, source links, and explicit gaps", () => {
  const result = call("search_libraries", { query: "command menu", stacks: ["React", "Tailwind CSS"] });

  assert.equal(result.isError, undefined);
  const hit = result.results.find(({ slug }) => slug === "shadcn-ui");
  assert.ok(hit, "expected shadcn-ui to match 'command menu' with React and Tailwind CSS");
  assert.equal(hit.url, "https://ui.shadcn.com");
  assert.equal(hit.colListingUrl, "https://collection-of-libs.vercel.app/libraries/shadcn-ui");
  assert.ok(
    hit.matchedComponents.some(({ name }) => name === "Command"),
    "expected the Command component to explain the match",
  );

  assert.equal(result.evidence.verification, "partial");
  assert.ok(result.evidence.gaps.some((gap) => /partial/i.test(gap)));
  assert.ok(result.total >= result.results.length);
});

test("search_libraries applies hard filters as exact constraints", () => {
  const result = call("search_libraries", { query: "date picker", stacks: ["Svelte"] });

  const slugs = result.results.map(({ slug }) => slug);
  assert.ok(slugs.includes("shadcn-svelte"), "expected shadcn-svelte for a Svelte date picker");
  assert.equal(slugs.includes("shadcn-ui"), false, "a React library must not pass the Svelte filter");
  for (const hit of result.results) assert.ok(hit.stacks.includes("Svelte"));
});

test("React Bits component names resolve consistently through library and component tools", () => {
  for (const { name, url } of componentIndex["react-bits"]) {
    const libraries = call("search_libraries", { query: `react ${name}` });
    const library = libraries.results.find(({ slug }) => slug === "react-bits");
    assert.ok(library, `expected React Bits for ${name}`);
    assert.equal(library.matchedComponents[0].name, name);
    const components = call("search_components", { query: name, library: "react-bits" });
    assert.equal(components.results[0].id, `react-bits/${name}`);
    assert.equal(components.results[0].url, url);
  }
  const overlap = call("search_libraries", { query: "circular counter" });
  assert.equal(overlap.results.some(({ slug }) => slug === "react-bits"), false);
});

test("natural-language filler words do not block a keyword search", () => {
  const prose = call("search_libraries", { query: "a library for react with tailwind" });
  const keywords = call("search_libraries", { query: "react tailwind" });

  assert.deepEqual(
    prose.results.map(({ slug }) => slug),
    keywords.results.map(({ slug }) => slug),
    "filler words should not change the matched set",
  );
});

test("results are capped and paginated with the total reported", () => {
  const page = call("search_libraries", { limit: 3, offset: 3 });

  assert.equal(page.results.length, 3);
  assert.ok(page.total > page.results.length, "the catalogue holds more than six libraries");
  const firstPage = call("search_libraries", { limit: 3 });
  assert.notDeepEqual(
    page.results.map(({ slug }) => slug),
    firstPage.results.map(({ slug }) => slug),
    "offset should advance through the result set",
  );
});

test("arguments outside the schema come back as an explicit error", () => {
  const result = call("search_libraries", { category: "Not A Category" });

  assert.equal(result.isError, true);
  assert.match(result.text, /category/i);
});

test("an unknown tool name never silently resolves", () => {
  const result = call("search_everything", {});

  assert.equal(result.isError, true);
  assert.match(result.text, /search_everything/);
});

test("component ranking uses the same normalized keywords as matching", () => {
  const library = libraries[0];
  const tools = createCatalogueTools({
    libraries: [library],
    componentIndex: {
      [library.slug]: [
        { name: "Number Field Extended", url: "https://example.test/extended" },
        { name: "Number Field", url: "https://example.test/exact" },
        { name: "Other", aliases: ["number field"], url: "https://example.test/alias" },
        { name: "Field", url: "https://example.test/partial" },
      ],
    },
    details: {},
    corpus: [],
    compatibility: [],
  });

  for (const query of ["number field", "  NUMBER   FIELD  ", "Number\tField", "Number\nField", "Number, Field!", "find a number field component"]) {
    const result = tools.invoke("search_components", { query });
    assert.equal(result.isError, undefined);
    assert.deepEqual(
      result.structuredContent.results.map(({ name }) => name),
      ["Number Field", "Number Field Extended", "Other", "Field"],
      `unexpected ranking for ${JSON.stringify(query)}`,
    );
  }
});
