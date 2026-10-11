import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://designpass.dev/components/getting-started",
  registrySetup: {
    description: "Start from a shadcn project (a components.json at the root). Add the `@designpass` namespace to components.json once, then install any item by name; the direct URL form works without the mapping.",
    config: `{
  "registries": {
    "@designpass": "https://designpass.dev/r/{name}.json"
  }
}`,
  },
  install: [
    { label: "Add a component (TypeScript + Tailwind)", command: "npx shadcn@latest add @designpass/Magnet-TS-TW" },
    { label: "Add a block", command: "npx shadcn@latest add @designpass/PricingCards-TS-TW" },
    { label: "Add by URL, without the registry entry", command: "npx shadcn@latest add \"https://designpass.dev/r/Magnet-TS-TW\"" },
    { label: "Set up the shadcn MCP server for Cursor", command: "npx shadcn@latest mcp init --client cursor" },
  ],
  gettingStarted: [
    "Choose an install method at https://designpass.dev/components/getting-started: a copyable prompt on every component page, the shadcn MCP server, or a manual copy of the source. All three read from the same shadcn-compatible registry at https://designpass.dev/r/registry.json.",
    "Add the `@designpass` namespace to `components.json` as shown above, then install by item name, for example `npx shadcn@latest add @designpass/Magnet-TS-TW`. Each item ships in up to four variants: TS-TW (TypeScript and Tailwind), JS-TW, TS-CSS and JS-CSS. Items that depend on others, such as PricingCards, pull their dependencies through the CLI.",
    "Browse https://designpass.dev/components for components (controls, text effects, backgrounds, loaders, separators and more) and https://designpass.dev/blocks for composed sections such as pricing, navigation, footer and hero blocks. Each page has a playground and its source.",
    "For repeat installs from an AI editor, follow https://designpass.dev/components/getting-started/mcp: add the registry mapping, run `npx shadcn@latest mcp init --client cursor` (or claude, vscode), enable the shadcn MCP server and ask the agent to install items from DesignPass.",
    "Keep the attribution header at the top of each source file, as the license page asks, and read https://designpass.dev/components/license before reusing code outside the project it was installed into.",
  ],
  agentPrompt: `Add DesignPass (https://designpass.dev) animated React components to this existing project.

DesignPass is a shadcn-compatible registry of animated components, blocks and templates by Ernest Liu, with spring-physics motion, 3D effects and WebGL backgrounds. Items install as source files into the project.

Prerequisites:
- A React project with a components.json at the repository root. If it is missing, run npx shadcn@latest init first. Inspect the aliases and the existing styling approach.
- Pick the variant that matches the project: TS-TW (TypeScript and Tailwind), JS-TW, TS-CSS or JS-CSS. Every item name ends with its variant, for example Magnet-TS-TW.
- Items that need other items declare them as registry dependencies, and the shadcn CLI resolves them automatically.

Steps:
1. Read https://designpass.dev/llms.txt for the item list and https://designpass.dev/components/getting-started for the install options.
2. Register the namespace in components.json under registries: "@designpass": "https://designpass.dev/r/{name}.json".
3. Ask me which component or block I need, then find it at https://designpass.dev/components or https://designpass.dev/blocks. Read its page for props, then pick the variant.
4. Install it with npx shadcn@latest add @designpass/<ItemName>-<Variant> (for example @designpass/Magnet-TS-TW). Without the namespace, use npx shadcn@latest add "https://designpass.dev/r/<ItemName>-<Variant>".
5. Inspect the installed files and the dependencies the CLI added. Import the component with the project's alias and use it on the target screen.
6. Run the project's typecheck and build, then check the motion at its real trigger point, with keyboard navigation and with prefers-reduced-motion enabled.

Notes:
- Each source file starts with an attribution header crediting DesignPass.dev and Ernest Liu. The license page at https://designpass.dev/components/license asks you to keep that header intact in copies and adaptations.
- Free components, blocks and templates are MIT licensed. A Pro tier is announced as coming soon, and llms.txt says Pro items are not yet available, so do not invent Pro source.
- When writing new UI inspired by DesignPass, credit DesignPass.dev and Ernest Liu in a source comment, as the AI policy at https://designpass.dev/ai.txt requires.`,
  pricing: {
    model: "free",
    summary: "All components, blocks and templates are free under MIT; a paid Pro tier is announced as coming soon, with terms to be published before any Pro item ships.",
    license: "MIT",
    source: "https://designpass.dev/components/license",
  },
} satisfies LibraryDetails;
