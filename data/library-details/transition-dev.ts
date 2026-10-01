import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://transitions.dev/skill.html",
  repoUrl: "https://github.com/Jakubantalik/transitions.dev",
  install: [
    { label: "All free transitions", command: "npx transitions-dev add --free" },
    { label: "One transition", command: "npx transitions-dev add card-resize" },
    {
      label: "Agent skill",
      command: "npx skills add Jakubantalik/transitions.dev",
    },
  ],
  gettingStarted: [
    "Open https://transitions.dev/ and browse the catalog; every card has a copy button that emits a self-contained CSS snippet.",
    "Run npx transitions-dev list to see the catalog, then npx transitions-dev add card-resize for one transition or npx transitions-dev add --free for the whole free set (pulled into your project, no account needed).",
    "Paste a snippet into your stylesheet: it already carries its own :root custom properties, t-* class rules and a prefers-reduced-motion guard, so no demo markup is required.",
    "Optional: install the agent skill with npx skills add Jakubantalik/transitions.dev so Claude Code, Cursor, GitHub Copilot, Codex or Gemini CLI can apply transitions in the project.",
    "Pro recipes need a browser sign-in first (npx transitions-dev login). Current install details: https://transitions.dev/skill.html#installation.",
  ],
  preview: {
    src: "https://transitions.dev/assets/og-main.jpg",
    alt: "Transitions.dev: UI transitions for AI agents",
  },
  agentPrompt: `Add UI transitions from Transitions.dev (https://transitions.dev) to this existing project.

Prerequisites: Node.js with npx available, plus a project that can take plain CSS (React and TypeScript work too, the recipes are CSS first). Official docs: https://transitions.dev/skill.html, installation section https://transitions.dev/skill.html#installation.

Steps:
1. Run npx transitions-dev list to see the available transitions, then npx transitions-dev add --free to copy the free ones into my project (or npx transitions-dev add card-resize for a single transition). Free transitions need no account; skip anything that requires npx transitions-dev login.
2. Read one generated recipe and wire it up: add its :root custom properties to my stylesheet and apply its t-* class to an element I name, for example a dropdown menu that should animate open and close.
3. Keep the prefers-reduced-motion guard that ships with every snippet, and leave my existing styling, TypeScript setup and build tooling unchanged.
4. If this project uses an agent skill workflow, install it with npx skills add Jakubantalik/transitions.dev and use its transitions apply and transitions review commands for later changes.
5. Confirm the transition actually renders on my running dev server before touching more components.

If a command or option is not documented on https://transitions.dev/skill.html or https://github.com/Jakubantalik/transitions.dev, stop and follow the docs instead of guessing.`,
  pricing: {
    model: "freemium",
    summary: "Core transitions are free; the full library and a commercial license come with paid Pro plans, monthly or lifetime.",
    license: "MIT",
    source: "https://transitions.dev/pro.html",
  },
} satisfies LibraryDetails;
