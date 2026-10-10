import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://useanimations.com/documentation",
  repoUrl: "https://github.com/useAnimations/react-useanimations",
  registrySetup: {
    description: "Start with a React project initialized with shadcn, so components.json exists and the `@/components` alias resolves. Each icon depends on a shared `use-animation` player registry item, which the CLI installs for you together with `lottie-web`.",
  },
  install: [
    { label: "shadcn/ui (example: checkmark)", command: "npx shadcn@latest add https://useanimations.com/r/checkmark.json" },
    { label: "React package", command: "npm install react-useanimations" },
    { label: "Lottie player for HTML and other frameworks", command: "npm install lottie-web" },
  ],
  gettingStarted: [
    "Browse the 298 icons at https://useanimations.com, grouped by category (Alerts, Notifications, Navigation and others). Each one is labelled with how it plays: loop, click, or hover.",
    "For React, run `npm install react-useanimations`, then `import UseAnimations from 'react-useanimations'; import checkmark from 'react-useanimations/lib/checkmark';` and render `<UseAnimations animation={checkmark} size={32} />`. Props are listed at https://useanimations.com/documentation.",
    "For shadcn/ui projects, add one icon as source: `npx shadcn@latest add https://useanimations.com/r/checkmark.json`. It creates `components/animations/checkmark.tsx` exporting `AnimatedCheckmark`, plus the shared player. The full index is https://useanimations.com/r/registry.json.",
    "For HTML, Vue, Svelte or Angular, download the Lottie JSON from the homepage or load it from `https://useanimations.com/icons/<id>.json`, and play it with lottie-web. The docs show the click-toggle and hover patterns.",
    "Use https://useanimations.com/icons.json as the machine-readable catalog, with each icon's id, category, keywords, interaction type and file URLs. The MIT terms are at https://useanimations.com/licencing-and-terms.",
  ],
  preview: {
    src: "https://useanimations.com/images/OGuseAnimationsImage.jpg",
    alt: "useAnimations free animated Lottie icon library preview",
  },
  agentPrompt: `Add useAnimations (https://useanimations.com), a free library of 298 animated Lottie icons, to this existing project.

Prerequisites:
- Inspect the framework and package manager first. React projects can use the react-useanimations package or the shadcn registry. Other frameworks use lottie-web directly.
- For the shadcn route, components.json must exist and the @/components alias must resolve.
- Not every icon is in the react-useanimations package (about 80 are). Icons outside it can still be installed through the shadcn registry or loaded as Lottie JSON.

Steps:
1. Read https://useanimations.com/documentation and use https://useanimations.com/icons.json to find icon ids, categories and keywords, and each icon's intended interaction (loop, click-toggle, click-replay, hover, hover-replay or hover-loop).
2. React with the package: npm install react-useanimations, then import UseAnimations from 'react-useanimations' and import the icon from 'react-useanimations/lib/<camelCaseName>' (for example checkBox). Render <UseAnimations animation={checkmark} size={32} strokeColor="#0C5B97" />. For a controlled toggle, pass reverse={checked} and an onClick handler.
3. React with shadcn/ui: npx shadcn@latest add https://useanimations.com/r/<id>.json. This writes components/animations/<id>.tsx exporting Animated<PascalCaseId> (check-box becomes AnimatedCheckBox) and installs the shared use-animation player and lottie-web. Props: size, strokeColor (defaults to currentColor), fillColor, speed, interaction and active.
4. Other frameworks: npm install lottie-web, then call lottie.loadAnimation({ container, renderer: 'svg', loop, autoplay, path }) on mount and destroy() on unmount. Use the lottie_light build, except for the error and twitter icons, which need the full lottie.min.js build.
5. Copy the JSON into the project (https://useanimations.com/icons/<id>.json) instead of loading it from useanimations.com in production.
6. Make icon-only controls real buttons with aria-label, hide decorative icons from assistive technology, and respect prefers-reduced-motion by not autoplaying or looping. Then run the project's build and check the interaction in the browser.

Notes:
- The icons and package are MIT licensed. Attribution is optional.
- Give the container an explicit width and height; Lottie sizes itself to it.`,
  pricing: {
    model: "free",
    summary: "All icons and the React package are free for personal and commercial use under MIT, with no paid tier.",
    license: "MIT",
    source: "https://useanimations.com/licencing-and-terms",
  },
} satisfies LibraryDetails;
