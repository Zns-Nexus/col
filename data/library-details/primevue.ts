import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://primevue.dev/installation/",
  repoUrl: "https://github.com/primefaces/primevue",
  install: [
    { label: "npm", command: "npm install primevue @primeuix/themes" },
    { label: "pnpm", command: "pnpm add primevue @primeuix/themes" },
    { label: "Icons (optional)", command: "npm install @primeicons/vue" },
    { label: "Forms add-on", command: "npm install @primevue/forms" },
    {
      label: "Auto imports (dev)",
      command:
        "npm install -D unplugin-vue-components @primevue/auto-import-resolver",
    },
    {
      label: "Nuxt module (dev)",
      command: "npm install --save-dev @primevue/nuxt-module",
    },
  ],
  gettingStarted: [
    "Requires Vue 3.5 or newer — `@primevue/core` declares a `vue: ^3.5.0` peer dependency. Install the library plus a theme: `npm install primevue @primeuix/themes`.",
    "Register the plugin in the app entry file and pass a theme preset. This is the step people miss, and components render unstyled without it: `import PrimeVue from 'primevue/config'; import Aura from '@primeuix/themes/aura'; app.use(PrimeVue, { theme: { preset: Aura } });`",
    "v5 is published under the PrimeUI License, a Community/Commercial model, so add `license: 'PRIMEUI-LICENSE-KEY'` to the same options object. Releases on the `v4-stable` npm tag remain MIT.",
    "Import each component from its own path, for example `import Button from 'primevue/button'`. The full Vite walkthrough is at https://primevue.dev/vite.",
    "On Nuxt, install `@primevue/nuxt-module` instead of wiring the plugin by hand — it registers PrimeVue and auto-imports components with tree shaking: https://primevue.dev/nuxt.",
  ],
  preview: {
    src: "https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/meta/primevue-meta.png",
    alt: "PrimeVue Vue UI component library preview",
  },
  agentPrompt: `Add PrimeVue to this existing Vue project.

PrimeVue (https://primevue.dev) is a design-agnostic component library for Vue 3.5+. Styling is decoupled from the components and supplied by a theme preset from @primeuix/themes, so both the plugin registration and the preset are required before anything renders correctly.

Prerequisites:
- The project is a Vue 3 app (Vite, Nuxt or plain). Confirm \`vue\` resolves to 3.5 or newer — @primevue/core declares a \`vue: ^3.5.0\` peer dependency.
- Node.js with npm, pnpm or yarn. If the project has no build step at all, use the CDN guide at https://primevue.dev/cdn instead.

Steps:
1. Install the library and a theme: npm install primevue @primeuix/themes.
2. Register the plugin in the app entry file. This is the step that is easy to skip, and without it components ship no styles: import PrimeVue from 'primevue/config'; import Aura from '@primeuix/themes/aura'; app.use(PrimeVue, { theme: { preset: Aura } });
3. Add the license key. v5 is published under the PrimeUI License, a Community/Commercial model, so pass license: 'PRIMEUI-LICENSE-KEY' in the same options object. If this project needs the MIT-licensed releases instead, pin the v4-stable npm tag.
4. Import components individually from their own paths, for example import Button from 'primevue/button', and confirm the app still builds. Optional: switch to auto imports with unplugin-vue-components and @primevue/auto-import-resolver (https://primevue.dev/autoimport/).
5. For forms, install the add-on with npm install @primevue/forms and use the Form component with a name-based state model and a resolver (https://primevue.dev/forms/). On Nuxt, install @primevue/nuxt-module instead of steps 2 and 4 (https://primevue.dev/nuxt).

Read the docs before guessing: appending .md to any docs URL returns Markdown (for example https://primevue.dev/vite.md), an MCP server is documented at https://primevue.dev/mcp/, and running samples live at https://github.com/primefaces/primevue-examples. Theming details, including the 16px base font size and the per-preset \`-compat\` variants for apps still on a 14px root, are at https://primevue.dev/theming/styled/.

Use only props, events and theme tokens documented on those pages. Note that v5 deprecated a number of v4 APIs (MultiSelect, Galleria, ColorPicker, Password, Chart, Editor and the @primevue/icons package among them) — the list is at https://primevue.dev/migration/v5/.`,
  pricing: {
    model: "freemium",
    summary: "PrimeVue 5 is free for individuals, nonprofits and companies under $1M revenue, 5 developers and 10 employees; larger organizations need a paid commercial license.",
    license: "PrimeUI License",
    source: "https://unpkg.com/primevue@5.0.2/LICENSE.md",
  },
} satisfies LibraryDetails;
