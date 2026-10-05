/**
 * The integration registry: MCP servers and connectors that let an AI client
 * work with a UI library or design tool. The terms are defined in CONTEXT.md,
 * and docs/adr/0001-integrations-and-connectors.md explains why integrations
 * are kept apart from libraries.
 *
 * Guidelines:
 * - One entry per product. "MCP server" and "Connector" are setup paths, so a
 *   product offered both ways is one entry with both kinds of path.
 * - List only the clients the provider's own setup docs cover.
 * - Never store a credential. Name the environment variable and link to the
 *   page where the user creates it; `lib/integration-setup.ts` renders a
 *   placeholder in each client's own syntax.
 * - Set `official` only when the provider also makes the product it serves.
 * - Every URL must be the provider's or the client's official page.
 */

/** Clients whose MCP config Col can generate (see `lib/integration-setup.ts`). */
export const MCP_CLIENTS = ["Claude Code", "Cursor", "VS Code", "Codex"] as const;

/** AI apps that list connectors in their own directory. */
export const CONNECTOR_CLIENTS = ["Claude", "ChatGPT"] as const;

export const CLIENTS = [...MCP_CLIENTS, ...CONNECTOR_CLIENTS] as const;

export type McpClient = (typeof MCP_CLIENTS)[number];
export type ConnectorClient = (typeof CONNECTOR_CLIENTS)[number];
export type Client = (typeof CLIENTS)[number];

/** A secret the user keeps in their own environment. Col stores its name and where to get it, never a value. */
export interface SecretEnv {
  /** Environment variable that holds the secret, for example `API_KEY_21ST`. */
  name: string;
  /** What the secret is, for example "21st API key". */
  label: string;
  /** Official page where the user creates it. */
  url: string;
}

export type HttpAuth =
  | { kind: "none" }
  /** The client opens the provider's sign-in page on first connection. */
  | { kind: "oauth" }
  /** The key is sent in `header` on every request. */
  | { kind: "api-key"; header: string; secret: SecretEnv };

export type McpServer =
  /** Started by the client as a local process. */
  | { transport: "stdio"; command: string; args: readonly string[] }
  /** Reached at a remote Streamable HTTP endpoint. */
  | { transport: "http"; url: string; auth: HttpAuth };

/** The user adds the server to a client's MCP config. */
export interface McpServerPath {
  type: "MCP server";
  /** Server name used as the config key, spelled as the provider documents it. */
  key: string;
  server: McpServer;
  /** Clients the provider documents setup for. */
  clients: readonly [McpClient, ...McpClient[]];
}

/** The user enables the integration from an AI app's own directory and signs in there. */
export interface ConnectorPath {
  type: "Connector";
  client: ConnectorClient;
  /** The connector's official listing in that client's directory. */
  url: string;
}

export type SetupPath = McpServerPath | ConnectorPath;
export type IntegrationType = SetupPath["type"];

/** Display order for integration types. */
export const INTEGRATION_TYPES = ["MCP server", "Connector"] as const satisfies readonly IntegrationType[];

export interface Integration {
  name: string;
  /** Unique, lowercase, kebab-case. */
  slug: string;
  /** One factual sentence. */
  description: string;
  /** The provider's setup guide for this integration. */
  url: string;
  /** Who publishes and maintains it. */
  provider: { name: string; url: string };
  /** True when the provider also makes the product it serves. */
  official: boolean;
  /** Slug of the Col library it serves, if that library is listed. */
  library?: string;
  /** Official public source repository. */
  repoUrl?: string;
  /** Short facts to know before setup, each taken from the provider's docs. */
  notes?: readonly string[];
  /** Extra search keywords. */
  tags?: readonly string[];
  /** Every way to start using it. The first path is the one the provider recommends. */
  setup: readonly [SetupPath, ...SetupPath[]];
}

