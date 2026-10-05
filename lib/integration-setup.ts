import type { Integration, McpClient, McpServer, McpServerPath, SecretEnv } from "../data/integrations";
import { connectorPaths, mcpServerPaths } from "../data/integrations.ts";

/**
 * Turns an integration's setup paths into what a person or an agent needs: a
 * config snippet for each client, short labels, and a copyable agent prompt.
 *
 * All client-specific knowledge lives here, taken from each client's MCP docs:
 * the config file, its wrapper key, and how a secret is read from the
 * environment. Entries in `data/integrations.ts` stay client-neutral, so they
 * never hold a client snippet or a secret value.
 *
 * - Claude Code: https://code.claude.com/docs/en/mcp (`${VAR}` expansion in .mcp.json)
 * - Cursor: https://cursor.com/docs/context/mcp (`${env:VAR}` interpolation)
 * - VS Code: https://code.visualstudio.com/docs/agents/reference/mcp-configuration (`${input:id}` prompts)
 * - Codex: https://developers.openai.com/codex/mcp (`env_http_headers` reads values from the environment)
 */

/** Where each client reads MCP config: the project root, or the home directory for `~` paths. */
export const CONFIG_FILES = {
  "Claude Code": ".mcp.json",
  Cursor: ".cursor/mcp.json",
  "VS Code": ".vscode/mcp.json",
  Codex: "~/.codex/config.toml",
} as const satisfies Record<McpClient, string>;

export interface ClientSetup {
  client: McpClient;
  file: (typeof CONFIG_FILES)[McpClient];
  language: "json" | "toml";
  code: string;
  /** What to do after saving the file. */
  next: string;
}

type Snippet = Pick<ClientSetup, "language" | "code">;

const json = (value: unknown) => JSON.stringify(value, null, 2);
/** TOML basic strings use the same escapes as JSON strings. */
const tomlString = (value: string) => JSON.stringify(value);
const tomlKey = (key: string) => (/^[A-Za-z0-9_-]+$/.test(key) ? key : tomlString(key));
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
/** "A, B, or C" */
const either = (items: readonly string[]) => new Intl.ListFormat("en", { type: "disjunction" }).format(items);

const secretOf = (server: McpServer): SecretEnv | undefined =>
  server.transport === "http" && server.auth.kind === "api-key" ? server.auth.secret : undefined;

const usesOAuth = (server: McpServer) => server.transport === "http" && server.auth.kind === "oauth";

/** Request headers for a remote server, with the secret written the way `reference` spells it. */
const headers = (server: McpServer, reference: (secret: SecretEnv) => string) =>
  server.transport === "http" && server.auth.kind === "api-key"
    ? { headers: { [server.auth.header]: reference(server.auth.secret) } }
    : {};

const stdioEntry = (server: Extract<McpServer, { transport: "stdio" }>) => ({ type: "stdio", command: server.command, args: server.args });

/** VS Code input ids are referenced as `${input:id}`. */
const inputId = (secret: SecretEnv) => secret.name.toLowerCase().replaceAll("_", "-");

const snippets: Record<McpClient, (key: string, server: McpServer) => Snippet> = {
  "Claude Code": (key, server) => ({
    language: "json",
    code: json({
      mcpServers: {
        [key]: server.transport === "stdio"
          ? stdioEntry(server)
          : { type: "http", url: server.url, ...headers(server, (secret) => `\${${secret.name}}`) },
      },
    }),
  }),
  Cursor: (key, server) => ({
    language: "json",
    code: json({
      mcpServers: {
        [key]: server.transport === "stdio"
          ? stdioEntry(server)
          : { url: server.url, ...headers(server, (secret) => `\${env:${secret.name}}`) },
      },
    }),
  }),
  "VS Code": (key, server) => {
    const secret = secretOf(server);
    return {
      language: "json",
      code: json({
        ...(secret && { inputs: [{ type: "promptString", id: inputId(secret), description: secret.label, password: true }] }),
        servers: {
          [key]: server.transport === "stdio"
            ? stdioEntry(server)
            : { type: "http", url: server.url, ...headers(server, (value) => `\${input:${inputId(value)}}`) },
        },
      }),
    };
  },
  Codex: (key, server) => {
    const lines = [`[mcp_servers.${tomlKey(key)}]`];
    if (server.transport === "stdio") {
      lines.push(`command = ${tomlString(server.command)}`, `args = [${server.args.map(tomlString).join(", ")}]`);
    } else {
      lines.push(`url = ${tomlString(server.url)}`);
      if (server.auth.kind === "api-key") lines.push(`env_http_headers = { ${tomlString(server.auth.header)} = ${tomlString(server.auth.secret.name)} }`);
    }
    return { language: "toml", code: lines.join("\n") };
  },
};

