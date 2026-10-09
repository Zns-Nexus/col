import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://github.com/timc1/kbar#readme",
  repoUrl: "https://github.com/timc1/kbar",
  install: [
    { label: "npm", command: "npm install kbar" },
    { label: "pnpm", command: "pnpm add kbar" },
  ],
  gettingStarted: [
    "Install `kbar` in an existing React 17, 18, or 19 project; it ships its own TypeScript types.",
    "Wrap the app in `KBarProvider` with an initial `actions` array; each action is plain data (`id`, `name`, `shortcut`, `keywords`, `perform`) so anyone can build custom UI on top.",
    "Render `KBarPortal` with `KBarPositioner`, `KBarSearch`, and `KBarResults` to get the built-in command menu, or supply your own components against the same data structure.",
    "Use nested actions for drill-down navigation, and the built-in history helpers for undo and redo; screen-reader support ships in the box.",
  ],
  pricing: {
    model: "free",
    summary: "kbar is free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/timc1/kbar",
  },
  agentPrompt: `Add kbar (https://github.com/timc1/kbar) to this existing React project.

kbar is a plug-n-play command + k (command palette) component: keyboard
navigation, shortcuts, nested actions, animations, and screen-reader support
come built in, and every visual part is replaceable.

Prerequisites:
- Inspect the React version (17, 18, or 19), existing keyboard-shortcut
  handling, and any installed command palette to avoid duplicates.

Steps:
1. Run "npm install kbar" (or "pnpm add kbar") from the project root.
2. Wrap the app in \`KBarProvider\` with an \`actions\` array; each action is
   plain data (id, name, shortcut, keywords, perform).
3. Render \`KBarPortal\` > \`KBarPositioner\` > \`KBarSearch\` + \`KBarResults\`
   for the default UI, or replace the visuals against the same data structure.
4. Register the project's real actions (navigation, theme toggles, searches)
   and verify keyboard access end to end.

Consult https://github.com/timc1/kbar#readme before deviating; nested actions
and history helpers cover drill-down and undo flows.`,
} satisfies LibraryDetails;
