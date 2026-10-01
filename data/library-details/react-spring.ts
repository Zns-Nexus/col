import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://react-spring.dev",
  repoUrl: "https://github.com/pmndrs/react-spring",
  install: [
    { label: "npm", command: "npm install @react-spring/web" },
    { label: "pnpm", command: "pnpm add @react-spring/web" },
    { label: "yarn", command: "yarn add @react-spring/web" },
    { label: "three.js / react-three-fiber", command: "npm install @react-spring/three" },
  ],
  preview: {
    src: "https://opengraph.githubassets.com/1/pmndrs/react-spring",
    alt: "React Spring repository preview image",
  },
  gettingStarted: [
    "Install `@react-spring/web` (v10) with npm install @react-spring/web. Its peer range is `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`, so React 19 is supported.",
    "Import the hooks from the package root: `import { useSpring, animated } from \"@react-spring/web\";` — the entry re-exports everything in `@react-spring/core` plus the `animated` component factory.",
    "Create a spring and spread the values onto an `animated` element: `const style = useSpring({ opacity: 1, from: { opacity: 0 } });` then render `<animated.div style={style} />`.",
    "Change a value by passing new props to `useSpring` (it animates to the new target) or, for imperative control, take the api object: `const [style, api] = useSpring(...)` then call `api.start({ ... })`.",
    "Tune the physics with the `config` presets — `gentle`, `wobbly`, `stiff`, `slow`, `molasses` — or pass raw `tension`, `friction` and `mass`. Use `useReducedMotion()` to respect the user's motion preference.",
  ],
  agentPrompt: `Help me use React Spring (https://react-spring.dev) in this existing project, which already has React and a build tool such as Vite or Next.js.

Prerequisites:
- React with hooks. The current major version is v10, whose peer range is ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0, so React 19 works.
- Do not install the packages under the old "react-spring" scope names other than @react-spring/web; there is no @react-spring/gestures package on npm.

Steps:
1. Install the web entry point: npm install @react-spring/web. Everything commonly used is exported from that single package; @react-spring/web re-exports @react-spring/core and adds \`animated\`.
2. In the component that owns the UI, import what you need from "@react-spring/web". The current API is hooks plus a component factory: useSpring, useSprings, useTrail, useTransition, useSpringValue, useSpringRef, useInView, useScroll, useResize, useReducedMotion, useChain, to, interpolate, config, and \`animated\`. There is no \`useGesture\` in v10 — gestures are handled with your own pointer/touch handlers or a gesture library.
3. Make one first working animation before touching anything else:
   const style = useSpring({ from: { opacity: 0, transform: "translate3d(0,-20px,0)" }, to: { opacity: 1, transform: "translate3d(0,0px,0)" } });
   return <animated.div style={style} />;
   Only useSpring is required; the other hooks are optional.
4. Choose the hook that matches the job: \`useSpring\` for one element, \`useSprings(length, ...)\` for a list, \`useTrail\` for staggered lists, and \`useTransition\` for enter/exit when items mount and unmount. Take the second element of the return value ([style, api]) when you need api.start, api.stop, or api.pause.
5. Set the physics with the \`config\` presets — config.gentle, config.wobbly, config.stiff, config.slow, config.molasses — or with tension, friction and mass. Wire \`useReducedMotion()\` into your springs so the animation respects the user's reduced-motion setting.
6. If I am animating inside react-three-fiber, install a separate package: npm install @react-spring/three (v10 targets @react-three/fiber >=6.0 and three >=0.126). Import \`animated\` and \`useSpring\` from "@react-spring/three" in that scene, not from "@react-spring/web".

Keep the existing styling, TypeScript setup and build tooling unchanged. Read the docs at https://react-spring.dev before writing code; the reference for the common hooks is at https://react-spring.dev/docs/common-hooks/use-spring.`,
  pricing: {
    model: "free",
    summary: "React Spring is free and open source, funded through Open Collective, with no paid products.",
    license: "MIT",
    source: "https://github.com/pmndrs/react-spring/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
