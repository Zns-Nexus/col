import assert from "node:assert/strict";
import { test } from "node:test";
import { PREVIEW_WIDGET_URI, previewWidgetHtml } from "./preview-widget.ts";
import { createCatalogueTools } from "./mcp-tools.ts";
import { libraries } from "../data/libraries.ts";
import { componentIndex } from "../data/components.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { compatibility } from "../data/compatibility.ts";
import { previewStories } from "../data/preview-stories/index.ts";

// The seams under test are the widget template and the tool's UI linkage: the
// standard MCP Apps handshake a host uses to render Col's preview inline.

const tools = createCatalogueTools({
  libraries,
  componentIndex,
  details: libraryDetails,
  corpus: libraryCorpus,
  compatibility,
  previewStories,
});

test("the widget resource is a standard MCP Apps ui:// HTML resource", () => {
  assert.match(PREVIEW_WIDGET_URI, /^ui:\/\/.+/);
  const html = previewWidgetHtml();
  assert.ok(html.includes("<!doctype html>"));
});

test("the widget listens for tool results and frames only Col's own preview pages", () => {
  const html = previewWidgetHtml();
  assert.ok(html.includes("ui/initialize"), "the view must run the MCP Apps handshake");
  assert.ok(html.includes("ui/notifications/tool-result"), "the view must render from the tool result");
  assert.ok(html.includes("https://collection-of-libs.vercel.app/preview/"), "the frame must be restricted to Col's preview pages");
});

test("the component tool declares the widget, and no other tool does", () => {
  const definitions = tools.list();
  const component = definitions.find((definition) => definition.name === "get_component");
  assert.deepEqual(component?.meta, { ui: { resourceUri: PREVIEW_WIDGET_URI } });
  for (const definition of definitions) {
    if (definition.name !== "get_component") assert.equal(definition.meta, undefined);
  }
});
