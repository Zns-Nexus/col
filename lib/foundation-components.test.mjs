import assert from "node:assert/strict";
import { test } from "node:test";
import { componentIndex } from "../data/components.ts";
import { libraries } from "../data/libraries.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { createDirectorySearch } from "./directory.ts";
import { createCatalogueTools } from "./mcp-tools.ts";

const slugs = ["shadcn-ui", "react-aria", "base-ui", "radix-ui", "ark-ui", "headless-ui", "mantine", "mui"];
const search = createDirectorySearch(libraries, componentIndex);
const tools = createCatalogueTools({ libraries, componentIndex, details: libraryDetails, corpus: [], compatibility: [] });

test("every indexed React foundation component is searchable and resolves to its documented page", () => {
  for (const slug of slugs) {
    assert.ok(componentIndex[slug]?.length, `${slug} needs a component index`);
    for (const component of componentIndex[slug]) {
      const results = search({ query: component.name, category: null, stacks: ["React"], useCases: [], sort: "curated" });
      const library = results.find(({ library }) => library.slug === slug);
      assert.ok(library, `${slug}/${component.name} is missing from library search`);
      assert.equal(library.components[0].url, component.url);

      const result = tools.invoke("search_components", { query: component.name, library: slug });
      assert.equal(result.isError, undefined);
      assert.equal(result.structuredContent.results[0].id, `${slug}/${component.name}`);
      const details = tools.invoke("get_component", { id: `${slug}/${component.name}` });
      assert.equal(details.isError, undefined);
      assert.equal(details.structuredContent.url, component.url);
    }
  }
});

test("foundation search aliases resolve to the intended component and library", () => {
  for (const [slug, query, name] of [
    ["shadcn-ui", "typography", "Typeset"],
    ["react-aria", "color wheel", "ColorWheel"],
    ["headless-ui", "menu", "Dropdown Menu"],
    ["mantine", "command palette", "Spotlight"],
    ["mui", "floating action button", "Fab"],
  ]) {
    const result = tools.invoke("search_components", { query, library: slug });
    assert.equal(result.isError, undefined);
    assert.equal(result.structuredContent.results[0].id, `${slug}/${name}`);
  }
});
