import { DocsCode, DocsHeader, DocsLinks, DocsList, DocsNote, DocsSection, DocsText } from "@/components/DocsUI";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata = pageMetadata(
  "/mcp",
  "Set up Col MCP | Col",
  "Connect Col to Claude Code, Codex, Cursor, or VS Code to search UI libraries and verified components.",
);

const endpoint = `${siteUrl}/api/mcp`;

export default function McpPage() {
  return (
    <article>
      <DocsHeader title="Set up Col MCP" lead="Search Col’s libraries and verified components from your coding agent." />

      <DocsSection title="Connect your client">
        <DocsText>Col hosts a read-only MCP server over Streamable HTTP. You need an MCP client with remote HTTP support; no Col account, API key, or local server is required.</DocsText>
        <DocsCode code={endpoint} label="Server URL" />
        <DocsText>Choose your client below. Keep any servers already in its configuration.</DocsText>
        <DocsLinks items={[
          { href: "#claude-code", title: "Claude Code", text: "Add Col from the terminal." },
          { href: "#codex", title: "Codex", text: "Use the CLI or your config file." },
          { href: "#cursor", title: "Cursor", text: "Add Col to your MCP configuration." },
          { href: "#vs-code", title: "VS Code", text: "Connect Col from the Command Palette." },
          { href: "/mcp/agents#set-up-the-connection", title: "Let your agent set it up", text: "Copy the setup prompt." },
        ]} />
      </DocsSection>

      <DocsSection title="Claude Code">
        <DocsText>With Claude Code installed, run this command to make Col available across your projects. Use <code>--scope project</code> instead of <code>--scope user</code> to save it in the current project’s <code>.mcp.json</code>.</DocsText>
        <DocsCode code={`claude mcp add --transport http --scope user col ${endpoint}`} label="Claude Code command" />
        <DocsText>Start a new Claude Code session and run <code>/mcp</code> to check the connection. See the <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer">Claude Code MCP docs</a>.</DocsText>
      </DocsSection>

      <DocsSection title="Codex">
        <DocsText>With the Codex CLI installed, add Col and check that it is listed:</DocsText>
        <DocsCode code={`codex mcp add col --url ${endpoint}\ncodex mcp list`} label="Codex commands" />
        <DocsText>Alternatively, add this table to <code>~/.codex/config.toml</code>:</DocsText>
        <DocsCode code={`[mcp_servers.col]\nurl = "${endpoint}"`} label="Codex config" />
        <DocsText>Start a new session and run <code>/mcp</code> to see active servers. See the <a href="https://developers.openai.com/codex/mcp/" target="_blank" rel="noopener noreferrer">Codex MCP docs</a>.</DocsText>
      </DocsSection>

      <DocsSection title="Cursor">
        <DocsText>Add the <code>col</code> entry to <code>.cursor/mcp.json</code> in your project, or <code>~/.cursor/mcp.json</code> for all projects:</DocsText>
        <DocsCode code={JSON.stringify({ mcpServers: { col: { url: endpoint } } }, null, 2)} label="Cursor config" />
        <DocsText>Open Cursor’s MCP settings and enable Col. Use it from an agent chat. See the <a href="https://cursor.com/docs/mcp" target="_blank" rel="noopener noreferrer">Cursor MCP docs</a>.</DocsText>
      </DocsSection>

      <DocsSection title="VS Code">
        <DocsText>Run <code>MCP: Add Server</code> in the Command Palette, choose HTTP, paste the server URL, and name it <code>col</code>. Choose <code>.mcp.json</code> for the workspace, or a global configuration for all projects.</DocsText>
        <DocsText>For a portable workspace configuration, add this entry to <code>.mcp.json</code> at the project root:</DocsText>
        <DocsCode code={JSON.stringify({ mcpServers: { col: { type: "http", url: endpoint } } }, null, 2)} label="VS Code config" />
        <DocsText>Run <code>MCP: List Servers</code>, select Col, and start it. Enable its tools in agent chat. See the <a href="https://code.visualstudio.com/docs/agent-customization/mcp-servers" target="_blank" rel="noopener noreferrer">VS Code MCP setup guide</a>.</DocsText>
      </DocsSection>

      <DocsSection title="Install the plugin">
        <DocsText>The optional Col plugin bundles the MCP connection with a UI component workflow skill. Choose the plugin or a direct connection to avoid adding Col twice.</DocsText>
        <DocsText>For Claude Code, run:</DocsText>
        <DocsCode code={"claude plugin marketplace add screen-gd/Col\nclaude plugin install col@col"} label="Claude Code plugin" />
        <DocsText>For Codex, run:</DocsText>
        <DocsCode code={"codex plugin marketplace add screen-gd/Col\ncodex plugin add col@col"} label="Codex plugin" />
        <DocsText>See the <a href="https://github.com/screen-gd/Col/blob/main/plugin/README.md" target="_blank" rel="noopener noreferrer">plugin guide</a> for package details.</DocsText>
      </DocsSection>

      <DocsSection title="Try the connection">
        <DocsText>Start a new agent session and confirm Col exposes <code>search_libraries</code>, <code>search_components</code>, <code>get_library</code>, and <code>get_component</code>. Then try:</DocsText>
        <DocsCode code={"Use Col to find a React command menu for a Tailwind CSS project.\nInspect the exact component and its library’s setup.\nLink the official docs and tell me what is unverified."} label="Example prompt" />
        <DocsNote>Col returns source links and recorded setup guidance. Its component coverage is partial; missing entries do not mean a library lacks a component.</DocsNote>
      </DocsSection>

      <DocsSection title="Troubleshooting">
        <DocsList items={[
          "No tools listed: check the URL, enable Col in your client, and start a new session after changing configuration.",
          "Connection failed: select HTTP, not a local command or SSE. Check your client’s server logs and network access to the endpoint.",
          "A browser visit returns a method error: the endpoint expects MCP POST requests. Confirm the connection through your client instead.",
          "An empty search result: shorten the query or adjust filters, then check the library’s official docs. Coverage is partial.",
        ]} />
        <DocsLinks items={[
          { href: "/mcp/agents", title: "Agent guide", text: "Tool arguments, setup prompt, and the component workflow." },
          { href: "/integrations", title: "Other MCP servers", text: "Connect to individual UI libraries and design tools." },
        ]} />
      </DocsSection>
    </article>
  );
}
