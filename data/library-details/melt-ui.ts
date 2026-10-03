import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://next.melt-ui.com/guides/installation",
  repoUrl: "https://github.com/melt-ui/next-gen",
  preview: {
    src: "https://raw.githubusercontent.com/melt-ui/next-gen/main/static/banner.png",
    alt: "Melt UI official preview",
  },
  install: [
    { label: "Svelte 5 package (npm)", command: "npm install melt" },
    { label: "Svelte 5 package (pnpm)", command: "pnpm add melt" },
  ],
  gettingStarted: [
    "This entry covers next-generation Melt UI for Svelte 5, installed as `melt`. The guide requires Node.js 18+ and Svelte 5+; follow the framework's higher minimum where applicable. The older `@melt-ui/svelte` library has a different API.",
    "Install `melt`, then choose between builders from `melt/builders` and component wrappers from `melt/components`. Both approaches are headless and leave markup and styling to the application.",
    "For a builder, import `Toggle` from `melt/builders`, create `new Toggle(...)`, and spread `toggle.trigger` onto a button. Pass reactive values through getters so Svelte runes remain connected to builder state.",
    "For the wrapper approach, import `Toggle` from `melt/components`, use `bind:value`, and render the trigger inside its children snippet. The wrapper exposes a builder instance rather than styled elements.",
    "Read https://next.melt-ui.com/guides/how-to-use for reactive state and attribute merging. The next-generation package remains pre-1.0, so inspect release changes when upgrading.",
  ],
  agentPrompt: `Add next-generation Melt UI (https://next.melt-ui.com) to this existing Svelte 5 project.

This entry uses the melt package from https://github.com/melt-ui/next-gen. It is distinct from the older @melt-ui/svelte package and its action/store API.

Prerequisites:
- Svelte 5 or newer and Node.js 18 or newer, honoring any higher framework minimum.
- Inspect existing Svelte state and styling conventions. Melt supplies no default styling.

Steps:
1. Read https://next.melt-ui.com/guides/installation, https://next.melt-ui.com/guides/how-to-use, and the requested component's documentation.
2. Install the next-generation package with npm install melt, or the project's equivalent package-manager command.
3. Choose builders from melt/builders or wrappers from melt/components. Follow the project's existing pattern. For a builder example, import Toggle, create new Toggle with documented options, and spread toggle.trigger onto the button.
4. Pass reactive options through getters backed by Svelte runes. If using wrappers, follow the documented bind:value and children snippet pattern. Do not substitute the older library's actions or stores.
5. Provide markup, labels, and styles using the app's design system. Keep the builder's event handlers and ARIA attributes intact when merging custom attributes.
6. Run the project's Svelte checks and build. Review release notes before upgrades because the package is still pre-1.0.

Use the exact documented API for the installed melt version.`,
  pricing: {
    model: "free",
    summary: "Next-generation Melt UI is free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/melt-ui/next-gen",
  },
} satisfies LibraryDetails;
