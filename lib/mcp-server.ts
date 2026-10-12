import { McpServer } from "@modelcontextprotocol/server";
import { createCatalogueTools, type CatalogueData } from "./mcp-tools.ts";
import { PREVIEW_WIDGET_CSP, PREVIEW_WIDGET_MIME, PREVIEW_WIDGET_URI, previewWidgetHtml } from "./preview-widget.ts";

/**
 * Adapts the tool layer to the MCP SDK. Each tool definition carries the very
 * zod schema `invoke` validates with, so the schema a client sees and the
 * validation it receives can never drift; this module only wires them together.
 *
 * It also registers the MCP Apps view that `render_component` links to through
 * `_meta.ui.resourceUri`, so hosts with the extension render the agent's
 * component inline in the chat.
 */
export function createColMcpServer(data: CatalogueData): McpServer {
  const tools = createCatalogueTools(data);
  const server = new McpServer({ name: "col", version: "0.1.0" });

  for (const definition of tools.list()) {
    server.registerTool(
      definition.name,
      {
        title: definition.title,
        description: definition.description,
        inputSchema: definition.args,
        annotations: definition.annotations,
        _meta: definition.meta,
      },
      (args) => tools.invoke(definition.name, args),
    );
  }

  const widgetMeta = { ui: { csp: PREVIEW_WIDGET_CSP } };
  server.registerResource(
    "Component preview",
    PREVIEW_WIDGET_URI,
    {
      title: "Component preview",
      description: "Renders the component module an agent passes to render_component, live in the chat.",
      mimeType: PREVIEW_WIDGET_MIME,
      _meta: widgetMeta,
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: PREVIEW_WIDGET_MIME, text: previewWidgetHtml(), _meta: widgetMeta }],
    }),
  );

  return server;
}
