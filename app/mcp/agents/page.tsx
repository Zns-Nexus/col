import { DocsCode, DocsHeader, DocsLinks, DocsList, DocsNote, DocsSection, DocsText } from "@/components/DocsUI";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata = pageMetadata(
  "/mcp/agents",
  "Col MCP agent guide | Col",
  "Set up Col MCP with an agent and use its tools to find, inspect, and implement UI components with source links and explicit gaps.",
);

export default function McpAgentsPage() {
  return (
    <article>
      <DocsHeader title="Col MCP for agents" lead="Connect once, find a component, then implement from its official documentation." />

      <DocsSection title="Set up the connection">
        <DocsText>Give this prompt to an agent that can configure your coding client. Setup is complete when the client connects and lists all four Col tools.</DocsText>
        <DocsCode code={`Set up Col MCP for the coding client I use.\nRead ${siteUrl}/mcp for client-specific instructions.\nAsk which client and configuration scope I want if they are unclear.\nAdd a server named col using Streamable HTTP at ${siteUrl}/api/mcp.\nInspect the current configuration first. Preserve all existing servers and settings.\nIf Col is already configured directly or through its plugin, reuse that connection.\nNo credentials or authentication headers are needed.\nTell me if I need to restart the client or enable the server myself.\nConfirm the connection lists search_libraries, search_components, get_library, and get_component.\nIf you cannot access the client’s tools, explain how I can verify them; do not claim the connection was tested.`} label="Agent setup prompt" />
      </DocsSection>

      <DocsSection title="Find a fit">
        <DocsText>Inspect the project’s framework, styling, and existing components first. Call <code>search_libraries</code> with the requirement and hard filters. Every stack filter must match; use-case filters match at least one selected use case.</DocsText>
        <DocsCode code={JSON.stringify({ query: "command menu", stacks: ["React", "Tailwind CSS"], limit: 5 }, null, 2)} label="search_libraries arguments" />
        <DocsText>Use returned slugs for library lookups. Read <code>matchedComponents</code> and <code>evidence.gaps</code> before choosing a candidate. Search calls accept <code>limit</code> from 1 to 25 and a non-negative <code>offset</code>; use <code>total</code> to decide whether another page is needed.</DocsText>
      </DocsSection>

      <DocsSection title="Inspect the component">
        <DocsText>Call <code>search_components</code> with a documented name or alias. Optionally restrict the search to a library slug:</DocsText>
        <DocsCode code={JSON.stringify({ query: "command palette", library: "shadcn-ui", limit: 5 }, null, 2)} label="search_components arguments" />
        <DocsText>Pass the exact returned ID to <code>get_component</code>, then use <code>get_library</code> for official setup links, pricing, documentation, and recorded compatibility. Col records no install commands of its own: read the current official docs before installing. Libraries that request outbound-only listings omit setup links.</DocsText>
        <DocsCode code={JSON.stringify({ id: "shadcn-ui/Command" }, null, 2)} label="get_component arguments" />
        <DocsCode code={JSON.stringify({ slug: "shadcn-ui" }, null, 2)} label="get_library arguments" />
        <DocsNote>Component IDs are case-sensitive. Copy them from search results rather than constructing them. An unknown ID or invalid filter returns a tool error.</DocsNote>
      </DocsSection>

      <DocsSection title="Render it in the chat">
        <DocsText>After choosing a component, call <code>render_component</code> with one TSX module whose default export shows it in the user’s own use case: their labels, layout, and theme. Import packages by npm name, optionally pinned; they load from esm.sh with React 19 shared. Import package CSS directly. Tailwind classes work.</DocsText>
        <DocsCode code={JSON.stringify({ code: 'import "@mantine/core/styles.css";\nimport { MantineProvider, Button } from "@mantine/core@9.7.1";\n\nexport default function Checkout() {\n  return <MantineProvider><Button>Pay $42.00</Button></MantineProvider>;\n}' }, null, 2)} label="render_component arguments" />
        <DocsNote>Relative and <code>@/</code> imports fail: inline local files such as shadcn’s <code>components/ui</code> sources. Hosts that support MCP Apps render the module inline; terminal clients show nothing, so do not claim a render there. A compile or render error appears in the chat and comes back to you as model context. Use synthetic sample data only.</DocsNote>
      </DocsSection>

      <DocsSection title="Use the evidence">
        <DocsList items={[
          <>Keep <code>evidence.verification</code> and <code>evidence.gaps</code> in the recommendation. A verified component link does not verify every API, dependency, or variant.</>,
          "A missing component means it has not been recorded. Do not infer support from generic tags or treat an empty result as proof of absence.",
          "Compatibility is supported, unsupported, or unknown. Keep unknown constraints explicit and verify them against official documentation.",
          "Deep documentation snapshots may be absent. Follow the returned source URLs for current installation, API, examples, versions, and licensing.",
        ]} />
      </DocsSection>

      <DocsSection title="Implement in the project">
        <DocsList items={[
          "Read the chosen component’s official docs and confirm they fit the project’s versions and styling.",
          "Read the library’s own setup docs before installing anything. Install only what the selected component needs and follow the project’s conventions.",
          "Run the project’s relevant checks. Report the component, sources used, and anything that remains unverified.",
        ]} />
        <DocsText>Col supplies catalogue evidence. The coding agent performs project changes; the Col server does not read or modify the project.</DocsText>
        <DocsLinks items={[
          { href: "/mcp", title: "Client setup", text: "Connection commands, config snippets, plugins, and troubleshooting." },
          { href: "/docs/agents", title: "Agents and LLMs", text: "Plain-text discovery and contributing to Col." },
        ]} />
      </DocsSection>
    </article>
  );
}
