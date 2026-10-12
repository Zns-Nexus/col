import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Base UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
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
      component: "Accordion",
      scene: "Marketing Sites",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    { component: "Alert Dialog", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Autocomplete", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Avatar", scene: "Dashboards", dependencies: ["@base-ui/react"] },
    { component: "Button", scene: "Landing Pages", dependencies: ["@base-ui/react"] },
    {
      component: "Checkbox",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Checkbox Group",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Collapsible",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Combobox",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    { component: "Context Menu", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Drawer", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Field", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Fieldset", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Form", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Input", scene: "Rapid Prototyping", dependencies: ["@base-ui/react"] },
    { component: "Menu", scene: "Landing Pages", dependencies: ["@base-ui/react"] },
    { component: "Menubar", scene: "Landing Pages", dependencies: ["@base-ui/react"] },
    { component: "Meter", scene: "Dashboards", dependencies: ["@base-ui/react"] },
  ],
};
