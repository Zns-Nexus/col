import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.shadcn-svelte.com/docs",
  repoUrl: "https://github.com/huntabyte/shadcn-svelte",
  install: [
    {
      label: "Add Tailwind CSS to a Svelte project",
      command: "npx sv add tailwindcss",
    },
    {
      label: "Initialize an existing project",
      command: "npx shadcn-svelte@latest init",
    },
    {
      label: "Add a component",
      command: "npx shadcn-svelte@latest add button",
    },
    {
      label: "Apply a preset to an existing project",
      command: "npx shadcn-svelte@latest apply a2r6bw",
    },
  ],
  gettingStarted: [
    "Start from a Svelte 5 project (SvelteKit, Vite or Astro) with Tailwind CSS added by the Svelte CLI, for example `npx sv add tailwindcss`. Tailwind v4 is the current default; v3 projects should read the Tailwind v4 migration guide at https://www.shadcn-svelte.com/docs/migration/tailwind-v4.",
    "Make sure the `$lib` path alias resolves: SvelteKit does this by default, while Vite needs matching `paths` in tsconfig.json and tsconfig.app.json plus a `resolve.alias` entry in vite.config.ts. Set up Tailwind first, because the CLI preflight check fails without it.",
    "Run `npx shadcn-svelte@latest init` from the project root and answer the prompts for base color, global CSS file and the lib, components, utils, hooks and ui aliases. It writes `components.json`, installs dependencies, adds the `cn` helper and writes the theme CSS variables.",
    'Add components with `npx shadcn-svelte@latest add button` (or `npx shadcn-svelte@latest add` with no argument to pick from a list), then import them through the configured alias, for example `import { Button } from "$lib/components/ui/button/index.js";`.',
    "Interactive components are built on Bits UI: the CLI pulls in `bits-ui` plus the icons and utilities a component needs (`@lucide/svelte`, `tailwind-variants`, `formsnap` for the form helper). The generated source lands in your repo, so edit it directly.",
  ],
  preview: {
    src: "https://shadcn-svelte.com/opengraph-image.png",
    alt: "shadcn-svelte open code design system announcement image",
  },
  agentPrompt: `Set up shadcn-svelte in this existing Svelte project.

Prerequisites: a Svelte 5 project (SvelteKit, Vite or Astro) with Tailwind CSS already installed via the Svelte CLI, and a working "$lib" path alias. If Tailwind is missing, run "npx sv add tailwindcss" first; for Vite you also need the alias in tsconfig.json, tsconfig.app.json and vite.config.ts, as described at https://www.shadcn-svelte.com/docs/installation/vite. On Tailwind v3, read https://www.shadcn-svelte.com/docs/migration/tailwind-v4 before continuing.

Steps:
1. From the project root run "npx shadcn-svelte@latest init" and follow the prompts for base color, global CSS file, and the lib, components, utils, hooks and ui aliases. This writes components.json (schema at https://www.shadcn-svelte.com/schema.json), installs dependencies, adds the cn helper at src/lib/utils.ts, and writes the theme CSS variables into your global CSS file. The base color cannot be changed after init. Useful flags: --base-color, --css, --lib-alias, --components-alias, --utils-alias, --hooks-alias, --ui-alias, -c/--cwd, --no-deps-install.
2. Add a first component with "npx shadcn-svelte@latest add button". The CLI copies source into your repo, installs its dependencies and rewrites imports to your aliases. Flags: -a/--all for every component, -o/--overwrite to replace edited files, -y/--yes to skip confirmation.
3. Use it once to confirm the setup: import { Button } from "$lib/components/ui/button/index.js" and render it in an existing route or component.
4. Treat everything under the ui alias as your own source code and edit it freely. Keep the "import ... css" in your root layout, the "@import" of the global CSS file, and the "@theme inline" block that maps --color-* utilities to the CSS variables.
5. Theming and dark mode: colors are CSS variables (--background, --primary, --card, --border, --ring, --chart-1..5, sidebar tokens) defined on :root and .dark, with the dark class toggled per the guide at https://www.shadcn-svelte.com/docs/dark-mode/svelte. Add new tokens in both blocks and expose them with a --color-<name> entry inside @theme inline.

Component behaviour comes from Bits UI (https://bits-ui.com), so consult the component page and its API reference on https://www.shadcn-svelte.com/docs/components before guessing props. Check the CLI reference at https://www.shadcn-svelte.com/docs/cli before deviating from these steps, since flags and prompts change between releases.`,
  pricing: {
    model: "free",
    summary: "Components and the CLI are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/huntabyte/shadcn-svelte/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
