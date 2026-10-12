import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for shadcn/ui (chunk 2 of 2). Rules are enforced by
 * `scripts/check-story.mjs`: a granted permission record, component names as
 * the verified component index spells them, scenes with rendered templates,
 * and every npm package a render imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "shadcn-ui",
  permission: {
    status: "granted",
    source: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Command",
      scene: "Rapid Prototyping",
      dependencies: ["cmdk", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Alert",
      scene: "Dashboards",
      dependencies: ["class-variance-authority", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Toast",
      scene: "Rapid Prototyping",
      dependencies: ["@base-ui/react", "lucide-react"],
    },
    {
      component: "Sonner",
      scene: "Rapid Prototyping",
      dependencies: ["sonner", "next-themes", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Progress",
      scene: "Dashboards",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Spinner",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Empty",
      scene: "Dashboards",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Avatar",
      scene: "Dashboards",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    { component: "Table", scene: "Dashboards", dependencies: ["clsx", "tailwind-merge"] },
    {
      component: "Data Table",
      scene: "Dashboards",
      dependencies: ["@tanstack/react-table", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Chart",
      scene: "Dashboards",
      dependencies: ["recharts", "clsx", "tailwind-merge"],
    },
    {
      component: "Carousel",
      scene: "Marketing Sites",
      dependencies: ["embla-carousel-react", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    { component: "Aspect Ratio", scene: "Marketing Sites", dependencies: ["radix-ui"] },
    { component: "Typeset", scene: "Landing Pages", dependencies: [] },
    {
      component: "Item",
      scene: "Dashboards",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    { component: "Kbd", scene: "Rapid Prototyping", dependencies: ["clsx", "tailwind-merge"] },
    { component: "Collapsible", scene: "Rapid Prototyping", dependencies: ["radix-ui", "lucide-react"] },
    {
      component: "Toggle",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Pagination",
      scene: "Dashboards",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    { component: "Direction", scene: "Rapid Prototyping", dependencies: ["radix-ui"] },
    {
      component: "Attachment",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Bubble",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Marker",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Message",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Message Scroller",
      scene: "Rapid Prototyping",
      dependencies: ["@shadcn/react", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Questionnaire",
      scene: "Rapid Prototyping",
      dependencies: ["@shadcn/react", "class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
  ],
};
