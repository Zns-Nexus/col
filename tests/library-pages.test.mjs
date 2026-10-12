import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
import { libraryOutbound } from "../lib/library-outbound.ts";

const transpileUrl = (source) =>
  `data:text/javascript,${encodeURIComponent(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText)}`;

const registrySource = readFileSync(new URL("../data/libraries.ts", import.meta.url), "utf8");
const { libraries } = await import(transpileUrl(registrySource));

const readBuilt = (relativePath) => {
  const file = new URL(`../.next/server/app/${relativePath}`, import.meta.url);
  return existsSync(file) && statSync(file).isFile() ? readFileSync(file, "utf8") : null;
};

const loadDetails = async (slug) => {
  const file = new URL(`../data/library-details/${slug}.ts`, import.meta.url);
  if (!existsSync(file)) return null;
  const module = await import(transpileUrl(readFileSync(file, "utf8")));
  return module.default ?? null;
};

// Read the real aggregation map from `index.ts` so a slug present on disk but
// missing from the map (which would 404 at the detail route) fails here.
// Only the keys are needed, so they are read with the TypeScript AST rather
// than by executing the module (whose extensionless relative imports are not
// resolvable outside a bundler).
const loadIndexKeys = () => {
  const source = readFileSync(new URL("../data/library-details/index.ts", import.meta.url), "utf8");
  const file = ts.createSourceFile("index.ts", source, ts.ScriptTarget.Latest, true);
  const keys = [];
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(file) !== "libraryDetails") continue;
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = property.name;
        keys.push(ts.isStringLiteral(key) ? key.text : key.getText(file).replace(/^["']|["']$/g, ""));
      }
    }
  }
  return keys;
};

// React escapes text children and attribute values into HTML entities; decode
// them so assertions can compare against plain source strings.
const decodeHtml = (html) => html
  .replaceAll("&quot;", '"')
  .replaceAll("&#x27;", "'")
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&amp;", "&");

