import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://rareui.com",
  repoUrl: "https://github.com/swamimalode07/rare-ui",
  registrySetup: {
    description: "Initialize shadcn if needed, then use the GitHub registry address swamimalode07/rare-ui/<component-name>. The CLI reads the registry from GitHub; no namespace entry is required in components.json.",
  },
  install: [
    {
      label: "Add a component (shadcn CLI)",
      command: "npx shadcn@latest add swamimalode07/rare-ui/fluid-orb",
    },
    {
      label: "Initialize an existing project first",
      command: "npx shadcn@latest init",
    },
    {
      label: "Preview an item without installing it",
      command: "npx shadcn@latest view swamimalode07/rare-ui/fluid-orb",
    },
  ],
  gettingStarted: [
    "Start from a React + TypeScript project with Tailwind CSS v4 installed and a `@/*` path alias in tsconfig.json, then run `npx shadcn@latest init` so the project has a components.json.",
    "Browse the catalog at https://rareui.com/components — each page shows a live preview, the props and the install command for that component.",
    "Install one component from the project root with `npx shadcn@latest add swamimalode07/rare-ui/<component-name>`, for example `npx shadcn@latest add swamimalode07/rare-ui/fluid-orb`.",
    "The component source, its npm dependencies and any extra CSS land in your repo as editable files. The CLI also pulls the shared `utils` registry item that provides `cn()`.",
    'Import it with your alias (for example `import FluidOrb from "@/components/ui/fluid-orb"`) and edit the file directly. Components are animated with Motion and honor `prefers-reduced-motion`.',
  ],
  preview: {
    src: "https://opengraph.githubassets.com/col/swamimalode07/rare-ui",
    alt: "Rare UI repository social preview",
  },
  agentPrompt: `Set up Rare UI (https://rareui.com) in this existing project. Rare UI is a free, open-source shadcn registry of animated React components — the code is copied into the repo, there is no runtime package to install.

Prerequisites:
- A React + TypeScript project with Tailwind CSS (v4 is what Rare UI is built against) and an "@/*" path alias in tsconfig.json pointing at the source root.
- A components.json at the project root. If it is missing, run "npx shadcn@latest init" first and answer the prompts.

Steps:
1. Read the catalog at https://rareui.com/components and the registry source at https://github.com/swamimalode07/rare-ui. Use the real component names from registry.json rather than guessing.
2. Ask which components to install, then from the project root run one command per component: "npx shadcn@latest add swamimalode07/rare-ui/<component-name>". The "swamimalode07/rare-ui" prefix is the registry namespace and is required.
3. Use "npx shadcn@latest view swamimalode07/rare-ui/<component-name>" to inspect the payload, or add "--dry-run" to an install, if you want to confirm the files and dependencies before writing them.
4. Wire one installed component into an existing page to verify it builds. Import from the alias path the CLI used (for example "@/components/ui/fluid-orb") and check the props table on the component page.
5. Treat the installed files as the project's own source: adapt them to the existing theme tokens and import conventions instead of leaving them as-is.

Notes: the CLI installs each component's npm dependencies for you (typically "motion", sometimes "vaul", "lucide-react", "flubber", "prism-react-renderer", "figma-squircle", "react-use-measure" or "@radix-ui/react-slot") and injects any keyframes it needs. The license is MIT with the Commons Clause plus an attribution requirement: shipping a Rare UI component requires a visible link back to https://rareui.com, and the components may not be resold or redistributed on their own.`,
  pricing: {
    model: "free",
    summary: "The components are free to use with attribution, but the license forbids selling the library itself.",
    license: "MIT + Commons Clause",
    source: "https://github.com/swamimalode07/rare-ui",
  },
} satisfies LibraryDetails;
