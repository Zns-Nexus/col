import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { test } from "node:test";
import { connectorPaths, integrations, integrationsForLibrary } from "../data/integrations.ts";
import { agentPrompt, clientSetups } from "../lib/integration-setup.ts";

const readBuilt = (relativePath) => {
  const file = new URL(`../.next/server/app/${relativePath}`, import.meta.url);
  return existsSync(file) && statSync(file).isFile() ? readFileSync(file, "utf8") : null;
};

// React escapes text into HTML entities; decode them so assertions compare plain strings.
const decodeHtml = (html) => html
  .replaceAll("&quot;", '"')
  .replaceAll("&#x27;", "'")
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&amp;", "&");

test("every integration has a built page with its setup guide, client setup, connectors, and agent prompt", () => {
  for (const integration of integrations) {
    const built = readBuilt(`integrations/${integration.slug}.html`);
    assert.ok(built, `No built page for ${integration.slug}`);
    const html = decodeHtml(built);

    assert.ok(html.includes(integration.name), `${integration.slug}: missing name`);
    assert.ok(html.includes(integration.url), `${integration.slug}: missing setup guide link`);
    assert.ok(html.includes(agentPrompt(integration)), `${integration.slug}: missing agent prompt`);

    // Only the first tab's snippet is in the markup; every client still gets a tab.
    const [first, ...rest] = clientSetups(integration);
    if (first) {
      assert.ok(html.includes(first.code), `${integration.slug}: missing the ${first.client} snippet`);
      assert.ok(html.includes(first.file), `${integration.slug}: missing where the ${first.client} snippet goes`);
    }
    for (const { client } of rest) assert.ok(html.includes(`>${client}</span>`), `${integration.slug}: missing the ${client} tab`);
    for (const { url } of connectorPaths(integration)) assert.ok(html.includes(`href="${url}"`), `${integration.slug}: missing connector ${url}`);
  }
});

test("library pages link to the integrations that serve them", () => {
  for (const slug of new Set(integrations.map(({ library }) => library).filter(Boolean))) {
    const html = readBuilt(`libraries/${slug}.html`) ?? "";
    for (const integration of integrationsForLibrary(slug)) {
      assert.ok(html.includes(`href="/integrations/${integration.slug}"`), `${slug}: missing a link to ${integration.slug}`);
    }
  }
});

test("unknown integration slugs return 404", () => {
  const manifest = JSON.parse(readFileSync(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"));
  assert.equal(manifest.dynamicRoutes["/integrations/[slug]"]?.fallback, false);
  assert.equal(manifest.routes["/integrations/definitely-not-an-integration"], undefined);
});