test("registry slugs are unique", () => {
  const slugs = libraries.map(({ slug }) => slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("every library has a built detail page with name, website link, docs link, and agent prompt", async () => {
  for (const library of libraries) {
    const builtPage = readBuilt(`libraries/${library.slug}.html`);
    assert.ok(builtPage, `No built detail page for ${library.slug}`);
    const html = decodeHtml(builtPage);
    const details = await loadDetails(library.slug);
    assert.ok(details, `Missing data/library-details/${library.slug}.ts`);

    assert.ok(html.includes(library.name), `${library.slug}: page is missing the library name`);
    assert.ok(html.includes(library.url), `${library.slug}: page is missing the website link`);
    const websiteLink = html.match(/<a\b[^>]*class="ld-button ld-button-primary"[^>]*>/)?.[0];
    assert.ok(websiteLink?.includes('target="_blank"'), `${library.slug}: visit website must open a new tab`);
    assert.ok(html.includes(details.docsUrl), `${library.slug}: page is missing the docs link`);
    const setup = libraryOutbound(library, details);
    assert.equal(html.includes("Copy prompt"), !library.outboundOnly, `${library.slug}: page is missing the agent prompt block`);
    if (setup.agentPrompt) assert.ok(html.includes(setup.agentPrompt), `${library.slug}: page is missing the outbound agent prompt`);
    assert.ok(html.includes('class="ld-layout"'), `${library.slug}: missing the two-column layout`);
    assert.ok(html.includes('class="ld-side ld-reveal"'), `${library.slug}: missing the preview/details column`);
    assert.equal(html.includes("<footer"), false, `${library.slug}: renders the removed footer`);
  }
});

test("library pages point at the official docs and publish no install commands", async () => {
  for (const library of libraries) {
    const details = await loadDetails(library.slug);
    const html = decodeHtml(readBuilt(`libraries/${library.slug}.html`));
    const main = html.split('<div class="ld-main">')[1].split('</header>')[0];
    assert.ok(main.includes('data-library-outbound="website"'), `${library.slug}: missing primary website action`);
    assert.ok(main.includes('data-library-outbound="docs"'), `${library.slug}: missing primary docs action`);
    assert.equal(html.includes('rel="noopener noreferrer" class="ld-button'), false);

    // Col publishes no install commands of its own: no install section, no command
    // block, and no shell command anywhere in the main column.
    assert.equal(html.includes('id="ld-install"'), false, `${library.slug}: still renders an install section`);
    assert.equal(html.includes("ld-screen-command"), false, `${library.slug}: still renders a command block`);
    const column = html.split('<div class="ld-main">')[1] ?? html;
    assert.equal(/<code>[^<]*(npx|npm|pnpm|yarn|bun|jsrepo)\s/.test(column), false, `${library.slug}: prints an install command`);

    const setup = libraryOutbound(library, details);
    for (const { url, text } of setup.links) {
      assert.ok(html.includes(`href="${url}"`), `${library.slug}: missing setup link to ${url}`);
      assert.ok(html.includes(text), `${library.slug}: missing setup link text`);
    }
    if (setup.agentPrompt) {
      assert.ok(setup.agentPrompt.startsWith(`Read the current official docs / llms.txt at ${details.docsUrl}, then install from there.`));
      assert.equal(setup.agentPrompt.includes("npx"), false);
    }
  }
});

test("outbound-only libraries provide no public setup pointers", async () => {
  const library = libraries.find(({ slug }) => slug === "wensity-ui");
  const details = await loadDetails(library.slug);
  const setup = libraryOutbound({ ...library, outboundOnly: true }, details);
  assert.deepEqual(setup, { links: [], agentPrompt: null });
  assert.equal(library.outboundOnly, undefined, "do not opt founders out without their request");
});

// The discovery suite already asserts sitemap coverage for every slug.
test("related libraries link to other real library pages", () => {
  const slugs = new Set(libraries.map(({ slug }) => slug));
  for (const library of libraries) {
    const html = readBuilt(`libraries/${library.slug}.html`) ?? "";
    const section = html.match(/<section[^>]*aria-labelledby="ld-related"[\s\S]*?<\/section>/)?.[0];
    if (!section) continue;
    const linked = [...section.matchAll(/href="\/libraries\/([^"]+)"/g)].map(([, slug]) => slug);
    assert.ok(linked.length > 0, `${library.slug}: related section has no links`);
    for (const slug of linked) {
      assert.ok(slugs.has(slug) && slug !== library.slug, `${library.slug}: related link to "${slug}" is not another library`);
    }
  }
});

test("unknown library slugs return 404", () => {
  const manifest = JSON.parse(readFileSync(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"));
  // Next serves only generated paths when the dynamic route has no fallback.
  assert.equal(manifest.dynamicRoutes["/libraries/[slug]"]?.fallback, false);
  assert.equal(manifest.routes["/libraries/definitely-not-a-library"], undefined);
});

// A slug missing from data/library-details/index.ts would 404 at the detail
// route rather than fail at build time, so pin the three sets to each other:
// the registry, the aggregation map, and the files on disk.
test("registry slugs, the details map, and the files on disk agree", () => {
  const mapped = loadIndexKeys();
  const slugs = libraries.map(({ slug }) => slug);

  for (const slug of slugs) {
    assert.ok(mapped.includes(slug), `data/library-details/index.ts is missing "${slug}"`);
  }
  for (const key of mapped) {
    assert.ok(slugs.includes(key), `data/library-details/index.ts has "${key}" with no registry entry`);
  }
  for (const name of readdirSync(new URL("../data/library-details/", import.meta.url))) {
    if (!name.endsWith(".ts") || name === "index.ts" || name === "types.ts") continue;
    const slug = name.replace(/\.ts$/, "");
    assert.ok(mapped.includes(slug), `data/library-details/${name} is not registered in index.ts`);
  }
});

// Every slug must carry real content, not an empty stub.
test("every registry slug has complete detail content", async () => {
  for (const library of libraries) {
    const details = await loadDetails(library.slug);
    assert.ok(details, `Missing data/library-details/${library.slug}.ts`);
    assert.ok(details.docsUrl.trim(), `${library.slug}: docsUrl is empty`);
    // Setup content is the library's to publish: a detail file carries only the
    // official links, pricing, and an optional preview.
    for (const field of ["install", "registrySetup", "componentInstallTemplate", "gettingStarted", "agentPrompt"]) {
      assert.equal(field in details, false, `${library.slug}: ${field} must not be recorded on Col's side`);
    }
    assert.ok(["free", "freemium", "paid"].includes(details.pricing?.model), `${library.slug}: pricing.model must be free, freemium, or paid`);
    assert.ok(details.pricing.summary.trim(), `${library.slug}: pricing.summary is empty`);
    assert.match(details.pricing.source, /^https:\/\//, `${library.slug}: pricing.source must be an https URL`);
  }
});

test("a library with shipped stories shows its component previews", () => {
  const html = readBuilt("libraries/shadcn-ui.html");
  assert.ok(html.includes("/preview/shadcn-ui/button"), "expected a link to the story's preview page");
  assert.ok(html.includes("/previews/shadcn-ui/button.png"), "expected the rendered screenshot");
  const without = readBuilt("libraries/magic-ui.html");
  assert.ok(without, "expected the magic-ui page to exist");
  assert.equal(
    without.includes('id="ld-previews"'),
    false,
    "a library with no shipped stories must not show a previews section",
  );
});
