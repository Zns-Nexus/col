import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.wensity.com/docs",
  repoUrl: "https://github.com/wensity/registry",
  registrySetup: {
    description: "For the shadcn route, initialize shadcn if needed and merge this registry into components.json. This registry contains free components only. For the Wensity CLI route, run npx wensity@latest init instead; it creates wensity.json.",
    config: `{
  "registries": {
    "@wensity": "https://raw.githubusercontent.com/wensity/registry/main/{name}.json"
  }
}`,
  },
  install: [
    { label: "Add a component with the Wensity CLI", command: "npx wensity@latest add <slug>" },
    { label: "Add a component through the shadcn registry", command: "npx shadcn@latest add @wensity/<slug>" },
    { label: "Initialise with a style preset (new project)", command: "npx wensity@latest init --preset <wsty1-code>" },
    { label: "Authenticate the CLI for Pro components and blocks", command: "pnpm dlx wensity login" },
  ],
  gettingStarted: [
    "Requirements per https://ui.wensity.com/docs/installation: React 18.2+, TypeScript 5+ and Tailwind CSS v4, in a Next.js 14+ (App Router or Pages), Vite 5+, Remix or Astro project. Wensity ships no runtime package; the CLI writes real .tsx files into your repo and you own them from that point.",
    "Run `npx wensity@latest init` once per project from the repo root. It writes `wensity.json` (schema at https://ui.wensity.com/schema/wensity.json), a `cn()` helper, sets the `@/components/wensity` and `@/lib/utils` aliases, and installs clsx and tailwind-merge unless you pass `--no-install`. Commit `wensity.json`.",
    "Add the runtime peers most components rely on: `pnpm add framer-motion clsx tailwind-merge @radix-ui/react-slot`. Motion-heavy or WebGL components may additionally need gsap, ogl, three or React Three Fiber; `wensity add <slug> --dry-run` prints the exact packages a given component needs before anything is written.",
    "Install a component with `npx wensity@latest add liquid-multimodal-input` (a free component), then import it like any local file: `import { LiquidMultimodalInput } from \"@/components/wensity/liquid-multimodal-input\";`. Primitives use the same command, for example `npx wensity@latest add button`, and land under `src/components/wensity` by default. There is no provider, context or global config to wire up.",
    "Paste the `@theme inline` CSS variable block into your global stylesheet (https://ui.wensity.com/docs/theming). Components read tokens such as `--color-chili-500`, `--surface` and `--border`; without that block they render unstyled. Pro components and premium blocks additionally need a dashboard API token and an active license — see https://ui.wensity.com/docs/api.",
  ],
  preview: {
    src: "https://ui.wensity.com/og/wensity-og-image.png",
    alt: "Wensity UI React components, UI blocks, templates, and homepage interface preview",
  },
  agentPrompt: `Help me use Wensity UI (https://ui.wensity.com), a React and Next.js component library, blocks and templates marketplace whose source is installed into the repo as editable .tsx files. There is no runtime package: no \`@wensity/ui\` dependency, no theme provider, no context.

Prerequisites:
- React 18.2+ with TypeScript 5+ and Tailwind CSS v4 already wired up (Next.js 14+ App Router or Pages, Vite 5+, Remix, or Astro). Verified against Next.js 14+, Vite 5+, Remix and Astro.
- Free components and UI primitives install with no account. Pro components and premium blocks need an API token from https://ui.wensity.com/dashboard plus an active component license.
- Two install routes exist and they are not feature-parity. The Wensity CLI is the full-featured one; the public shadcn registry (@wensity/*) carries only the free, MIT-licensed items and never exports premium components.

Steps:
1. Read the official docs before installing: https://ui.wensity.com/docs/getting-started for the browse-to-ship path, https://ui.wensity.com/docs/installation for framework requirements and peer dependencies, and https://ui.wensity.com/docs/cli for every command, flag and auth mode. A machine-readable index sits at https://ui.wensity.com/llms.txt and the full catalog at https://ui.wensity.com/llms-full.txt, which lists each entry's own install command. Prefer those over any remembered command.
2. Run \`npx wensity@latest init\` once per repo. It writes \`wensity.json\` and a \`cn()\` helper, detects your Tailwind config and global CSS paths, sets the \`@/components/wensity\` and \`@/lib/utils\` aliases, and installs clsx and tailwind-merge. Commit the generated \`wensity.json\`. Plain init refuses to overwrite an existing config unless you pass \`--force\`.
3. Install the runtime peers the docs list: \`pnpm add framer-motion clsx tailwind-merge @radix-ui/react-slot\`. The CLI installs each component's declared dependencies itself and reports the rest at install time; \`npx wensity@latest add <slug> --dry-run\` previews the planned files and packages without writing anything.
4. Pick a component from https://ui.wensity.com/components (composed product UI) or https://ui.wensity.com/primitives (foundational controls) and install it from the project root with \`npx wensity@latest add <slug>\` — for example \`npx wensity@latest add liquid-multimodal-input\` or \`npx wensity@latest add button\`. Blocks take \`--type block\`. If I already run a shadcn registry workflow and only need a free primitive, \`npx shadcn@latest add @wensity/<slug>\` works against the same registry with no \`components.json\` entry.
5. Confirm the theme tokens exist. Paste the \`@theme inline\` block from https://ui.wensity.com/docs/theming into the global stylesheet; components read \`--color-chili-500\`, \`--surface\`, \`--border\` and friends, and render unstyled without it. I want to check this before assuming a component is broken.
6. First usage: import the installed file like any local component from \`@/components/wensity/<slug>\`, drop it into an existing page, and confirm the app builds. Review the git diff after every add.
7. Only for Pro components or premium blocks: create a dashboard API token at https://ui.wensity.com/dashboard, run \`pnpm dlx wensity login\` (non-interactively \`pnpm dlx wensity login --token "$WENSITY_TOKEN"\`, or just set \`WENSITY_TOKEN\`), verify with \`pnpm dlx wensity whoami\`, then install with \`npx wensity@latest add <pro-slug>\`.
8. Optional style presets: the Create preset studio (https://ui.wensity.com/create-preset) emits a \`wsty1…\` code for icon library, radius, fonts and control colors. Apply it with \`npx wensity@latest init --preset <wsty1-code>\` on a new project or \`npx wensity@latest apply --preset <wsty1-code>\` on an existing one. Presets affect UI primitives only; premium components and blocks ignore the stored icon library.

Keep the installed files in the repo and treat them as my own editable code. \`wensity add\` never overwrites an existing file — use \`npx wensity@latest update <slug>\` when I want a fresh upstream copy, and review the diff. Components are tuned against Framer Motion 12, so bump to \`^12\` if layout animations jitter.`,
} satisfies LibraryDetails;
