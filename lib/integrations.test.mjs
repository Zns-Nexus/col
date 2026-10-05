import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { connectorPaths, integrations, mcpServerPaths } from "../data/integrations.ts";
import { libraries } from "../data/libraries.ts";
import { createIntegrationSearch } from "./integration-directory.ts";
import { agentPrompt, clientSetups } from "./integration-setup.ts";

const search = createIntegrationSearch(integrations);
const query = (text, filters = {}) => search({ query: text, type: null, client: null, publisher: null, ...filters });
const slugs = (results) => results.map(({ slug }) => slug);

test("every integration has a unique slug, https sources, and a real Col library", () => {
  assert.equal(new Set(slugs(integrations)).size, integrations.length);
  const librarySlugs = new Set(libraries.map(({ slug }) => slug));

  for (const integration of integrations) {
    assert.match(integration.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${integration.slug}: slug must be kebab-case`);
    const urls = [
      integration.url,
      integration.provider.url,
      integration.repoUrl,
      ...connectorPaths(integration).map(({ url }) => url),
      ...mcpServerPaths(integration).flatMap(({ server }) => server.transport === "http" ? [server.url, server.auth.kind === "api-key" ? server.auth.secret.url : undefined] : []),
    ].filter(Boolean);
    for (const url of urls) assert.equal(new URL(url).protocol, "https:", `${integration.slug}: ${url} must use https`);
    if (integration.library) assert.ok(librarySlugs.has(integration.library), `${integration.slug}: no library "${integration.library}"`);
  }
});

test("the registry stores no credential values", () => {
  const source = readFileSync(new URL("../data/integrations.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /ghp_[A-Za-z0-9]|github_pat_|sk-[A-Za-z0-9]{8}|Bearer [A-Za-z0-9]|your[_-]?(api[_-]?)?(key|token)/i);
});

test("renders one parseable snippet per documented client", () => {
  const wrapper = { "Claude Code": "mcpServers", Cursor: "mcpServers", "VS Code": "servers" };
  for (const integration of integrations) {
    const setups = clientSetups(integration);
    assert.deepEqual(setups.map(({ client }) => client), mcpServerPaths(integration).flatMap(({ clients }) => clients));

    for (const { client, language, code } of setups) {
      const keys = mcpServerPaths(integration).map(({ key }) => key);
      if (language === "json") {
        const config = JSON.parse(code);
        assert.ok(keys.some((key) => key in config[wrapper[client]]), `${integration.slug}: ${client} snippet is missing its server`);
      } else {
        assert.equal(client, "Codex");
        assert.ok(keys.some((key) => code.startsWith(`[mcp_servers.${key}]`)), `${integration.slug}: Codex snippet is missing its server`);
      }
    }
  }
});

test("API keys are read from the environment in each client's own syntax", () => {
  const setups = Object.fromEntries(clientSetups(integrations.find(({ slug }) => slug === "21st-mcp")).map((setup) => [setup.client, setup]));

  assert.equal(JSON.parse(setups["Claude Code"].code).mcpServers["21st"].headers["x-api-key"], "${API_KEY_21ST}");
  assert.equal(JSON.parse(setups.Cursor.code).mcpServers["21st"].headers["x-api-key"], "${env:API_KEY_21ST}");
  const vsCode = JSON.parse(setups["VS Code"].code);
  assert.equal(vsCode.servers["21st"].headers["x-api-key"], "${input:api-key-21st}");
  assert.deepEqual(vsCode.inputs, [{ type: "promptString", id: "api-key-21st", description: "21st API key", password: true }]);
  assert.match(setups.Codex.code, /^env_http_headers = \{ "x-api-key" = "API_KEY_21ST" \}$/m);
});

test("the agent prompt covers every setup path and keeps secrets out", () => {
  for (const integration of integrations) {
    const prompt = agentPrompt(integration);
    assert.ok(prompt.includes(integration.url), `${integration.slug}: prompt is missing the setup guide`);
    for (const { key } of mcpServerPaths(integration)) assert.ok(prompt.includes(`"${key}"`), `${integration.slug}: prompt is missing server ${key}`);
    for (const { url } of connectorPaths(integration)) assert.ok(prompt.includes(url), `${integration.slug}: prompt is missing ${url}`);
    assert.ok(prompt.includes("Never write a secret value"), `${integration.slug}: prompt is missing the secrets rule`);
  }
});

test("search matches every token and filters by type, client, and publisher", () => {
  assert.equal(query("figma")[0].slug, "figma-mcp");
  assert.deepEqual(query("shadcn zzzz"), []);

  // A product offered both ways is one entry under both types.
  assert.ok(slugs(query("", { type: "MCP server" })).includes("figma-mcp"));
  assert.deepEqual(slugs(query("", { type: "Connector" })), slugs(integrations.filter((integration) => connectorPaths(integration).length > 0)));
  assert.deepEqual(slugs(query("", { client: "Codex" })), slugs(integrations.filter((integration) => mcpServerPaths(integration).some(({ clients }) => clients.includes("Codex")))));
  assert.deepEqual(slugs(query("", { publisher: "Community" })), slugs(integrations.filter(({ official }) => !official)));
  assert.deepEqual(slugs(query("shadcn", { publisher: "Official" })), ["shadcn-mcp"]);
});

test("each facet is counted with its own selection cleared", () => {
  const filters = { query: "", type: "Connector", client: "Claude", publisher: "Official" };
  const counts = search.facetCounts(filters);

  assert.equal(counts.total.type, search({ ...filters, type: null }).length);
  assert.equal(counts.type.get("MCP server"), search({ ...filters, type: "MCP server" }).length);
  assert.equal(counts.client.get("Cursor"), search({ ...filters, client: "Cursor" }).length);
  assert.equal(counts.publisher.get("Community"), search({ ...filters, publisher: "Community" }).length);
  assert.deepEqual(search.facetCounts({ ...filters, query: "zzzz" }).total, { type: 0, client: 0, publisher: 0 });
});
