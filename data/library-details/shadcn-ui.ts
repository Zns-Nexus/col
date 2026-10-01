import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.shadcn.com/docs",
  repoUrl: "https://github.com/shadcn-ui/ui",
  install: [
    { label: "Initialize an existing project", command: "npx shadcn@latest init" },
    { label: "Add a component", command: "npx shadcn@latest add button" },
    {
      label: "Scaffold a new Next.js project",
      command: "npx shadcn@latest init -t next",
    },
  ],
  gettingStarted: [
    "Start from a React + TypeScript project with Tailwind CSS installed and a `@/*` path alias in tsconfig.json pointing at your source root.",
    "Run `npx shadcn@latest init` and answer the prompts for style, base color and options; it writes components.json, installs dependencies, adds the cn utility and sets up CSS variables.",
    "Add components one by one with `npx shadcn@latest add button`, or run `npx shadcn@latest add` with no argument to browse the full list.",
    "Import a component with the configured alias, for example `import { Button } from \"@/components/ui/button\"`.",
    "The component source lands in your repo (for example `src/components/ui`), so edit it directly to match your design system.",
  ],
  preview: {
    src: "https://ui.shadcn.com/og?title=The%20Foundation%20for%20your%20Design%20System&description=Composable%2C%20accessible%20components%20with%20thoughtful%20defaults.%20Build%20your%20own%20component%20library%20with%20code%20you%20can%20customize%2C%20extend%2C%20and%20make%20your%20own.",
    alt: "shadcn/ui open code design system announcement image",
  },
  agentPrompt: `Set up shadcn/ui in this existing project.

Prerequisites: a React project with TypeScript and Tailwind CSS already installed, plus an "@/*" path alias in tsconfig.json pointing at the project root (use "./src/*" if the app lives in src/). If Tailwind CSS is missing, install it first, and make sure the alias exists before running the CLI.

Steps:
1. From the project root run "npx shadcn@latest init" and follow the prompts (style, base color, options). This writes components.json, installs the required dependencies, adds the cn utility and configures CSS variables in your global CSS file. If the project is a monorepo, run it in the workspace that owns the global CSS, or pass "-c <path>".
2. Add a first component: "npx shadcn@latest add button".
3. Use it once to confirm the setup: import { Button } from "@/components/ui/button" and render it in an existing page.
4. Treat the generated files under components/ui as your own source code and edit them freely.

Consult the official docs before deviating from these steps: installation at https://ui.shadcn.com/docs/installation and CLI reference at https://ui.shadcn.com/docs/cli, since flags and prompts change between releases.`,
  pricing: {
    model: "free",
    summary: "Components and the CLI are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
