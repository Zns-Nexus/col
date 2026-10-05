import { McpServer } from "@modelcontextprotocol/server";
import { createCatalogueTools, type CatalogueData } from "./mcp-tools.ts";

/**
 * Adapts the tool layer to the MCP SDK. Each tool definition carries the very
 * zod schema `invoke` validates with, so the schema a client sees and the
 * validation it receives can never drift; this module only wires them together.
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
      },
      (args) => tools.invoke(definition.name, args),
    );
  }
  return server;
}
