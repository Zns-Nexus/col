import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.evilbuttons.com/docs",
  repoUrl: "https://github.com/radiumcoders/evil-buttons",
  preview: {
    src: "https://evilbuttons.com/og-image.png",
    alt: "Evil Buttons official preview",
  },
  registrySetup: {
    description: "Start from a React project that already runs the shadcn CLI: a components.json, Tailwind CSS, and the `cn` helper at `@/lib/utils`, which every component imports. The `@evilbuttons` namespace comes from the shadcn registry directory, and if your CLI cannot resolve it, add `\"@evilbuttons\": \"https://www.evilbuttons.com/r/{name}.json\"` under `registries` in components.json.",
  },
  install: [
    { label: "Add a hold-to-confirm button", command: "npx shadcn@latest add @evilbuttons/hold-button" },
    { label: "Add a dither button", command: "npx shadcn@latest add @evilbuttons/dither-button" },
    { label: "Add a keyboard-shortcut button", command: "npx shadcn@latest add @evilbuttons/command-button" },
  ],
  gettingStarted: [
    "Browse the live gallery at https://www.evilbuttons.com and open a component's page from the docs sidebar at https://www.evilbuttons.com/docs. Components are grouped as Interactive, Mischief, Effects, Styles, and Utility, and each page has a preview, variants, props, and an install command.",
    "Install one component with the shadcn CLI, for example `npx shadcn@latest add @evilbuttons/hold-button`. The file lands in `components/evil-buttons/`, and the CLI adds the npm packages that component declares (`clsx` and `tailwind-merge` for all of them, plus `motion` or `canvas-confetti` where used).",
    "Import it from the generated path and render it: `import { HoldButton } from \"@/components/evil-buttons/hold-button\";`. Some components are default exports, such as `import DitherButton from \"@/components/evil-buttons/dither-button\";`, so copy the import line from the component's Usage section.",
    "Tune it with the props in the page's Props table. HoldButton takes `duration`, `label`, `successLabel`, `onConfirm` and `onAbort`, and all components forward standard `<button>` attributes.",
    "Point your coding agent at https://www.evilbuttons.com/llms.txt, which lists every component with a one-line description. Each docs page also has a Markdown copy if you swap `/docs/` for `/raw/` in its URL.",
  ],
  agentPrompt: `Add Evil Buttons (https://www.evilbuttons.com), a shadcn/ui registry of animated React buttons, to this existing project.

Evil Buttons are copy-in components built with Tailwind CSS and Motion. Each one is installed as source through the shadcn CLI, not as an npm runtime package.

Prerequisites:
- Confirm the app is React with Tailwind CSS working.
- Check that components.json exists and that the \`cn\` helper is exported from \`@/lib/utils\` (or wherever the project's alias points), because every component imports it. If shadcn is not initialized, run npx shadcn@latest init first.
- Inspect the package manager and existing button components so the new ones can live next to them.

Steps:
1. Read https://www.evilbuttons.com/llms.txt for the current component list, then open the matching page at https://www.evilbuttons.com/docs/<component> for its variants, props, and notes. The docs slug and the registry name can differ (for example the docs page /docs/movie-pass), so use the install command shown on the page.
2. Install only the component the task needs, for example npx shadcn@latest add @evilbuttons/hold-button. If the CLI cannot resolve the @evilbuttons namespace, add "@evilbuttons": "https://www.evilbuttons.com/r/{name}.json" under registries in components.json and retry.
3. Open the generated file under components/evil-buttons/. Note whether it is a named or default export and whether it adds dependencies such as motion, clsx, tailwind-merge, or canvas-confetti, and confirm they were added to package.json.
4. Replace or wrap the existing button at the call site. Pass the component's documented props, for example duration, label, successLabel, onConfirm and onAbort for HoldButton, and keep any existing click handlers wired through the documented callbacks.
5. Run the project's typecheck and build, then try the interaction in the browser, including keyboard activation and the prefers-reduced-motion setting.

Notes:
- These buttons are deliberately theatrical (HoldButton, DoubtButton, SlideToDetonate, TrollButton). Use them for confirmations or for playful surfaces, and keep a plain button for primary actions where speed matters.
- Components are project source after install, so edit them directly rather than wrapping them in override layers.
- Several components use client-only hooks, so add a "use client" boundary where the framework needs one.
- The source is Apache-2.0 at https://github.com/radiumcoders/evil-buttons.`,
  pricing: {
    model: "free",
    summary: "All components are free and open source under Apache 2.0, with no paid tier; the site only lists sponsors.",
    license: "Apache-2.0",
    source: "https://github.com/radiumcoders/evil-buttons/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
