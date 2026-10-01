import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://lucide.dev",
  repoUrl: "https://github.com/lucide-icons/lucide",
  install: [
    { label: "React", command: "npm install lucide-react" },
    { label: "Vanilla JavaScript", command: "npm install lucide" },
    { label: "Vue", command: "npm install @lucide/vue" },
    { label: "Svelte", command: "npm install @lucide/svelte" },
    { label: "Angular", command: "npm install @lucide/angular" },
    { label: "Static SVG, sprite and icon font", command: "npm install lucide-static" },
  ],
  gettingStarted: [
    "Install the package for your framework. React uses `lucide-react`, vanilla JavaScript uses `lucide`, Vue uses `@lucide/vue`, Svelte uses `@lucide/svelte`, Angular uses `@lucide/angular`. Full list at https://lucide.dev/guide/installation.",
    "Import each icon as a component and render it: `import { Camera } from 'lucide-react';` then `const App = () => <Camera />;`. The packages are ES modules, so only the icons you import survive tree-shaking.",
    "Adjust appearance with props: `size` (number, default 24), `color` (string, default currentColor), `strokeWidth` (number, default 2) and `nonScalingStroke` (boolean, default false). Example: `<Camera size={48} color=\"red\" strokeWidth={1} />`. All standard SVG attributes are accepted as props too.",
    "Find icons by name at https://lucide.dev/icons and copy the exact export. Icon names are PascalCase, so the `alarm-clock-check` icon is imported as `AlarmClockCheck`.",
    "Outside a framework, install `lucide-static` for individual SVG files, an SVG sprite, icon fonts, or SVG strings for Node.js. A CDN build is also available via unpkg, but the docs recommend pinning a version instead of using `@latest`.",
  ],
  preview: {
    src: "https://lucide.dev/og.png",
    alt: "Lucide icon library home page preview",
  },
  agentPrompt: `Add Lucide (https://lucide.dev), an open-source SVG icon library, to this existing project.

Prerequisites:
- Node.js and a package manager. Lucide is version 1.x, published as ES modules and tree-shakable.
- Pick the package for this project's framework: lucide-react (React), lucide (vanilla JavaScript), @lucide/vue (Vue), @lucide/svelte (Svelte, Svelte 5 only), @lucide/angular (Angular), lucide-solid (Solid), @lucide/astro (Astro), lucide-preact (Preact), or lucide-react-native (React Native).
- Do not install lucide-icon-node. That package no longer exists on npm and returns 404.

Steps:
1. Read the official docs at https://lucide.dev. Every page has a Markdown version by appending .md (for example https://lucide.dev/guide/react/getting-started.md), https://lucide.dev/llms.txt is a full table of contents, and https://lucide.dev/llms-full.txt is the complete documentation bundle. Use these instead of guessing, since package names changed recently.
2. Install the matching package from the project root, for example npm install lucide-react for React or npm install @lucide/vue for Vue. Confirm the exact command at https://lucide.dev/guide/installation.
3. Import icons individually and render them. In React: import { Camera } from 'lucide-react'; then const App = () => <Camera />;. Look up the correct export name at https://lucide.dev/icons, since names are PascalCase and must match exactly.
4. Style icons with props: size (number, default 24), color (string, default currentColor), strokeWidth (number, default 2) and nonScalingStroke (boolean, default false). All standard SVG presentation attributes also work as props, so className, aria-label and other accessibility attributes pass straight through.
5. Verify the setup by confirming the build succeeds and that only the imported icons appear in the bundle. Do not use a wildcard import: in vanilla JavaScript, passing the full icons object to createIcons({ icons }) imports every icon, whereas passing only the icons you need keeps the bundle small.

Notes:
- Dynamic usage exists (import { DynamicIcon } from 'lucide-react/dynamic' and pass a name) but the docs list the caveats: every icon is imported at build time, a module is created per icon, and you can see loading flashes. Prefer direct imports for static UI.
- For non-framework use, install lucide-static to get individual SVG files, an SVG sprite, icon fonts, or SVG strings for Node.js. The sprite includes every icon, so the docs warn against it for high-traffic production.
- Icons are decorative by default. For standalone icons that convey meaning, add an accessible label such as aria-label plus role="img", and for icons paired with visible text, mark them aria-hidden="true" to avoid duplicate announcements. See https://lucide.dev/how-to/accessibility.`,
  pricing: {
    model: "free",
    summary: "Every icon and package is free and open source, with no paid tier.",
    license: "ISC",
    source: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
