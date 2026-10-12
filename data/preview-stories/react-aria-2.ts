import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for react-aria (second half of the component list). Rules are
 * enforced by `lib/preview-stories.test.mjs`: a granted permission record,
 * component names as the verified component index spells them, scenes with
 * rendered templates, and every npm package the render imports listed in
 * `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "react-aria",
  permission: {
    status: "granted",
    source: "https://github.com/adobe/react-spectrum/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Meter", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "Modal", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    {
      component: "NavigationTree",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    { component: "NumberField", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Popover", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "PreviewTrigger", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "ProgressBar", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "RadioGroup", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    {
      component: "RangeCalendar",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "SearchField",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "Select",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    { component: "Separator", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Slider", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Switch", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Table", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "Tabs", scene: "Dashboards", dependencies: ["react-aria-components"] },
    {
      component: "TagGroup",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    { component: "TextField", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    {
      component: "TimeField",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date"],
    },
    {
      component: "Toast",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    { component: "ToggleButton", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "ToggleButtonGroup", scene: "Dashboards", dependencies: ["react-aria-components"] },
    { component: "TokenField", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Toolbar", scene: "Rapid Prototyping", dependencies: ["react-aria-components"] },
    { component: "Tooltip", scene: "Marketing Sites", dependencies: ["react-aria-components"] },
    {
      component: "Tree",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    { component: "Virtualizer", scene: "Dashboards", dependencies: ["react-aria-components"] },
  ],
};
