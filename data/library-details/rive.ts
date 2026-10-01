import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://rive.app/docs",
  repoUrl: "https://github.com/rive-app/rive-wasm",
  install: [
    { label: "Web (JavaScript, recommended renderer)", command: "npm install @rive-app/webgl2" },
    { label: "Web (JavaScript, Canvas2D renderer)", command: "npm install @rive-app/canvas" },
    { label: "React (recommended renderer)", command: "npm i --save @rive-app/react-webgl2" },
    { label: "React (Canvas2D renderer)", command: "npm i --save @rive-app/react-canvas" },
  ],
  gettingStarted: [
    "Rive is a design-and-runtime platform, not an npm animation library: you author vector art, timelines, state machines and data binding in the Rive Editor, then export a single `.riv` file that the runtime plays. There is no package that ships animations, so you need a `.riv` file before any code runs.",
    "Create a free account at https://rive.app, open a file in the editor at https://rive.app/editor, and export it. The runtime needs the artboard, state machine, and view model names exactly as authored, because you reference them by string in code.",
    "Install the runtime for your stack. For a React app run `npm i --save @rive-app/react-webgl2`; for plain JavaScript run `npm install @rive-app/webgl2`. The official guide recommends the WebGL2 packages because they draw with the same Rive Renderer as the editor. Use the Canvas2D packages (`@rive-app/canvas`, `@rive-app/react-canvas`) when you have many instances on one page, want a smaller bundle, or do not need Rive Renderer-only features such as Vector Feathering.",
    "Serve the `.riv` file like any other static asset, then point the runtime at it. The docs use `src: \"https://cdn.rive.app/animations/vehicles.riv\"`, but a local path in your public directory works the same way, and the `buffer` and `rivFile` parameters let you load an `ArrayBuffer` or reuse one parsed file across many instances.",
    "Play it: call `useRive({ src, stateMachine, autoplay: true, autoBind: true })` in React, or `new rive.Rive({ src, canvas, stateMachine, autoplay: true, autoBind: true })` in JavaScript. Always call `riveInstance.cleanup()` when the instance unmounts, since the runtime allocates native objects that are otherwise leaked.",
  ],
  preview: {
    src: "https://rive.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3D%2B%26title%3DIntroduction%26description%3DRive%2Bis%2Bwhere%2Bdesigners%252C%2Banimators%252C%2Band%2Bdevelopers%2Bbuild%2Binteractive%2Bexperiences.%2BDesign%252C%2Banimate%252C%2Band%2Bcode%2Bin%2Bone%2Bplace.%2BWhat%2Byou%2Bbuild%2Bin%2Bthe%2Beditor%2Bis%2Bwhat%2Bs%26theme%3D1a37e01e6f4d1e0c93d0da82&w=1200&q=100",
    alt: "Rive documentation social preview",
  },
  agentPrompt: `Add Rive to this existing project.

Rive (https://rive.app) is a design-and-runtime platform for interactive animation. Designs are authored in the Rive Editor and exported as a single \`.riv\` file, which the open source runtimes then render. The npm packages are runtimes only: they contain no animations, so do not look for a component library to import.

Prerequisites:
- The project runs a web or React app with Node.js and a package manager.
- I have a \`.riv\` file, or I can prototype with the public sample at https://cdn.rive.app/animations/vehicles.riv. Ask me which file to use and what its artboard, state machine and view model names are; they must match the strings in the file exactly.
- Pick the package before installing: \`@rive-app/webgl2\` (JavaScript) and \`@rive-app/react-webgl2\` (React) are the recommended defaults because they draw with the Rive Renderer, the same renderer as the editor. \`@rive-app/canvas\` and \`@rive-app/react-canvas\` draw with the browser's Canvas2D API instead: pick those if the page has many Rive instances, the bundle size matters, or the file avoids Rive Renderer-only features such as Vector Feathering. The packages share one API, so switching is a one-line import change.

Steps:
1. Read the official docs at https://rive.app/docs before writing code. The pages that matter here are https://rive.app/docs/runtimes/choose-a-renderer/overview (choosing a package), https://rive.app/docs/runtimes/web/canvas-vs-webgl (renderer tradeoffs) and https://rive.app/docs/runtimes/web/web-js or https://rive.app/docs/runtimes/react/react (the quick start). Use those instead of guessing, because the recommended package changed after the deprecation of \`@rive-app/webgl\`, which receives no updates after v2.37.0.
2. Install the runtime: \`npm install @rive-app/webgl2\` for plain JavaScript, or \`npm i --save @rive-app/react-webgl2\` for React. If the project must avoid a separate WASM request, \`@rive-app/canvas-single\` bundles rive.wasm into the JavaScript at the cost of a larger bundle; \`@rive-app/canvas-lite\` is the smallest option and drops the text, layout, audio and scripting engines.
3. Put the \`.riv\` file in the project's public or assets directory and treat it as a static asset, the same as an image or a font. Pass its path as \`src\`. When several instances share one file, load it once and pass the parsed object via \`rivFile\`, or an \`ArrayBuffer\` via \`buffer\`, to avoid refetching and reparsing it.
4. Render it. In React, use the hooks when I need runtime control: \`const { rive, RiveComponent } = useRive({ src, stateMachine: "State Machine 1", autoplay: true, autoBind: true })\`, then return \`<RiveComponent />\`. The default \`<Rive />\` component is for simple embeds only. In JavaScript, construct \`new rive.Rive({ src, canvas, stateMachine, autoplay: true, autoBind: true, onLoad: () => r.resizeDrawingSurfaceToCanvas() })\`. Keep \`autoBind: true\` so the file's default view model instance binds, and set the exact state machine name: without it the runtime may play only the first linear animation it finds.
5. Wire up lifecycle and layout. In React the canvas sizes itself from its container, so give the parent element a defined width and height if nothing appears. In JavaScript call \`resizeDrawingSurfaceToCanvas()\` inside \`onLoad\` and again on window resize, otherwise the render surface mismatches the element and looks blurry on high-DPI displays. Always call \`riveInstance.cleanup()\` on unmount.
6. Verify in the app, not just in the editor. State machines respond to inputs such as booleans, numbers, triggers and strings, and data binding exposes the file's view model fields through hooks like \`useViewModelInstanceNumber\`. Re-run the project's type check and build afterwards to confirm nothing regressed.

Use only parameters and hooks documented on https://rive.app/docs, and check the docs for anything the sample does not show. The runtime source is public and MIT licensed at https://github.com/rive-app/rive-wasm, which is the place to check behavior when a detail is undocumented.`,
  pricing: {
    model: "freemium",
    summary: "The runtimes are open source and the editor has a free plan with a Rive splash screen and a file limit; paid plans remove both.",
    license: "MIT (runtimes)",
    source: "https://rive.app/pricing",
  },
} satisfies LibraryDetails;
