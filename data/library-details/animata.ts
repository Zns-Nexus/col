import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://animata.design",
  repoUrl: "https://github.com/codse/animata",
  registrySetup: {
    description: "For the shadcn route, initialize shadcn if needed, then use the full registry URL from the component page. Animata URLs include the category and component name; no namespace entry is required. Manual copy and paste is also supported.",
  },
  install: [
    {
      label: "Install one component (shadcn CLI)",
      command:
        "pnpm dlx shadcn@latest add https://animata.design/r/button/toggle-switch.json",
    },
    {
      label: "Base dependencies for copy-pasted components",
      command: "npm install tailwind-merge clsx lucide-react",
    },
    {
      label: "Clone the repo to run the docs site locally",
      command: "git clone https://github.com/codse/animata.git",
    },
  ],
  gettingStarted: [
    "Prerequisites: a React + TypeScript project that already runs Tailwind CSS v4, with a `components` folder at the project root and the `@/*` alias configured in tsconfig.json. The full requirements list is at https://animata.design/docs/setup.",
    "Install the base dependencies with `npm install tailwind-merge clsx lucide-react`. Tailwind v4 ships the animation utilities natively, so the `tailwindcss-animate` plugin is no longer needed.",
    "Create `utils.ts` exporting a `cn(...inputs: ClassValue[])` helper built on `clsx` and `tailwind-merge`, placed where the `@/` alias in tsconfig.json resolves it.",
    "Add a component from its docs page, for example https://animata.design/docs/button/toggle-switch, with `pnpm dlx shadcn@latest add https://animata.design/r/<category>/<slug>.json` run from the project root. The registry writes the file to `components/animata/<category>/`.",
    "Install the `motion` package (https://motion.dev) only for the components whose source imports it; the rest run on React state and Tailwind classes. If an animation does not play, the docs may be missing a `@keyframes` or `@theme` rule, so copy the missing CSS from the source at https://github.com/codse/animata.",
  ],
  preview: {
    src: "https://assets.animata.design/og/animata-og-2026.png",
    alt: "Animata.design home page preview",
  },
  agentPrompt: `Add Animata (https://animata.design) to this existing project: a free, MIT licensed collection of hand-crafted animation, effect and interaction components for React and Tailwind CSS. There is no animata npm package to import. The component source is copied into my repo the same way shadcn/ui works.

Prerequisites:
- My stack is React + TypeScript + Tailwind CSS. The Animata repo itself runs Next.js, React and Tailwind CSS v4, but the components only need React and Tailwind.
- Animata components import through the "@/" alias, so the project needs a components folder at the root and a matching paths entry in tsconfig.json.
- Some components import the motion package (https://motion.dev) and lucide-react. Install those only when the copied source needs them.

Steps:
1. Read the setup guide at https://animata.design/docs/setup, then install the base dependencies: npm install tailwind-merge clsx lucide-react. Do not add the tailwindcss-animate plugin; Tailwind CSS v4 includes the animation utilities.
2. Create utils.ts with the cn helper from the same guide, built on clsx and tailwind-merge, and make sure it sits where the "@/..." imports in the component code resolve.
3. Pick a component from the catalog, for example https://animata.design/docs/button/toggle-switch, and install it from the project root with pnpm dlx shadcn@latest add https://animata.design/r/button/toggle-switch.json. The registry writes components/animata/button/toggle-switch.tsx into my repo. If shadcn is not configured, copy the source from the component page into that file instead.
4. First usage: import the component into an existing page or view, adapt it to my theme tokens and import conventions, and confirm the app still builds.
5. If an animation does not run, check whether the docs page omits CSS: copy the missing @keyframes or @theme values from the component source in https://github.com/codse/animata.

Treat every installed file as mine to edit, and take component APIs, dependencies and CSS only from animata.design.`,
  pricing: {
    model: "free",
    summary: "Animata is free and open source forever, with no paid tier.",
    license: "MIT",
    source: "https://animata.design",
  },
} satisfies LibraryDetails;
