import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://bencho.dev",
  install: [
    { label: "Deps for a block that needs them", command: "npm i framer-motion lucide-react" },
    { label: "Plus the liquid merge effect, on some blocks", command: "npm i liquid-gooey" },
  ],
  gettingStarted: [
    "Prerequisites: an existing React + TypeScript project. Bencho has no CLI, no npm package and no shadcn registry, and the npm package named `bencho` is an unrelated benchmarking CLI — do not install it. Blocks are copied source, MIT licensed (https://bencho.dev/licence).",
    "Browse the bench at https://bencho.dev and open a block, for example https://bencho.dev/blocks/slide-confirm. Every block is live in the page, and the panel lets you move its controls and see the result immediately.",
    "Open the Code tab. It has two panes: Usage gives you the JSX with your current control values, and CSS gives you the block's stylesheet. Press Copy on either one.",
    "Press Copy prompt instead. It hands your agent a self-contained brief with the full .tsx and CSS inline, so you do not have to paste two separate files.",
    "The CSS reads Bencho's design tokens and does not define them. Map each custom property to whatever your project already uses for the same job, or define it locally on the component root so nothing leaks out.",
  ],
  preview: {
    src: "https://bencho.dev/share-cover-orbit.png",
    alt: "Bencho home page preview showing the orbit of interactive UI blocks",
  },
  agentPrompt: `Add a Bencho block (https://bencho.dev) to this existing React + TypeScript project.

Bencho is a library of interactive UI blocks you can press, drag and retune in the page, then take the code for. There is nothing to install from Bencho itself: no CLI, no npm package, no registry. You copy the block's source into this repo and it becomes mine to edit. The blocks are MIT licensed — see https://bencho.dev/licence.

Prerequisites:
- React + TypeScript. Do not install a "bencho" package; the package on npm with that name is an unrelated benchmarking tool.
- Real npm dependencies of the blocks, which I will list per block: framer-motion, lucide-react, and liquid-gooey for the liquid merge blocks.

Steps:
1. Read the official site at https://bencho.dev. Open the block I name and use the Code tab there, which has a Usage pane (JSX with the current control values) and a CSS pane. Do not guess block APIs from memory.
2. Ask me which block I want, then open it on https://bencho.dev and set the controls in its panel first, so the code I copy already has the values I chose.
3. Better: press Copy prompt on the block page. It generates the whole brief for that block, with the full .tsx and CSS inline and the steps already written. Use it as the source of truth and follow it.
4. Install what that block needs with npm i framer-motion lucide-react, adding liquid-gooey only if the block uses the liquid merge effect. Several blocks need nothing beyond React.
5. Create the component at a sensible path in this project, named after the block (for example SlideConfirm, GlassDock, Notify), from the copied source.
6. Add the block's CSS to this project's stylesheet.
7. THE PART THAT NEEDS JUDGEMENT: the CSS reads custom properties and does not define them. Map each one to whatever this project already uses for the same job — its own ink, ground, surface and UI font — rather than defining them as new globals. If the project has no equivalent, define it locally on the component's own root so nothing leaks out. Anything ending in -rgb wants three bare numbers, because the CSS builds rgba() from it.
8. Some blocks ship stub images (the copy names them, for example AVATARS, COVER, MARKS, SHOTS). Bencho's own pictures are not licensed to travel, so point them at this project's images or leave the placeholder and tell me.
9. Confirm the app still builds and the block behaves as it did on the site.

Keep the comments. They say why the numbers are what they are, and they are most of what makes this worth copying rather than rewriting.`,
  pricing: {
    model: "free",
    summary: "The blocks are free to copy, with no paid tier.",
    license: "MIT",
    source: "https://bencho.dev/licence",
  },
} satisfies LibraryDetails;
