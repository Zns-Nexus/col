import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://spell.sh",
  repoUrl: "https://github.com/xxtomm/spell-ui",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@spell": "https://spell.sh/r/{name}.json"
  }
}`,
  },
  install: [
    { label: "Add a component (npm)", command: "npx shadcn@latest add @spell/perspective-book" },
    {
      label: "Add a component (pnpm)",
      command: "pnpm dlx shadcn@latest add @spell/perspective-book",
    },
    {
      label: "Add a component (bun)",
      command: "bunx --bun shadcn@latest add @spell/perspective-book",
    },
    { label: "Enable the Spell UI MCP server", command: "npx shadcn@latest mcp init" },
  ],
  gettingStarted: [
    "Use a React + TypeScript + Tailwind CSS project. Spell UI is a shadcn/ui-style registry, so run `npx shadcn@latest init` first if the project root has no components.json.",
    'Register the Spell UI registry in components.json under "registries": { "@spell": "https://spell.sh/r/{name}.json" }. This is the step the docs at https://spell.sh/docs/mcp ask for before any `@spell/...` command works.',
    "Browse the catalog at https://spell.sh/docs/components and open a component page. Each page shows a live preview, a Manual tab with the source, the props table, and an install command such as `npx shadcn@latest add @spell/perspective-book`.",
    "Run that command from the project root. The shadcn CLI writes the component to components/<name>.tsx, installs its npm dependencies (light-rays pulls `three`, badge pulls `@radix-ui/react-slot` and `class-variance-authority`, signature pulls `motion` and `opentype.js`), and no runtime package of Spell UI's own is required.",
    'Import it the way the docs show, for example `import { PerspectiveBook } from "@/components/perspective-book";`. Every page also has an "Open in v0" button that loads the same component into v0.dev.',
  ],
  preview: {
    src: "https://spell.sh/og",
    alt: "Spell UI home page preview",
  },
  agentPrompt: `Add Spell UI (https://spell.sh) to this existing project.

Spell UI is a curated collection of animated React components for landing pages and marketing sites, built on shadcn/ui, Tailwind CSS and motion. The catalog at https://spell.sh/docs/components currently lists 33 components (buttons, text animations, marquees, cards, backgrounds such as light-rays and animated-gradient, and inputs). Nothing is installed from npm as a package: each component is copied into this repo as source by the shadcn CLI from the registry https://spell.sh/r/{name}.json.

Prerequisites:
- React + TypeScript + Tailwind CSS, with a components.json in the project root. Run npx shadcn@latest init first if it is missing.
- Registry docs: https://spell.sh/docs/introduction, https://spell.sh/docs/components, https://spell.sh/docs/mcp. A plain-text version of any docs page is available by appending .md, for example https://spell.sh/docs/mcp.md, and each component page has a Manual tab with the full source.

Steps:
1. Read the docs at https://spell.sh/docs/introduction and pick components from https://spell.sh/docs/components. Do not guess component slugs; read them off the component pages.
2. Register the registry in components.json by adding to the existing object: "registries": { "@spell": "https://spell.sh/r/{name}.json" }. Keep the other keys already in that file.
3. Add the first component from the project root with the command from its docs page, for example npx shadcn@latest add @spell/perspective-book. Let the CLI install the component's dependencies, which are listed in the registry item.
4. First usage: import it exactly as the component page's Usage section shows, for example import { PerspectiveBook } from "@/components/perspective-book";, render it in an existing page, and confirm the app still builds. Keep the component local and edit it freely.
5. Repeat for the remaining components. If I want to drive the catalog from an editor instead, run npx shadcn@latest mcp init (per https://spell.sh/docs/mcp) and then ask the agent for a component by name.

Optional: the source of the site itself is public at https://github.com/xxtomm/spell-ui (MIT), which is useful for checking how a component behaves or for reporting a fix upstream.

Use only component names, props and install commands documented on spell.sh.`,
  pricing: {
    model: "free",
    summary: "The components are free and open source; no paid tier is listed.",
    license: "MIT",
    source: "https://github.com/xxtomm/spell-ui",
  },
} satisfies LibraryDetails;
