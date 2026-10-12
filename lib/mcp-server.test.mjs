import assert from "node:assert/strict";
import { test } from "node:test";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { createColMcpServer } from "./mcp-server.ts";
import { PREVIEW_WIDGET_URI } from "./preview-widget.ts";
import { libraries } from "../data/libraries.ts";
import { componentIndex } from "../data/components.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { compatibility } from "../data/compatibility.ts";
import { previewStories } from "../data/preview-stories/index.ts";

// The seam under test is the wire: what a client actually receives from the
// server over MCP. These tests speak raw JSON-RPC through linked in-memory
// transports, so the MCP Apps linkage is proven at the protocol boundary —
// tool metadata and UI resource included — not just at the tool layer.

async function connected() {
  const server = createColMcpServer({
    libraries,
    componentIndex,
    details: libraryDetails,
    corpus: libraryCorpus,
    compatibility,
    previewStories,
  });
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  await server.connect(serverSide);
  await clientSide.start();

  const inbox = [];
  let nextId = 1;
  clientSide.onmessage = (message) => inbox.push(message);

  const request = async (method, params) => {
    const id = nextId++;
    clientSide.send({ jsonrpc: "2.0", id, method, params });
    const deadline = Date.now() + 2000;
    while (Date.now() < deadline) {
      const found = inbox.find((message) => message.id === id);
      if (found) {
        assert.equal(found.error, undefined, `unexpected error from ${method}: ${JSON.stringify(found.error)}`);
        return found.result;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    throw new Error(`no response for ${method}`);
  };

  await request("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "col-tests", version: "1.0.0" },
  });
  clientSide.send({ jsonrpc: "2.0", method: "notifications/initialized" });
  return { request };
}

test("tools/list carries the MCP Apps UI linkage on the component tool", async () => {
  const { request } = await connected();
  const { tools } = await request("tools/list", {});

  const component = tools.find((tool) => tool.name === "get_component");
  assert.ok(component, "expected get_component in tools/list");
  assert.equal(component._meta?.ui?.resourceUri, PREVIEW_WIDGET_URI);
  for (const tool of tools) {
    if (tool.name !== "get_component") assert.equal(tool._meta?.ui, undefined);
  }
});

test("resources/read serves the preview widget as a standard MCP Apps resource", async () => {
  const { request } = await connected();
  const { contents } = await request("resources/read", { uri: PREVIEW_WIDGET_URI });

  assert.equal(contents.length, 1);
  assert.equal(contents[0].uri, PREVIEW_WIDGET_URI);
  assert.equal(contents[0].mimeType, "text/html;profile=mcp-app");
  assert.ok(contents[0].text.includes("ui/initialize"), "the widget must run the MCP Apps handshake");
  assert.deepEqual(contents[0]._meta?.ui?.csp?.frameDomains, ["https://collection-of-libs.vercel.app"]);
});
