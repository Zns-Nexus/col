import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://aicanvas.me",
  repoUrl: "https://github.com/aicanvas-me/aicanvas",
  registrySetup: {
    description: "Create a free account at aicanvas.me, copy your token from account settings, and set AICANVAS_TOKEN in .env.local. Initialize shadcn if needed, then merge this registry into components.json, preserving its existing settings.",
    config: `{
  "registries": {
    "@aicanvas": {
      "url": "https://aicanvas.me/r/{name}.json",
      "params": {
        "token": "\${AICANVAS_TOKEN}"
      }
    }
  }
}`,
  },
  install: [
    {
      label: "Install one component (shadcn CLI)",
      command: "npx shadcn@latest add @aicanvas/<component-name>",
    },
    {
      label: "Add the AI Canvas MCP server (Claude Code)",
      command: "claude mcp add aicanvas --scope user -- npx -y @aicanvas/mcp",
    },
    {
      label: "Run the MCP server directly (stdio)",
      command: "npx -y @aicanvas/mcp",
    },
  ],
  gettingStarted: [
    "Use a React + TypeScript project styled with Tailwind CSS. Components install as editable source files, so the project root needs a components.json; if it is missing, run npx shadcn@latest init first.",
    "Create a free account at https://aicanvas.me/account/sign-up, copy the personal token from https://aicanvas.me/account/settings, put it in .env.local as AICANVAS_TOKEN, and register the namespace once in components.json: { \"registries\": { \"@aicanvas\": { \"url\": \"https://aicanvas.me/r/{name}.json\", \"params\": { \"token\": \"${AICANVAS_TOKEN}\" } } } }.",
    "Browse https://aicanvas.me/components, open a component page, and copy its command: npx shadcn@latest add @aicanvas/<slug>. Run it from the project root and the .tsx source, its npm dependencies and any theme changes land in the repo. Signed out, the command still exits 0 but writes a small placeholder file titled \"(free account required)\" instead of the component, so check the installed file's title before reporting success.",
    "Browse the full list offline at https://aicanvas.me/llms.txt, or the machine-readable index at https://aicanvas.me/r/registry.json, which currently lists 183 components, blocks and templates.",
    "Optional: install the MCP server with claude mcp add aicanvas --scope user -- npx -y @aicanvas/mcp (setup guide at https://aicanvas.me/mcp), so an agent can search, inspect and install components on its own.",
  ],
  preview: {
    src: "https://aicanvas.me/og-aug2026-aicanvas.me.png",
    alt: "AI Canvas home page: AI native components, design systems, blocks, templates and skills",
  },
  agentPrompt: `Use AI Canvas (https://aicanvas.me), an open-core registry of animated React components, blocks, design systems and templates built with Tailwind CSS and Motion, inside my existing project.

Prerequisites:
- My stack is React + TypeScript + Tailwind CSS. Check the project root has a components.json; if not, run npx shadcn@latest init first.
- Components are copied source files, not an npm package. Do not npm install aicanvas.
- Installs need an AICANVAS_TOKEN (free account). Without it the shadcn CLI still exits 0 but writes a placeholder file titled "(free account required)" instead of the real component, so verify the installed file's title before claiming success.
- The registry is in the official shadcn directory, so the CLI resolves @aicanvas/<slug> with no extra setup. The token lives in .env.local as AICANVAS_TOKEN and is wired in components.json under registries: { "@aicanvas": { "url": "https://aicanvas.me/r/{name}.json", "params": { "token": "\${AICANVAS_TOKEN}" } } }.

Steps:
1. Read the current catalog at https://aicanvas.me/llms.txt instead of guessing slugs; the machine-readable index is https://aicanvas.me/r/registry.json. Do not read the whole index into context, grep it for what I need.
2. Pick a component that fits what I described, then install it from the project root with: npx shadcn@latest add @aicanvas/<slug>. Real slugs include magnetic-dots, sticker-wall, glass-navbar, polaroid-stack, task-cards and ripple-type.
3. First usage: import the installed component into an existing page, adapt it to my theme tokens and import conventions, and confirm the app still builds. Ask me whether I want its AICANVAS remix prompt applied.
4. Prefer the AI Canvas MCP server when I want you to browse and install without copy-paste. It is already configured if \`claude mcp add aicanvas --scope user -- npx -y @aicanvas/mcp\` has been run (setup guide: https://aicanvas.me/mcp). It is read-only and exposes search_components, get_component, get_component_props, get_install_command, compose_page, validate_usage and get_audit_checklist.
5. Before calling the work done, run validate_usage on the file I touched, then get_audit_checklist for the finishing pass. Note that compose_page plans only and generates no code.

Some components need extra npm packages, for example Three.js for particle-sphere or curious-ai, and Motion for animation. Install whatever the registry item lists as dependencies. Free components are MIT; premium components, design systems and templates need a paid token.

The installed code lives in my repo and is mine to edit.`,
  pricing: {
    model: "freemium",
    summary: "The free library is MIT licensed; Premium adds closed-source components, blocks and templates as a monthly or yearly subscription.",
    license: "MIT",
    source: "https://aicanvas.me/pricing",
  },
} satisfies LibraryDetails;