function nextStep(client: McpClient, key: string, server: McpServer): string {
  const secret = secretOf(server);
  const oauth = usesOAuth(server);
  const step = {
    "Claude Code": oauth
      ? `start Claude Code, approve the ${key} server, then run /mcp, select ${key}, and choose Authenticate`
      : `start Claude Code in the project and approve the ${key} server when asked`,
    Cursor: oauth ? `select Connect next to ${key} in Cursor's MCP settings and sign in` : `enable ${key} in Cursor's MCP settings`,
    "VS Code": oauth
      ? `select Start above ${key} in the file, then allow access when the browser opens`
      : secret
        ? `select Start above ${key} in the file. VS Code asks for the ${secret.label} once and stores it securely`
        : `select Start above ${key} in the file`,
    Codex: oauth ? `run codex mcp login ${key}, then restart Codex` : "restart Codex to load the server",
  }[client];
  // VS Code prompts for the secret itself; the other clients read it from the environment.
  return secret && client !== "VS Code" ? `Set ${secret.name} in your environment, then ${step}.` : `${capitalize(step)}.`;
}

/** One config snippet per documented client, across every MCP server path. */
export function clientSetups(integration: Integration): ClientSetup[] {
  return mcpServerPaths(integration).flatMap(({ key, server, clients }) =>
    clients.map((client) => ({ client, file: CONFIG_FILES[client], ...snippets[client](key, server), next: nextStep(client, key, server) })),
  );
}

export type Access = "No sign-in" | "Account sign-in" | "API key";

const serverAccess = (server: McpServer): Access =>
  server.transport === "stdio" || server.auth.kind === "none" ? "No sign-in" : server.auth.kind === "oauth" ? "Account sign-in" : "API key";

/** How a user gets access through each setup path, without duplicates. A connector always signs in to the provider's account. */
export function accessLabels(integration: Integration): Access[] {
  return [...new Set(integration.setup.map((path): Access => (path.type === "Connector" ? "Account sign-in" : serverAccess(path.server))))];
}

export const transportLabel = (server: McpServer) => (server.transport === "stdio" ? "Local (stdio)" : "Remote (HTTP)");

function serverBrief({ key, server, clients }: McpServerPath, provider: string): string {
  const access = server.transport === "http" && server.auth.kind === "api-key"
    ? `- Needs a ${server.auth.secret.label}, sent in the ${server.auth.header} header. Ask me to create it at ${server.auth.secret.url} and set ${server.auth.secret.name} in my environment. Reference ${server.auth.secret.name} from the config instead of the value.`
    : usesOAuth(server)
      ? `- Signs in with OAuth. The client opens ${provider}'s sign-in page on first connection; tell me when to approve access.`
      : "- Needs no sign-in or API key.";
  return [
    `MCP server "${key}":`,
    server.transport === "stdio"
      ? `- Runs locally over stdio: ${[server.command, ...server.args].join(" ")}`
      : `- Remote Streamable HTTP endpoint: ${server.url}`,
    access,
    `- Config file per client: ${clients.map((client) => `${client}: ${CONFIG_FILES[client]}`).join("; ")}.`,
  ].join("\n");
}

/** Copyable prompt that sets the integration up in whichever client the user has. */
export function agentPrompt(integration: Integration): string {
  const servers = mcpServerPaths(integration);
  const connectors = connectorPaths(integration);
  const steps = [
    "Ask which client I use if you can't tell.",
    ...servers.map(({ key, clients }) => `For ${either(clients)}, add the "${key}" server to that client's config file, using its documented format. Keep every server and setting already in the file.`),
    ...(connectors.length ? [`For ${either(connectors.map(({ client }) => client))}, don't edit any files. Send me the connector link so I can add it there.`] : []),
    "Reload the client, finish any sign-in, and confirm the server's tools are listed.",
  ];

  return [
    `Set up ${integration.name} (${integration.url}) for the AI client I use with this project.`,
    ...servers.map((path) => serverBrief(path, integration.provider.name)),
    ...(connectors.length ? [["Connectors (no config file):", ...connectors.map(({ client, url }) => `- ${client}: ${url}`)].join("\n")] : []),
    ...(integration.notes?.length ? [["Before you start:", ...integration.notes.map((note) => `- ${note}`)].join("\n")] : []),
    ["Steps:", ...steps.map((step, index) => `${index + 1}. ${step}`)].join("\n"),
    "Never write a secret value into a config file or ask me to paste one into this chat. If anything here differs from the provider's guide, follow the guide.",
  ].join("\n\n");
}
