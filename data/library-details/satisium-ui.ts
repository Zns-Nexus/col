import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.satisium.com/",
  repoUrl: "https://github.com/satisium/ui",
  registrySetup: {
    description: "Initialize shadcn if needed, then use the full registry URL for a component, or the whole-registry command below to add all components. No namespace entry is required in components.json.",
  },
  install: [
    {
      label: "Initialize shadcn/ui in the project first",
      command: "npx shadcn@latest init",
    },
    {
      label: "Add one component (shadcn registry)",
      command:
        "npx shadcn@latest add https://ui.satisium.com/r/dimensional-carousel.json",
    },
    {
      label: "Add a specific variant of a component",
      command:
        "npx shadcn@latest add https://ui.satisium.com/r/velocity-strips-image.json",
    },
    {
      label: "Install the whole registry at once",
      command: "npx shadcn@latest add https://ui.satisium.com/r/registry.json",
    },
    {
      label: "GSAP dependencies (text reveals, most carousels)",
      command: "npm install gsap @gsap/react clsx tailwind-merge",
    },
    {
      label: "Three.js dependencies (image effects, some carousels)",
      command: "npm install three @react-three/fiber @react-three/drei clsx tailwind-merge",
    },
  ],
  gettingStarted: [
    "Satisium UI is a shadcn/ui registry, not an npm package. Start from a React + TypeScript project on Tailwind CSS v4, then run `npx shadcn@latest init` so the project root has a `components.json` (https://ui.satisium.com/docs/getting-started/setup).",
    "Browse the catalog at https://ui.satisium.com/docs/components (54 components across Carousels, Text Reveals, Image Effects and Mouse Trails) or https://ui.satisium.com/categories, and open a component page to read its props table and install command.",
    "Install a component from the project root with `npx shadcn@latest add https://ui.satisium.com/r/<component-name>.json`, for example https://ui.satisium.com/r/dimensional-carousel.json. The CLI copies the source into `components/satisium-ui/`, copies any demo file, and auto-installs the dependencies that component declares.",
    "Dependencies vary by category: GSAP components need `gsap @gsap/react clsx tailwind-merge`, WebGL components need `three @react-three/fiber @react-three/drei clsx tailwind-merge`, and some mouse trails need nothing beyond React. Each manifest's `dependencies` array is authoritative, so install manually only if the CLI misses one.",
    "Import the component into a page and render it. Every component is SSR-safe and ships a `prefers-reduced-motion` fallback; use `next-themes` or the ThemeProvider for dark mode, and override OKLCH design tokens in `globals.css`. Full guidance is at https://ui.satisium.com/docs/getting-started/how-to-use.",
  ],
  preview: {
    src: "https://ui.satisium.com/api/og?title=Animated%20component%20library%20for%20design%20engineers",
    alt: "Satisium UI — animated component library for design engineers",
  },
  agentPrompt: `Add Satisium UI (https://ui.satisium.com) components to this existing project.

Satisium UI is a free, MIT-licensed animated React component library distributed through the shadcn CLI registry. There is no package to depend on: each component is a JSON manifest of complete source files that the CLI copies into the repo, so the installed code is mine to edit and there is no runtime lock-in.

Prerequisites:
- React + TypeScript with Tailwind CSS v4 and a valid components.json at the project root. If it is missing, run npx shadcn@latest init first.
- The docs list Node.js 18+ and Next.js 13+ as the floor, and the library itself targets Next.js 16 App Router, React 19, Tailwind v4, GSAP, Motion, Three.js and Radix UI.
- The project must have a cn() helper in lib/utils.ts built on clsx and tailwind-merge. The setup docs list it as installed if missing.
- Do not npm install a satisium package. No such package is published on npm.

Steps:
1. Read the machine-readable docs first. https://ui.satisium.com/llms.txt is the agent knowledge base index and https://ui.satisium.com/llms-full.txt is the complete source, props tables and examples for every component. The setup guide is at https://ui.satisium.com/docs/getting-started/setup and styling guidance at https://ui.satisium.com/docs/getting-started/how-to-use. Prefer these over remembered commands.
2. Confirm the current state before installing. The library is on version 3.0.0-beta as of September 2026, a ground-up rewrite of the older "Satis UI" v2 collection, and the changelog warns that component APIs may still change before a stable release.
3. Pick a component from https://ui.satisium.com/docs/components. There are 54, in four categories: Carousels, Text Reveals, Image Effects and Mouse Trails. Some components ship variants under separate registry keys, such as velocity-strips-image and velocity-strips-video, which install individually.
4. Install it from the project root with npx shadcn@latest add https://ui.satisium.com/r/<component-name>.json, using a real name from the catalog. The registry index at https://ui.satisium.com/r/registry.json lists all 136 registry keys and is also installable in one shot: npx shadcn@latest add https://ui.satisium.com/r/registry.json
5. Let the CLI install dependencies, because they differ per component: GSAP-based text reveals and most carousels need gsap, @gsap/react, clsx and tailwind-merge; WebGL components additionally need three, @react-three/fiber and @react-three/drei; a few mouse trails need nothing beyond React. If a module-not-found error appears, install the packages the component's Dependencies installed line names.
6. Files land in components/satisium-ui/<component>.tsx, with an optional -demo file alongside. Adjust the import alias to match the project's components.json; Satisium's own repo maps its ui alias to @/components/satisium-ui.
7. First usage: render the component in an existing page, keep the "use client" directive where present, pass real image URLs, and confirm the app builds. Then check the interaction with a keyboard and with prefers-reduced-motion enabled, since the animations must degrade gracefully.

Notes:
- Components are SSR-safe and include reduced-motion fallbacks, but several use GSAP ScrollTrigger with DOM pinning and several use WebGL via React Three Fiber; budget for the bundle and for pinning layout shifts on scroll pages.
- The docs prescribe motion/react for Framer Motion v12+, Tailwind v4 utility classes, @hugeicons/react for iconography, and OKLCH CSS variables for theming. Override tokens in globals.css rather than editing component internals where you can.
- Every component page has an isolated render at /preview/<registryKey> and an iframe render at /embed/<registryKey>, so the behaviour can be checked in a clean environment before installing.
- Do not copy the site's Cloudinary preview media into a project; the docs state those assets are protected by signed URLs scoped to their own project. Use the project's own images.
- The components are MIT licensed and the installed files are mine to edit. Preview media in the demos keeps its own license.`,
} satisfies LibraryDetails;
