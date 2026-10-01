import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://cult-ui.com/docs",
  repoUrl: "https://github.com/nolly-studio/cult-ui",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "Initialize shadcn/ui in the project first",
      command: "npx shadcn@latest init",
    },
    {
      label: "Tailwind CSS v4 and class-name utilities",
      command: "npm install -D tailwindcss@latest @tailwindcss/postcss clsx tailwind-merge",
    },
    {
      label: "Animation runtime used by the components",
      command: "npm install motion",
    },
    {
      label: "Add one component (shadcn CLI v3 registry)",
      command: "npx shadcn@beta add @cult-ui/text-gif",
    },
    {
      label: "Add one component by its registry URL",
      command: "npx shadcn@latest add https://cult-ui.com/r/ai-instructions.json",
    },
    {
      label: "Add the shadcn MCP server to an editor",
      command: "npx shadcn@latest mcp init --client <cursor|claude|vscode>",
    },
  ],
  gettingStarted: [
    "Cult UI is a shadcn/ui registry, not an npm package. Start from a React + TypeScript project that already runs Tailwind CSS v4, and run `npx shadcn@latest init` so the project root has a `components.json`.",
    "Install the peer dependencies the components expect: `npm install -D tailwindcss@latest @tailwindcss/postcss clsx tailwind-merge` plus `npm install motion`. Animations are built on the `motion` package, imported as `motion/react`. The manual guide also lists `lucide-react` for the `default` style and `@radix-ui/react-icons` for `new-york`.",
    "Add a `cn()` helper in `lib/utils.ts` that merges `clsx` and `tailwind-merge`. Every component imports it from `@/lib/utils`, so the `@` alias must resolve in `tsconfig.json`.",
    "Register the registry in `components.json` under `registries` as `\"@cult-ui\": \"https://cult-ui.com/r/{name}.json\"`, then install with `npx shadcn@beta add @cult-ui/<component-name>`. `npx shadcn@beta search @cult-ui --query \"texture-button\"` lists what the registry contains.",
    "Follow the framework guide for your stack at https://cult-ui.com/docs/installation (Next.js, Vite, or manual React) and the CSS variable setup at https://cult-ui.com/docs/theming. The Next.js and Vite pages still show `npx cult-ui@latest init` and `npx cult-ui@latest add button`, but no `cult-ui` package is published on npm — use the shadcn registry commands instead.",
  ],
  preview: {
    src: "https://opengraph.githubassets.com/1/nolly-studio/cult-ui",
    alt: "Cult UI repository social preview",
  },
  agentPrompt: `Add Cult UI (https://cult-ui.com) to this existing project. Cult UI is a curated set of motion-heavy, niche React components distributed as source through a shadcn/ui-compatible registry. It is not an npm package: you copy the component code into the repo and own it.

Prerequisites:
- React + TypeScript with Tailwind CSS v4 already running. The components use CSS-first Tailwind and the \`motion\` package.
- A valid \`components.json\` at the project root. If the project does not have one, run npx shadcn@latest init first.
- Do not try to npm install cult-ui. No such package exists on npm.

Steps:
1. Read the official docs at https://cult-ui.com/docs, the installation guide at https://cult-ui.com/docs/installation, and the theming page at https://cult-ui.com/docs/theming. Use the registry commands documented there rather than any remembered commands; the Next.js and Vite guides still mention a npx cult-ui@latest CLI that is not published, so ignore it.
2. Install the runtime dependencies: npm install -D tailwindcss@latest @tailwindcss/postcss clsx tailwind-merge, then npm install motion.
3. Make sure lib/utils.ts exports a cn() helper built on clsx and tailwind-merge, and that the @ path alias resolves in tsconfig.json. Components fail to compile without it.
4. Register the registry in components.json by adding this under the "registries" key: "@cult-ui": "https://cult-ui.com/r/{name}.json"
5. Pick components from https://cult-ui.com/components and install each one from the project root with: npx shadcn@beta add @cult-ui/<component-name> — for example npx shadcn@beta add @cult-ui/texture-card. The same page also documents a direct-URL form: npx shadcn@latest add https://cult-ui.com/r/<component-name>.json. Use npx shadcn@beta search @cult-ui --query "keyword" to confirm the exact registry name before installing.
6. First usage: import the new component into an existing page, adjust it to the project's theme tokens and import conventions, and confirm the app still builds and the animation runs.
7. Optional for coding agents: run npx shadcn@latest mcp init --client <cursor|claude|vscode> to wire up the shadcn MCP server (setup notes at https://cult-ui.com/docs/mcp-server). The server reads the @cult-ui namespace from components.json, so the assistant can browse and install components from this registry directly.

Keep the installed component files in the repo and treat them as editable code. Components rely on the shadcn theme CSS variables, so keep the globals.css theming block intact when restyling.`,
  pricing: {
    model: "freemium",
    summary: "The components are free and open source; Cult Pro is a separate paid product.",
    license: "MIT",
    source: "https://cult-ui.com",
  },
} satisfies LibraryDetails;
