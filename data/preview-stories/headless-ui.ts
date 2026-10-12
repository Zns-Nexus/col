import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Headless UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "headless-ui",
  permission: {
    status: "granted",
    source: "https://github.com/tailwindlabs/headlessui/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Dropdown Menu",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Disclosure",
      scene: "Landing Pages",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Dialog",
      scene: "Rapid Prototyping",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Popover",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Tabs",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Transition",
      scene: "Marketing Sites",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Button",
      scene: "Landing Pages",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Checkbox",
      scene: "Rapid Prototyping",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Combobox",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Fieldset",
      scene: "Rapid Prototyping",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Input",
      scene: "Landing Pages",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Listbox",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Radio Group",
      scene: "Rapid Prototyping",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Select",
      scene: "Rapid Prototyping",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Switch",
      scene: "Dashboards",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
    {
      component: "Textarea",
      scene: "Marketing Sites",
      dependencies: ["@headlessui/react", "lucide-react"],
    },
  ],
};
