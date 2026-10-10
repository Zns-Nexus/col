import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories — the catalogue's visual layer, one entry per library.
 *
 * Ingestion rules (enforced by `lib/preview-stories.test.mjs`):
 * - `permission` must record a granted reuse decision before any story ships.
 *   The recorded source is the library's own license page where it is MIT, the
 *   same licence record the library details carry.
 * - Every story names a component the verified component index documents for
 *   that library, spelled the way the library documents it.
 * - `scene` must be one of the catalogue's use cases; it selects the chrome
 *   that wraps the component on the preview page.
 * - `dependencies` lists every npm package the story's render imports beyond
 *   React, so the render is reproducible outside this app.
 *
 * Coverage is intentionally small and grows by contribution: a handful of
 * checked stories beats a long unrendered list.
 */
export const previewStories: PreviewStoriesEntry[] = [
  {
    slug: "shadcn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
      checkedAt: "2026-10-10T00:00:00Z",
    },
    stories: [
      {
        component: "Button",
        scene: "Landing Pages",
        dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
      },
      {
        component: "Card",
        scene: "Dashboards",
        dependencies: ["clsx", "tailwind-merge"],
      },
    ],
  },
  {
    slug: "radix-ui",
    permission: {
      status: "granted",
      source: "https://github.com/radix-ui/primitives/blob/main/LICENSE",
      checkedAt: "2026-10-10T00:00:00Z",
    },
    stories: [
      {
        component: "Accordion",
        scene: "Marketing Sites",
        dependencies: ["radix-ui"],
      },
    ],
  },
];
