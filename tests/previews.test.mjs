import assert from "node:assert/strict";
import { existsSync, readdirSync, statSync } from "node:fs";
import { test } from "node:test";
import { previewStories } from "../data/preview-stories/index.ts";
import { previewScreenshotPath, shippableStories } from "../lib/preview-stories.ts";

// The seam under test is the shipped screenshot set: the promise that every
// preview story carries a real render (`npm run previews` produces them) and
// that nothing unshipped lingers in the previews directory.

const previewRoot = new URL("../public/previews/", import.meta.url);
test("every shipped story carries a rendered screenshot", () => {
  for (const entry of previewStories) {
    for (const story of shippableStories(previewStories, entry.slug)) {
      const file = new URL(`../public/${previewScreenshotPath(entry.slug, story.component)}`, import.meta.url);
      assert.ok(existsSync(file), `missing rendered screenshot for ${entry.slug}/${story.component}; run npm run previews`);
      assert.ok(statSync(file).size > 1000, `screenshot for ${entry.slug}/${story.component} must be a real render, not a stub`);
    }
  }
});

test("every rendered screenshot belongs to a shipped story", () => {
  if (!existsSync(previewRoot)) return;
  const expected = new Set();
  for (const entry of previewStories) {
    for (const story of shippableStories(previewStories, entry.slug)) expected.add(previewScreenshotPath(entry.slug, story.component));
  }
  for (const libraryDir of readdirSync(previewRoot)) {
    for (const file of readdirSync(new URL(`${libraryDir}/`, previewRoot))) {
      assert.ok(
        expected.has(`previews/${libraryDir}/${file}`),
        `public/previews/${libraryDir}/${file} belongs to no shipped story; remove it or add the story`,
      );
    }
  }
});
