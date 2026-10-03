import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://corvu.dev/docs/installation/",
  repoUrl: "https://github.com/corvudev/corvu",
  preview: {
    src: "https://corvu.dev/banner.jpg",
    alt: "Corvu official preview",
  },
  install: [
    { label: "All primitives (npm)", command: "npm install corvu" },
    { label: "All primitives (pnpm)", command: "pnpm add corvu" },
    { label: "Dialog only", command: "npm install @corvu/dialog" },
    { label: "Drawer only", command: "npm install @corvu/drawer" },
  ],
  gettingStarted: [
    "Use an existing SolidJS app. Install `corvu` for the full collection, or a separate `@corvu/<primitive>` package for only the primitive you need; choose one installation approach.",
    "For a dialog, import `Dialog` from `corvu/dialog`, or from `@corvu/dialog` when using the separate package. Compose the root, trigger, portal, overlay, content, label, description, and close control following https://corvu.dev/docs/primitives/dialog/.",
    "Supply styles yourself. Corvu exposes data attributes for component state and accepts the app's CSS or utility classes; it does not install a theme.",
    "Tailwind CSS v4 can target data attributes directly, so the optional `@corvu/tailwind` plugin is unnecessary there. The installation guide also documents an UnoCSS preset for projects already using UnoCSS.",
    "Keep reactive options connected to Solid signals and follow the state and dynamic-component guides. Preserve labels, descriptions, focus management, and dismissal behavior when building styled wrappers.",
  ],
  agentPrompt: `Add Corvu (https://corvu.dev) to this existing SolidJS project.

Corvu supplies unstyled, accessible UI primitives. It can be installed as the corvu collection or as separate @corvu packages.

Prerequisites:
- An existing SolidJS application and a working styling system. Inspect its package manager and reactive state conventions.

Steps:
1. Read https://corvu.dev/docs/installation/ and the requested primitive's page. Consult the state and styling guides before creating wrappers.
2. Install npm install corvu for the collection, or npm install @corvu/dialog for the dialog-only example. Do not add both for the same primitive.
3. Import Dialog from corvu/dialog or @corvu/dialog to match the chosen package. Follow the documented anatomy: root, Trigger, Portal, Overlay, Content, Label, Description, and Close.
4. Style each part with the app's existing CSS or utilities and documented data attributes. Tailwind CSS v4 supports those attributes directly, so do not add the older Tailwind plugin unnecessarily.
5. Wire controlled state using Solid signals and preserve reactivity when passing options or accessing context. Keep the primitive's focus, dismissal, labels, and keyboard behavior intact.
6. Integrate the component into an existing screen, then run the project's typecheck and build.

Corvu is not a React library. Use the SolidJS APIs shown in its documentation rather than translating React hooks.`,
  pricing: {
    model: "free",
    summary: "Corvu primitives and utilities are free and open source under MIT.",
    license: "MIT",
    source: "https://github.com/corvudev/corvu",
  },
} satisfies LibraryDetails;
