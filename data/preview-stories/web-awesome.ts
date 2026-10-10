import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Web Awesome. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "web-awesome",
  permission: {
    status: "granted",
    source: "https://webawesome.com/license",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Button", scene: "Landing Pages", dependencies: ["@awesome.me/webawesome"] },
    { component: "Input", scene: "Rapid Prototyping", dependencies: ["@awesome.me/webawesome"] },
    { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["@awesome.me/webawesome"] },
    { component: "Drawer", scene: "Dashboards", dependencies: ["@awesome.me/webawesome"] },
    { component: "Select", scene: "Dashboards", dependencies: ["@awesome.me/webawesome"] },
    { component: "Tab Group", scene: "Rapid Prototyping", dependencies: ["@awesome.me/webawesome"] },
  ],
};
