import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for WebcoreUI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "webcoreui",
  permission: {
    status: "granted",
    source: "https://github.com/Frontendland/webcoreui/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Accordion", scene: "Marketing Sites", dependencies: ["webcoreui"] },
    { component: "Alert", scene: "Dashboards", dependencies: ["webcoreui"] },
    { component: "Button", scene: "Landing Pages", dependencies: ["webcoreui"] },
    { component: "Data Table", scene: "Dashboards", dependencies: ["webcoreui"] },
  ],
};
