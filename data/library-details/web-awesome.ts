import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://webawesome.com/docs",
  repoUrl: "https://github.com/shoelace-style/webawesome",
  preview: {
    src: "https://webawesome.com/assets/images/open-graph/default.png",
    alt: "Web Awesome Core official preview",
  },
  install: [
    { label: "npm", command: "npm install @awesome.me/webawesome" },
    { label: "pnpm", command: "pnpm add @awesome.me/webawesome" },
    { label: "Download for self-hosting", command: "npm pack @awesome.me/webawesome" },
  ],
  gettingStarted: [
    "Install `@awesome.me/webawesome`, or follow the CDN setup at https://webawesome.com/docs for a plain HTML site. The core library is MIT-licensed; components marked Pro are separate paid features.",
    "With a bundler, import `@awesome.me/webawesome/dist/styles/webawesome.css`, then register only the custom elements you use, for example `@awesome.me/webawesome/dist/components/button/button.js`.",
    "Render the registered custom element as `<wa-button>`. Framework-specific property, event, and SSR setup is documented at https://webawesome.com/docs/frameworks/.",
    "React 19 supports custom elements directly. TypeScript apps should add the supplied custom-element JSX declarations following the React guide. React 18 and earlier can use individual wrappers such as `@awesome.me/webawesome/dist/react/button/index.js`.",
    "When self-hosting assets, configure their base path using the documented setBasePath API or data-webawesome attribute. Use dist with a bundler and dist-cdn for directly hosted browser modules.",
  ],
  agentPrompt: `Add Web Awesome Core (https://webawesome.com) to this existing web project.

Web Awesome Core provides MIT-licensed custom elements and themes. It works in plain HTML and has framework guides for React, Vue, Angular, and Svelte.

Prerequisites:
- Identify the framework, bundler, server-rendering strategy, global stylesheet, and asset hosting setup.

Steps:
1. Read https://webawesome.com/docs and the matching framework guide. Choose components from the Core catalog; Pro features require a separate license.
2. Install npm install @awesome.me/webawesome, or follow the documented CDN approach for a project without a bundler. Do not combine both loading methods.
3. Import @awesome.me/webawesome/dist/styles/webawesome.css and each requested custom-element module, such as @awesome.me/webawesome/dist/components/button/button.js. Render the registered wa-button element.
4. In React 19, use native custom elements and the documented JSX type declarations. For React 18 or earlier, use the per-component wrappers, such as @awesome.me/webawesome/dist/react/button/index.js. Follow the framework guide for custom events and typed element properties.
5. Keep browser-only registration inside the appropriate client integration for the app's SSR framework. If self-hosting assets, configure their base path; use dist for bundled imports and dist-cdn for direct browser modules.
6. Apply the existing project's theme and typed state, preserve form and accessibility behavior, then run typecheck and build.

Import only needed components. Keep paid Pro components separate from the open source Core setup.`,
  pricing: {
    model: "freemium",
    summary: "Web Awesome Core is free under MIT; Pro adds paid components, themes, patterns, and design assets.",
    license: "MIT (Core)",
    source: "https://webawesome.com/license/",
  },
} satisfies LibraryDetails;
