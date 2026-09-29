import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.hampton.io",
  registrySetup: {
    description: "Initialize shadcn if needed. Use the install command from a component page to access the Hampton registry. No separate registry package is installed; component source and dependencies are copied into your project.",
  },
  install: [
    {
      label: "Add a component with the shadcn CLI",
      command: "npx shadcn@latest add https://ui.hampton.io/r/aurora-button.json",
    },
    {
      label: "Add a block with the shadcn CLI",
      command: "npx shadcn@latest add https://ui.hampton.io/r/hero-split.json",
    },
    {
      label: "Manual install dependencies",
      command: "npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],
  gettingStarted: [
    "Start from a React + TypeScript project that already runs Tailwind CSS and shadcn/ui. Run npx shadcn@latest init first if the project root has no components.json.",
    "Browse https://ui.hampton.io/components, https://ui.hampton.io/blocks or https://ui.hampton.io/layouts and open an item. The site listed 328 components, 26 blocks and a layouts section as of September 2026.",
    "Copy the one-line command from the item's Installation section. It has the form npx shadcn@latest add https://ui.hampton.io/r/<slug>.json, and the same form works for components and blocks.",
    "Run the command from the project root. The shadcn CLI reads the registry entry at https://ui.hampton.io/r/<slug>.json, writes the source file into components/ui/ and installs the listed npm dependencies.",
    "After the first install, fix the one gap the registry does not cover: every component imports a project-level type from @/lib/style-presets, which the registry does not ship. Add that file yourself, or strip the style-presets prop before compiling.",
  ],
  preview: {
    src: "https://ui.hampton.io/favicon.ico",
    alt: "Hampton UI logo",
  },
  agentPrompt: `Add UI by Hampton components to this existing project.

What this is: a free, MIT-licensed library of shadcn/ui-style React components, blocks and layouts published at https://ui.hampton.io and distributed through a standard shadcn registry. Nothing is installed as a library package; the CLI copies source files into my repo, so the code becomes mine to edit. Components use CVA variants, Tailwind utilities and shadcn theme tokens, and animated ones use framer-motion.

Prerequisites:
- The project is React + TypeScript with Tailwind CSS and shadcn/ui already set up. If there is no components.json at the project root, run npx shadcn@latest init first.
- Do not npm install a "ui-hampton" style package; there is none.

Steps:
1. Read the official site at https://ui.hampton.io and pick the exact slug for what I need from https://ui.hampton.io/components, https://ui.hampton.io/blocks or https://ui.hampton.io/layouts. Do not guess slugs; the registry only serves ones published there.
2. Install it from the project root with: npx shadcn@latest add https://ui.hampton.io/r/<slug>.json. This is the exact command the site publishes on every item page. The registry entry is served from https://ui.hampton.io/r/<slug>.json and declares type registry:ui, with dependencies such as @radix-ui/react-slot, class-variance-authority, clsx and tailwind-merge, plus framer-motion on animated items.
3. Fix the known gap: the installed file imports from "@/lib/style-presets", which the registry does not ship and the CLI cannot resolve. Either create that module exporting a StylePreset type and whatever preset values the component references, or simplify the component to drop the preset prop. Confirm the build passes before moving on.
4. First usage: import the new component into an existing page, keep my own theme tokens and import conventions, and prefer the project's own shadcn Button over the library's if both exist, to avoid two competing button implementations.
5. If I want a different look, the site offers six color themes (neutral, blue, green, violet, rose, orange), each with light and dark mode; use the project's existing theme switcher rather than adding a second one.

Check the item page for exact deps and any per-component notes before writing code, and keep the installed source in my repo rather than wrapping it in an abstraction.`,
} satisfies LibraryDetails;
