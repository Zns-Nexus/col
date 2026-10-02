import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("docs pages render adjacent navigation without the footer or sidebar library search", () => {
  const pages = ["", "find-a-library", "agents", "request-a-library", "report-issues", "pull-requests"];

  for (const [index, slug] of pages.entries()) {
    const html = readFileSync(join(process.cwd(), ".next/server/app", slug ? `docs/${slug}.html` : "docs.html"), "utf8");
    const navigation = html.match(/<nav aria-label="Documentation pagination"[\s\S]*?<\/nav>/)?.[0];

    assert.ok(navigation, `Missing navigation on /docs/${slug}`);
    assert.equal(html.includes("<footer"), false);
    assert.equal(html.includes("docs-sidebar-search"), false);
    assert.ok(html.includes('class="docs-layout-nav"'));
    assert.ok(html.includes('class="docs-layout-main"'));
    assert.ok(html.includes('class="docs-layout-toc"'));
    assert.equal(navigation.includes("Previous:"), index > 0);
    assert.equal(navigation.includes("Next:"), index < pages.length - 1);
    if (index > 0) assert.ok(navigation.includes(`href="/docs${pages[index - 1] ? `/${pages[index - 1]}` : ""}"`));
    if (index < pages.length - 1) assert.ok(navigation.includes(`href="/docs/${pages[index + 1]}"`));
  }
});
