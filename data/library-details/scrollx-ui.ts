import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://scrollxui.dev/docs/installation",
  repoUrl: "https://github.com/Adityakishore0/ScrollX-UI",
  registrySetup: {
    description: "Start from a shadcn project (a components.json at the root) with Tailwind CSS configured. Add the `@scrollxui` namespace to components.json before using the namespaced commands; the direct URL form works without it.",
    config: `{
  "registries": {
    "@scrollxui": "https://scrollxui.dev/registry/{name}.json"
  }
}`,
  },
  install: [
    { label: "Add a component (namespaced)", command: "npx shadcn@latest add @scrollxui/profilecard" },
    { label: "Add a component (URL)", command: "npx shadcn@latest add https://scrollxui.dev/registry/alert-dialog.json" },
    { label: "Add a block", command: "npx shadcn@latest add @scrollxui/hero-sections/hero-with-layers" },
    { label: "Browse the registry from the CLI", command: "npx shadcn@latest list @scrollxui" },
  ],
  gettingStarted: [
    "Read https://scrollxui.dev/docs/installation, which covers the CLI route and a manual route. For the CLI, you need a project with a `components.json`; for the manual route, install `class-variance-authority clsx tailwind-merge lucide-react tw-animate-css`, set up Tailwind and the path aliases as shown at https://scrollxui.dev/docs/installation/manual.",
    "Add the `@scrollxui` namespace to `components.json` as shown in the registry setup above, or use the URL form `npx shadcn@latest add https://scrollxui.dev/registry/<component>.json` and skip the mapping.",
    "Pick a component from https://scrollxui.dev/docs/components or a section from https://scrollxui.dev/blocks. Every component page shows its install command, for example `npx shadcn@latest add @scrollxui/profilecard`, which writes `components/ui/profilecard.tsx` and installs `motion` and `lucide-react`.",
    "Import the generated file and use it with the props shown on its page, for example https://scrollxui.dev/docs/components/profilecard. Dark mode and theming are driven by CSS variables; the dark mode guide is linked from the docs sidebar.",
    "For an AI editor, run `npx shadcn@latest mcp init --client cursor` (or claude, vscode) after adding the registry mapping, as described at https://scrollxui.dev/docs/installation/cli. The site also publishes https://scrollxui.dev/llms.txt.",
  ],
  preview: {
    src: "https://scrollxui.dev/images/ui.png",
    alt: "ScrollX UI Preview",
  },
  agentPrompt: `Add ScrollX UI (https://scrollxui.dev) to this existing React project.

ScrollX UI is an open-source collection of animated React components and page-section blocks (145+ components and 34+ blocks according to https://scrollxui.dev/llms.txt), written in TypeScript with Tailwind CSS. Items are installed as source files through a shadcn registry.

Prerequisites:
- A React project (Next.js, Remix or Vite) with Tailwind CSS configured and a working path alias. Check package.json, tsconfig.json and the global CSS.
- A components.json at the repository root. If it is missing, run npx shadcn@latest init first, and keep existing aliases and theme tokens when it asks questions.
- For a manual install without the CLI, the docs list these packages: class-variance-authority, clsx, tailwind-merge, lucide-react and tw-animate-css.

Steps:
1. Read https://scrollxui.dev/docs/installation and https://scrollxui.dev/docs/installation/cli. They are the source of truth for commands.
2. Register the namespace in components.json: "registries": { "@scrollxui": "https://scrollxui.dev/registry/{name}.json" }. This needs shadcn CLI 3.0 or later; without it, use the URL form in step 4.
3. Ask me which component or block I need, then find it at https://scrollxui.dev/docs/components or https://scrollxui.dev/blocks. Read its page for props and dependencies.
4. Install it with npx shadcn@latest add @scrollxui/<name> (for example @scrollxui/profilecard). A block adds its category: npx shadcn@latest add @scrollxui/hero-sections/hero-with-layers. Without the namespace, run npx shadcn@latest add https://scrollxui.dev/registry/<name>.json.
5. Open the generated file (the profilecard item writes components/ui/profilecard.tsx and depends on motion and lucide-react), check that its dependencies were added to package.json, and import it using the project's alias.
6. Use it in the target screen, then run the project's typecheck and build. Check the animation at its real trigger point, with keyboard-only navigation and with prefers-reduced-motion enabled.

Notes:
- The repository's LICENSE.md is MIT with a Commons Clause style restriction: use in commercial applications, SaaS products and websites is allowed, but you may not redistribute the components inside a component library, template, UI kit or competing package. Do not copy these components into a reusable kit.
- Component slugs are not always hyphenated, for example profilecard, glowingbordercard and hold-toconfirm. Copy the slug from the component's own page URL and install command rather than guessing.
- Installed files are project source. Edit them to fit the project's tokens, and keep the license in mind when sharing code.`,
  pricing: {
    model: "free",
    summary: "All components and blocks are free to use in applications and websites under an MIT license with a Commons Clause restriction that forbids repackaging them as a library, template or UI kit.",
    license: "MIT with Commons Clause restriction",
    source: "https://github.com/Adityakishore0/ScrollX-UI/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
