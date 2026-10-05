import { pageMetadata } from "@/lib/site";
import { IntegrationsExplorer } from "@/components/IntegrationsExplorer";

export const metadata = pageMetadata(
  "/integrations",
  "MCP Servers and Connectors for UI Libraries | Col",
  "MCP servers and connectors for UI libraries and design tools. Filter by client, then copy setup for Claude Code, Cursor, VS Code, or Codex.",
);

export default async function IntegrationsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return <IntegrationsExplorer initialQuery={q} />;
}
