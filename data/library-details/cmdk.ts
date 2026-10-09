import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://github.com/pacocoursey/cmdk#readme",
  repoUrl: "https://github.com/pacocoursey/cmdk",
  install: [
    { label: "npm", command: "npm install cmdk" },
    { label: "pnpm", command: "pnpm install cmdk" },
  ],
  gettingStarted: [
    "Install `cmdk` in an existing React 18 or 19 project; it ships its own TypeScript types and no stylesheet.",
    "Import `Command` from `cmdk` and compose the menu from `Command.Input`, `Command.List`, `Command.Empty`, `Command.Group`, and `Command.Item`; items filter and sort automatically as the user types.",
    "The same parts work as an accessible combobox when you control the open state yourself; wrap items in your own components or plain JSX — the API is fully composable.",
    "Style every part with the project's own CSS or Tailwind classes; cmdk ships no theme. The shadcn/ui Command component is a styled wrapper around this package.",
  ],
  pricing: {
    model: "free",
    summary: "cmdk is free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/pacocoursey/cmdk",
  },
  agentPrompt: `Add cmdk (https://github.com/pacocoursey/cmdk) to this existing React project.

cmdk is an unstyled command menu React component that doubles as an accessible
combobox: you render items and it filters and sorts them automatically. The
application supplies all styling.

Prerequisites:
- Inspect the React version (18 or 19), the project's styling approach, and any
  existing command palette or combobox.

Steps:
1. Run "npm install cmdk" (or "pnpm install cmdk") from the project root.
2. Build the menu from \`Command\` and its parts as the README shows:
   \`Command.Input\`, \`Command.List\`, \`Command.Empty\`, \`Command.Group\`,
   \`Command.Item\`, \`Command.Separator\`.
3. Style every part with the project's own conventions; cmdk ships no styles.
4. Verify the palette filters as the user types and works from the keyboard.

Consult https://github.com/pacocoursey/cmdk#readme before deviating; the API is
composable, so wrapping items in project components is supported. If the project
already uses shadcn/ui's Command component, prefer that instead of adding cmdk
twice.`,
} satisfies LibraryDetails;
