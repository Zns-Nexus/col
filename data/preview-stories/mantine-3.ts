import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Mantine. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "mantine",
  permission: {
    status: "granted",
    source: "https://github.com/mantinedev/mantine/blob/master/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "JsonInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Image", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    { component: "Card", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "PasswordInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "FileInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Splitter", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Stepper", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "ColorInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "ThemeIcon",
      scene: "Landing Pages",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "NumberInput", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "LoadingOverlay", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Radio", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "Timeline",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Flex", scene: "Dashboards", dependencies: ["@mantine/core"] },
    {
      component: "List",
      scene: "Landing Pages",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "Spoiler", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    {
      component: "NavLink",
      scene: "Landing Pages",
      dependencies: ["@mantine/core", "lucide-react"],
    },
    { component: "NumberFormatter", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "RollingNumber", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "FloatingIndicator", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "Tree", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "TreeSelect", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "Cascader", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "SemiCircleProgress", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "AngleSlider", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "FloatingWindow", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "TableOfContents", scene: "Marketing Sites", dependencies: ["@mantine/core"] },
    { component: "OverflowList", scene: "Dashboards", dependencies: ["@mantine/core"] },
    { component: "HueSlider", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    { component: "AlphaSlider", scene: "Rapid Prototyping", dependencies: ["@mantine/core"] },
    {
      component: "Calendar",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "DateInput",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "DatePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "DatePickerInput",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "DateTimePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "InlineDateTimePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "MonthPicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "MonthPickerInput",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "TimeInput",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "YearPicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "YearPickerInput",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "TimePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "TimeGrid",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
    {
      component: "TimeValue",
      scene: "Dashboards",
      dependencies: ["@mantine/core", "@mantine/dates"],
    },
  ],
};
