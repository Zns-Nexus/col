import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.aceternity.com",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@aceternity": "https://ui.aceternity.com/registry/{name}.json"
  }
}`,
  },
  install: [
    { label: "Initialize shadcn in the project", command: "npx shadcn@latest init" },
    {
      label: "Add a component by registry URL",
      command: "npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json",
    },
    {
      label: "Add a component via the @aceternity alias",
      command: "npx shadcn@latest add @aceternity/bento-grid",
    },
    { label: "Install the motion peer dependency", command: "npm install motion" },
  ],
  gettingStarted: [
    "Use a React or Next.js project with TypeScript and Tailwind CSS configured (npx create-next-app@latest if starting fresh).",
    "Run npx shadcn@latest init to create components.json and the cn utility.",
    'Add the registry to components.json: { "registries": { "@aceternity": "https://ui.aceternity.com/registry/{name}.json" } }.',
    "Install a component, for example npx shadcn@latest add @aceternity/bento-grid, or use the full URL https://ui.aceternity.com/registry/bento-grid.json.",
    "Install peers as needed (npm install motion; three and @react-three/fiber for 3D components), then import the component from your components directory and render it.",
  ],
  preview: {
    src: "https://ui.aceternity.com/banner.png",
    alt: "Aceternity UI",
  },
  agentPrompt: `Add Aceternity UI (https://ui.aceternity.com) to this existing project.

Prerequisites: React or Next.js (Next.js 14+ recommended), TypeScript, Tailwind CSS v3 or v4 already configured. Components are distributed as source code through the shadcn registry, so there is no npm package to install; the code is copied into the project.

Steps:
1. Run "npx shadcn@latest init" if the project has no components.json yet.
2. Add this to components.json: { "registries": { "@aceternity": "https://ui.aceternity.com/registry/{name}.json" } }
3. Install one component to verify the flow: "npx shadcn@latest add @aceternity/bento-grid" (the full URL form "npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json" also works).
4. Install peers: "npm install motion" for animated components. 3D components also need "three" and "@react-three/fiber".
5. Import the component from the components directory and render it in an existing page, adjusting classes to match this project's theme.

Check the official docs at https://ui.aceternity.com (CLI reference: https://ui.aceternity.com/components/cli) for per component options and extra dependencies before adding more components.`,
} satisfies LibraryDetails;
