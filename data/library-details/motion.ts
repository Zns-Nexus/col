import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://motion.dev/docs",
  repoUrl: "https://github.com/motiondivision/motion",
  install: [
    { label: "npm", command: "npm install motion" },
    { label: "pnpm", command: "pnpm add motion" },
    { label: "yarn", command: "yarn add motion" },
  ],
  gettingStarted: [
    "Install the package with npm install motion (React users need React 18.2 or higher).",
    "Import from \"motion/react\" in React code (import { motion } from \"motion/react\"), or from \"motion\" for plain JavaScript (import { animate } from \"motion\").",
    "Animate an element: render <motion.div animate={{ x: 100 }} /> in React, or call animate(\"#box\", { x: 100 }) in plain JavaScript.",
    "In a Next.js App Router component, add the \"use client\" directive at the top of the file that imports Motion.",
    "Copy a working snippet from https://motion.dev/examples and adapt it to your component.",
  ],
  preview: {
    src: "https://images.motion.dev/og/fresh/v1/site/docs-react-installation-08u00qzapi0en.png",
    alt: "Open Graph preview image for the Motion for React installation docs page",
  },
  agentPrompt:
    "Add the Motion animation library (https://motion.dev) to this existing project. Prerequisites: a JavaScript or TypeScript project; for React, version 18.2 or higher. Install it with npm install motion (alternatives: pnpm add motion, yarn add motion). No build config changes are needed for Vite; for Next.js App Router files, add the \"use client\" directive to components that import Motion. In React code import from \"motion/react\"; in plain JavaScript import from \"motion\". First usage: create one demo component that renders <motion.div animate={{ x: 100 }} /> (React) or calls animate(\"#box\", { x: 100 }) (plain JavaScript), and confirm it animates on the existing dev server. Then apply Motion to the component(s) I name, keeping the current styling, TypeScript setup, and build tooling unchanged. Read the official docs at https://motion.dev/docs (React: https://motion.dev/docs/react, JavaScript: https://motion.dev/docs/quick-start) for current API details before writing code.",
  pricing: {
    model: "freemium",
    summary: "The Motion library is free; Motion+ premium components, examples and tools are a paid one-time purchase.",
    license: "MIT",
    source: "https://motion.dev/pricing",
  },
} satisfies LibraryDetails;
