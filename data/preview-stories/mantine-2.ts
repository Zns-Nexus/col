import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Mantine (batch 2 of 4). Rules are enforced by
 * `lib/preview-stories.test.mjs`: a granted permission record, component names
 * as the verified component index spells them, scenes with rendered templates,
 * and every npm package the render imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "mantine",
  permission: {
    status: "granted",
    source: "https://github.com/mantinedev/mantine/blob/master/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Badge",
      scene: "Marketing Sites",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    {
      component: "Toggle",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    {
      component: "Toolbar",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Tour", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Tooltip", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    {
      component: "Transition",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Typography", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    {
      component: "VisuallyHidden",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "DataList", scene: "Dashboards", dependencies: ["@mantine/core"] },
    {
      component: "EmptyState",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Divider", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "AspectRatio",
      scene: "Landing Pages",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Overlay", scene: "Landing Pages", dependencies: ["@mantine/core"] },
    { component: "Avatar", scene: "Dashboards", dependencies: ["@mantine/core"] },
    {
      component: "Alert",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    {
      component: "Affix",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Fieldset", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Checkbox", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Combobox", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Modal", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Drawer", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Accordion", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    { component: "Pill", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "PillsInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "Autocomplete",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "TagsInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Select", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "MultiSelect", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "ComboboxPopover", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Pagination", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "AppShell", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Skeleton", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "SimpleGrid", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Grid", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "HoverCard", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    {
      component: "Menu",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Menubar", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Progress", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "RingProgress", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Chip", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "PinInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Rating", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Space", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "Indicator",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Textarea", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
  ],
};
