import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.zardui.com/docs/installation",
  repoUrl: "https://github.com/zard-ui/zardui",
  preview: {
    src: "https://zardui.com/og?title=Zard+UI+-+The+%40shadcn%2Fui+Alternative+for+Angular&description=Finally%2C+a+real+%40shadcn%2Fui+alternative+for+Angular.+Free+and+open-source+UI+components+built+with+Angular%2C+TypeScript%2C+and+Tailwind+CSS.",
    alt: "Zard UI official preview",
  },
  install: [
    { label: "Initialize Zard UI", command: "npx zard-cli@latest init" },
    { label: "Add a button", command: "npx zard-cli@latest add button" },
    { label: "Add several components", command: "npx zard-cli@latest add button card dialog" },
  ],
  gettingStarted: [
    "Zard UI supports Angular 19 and newer, using standalone components, signal inputs, Angular CDK, and Tailwind CSS. Check https://www.zardui.com/docs/version-support before adding it to an older app.",
    "Run `npx zard-cli@latest init` from the workspace and select the correct project type: Angular, Angular Library, Nx, Nx Library, or Analog.js. The selected type determines the CSS build pipeline, provider registration, and alias configuration.",
    "Review the generated components.json, core utilities, theme tokens, providers, and TypeScript aliases. Initialization writes configuration and global CSS, so preserve existing customizations instead of rerunning it blindly.",
    "Add source with `npx zard-cli@latest add button`. The CLI resolves component dependencies and writes to the configured directory. It is not a runtime package containing every component.",
    "Import `ZardButtonComponent` from the generated button directory into a standalone component's imports, then render `<z-button>`. Follow https://www.zardui.com/docs/cli and each component's API for other imports and selectors.",
  ],
  agentPrompt: `Add Zard UI (https://www.zardui.com) to this existing Angular project.

Zard UI distributes editable Angular component source through zard-cli. It uses Tailwind CSS, Angular CDK, and modern standalone component APIs.

Prerequisites:
- Angular 19 or newer; confirm current support at https://www.zardui.com/docs/version-support.
- Identify whether this is an Angular app, Angular library, Nx app/library, or Analog.js project. Inspect its existing global CSS, providers, and import aliases.

Steps:
1. Read https://www.zardui.com/docs/installation and https://www.zardui.com/docs/cli. Follow the environment-specific installation guide.
2. If not configured, run npx zard-cli@latest init and select the correct project type and workspace project. Inspect its changes because init writes theme CSS, aliases, utilities, and providers. Preserve existing customizations.
3. Add the requested source with npx zard-cli@latest add button, replacing button with a verified catalog name as needed. The CLI resolves dependencies and uses paths from components.json.
4. Import the generated standalone component and add it to the consuming component's imports. The button example uses ZardButtonComponent and the z-button selector; use each component's own docs for its API.
5. Keep Angular CDK compatible with the app's Angular version, merge styles with the existing theme, and wire inputs and outputs to typed project state.
6. Run the project's Angular checks and build. Keep accessibility labels, focus management, and keyboard behavior intact.

Do not apply the plain Angular setup to an Nx library or Analog.js host without following its specific guide.`,
  pricing: {
    model: "free",
    summary: "Zard UI components are free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/zard-ui/zardui/blob/master/LICENSE.md",
  },
} satisfies LibraryDetails;
