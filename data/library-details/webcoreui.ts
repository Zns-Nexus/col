import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://webcoreui.dev/docs/setup",
  repoUrl: "https://github.com/Frontendland/webcoreui",
  preview: {
    src: "https://raw.githubusercontent.com/Frontendland/webcoreui/main/public/img/banner.png",
    alt: "WebcoreUI official preview",
  },
  install: [
    { label: "Library and styling dependencies", command: "npm install webcoreui typescript sass" },
    { label: "Configure an existing Astro project", command: "npm create webcore@latest config" },
    { label: "New project (optional)", command: "npm create webcore@latest" },
  ],
  gettingStarted: [
    "Choose the Astro, Svelte, or React integration guide from https://webcoreui.dev/docs/setup. WebcoreUI uses Sass and TypeScript rather than Tailwind, and ships framework-specific component exports.",
    "Install `webcoreui`, `typescript`, and `sass`. For Astro, merge the `webcore()` integration from `webcoreui/integration`; for Vite React or Svelte, merge the `webcoreVite()` plugin into the existing plugin array.",
    "Add webcore.config.scss at the project root, then create a global SCSS entry using `@use 'webcoreui/styles' as *;` and the documented `setup(...)` mixin. Point the mixin's font paths at real assets in the project.",
    "Import the global SCSS once in the app's entry or layout. Import components from `webcoreui/astro`, `webcoreui/svelte`, or `webcoreui/react` to match the host framework.",
    "For an existing Astro app, `npm create webcore@latest config` can automate configuration. Review its changes before adopting them; the new-project command is for starting a separate app, not replacing the current one.",
  ],
  agentPrompt: `Add WebcoreUI (https://webcoreui.dev) to this existing Astro, Svelte, or React project.

WebcoreUI is a Sass-styled component library with separate exports for each supported framework. Core code is MIT-licensed; premium blocks and templates are separate products.

Prerequisites:
- Identify the host framework, bundler, global style entry, Sass setup, and existing fonts.

Steps:
1. Read https://webcoreui.dev/docs/setup and the matching integration guide: https://webcoreui.dev/docs/astro, https://webcoreui.dev/docs/svelte, or https://webcoreui.dev/docs/react. Check the installed framework against the current package requirements.
2. Install npm install webcoreui typescript sass, using the project's package manager and keeping existing compatible dependencies.
3. For Astro, merge webcore() from webcoreui/integration into integrations. For Vite React or Svelte, merge webcoreVite() from the same module into the existing plugins array. Preserve unrelated plugins.
4. Add or merge webcore.config.scss. Create a global SCSS entry using @use 'webcoreui/styles' as * and the documented setup mixin with actual project font paths. Import it once from the existing entry or layout.
5. Import only requested components from webcoreui/astro, webcoreui/svelte, or webcoreui/react. Use their official documentation and framework-specific props.
6. Integrate with the project's theme and state, then run typecheck and build. Use the current Svelte application's initialization API rather than copying an older bootstrap example.

The optional npm create webcore@latest config command configures an existing Astro app. Do not run the new-project scaffolder over this application's files.`,
  pricing: {
    model: "freemium",
    summary: "The core library is free under MIT; WebcoreUI Pro adds paid blocks, templates, and support.",
    license: "MIT",
    source: "https://webcoreui.dev/pro",
  },
} satisfies LibraryDetails;
