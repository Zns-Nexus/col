import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.heroui.com/en/docs/react/getting-started/quick-start",
  repoUrl: "https://github.com/heroui-inc/heroui",
  install: [
    { label: "npm", command: "npm i @heroui/styles @heroui/react" },
    { label: "pnpm", command: "pnpm add @heroui/styles @heroui/react" },
  ],
  gettingStarted: [
    "Confirm the project uses React 19+ and Tailwind CSS v4 (HeroUI v3 requirements).",
    "Install the packages: npm i @heroui/styles @heroui/react",
    "In your main CSS file, add @import \"@heroui/styles\"; directly after @import \"tailwindcss\";. Order matters, tailwindcss comes first.",
    "No provider wrapper is needed. Import components straight from @heroui/react, for example import { Button } from \"@heroui/react\".",
    "Render a <Button> to confirm styles apply, then browse the component docs at the link above.",
  ],
  preview: {
    src: "https://heroui.com/images/twitter-card.jpg",
    alt: "HeroUI website preview image",
  },
  agentPrompt:
    "Set up HeroUI (v3) in this existing React project. Prerequisites: React 19 or newer and Tailwind CSS v4. If Tailwind CSS v4 is missing, install it first following the official Tailwind v4 guide for this framework, then continue. Detect the package manager (npm, pnpm, yarn or bun), the framework (Next.js, Vite, Remix, Astro, etc.), TypeScript usage, and the main CSS entry file (for example globals.css, app.css or index.css). Read package.json and install only what is missing: @heroui/styles and @heroui/react (npm i @heroui/styles @heroui/react). In the main CSS file add @import \"@heroui/styles\"; immediately after @import \"tailwindcss\"; (tailwindcss must come first) and make sure that file is loaded by the app entry or root layout. HeroUI v3 needs no provider component, so do not wrap the app. As a smoke test, import { Button } from \"@heroui/react\" and render a visible Button to confirm the styles apply. When done, list the files you changed and how to start the dev server. Before changing anything, check the official quick start at https://www.heroui.com/en/docs/react/getting-started/quick-start and follow it if it differs from these instructions.",
  pricing: {
    model: "freemium",
    summary: "The open-source components are free; HeroUI Pro adds paid components, templates and AI tools as a one-time purchase.",
    license: "MIT",
    source: "https://heroui.pro/pricing",
  },
} satisfies LibraryDetails;
