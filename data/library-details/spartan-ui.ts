import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://spartan.ng/documentation/installation",
  repoUrl: "https://github.com/spartan-ng/spartan",
  preview: {
    src: "https://www.spartan.ng/assets/og-image.png",
    alt: "Spartan UI official preview",
  },
  install: [
    { label: "Install the CLI plugin", command: "npm install -D @spartan-ng/cli" },
    { label: "Initialize (Angular CLI)", command: "ng g @spartan-ng/cli:init" },
    { label: "Add components (Angular CLI)", command: "ng g @spartan-ng/cli:ui" },
    { label: "Initialize (Nx)", command: "npx nx g @spartan-ng/cli:init" },
    { label: "Add components (Nx)", command: "npx nx g @spartan-ng/cli:ui" },
  ],
  gettingStarted: [
    "Spartan UI separates accessible behavior in the installed `@spartan-ng/brain` package from helm component source copied into the app. The current installation guide requires Tailwind CSS v4.",
    "Install `@spartan-ng/cli` as a development dependency, then run `ng g @spartan-ng/cli:init`, or `npx nx g @spartan-ng/cli:init` in an Nx workspace.",
    "Run the corresponding `@spartan-ng/cli:ui` generator and select only the needed components. It installs the brain dependency and required packages while copying editable helm source.",
    "Review the Tailwind layers, theme variables, and `@spartan-ng/brain/hlm-tailwind-preset.css` import. The preset includes animation CSS and Angular CDK overlay styles; follow the manual setup guide when merging into an existing theme.",
    "Import the generated helm components from the configured aliases and use the composition shown on each component page. Keep Angular CDK and brain versions compatible with the Angular version documented at https://spartan.ng/documentation/version-support.",
  ],
  agentPrompt: `Add Spartan UI (https://spartan.ng) to this existing Angular project.

Spartan UI has two layers: @spartan-ng/brain supplies accessible behavior, and helm components are copied into the app for styling and customization.

Prerequisites:
- Check the app's Angular version against https://spartan.ng/documentation/version-support.
- The current installation guide requires Tailwind CSS v4. Inspect global CSS, import aliases, and whether the workspace uses Angular CLI or Nx.

Steps:
1. Read https://spartan.ng/documentation/installation and the requested component page before selecting imports or selectors.
2. Install the generator plugin with npm install -D @spartan-ng/cli, using the existing package manager.
3. Initialize with ng g @spartan-ng/cli:init for Angular CLI, or npx nx g @spartan-ng/cli:init for Nx. Keep existing configuration and style customizations intact.
4. Add only the required components with ng g @spartan-ng/cli:ui or npx nx g @spartan-ng/cli:ui. The generator installs brain and dependencies and copies helm source into the configured directory.
5. Review CSS layers and theme variables. Follow the documented import of @spartan-ng/brain/hlm-tailwind-preset.css, which includes animation and CDK overlay styles. Avoid duplicating global styles already supplied by the preset.
6. Import the generated helm components and documented brain primitives, connect them to typed Angular state, and run the project's typecheck and build.

Customize helm source in the project. Preserve the primitives' accessibility behavior and use the exact APIs documented for the installed version.`,
  pricing: {
    model: "free",
    summary: "Spartan UI is free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/spartan-ng/spartan",
  },
} satisfies LibraryDetails;
