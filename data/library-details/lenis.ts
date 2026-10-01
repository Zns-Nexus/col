import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://lenis.dev",
  repoUrl: "https://github.com/darkroomengineering/lenis",
  install: [
    { label: "npm", command: "npm i lenis" },
    { label: "pnpm", command: "pnpm add lenis" },
    { label: "yarn", command: "yarn add lenis" },
  ],
  gettingStarted: [
    "Install the single package with `npm i lenis` and import it: `import Lenis from 'lenis';`. The current release is 1.3.26. It is ESM-only, has zero runtime dependencies, ships its own TypeScript types, and is MIT licensed. The former `@studio-freight/lenis` name is deprecated on npm and points to this package.",
    "Add the stylesheet Lenis requires, once at your app entry: `import 'lenis/dist/lenis.css';` (or link `https://unpkg.com/lenis@1.3.26/dist/lenis.css` if you are using the script tag). It sets `html.lenis, html.lenis body { height: auto; }`, `.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }`, `overscroll-behavior: contain` on the `[data-lenis-prevent]`, `[data-lenis-prevent-wheel]`, `[data-lenis-prevent-touch]`, `[data-lenis-prevent-vertical]` and `[data-lenis-prevent-horizontal]` attributes, `.lenis.lenis-smooth iframe { pointer-events: none; }`, and a `.lenis-autoToggle` block using `transition-behavior: allow-discrete`. The official troubleshooting list names the missing CSS as the first thing to check when smooth scroll misbehaves.",
    "Create the instance and drive the loop: `const lenis = new Lenis({ autoRaf: true });`. `autoRaf: true` lets Lenis run its own `requestAnimationFrame` loop. If another library already owns the loop, drop the option and call `lenis.raf(time)` from your loop instead. Subscribe with `lenis.on('scroll', (lenis) => {})`, or read the `scroll`, `progress`, `velocity` and `isScrolling` properties.",
    "In React, install the same `lenis` package and import the subpath adapter: `import { ReactLenis, useLenis } from 'lenis/react';`. There is no separate React package; `react >= 17` is an optional peer dependency. Render `<ReactLenis root options={{ autoRaf: true }} />` once near the root and read the instance with `useLenis()`. Vue and Nuxt use `lenis/vue` and `lenis/nuxt` the same way.",
    "Turn on the behaviour you actually need: `anchors` defaults to `false`, so in-page anchor links only scroll once you pass `anchors: true`. Add `data-lenis-prevent` to modals and scrollable panels (or set `allowNestedScroll: true`, which checks the DOM on every scroll event) so their wheel and touch input is not smoothed, and call `lenis.stop()` / `lenis.start()` to lock and release page scroll behind a dialog. `respectReducedMotion` is `true` by default.",
  ],
  preview: {
    src: "https://lenis.dev/og.png",
    alt: "Lenis — Smooth Scroll",
  },
  agentPrompt: `Help me add Lenis (https://lenis.dev), the smooth scroll library, to this existing project.

Lenis wraps the browser's own scroll and interpolates the position in a requestAnimationFrame loop, so position: sticky, native scrollbars, keyboard scrolling and anchor links keep working. It intercepts wheel and touch input, which means it needs its stylesheet and explicit configuration for modals and nested scrollers.

Prerequisites:
- This runs in the browser only. Do not instantiate it during server rendering; in the Next.js App Router, mount it from a client component.
- Confirm the page is actually scrollable without Lenis first. Lenis smooths an existing scroll container, it does not create one.
- Check whether another library already drives a scroll or animation loop (GSAP ScrollTrigger, Framer Motion, Lottie, react-three-fiber), because the loop has to be shared, not duplicated.

Steps:
1. Install the one package from the project root with \`npm i lenis\` (or \`pnpm add lenis\`). Current release is 1.3.26, ESM only, zero dependencies, ships its own types. The React adapter is a subpath of this same package, \`lenis/react\`, not a separate install; Vue and Nuxt are \`lenis/vue\` and \`lenis/nuxt\`. Do not install \`@studio-freight/lenis\`, it is the deprecated former name.
2. Add the stylesheet once at the app entry: \`import 'lenis/dist/lenis.css'\`. This is required, not cosmetic; the official troubleshooting list names the missing CSS as the first thing to check when smooth scroll misbehaves. It contains \`html.lenis, html.lenis body { height: auto; }\`, \`.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }\`, \`overscroll-behavior: contain\` on the \`[data-lenis-prevent]\` attributes and their \`-wheel\`, \`-touch\`, \`-vertical\` and \`-horizontal\` variants, \`.lenis.lenis-smooth iframe { pointer-events: none; }\`, plus a \`.lenis-autoToggle\` block using \`transition-behavior: allow-discrete\`. Import the shipped file rather than hand-writing these rules.
3. Vanilla setup: \`import Lenis from 'lenis'\` then \`const lenis = new Lenis({ autoRaf: true })\`. \`autoRaf: true\` runs Lenis' own requestAnimationFrame loop. If another library owns the loop, construct with \`autoRaf: false\` and call \`lenis.raf(time)\` from it, converting units where needed: GSAP's ticker reports seconds, so pass \`time * 1000\`, and call \`gsap.ticker.lagSmoothing(0)\` alongside \`lenis.on('scroll', ScrollTrigger.update)\` for the documented GSAP setup. Otherwise nothing will scroll smoothly, which is the most common symptom.
4. React setup: render \`<ReactLenis root options={{ autoRaf: true }} />\` once, high in the tree, and get the instance from any component below it with \`useLenis()\`. Pass a ref when you need \`raf\`, \`stop\`, \`start\` or \`scrollTo\` from outside the provider subtree. The \`root\` prop makes the instance globally reachable and uses the default \`<html>\` scroll container.
5. Handle the input-hijacking and accessibility details deliberately. Mark every modal and scrollable panel with \`data-lenis-prevent\` (or set \`allowNestedScroll: true\`, which walks the DOM on every scroll event) so their wheel and touch input is not smoothed, and call \`lenis.stop()\` / \`lenis.start()\` around dialogs. Anchor links do nothing until you pass \`anchors: true\`. Leave \`respectReducedMotion\` at its default of \`true\`: the README documents that with \`prefers-reduced-motion: reduce\` active, Lenis forces \`lerp\` to 1 so the scroll tracks the input device 1:1, makes \`scrollTo\` jumps instant, and still runs its loop so WebGL and DOM sync stays intact. Only set it to \`false\` if the design genuinely requires smoothing for those users, and gate the project's own scroll animations on \`lenis.prefersReducedMotion\` as well.

Verify by scrolling the built app: the page should feel smoothed, sticky positioning should still work, and modals, nested panels, anchors and keyboard scrolling should behave normally. If smooth scroll does nothing, check the CSS import, then \`autoRaf\` or your manual \`raf\` call, then whether the container scrolls at all.

Full option and method tables, the GSAP ScrollTrigger and Framer Motion examples, and the documented limitations (no CSS scroll-snap, use the \`lenis/snap\` subpath; 60fps cap on Safari) are in https://github.com/darkroomengineering/lenis/blob/main/README.md. Use only option names listed there.`,
  pricing: {
    model: "free",
    summary: "Lenis is a free, open-source smooth scroll library; sponsorship is optional.",
    license: "MIT",
    source: "https://github.com/darkroomengineering/lenis/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
