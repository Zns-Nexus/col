import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Radix UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
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
  };
