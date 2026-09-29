import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.kibo-ui.com",
  repoUrl: "https://github.com/shadcnblocks/kibo",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@kibo-ui": "https://www.kibo-ui.com/r/{name}.json"
  }
}`,
  },
  install: [
    { label: "Kibo UI CLI", command: "npx kibo-ui add gantt" },
    { label: "shadcn CLI", command: "npx shadcn add @kibo-ui/gantt" },
  ],
  gettingStarted: [
    "Prerequisites from https://www.kibo-ui.com/docs/setup: Node.js 18 or later, a React 18+ project, and shadcn/ui already initialized (for example by running npx shadcn@latest init). Kibo UI supports only the CSS Variables mode of shadcn/ui, so the project needs a components.json and Tailwind CSS configured.",
    "Install a single component by name with the dedicated CLI, for example `npx kibo-ui add gantt`. The shadcn CLI is the documented alternative and takes the same component name in the `@kibo-ui/` namespace: `npx shadcn add @kibo-ui/gantt`.",
    "Both commands copy the component's source into `@/components/kibo-ui/<name>/` (or whatever directory your shadcn components settings use) and install the npm dependencies the component declares, such as `motion` for animation and `lucide-react` for icons.",
    "First usage: import the parts from the generated file, for example `import { Gantt } from \"@/components/kibo-ui/gantt\"`, render it in an existing page, and confirm the build still passes. The catalog lists 41 components at https://www.kibo-ui.com/components.",
    "Optional: configure the Kibo UI MCP server for an AI tool by adding `{ \"mcpServers\": { \"kibo-ui\": { \"command\": \"npx\", \"args\": [ \"-y\", \"mcp-remote\", \"https://www.kibo-ui.com/api/mcp/mcp\" ] } } }` to your MCP config, as described at https://www.kibo-ui.com/docs/mcp.",
  ],
  preview: {
    src: "https://www.kibo-ui.com/opengraph-image.jpg?opengraph-image.408bd8df.jpg",
    alt: "Kibo UI home page preview",
  },
  agentPrompt: `Add Kibo UI to this existing project. Kibo UI is a custom registry of composable, accessible, open source components designed for use with shadcn/ui, at https://www.kibo-ui.com.

Prerequisites:
- Node.js 18 or later, a React 18+ project, and shadcn/ui already set up. The project root must have a components.json; if it does not, run npx shadcn@latest init first.
- Kibo UI supports only the CSS Variables mode of shadcn/ui, so do not use a JSON/tailwind.config-only theme.
- Components are copied source files, not an npm package. Do not npm install kibo-ui as a dependency; run the kibo-ui CLI with npx only.

Steps:
1. Read the official setup guide at https://www.kibo-ui.com/docs/setup and the component catalog at https://www.kibo-ui.com/components. Do not guess component names or commands; each component has its own page and its own name to pass to the CLI.
2. Install a component from the project root with the Kibo UI CLI, for example: npx kibo-ui add gantt. The documented shadcn CLI alternative for the same component is: npx shadcn add @kibo-ui/gantt. Pick one style and stay consistent for the rest of the project.
3. Confirm where the files landed. By default the component is written to @/components/kibo-ui/<name>/, or the directory configured in your shadcn components settings. The CLI also installs the dependencies the component declares, which vary per component: motion for animation, lucide-react for icons, plus library-specific ones such as @dnd-kit/* for the kanban, @tanstack/react-table for the table, @tiptap/* for the editor, and media-chrome for the video-player.
4. First usage: import the component from the generated path (for example \`import { Gantt } from "@/components/kibo-ui/gantt"\`), render it inside an existing page, and confirm the app still builds. Repeat step 2 for each additional component you need rather than adding them all at once.
5. If I want the catalog searchable from my editor, add the Kibo UI MCP server to my MCP config: { "mcpServers": { "kibo-ui": { "command": "npx", "args": [ "-y", "mcp-remote", "https://www.kibo-ui.com/api/mcp/mcp" ] } } }, then restart the tool. The instructions are at https://www.kibo-ui.com/docs/mcp.

Treat the installed components as my own source code and edit them directly. Source for the library is at https://github.com/shadcnblocks/kibo, and the shadcn registry JSON is served at https://www.kibo-ui.com/r/registry.json.`,
} satisfies LibraryDetails;
