import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../data/libraries.ts", import.meta.url), "utf8");
const moduleSource = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { libraries } = await import(`data:text/javascript,${encodeURIComponent(moduleSource)}`);

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

  for (const route of ["/", "/libraries", "/docs", "/contributors", "/sponsors"]) {
    assert.ok(sitemap.includes(`<loc>https://collection-of-libs.vercel.app${route}</loc>`));
  }
  for (const library of libraries) {
    assert.ok(
      sitemap.includes(`<loc>https://collection-of-libs.vercel.app/libraries/${library.slug}</loc>`),
      `Sitemap is missing /libraries/${library.slug}`,
    );
  }
  assert.equal((sitemap.match(/<lastmod>/g) ?? []).length, 5 + libraries.length);

  const entries = llms.split("\n## ").slice(1);
  assert.equal(entries.length, libraries.length);
  for (const library of libraries) {
    const entry = entries.find((item) => item.startsWith(`${library.name}\n`));
    assert.ok(entry, `Missing ${library.name}`);
    assert.ok(entry.includes(`- Domain: [${new URL(library.url).hostname.replace(/^www\./, "")}](${library.url})`));
    assert.ok(entry.includes(`- Description: ${library.description}`));
    assert.ok(entry.includes(`- Stacks: ${library.stacks.join(", ")}`));
    assert.ok(entry.includes(`- Use cases: ${library.useCases.join(", ")}`));
  }
});
