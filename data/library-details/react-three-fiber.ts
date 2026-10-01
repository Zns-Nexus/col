import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://r3f.docs.pmnd.rs",
  repoUrl: "https://github.com/pmndrs/react-three-fiber",
  install: [
    { label: "npm", command: "npm install three @react-three/fiber" },
    { label: "TypeScript types", command: "npm install @types/three" },
    { label: "Helpers (drei)", command: "npm install @react-three/drei" },
  ],
  gettingStarted: [
    "React Three Fiber is a React renderer for three.js, not a wrapper. It is compatible with React v18 and v19 and must pair with a major version of React the way react-dom does: `@react-three/fiber@8` pairs with `react@18`, `@react-three/fiber@9` pairs with `react@19`. As of September 2026 the current release is 9.x, which declares `react >=19 <19.4` and `three >=0.156` as peer dependencies.",
    "Install with `npm install three @react-three/fiber` and add `npm install @types/three` on TypeScript projects. Install `@react-three/drei` for the helper components most scenes reach for (OrbitControls, Environment, useGLTF, Html, ContactShadows). `@react-three/postprocessing` is the separate package for post-processing effects.",
    "Render a scene by importing `Canvas` and putting it in the React tree: `<Canvas>` sets up the Scene and Camera and runs the render loop for you, so you do not write a traditional loop. Canvas is responsive to its parent node, so give the parent a width and height.",
    "Add geometry and materials as lowercase JSX elements that map to three.js classes, for example `<mesh>` with `<boxGeometry args={[2, 2, 2]} />` and `<meshStandardMaterial />` inside it. Nothing needs importing: every three.js export is available under the camel-case version of its name. Props map directly onto the three.js instance, `args` always takes an array of constructor arguments, and children like geometry and material attach to their parent automatically.",
    "Follow the official guides in order: https://r3f.docs.pmnd.rs/getting-started/introduction, https://r3f.docs.pmnd.rs/getting-started/installation and https://r3f.docs.pmnd.rs/getting-started/your-first-scene. See https://r3f.docs.pmnd.rs/advanced/pitfalls before optimizing, and https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide if upgrading from v8.",
  ],
  preview: {
    src: "https://github.com/pmndrs/react-three-fiber/raw/master/docs/logo.jpg",
    alt: "React Three Fiber logo used as the docs site og:image",
  },
  agentPrompt: `Add React Three Fiber to this existing project. React Three Fiber (https://r3f.docs.pmnd.rs) is a React renderer for three.js: you write the scene as JSX and the library maps lowercase elements onto three.js classes, creating and disposing the objects for you.

Prerequisites:
- The project must already be a working React app that builds. I need both React and three.js fundamentals; the docs assume them at https://r3f.docs.pmnd.rs/getting-started/introduction.
- Fiber is a renderer and pairs with a major React version. \`@react-three/fiber@8\` pairs with \`react@18\`, \`@react-three/fiber@9\` pairs with \`react@19\`. Check my installed React version first and install the matching Fiber major. Current 9.x declares \`react >=19 <19.4\` and \`three >=0.156\`.
- For React Native, import from \`@react-three/fiber/native\` and \`@react-three/drei/native\` instead, and install \`expo-gl\`.

Steps:
1. Detect the framework and React version, then install the packages from the project root. Web: \`npm install three @react-three/fiber\`. Add \`npm install @types/three\` on TypeScript. Add \`npm install @react-three/drei\` for helpers such as OrbitControls, Environment, useGLTF, Html and ContactShadows, and \`npm install @react-three/postprocessing\` only if the scene needs post-processing effects. Never guess versions; the authoritative install commands are at https://r3f.docs.pmnd.rs/getting-started/installation.
2. Handle the framework-specific setup. Next.js 13.1 or newer: add \`transpilePackages: ['three']\` to \`next.config.js\` so the untranspiled three.js add-ons build. Next.js 13.0 or older: \`npm install next-transpile-modules --save-dev\` and wrap the config with \`require('next-transpile-modules')(['three'])\`. Vite and other React build tools work out of the box. For React Native, configure \`metro.config.js\` with \`assetExts: ['glb', 'gltf', 'png', 'jpg']\` if you use useLoader or useGLTF.
3. Mark the R3F code as client-only. \`<Canvas>\` touches window and WebGL at import time, so in any React Server Component framework the file that imports \`@react-three/fiber\` or \`@react-three/drei\` must start with the \`'use client'\` directive, and the Canvas must be rendered from a client component. The official Next.js starter at https://github.com/pmndrs/react-three-next does this in every file under \`src/components/canvas/\`; mirror that split rather than adding the directive to a server page.
4. First usage: create a client component that renders \`<Canvas>\` with a light, a mesh with geometry and material, and make sure the parent element has a real width and height because Canvas fills its parent. Animate with \`useFrame((state, delta) => ...)\` and mutate refs directly. Keep the full prop reference for Canvas at https://r3f.docs.pmnd.rs/api/canvas and the object/geometry/material rules at https://r3f.docs.pmnd.rs/api/objects.
5. Follow the project's existing patterns. Share geometries and materials instead of re-creating them per mount, use instancing for many similar objects, load assets through \`useLoader\` so they are cached, and never call setState inside \`useFrame\` or on high-frequency pointer events: mutate the object and use the frame \`delta\`. These rules are documented at https://r3f.docs.pmnd.rs/advanced/pitfalls.

Notes:
- Do not write a manual \`requestAnimationFrame\` loop; Canvas already renders every frame.
- \`args\` must always be an array, and changing it re-constructs the object.
- If the project is on Fiber v8, read https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide before upgrading; v9 renames Canvas \`Props\` to \`CanvasProps\`, drops automatic sRGB conversion for texture props, and changes StrictMode behavior.

Use only the API documented at https://r3f.docs.pmnd.rs, and read the docs rather than guessing when a component needs behavior the examples do not show.`,
  pricing: {
    model: "free",
    summary: "React Three Fiber is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE",
  },
} satisfies LibraryDetails;
