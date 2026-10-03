import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://intentui.com/docs/getting-started/installation",
  repoUrl: "https://github.com/irsyadadl/intentui",
  preview: {
    src: "https://intentui.com/opengraph-image-12gd74.png?06407fbb03c20cb7",
    alt: "Intent UI official preview",
  },
  registrySetup: {
    description: "Start with React and Tailwind CSS configured. For a new setup, initialize the Intent UI theme with the command below. In an existing shadcn project, preserve components.json, aliases, and theme customizations, and follow the official framework guide before adding components.",
  },
  install: [
    { label: "Initialize the default theme", command: "npx shadcn@latest init @intentui/theme-default" },
    { label: "Add a combo box", command: "npx shadcn@latest add @intentui/combo-box" },
    { label: "Add form controls", command: "npx shadcn@latest add @intentui/select @intentui/text-field" },
  ],
  gettingStarted: [
    "Choose the Next.js, Vite, TanStack Router, or Laravel React guide linked from the installation page. Intent UI uses React Aria Components and Tailwind CSS; it installs component source rather than a single UI runtime package.",
    "For an unconfigured project, run `npx shadcn@latest init @intentui/theme-default`. Inspect an existing components.json and global CSS before applying a theme so existing paths and design tokens are preserved.",
    "Add only the components you need with the shadcn CLI, for example `npx shadcn@latest add @intentui/combo-box`. The CLI installs the dependencies and source files declared by the registry item.",
    "Import from the generated component path and follow the component's documented composition and props. For a combo box, use https://intentui.com/docs/components/pickers/combo-box rather than the API of a Radix-based select.",
    "Agent documentation is available at https://intentui.com/llms.txt, with editor integration described at https://intentui.com/docs/getting-started/ai.",
  ],
  agentPrompt: `Add Intent UI (https://intentui.com) to this existing React project.

Intent UI supplies editable React components built on React Aria Components and Tailwind CSS. Components are installed through the shadcn registry, rather than npm installing an intentui runtime.

Prerequisites:
- Confirm the app uses React and has a working Tailwind CSS setup.
- Inspect the package manager, components.json, import aliases, and global theme CSS before changing setup.

Steps:
1. Read https://intentui.com/docs/getting-started/installation and the linked guide for this app's framework. Use https://intentui.com/llms.txt to find the current component APIs.
2. If the project is not configured yet, initialize with npx shadcn@latest init @intentui/theme-default. For an existing shadcn project, follow its documented integration path and preserve existing aliases, registries, and customized theme tokens.
3. Install only the requested component, for example npx shadcn@latest add @intentui/combo-box. Select and text-field can be added with npx shadcn@latest add @intentui/select @intentui/text-field.
4. Inspect the generated files and import from their actual location. Copy the composition from the matching Intent UI component page; React Aria props and events differ from Radix APIs.
5. Integrate it into an existing screen using the project's styles and state conventions. Keep labels, focus handling, and keyboard behavior intact, then run the project's typecheck and build.

Treat the copied components as project source. Add a client boundary where the framework requires one for interactive React components.`,
  pricing: {
    model: "freemium",
    summary: "The component library is free under MIT; Intent UI Design offers separate paid blocks, patterns, and templates.",
    license: "MIT",
    source: "https://design.intentui.com/license",
  },
} satisfies LibraryDetails;
