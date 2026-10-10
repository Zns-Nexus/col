import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://morphin.dev/components",
  repoUrl: "https://github.com/sikkeep/morphin-registry",
  install: [
    { label: "List registry components", command: "npx @morphin/cli list" },
    { label: "Add a component", command: "npx @morphin/cli add animated-svg-branch-connector" },
    { label: "Sign in for PRO components", command: "npx @morphin/cli login" },
  ],
  gettingStarted: [
    "Browse https://morphin.dev/inspirations for reference. Each entry is a screenshot or recording of an interface from a live site or app, tagged by section and style (Hero, Pricing, Card, Page Transition, Brutalist and so on), with a link back to the original site. The terms at https://morphin.dev/terms allow browsing for research but not downloading or republishing the media.",
    "Open https://morphin.dev/components for the React components. Filter by type (Button, Input, Card, Chart, Hero, Pricing, Navigation, Loading and others); entries marked PRO need a paid plan. Open one, for example https://morphin.dev/components/animated-svg-branch-connector, to preview it.",
    "Install a component by its registry name with the Morphin CLI. Run `npx @morphin/cli add animated-svg-branch-connector --dry-run` first to see which files would be written and which packages to install, then run it again without `--dry-run`. The CLI prints the dependency install command (for this item: framer-motion, next-useragent, usehooks-ts, tailwind-merge and clsx) but does not run it unless you pass `--install`.",
    "Browse the full list of installable names with `npx @morphin/cli list`, or read the registry index at https://registry.morphin.dev/registry.json. The registry source is public at https://github.com/sikkeep/morphin-registry.",
    "For PRO items, run `npx @morphin/cli login` after buying a plan at https://morphin.dev/pricing. Free items install without signing in.",
  ],
  preview: {
    src: "https://morphin.dev/inspirations-og.png",
    alt: "Morphin UI design inspiration page preview",
  },
  agentPrompt: `Use Morphin (https://morphin.dev) as a reference and component source in this existing React project.

Morphin has two parts. Inspirations is a gallery of interfaces and interactions captured from real websites, for study only. Components is a catalog of animated React components, most built with Framer Motion and Tailwind CSS, that you install as source files with the Morphin CLI (@morphin/cli). Some components are marked PRO and need a paid plan.

Prerequisites:
- A React project with Tailwind CSS configured. Check package.json for react, tailwindcss and framer-motion, and note the package manager.
- Node.js with npx available.
- For PRO components only: a Morphin PRO plan and a signed-in CLI (npx @morphin/cli login).

Steps:
1. Ask me which screen or interaction I am building, then look through https://morphin.dev/components for a matching component and https://morphin.dev/inspirations for visual reference. Components marked PRO cannot be installed without a plan, so tell me before choosing one.
2. Find the registry name of the component. It is the last segment of the component URL (for example https://morphin.dev/components/animated-svg-branch-connector installs as animated-svg-branch-connector), and npx @morphin/cli list prints every available name.
3. Preview the install with npx @morphin/cli add <name> --dry-run. Read the list of files it would write and the packages it asks you to install. Existing files are skipped unless --overwrite is passed, so do not pass that flag without checking what it would replace.
4. Run npx @morphin/cli add <name>, then install the dependencies it prints (or pass --install) with this project's package manager (--pm npm|pnpm|yarn|bun).
5. Import the generated component from where the CLI wrote it, using the project's own alias and folder layout. Add a "use client" directive when the framework needs one for animated components.
6. Run the project's typecheck and build, then open the screen at its real trigger point and confirm the motion plays. Check it with prefers-reduced-motion enabled.

Notes:
- The registry repository (https://github.com/sikkeep/morphin-registry) states no license, and the CLI package is MIT. Treat installed components as third-party source and keep any attribution headers.
- Inspirations are screenshots and recordings of other people's sites. Use them as reference only; the terms at https://morphin.dev/terms do not allow downloading or reusing the media, so rebuild the idea with this project's own components and tokens instead.
- Morphin also lists components submitted by users, so quality and dependencies vary per item. Read the installed file before wiring it in.`,
  pricing: {
    model: "freemium",
    summary: "Browsing and the free components cost nothing; PRO is $15 per month (billed $45 every three months) or $179 one-time for lifetime access, and unlocks the PRO screens, Cursor prompts and CLI access to PRO items.",
    source: "https://morphin.dev/pricing",
  },
  collection: "Morphin hosts components that users submit and moderates them, so quality, dependencies and PRO status vary per item.",
} satisfies LibraryDetails;