export const integrations: readonly Integration[] = [
  {
    name: "shadcn MCP server",
    slug: "shadcn-mcp",
    description: "Lets an agent browse, search, and install items from shadcn/ui and any registry configured in components.json.",
    url: "https://ui.shadcn.com/docs/mcp",
    provider: { name: "shadcn/ui", url: "https://ui.shadcn.com" },
    official: true,
    library: "shadcn-ui",
    repoUrl: "https://github.com/shadcn-ui/ui",
    notes: [
      "Run it in a project with a valid components.json. The server reads the registries configured there.",
      "The default shadcn/ui registry needs no configuration. Private registries read their tokens from environment variables in .env.local.",
    ],
    tags: ["registry", "components", "install"],
    setup: [
      {
        type: "MCP server",
        key: "shadcn",
        server: { transport: "stdio", command: "npx", args: ["shadcn@latest", "mcp"] },
        clients: ["Claude Code", "Cursor", "VS Code", "Codex"],
      },
    ],
  },
  {
    name: "Figma MCP server",
    slug: "figma-mcp",
    description: "Brings design context from Figma files into an agent, turns selected frames into code, and writes native content back to the canvas.",
    url: "https://developers.figma.com/docs/figma-mcp-server/",
    provider: { name: "Figma", url: "https://www.figma.com" },
    official: true,
    notes: [
      "Sign in with your Figma account the first time the client connects.",
      "Only clients listed in Figma's MCP catalog can connect to the remote server.",
    ],
    tags: ["design", "design to code", "figjam", "code connect"],
    setup: [
      {
        type: "MCP server",
        key: "figma",
        server: { transport: "http", url: "https://mcp.figma.com/mcp", auth: { kind: "oauth" } },
        clients: ["Claude Code", "Cursor", "VS Code", "Codex"],
      },
      { type: "Connector", client: "Claude", url: "https://claude.com/connectors/figma" },
      { type: "Connector", client: "ChatGPT", url: "https://openai.com/business/apps/figma/" },
    ],
  },
  {
    name: "MUI MCP",
    slug: "mui-mcp",
    description: "Answers Material UI questions from the official docs and registries, and links to the pages it quotes.",
    url: "https://mui.com/material-ui/getting-started/mcp/",
    provider: { name: "MUI", url: "https://mui.com" },
    official: true,
    library: "mui",
    notes: [
      "If the agent doesn't use it, add a rule telling it to call the useMuiDocs and fetchDocs tools for MUI questions.",
    ],
    tags: ["docs", "material ui"],
    setup: [
      {
        type: "MCP server",
        key: "mui-mcp",
        server: { transport: "stdio", command: "npx", args: ["-y", "@mui/mcp@latest"] },
        clients: ["Claude Code", "Cursor", "VS Code"],
      },
    ],
  },
  {
    name: "21st MCP",
    slug: "21st-mcp",
    description: "Searches the 21st.dev catalog of React components and returns their code, with optional UI generation.",
    url: "https://21st.dev/mcp",
    provider: { name: "21st.dev", url: "https://21st.dev" },
    official: true,
    library: "21st-dev",
    repoUrl: "https://github.com/21st-dev/magic-mcp",
    notes: [
      "Formerly Magic MCP. Keys from the old Magic console no longer work, so create a new one.",
      "Search is free. Retrieving component code and generating UI with 21st AI are paid.",
    ],
    tags: ["magic mcp", "components", "react", "generate", "logos"],
    setup: [
      {
        type: "MCP server",
        key: "21st",
        server: {
          transport: "http",
          url: "https://21st.dev/api/mcp",
          auth: { kind: "api-key", header: "x-api-key", secret: { name: "API_KEY_21ST", label: "21st API key", url: "https://21st.dev/mcp" } },
        },
        clients: ["Claude Code", "Cursor", "VS Code", "Codex"],
      },
    ],
  },
  {
    name: "AI Canvas MCP",
    slug: "aicanvas-mcp",
    description: "Lets an agent search, inspect, and install AI Canvas components together with their design spec and motion.",
    url: "https://aicanvas.me/mcp",
    provider: { name: "AI Canvas", url: "https://aicanvas.me" },
    official: true,
    library: "ai-canvas",
    notes: [
      "The server reads the live registry, so new components reach your agent about five minutes after they ship.",
      "Installs still run through the shadcn CLI and need the AICANVAS_TOKEN from a free account, as described on the AI Canvas library page.",
    ],
    tags: ["components", "registry", "motion"],
    setup: [
      {
        type: "MCP server",
        key: "aicanvas",
        server: { transport: "stdio", command: "npx", args: ["-y", "@aicanvas/mcp"] },
        clients: ["Claude Code", "Cursor", "Codex"],
      },
    ],
  },
  {
    name: "Shadcn UI v4 MCP Server",
    slug: "shadcn-ui-mcp-server",
    description: "Returns shadcn/ui v4 component source, demos, blocks, and metadata for React, Svelte, Vue, or React Native.",
    url: "https://github.com/Jpisnice/shadcn-ui-mcp-server",
    provider: { name: "Jpisnice", url: "https://github.com/Jpisnice" },
    official: false,
    library: "shadcn-ui",
    repoUrl: "https://github.com/Jpisnice/shadcn-ui-mcp-server",
    notes: [
      "It reads components from GitHub, which allows 60 requests an hour without a token. A GitHub token with no scopes, set as GITHUB_PERSONAL_ACCESS_TOKEN, raises that to 5,000.",
      "Add --framework svelte, vue, or react-native to switch frameworks, or --ui-library base for Base UI.",
    ],
    tags: ["svelte", "vue", "react native", "blocks", "base ui"],
    setup: [
      {
        type: "MCP server",
        key: "shadcn-ui",
        server: { transport: "stdio", command: "npx", args: ["@jpisnice/shadcn-ui-mcp-server"] },
        clients: ["Claude Code", "Cursor", "VS Code"],
      },
    ],
  },
];

export const mcpServerPaths = (integration: Integration): McpServerPath[] =>
  integration.setup.filter((path): path is McpServerPath => path.type === "MCP server");

export const connectorPaths = (integration: Integration): ConnectorPath[] =>
  integration.setup.filter((path): path is ConnectorPath => path.type === "Connector");

/** The setup types an integration offers, in display order. */
export const integrationTypes = (integration: Integration): IntegrationType[] =>
  INTEGRATION_TYPES.filter((type) => integration.setup.some((path) => path.type === type));

/** Every client an integration reaches through any of its setup paths, in display order. */
export function integrationClients(integration: Integration): Client[] {
  const reached = new Set<Client>(integration.setup.flatMap((path) => (path.type === "MCP server" ? path.clients : [path.client])));
  return CLIENTS.filter((client) => reached.has(client));
}

/** Looks up an integration by slug, throwing so a stale slug fails the build instead of rendering a broken link. */
export function integrationBySlug(slug: string): Integration {
  const integration = integrations.find((entry) => entry.slug === slug);
  if (!integration) throw new Error(`Unknown integration "${slug}"`);
  return integration;
}

/** Integrations that serve a Col library, official ones first. */
export const integrationsForLibrary = (slug: string): Integration[] =>
  integrations.filter((integration) => integration.library === slug).sort((a, b) => Number(b.official) - Number(a.official));
