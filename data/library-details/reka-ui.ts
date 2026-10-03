import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://reka-ui.com/docs/overview/installation",
  repoUrl: "https://github.com/unovue/reka-ui",
  preview: {
    src: "https://reka-ui.com/og.jpg",
    alt: "Reka UI official preview",
  },
  install: [
    { label: "npm", command: "npm install reka-ui" },
    { label: "pnpm", command: "pnpm add reka-ui" },
    { label: "Optional Vue auto imports", command: "npm install -D unplugin-vue-components" },
  ],
  gettingStarted: [
    "Install `reka-ui` in an existing Vue project. Reka UI is the successor to Radix Vue and provides behavior and accessible markup without a default visual theme.",
    "Import the parts you need from `reka-ui`, for example `PopoverRoot`, `PopoverTrigger`, `PopoverPortal`, and `PopoverContent`. Follow the complete example at https://reka-ui.com/docs/overview/getting-started.",
    "Style the parts with the project's CSS or Tailwind classes, including documented data attributes for interaction states. Follow https://reka-ui.com/docs/guides/styling rather than expecting an installed stylesheet.",
    "In Nuxt, add `reka-ui/nuxt` to the existing modules array for auto imports. In Vite, optional auto imports use `unplugin-vue-components` with `RekaResolver` from `reka-ui/resolver`.",
    "Use https://reka-ui.com/llms.txt or append `.md` to a docs URL for agent-readable API references. Check the migration guide when replacing an existing Radix Vue installation.",
  ],
  agentPrompt: `Add Reka UI (https://reka-ui.com) to this existing Vue or Nuxt project.

Reka UI, formerly Radix Vue, provides unstyled, accessible primitives. The application supplies its own styles.

Prerequisites:
- Inspect the Vue version, existing UI primitives, styling system, and any Radix Vue dependency.

Steps:
1. Read https://reka-ui.com/docs/overview/installation and https://reka-ui.com/docs/overview/getting-started. Use https://reka-ui.com/llms.txt to locate the requested component's current API.
2. Install reka-ui with the project's package manager, for example npm install reka-ui. If the app already uses Radix Vue, follow the official migration guide before changing imports.
3. Import the documented parts from reka-ui and compose them as the component page shows. For a popover, start with PopoverRoot, PopoverTrigger, PopoverPortal, and PopoverContent, preserving its accessibility semantics.
4. Apply the project's own styles and documented state selectors. Do not add an unrelated theme package.
5. In Nuxt, merge reka-ui/nuxt into the modules array if auto imports are wanted. For Vite auto imports, use unplugin-vue-components with the resolver exported by reka-ui/resolver.
6. Integrate controlled state through the documented Vue models and events, then run the project's typecheck and build. Preserve focus management, labels, and keyboard behavior.

Read the component page before guessing props or part names.`,
  pricing: {
    model: "free",
    summary: "Reka UI is free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/unovue/reka-ui",
  },
} satisfies LibraryDetails;
