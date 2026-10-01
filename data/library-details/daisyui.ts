import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://daisyui.com/docs/",
  repoUrl: "https://github.com/saadeghi/daisyui",
  install: [
    { label: "npm", command: "npm i -D daisyui@latest" },
    { label: "pnpm", command: "pnpm add -D daisyui@latest" },
    { label: "yarn", command: "yarn add -D daisyui@latest" },
  ],
  gettingStarted: [
    "Prerequisites: Node.js and a project already running Tailwind CSS v4. daisyUI 5 is loaded as a Tailwind plugin, so Tailwind must be set up first.",
    "Install the package as a dev dependency: `npm i -D daisyui@latest`.",
    "In your main CSS file keep `@import \"tailwindcss\";` and add `@plugin \"daisyui\";` below it. There is no JavaScript config file.",
    "Use components as semantic classes in your markup, for example `<button class=\"btn btn-primary\">Save</button>`, then tweak them with normal Tailwind utilities such as `btn w-64 rounded-full`.",
    "Enable the themes you want with `@plugin \"daisyui\" { themes: light --default, dark --prefersdark, cupcake; }` and apply one via `data-theme=\"dark\"` on `<html>` or any nested element.",
  ],
  preview: {
    src: "https://img.daisyui.com/images/default.webp",
    alt: "daisyUI - Tailwind CSS Component Library",
  },
  agentPrompt: `Add daisyUI 5 to this existing project.

Prerequisites: Node.js installed, and the project already using Tailwind CSS v4 (daisyUI is a Tailwind plugin and does not work without Tailwind). This works for Vite, Next.js, Astro, SvelteKit, Vue or plain HTML, as long as Tailwind processes your CSS. If Tailwind v4 is missing, install it first and make sure your CSS file starts with @import "tailwindcss";.

Steps:
1. Install the package as a dev dependency: npm i -D daisyui@latest (use pnpm add -D daisyui@latest or yarn add -D daisyui@latest if this repo uses those).
2. In the CSS file that imports Tailwind, add @plugin "daisyui"; directly after the Tailwind import.
3. First usage: render a component in existing markup, for example <button class="btn btn-primary">Save</button>. Adjust it with Tailwind utilities, for example class="btn w-64 rounded-full".
4. Pick themes by adding a plugin block: @plugin "daisyui" { themes: light --default, dark --prefersdark, cupcake; }, then set data-theme="dark" on the <html> element (it can also be set on nested elements).
5. Rebuild or restart the dev server and confirm the component styles change.

Consult the official docs at https://daisyui.com/docs/ for your setup: install guides per framework at https://daisyui.com/docs/install/, component usage at https://daisyui.com/docs/use/, and theme config at https://daisyui.com/docs/config/. Use only class names documented there, since component classes and theme options change between major versions.`,
  pricing: {
    model: "freemium",
    summary: "The component library is free and open source; store templates, the Figma library and the Blueprint MCP server are paid extras.",
    license: "MIT",
    source: "https://daisyui.com",
  },
} satisfies LibraryDetails;
