import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Starwind UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "starwind-ui",
  permission: {
    status: "granted",
    source: "https://github.com/starwind-ui/starwind-ui/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Button", scene: "Landing Pages", dependencies: ["lucide-react"] },
    { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["lucide-react"] },
    { component: "Accordion", scene: "Marketing Sites", dependencies: ["lucide-react"] },
    { component: "Tabs", scene: "Dashboards", dependencies: [] },
    { component: "Select", scene: "Rapid Prototyping", dependencies: ["lucide-react"] },
    {
      component: "Carousel",
      scene: "Landing Pages",
      dependencies: ["embla-carousel-react", "lucide-react"],
    },
  ],
};
