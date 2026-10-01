import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.fancycomponents.dev",
  repoUrl: "https://github.com/danielpetho/fancy",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@fancy": "https://www.fancycomponents.dev/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "Base dependencies",
      command: "npm install tailwindcss@latest motion",
    },
    {
      label: "Initialize shadcn (if the project has no components.json)",
      command: "npx shadcn@latest init",
    },
    {
      label: "Add a component from the @fancy registry",
      command: "npx shadcn add @fancy/gravity",
    },
    {
      label: "Install the dependencies the CLI added to package.json",
      command: "npm install",
    },
    {
      label: "Physics components (only if not added by the CLI)",
      command: "npm install matter-js @types/matter-js poly-decomp svg-path-commander lodash",
    },
  ],
  gettingStarted: [
    "Prerequisites: a React + TypeScript project on Tailwind CSS with a components.json. Run `npx shadcn@latest init` if shadcn is not configured yet. The components are built with React, TypeScript, Tailwind CSS and mainly Motion (formerly Framer Motion), so install those with `npm install tailwindcss@latest motion` (https://www.fancycomponents.dev/docs/installation).",
    'Register the catalog in your components.json under the existing `registries` field: `{ "registries": { "@fancy": "https://www.fancycomponents.dev/r/{name}.json" } }`. There is no Fancy Components npm package; components are source files copied into your repo.',
    "Pick a component from https://www.fancycomponents.dev/components and run `npx shadcn add @fancy/<name>`, for example `npx shadcn add @fancy/gravity` or `npx shadcn add @fancy/letter-swap`. The CLI writes the component source into your project and adds its dependencies to package.json.",
    "Run `npm install` afterwards. As the install guide notes, additional dependencies are only written to package.json, not installed automatically, so without this step the component will fail to import.",
    "Import the copied file and render it. For example Gravity lands at `src/components/fancy/physics/gravity.tsx`; wrap the page in `Gravity` and each element in `MatterBody`, keep the `\"use client\"` directive, and use the `debug` prop to visualize the Matter.js bodies. The manual copy-paste path (source plus any helper files from a component's Installation section) is documented as the alternative to the CLI.",
  ],
  preview: {
    src: "https://www.fancycomponents.dev/og.jpg",
    alt: "Fancy Components free and open source React components library preview",
  },
  agentPrompt: `Add Fancy Components (https://www.fancycomponents.dev) to this existing project.

Fancy Components is a free, MIT-licensed collection of playful React components and microinteractions, published as a shadcn registry rather than an npm package. It recreates effects found on award-winning sites: text scrambles and letter swaps, marquees, SVG filters, image trails, and Matter.js physics scenes such as Gravity and Cursor Attractor & Gravity. The shadcn CLI copies complete source files into the repo, so nothing stays locked in.

Prerequisites:
- My stack is React + TypeScript with Tailwind CSS and a components.json. If components.json is missing, run npx shadcn@latest init first.
- The project has a cn() helper in lib/utils.ts (shadcn init creates it) and a resolvable @/* path alias to src/. Registry items target paths like fancy/physics/gravity, which resolve to src/components/fancy/physics/gravity.

Steps:
1. Read the machine-readable docs before touching the project. https://www.fancycomponents.dev/llms.txt is the full component index, and appending .md to any docs URL returns Markdown, for example https://www.fancycomponents.dev/docs/installation.md and https://www.fancycomponents.dev/docs/components/physics/gravity.md. Prefer them over guessing.
2. Register the catalog in components.json under the existing registries field: { "registries": { "@fancy": "https://www.fancycomponents.dev/r/{name}.json" } }. The full item list, with per-item dependencies and file targets, is at https://www.fancycomponents.dev/r/registry.json.
3. Install the base packages with npm install tailwindcss@latest motion, then add one component by its registry name, for example npx shadcn add @fancy/gravity or npx shadcn add @fancy/letter-swap.
4. Run npm install after the add. The CLI only appends a component's dependencies to package.json; it does not install them, so imports fail without this step.
5. First usage: import the copied file into an existing page, keep its "use client" directive, and run the app. For physics components, wrap a scene in Gravity and each element in MatterBody, set x and y as percentages or pixels, and use the debug prop to draw the Matter.js bodies while tuning matterBodyOptions. The Gravity ref exposes start(), stop() and reset(). Confirm the app builds and the interaction works.

Notes:
- Gravity and cursor-attractor-and-gravity depend on matter-js, @types/matter-js, poly-decomp and svg-path-commander (plus lodash for debounce). Most other items need only motion; a few add uuid, lenis, lucide-react or clsx. Install exactly what the registry lists for the item.
- Component-specific packages are documented in the Installation section of each component's page, not in the global install guide.
- Some components require variable fonts, and the Gooey SVG Filter and Pixelate SVG Filter have limited or no Safari support.
- Tailwind v4 is supported, with configuration in the CSS file. CSS variables from the registry may need to be added to global.css manually, because the CLI does not merge them when layers are used.
- The installed files are mine to edit. Motion, Matter.js and the other third-party packages keep their own licenses.`,
  pricing: {
    model: "free",
    summary: "Every component and microinteraction is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/danielpetho/fancy/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
