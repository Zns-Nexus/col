import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://github.com/danielwh2/drawably#readme",
  repoUrl: "https://github.com/danielwh2/drawably",
  install: [
    { label: "npm", command: "npm i drawably" },
  ],
  gettingStarted: [
    "Install the package with `npm i drawably`. It has zero runtime dependencies, and React is an optional peer (`>=18 <20`) that is only needed for the wrappers. The README at https://github.com/danielwh2/drawably#readme covers every control and option.",
    "Import the stylesheet once with `import \"drawably/style.css\";`. Then attach a sketch to a real element in vanilla JavaScript: `import { drawablyButton } from \"drawably\"; drawablyButton(document.querySelector(\"#done\"), { variant: \"solid\" });`.",
    "In React, import the matching component from the `drawably/react` subpath: `import { DrawablyButton } from \"drawably/react\";` then `<DrawablyButton variant=\"solid\" state=\"loading\">Save</DrawablyButton>`. Buttons accept `variant` (`outline`, `solid`, `scribble`), `tone` (`neutral`, `danger`), and `state` (`idle`, `loading`, `error`, `success`).",
    "Controls other than buttons expect a wrapper that contains the real field, for example `drawablyCheckbox` needs a wrapper with an `<input type=\"checkbox\">`. The native input stays in the DOM, so keyboard, forms and screen readers keep working.",
    "Theme with CSS custom properties such as `--drawably-stroke` and `--drawably-fill`, and tune each sketch with the `seed`, `roughness`, `boil` and `width` options. Try combinations on the picker at https://www.drawably.dev before choosing.",
  ],
  agentPrompt: `Add Drawably (https://www.drawably.dev), a zero-dependency set of hand-drawn UI controls, to this existing project.

Drawably draws a seeded pen sketch as SVG behind real HTML controls. The stroke boils through three frames cycled in CSS, and the native input stays in the DOM. It ships a vanilla API and React wrappers.

Prerequisites:
- Confirm the project uses a bundler or framework that can import CSS from a package. React wrappers need React 18 or 19.
- Decide where the sketch style fits. It is a deliberate hand-drawn look, so apply it to one surface at a time, not to every control in an existing design system.

Steps:
1. Read https://github.com/danielwh2/drawably#readme. After installing, the full agent guide ships in the package as drawably/agent.md.
2. Install with npm i drawably (or the project's package manager equivalent).
3. Import drawably/style.css once at the app root.
4. In React, import from drawably/react, for example import { DrawablyButton, DrawablyCheckbox, DrawablyInput } from "drawably/react". In plain JavaScript, import the attach functions from drawably, such as drawablyButton(el, { variant: "solid" }), and call the returned handle's destroy() when the element unmounts.
5. For checkbox, radio, toggle, input, textarea and select, give the control a wrapper element that contains the real field. Pass the wrapper to the attach function.
6. Theme through the CSS custom properties --drawably-stroke, --drawably-fill, --drawably-paper and --drawably-width instead of editing the generated SVG paths. Use the seed option when a stable, reproducible sketch is needed, for example in snapshot tests.
7. Run the project's typecheck and build, then check the controls with keyboard-only navigation and with prefers-reduced-motion enabled.

Notes:
- Do not imitate the style with CSS borders. Attach to a real button, wrapper, hr, ul or inline text element.
- Annotation helpers (drawablyUnderline, drawablyHighlight, drawablyCircle, drawablyArrow) are for one word or a short phrase. The arrow is appended to the body and drifts if its anchors sit in a scrolling container.
- The optional Drawably Pen font loads only through import "drawably/font.css". Without it, labels use Inter when the page loads it and system-ui otherwise.
- There are no Vue or Svelte adapters. Use the vanilla API there.
- Select options are measured once at attach, so re-attach if they change. In Chromium the options popup is sketched, while Safari and Firefox show the OS popup.`,
  pricing: {
    model: "free",
    summary: "The package is free and open source under the MIT license, with no paid tier.",
    license: "MIT",
    source: "https://github.com/danielwh2/drawably/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
