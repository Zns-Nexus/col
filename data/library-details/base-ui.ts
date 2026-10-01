import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://base-ui.com",
  repoUrl: "https://github.com/mui/base-ui",
  install: [
    { label: "npm", command: "npm i @base-ui/react" },
    { label: "pnpm", command: "pnpm add @base-ui/react" },
    { label: "yarn", command: "yarn add @base-ui/react" },
  ],
  gettingStarted: [
    "Install the single tree-shakable package with `npm i @base-ui/react`. The package was previously published as `@base-ui-components/react` and has been renamed.",
    "In your app layout, wrap the page in a root element and give it `isolation: isolate` in global CSS, so components that render popups through portals (Dialog, Popover, Menu) stay above the rest of the page.",
    "Import components from their subpath, for example `import { Popover } from \"@base-ui/react/popover\";`.",
    "Assemble the parts (`Popover.Root`, `Popover.Trigger`, `Popover.Portal`, `Popover.Positioner`, `Popover.Popup`) and style them with Tailwind, CSS Modules, plain CSS or CSS-in-JS. Base UI ships no styles.",
    "For AI assistance, each docs page has a 'View as Markdown' link and the docs publish an index at https://base-ui.com/llms.txt.",
  ],
  preview: {
    src: "https://base-ui.com/opengraph-image-12djat.png?b1b9e0366e512854",
    alt: "Base UI documentation share image",
  },
  agentPrompt: `Add Base UI to this existing project.

Prerequisites: a React app (Vite, Next.js, or similar) with Node.js and npm available, plus a styling solution already in the project (Tailwind CSS, CSS Modules, plain CSS, or CSS-in-JS). Base UI ships unstyled accessible primitives, so it adds no visual styles of its own.

Steps:
1. Install the library with "npm i @base-ui/react". All components live in this one package and it is tree-shakable. Note that older examples may show the old package name "@base-ui-components/react"; always use "@base-ui/react".
2. In the layout that wraps your app, make the content root element create its own stacking context by adding a class such as "root" with ".root { isolation: isolate; }" in your global CSS. Base UI renders popups (Dialog, Popover, Menu) in portals, and this keeps them above page content.
3. Add a first component from its subpath import, for example: import { Popover } from "@base-ui/react/popover"; then assemble Popover.Root, Popover.Trigger, Popover.Portal, Popover.Positioner and Popover.Popup, and style each part with your existing styling solution.
4. Confirm it renders and behaves correctly (open and close, focus, keyboard navigation), then repeat the same pattern for other components.

Consult the official docs before deviating from these steps: quick start at https://base-ui.com/react/overview/quick-start, component reference at https://base-ui.com/react/components/popover, and the text index at https://base-ui.com/llms.txt. Use only import paths and component parts documented there.`,
  pricing: {
    model: "free",
    summary: "Base UI is free, including for commercial use, with no paid tier.",
    license: "MIT",
    source: "https://base-ui.com",
  },
} satisfies LibraryDetails;
