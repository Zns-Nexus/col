import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://headlessui.com",
  repoUrl: "https://github.com/tailwindlabs/headlessui",
  install: [
    { label: "React (npm)", command: "npm install @headlessui/react@latest" },
    { label: "Vue (npm)", command: "npm install @headlessui/vue@latest" },
    { label: "React insiders build", command: "npm install @headlessui/react@insiders" },
  ],
  gettingStarted: [
    "Pick a framework from the landing page. React is the default at https://headlessui.com/react, Vue lives at https://headlessui.com/v1/vue. There is no separate quick-start page; every component page opens with its own Installation section.",
    "Install the package for that framework. The React package requires React 18 or 19 (peer range `^18 || ^19 || ^19.0.0-rc`); the Vue package supports Vue 3 only (peer `^3.2.0`).",
    "Import components from the package root and compose the parts, for example `import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';` where `Menu` wraps `MenuButton`, `MenuItems` and one or more `MenuItem`.",
    "Style every part yourself with `className` (React) or `:class` (Vue). Headless UI ships no CSS, so it is built to pair with Tailwind CSS; a complementary plugin is published separately as `@headlessui/tailwindcss`.",
    "Drive styling from the data attributes Headless UI exposes on each part, such as `data-closed` on `Transition` and `data-focus` on `MenuItem`, instead of tracking open or active state yourself. Position floating panels with the `anchor` prop, for example `<MenuItems anchor=\"bottom\">`.",
  ],
  preview: {
    src: "https://headlessui.com/_next/static/media/social-card.46834755.jpg",
    alt: "Headless UI social card",
  },
  agentPrompt: `Help me add Headless UI to this existing project. It is a set of completely unstyled, fully accessible UI components from Tailwind Labs, available for React and Vue. It ships no stylesheet, so accessibility, keyboard handling and focus management come from the library while all visual styling stays in my project.

Prerequisites:
- My project already runs React 18 or 19, or Vue 3. The React package peers on \`react\` and \`react-dom\` \`^18 || ^19 || ^19.0.0-rc\`; the Vue package peers on \`vue\` \`^3.2.0\` and only supports Vue 3.
- The React package is on major version 2 (npm \`latest\` is 2.2.x). The v2 API differs from v1, so only copy examples from the current docs and ignore v1 snippets.

Steps:
1. Read the official docs at https://headlessui.com. Component pages live at https://headlessui.com/react/<component> for React and https://headlessui.com/v1/vue/<component> for Vue. Use those pages for real import names, props and component APIs rather than guessing.
2. Install the package for my framework: \`npm install @headlessui/react\` or \`npm install @headlessui/vue\`. If I want to track unreleased work, \`npm install @headlessui/react@insiders\` points at the latest commit on \`main\`, but it does not follow semver.
3. Pick a first component and import it from the package root, for example \`import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';\`, then compose its parts in an existing page or view.
4. Style each part with my existing styling solution, using the data attributes Headless UI exposes (for example \`data-closed\` on \`Transition\`, \`data-focus\` on \`MenuItem\`) instead of duplicating open or active state. Use the \`anchor\` prop on floating panels such as \`MenuItems\` to position them.
5. Confirm the component behaves correctly: keyboard navigation, focus management, Escape to dismiss, and correct ARIA wiring. Then repeat the same pattern for the other components I need.

If my project already uses Tailwind CSS, the separate \`@headlessui/tailwindcss\` package is an optional complementary plugin (peers on Tailwind \`^3.0 || ^4.0\`). Component pages also list a "Styled examples" section with ready-made Tailwind markup.

Keep component state in my own React or Vue code and treat the library as the behavior layer only, so my styling and markup stay editable.`,
  pricing: {
    model: "free",
    summary: "Headless UI is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/tailwindlabs/headlessui",
  },
} satisfies LibraryDetails;
