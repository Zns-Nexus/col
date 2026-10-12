import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for react-aria-components (batch 1 of 2). Rules are enforced
 * by `lib/preview-stories.test.mjs`: a granted permission record, component
 * names as the verified component index spells them, scenes with rendered
 * templates, and every npm package the render imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "react-aria",
  permission: {
    status: "granted",
    source: "https://github.com/adobe/react-spectrum/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Autocomplete",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Breadcrumbs",
      scene: "Dashboards",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Button",
      scene: "Landing Pages",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Calendar",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Checkbox",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "CheckboxGroup",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "ColorArea",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorField",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorPicker",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorSlider",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorSwatch",
      scene: "Dashboards",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorSwatchPicker",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ColorWheel",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ComboBox",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "DateField",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date"],
    },
    {
      component: "DatePicker",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "DateRangePicker",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Disclosure",
      scene: "Marketing Sites",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "DisclosureGroup",
      scene: "Marketing Sites",
      dependencies: ["react-aria-components", "lucide-react"],
    },
    {
      component: "DropZone",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "FileTrigger",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Form",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "GridList",
      scene: "Dashboards",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Group",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Link",
      scene: "Landing Pages",
      dependencies: ["react-aria-components"],
    },
    {
      component: "ListBox",
      scene: "Dashboards",
      dependencies: ["react-aria-components"],
    },
    {
      component: "Menu",
      scene: "Dashboards",
      dependencies: ["react-aria-components"],
    },
  ],
};
