import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.nexvyn.dev",
  repoUrl: "https://github.com/Nexvyn/Nexvyn-ui",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@nexvyn": "https://ui.nexvyn.dev/r/{name}.json"
  }
}`,
  },
  install: [
    { label: "Initialize shadcn in the project", command: "npx shadcn@latest init" },
    {
      label: "Add a component (registry name)",
      command: "npx shadcn@latest add @nexvyn/bounce-sidebar",
    },
    {
      label: "Add a component (direct URL, no registry)",
      command: "npx shadcn@latest add https://ui.nexvyn.dev/r/bounce-sidebar.json",
    },
  ],
  gettingStarted: [
    "Prerequisites: a React + TypeScript project already set up with Tailwind CSS v4 and shadcn/ui. If the project root has no `components.json`, run `npx shadcn@latest init` first.",
    "Merge the @nexvyn registry into components.json: \"registries\": { \"@nexvyn\": \"https://ui.nexvyn.dev/r/{name}.json\" }.",
    "Browse the catalog at https://ui.nexvyn.dev/components, open a component, and run its install command from the project root, for example `npx shadcn@latest add @nexvyn/bounce-sidebar`. You can skip the registry step and use the full URL form instead: `npx shadcn@latest add https://ui.nexvyn.dev/r/bounce-sidebar.json`.",
    "The CLI writes source files into your repo and installs the item's declared dependencies automatically. Most animated components need the `motion` package; others pull in `@radix-ui/react-slot`, `class-variance-authority`, `@base-ui/react` or `pdfjs-dist`.",
    "Every component imports `cn` from `@/lib/utils` and uses your existing shadcn CSS variables, so your theme and dark mode apply as-is. Some items also add shared helpers under `lib/` (such as `lib/sound.ts` for optional UI sound cues).",
  ],
  preview: {
    src: "https://ui.nexvyn.dev/opengraph-image?64c9dbc329816c06",
    alt: "Nexvyn/UI home page preview",
  },
  agentPrompt: `Add Nexvyn UI (https://ui.nexvyn.dev) to this existing project. It is an animated React component library distributed through the shadcn/ui registry protocol, not an npm package: components are copied source files into your repo.

Prerequisites:
- The project is React + TypeScript + Tailwind CSS v4 with shadcn/ui already installed. Check for \`components.json\` at the project root; if it is missing, run \`npx shadcn@latest init\` first.
- The library itself is never \`npm install\`ed. The npm search for "nexvyn" returns no packages, so do not try to add one.
- Components expect the shadcn \`cn\` helper at \`@/lib/utils\` and the standard shadcn CSS variables. Both already exist in a shadcn project.

Steps:
1. Merge "@nexvyn": "https://ui.nexvyn.dev/r/{name}.json" into the registries object in components.json. This is optional if you prefer the direct-URL form, but it lets you install by short name.
2. Pick a component from https://ui.nexvyn.dev/components. The full machine-readable catalog is the registry index at https://ui.nexvyn.dev/r/registry.json, and each item is served at https://ui.nexvyn.dev/r/<name>.json. Read those before choosing so you use a real name.
3. Install it from the project root with \`npx shadcn@latest add @nexvyn/<name>\`, or without the registry with \`npx shadcn@latest add https://ui.nexvyn.dev/r/<name>.json\`. The registry uses \`bunx\` in its README; \`npx\` is the equivalent and is what the site itself shows.
4. Review what landed. Each item may write more than the component: shared helpers such as \`lib/sound.ts\` (optional hover/click/bounce sound cues, muted state stored in localStorage) and \`lib/motion-tokens.ts\` can be pulled in alongside. Dependencies declared by the item are installed for you; \`motion\` is the common one, and some items also need \`@radix-ui/react-slot\`, \`class-variance-authority\`, \`@base-ui/react\` or \`pdfjs-dist\`.
5. First usage: import the component into an existing page or view, check that it renders with your current theme, and confirm the app still builds. The library targets Next.js 16 + React 19, but the components are plain client components, so they work in Vite and other React setups too.
6. Respect accessibility: components use \`useReducedMotion\` from motion for animation fallbacks and ship keyboard patterns (roving tabindex, arrow-key navigation, focus traps). Do not remove those. If the UI sound cues are unwanted, keep \`lib/sound.ts\` but do not wire the \`play*\` helpers into your call sites.

Use only the registry JSON and the component pages on https://ui.nexvyn.dev as the source of truth, and re-read the item JSON whenever a component needs behavior that is not visible in the demo. The installed code is yours to edit.`,
  pricing: {
    model: "free",
    summary: "The components are free to use, but the license forbids selling the library itself, and the diagram components are non-commercial (CC BY-NC).",
    license: "MIT + Commons Clause",
    source: "https://github.com/Nexvyn/Nexvyn-ui/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
