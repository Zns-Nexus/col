import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://mantine.dev",
  repoUrl: "https://github.com/mantinedev/mantine",
  install: [
    { label: "Install core packages", command: "npm install @mantine/core @mantine/hooks" },
    {
      label: "Install PostCSS dev dependencies",
      command: "npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars",
    },
  ],
  gettingStarted: [
    "Run `npm install @mantine/core @mantine/hooks`, then `npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars`.",
    "Create `postcss.config.cjs` at the project root with the `postcss-preset-mantine` and `postcss-simple-vars` plugins, including the `mantine-breakpoint-*` variables listed in the docs.",
    "Import `@mantine/core/styles.css` once in your app root file, before any other Mantine package styles and before your own CSS.",
    "Wrap the app in `<MantineProvider>` and pass theme overrides via `createTheme`; for SSR also render `ColorSchemeScript` in `<head>` and spread `mantineHtmlProps` on `<html>`.",
    "Use a first component such as `import { Button } from '@mantine/core'`, then add other packages (`@mantine/form`, `@mantine/dates`, `@mantine/notifications`) as needed.",
  ],
  preview: {
    src: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/social-preview.png",
    alt: "Mantine React components library social preview image",
  },
  agentPrompt: `Add Mantine to this existing React project.

Prerequisites: a React 18+ app (Vite, Next.js, or React Router recommended; Create React App is not supported), with PostCSS available through your bundler. Check the framework guide at https://mantine.dev/guides/vite/ or https://mantine.dev/guides/next/ if your setup differs.

Steps:
1. Install the runtime packages: "npm install @mantine/core @mantine/hooks". Install PostCSS tooling: "npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars".
2. Create postcss.config.cjs in the project root with plugins "postcss-preset-mantine" and "postcss-simple-vars" (set the mantine-breakpoint-xs through mantine-breakpoint-xl variables as shown in the docs).
3. In the app root, import "@mantine/core/styles.css" first, then wrap your tree in <MantineProvider> with a theme created by createTheme. For SSR frameworks add <ColorSchemeScript /> to the document head and spread mantineHtmlProps on the <html> element.
4. Render one component to confirm it works, for example import { Button } from "@mantine/core" and place it in an existing page.
5. Add extra packages only when needed (for example @mantine/form, @mantine/dates, @mantine/notifications), importing each one's styles.css after the core styles.

Consult the official docs at https://mantine.dev/getting-started/ before deviating from these steps, since PostCSS setup and provider props change between major versions.`,
  pricing: {
    model: "free",
    summary: "Mantine core, hooks and the Mantine UI premade components are free forever, funded by sponsors.",
    license: "MIT",
    source: "https://github.com/mantinedev/mantine",
  },
} satisfies LibraryDetails;
