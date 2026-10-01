import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://gsap.com/docs/v3/",
  repoUrl: "https://github.com/greensock/GSAP",
  install: [
    { label: "npm", command: "npm install gsap" },
    { label: "npm (React hook)", command: "npm install @gsap/react" },
  ],
  gettingStarted: [
    "Run `npm install gsap`. GSAP is framework agnostic and needs no build config; it ships ESM and TypeScript types.",
    "Import the core: `import { gsap } from \"gsap\";`",
    "Animate an element: `gsap.to(\".box\", { x: 360, duration: 1, ease: \"power2.out\" });`",
    "For scroll animation, import `{ ScrollTrigger } from \"gsap/ScrollTrigger\"`, register it once with `gsap.registerPlugin(ScrollTrigger)`, then pass `scrollTrigger: { trigger: \".section\", start: \"top center\" }` in a tween.",
    "In React, install `@gsap/react` and wrap animation code in `useGSAP(() => { ... }, { scope: container })` so it reverts on unmount.",
  ],
  preview: {
    src: "https://gsap.com/GSAP-share-image.png",
    alt: "GSAP share image",
  },
  agentPrompt:
    "Add GSAP, the JavaScript animation library, to my existing web project (vanilla JS/TS or any framework such as React or Vue, built with a bundler like Vite, Next.js or webpack). Prerequisites: Node.js and npm already set up in the repo.\n\nSteps:\n1. Install the official package with `npm install gsap`. No extra config is required; the package ships ESM and TypeScript types. For React, also run `npm install @gsap/react`.\n2. In the file that owns the UI, import the core: `import { gsap } from \"gsap\";`.\n3. Add one first animation against an element that already exists in the markup: `gsap.to(\".hero-title\", { x: 360, duration: 1, ease: \"power2.out\" });`.\n4. If the animation should react to scrolling, import `{ ScrollTrigger } from \"gsap/ScrollTrigger\"`, call `gsap.registerPlugin(ScrollTrigger)` once at module scope, and add `scrollTrigger: { trigger: \".section\", start: \"top center\" }` to the tween. Register plugins explicitly so tree shaking does not remove them.\n5. In React components, wrap animation code in `useGSAP(() => { ... }, { scope: container })` from `@gsap/react` for automatic cleanup on unmount.\n\nConsult the official docs at https://gsap.com/docs/v3/ (installation: https://gsap.com/docs/v3/Installation, React: https://gsap.com/resources/React) for API details. Use only plugin names and import paths documented there, for example `gsap/ScrollTrigger`.",
  pricing: {
    model: "free",
    summary: "GSAP and every plugin are free, including for commercial use; its own license bars use in tools that compete with Webflow.",
    license: "GSAP Standard License",
    source: "https://gsap.com/pricing",
  },
} satisfies LibraryDetails;
