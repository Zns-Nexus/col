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
 * - `scene` must have a rendered template (see PREVIEW_SCENES); it selects the
 *   chrome that wraps the component on the preview page.
 * - `dependencies` lists every npm package the story's render imports beyond
 *   React, so the render is reproducible outside this app.
 *
 * Coverage grows by contribution: a checked story beats a long unrendered
 * list. Radix UI is covered in full; shadcn/ui covers the components this
 * app's own `components/ui` carries.
 */
export const previewStories: PreviewStoriesEntry[] = [
  {
    slug: "radix-ui",
    permission: {
      status: "granted",
      source: "https://github.com/radix-ui/primitives/blob/main/LICENSE",
      checkedAt: "2026-10-10T00:00:00Z",
    },
    stories: [
      { component: "Accordion", scene: "Marketing Sites", dependencies: ["radix-ui", "lucide-react"] },
      { component: "Alert Dialog", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Aspect Ratio", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Avatar", scene: "Dashboards", dependencies: ["radix-ui"] },
      { component: "Checkbox", scene: "Rapid Prototyping", dependencies: ["radix-ui", "lucide-react"] },
      { component: "Collapsible", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Context Menu", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Dropdown Menu", scene: "Landing Pages", dependencies: ["radix-ui"] },
      { component: "Form", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Hover Card", scene: "Marketing Sites", dependencies: ["radix-ui"] },
      { component: "Label", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Menubar", scene: "Landing Pages", dependencies: ["radix-ui"] },
      { component: "Navigation Menu", scene: "Landing Pages", dependencies: ["radix-ui"] },
      { component: "One-Time Password Field", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Password Toggle Field", scene: "Rapid Prototyping", dependencies: ["radix-ui", "lucide-react"] },
      { component: "Popover", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Progress", scene: "Dashboards", dependencies: ["radix-ui"] },
      { component: "Radio Group", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Scroll Area", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Select", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Separator", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Slider", scene: "Dashboards", dependencies: ["radix-ui"] },
      { component: "Switch", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Tabs", scene: "Dashboards", dependencies: ["radix-ui"] },
      { component: "Toast", scene: "Dashboards", dependencies: ["radix-ui"] },
      { component: "Toggle", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Toggle Group", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Toolbar", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
      { component: "Tooltip", scene: "Marketing Sites", dependencies: ["radix-ui"] },
    ],
  },
  {
    slug: "shadcn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
      checkedAt: "2026-10-10T00:00:00Z",
    },
    stories: [
      {
        component: "Badge",
        scene: "Marketing Sites",
        dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
      },
      {
        component: "Button",
        scene: "Landing Pages",
        dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
      },
      { component: "Card", scene: "Dashboards", dependencies: ["clsx", "tailwind-merge"] },
      {
        component: "Checkbox",
        scene: "Rapid Prototyping",
        dependencies: ["lucide-react", "radix-ui", "clsx", "tailwind-merge"],
      },
      {
        component: "Dropdown Menu",
        scene: "Landing Pages",
        dependencies: ["lucide-react", "radix-ui", "clsx", "tailwind-merge"],
      },
      { component: "Input", scene: "Rapid Prototyping", dependencies: ["clsx", "tailwind-merge"] },
      { component: "Separator", scene: "Rapid Prototyping", dependencies: ["radix-ui", "clsx", "tailwind-merge"] },
      {
        component: "Sheet",
        scene: "Rapid Prototyping",
        dependencies: ["lucide-react", "radix-ui", "clsx", "tailwind-merge"],
      },
      { component: "Skeleton", scene: "Dashboards", dependencies: ["clsx", "tailwind-merge"] },
      {
        component: "Tabs",
        scene: "Dashboards",
        dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
      },
      { component: "Toggle Group", scene: "Rapid Prototyping", dependencies: ["radix-ui", "clsx", "tailwind-merge"] },
      { component: "Tooltip", scene: "Marketing Sites", dependencies: ["radix-ui", "clsx", "tailwind-merge"] },
    ],
  },
];
