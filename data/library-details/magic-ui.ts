import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://magicui.design/docs",
  repoUrl: "https://github.com/magicuidesign/magicui",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@magicui": "https://magicui.design/r/{name}"
  }
}`,
  },
  componentInstallTemplate: "npx shadcn@latest add @magicui/{slug}",
  install: [
    { label: "Initialize shadcn in the project", command: "npx shadcn@latest init" },
    { label: "Add a Magic UI component", command: "npx shadcn@latest add @magicui/globe" },
  ],
  gettingStarted: [
    "Use a React project with TypeScript and Tailwind CSS configured (npx create-next-app@latest --typescript --tailwind if you are starting fresh).",
    "From the project root run npx shadcn@latest init so the project has components.json and the cn utility.",
    "Add a component, for example npx shadcn@latest add @magicui/globe. The source file is copied into components/ui/ and its npm dependencies (for example motion, cobe) are installed for you.",
    'Import and render it: import { Globe } from "@/components/ui/globe" then use <Globe /> in a page or component.',
    "Pick more components from https://magicui.design/components and repeat the add command for each one, then adjust the Tailwind classes to match your theme.",
  ],
  preview: {
    src: "https://magicui.design/og",
    alt: "Magic UI website preview",
  },
  agentPrompt: `Add Magic UI (https://magicui.design) to this existing project.

Prerequisites: React + TypeScript with Tailwind CSS already configured (Next.js works out of the box). Magic UI components are distributed through the shadcn registry: the CLI copies the source files into the project as editable files, so you do not import them from an npm package.

Steps:
1. Read the official docs at https://magicui.design/docs (installation page: https://magicui.design/docs/installation) and use those commands rather than guessing.
2. Check for a components.json in the project root. If it is missing, run "npx shadcn@latest init" and answer the prompts so shadcn is set up for this stack.
3. Pick a component from https://magicui.design/components and install it from the project root with "npx shadcn@latest add @magicui/<name>" (for example "npx shadcn@latest add @magicui/globe").
4. First usage: import the component from its path shown on its docs page (for the globe it is "@/components/ui/globe"), render it in an existing page, and confirm the app still builds.
5. Repeat step 3 for any other component you need. npm dependencies listed by each component are installed by the CLI automatically; install peers yourself only if the docs page for that component says so.

Keep the copied component files in the repo and edit them freely to match this project's theme.`,
  pricing: {
    model: "freemium",
    summary: "The components are free; Magic UI Pro sections and templates are a paid one-time purchase.",
    license: "MIT",
    source: "https://pro.magicui.design",
  },
} satisfies LibraryDetails;
