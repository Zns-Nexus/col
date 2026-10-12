import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for Intent UI. The library ships as copy-paste source over
 * React Aria Components (the open-source registry at github.com/intentui/intentui,
 * MIT — not the paid design.intentui.com blocks), so the render module
 * implements each documented component the way the registry installs it.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "intent-ui",
  permission: {
    status: "granted",
    source: "https://github.com/intentui/intentui/blob/main/LICENSE",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Button",
      scene: "Landing Pages",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Combo Box",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Text Field",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Dialog",
      scene: "Rapid Prototyping",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Table",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
    {
      component: "Date Picker",
      scene: "Dashboards",
      dependencies: ["react-aria-components", "@internationalized/date", "lucide-react"],
    },
  ],
};
