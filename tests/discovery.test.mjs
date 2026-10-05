import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../data/libraries.ts", import.meta.url), "utf8");
const moduleSource = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { libraries } = await import(`data:text/javascript,${encodeURIComponent(moduleSource)}`);
const { integrations } = await import("../data/integrations.ts");

const built = (name) => readFileSync(new URL(`../.next/server/app/${name}.body`, import.meta.url), "utf8");

test("build emits complete discovery files", () => {
  const robots = built("robots.txt");
  const sitemap = built("sitemap.xml");
  const llms = built("llms.txt");

  for (const crawler of ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
    assert.ok(robots.includes(`User-Agent: ${crawler}`));
  }
  assert.ok(robots.includes("Allow: /"));
  assert.ok(robots.includes("Sitemap: https://collection-of-libs.vercel.app/sitemap.xml"));

  const staticRoutes = ["/", "/libraries", "/integrations", "/docs", "/docs/agents", "/docs/find-a-library", "/docs/request-a-library", "/docs/report-issues", "/docs/pull-requests", "/contributors", "/sponsors"];
  for (const route of staticRoutes) {
    assert.ok(sitemap.includes(`<loc>https://collection-of-libs.vercel.app${route}</loc>`));
  }
  for (const route of [...libraries.map(({ slug }) => `/libraries/${slug}`), ...integrations.map(({ slug }) => `/integrations/${slug}`)]) {
    assert.ok(sitemap.includes(`<loc>https://collection-of-libs.vercel.app${route}</loc>`), `Sitemap is missing ${route}`);
  }
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, staticRoutes.length + libraries.length + integrations.length);
  assert.equal(sitemap.includes("<lastmod>"), false, "Do not present build time as content modification time");

  assert.ok(llms.includes("/docs/agents"));
  assert.ok(llms.includes("component index is partial"));
  const [librarySection, integrationSection] = llms.split("# Libraries\n")[1].split("\n# Integrations\n");
  const entries = librarySection.split("\n## ").slice(1);
  assert.equal(entries.length, libraries.length);
  const integrationEntries = integrationSection.split("## ").slice(1);
  assert.deepEqual(integrationEntries.map((entry) => entry.split("\n")[0]), integrations.map(({ name }) => name));
  for (const integration of integrations) {
    assert.ok(integrationSection.includes(`/integrations/${integration.slug}`), `llms.txt is missing ${integration.name}`);
  }
  for (const library of libraries) {
    const entry = entries.find((item) => item.startsWith(`${library.name}\n`));
    assert.ok(entry, `Missing ${library.name}`);
    assert.ok(entry.includes(`- Domain: [${new URL(library.url).hostname.replace(/^www\./, "")}](${library.url})`));
    assert.ok(entry.includes(`- Description: ${library.description}`));
    assert.ok(entry.includes(`- Stacks: ${library.stacks.join(", ")}`));
    assert.ok(entry.includes(`- Use cases: ${library.useCases.join(", ")}`));
    assert.ok(entry.includes(`/libraries/${library.slug}`));
  }
});

test("public pages emit their own canonical and social identity", () => {
  const routes = ["/", "/docs", "/docs/agents", "/docs/find-a-library", "/docs/request-a-library", "/docs/report-issues", "/docs/pull-requests", "/contributors", "/sponsors", ...libraries.map(({ slug }) => `/libraries/${slug}`), ...integrations.map(({ slug }) => `/integrations/${slug}`)];
  for (const route of routes) {
    const html = readFileSync(new URL(`../.next/server/app/${route === "/" ? "index" : route.slice(1)}.html`, import.meta.url), "utf8");
    const url = `https://collection-of-libs.vercel.app${route === "/" ? "" : route}`;
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`), route);
    assert.ok(html.includes(`<meta property="og:url" content="${url}"`), route);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, route);
    assert.ok(html.includes(`<meta property="og:title" content="${title}"`), route);
    assert.ok(html.includes(`<meta name="twitter:title" content="${title}"`), route);
  }
  const homepage = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  const preview = "/col-social-preview-v5.jpg";
  assert.ok(homepage.includes(`<meta name="twitter:image" content="https://collection-of-libs.vercel.app${preview}"`));
  assert.ok(readFileSync(new URL(`../public${preview}`, import.meta.url)).length > 0);
  const { headers } = JSON.parse(readFileSync(new URL("../.next/routes-manifest.json", import.meta.url), "utf8"));
  for (const path of [preview, "/col-social-preview.jpg"]) {
    const rule = headers.find(({ regex }) => new RegExp(regex).test(path));
    assert.ok(rule?.headers.some(({ key, value }) => key === "Cache-Control" && value === "public, max-age=60, s-maxage=60"));
  }
  const schema = JSON.parse(homepage.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? "null");
  assert.equal(schema?.["@type"], "WebSite");
  assert.equal(schema.name, "Col");
  assert.equal(schema.url, "https://collection-of-libs.vercel.app/");
  const placeholder = readFileSync(new URL("../.next/server/app/Alexandria.html", import.meta.url), "utf8");
  assert.ok(placeholder.includes('<meta name="robots" content="noindex, follow"'));
});
