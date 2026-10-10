import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for shadcn/ui. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
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
  };
