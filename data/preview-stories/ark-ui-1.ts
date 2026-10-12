import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for ark-ui (batch 1 of 2). Rules are enforced by
 * `scripts/check-story.mjs`: a granted permission record, component names as
 * the verified component index spells them, scenes with rendered templates,
 * and every npm package the render imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "ark-ui",
  permission: {
    status: "granted",
    source: "https://github.com/chakra-ui/ark/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Accordion", scene: "Landing Pages", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Angle Slider", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Avatar", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Carousel", scene: "Marketing Sites", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Checkbox", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Clipboard", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Collapsible", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Color Picker", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Combobox", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Date Input", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Date Picker", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Dialog", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Drawer", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Editable", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Field", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Fieldset", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "File Upload", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Floating Panel", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Image Cropper", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react"] },
    { component: "Hover Card", scene: "Landing Pages", dependencies: ["@ark-ui/react"] },
    { component: "Listbox", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Marquee", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Menu", scene: "Dashboards", dependencies: ["@ark-ui/react"] },
    { component: "Navigation Menu", scene: "Marketing Sites", dependencies: ["@ark-ui/react"] },
    { component: "Number Input", scene: "Rapid Prototyping", dependencies: ["@ark-ui/react", "lucide-react"] },
    { component: "Pagination", scene: "Dashboards", dependencies: ["@ark-ui/react", "lucide-react"] },
  ],
};
