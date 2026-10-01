import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://dotlottie.io",
  repoUrl: "https://github.com/LottieFiles/dotlottie-web",
  install: [
    { label: "React player", command: "npm install @lottiefiles/dotlottie-react" },
    { label: "JavaScript player (no framework)", command: "npm install @lottiefiles/dotlottie-web" },
    { label: "Vue 3 player", command: "npm install @lottiefiles/dotlottie-vue" },
    { label: "Svelte / SvelteKit player", command: "npm install @lottiefiles/dotlottie-svelte" },
  ],
  gettingStarted: [
    "Pick the player that matches the stack. The official distribution table at https://docs.lottiefiles.com/en/runtimes/distributions lists @lottiefiles/dotlottie-web for vanilla JS, @lottiefiles/dotlottie-react for React, @lottiefiles/dotlottie-vue for Vue 3, @lottiefiles/dotlottie-svelte for Svelte, and @lottiefiles/dotlottie-wc for plain HTML pages. Mobile and desktop players exist too: Android via Gradle, iOS via Swift Package Manager, Flutter, and React Native.",
    "Install the package for your stack with npm, for example `npm install @lottiefiles/dotlottie-react`. There is no build step required: without a bundler you can load the core player from a CDN with `import { DotLottie } from \"https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm\"` inside a `<script type=\"module\">` tag.",
    "Render an animation. In React, import { DotLottieReact } from \"@lottiefiles/dotlottie-react\" and drop in `<DotLottieReact src=\"https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie\" loop autoplay />`. The vanilla player instead draws onto a `<canvas>` you pass as the `canvas` option to `new DotLottie({ ... })`.",
    "Point `src` at your own file. Both raw Lottie JSON (`.json`) and dotLottie (`.lottie`) URLs work, so you can migrate one animation at a time. Convert JSON to `.lottie` with the LottieFiles converter at https://lottiefiles.com/tools/lottie-to-dotlottie or the dotlottie-io Rust library.",
    "Then use the container features. A `.lottie` file is a ZIP holding `manifest.json`, animations in `a/`, assets in `i/`, themes in `t/`, and state machines in `s/`; set `animationId` and `themeId` to pick one from a multi-animation file, and `stateMachineId` to make it interactive. Full prop lists are at https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/props-reference and https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference.",
  ],
  preview: {
    src: "https://static.lottiefiles.com/static_uploads/dot_lottie_og_1.png",
    alt: "dotLottie home page preview",
  },
  agentPrompt: `Add dotLottie animation playback to this existing project.

dotLottie (https://dotlottie.io) is an open container format by LottieFiles for shipping Lottie animations. A .lottie file is a ZIP archive (MIME type application/zip+dotlottie) containing a manifest.json, the Lottie JSON animations in a/, image assets in i/, themes in t/ and state machines in s/. Compared with raw Lottie JSON it bundles assets instead of inlining them as Base64 data URIs, compresses them with Deflate, can hold several animations in one file, and supports runtime theming and state-machine interactivity. The players render .lottie files and plain Lottie JSON, so nothing has to be converted to start.

Prerequisites:
- A React, Vue 3, Svelte, or plain bundler-based JavaScript project. Node.js and npm installed. React 16.8 or higher is required for the React player.
- An animation file or URL. A .json or .lottie URL is enough to get running; convert existing JSON with https://lottiefiles.com/tools/lottie-to-dotlottie.

Steps:
1. Read the docs instead of guessing. The format site is https://dotlottie.io and the player documentation lives at https://docs.lottiefiles.com/en/runtimes/distributions, which lists every supported package. https://docs.lottiefiles.com/llms.txt indexes the whole site, and any page has a plain-text version by appending .md to its URL, for example https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x.md.
2. Install the one player that matches this project, not all of them: npm install @lottiefiles/dotlottie-react for React, npm install @lottiefiles/dotlottie-web for vanilla JS, npm install @lottiefiles/dotlottie-vue for Vue 3, or npm install @lottiefiles/dotlottie-svelte for Svelte.
3. Add the first player to an existing view. In React, import { DotLottieReact } from "@lottiefiles/dotlottie-react" and render <DotLottieReact src="<animation-url>" loop autoplay />. In vanilla JS, pass a <canvas> element as the canvas option to new DotLottie({ canvas, src, autoplay: true, loop: true }).
4. Confirm it plays, then tune it: check autoplay, loop, speed, mode, playOnHover, and the layout object (fit and align) for sizing, then confirm the app still builds. The React component accepts every HTMLCanvasElement prop, so canvas styling works without extra code.
5. Only then adopt container-specific features. Set animationId to select one animation from a multi-animation file, themeId or themeData to swap colors and tokens at runtime for dark mode or branding, and stateMachineId to load interactive behavior. Do not add these unless the animation file actually ships them. For heavy or off-screen animations, the same packages also export GPU and worker builds (for example @lottiefiles/dotlottie-react/webgl, @lottiefiles/dotlottie-react/webgpu, and DotLottieWorkerReact) — check the GPU rendering guide before switching.

Use only packages, props and methods documented on https://docs.lottiefiles.com, and prefer the current v0.x docs pages. Keep the animation as a .lottie or .json URL rather than inlining large JSON, since the format exists to avoid that.`,
  pricing: {
    model: "free",
    summary: "dotLottie is a free, open-source animation format and tooling; LottieFiles sells separate products that are not needed to use it.",
    license: "MIT",
    source: "https://dotlottie.io",
  },
} satisfies LibraryDetails;
