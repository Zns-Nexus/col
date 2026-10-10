import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { test } from "node:test";
import { previewStories } from "../data/preview-stories/index.ts";
import { componentSlug, shippableStories } from "../lib/preview-stories.ts";

// The seam under test is the built preview page: the single render surface
// every delivery channel (widget, screenshot, URL) shows. Each shipped story
// must have one per scene, and the page must name the story and scene it
// renders so the channels can never show a different render than the
// catalogue records.

const readBuilt = (relativePath) => {
  const file = new URL(`../.next/server/app/${relativePath}`, import.meta.url);
  return existsSync(file) && statSync(file).isFile() ? readFileSync(file, "utf8") : null;
};

test("every shipped story has a preview page in its recorded scene that names it", () => {
  for (const entry of previewStories) {
    for (const story of shippableStories(previewStories, entry.slug)) {
      const html = readBuilt(`preview/${entry.slug}/${componentSlug(story.component)}/${componentSlug(story.scene)}.html`);
      assert.ok(html, `expected a built preview page for ${entry.slug}/${story.component}`);
      assert.ok(
        html.includes(`data-preview-story="${entry.slug}/${story.component}"`),
        `the page must name the story it renders (${entry.slug}/${story.component})`,
      );
      assert.ok(
        html.includes(`data-preview-scene="${story.scene}"`),
        `the page must name the scene it renders (${story.scene})`,
      );
    }
  }
});

test("a story renders in a scene other than its recorded one", () => {
  const html = readBuilt("preview/shadcn-ui/button/dashboards.html");
  assert.ok(html, "expected the button story rendered in the Dashboards scene");
  assert.ok(html.includes('data-preview-scene="Dashboards"'));
});

test("the shipped button story renders the component on its page", () => {
  const html = readBuilt("preview/shadcn-ui/button/landing-pages.html");
  assert.ok(html, "expected a built preview page for shadcn-ui/Button");
  assert.ok(html.includes("Start free trial"));
});
