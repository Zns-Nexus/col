import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.shadcnblocks.com/docs",
  repoUrl: "https://github.com/shadcnblocks/shadcn-ui-blocks",
  registrySetup: {
    description: "Initialize shadcn if needed, then merge this registry into components.json, preserving its existing settings. Free blocks use this config; paid blocks also require an API key and the Authorization header described in Getting started.",
    config: `{
  "registries": {
    "@shadcnblocks": "https://www.shadcnblocks.com/r/{style}/{name}"
  }
}`,
  },
  install: [
    { label: "Add a block (shadcn CLI)", command: "npx shadcn add @shadcnblocks/hero1" },
    {
      label: "Add the shadcnblocks theme",
      command: "npx shadcn@latest add @shadcnblocks/theme/shadcnblocks",
    },
    { label: "Create a new shadcn project", command: "npx shadcn@latest init --preset b0 --template next" },
    {
      label: "shadcn MCP server for your editor",
      command: "pnpm dlx shadcn@latest mcp init --client <cursor|claude|codex|vscode>",
    },
  ],
  gettingStarted: [
    "Use a shadcn/ui project: React + TypeScript + Tailwind CSS v4 with a components.json at the root. Next.js, Vite, Astro, Remix and TanStack are all supported. Shadcnblocks blocks are built for Tailwind CSS v4, not v3. If components.json is missing, run npx shadcn@latest init; on an older project run shadcn apply or shadcn create to refresh it first.",
    'Add the @shadcnblocks registry to components.json as a plain URL: { "@shadcnblocks": "https://www.shadcnblocks.com/r/{style}/{name}" }. The {style} token makes the registry serve the Base UI or React Aria build when your components.json style is base-* or aria-*, and the Radix UI build otherwise. The older https://www.shadcnblocks.com/r/{name} URL still works and always serves the Radix version.',
    "Add the shadcnblocks theme, which supplies the extra CSS variables the blocks rely on: npx shadcn@latest add @shadcnblocks/theme/shadcnblocks",
    "Browse https://www.shadcnblocks.com/blocks, open a block, and copy the install command from its toolbar, for example npx shadcn add @shadcnblocks/hero1. Run it from the project root; the CLI writes the block files plus its npm and shadcn component dependencies into your repo as editable source.",
    'Pro and Premium blocks require a paid plan and an API key: create one under Dashboard > API Keys, put SHADCNBLOCKS_API_KEY=sk_live_your_api_key_here in .env, and switch the registry entry to the object form with an "Authorization": "Bearer ${SHADCNBLOCKS_API_KEY}" header. Only add that header once you actually need Pro blocks, because the CLI then requires the variable for every fetch, free blocks included.',
  ],
  preview: {
    src: "https://cdn.shadcnblocks.com/shadcnblocks/images/og/og-default.png",
    alt: "Shadcnblocks open graph preview of the shadcn/ui block library",
  },
  agentPrompt: `Help me use Shadcnblocks (https://www.shadcnblocks.com) in this existing project: a paid commercial
library of extra shadcn/ui blocks, components, pages and templates that installs through the shadcn CLI registry.
There is no shadcnblocks npm package, so do not add one to package.json.

Prerequisites:
- React + TypeScript + Tailwind CSS v4. Shadcnblocks blocks target Tailwind v4, not v3.
- A shadcn/ui project with a components.json at the root. If it is missing, run npx shadcn@latest init; on an older
  project run shadcn apply or shadcn create first.
- For Pro or Premium blocks, a Shadcnblocks plan and an API key from Dashboard > API Keys.

Steps:
1. Read the official docs at https://www.shadcnblocks.com/docs/blocks/getting-started, the CLI reference at
   https://www.shadcnblocks.com/docs/shadcn-cli/overview and the theming notes at
   https://www.shadcnblocks.com/docs/blocks/theming, and take commands from there instead of guessing them.
2. Register the source. Add "@shadcnblocks": "https://www.shadcnblocks.com/r/{style}/{name}" to the registries
   object in components.json. The {style} token resolves to the Base UI or React Aria build when the project style
   is base-* or aria-*; see https://www.shadcnblocks.com/docs/primitive-libraries/overview if a block touches
   primitive APIs.
3. Add the theme: npx shadcn@latest add @shadcnblocks/theme/shadcnblocks. It writes the extra CSS variables the
   blocks read (shadow, radius, chart and sidebar tokens) into globals.css.
4. Pick the block I asked for at https://www.shadcnblocks.com/blocks, take the real @shadcnblocks/<name> id from
   its page, and install it from the project root with: npx shadcn add @shadcnblocks/<name>.
5. First usage: import the installed block into an existing page, replace its placeholder copy, links and images,
   map its props onto the project's conventions, and confirm the build still passes.
6. If an install fails, check https://www.shadcnblocks.com/docs/shadcn-cli/troubleshooting. The usual causes are a
   missing SHADCNBLOCKS_API_KEY, a registry entry still using a plain URL, and a monorepo path problem.

Only the paid tiers are gated. Every block lands in my repo as editable source that I own, so adapt it to my theme
tokens and import paths rather than leaving it as shipped. Prefer the CLI over the site Code tab: copy and paste
skips the npm packages and the shadcn components a block builds on.`,
} satisfies LibraryDetails;
