import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://tween-ui.vercel.app/installation/setup-guide",
  repoUrl: "https://github.com/StaticMania/tween-ui",
  registrySetup: {
    description: "Start from an existing shadcn project (a components.json at the root) running React 19 and Tailwind CSS v4; run `pnpm dlx shadcn@latest init` if you have none. The CLI adds the `@tween-ui` registry to components.json on the first install, or you can add it up front so the whole team resolves it the same way.",
    config: `{
  "registries": {
    "@tween-ui": "https://tween-ui.vercel.app/r/{name}.json"
  }
}`,
  },
  install: [
    { label: "Add one component", command: "pnpm dlx shadcn@latest add @tween-ui/glow-button" },
    { label: "Add several at once", command: "pnpm dlx shadcn@latest add @tween-ui/glow-button @tween-ui/flip-card" },
    { label: "Add by URL, without the registry entry", command: "pnpm dlx shadcn@latest add https://tween-ui.vercel.app/r/icon-trail-button.json" },
  ],
  gettingStarted: [
    "Make sure the project has a `components.json` and uses React 19 and Tailwind CSS v4. If it has none, run `pnpm dlx shadcn@latest init`. Requirements are listed in the setup guide at https://tween-ui.vercel.app/installation/setup-guide.",
    "Pick a component or block from https://tween-ui.vercel.app/components. Each page has a live preview, an install tab, the full source, a props table and an accessibility note on what happens under reduced motion.",
    "Install it by name, for example `pnpm dlx shadcn@latest add @tween-ui/glow-button`. Each component lands as a single file in `components/tweenui/`, and components that animate with GSAP pull in `gsap` and `@gsap/react` automatically.",
    "Import it from the generated path, for example `import GlowButton from '@/components/tweenui/glow-button';`. The file is yours from then on, so change durations, easing and styles directly in the source.",
    "To let an AI editor browse and install components, add the `@tween-ui` registry to components.json first, then run `pnpm dlx shadcn@latest mcp init --client claude` (or cursor, vscode, codex, opencode). There is no separate Tween UI MCP server; see https://tween-ui.vercel.app/installation/mcp.",
  ],
  preview: {
    src: "https://tween-ui.vercel.app/og?title=Tween+UI&description=GSAP+%26+CSS+animated+components+for+React.+Copy+the+source%2C+own+the+animation.",
    alt: "Tween UI official preview",
  },
  agentPrompt: `Add Tween UI (https://tween-ui.vercel.app) animated components to this existing React project.

Tween UI is a shadcn registry of GSAP and CSS animated React components (16 components and 20 page-level blocks). There is no runtime package: the shadcn CLI copies each component's single .tsx file into the project.

Prerequisites:
- A shadcn project: confirm a components.json exists at the repository root. If it does not, run pnpm dlx shadcn@latest init and follow the prompts.
- React 19 and Tailwind CSS v4. Check package.json before installing anything. If the project is on an older React or Tailwind, stop and tell me instead of upgrading.
- Inspect components.json aliases and the existing global CSS so the installed files match the project's paths and tokens.

Steps:
1. Read https://tween-ui.vercel.app/installation/setup-guide. The @tween-ui namespace is resolved by the shadcn CLI automatically on first install; to register it up front, add "@tween-ui": "https://tween-ui.vercel.app/r/{name}.json" under registries in components.json.
2. Ask me which component or block I need, then find it at https://tween-ui.vercel.app/components. Read its page for props and its accessibility note.
3. Install it with pnpm dlx shadcn@latest add @tween-ui/<name>, for example @tween-ui/glow-button. Several names can be passed in one command. Without the registry entry, pass the URL form instead: pnpm dlx shadcn@latest add https://tween-ui.vercel.app/r/<name>.json.
4. The file is written to components/tweenui/<name>.tsx. Components that animate with GSAP add gsap and @gsap/react as dependencies; confirm they were added to package.json with the project's package manager.
5. Import it from its real location (for example import GlowButton from '@/components/tweenui/glow-button'), add it to the target screen and run the project's typecheck and build.
6. Check the animation at its real trigger point, then with prefers-reduced-motion enabled. Per the repository README, every component renders its finished state instead of animating when reduced motion is requested; confirm that holds after any edits.

Notes:
- The code is MIT licensed (see https://github.com/StaticMania/tween-ui). Treat installed files as project source and edit them freely.
- Anything a CSS transition can do stays CSS in these components; GSAP is used for timelines, ScrollTrigger and SplitText. GSAP 3.13+ is required for the components that use it.
- Do not use "@tweenui" as the namespace: it has a hyphen, @tween-ui. The setup guide's troubleshooting section covers the "Unknown registry" error.
- Blocks are page sections and some are built from the components, so installing one may pull several registry items.`,
  pricing: {
    model: "free",
    summary: "Every component and block is free to copy under the MIT license; the repository and site list no paid tier.",
    license: "MIT",
    source: "https://github.com/StaticMania/tween-ui",
  },
} satisfies LibraryDetails;
