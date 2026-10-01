import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://flowbite.com/docs/",
  repoUrl: "https://github.com/themesberg/flowbite",
  install: [
    { label: "npm", command: "npm install flowbite" },
    { label: "React (existing project)", command: "npx flowbite-react@latest init" },
  ],
  gettingStarted: [
    "Check that the project has Node.js, npm and a working Tailwind CSS v4 setup.",
    "Install the package with: npm install flowbite",
    'In your main CSS file add the theme import, plugin and source lines: @import "flowbite/src/themes/default"; @plugin "flowbite/plugin"; @source "../node_modules/flowbite";',
    "Load the JavaScript that powers interactive components: run import 'flowbite' in your entry file, or add the flowbite.min.js script before the closing </body> tag.",
    "Copy a component example from the docs (modal, navbar or dropdown) and wire it with its data attributes such as data-modal-target.",
  ],
  preview: {
    src: "https://flowbite.com/docs/images/og-image.png",
    alt: "Flowbite og:image preview for the Tailwind CSS component library",
  },
  agentPrompt: `Add Flowbite to this existing project. Flowbite is an open source component library built with Tailwind CSS utility classes, MIT licensed, documented at https://flowbite.com/docs/.

Prerequisites: Node.js and npm, and a project that already builds Tailwind CSS v4. If Tailwind is not installed yet, install tailwindcss, @tailwindcss/postcss and postcss first and register the PostCSS plugin.

Steps:
1. Install the package: npm install flowbite (latest published version is 4.x).
2. In the CSS entry file that imports Tailwind, add: @import "flowbite/src/themes/default"; @plugin "flowbite/plugin"; @source "../node_modules/flowbite"; (adjust the @source path if node_modules sits elsewhere). Keep the Tailwind import above them.
3. Make the interactive components work by importing the bundle in your app entry file: import 'flowbite'. Alternatively include dist/flowbite.min.js with a script tag before </body>.
4. First usage: copy the Modal example from https://flowbite.com/docs/components/modal/ into a page, using its data attributes (data-modal-target, data-modal-toggle) so it opens and closes, then confirm Tailwind utilities from Flowbite classes are emitted in the built CSS.
5. If this is a React project, prefer running npx flowbite-react@latest init instead of the manual setup, and use components from the flowbite-react package.

Consult https://flowbite.com/docs/ for the framework specific guides (Next.js, Vue, Svelte, Angular, Astro, Laravel and others), the Tailwind v3 to v4 upgrade guide if the project still runs Tailwind v3, and the configuration page for theming and dark mode.`,
  pricing: {
    model: "freemium",
    summary: "The open-source component library is free; Flowbite Pro (Figma design system, blocks and dashboard) is a one-time purchase with lifetime updates.",
    license: "MIT",
    source: "https://flowbite.com/pro/",
  },
} satisfies LibraryDetails;
