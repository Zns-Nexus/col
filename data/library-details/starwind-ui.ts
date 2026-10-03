import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://starwind.dev/docs/getting-started/installation/",
  repoUrl: "https://github.com/starwind-ui/starwind-ui",
  preview: {
    src: "https://starwind.dev/og/home-b3ca1db3.png",
    alt: "Starwind UI official preview",
  },
  install: [
    { label: "Initialize an existing project", command: "npx starwind@latest init" },
    { label: "Add a button", command: "npx starwind@latest add button" },
    { label: "Initialize Vue beta", command: "npx starwind@latest init --framework vue" },
    { label: "Initialize Svelte beta", command: "npx starwind@latest init --framework svelte" },
  ],
  gettingStarted: [
    "Start with an existing framework project. Astro and React adapters are stable; Vue 3.5 and Svelte 5 adapters are public betas with separate framework guides and version requirements.",
    "Run `npx starwind@latest init` from the app root and inspect the detected framework and paths. Starwind writes starwind.config.json, connects the framework adapter, and configures its Tailwind CSS v4 stylesheet.",
    "Add source with `npx starwind@latest add button`. Styled components are copied into the app; shared behavior comes from the installed adapter and portable runtime.",
    "Use the framework-specific example and generated path, such as `import { Button } from '@/components/starwind/button'`. Import the Starwind stylesheet in the correct global entry and preserve existing aliases and theme tokens.",
    "Vue beta uses `@starwind-ui/vue@beta` and Vue 3.5; Svelte beta uses `@starwind-ui/svelte@beta` and Svelte >=5.29.0 <6. Follow the current repository and framework guides for those beta setups. The styled Image component remains Astro-only.",
    "For coding agents, the official docs provide https://starwind.dev/llms.txt, https://starwind.dev/llms-full.txt, and MCP setup at https://starwind.dev/docs/getting-started/mcp/.",
  ],
  agentPrompt: `Add Starwind UI (https://starwind.dev) to this existing project.

Starwind copies styled Tailwind CSS v4 components into the app and supplies shared behavior through a framework adapter and portable runtime. Astro and React are stable; Vue and Svelte adapters are public betas.

Prerequisites:
- Identify the framework, versions, global stylesheet, path aliases, and existing Tailwind configuration.
- For Vue beta, confirm Vue 3.5; for Svelte beta, check the current >=5.29.0 <6 requirement against the official repository.

Steps:
1. Read https://starwind.dev/docs/getting-started/installation/ and the matching framework guide. Use https://starwind.dev/llms.txt to find current component APIs.
2. Run npx starwind@latest init from the application root. For a beta host, use the documented --framework vue or --framework svelte setup and verify the matching beta adapter package.
3. Review starwind.config.json, the adapter, CSS imports, and aliases. Merge changes into the existing application without replacing its custom styling.
4. Add only the requested component, for example npx starwind@latest add button. Import it from the generated path and use the example for the project's framework.
5. Keep the shared stylesheet and runtime integration in place. For Vue and Svelte beta, inspect installed prop types and current framework examples; do not assume APIs match React. Styled Image remains Astro-only.
6. Connect the component to project state and run the existing typecheck and build.

Treat the generated styled components as editable source. Use the documented adapter APIs for shared behavior.`,
  pricing: {
    model: "freemium",
    summary: "The component library is free under MIT; Starwind Pro offers separate paid blocks and templates.",
    license: "MIT",
    source: "https://pro.starwind.dev/pricing/",
  },
} satisfies LibraryDetails;
