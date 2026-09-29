import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://21st.dev",
  repoUrl: "https://github.com/serafimcloud/21st",
  registrySetup: {
    description: "Initialize shadcn if needed. Create a free API key at 21st.dev/mcp and export API_KEY_21ST in your shell. Use the full registry URL from each component page; no namespace entry is required in components.json.",
  },
  install: [
    {
      label: "Install one component (shadcn CLI)",
      command:
        'npx shadcn@latest add "https://21st.dev/r/shadcn/accordion?api_key=$API_KEY_21ST"',
    },
    {
      label: "21st CLI",
      command: "npm i -g @21st-dev/cli",
    },
    {
      label: "Add the 21st MCP server to an editor",
      command: "npx @21st-dev/cli@latest init --client <cursor|claude|codex|vscode|devin>",
    },
  ],
  gettingStarted: [
    "Use a React + TypeScript project styled with Tailwind CSS (Next.js, Vite, Remix, Astro all work). If shadcn/ui is not set up yet, run npx shadcn@latest init so the project has a components.json.",
    "Create a free API key at https://21st.dev/mcp and export it as API_KEY_21ST in your shell.",
    "Browse https://21st.dev/community/components, open a component page, and copy its install command: npx shadcn@latest add \"https://21st.dev/r/<author>/<slug>?api_key=$API_KEY_21ST\".",
    "Run that command from the project root. The component source, its npm dependencies and any theme changes land in your repo as editable files.",
    "Optional: run npx @21st-dev/cli@latest init --client <cursor|claude|codex|vscode|devin> to configure the 21st MCP server (https://21st.dev/api/mcp) for your coding agent.",
  ],
  preview: {
    src: "https://21st.dev/opengraph-image.png",
    alt: "21st.dev home page preview",
  },
  agentPrompt: `Help me use 21st (https://21st.dev), a community registry of React components published in the shadcn registry format, inside my existing project.

Prerequisites:
- My stack is React + TypeScript + Tailwind CSS. Check that the project root has a components.json; if it does not, run npx shadcn@latest init first.
- Components are copied source files, not an npm package. Do not npm install 21st.

Steps:
1. Read the official docs at https://21st.dev. Plain-text versions of pages are available by appending .md (for example https://21st.dev/mcp.md), and https://21st.dev/llms.txt summarizes the product. Use them for current commands instead of guessing.
2. Ask me for a 21st API key. If I do not have one, tell me to create a free key at https://21st.dev/mcp, then export it as API_KEY_21ST.
3. Pick a component from https://21st.dev/community/components (real author and slug from a component page) and install it from the project root with: npx shadcn@latest add "https://21st.dev/r/<author>/<slug>?api_key=$API_KEY_21ST".
4. First usage: after install, import the new component into an existing page or view, adapt it to my theme tokens and import conventions, and confirm the app still builds.
5. Optional: if I want the catalog searchable from my editor, run npx @21st-dev/cli@latest init --client <my agent name> and set my API key where it asks for it.

Keep the installed code in my repo and treat it as mine to edit.`,
} satisfies LibraryDetails;
