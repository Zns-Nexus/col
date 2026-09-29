import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.obsidianui.dev",
  repoUrl: "https://gitlab.com/Atharvsinh-codez/ObsidianUI",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@obsidian": "https://www.obsidianui.dev/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "Add a component (shadcn registry)",
      command:
        'npx shadcn@latest add "https://www.obsidianui.dev/r/{name}.json"',
    },
    {
      label: "Base dependencies",
      command: "npm install motion clsx tailwind-merge lucide-react",
    },
    {
      label: "Tailwind CSS v4 (if not already set up)",
      command: "npm install tailwindcss @tailwindcss/postcss postcss",
    },
    {
      label: "Add the shadcn MCP server to an editor",
      command: "npx shadcn@latest mcp init",
    },
  ],
  gettingStarted: [
    "Prerequisites: a React + TypeScript project on Tailwind CSS v4 with a components.json. Run `npx shadcn@latest init` if shadcn is not configured yet. ObsidianUI has no npm package of its own; components are source files copied into your repo.",
    "Create the project from scratch with the documented setup flow: `npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'`, then `cd my-app` (https://www.obsidianui.dev/docs/installation).",
    "Install the base packages with `npm install motion clsx tailwind-merge lucide-react`, then add a `cn` helper in `lib/utils.ts` (or `src/lib/utils.ts`) that combines `clsx` and `twMerge` (https://www.obsidianui.dev/docs/add-utilities).",
    'Choose a component at https://www.obsidianui.dev/components and install it with `npx shadcn@latest add "https://www.obsidianui.dev/r/{name}.json"`, for example https://www.obsidianui.dev/r/hover-img.json. Each manifest writes its full source into your repo and installs that item\'s dependencies.',
    'For AI agents, register the source in components.json as `{ "registries": { "@obsidian": "https://www.obsidianui.dev/r/{name}.json" } }` and run `npx shadcn@latest mcp init`, or `npx shadcn@latest mcp init --client cursor` for a specific editor (https://www.obsidianui.dev/docs/cli).',
  ],
  preview: {
    src: "https://cdn-new.obsidianui.dev/og-image.png",
    alt: "ObsidianUI React and Tailwind CSS components library preview",
  },
  agentPrompt: `Add ObsidianUI components (https://www.obsidianui.dev) to this existing project.

ObsidianUI is an open-source React component library published as a shadcn registry: every component is a JSON manifest of complete source files that the shadcn CLI copies into the repo. There is no npm package to install, and nothing stays locked in after install.

Prerequisites:
- My stack is React + TypeScript with Tailwind CSS v4 and a working components.json. If components.json is missing, run npx shadcn@latest init first.
- I have no account, API key or cookie: every public read on the site is unauthenticated.

Steps:
1. Read the machine-readable docs before touching the project. https://www.obsidianui.dev/llms.txt is the resource index, https://www.obsidianui.dev/agent-instructions.md is the agent guide, and any page is available as Markdown at https://www.obsidianui.dev/markdown/<path>.md or by sending the Accept: text/markdown header. Prefer them over guessing.
2. Pick a component from https://www.obsidianui.dev/components. The ones with published guides are hover-img, v-prism, split-showcase, art-gallery, flip-text, text-stream and draggable-marquee; https://www.obsidianui.dev/r/registry.json lists the rest of the items, including supporting UI primitives.
3. Install it from the project root with npx shadcn@latest add "https://www.obsidianui.dev/r/{name}.json", using a real name from the catalogue. This writes the actual files into the project and installs the item's dependencies.
4. Make sure the base utilities exist. Run npm install motion clsx tailwind-merge lucide-react and add a cn() helper to lib/utils.ts (or src/lib/utils.ts) using clsx and twMerge. If Tailwind is missing, run npm install tailwindcss @tailwindcss/postcss postcss, set plugins to { "@tailwindcss/postcss": {} } in postcss.config.mjs, and add @import "tailwindcss"; to the global CSS file (https://www.obsidianui.dev/docs/install-tailwind).
5. First usage: import the component into an existing page, map the manifest's @ui/, @components/, @lib/ and @hooks/ targets through the aliases in my components.json (for example @ui/button.tsx resolves to src/components/ui/button.tsx), never creating literal @-named directories. Keep "use client" directives and any co-located CSS, then confirm the app builds and the interaction actually works.

Notes:
- Dependencies differ per component. Install exactly what each manifest lists: gsap for hover-img, draggable-marquee and text-stream; clsx, motion, tailwind-merge and three for art-gallery; next-themes, postprocessing and three for v-prism; lenis for smooth-scroll.
- Alias-prefixed targets resolve through the destination project's components.json; a public/ target is relative to the project root.
- If meta.remoteAssets lists demo images or videos, swap in the project's own assets, and implement any meta.requiredEndpoints myself. Check the result with real content, keyboard input, the reduced-motion setting and the target viewport.
- Known upstream quirk: the top-level name and homepage fields in https://www.obsidianui.dev/r/registry.json still say rare-ui. The individual item manifests are correct.
- ObsidianUI is MIT licensed and the installed files are mine to edit; third-party packages and demo media keep their own licenses.`,
} satisfies LibraryDetails;
