import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://inspira-ui.com/docs/en/getting-started/installation",
  repoUrl: "https://github.com/unovue/inspira-ui",
  preview: {
    src: "https://cdn.inspira-ui.com/og-image-v2.png",
    alt: "Inspira UI official preview",
  },
  install: [
    { label: "Supporting dependencies (npm)", command: "npm install @vueuse/core motion-v tw-animate-css @inspira-ui/plugins" },
    { label: "Supporting dependencies (pnpm)", command: "pnpm add @vueuse/core motion-v tw-animate-css @inspira-ui/plugins" },
  ],
  gettingStarted: [
    "Use a Vue or Nuxt project with Tailwind CSS v4 configured. Projects using Tailwind CSS v3 should follow the separate v1 documentation at https://v1.inspira-ui.com.",
    "Install `@vueuse/core`, `motion-v`, `tw-animate-css`, and `@inspira-ui/plugins`, then follow Motion's Vue integration guide at https://motion.dev/docs/vue for the current framework setup.",
    "Merge the installation page's CSS imports and theme variables into the global stylesheet. Existing shadcn-vue projects can skip the theme-variable setup; Nuxt UI projects use the documented Nuxt UI token mapping.",
    "Choose a component from the official catalog, copy its Vue source and helpers into the app, and install any dependencies listed on that component page. The supporting packages alone do not install all component source.",
    "Some examples use Iconify icons. Add icon support only when the chosen component requires it, and check client-only rendering for browser or WebGL effects in Nuxt.",
  ],
  agentPrompt: `Add Inspira UI (https://inspira-ui.com) components to this existing Vue or Nuxt project.

Inspira UI provides editable Vue components with animation and visual effects. Its current guide uses Tailwind CSS v4; Tailwind v3 projects have separate documentation at https://v1.inspira-ui.com.

Prerequisites:
- Inspect the Vue/Nuxt version, Tailwind setup, global CSS, aliases, and existing shadcn-vue or Nuxt UI configuration.

Steps:
1. Read https://inspira-ui.com/docs/en/getting-started/installation and the exact component page before copying code.
2. Install the documented supporting dependencies: npm install @vueuse/core motion-v tw-animate-css @inspira-ui/plugins, using the project's package manager.
3. Follow https://motion.dev/docs/vue for Motion's framework integration. Merge the required CSS imports and theme variables into the existing stylesheet. Use the Nuxt UI mapping if applicable; keep existing shadcn-vue tokens when already configured.
4. Copy only the requested component and its required helpers from the official page. Preserve the project's import aliases and install component-specific dependencies or Iconify support only when needed.
5. Connect its props to project state, preserve reduced-motion behavior, and use client-only rendering for effects that require browser APIs. Run typecheck and build using the app's existing scripts.

Use Vue component APIs from the current documentation rather than translating remembered React examples.`,
  pricing: {
    model: "free",
    summary: "Inspira UI components are free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/unovue/inspira-ui",
  },
} satisfies LibraryDetails;
