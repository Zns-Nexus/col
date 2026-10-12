import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Base UI (batch 2). Rules are enforced by
 * `lib/preview-stories.test.mjs`: a granted permission record, component names
 * as the verified component index spells them, scenes with rendered templates,
 * and every npm package the render imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "base-ui",
  permission: {
    status: "granted",
    source: "https://github.com/mui/base-ui/blob/master/LICENSE.md",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Navigation Menu",
      scene: "Landing Pages",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Number Field",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    { component: "OTP Field", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Popover", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Preview Card", scene: "Marketing Sites", dependencies: ["@base-ui/react"] },
    { component: "Progress", scene: "Dashboards", dependencies: ["@base-ui/react"] },
    { component: "Radio Group", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Scroll Area", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    {
      component: "Select",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    { component: "Separator", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Slider", scene: "Dashboards", dependencies: ["@base-ui/react"] },
    { component: "Switch", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Tabs", scene: "Dashboards", dependencies: ["@base-ui/react"] },
    { component: "Toast", scene: "Dashboards", dependencies: ["@base-ui/react"] },
    { component: "Toggle", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Toggle Group", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Toolbar", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Tooltip", scene: "Marketing Sites", dependencies: ["@base-ui/react"] },
  ],
};
