import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for ReUI. The free components ship as copy-paste source
 * (github.com/keenthemes/reui, MIT — not the Pro blocks), so the render
 * module implements each documented component the way the registry installs
 * it. The data grid rides TanStack Table v9, the kanban rides dnd-kit, the
 * tree rides @headless-tree, and the number field rides Base UI, exactly as
 * the upstream registry does. Dependencies list the packages each render's
 * code actually imports.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "reui",
  permission: {
    status: "granted",
    source: "https://github.com/keenthemes/reui/blob/main/LICENSE.md",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Data Grid",
      scene: "Dashboards",
      dependencies: ["@tanstack/react-table", "lucide-react"],
    },
    {
      component: "Kanban",
      scene: "Rapid Prototyping",
      dependencies: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities", "lucide-react"],
    },
    {
      component: "Gantt",
      scene: "Dashboards",
      dependencies: ["date-fns", "lucide-react"],
    },
    {
      component: "File Upload",
      scene: "Rapid Prototyping",
      dependencies: ["lucide-react"],
    },
    {
      component: "Number Field",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Tree",
      scene: "Dashboards",
      dependencies: ["@headless-tree/core", "@headless-tree/react", "lucide-react"],
    },
  ],
};
