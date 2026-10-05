import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("docs and MCP pages render adjacent navigation without the footer or sidebar library search", () => {
  const pages = ["/docs", "/docs/find-a-library", "/docs/agents", "/mcp", "/mcp/agents", "/docs/request-a-library", "/docs/report-issues", "/docs/pull-requests"];

  for (const [index, route] of pages.entries()) {
    const html = readFileSync(join(process.cwd(), ".next/server/app", `${route.slice(1)}.html`), "utf8");
    const navigation = html.match(/<nav aria-label="Documentation pagination"[\s\S]*?<\/nav>/)?.[0];

    assert.ok(navigation, `Missing navigation on ${route}`);
    assert.equal(html.includes("<footer"), false);
    assert.equal(html.includes("docs-sidebar-search"), false);
    assert.ok(html.includes('class="docs-layout-nav"'));
    assert.ok(html.includes('class="docs-layout-main"'));
    assert.ok(html.includes('class="docs-layout-toc"'));
    assert.equal(navigation.includes("Previous:"), index > 0);
    assert.equal(navigation.includes("Next:"), index < pages.length - 1);
    if (index > 0) assert.ok(navigation.includes(`href="${pages[index - 1]}"`));
    if (index < pages.length - 1) assert.ok(navigation.includes(`href="${pages[index + 1]}"`));
  }
});

test("MCP setup snippets connect to the plugin endpoint and the sidebar selects MCP", () => {
  const html = readFileSync(join(process.cwd(), ".next/server/app/mcp.html"), "utf8");
  const { mcpServers: { col: { url } } } = JSON.parse(readFileSync(join(process.cwd(), "plugin/.mcp.json"), "utf8"));
  const blocks = [...html.matchAll(/<pre><code>([\s\S]*?)<\/code><\/pre>/g)].map(([, code]) =>
    code.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"),
  );
  const configs = blocks.filter((code) => code.startsWith("{")).map((code) => JSON.parse(code));
  assert.ok(blocks.every((code) => !code.includes("\\n")), "Copyable commands must contain real line breaks");
  assert.equal(configs.length, 2);
  for (const config of configs) assert.equal(config.mcpServers.col.url, url);
  assert.ok(blocks.includes(`codex mcp add col --url ${url}\ncodex mcp list`));
  assert.ok(blocks.includes(`claude mcp add --transport http --scope user col ${url}`));
  const activeMcpSidebar = (page) => [...page.matchAll(/<a\b[^>]*href="\/mcp"[^>]*>/g)]
    .some(([tag]) => tag.includes('class="app-nav-link"') && tag.includes('aria-current="page"'));
  assert.ok(activeMcpSidebar(html), "The setup page must select MCP in the main sidebar");

  const agents = readFileSync(join(process.cwd(), ".next/server/app/mcp/agents.html"), "utf8");
  assert.ok(activeMcpSidebar(agents), "The agent guide must select MCP in the main sidebar");
  for (const tool of ["search_libraries", "search_components", "get_library", "get_component"]) {
    assert.ok(agents.includes(tool), `Agent guide is missing ${tool}`);
  }
});
