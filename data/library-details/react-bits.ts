import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://reactbits.dev",
  repoUrl: "https://github.com/davidhdev/react-bits",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "shadcn",
      command: "npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW",
    },
    {
      label: "shadcn (registry alias)",
      command: "npx shadcn@latest add @react-bits/SplitText-TS-TW",
    },
    {
      label: "jsrepo",
      command: "npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW",
    },
    {
      label: "Runtime dependencies (example)",
      command: "npm install gsap",
    },
  ],
  gettingStarted: [
    "Open https://reactbits.dev/get-started/installation and choose your language (JS or TS) and styling (CSS or Tailwind). Every component ships in those four variants.",
    "Add a component with the CLI, for example: npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW. You can also copy the source code manually from the component page.",
    "Install the runtime dependencies listed on that component's page (they vary, for example gsap, motion, three or ogl), for example: npm install gsap.",
    "Import the component file into your app and render it, for example: import SplitText from \"./SplitText\"; <SplitText text=\"Hello, you!\" delay={100} duration={0.6} />.",
    "To use the short @react-bits/Name-TS-TW alias with the shadcn CLI, add this to components.json: \"registries\": { \"@react-bits\": \"https://reactbits.dev/r/{name}.json\" }.",
  ],
  preview: {
    src: "https://reactbits.dev/og.png",
    alt: "The React Bits landing page design, showcasing the logo and a subtitle!",
  },
  agentPrompt: `Add components from React Bits (official docs: https://reactbits.dev/get-started/installation) to this existing project.

Prerequisites: a working React project with a package manager (npm, pnpm, yarn or bun). React Bits has no runtime npm package; each component is added individually through the shadcn CLI or jsrepo, or pasted in manually. If you use the shadcn CLI, the project needs a components.json (run "npx shadcn@latest init" first if there is none).

Steps:
1. Check this project's language and styling, then choose the matching JS or TS and CSS or Tailwind variant.
2. Read the component page in the official docs first to see its props and dependency list.
3. Add one component. For a TypeScript and Tailwind project, for example: npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW (variant naming is <Component>-JS|TS-CSS|TW). jsrepo also works: npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW.
4. Install the runtime dependencies that component lists, for example: npm install gsap.
5. Import the added component file into an existing page and render it with its props to confirm it works, then add further components the same way.

If a command or registry URL is not documented on https://reactbits.dev/get-started/installation, stop and follow the docs instead of guessing.`,
  pricing: {
    model: "freemium",
    summary: "The components are free to use; React Bits Pro blocks and templates are a paid one-time purchase from the same author.",
    license: "MIT + Commons Clause",
    source: "https://pro.reactbits.dev/compare/react-bits-pro-vs-free-react-bits",
  },
} satisfies LibraryDetails;
