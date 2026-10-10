import assert from "node:assert/strict";
import { test } from "node:test";
import { storyId, validatePreviewStories } from "./preview-stories.ts";
import { previewStories } from "../data/preview-stories/index.ts";
import { componentIndex } from "../data/components.ts";
import { libraries } from "../data/libraries.ts";

// The seam under test is `validatePreviewStories`: the one gate every preview
// story passes before it ships. Everything the catalogue renders must be
// lawful (recorded permission), truthful (a documented component), and
// renderable (a known use-case scene).

const granted = {
  status: "granted",
  source: "https://example.com/license",
  checkedAt: "2026-10-10T00:00:00Z",
};

const entry = (overrides = {}) => ({
  slug: "radix-ui",
  permission: granted,
  stories: [{ component: "Accordion", scene: "Marketing Sites", dependencies: ["radix-ui"] }],
  ...overrides,
});

test("a permitted library's story naming a documented component validates clean", () => {
  assert.deepEqual(validatePreviewStories([entry()], componentIndex, libraries), []);
});

test("a story for a library without granted permission is refused", () => {
  const unknown = entry({
    permission: { status: "unknown", source: "", checkedAt: "2026-10-10T00:00:00Z" },
    stories: [{ component: "Accordion", scene: "Marketing Sites", dependencies: ["radix-ui"] }],
  });
  const errors = validatePreviewStories([unknown], componentIndex, libraries);
  assert.ok(errors.some((error) => /permission/i.test(error)));
});

test("a story naming a component the library does not document is refused", () => {
  const errors = validatePreviewStories(
    [entry({ stories: [{ component: "Marquee", scene: "Marketing Sites", dependencies: ["radix-ui"] }] })],
    componentIndex,
    libraries,
  );
  assert.ok(errors.some((error) => /Marquee/.test(error)));
});

test("a story with an unknown use-case scene is refused", () => {
  const errors = validatePreviewStories(
    [entry({ stories: [{ component: "Accordion", scene: "Onboarding", dependencies: ["radix-ui"] }] })],
    componentIndex,
    libraries,
  );
  assert.ok(errors.some((error) => /scene/i.test(error)));
});

test("two stories for the same component of one library are refused", () => {
  const errors = validatePreviewStories(
    [entry({ stories: [
      { component: "Accordion", scene: "Marketing Sites", dependencies: ["radix-ui"] },
      { component: "Accordion", scene: "Landing Pages", dependencies: ["radix-ui"] },
    ] })],
    componentIndex,
    libraries,
  );
  assert.ok(errors.some((error) => /Accordion/.test(error)));
});

test("story ids name the owning library and documented component", () => {
  const stories = entry().stories;
  assert.equal(storyId("radix-ui", stories[0]), "radix-ui/Accordion");
});

test("the shipped story index validates clean", () => {
  assert.deepEqual(validatePreviewStories(previewStories, componentIndex, libraries), []);
});

test("a story for a library without a React story runtime is refused", () => {
  const index = { "svelte-kit": [{ name: "Button", url: "https://example.com/button" }] };
  const svelteLibraries = [{ slug: "svelte-kit", stacks: ["Svelte"] }];
  const errors = validatePreviewStories(
    [entry({ slug: "svelte-kit", stories: [{ component: "Button", scene: "Landing Pages", dependencies: [] }] })],
    index,
    svelteLibraries,
  );
  assert.ok(errors.some((error) => /React/.test(error)));
});
