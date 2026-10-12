import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for shadcn/ui (batch 1). Rules are enforced by
 * `lib/preview-stories.test.mjs`: a granted permission record, component names
 * as the verified component index spells them, scenes with rendered templates,
 * and every npm package the render imports listed in `dependencies`.
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
      component: "Field",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Button Group",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Input Group",
      scene: "Rapid Prototyping",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Input OTP",
      scene: "Rapid Prototyping",
      dependencies: ["input-otp", "lucide-react", "clsx", "tailwind-merge"],
    },
    { component: "Textarea", scene: "Rapid Prototyping", dependencies: ["clsx", "tailwind-merge"] },
    {
      component: "Radio Group",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Select",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Native Select",
      scene: "Rapid Prototyping",
      dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Switch",
      scene: "Dashboards",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Slider",
      scene: "Dashboards",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Calendar",
      scene: "Dashboards",
      dependencies: ["react-day-picker", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Date Picker",
      scene: "Rapid Prototyping",
      dependencies: ["react-day-picker", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Combobox",
      scene: "Rapid Prototyping",
      dependencies: ["cmdk", "class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Label",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Accordion",
      scene: "Landing Pages",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Breadcrumb",
      scene: "Dashboards",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Navigation Menu",
      scene: "Marketing Sites",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Sidebar",
      scene: "Dashboards",
      dependencies: ["class-variance-authority", "radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Scroll Area",
      scene: "Dashboards",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Resizable",
      scene: "Dashboards",
      dependencies: ["react-resizable-panels", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Dialog",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "class-variance-authority", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Alert Dialog",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "class-variance-authority", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Drawer",
      scene: "Rapid Prototyping",
      dependencies: ["vaul", "class-variance-authority", "radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Popover",
      scene: "Rapid Prototyping",
      dependencies: ["radix-ui", "class-variance-authority", "clsx", "tailwind-merge"],
    },
    {
      component: "Hover Card",
      scene: "Marketing Sites",
      dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    },
    {
      component: "Context Menu",
      scene: "Dashboards",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
    {
      component: "Menubar",
      scene: "Dashboards",
      dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    },
  ],
};
