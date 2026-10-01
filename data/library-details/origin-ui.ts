import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://coss.com/ui/docs",
  repoUrl: "https://github.com/cosscom/coss",
  registrySetup: {
    description: "Origin UI now lives at coss ui. Initialize shadcn if needed, then merge this registry into components.json, preserving its existing settings. For a new project, use the @coss/style initialization command below to include the coss theme.",
    config: `{\n  "registries": {\n    "@coss": "https://coss.com/ui/r/{name}.json"\n  }\n}`,
  },
  install: [
    { label: "New project: init the coss style preset", command: "npx shadcn@latest init @coss/style" },
    { label: "Existing project: add all coss ui primitives", command: "npx shadcn@latest add @coss/ui" },
    { label: "Add a single component (example)", command: "npx shadcn@latest add @coss/button" },
  ],
  gettingStarted: [
    "Use a React project with TypeScript and Tailwind CSS v4 configured, which is the prerequisite listed in the docs.",
    "From the project root run npx shadcn@latest init @coss/style for a new project (installs components, colors, sidebar variables and fonts), or npx shadcn@latest add @coss/ui for an existing project. Components are copied into your repo as editable source files.",
    "Add one component with the command on its docs page, for example npx shadcn@latest add @coss/button, or skip the CLI and paste the code from the component page's Code tab into components/ui/.",
    'First usage: import { Button } from "@/components/ui/button" and render <Button>Button</Button> in an existing page, then confirm the app still builds.',
    "Note: originui.com now redirects to coss.com/ui, where this project lives as coss ui (formerly Origin UI). The original Origin UI copy-and-paste components are still served at https://coss.com/origin with limited maintenance.",
  ],
  preview: {
    src: "https://coss.com/ui/opengraph-image.png",
    alt: "coss ui documentation site preview, formerly Origin UI",
  },
  agentPrompt: `Add coss ui (the project formerly named Origin UI; originui.com now redirects to https://coss.com/ui) to this existing project.

Prerequisites: React with TypeScript and Tailwind CSS v4 already set up (Next.js works out of the box). Components are installed as source files through the shadcn CLI, so they live in this repo and get edited directly instead of being imported from npm.

Steps:
1. Read the official docs first and follow them rather than guessing: https://coss.com/ui/docs and the get started page https://coss.com/ui/docs/get-started.
2. Check for a components.json in the project root. If the project is not set up for the shadcn CLI yet, follow the get started page for your case: new projects run "npx shadcn@latest init @coss/style", existing projects run "npx shadcn@latest add @coss/ui".
3. Make sure the design tokens exist in your global stylesheet (app/globals.css). The theme uses the shadcn variables plus extra tokens the docs list: --info, --info-foreground, --success, --success-foreground, --warning, --warning-foreground, --destructive-foreground. The CLI adds them for you when you use @coss/style.
4. Add your first component with the command shown on its docs page, for example "npx shadcn@latest add @coss/button" from https://coss.com/ui/docs/components/button. The alternative is manual copy-paste from the Code tab of that page.
5. First usage: import { Button } from "@/components/ui/button", render <Button>Button</Button> in an existing page, and confirm the build still passes. Repeat step 4 for the other components you need, and check each component page for extra dependencies.

If you specifically need the legacy Origin UI components (copy-and-paste, Radix based), browse https://coss.com/origin and copy the code from the component pages; that surface gets limited maintenance.`,
  pricing: {
    model: "free",
    summary: "coss ui components are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/cosscom/coss/blob/main/LICENSING.md",
  },
} satisfies LibraryDetails;
