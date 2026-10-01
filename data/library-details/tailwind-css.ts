import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://tailwindcss.com/docs",
  repoUrl: "https://github.com/tailwindlabs/tailwindcss",
  install: [
    { label: "Vite plugin", command: "npm install tailwindcss @tailwindcss/vite" },
    {
      label: "PostCSS plugin",
      command: "npm install tailwindcss @tailwindcss/postcss postcss",
    },
    { label: "Standalone CLI", command: "npm install tailwindcss @tailwindcss/cli" },
  ],
  gettingStarted: [
    "Install `tailwindcss` plus exactly one build integration: `@tailwindcss/vite` (Vite, Laravel, SvelteKit, React Router, Nuxt, SolidJS), `@tailwindcss/postcss` (Next.js, Angular, anything else that runs PostCSS), or `@tailwindcss/cli` (standalone builds). Current major version is 4.3.x, which is CSS-first and no longer uses a JavaScript config.",
    "Wire up the integration. For Vite, add `tailwindcss()` from `@tailwindcss/vite` to the `plugins` array in `vite.config.ts`. For PostCSS, add `\"@tailwindcss/postcss\": {}` to the `plugins` object in `postcss.config.mjs`.",
    "In your main CSS file, add the single import `@import \"tailwindcss\";`. There is no `content` array and no `tailwind.config.js`; Tailwind v4 auto-detects source files and only generates CSS for the class names it actually finds.",
    "Customize in CSS, not config. Add design tokens in a `@theme { --color-brand-500: oklch(0.72 0.19 145); }` block, which automatically creates utilities such as `text-brand-500`, plus `--font-*`, `--breakpoint-*` and `--spacing-*` variables. Reach for `@utility` for custom utilities and `@custom-variant` for new variants.",
    "Style your markup with utility classes, for example `<h1 class=\"text-3xl font-bold underline\">Hello world!</h1>`, and run `npm run dev`. Classes that live outside your project (a UI kit in `node_modules`) need `@source \"../node_modules/@acmecorp/ui-lib\";` since dependencies are ignored by default.",
  ],
  preview: {
    src: "https://tailwindcss.com/api/og?path=/docs/installation/using-vite",
    alt: "Tailwind CSS - Installing with Vite documentation page preview",
  },
  agentPrompt: `Set up Tailwind CSS v4 in this existing project.

Prerequisites: Node.js with npm. Tailwind is CSS-first in v4 - configuration lives in your CSS file, not in tailwind.config.js. Do not create a JavaScript config unless the project already has one, and do not use the v3 @tailwind base/components/utilities directives.

Steps:
1. Detect the stack before installing. If this is a Vite project, install: npm install tailwindcss @tailwindcss/vite, then add tailwindcss() from @tailwindcss/vite to the plugins array in vite.config.ts. If this project runs PostCSS (Next.js, Angular, or a custom build), install: npm install tailwindcss @tailwindcss/postcss postcss, then add "@tailwindcss/postcss": {} to the plugins object in postcss.config.mjs. If there is no build tool at all, install: npm install tailwindcss @tailwindcss/cli and build with npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch.
2. Find the project's main stylesheet and make sure its first line is @import "tailwindcss";. This single import is the whole setup - it registers the source files automatically, so there is no content array and no safelist in the common case.
3. Make sure that stylesheet is actually loaded: imported from the app entry point in a Vite app, or referenced with <link href="..." rel="stylesheet"> in <head> for a plain HTML build.
4. First usage: style an existing element with utility classes (for example class="text-3xl font-bold underline") and confirm the dev server emits the generated CSS. Restart the dev server after changing the build config, since the Vite and PostCSS integrations only load on startup.
5. Theming: extend the design tokens in a @theme { --color-brand-500: oklch(0.72 0.19 145); --font-display: "Satoshi", sans-serif; } block in the same stylesheet. Each namespace maps to utility classes, so --color-* creates text-brand-500, bg-brand-500 and similar. Use @utility for custom utilities and @custom-variant for new variants.

Notes: Tailwind only generates CSS for class names it finds as plain-text tokens in your source files, and it skips .gitignore entries, node_modules, binary files, CSS files and lock files. If you use a class from a shipped UI library, register it with @source "../node_modules/<package>";. If the project is still on v3, run npx @tailwindcss/upgrade@latest to migrate the config and directives, then read the result.

Use the current docs as the source of truth: https://tailwindcss.com/docs/installation, https://tailwindcss.com/docs/theme, https://tailwindcss.com/docs/functions-and-directives, https://tailwindcss.com/docs/detecting-classes-in-source-files and https://tailwindcss.com/docs/upgrade-guide. The Play CDN script at https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4 is for prototyping only and is not meant for production.`,
  pricing: {
    model: "freemium",
    summary: "The framework is free and open source; Tailwind Plus components, templates and UI kit are a separate paid product.",
    license: "MIT",
    source: "https://tailwindcss.com/plus",
  },
} satisfies LibraryDetails;
