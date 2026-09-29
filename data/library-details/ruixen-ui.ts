import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ruixen.com/docs",
  repoUrl: "https://github.com/ruixenui/ruixen.com",
  registrySetup: {
    description: "Initialize shadcn if needed, then use a full component registry URL. Choose the URL variant matching your Tailwind version and primitive library, as described in Getting started. No namespace entry is required.",
  },
  install: [
    { label: "Set up the project for the shadcn CLI", command: "npx shadcn@latest init" },
    {
      label: "Add a component (Tailwind v4 + Radix UI)",
      command: 'npx shadcn@latest add "https://ruixen.com/r/invert-tabs"',
    },
    {
      label: "Tailwind v3 + Radix UI variant",
      command: 'npx shadcn@latest add "https://ruixen.com/r/tw3/invert-tabs"',
    },
    {
      label: "Tailwind v4 + Base UI variant",
      command: 'npx shadcn@latest add "https://ruixen.com/r/baseui/invert-tabs"',
    },
    { label: "Optional: Ruixen MCP server for AI editors", command: "npx -y @ruixen/mcp@latest" },
  ],
  gettingStarted: [
    "Prerequisites: a React project with TypeScript and Tailwind CSS. The official installation page states it follows the same process as shadcn/ui and starts with `npx shadcn@latest init`, which creates a new Next.js project or sets up an existing one.",
    'Browse the catalog at https://ruixen.com/docs/components. Every component ships in four registry variants; pick the one matching the project: /r/[name] (Tailwind v4 + Radix UI), /r/tw3/[name] (Tailwind v3 + Radix UI), /r/baseui/[name] (Tailwind v4 + Base UI) and /r/baseui/tw3/[name] (Tailwind v3 + Base UI).',
    'Run the command from the component page at the project root, for example `npx shadcn@latest add "https://ruixen.com/r/invert-tabs"`. The CLI copies the component source into `components/ruixen/` and installs the npm dependencies that registry item declares, such as `motion`.',
    'Import the component from its copied path and render it, for example `import { InvertTabs } from "@/components/ruixen/invert-tabs"`, then confirm the app still builds.',
    "Optional: connect an AI editor to the official MCP server, documented at https://ruixen.com/docs/mcp and published as @ruixen/mcp on npm, so the component list always matches the live registry.",
  ],
  preview: {
    src: "https://ruixen.com/og",
    alt: "Ruixen UI, marketing UI for shadcn projects, multi-stack",
  },
  agentPrompt: `Add Ruixen UI (https://ruixen.com) to this existing project: 200+ marketing sections and
components for shadcn projects, installed as source files through the shadcn CLI.

Prerequisites: React with TypeScript and Tailwind CSS. Ruixen's install page follows the same process as
shadcn/ui, so the project has to be set up for the shadcn CLI first.

Steps:
1. Read the official docs instead of guessing: https://ruixen.com/docs, the install guide at
https://ruixen.com/docs/installation, and the catalog at https://ruixen.com/docs/components.
2. Check for a components.json in the project root. If the project is not set up for the shadcn CLI, run
npx shadcn@latest init first, which is step 1 of the official install page.
3. Match the registry variant to this project. Every component is published four times: /r/[name] for
Tailwind v4 + Radix UI, /r/tw3/[name] for Tailwind v3 + Radix UI, /r/baseui/[name] for Tailwind v4 +
Base UI, and /r/baseui/tw3/[name] for Tailwind v3 + Base UI.
4. Choose a component from the catalog, copy the install command from its page, and run it from the
project root, for example: npx shadcn@latest add "https://ruixen.com/r/invert-tabs". The CLI writes the
component to components/ruixen/ and installs the dependencies that registry item declares.
5. Import it from the copied path, for example import { InvertTabs } from "@/components/ruixen/invert-tabs",
render it in an existing page, and confirm the build still passes.
6. Optional: for AI editor integration, add the official MCP server from https://ruixen.com/docs/mcp. It is
a stdio server that reads the live registry and exposes listRegistryItems, searchRegistryItems and
getRegistryItem, so component sources and props come from the registry rather than guesswork.

Components animate with spring physics from motion/react, and many play a short Web Audio API tick on
interaction; pass sound={false} to silence it. The installed files are plain source in this repo, so treat
them as yours to edit.`,
} satisfies LibraryDetails;
