import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://animejs.com/documentation",
  repoUrl: "https://github.com/juliangarnier/anime",
  install: [
    { label: "npm", command: "npm install animejs" },
    { label: "pnpm", command: "pnpm add animejs" },
    { label: "yarn", command: "yarn add animejs" },
  ],
  gettingStarted: [
    "Run `npm install animejs`. The package is ESM-first and ships TypeScript types, so no build config is needed for Vite, esbuild or Next.js. It also works straight from a CDN with no build step: `import { animate } from \"https://esm.sh/animejs\"` or the UMD bundle at `https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js`.",
    "Import the methods you need as named exports: `import { animate, stagger } from \"animejs\";`. For tighter tree shaking, import from a subpath instead, such as `import { animate } from \"animejs/animation\"`, `import { createTimeline } from \"animejs/timeline\"`, `import { stagger } from \"animejs/utils\"` or `import { spring } from \"animejs/easings/spring\"`.",
    "Animate an element: `animate(\".square\", { x: 320, rotate: { from: -180 }, duration: 1250, delay: stagger(65, { from: \"center\" }), ease: \"inOutQuint\" });`. Targets accept CSS selectors, elements, arrays and plain JavaScript objects.",
    "Sequence work with `createTimeline({ defaults: { duration: 750 } })` and chain `.add(\".square\", { x: \"15rem\" }, 500)`, `.label(\"start\")`, `.call(fn)` and `.sync(otherTimeline)`. The position argument takes a label, an absolute number or a relative offset such as `\"<-=500\"`.",
    "There is no official React wrapper. The docs show combining `useEffect()` with `createScope({ root })`, then calling `scope.current.revert()` in the cleanup so every instance is torn down on unmount. The community `react-animejs` package is v0.5.6 from 2022 and targets the v3 API, so do not use it.",
  ],
  preview: {
    src: "https://animejs.com/media/pages/documentation/c5370b24f4-1787698628/generated-og-image.en.png",
    alt: "Open Graph preview image for the Anime.js documentation page",
  },
  agentPrompt: `Help me use Anime.js (https://animejs.com/documentation), a fast, multipurpose JavaScript animation
engine, in this existing project. The npm package is \`animejs\` and the current API is v4: ESM-first and named-export
only. The v3 default export and \`anime.timeline()\` no longer exist.

Prerequisites:
- A JavaScript or TypeScript project bundled by Vite, Next.js, esbuild or webpack. No extra build config is needed;
  the package ships ESM, CJS and UMD builds plus TypeScript types.
- Migrating from v3? Read the official guide at
  https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4 before touching existing code.
- There is no official React wrapper. Do not install the community \`react-animejs\` package: it is v0.5.6 from 2022 and
  targets the v3 API. In React, follow the official \`useEffect()\` + \`createScope()\` pattern at
  https://animejs.com/documentation/getting-started/using-with-react.

Steps:
1. Install the package with \`npm install animejs\` (alternatives: \`pnpm add animejs\`, \`yarn add animejs\`).
2. In the file that owns the UI, import the methods you need: \`import { animate, stagger } from "animejs";\`. For finer
   tree shaking, import from a subpath instead, e.g. \`import { animate } from "animejs/animation";\` or
   \`import { createTimeline } from "animejs/timeline";\`. The full subpath list is at
   https://animejs.com/documentation/getting-started/module-imports.
3. Add one first animation against an element that already exists:
   \`animate(".hero-title", { x: 320, duration: 1250, ease: "inOutQuint" });\` and confirm it plays on the existing dev
   server. Targets accept CSS selectors, elements, arrays and plain JavaScript objects.
4. To sequence work, build a timeline with \`createTimeline({ defaults: { duration: 750 } })\` and chain
   \`.add(".square", { x: "15rem" }, 500)\`, \`.label("start")\`, \`.call(fn)\` and \`.sync(otherTimeline)\`. The position
   argument takes a label, an absolute number, or a relative offset such as \`"<-=500"\`.
5. In React, create every instance inside a \`createScope({ root })\` callback registered in \`useEffect\`, and call
   \`scope.current.revert()\` in the cleanup function so nothing leaks on unmount. Expose handlers to event code with
   \`self.add("name", fn)\` and invoke them via \`scope.current.methods.name()\`. In Next.js App Router, add
   \`"use client"\` to any file that runs Anime.js.
6. Keep the project's existing styling, TypeScript setup and build tooling. Do not add a second animation library for
   work Anime.js already covers (it ships timelines, \`stagger()\`, \`spring()\`, \`createDraggable()\`, \`createLayout()\`,
   \`splitText()\` and a WAAPI adapter).

Read the official docs before writing code: animation parameters and keyframes (https://animejs.com/documentation/animation),
timelines (https://animejs.com/documentation/timeline), draggable (https://animejs.com/documentation/draggable) and
easings including \`spring()\` (https://animejs.com/documentation/easings). Use only APIs documented there.`,
  pricing: {
    model: "free",
    summary: "Anime.js is completely free and funded by sponsors, with no paid tiers or features.",
    license: "MIT",
    source: "https://github.com/juliangarnier/anime/blob/master/LICENSE.md",
  },
} satisfies LibraryDetails;
