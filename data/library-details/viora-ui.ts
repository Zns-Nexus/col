import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.vioraui.dedyn.io/docs/primitives/guide/introduction",
  install: [
    { label: "Add a component (npm)", command: "npx viora-ui@latest add minimal-carousel" },
    { label: "Add a component (pnpm)", command: "pnpm dlx viora-ui@latest add minimal-carousel" },
    { label: "Add a component (bun)", command: "bunx --bun viora-ui@latest add minimal-carousel" },
  ],
  gettingStarted: [
    "Browse https://www.vioraui.dedyn.io/components and use the all / free / pro filter to see which of the 109+ components are open source. Each component page, for example https://www.vioraui.dedyn.io/docs/components/minimal-carousel, has a live preview and a Code tab.",
    "Add a component with the Viora CLI from your project root: `npx viora-ui@latest add minimal-carousel`. Replace the name with the slug in the component's URL. The docs list pnpm, yarn and bun equivalents on every component page.",
    "Install the packages the component imports. The CLI writes the source file but did not install dependencies in a test run, and `minimal-carousel` imports `motion/react`, `lucide-react` and `react-icons`. Motion v12+ or framer-motion is required, as described at https://www.vioraui.dedyn.io/docs/primitives/guide/troubleshooting.",
    "Import the component from where the CLI wrote it. The CLI created `components/viora-ui/minimal-carousel.tsx` in a Next.js test project, while the docs' usage snippet shows `@/components/ui/minimal-carousel`, so check the actual path before importing. Add `\"use client\"` for interactive components in the Next.js App Router.",
    "For AI editors, https://www.vioraui.dedyn.io/llms.txt lists components and https://www.vioraui.dedyn.io/docs/primitives/guide/mcp-server documents an MCP server configured with `npx -y viora-ui-mcp`. Some llms.txt links point at pages that no longer exist, so confirm a component page loads before relying on it.",
  ],
  preview: {
    src: "https://www.vioraui.dedyn.io/opengraph-image.png?0dbdf1a13d66d743",
    alt: "Viora UI home page preview",
  },
  agentPrompt: `Add Viora UI (https://www.vioraui.dedyn.io) components to this existing React project.

Viora UI is a copy-paste collection of animated React components, built with Tailwind CSS and Motion and modelled on shadcn/ui patterns. Each component is a single file added with the viora-ui CLI. Some components and the Next.js templates are Pro only.

Prerequisites:
- A React project, ideally Next.js with the App Router, with Tailwind CSS configured and a working "@/" path alias. Check package.json and tsconfig.json.
- The motion package (Motion v12+, imported from motion/react) or framer-motion. Install it with the project's package manager if it is missing.
- Components may also import lucide-react and react-icons. The CLI does not install dependencies, so read each file's imports after adding it.

Steps:
1. Ask me which component I need, then find it at https://www.vioraui.dedyn.io/components. Use the free filter, because Pro components need a paid license. Open the component's page under https://www.vioraui.dedyn.io/docs/components/<slug> and read its usage snippet.
2. Add it from the project root with npx viora-ui@latest add <slug> (pnpm dlx viora-ui@latest add <slug> or bunx --bun viora-ui@latest add <slug> for other package managers).
3. Open the file the CLI created. In a test project it landed at components/viora-ui/<slug>.tsx, while the docs usage snippet imports from "@/components/ui/<slug>". Use the real path, and move the file only if the project's conventions require it.
4. Install every package the file imports that is not already in package.json, for example motion, lucide-react and react-icons.
5. Import the component into the target screen, add "use client" where interactive state is used, and run the project's typecheck and build.
6. Check the result in the browser at its real trigger point, with keyboard-only navigation and with prefers-reduced-motion enabled. The accessibility notes are at https://www.vioraui.dedyn.io/docs/primitives/guide/accessibility.

Notes:
- The license page at https://www.vioraui.dedyn.io/docs/primitives/guide/license says the open-source components are MIT. The pricing FAQ allows personal and client projects but not reselling the components as a standalone kit.
- The GitHub repository linked from the site (https://github.com/Kartikmhatre/VioraUI) currently holds only an overview and documentation; its README says the component source and CLI will be open-sourced later. Install through the CLI, not from GitHub.
- Some links in https://www.vioraui.dedyn.io/llms.txt return 404. Verify a component URL loads before using its slug.
- Do not use the command shown on the Installation guide page (viora-ui add installation). It treats "installation" as a component name and fails with "Failed to find installation at registry". Add real components by slug as above.`,
  pricing: {
    model: "freemium",
    summary: "The open-source components are free under MIT; Pro is a one-time $89 lifetime license for the premium components and templates, with a custom-priced Studio tier for teams.",
    license: "MIT",
    source: "https://www.vioraui.dedyn.io/pricing",
  },
} satisfies LibraryDetails;
