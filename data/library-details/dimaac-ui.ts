import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.dimaac.com",
  repoUrl: "https://github.com/DimaacUI/DiMaac-UI",
  install: [
    { label: "Initialize the components directory", command: "npx dimaac init" },
    { label: "Add one component (dimaac CLI)", command: "npx dimaac add ImageGallery" },
    { label: "Add every component", command: "npx dimaac add --all" },
    { label: "Add one component plus its demo example", command: "npx dimaac add MouseTiltCard -e" },
    { label: "Runtime deps for manual installs", command: "npm install react @gsap/react" },
  ],
  gettingStarted: [
    "Prerequisites: Node.js 14 or newer, an existing React project with TypeScript support, and Tailwind CSS. The `dimaac` CLI copies component source into your repo; there is no runtime npm package to depend on.",
    "Create the components directory in your project by running `npx dimaac init` from the project root.",
    "Add a component with `npx dimaac add MouseTiltCard`. Run `npx dimaac add` with no argument to list the available components, add the `-e` flag to also copy the matching demo, or use `--all` to install every component at once.",
    "Install the dependencies the component imports: `npm install react @gsap/react`, plus any GSAP plugins that component registers, for example Draggable, MotionPathPlugin, InertiaPlugin, ScrollTrigger or Flip. Components land under `components/` grouped by category and demos under `examples/`.",
    "Import the component into a page and render it. Every component is a client component (`\"use client\"`) that calls `gsap.registerPlugin(...)` and drives its animation through the `useGSAP` hook, so it must run in a browser environment.",
  ],
  preview: {
    src: "https://opengraph.githubassets.com/2/DimaacUI/DiMaac-UI",
    alt: "DiMaac UI repository social preview",
  },
  agentPrompt: `Help me use DiMAAC UI (https://ui.dimaac.com) in this existing project. It is a catalog of copy-paste React components for galleries, cards, scroll animations and text effects, built with Tailwind CSS and GSAP.

Prerequisites:
- My stack is React + TypeScript with Tailwind CSS. Check that Tailwind is already set up before adding components.
- Components are source files copied into my repo, not an npm runtime package. Do not add a dimaac dependency to package.json.
- Requirements per the docs: Node.js >= 14, React with TypeScript support, and Tailwind CSS.

Steps:
1. From the project root, run npx dimaac init to create the components directory.
2. Pick a component from https://ui.dimaac.com and run npx dimaac add <ComponentName>, for example npx dimaac add ImageGallery. Use npx dimaac add on its own to list the available components, the -e flag to also copy the matching demo example, or --all to install every component.
3. Install what the component actually imports: npm install react @gsap/react, plus the specific GSAP plugins it registers. The CLI does not install these, so read the component source and add every import it needs (for example gsap/Draggable, gsap/MotionPathPlugin, gsap/InertiaPlugin, gsap/ScrollTrigger, gsap/Flip). Also add clsx and tailwind-merge if the project is missing the lib/utils.ts cn() helper the components rely on.
4. First usage: import the copied component into an existing page and render it. The component lands in components/<category>/<Name>.tsx and its demo in examples/<category>/<Name>Demo.tsx. Adapt it to my theme tokens and import conventions, then confirm the app still builds and the animation runs.
5. If the component imports next/image, keep it on a Next.js page or swap it for a plain img in another React setup, since the gallery components are written against next/image.

Consult the component page on https://ui.dimaac.com for the current CLI command, the prop list and the full source before changing anything. Each page shows both a "Using CLI" command and a "Manual Installation" alternative. Keep the copied files in my repo and treat them as mine to edit.`,
} satisfies LibraryDetails;
