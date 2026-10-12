import { McpServer } from "@modelcontextprotocol/server";
import { createCatalogueTools, type CatalogueData } from "./mcp-tools.ts";
import { PREVIEW_WIDGET_URI, previewWidgetHtml } from "./preview-widget.ts";
import { siteUrl } from "./site.ts";

/** The standard MCP Apps UI resource mime type (SEP-1865). */
const PREVIEW_WIDGET_MIME = "text/html;profile=mcp-app";

/**
 * Adapts the tool layer to the MCP SDK. Each tool definition carries the very
 * zod schema `invoke` validates with, so the schema a client sees and the
 * validation it receives can never drift; this module only wires them together.
 *
 * It also registers the MCP Apps preview widget — one generic UI resource that
 * frames Col's shared preview page — and links it from the component tool via
 * `_meta.ui.resourceUri`. Hosts without the extension read the tool's text and
 * image content as before.
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

  const widgetMeta = { ui: { prefersBorder: false, csp: { frameDomains: [siteUrl] } } };

  server.registerResource(
    "Component preview",
    PREVIEW_WIDGET_URI,
    {
      title: "Component preview",
      description: "Renders Col's component preview in a use-case scene, framed from Col's own preview page.",
      mimeType: PREVIEW_WIDGET_MIME,
      _meta: widgetMeta,
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: PREVIEW_WIDGET_MIME, text: previewWidgetHtml(), _meta: widgetMeta }],
    }),
  );

  return server;
}
