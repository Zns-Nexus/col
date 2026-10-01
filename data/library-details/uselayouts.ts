import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://uselayouts.com/docs",
  repoUrl: "https://github.com/iurvish/uselayouts",
  registrySetup: {
    description: "From a React project with Tailwind CSS, initialize shadcn if needed. Merge this registry into components.json, preserving its existing settings and other registries. Then run a component command below.",
    config: `{
  "registries": {
    "@uselayouts": "https://uselayouts.com/r/{name}.json"
  }
}`,
  },
  install: [
    {
      label: "Add one component (shadcn CLI)",
      command: "npx shadcn@latest add @uselayouts/discrete-tabs",
    },
    {
      label: "pnpm",
      command: "pnpm dlx shadcn@latest add @uselayouts/discrete-tabs",
    },
    {
      label: "yarn",
      command: "yarn dlx shadcn@latest add @uselayouts/discrete-tabs",
    },
    {
      label: "bun",
      command: "bunx --bun shadcn@latest add @uselayouts/discrete-tabs",
    },
    {
      label: "Direct registry URL (no namespace)",
      command: "npx shadcn@latest add https://uselayouts.com/r/3d-book",
    },
  ],
  gettingStarted: [
    "Start from a React + Tailwind CSS project. useLayouts ships as a shadcn registry, not an npm package, so there is nothing to add to dependencies as a library. If the project has no components.json yet, run npx shadcn@latest init first.",
    'Register the registry once by adding a `registries` block to components.json: `"@uselayouts": "https://uselayouts.com/r/{name}.json"`.',
    "Browse https://uselayouts.com/docs/components, open a component, and run its command from the project root, for example `npx shadcn@latest add @uselayouts/discrete-tabs`. Several components can be added in one command: `npx shadcn@latest add @uselayouts/delete-button @uselayouts/status-button`.",
    "The CLI writes a .tsx file into the `components` alias directory and installs each component's declared dependencies (`motion`, `clsx`, `tailwind-merge`) for you. Source files import from `motion/react` and the shadcn `cn` helper in `@/lib/utils`; some components also pull in shadcn/ui primitives, for example multi-step-form needs card, button, input, textarea, select, badge, calendar and popover.",
    "Edit the installed file directly. Animations are plain Motion props, so change the spring or easing, rename props, and restyle with Tailwind classes rather than wrapping the component.",
  ],
  preview: {
    src: "https://uselayouts.com/og.jpg",
    alt: "useLayouts free animated React components",
  },
  agentPrompt: `Add components from useLayouts (https://uselayouts.com/docs) to this existing project. useLayouts is a free library of animated React components and micro-interactions built with Framer Motion (the motion package) and Tailwind CSS, designed to sit alongside shadcn/ui.

Prerequisites:
- My stack is React + TypeScript + Tailwind CSS with shadcn/ui. Check the project root for components.json; if it is missing, run npx shadcn@latest init first.
- useLayouts is a shadcn registry, not an npm package. Do not npm install uselayouts; that package does not exist on npm.

Steps:
1. Read the docs at https://uselayouts.com/docs. Component pages live at https://uselayouts.com/docs/components/<slug> and each one has a live preview, the install command, and the source. The full machine-readable index of every published component is https://uselayouts.com/r/registry.json, so read that instead of guessing slugs.
2. Add the registry to components.json, keeping the rest of the file intact:
   "registries": { "@uselayouts": "https://uselayouts.com/r/{name}.json" }
3. Ask me which components I want, then run from the project root: npx shadcn@latest add @uselayouts/<slug>. Multiple components work in one command. The shadcn CLI installs the dependencies each component declares (motion, clsx, tailwind-merge) and resolves any shadcn/ui primitives listed in its registryDependencies.
4. First usage: import the new component into an existing page, confirm the project still builds, and check it renders and animates. If one fails, it is almost always a missing shadcn primitive or a missing motion dependency, both of which the CLI reports.
5. Treat the copied file as mine. Tune the spring and easing values, prop names, and Tailwind classes to match this design system instead of wrapping the component in a new abstraction.

Keep the copied source in my repo and leave the registries entry in components.json so later components install the same way.`,
  pricing: {
    model: "free",
    summary: "Every component is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/iurvish/uselayouts",
  },
} satisfies LibraryDetails;
