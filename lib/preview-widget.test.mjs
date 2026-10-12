import assert from "node:assert/strict";
import { test } from "node:test";
import ts from "typescript";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { createColMcpServer } from "./mcp-server.ts";
import { createCatalogueTools } from "./mcp-tools.ts";
import { mountable, PREVIEW_WIDGET_MIME, PREVIEW_WIDGET_URI, previewWidgetHtml, resolveImport } from "./preview-widget.ts";
import { libraries } from "../data/libraries.ts";
import { componentIndex } from "../data/components.ts";
import { libraryDetails } from "../data/library-details/index.ts";
import { libraryCorpus } from "../data/library-corpus/index.ts";
import { compatibility } from "../data/compatibility.ts";

const data = { libraries, componentIndex, details: libraryDetails, corpus: libraryCorpus, compatibility };

test("imports resolve to one shared React and esm.sh packages", () => {
  assert.equal(resolveImport("react"), "react");
  assert.equal(resolveImport("react/jsx-runtime"), "react/jsx-runtime");
  assert.equal(resolveImport("react-dom/client"), "react-dom/client");
  assert.equal(resolveImport("@mantine/core@9.7.1"), "https://esm.sh/@mantine/core@9.7.1?external=react,react-dom");
  assert.equal(resolveImport("reactflow"), "https://esm.sh/reactflow?external=react,react-dom", "only react and react-dom stay bare");
  assert.equal(resolveImport("@mantine/core/styles.css"), "https://esm.sh/@mantine/core/styles.css");
  assert.equal(resolveImport("https://esm.sh/cmdk@1.1.1"), "https://esm.sh/cmdk@1.1.1");
  for (const local of ["./button", "/x", "@/components/ui/button", "~/lib/utils"]) {
    assert.throws(() => resolveImport(local), /inline/, `${local} must ask for inlining`);
  }
});

test("the compiled module mounts its default export", () => {
  const out = mountable("import { Button } from \"x\";\nexport default function Demo() { return null; }");
  assert.ok(out.includes("const __ColComponent = function Demo()"));
  assert.ok(out.trimEnd().endsWith("window.__colMount(__ColComponent);"));
  assert.throws(() => mountable("export const Demo = () => null;"), /export default/);
});

test("the view's inline script is valid JavaScript after embedding", () => {
  const html = previewWidgetHtml();
  const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
  const { diagnostics } = ts.transpileModule(script, { reportDiagnostics: true, compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  assert.deepEqual(diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")), []);
  assert.ok(script.includes("app.ontoolinput"), "the view must read the agent's code from the tool input");
});

test("render_component validates the module and runs nothing on the server", () => {
  const tools = createCatalogueTools(data);
  const ok = tools.invoke("render_component", { code: "export default () => <p>Hi</p>;" });
  assert.equal(ok.isError, undefined);
  assert.equal(ok.structuredContent.status, "sent-to-chat");
  assert.ok(ok.structuredContent.gaps.some((gap) => /terminal/.test(gap)), "must say terminal hosts show nothing");
  assert.equal(tools.invoke("render_component", { code: "" }).isError, true);
});

// Over the wire, as a host sees it: the tool links the view and the view declares its CSP.
test("hosts receive the UI linkage and the view resource", async () => {
  const server = createColMcpServer(data);
  const [client, serverSide] = InMemoryTransport.createLinkedPair();
  await server.connect(serverSide);
  await client.start();
  const inbox = [];
  client.onmessage = (message) => inbox.push(message);
  let nextId = 1;
  const request = async (method, params) => {
    const id = nextId++;
    await client.send({ jsonrpc: "2.0", id, method, params });
    for (let tries = 0; tries < 400; tries++) {
      const reply = inbox.find((message) => message.id === id);
      if (reply) {
        assert.equal(reply.error, undefined, `${method}: ${JSON.stringify(reply.error)}`);
        return reply.result;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    throw new Error(`no response for ${method}`);
  };
  await request("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "col-tests", version: "1.0.0" } });
  await client.send({ jsonrpc: "2.0", method: "notifications/initialized" });

  const { tools } = await request("tools/list", {});
  assert.equal(tools.find((tool) => tool.name === "render_component")?._meta?.ui?.resourceUri, PREVIEW_WIDGET_URI);
  assert.equal(tools.find((tool) => tool.name === "get_component")?._meta, undefined);

  const { contents } = await request("resources/read", { uri: PREVIEW_WIDGET_URI });
  assert.equal(contents[0].mimeType, PREVIEW_WIDGET_MIME);
  assert.deepEqual(contents[0]._meta.ui.csp.resourceDomains, ["https://esm.sh", "https://cdn.jsdelivr.net"]);
  await server.close();
});
