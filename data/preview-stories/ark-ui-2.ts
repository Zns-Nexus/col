import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Ark UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "ark-ui",
  permission: {
    status: "granted",
    source: "https://github.com/chakra-ui/ark/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Password Input", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Pin Input", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Popover", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Progress - Circular", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Progress - Linear", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "QR Code", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Radio Group", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Rating Group", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Scroll Area", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Segment Group", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Select", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Signature Pad", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Slider", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Splitter", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Steps", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Switch", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Tabs", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Tags Input", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Timer", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Table of Contents", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Toast", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Toggle", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Toggle Group", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Tooltip", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Tour", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Tree View", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
  ],
};
