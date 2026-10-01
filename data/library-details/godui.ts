import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://godui.design",
  repoUrl: "https://github.com/LucasBassetti/godui",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@godui": "https://godui.design/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "Set up shadcn/ui in the project",
      command: "pnpm dlx shadcn@latest init",
    },
    {
      label: "Add a component by full registry URL (no config)",
      command:
        "pnpm dlx shadcn@latest add https://godui.design/r/magic-button.json",
    },
    {
      label: "Add a component via the @godui registry namespace",
      command: "pnpm dlx shadcn@latest add @godui/magic-button",
    },
    {
      label: "Install the GodUI MCP server into an AI IDE",
      command: "pnpm dlx @godui/cli@latest install cursor",
    },
  ],
  gettingStarted: [
    "GodUI targets React + TypeScript on Tailwind CSS v4. Set up shadcn/ui first with `pnpm dlx shadcn@latest init` (npm, yarn and bun equivalents work too) so the project has a components.json. GodUI has no npm package of its own; components are source files copied into your repo. See https://godui.design/docs/installation.",
    "Add any component with its registry URL, for example `pnpm dlx shadcn@latest add https://godui.design/r/magic-button.json`. This writes the file to `components/godui/magic-button.tsx` and merges the GodUI theme tokens and component styles into the global stylesheet automatically.",
    "Or register the namespace once in components.json as `{ \"registries\": { \"@godui\": \"https://godui.design/r/{name}.json\" } }` and then install by name with `pnpm dlx shadcn@latest add @godui/magic-button`. Names come from https://godui.design/r/registry.json (108 items, grouped into buttons, inputs, navigation, overlays, layout, text, ai, collaboration, visualizations, effects, backgrounds, glass and static effects).",
    "Each item pulls the `@godui/godui-theme` registry dependency plus its own npm dependencies, which the shadcn CLI installs for you: 73 of the 108 items need `framer-motion`, and a few need extras such as `cobe` (globe), `canvas-confetti` (confetti), `matter-js`, `uqr`, `rough-notation` or `dotted-map`. Peer ranges from the repo are React `^18 || ^19` and `framer-motion` `>=11`. Components carry a `\"use client\"` directive and the theme adds its own keyframes, so no extra provider is required.",
    "Optionally install the GodUI MCP server so an agent can search the catalog by description: `pnpm dlx @godui/cli@latest install cursor` (or windsurf, claude, cline, roo-cline), or add `@godui/mcp` manually. It runs locally over stdio, needs no API key, and exposes `list_components`, `search_components` and `get_component` (https://godui.design/docs/mcp).",
  ],
  preview: {
    src: "https://godui.design/og-image.png",
    alt: "GodUI — UI Collection for Modern Interfaces",
  },
  agentPrompt: `Add GodUI (https://godui.design) motion components to this existing project.

GodUI is an open-source collection of animated React components built with TypeScript, Tailwind CSS v4, Motion and shadcn/ui. It is distributed as a shadcn registry, so components are copied source files in my repo rather than a versioned npm package. There is no GodUI runtime package to depend on.

Prerequisites:
- My stack is React + TypeScript with Tailwind CSS v4. Check for components.json in the project root; if it is missing, run pnpm dlx shadcn@latest init first.
- Components import \`framer-motion\` (peer \`>=11\`) where the registry manifest lists it. Do not add it if the install already did.

Steps:
1. Read the machine-readable docs before touching the project. https://godui.design/llms.txt indexes every page, https://godui.design/llms-full.txt is the whole documentation in one file, and https://godui.design/docs.json is the manifest. Prefer these over guessing prop names.
2. Pick a component from https://godui.design/docs/components. The catalogue at https://godui.design/r/registry.json lists all 108 items with their exact slugs across buttons, inputs, navigation, overlays, layout, text, ai, collaboration, visualizations, effects, backgrounds, glass and static effects. Most components also have a companion "Anatomy of ..." page explaining the implementation.
3. Install it from the project root with pnpm dlx shadcn@latest add https://godui.design/r/<name>.json, using a real name from the registry. This writes to components/godui/<name>.tsx and merges the GodUI theme tokens and styles into the global stylesheet.
4. To install by name instead, add the namespace once to components.json as { "registries": { "@godui": "https://godui.design/r/{name}.json" } } and run pnpm dlx shadcn@latest add @godui/<name>.
5. First usage: import the component from components/godui/, keep its "use client" directive, and adapt its Tailwind classes to my design tokens. Every item carries the @godui/godui-theme registry dependency, so light and dark mode work through CSS variables and the .dark class with no extra config. Then confirm the app builds and the animation runs.
6. Optional: to let an agent search the catalog by description, run pnpm dlx @godui/cli@latest install cursor (or windsurf, claude, cline, roo-cline), or register @godui/mcp manually. It runs locally over stdio via npx, needs no API key, and serves the live registry at https://godui.design/r.

Notes:
- Dependencies are per component and the shadcn CLI installs them: 73 of 108 items need framer-motion, and individual items add cobe, canvas-confetti, matter-js, uqr, rough-notation or dotted-map.
- GodUI is font-agnostic. The theme ships a neutral system font stack; override --font-sans (and optionally --font-mono or --font-serif) in the global stylesheet, or install the geist package to match the docs site.
- The project is MIT licensed and the installed files are mine to edit. Third-party packages and demo media keep their own licenses.
- For reproducible installs, the MCP server can be pinned to a commit-addressed registry snapshot with GODUI_REGISTRY_URL and GODUI_REGISTRY_REVISION (https://github.com/LucasBassetti/godui/blob/main/MCP_REGISTRY_POLICY.md).`,
  pricing: {
    model: "free",
    summary: "All motion components are free for personal and commercial use, with no pro tier.",
    license: "MIT",
    source: "https://godui.design",
  },
} satisfies LibraryDetails;
