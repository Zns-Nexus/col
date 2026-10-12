import type { LibraryCorpusEntry } from "./types";

/**
 * The deep-coverage documentation corpus, one entry per library.
 *
 * Ingestion rules (enforced by `lib/corpus.test.mjs`):
 * - `permission` must be recorded before any snapshot is added. A missing or
 *   `unknown` permission means the entry holds no snapshots at all.
 * - Every snapshot carries its fetch date and source revision so evidence can
 *   be re-verified and aged out.
 *
 * The 2026-10-10 ingestion pass records the reuse decision for the whole
 * registry: "granted" where the library's own license permits documentation
 * reuse with attribution (verified per library), "denied" where the license
 * forbids it (Aceternity), and no entry at all where no grant was found.
 * Snapshots carry only install/usage evidence fetched from each library's own
 * sources; a page without such evidence earns no snapshot.
 */
export const libraryCorpus: LibraryCorpusEntry[] = [
  {
    slug: "21st-dev",
    permission: {
      status: "granted",
      source: "https://github.com/serafimcloud/21st",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "21st-dev install and usage",
        url: "https://github.com/serafimcloud/21st#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "b96d84dcf748d5e56f2f72f2bab9a4f7f33574cf",
        content: "# 🚀 Welcome to 21st.dev!\n\n**[21st.dev](https://21st.dev)** is your go-to open-source community registry for **React UI components**! Whether you're a developer, designer, or just someone who loves building beautiful interfaces, 21st.dev is the place to **publish, discover, and install** minimal, modern, and reusable React components powered by **Tailwind CSS** and **Radix UI**.\n\nInspired by the amazing [shadcn/ui](https://ui.shadcn.com/), we're here to make building UIs faster, easier, and more fun. 🎉\n\n[![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289da?logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/Qx4rFunHfm)\n\n---\n\n## 👥 Community\n\nWe're building more than just a component registry – we're building a community of developers who love creating beautiful UIs. Here's how you can get involved:\n\n- **Join our [Discord](https://discord.gg/Qx4rFunHfm)** – Get help, share your work, and chat with other developers\n- **Follow us on [X/Twitter](https://x.com/serafimcloud)** – Stay updated with the latest features and components\n- **Star us on [GitHub](https://github.com/serafimcloud/21st)** – Support the project and follow our progress\n- **Share your components** – Help others by contributing your UI components\n- **Give feedback** – Your input shapes the future of 21st.dev\n\n---\n\n## 🌟 Why 21st.dev?\n\n- **Open Source & Community-Driven**: Built by developers, for developers. Everyone is welcome to contribute!\n- **Minimal & Modern**: Components are lightweight, customizable, and designed with Tailwind and Radix UI.\n- **Easy to Use**: Install any component with a single `npx shadcn` command.\n- **Multiple Demos**: Each component can have multiple demos with previews and videos.\n- **Extensible**: Add your own components, themes, and dependencies effortlessly.\n- **TypeScript First**: Full type support out of the box.\n\n---\n\n## 🛠️ Publish Your Component in 1 Minute!\n\nYes, you read that right—**1 minute**! 🕒  \nPublishing your React component is as easy as pie. Just head over to our [publish page](https://21st.dev) and share your creation with the world.\n\n### Review Process\n\nWhen you publish a component, it follows this journey:\n\n1. **Initial State** (`on_review`) - Component is available via direct link and awaiting review\n2. **Posted State** (`posted`) - Component has passed review and is available on your profile and via direct link\n3. **Featured State** (`featured`) - Component is featured on the homepage and in public listings\n\nI ([Serafim](https://x.com/serafimcloud)) personally review each component to ensure it meets our quality standards before featuring it.\n\n### Quality Guidelines\n\nTo get your component featured, ensure it follows these key principles:\n\n1. **Visual Quality**\n\n   - Component should be visually polished and provide real value to the community\n   - Follow modern UI/UX practices\n\n2. **Code Structure**\n\n   - Follow the shadcn/ui pattern of separating component logic from demo content\n   - Component file sh",
      }
    ],
  },
  {
    slug: "react-bits",
    permission: {
      status: "granted",
      source: "https://github.com/DavidHDev/react-bits",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "transition-dev",
    permission: {
      status: "granted",
      source: "https://github.com/Jakubantalik/transitions.dev",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "transition-dev install and usage",
        url: "https://github.com/Jakubantalik/transitions.dev#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "78fd02138c5ffcc8262cca0362110d850a8cb14c",
        content: "## Install with the CLI (npm)\n\nPull any transition into your project from the terminal — no manual copy:\n\n```bash\nnpx transitions-dev add card-resize      # free, no account needed\nnpx transitions-dev add --free           # every free transition at once\nnpx transitions-dev list                 # see everything available\n```\n\nPro transitions unlock after a passwordless browser sign-in (device flow — no API key in your terminal):\n\n```bash\nnpx transitions-dev login                # opens the browser to confirm a code\nnpx transitions-dev add confetti-burst    # pulls the Pro CSS + React\n```\n\nCLI source: [`cli/`](./cli) (published as the public `transitions-dev` package; `transitions-pro` is the old name and forwards to it — it holds no premium source; Pro recipes are fetched from the authenticated API).\n\n## Use as an agent skill\n\nThe same transitions are packaged as an installable agent skill so AI coding tools (Cursor, Claude Code, Codex, …) can apply them directly inside your project.\n\n```bash\nnpx skills add Jakubantalik/transitions.dev\n```\n\nSkill source lives in [`skills/transitions-dev/`](./skills/transitions-dev) — `SKILL.md`, eighteen per-transition reference files (`01-card-resize.md` … `18-texts-reveal.md`), and `_root.css` (the universal install block on its own).\n\nThe skill is generated from `index.html` so the snippets always match what the showcase site demonstrates. Re-run after editing the source site:\n\n```bash\nnpm run build\n```\n\n`build/extract.mjs` parses `PROTO_TEMPLATES` and the `:root { --pX-* }` block out of `index.html`, then re-renders every file under `skills/transitions-dev/` from the templates in `build/templates/`.\n\n## Refine tool\n\n**Refine** is a live, agent-driven companion to the skill. One command drops a timeline + Refine panel onto your running app — no `npm install`, no source edits of your own — and every \"Refine\" click asks your coding agent to align the selected CSS/Motion transition to the transitions.dev motion tokens (or replace it with a transition from the library). Suggestions appear in a panel that slides in from the right; you pick which to apply as live, reversible overrides.\n\n```bash\n# inject the panel + start the local relay (deterministic suggestions work immediately)\nnpx transitions-refine live\n\n# same, but also installs/wires the Cursor CLI so the relay answers with the LLM, persistently\nnpx transitions-refine live --llm\n\n# remove the injected <script> tag again\nnpx transitions-refine stop\n```\n\nWithout `--llm`, you can instead run `/refine live` in your editor to back the panel with the in-IDE agent. Source lives in [`refine/`](./refine) and ships as the public npm package `transitions-refine`. See [`refine/README.md`](./refine/README.md) for the full flow and env knobs.\n\n## Files\n\n- `index.html` — main showcase page with all eighteen transitions and per-card \"copy CSS\" buttons.\n- `prototypes.html` — interactive playground for each transition with live tuning controls (durations, distances, easings).\n- `skill.html` — landing page for the agent skill (install instructions + side-by-side compare embed).\n- `example.html` — modal demo with a side-by-side \"generic AI output\" vs \"with Transitions.dev skill\" toggle, embedded inside `skill.html` as an iframe.\n- `skills/transitions-dev/` — published skill payload (consumed by `npx skills add`).\n- `refine/` — the **Refine** tool: a CLI that injects a live timeline + Refine panel and runs a local relay (published to npm as `transitions-refine`).\n- `build/extract.mjs` + `build/templates/` — regenerator that keeps the skill in lockstep with `index.html`.\n- `assets/` — icons, favicons, and the social-share OG image.\n- `site.webmanifest`, `robots.txt`, `sitemap.xml` — PWA/SEO metadata.\n\n## Run locally\n\n```bash\npython3 -m http.server 8765\n```\n\nThen open http://127.0.0.1:8765/.\n\n## License\n\nYou (and any coding agent working for you) may use the transitions and skills in unlimited personal and commercial projects, modify them, and ship them to your users. The only restriction: don't redistribute the library itself as a competing transitions library or kit. The tooling (CLI, agent, Refine) is MIT. See [LICENSE](LICENSE) and the [full terms](https://transitions.dev/terms.html).",
      }
    ],
  },
  {
    slug: "shadcn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcn-ui/ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "shadcn-ui install and usage",
        url: "https://ui.shadcn.com/docs/cli",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "ct Hook Form TanStack Form Formisch Utilities scroll-fade shimmer Registry Introduction Getting Started GitHub Registries Registry Directory Registry Health Examples Namespaces Authentication Dynamic Search MCP Server Open in v0 API Reference registry.json registry-item.json shadcn Copy Page Previous Next Use the shadcn CLI to add components to your project. init # Use the init command to initialize configuration and dependencies for an existing project, or create a new project with --name . The init command installs dependencies, adds the cn util and configures CSS variables for the project. pnpm npm yarn bun pnpm dlx shadcn@latest init Copy Options Copy Usage: shadcn init [options] [components...] initialize your project and install dependencies Arguments: components names, url or local path to component Options: -t, --template &lt; templat e &gt; the template to use. (next, vite, start, react-router, laravel, astro ) -b, --base &lt; bas e &gt; the component library to use. (base, radix, aria ) -p, --preset [name] use a preset configuration -y, --yes skip confirmation prompt. (default: true ) -d, --defaults use default configuration: --template=next --preset=nova (default: false ) -f, --force force overwrite of existing configuration. (default: false ) -c, --cwd &lt; cw d &gt; the working directory. defaults to the current directory. -n, --name &lt; nam e &gt; the name for the new project. -s, --silent mute output. (default: false ) --css-variables use css variables for theming. (default: true ) --no-css-variables do not use css variables for theming. --monorepo scaffold a monorepo project. --no-monorepo skip the monorepo prompt. --rtl enable RTL support. --no-rtl disable RTL support. --pointer enable pointer cursor for buttons. --no-pointer disable pointer cursor for buttons. --reinstall re-install existing UI components. --no-reinstall do not re-install existing UI components. -h, --help display help for command The create command is an alias for init : pnpm npm yarn bun pnpm dlx shadcn@latest create Copy add # Use the add command to add components and dependencies to your project. pnpm npm yarn bun pnpm dlx shadcn@latest add [component] Copy Options Copy Usage: shadcn add [options] [components...] add a component to your project Arguments: components name, url or local path to component Options: -y, --yes skip confirmation prompt. (default: false ) -o, --overwrite overwrite existing files. (default: false ) -c, --cwd &lt; cw d &gt; the working directory. defaults to the current directory. -a, --all add all available components (default: false ) -p, --path &lt; pat h &gt; the path to add the component to. -s, --silent mute output. (default: false ) --dry-run preview changes without writing files. (default: false ) --diff [path] show diff for a file. --view [path] show file contents. -h, --help display help for command apply # Use the apply command to apply a preset to an existing project. pnpm npm yarn bun pnpm dlx shadcn@latest apply a2r6bw",
      }
    ],
  },
  {
    slug: "magic-ui",
    permission: {
      status: "granted",
      source: "https://github.com/magicuidesign/magicui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "aceternity-ui",
    permission: {
      status: "denied",
      source: "https://ui.aceternity.com/licence",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "motion",
    permission: {
      status: "granted",
      source: "https://github.com/motiondivision/motion",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "motion install and usage",
        url: "https://github.com/motiondivision/motion#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "e6bf03ead39cae7a2c5f8fe902ce8a9c1a9a22e8",
        content: "<h1 align=\"center\"> <img width=\"35\" height=\"35\" alt=\"Motion logo\" src=\"https://github.com/user-attachments/assets/00d6d1c3-72c4-4c2f-a664-69da13182ffc\" /><br />Motion</h1>\n<h3 align=\"center\">\n  An open source animation library<br />for JavaScript, React and Vue\n</h3>\n\n<p align=\"center\">\n  <a href=\"https://www.npmjs.com/package/motion\" rel=\"noopener noreferrer nofollow\" ><img src=\"https://img.shields.io/npm/v/motion?color=0368FF&label=version\" alt=\"npm version\"></a>\n  <a href=\"https://www.npmjs.com/package/motion\" rel=\"noopener noreferrer nofollow\" ><img src=\"https://img.shields.io/npm/dm/framer-motion?color=8D30FF&label=npm\" alt=\"npm downloads per month\"></a>\n  <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.jsdelivr.com/package/npm/motion\"><img alt=\"jsDelivr hits (npm)\" src=\"https://img.shields.io/jsdelivr/npm/hm/framer-motion?logo=jsdeliver&color=FF4FBA\"></a>\n  <img alt=\"NPM License\" src=\"https://img.shields.io/npm/l/motion?color=FF2B6E\">\n  <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://score.motion.dev/site/motion.dev?utm_source=github&utm_medium=readme-badge\"><img height=\"20\" alt=\"MotionScore grade\" src=\"https://api.motion.dev/score/badge?url=motion.dev\"></a>\n</p>\n\n```bash\n# React / JavaScript\nnpm install motion\n\n# Vue\nnpm install motion-v\n```\n\n## Table of Contents\n\n1. [Why Motion?](#why-motion)\n2. [🍦 Platforms](#-platforms)\n3. [🎓 Examples](#-examples)\n4. [🎨 Motion Studio](#-motion-studio)\n4. [🤖 Using Motion with AI](#-using-motion-with-ai)\n5. [⚡️ Motion+](#-motion)\n6. [👩🏻‍⚖️ License](#-license)\n7. [💎 Contribute](#-contribute)\n8. [✨ Sponsors](#-sponsors)\n\n## Why Motion?\n\n-   **Simple API:** First-class React, JavaScript, and Vue packages.\n-   **Hybrid engine:** Power of JavaScript combined with native browser APIs for 120fps, GPU-accelerated animations.\n-   **Production-ready:** TypeScript, extensive test suite, tree-shakable, tiny footprint.\n    **Batteries included:** Gestures, springs, layout transitions, scroll-linked effects, timelines.\n\n## 🍦 Platforms\n\nMotion is available for [React](https://motion.dev/docs/react), [JavaScript](https://motion.dev/docs/quick-start) and [Vue](https://motion.dev/docs/vue).\n\n### React\n\n```jsx\nimport { motion } from \"motion/react\"\n\nfunction Component() {\n    return <motion.div animate={{ x: 100 }} />\n}\n```\n\nGet started with [Motion for React](https://motion.dev/docs/react).\n\n**Note:** Framer Motion is now Motion. Import from `motion/react` instead of `framer-motion`.\n\n### JS\n\n```javascript\nimport { animate } from \"motion\"\n\nanimate(\"#box\", { x: 100 })\n```\n\nGet started with [JavaScript](https://motion.dev/docs/quick-start).\n\n### Vue\n\n```html\n<script>\n    import { motion } from \"motion-v\"\n</script>\n\n<template> <motion.div :animate={{ x: 100 }} /> </template>\n```\n\nGet started with [Motion for Vue](https://motion.dev/docs/vue).\n\n## 🎓 Examples & tutorials\n\nBrowse 450+ [official examples](https://motion.dev/examples), with copy-paste code that'll level-up your a",
      }
    ],
  },
  {
    slug: "radix-ui",
    permission: {
      status: "granted",
      source: "https://github.com/radix-ui/primitives",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "radix-ui install and usage",
        url: "https://github.com/radix-ui/primitives#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "01259a024d82ab3892d1e5938b1a50bb352c6df5",
        content: "## Installation\n\nFirst, install pnpm if you haven't already. Open your terminal and run:\n\n```bash\nnpm install -g pnpm\n```\n\nThen, install the dependencies:\n\n```bash\npnpm install\n```\n\n## Documentation\n\nFor full documentation, visit [radix-ui.com/primitives/docs](https://www.radix-ui.com/primitives/docs).\n\n## Releases\n\nFor changelog, visit [radix-ui.com/primitives/docs/overview/releases](https://www.radix-ui.com/primitives/docs/overview/releases).\n\n## Contributing\n\nPlease follow our [contributing guidelines](./.github/CONTRIBUTING.md).\n\n---\n\n## Community\n\n- [Discord](https://discord.com/invite/7Xb99uG) - To get involved with the Radix community, ask questions and share tips.\n- [Twitter](https://twitter.com/radix_ui) - To receive updates, announcements, blog posts, and general Radix tips.\n\n## Thanks\n\n<a href=\"https://www.chromatic.com/\"><img src=\"https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png\" width=\"153\" height=\"30\" alt=\"Chromatic\" /></a>\n\nThanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.\n\n---\n\n## License\n\nLicensed under the MIT License, Copyright © 2022-present [WorkOS](https://workos.com).",
      }
    ],
  },
  {
    slug: "base-ui",
    permission: {
      status: "granted",
      source: "https://github.com/mui/base-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "base-ui install and usage",
        url: "https://base-ui.com/react/overview/quick-start",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "og Drawer Field Fieldset Form Input Menu Menubar Meter Navigation Menu Number Field OTP Field Popover Preview Card Progress Radio Group Scroll Area Select Separator Slider Switch Tabs Toast Toggle Toggle Group Toolbar Tooltip Utils CSP Provider Direction Provider mergeProps useRender GitHub npm 1.9.0 Quick start (Top) Install the library Set up Portals iOS 26+ Safari Assemble a component Pre-styled components Working with LLMs Next steps Quick start A quick guide to getting started with Base UI. View as Markdown Install the library Install Base UI using a package manager. Installation command pnpm npm yarn bun pnpm add @base-ui/react All components are included in a single package. Base UI is tree-shakable, so your app bundle will contain only the components that you actually use. Set up Portals Base UI uses portals for components that render popups, such as Dialog and Popover. To make portaled components always appear on top of the entire page, add the following style to your application layout root: layout.tsx &lt; body &gt; &lt; div className = \" root \" &gt; { children } &lt;/ div &gt; &lt;/ body &gt; styles.css .root { isolation : isolate ; } This style creates a separate stacking context for your application’s . root element. This way, popups always appear above the page contents, and any z - index property in your styles won’t interfere with them. iOS 26+ Safari Starting with iOS 26, Safari allows content beneath the UI chrome to be visible. Backdrops such as those used by dialogs must use position : absolute instead of position : fixed to cover the entire visual viewport. For this to work after the page is scrolled, the following style must be added to your global styles: styles.css body { position: relative; } Assemble a component This demo shows you how to import a Popover component, assemble its parts, and apply styles. There are examples for both Tailwind and CSS Modules below, but since Base UI is unstyled, you can use CSS-in-JS, plain CSS, or any other styling solution you prefer. Notifications index.tsx index.module.css CSS Modules StackBlitz CSS Modules StackBlitz import * as React from ' react ' ; import { Popover } from ' @base-ui/react/popover ' ; import styles from ' ./index.module.css ' ; export default function ExamplePopover () { return ( &lt;Popover.Root&gt; &lt;Popover.Trigger className={styles.Button}&gt;Notifications&lt;/Popover.Trigger&gt; &lt;Popover.Portal&gt; &lt;Popover.Positioner sideOffset={8}&gt; &lt;Popover.Popup className={styles.Popup}&gt; &lt;Popover.Arrow className={styles.Arrow} /&gt; &lt;Popover.Title className={styles.Title}&gt;Notifications&lt;/Popover.Title&gt; &lt;Popover.Description className={styles.Description}&gt; You are all caught up. Good job! &lt;/Popover.Description&gt; &lt;/Popover.Popup&gt; &lt;/Popover.Positioner&gt; &lt;/Popover.Portal&gt; &lt;/Popover.Root&gt; ); } Show code Pre-styled components shadcn/ui is a great place to start if you need pre-styled components with higher-level abstr",
      }
    ],
  },
  {
    slug: "react-aria",
    permission: {
      status: "granted",
      source: "https://github.com/adobe/react-spectrum",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "react-aria install and usage",
        url: "https://react-aria.adobe.com/getting-started",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "eel ComboBox DateField DatePicker DateRangePicker Disclosure DisclosureGroup DropZone FileTrigger Form GridList Group Link ListBox Menu Meter Modal NavigationTree NumberField Popover PreviewTrigger ProgressBar RadioGroup RangeCalendar SearchField Select Separator Sheet Slider Switch Table Tabs TagGroup TextField TimeField Toast ToggleButton ToggleButtonGroup TokenField Toolbar Tooltip Tree Virtualizer Guides Interactions Internationalized Utilities Getting started How to install React Aria and build your first component. Install Install React Aria with your preferred package manager. npm yarn pnpm npm install react-aria-components Quick start Copy and paste the CSS or Tailwind examples into your project and make them your own. You can also download each example as a ZIP, open in StackBlitz, or install with shadcn . Vanilla CSS Tailwind Theme Indigo Indigo Blue Cyan Turquoise Green Yellow Orange Red Pink Purple Favorite animal Select an item Aardvark Cat Dog Kangaroo Panda Snake Example Select.tsx Select.css Example Select.tsx Select.css import {Select, SelectItem} from './Select' ; &lt; Select label = \"Favorite animal\" &gt; &lt; SelectItem &gt;Aardvark&lt;/ SelectItem &gt; &lt; SelectItem &gt;Cat&lt;/ SelectItem &gt; &lt; SelectItem &gt;Dog&lt;/ SelectItem &gt; &lt; SelectItem &gt;Kangaroo&lt;/ SelectItem &gt; &lt; SelectItem &gt;Panda&lt;/ SelectItem &gt; &lt; SelectItem &gt;Snake&lt;/ SelectItem &gt; &lt;/ Select &gt; Expand code shadcn CLI Use the shadcn CLI to add the example code, styles, and dependencies to your project. Install individual components using the menu on each example, or add all components with the command below. npm yarn pnpm Vanilla CSS Tailwind npx shadcn@latest add @react-aria/css Storybook starter kits If you're building a full component library, download a pre-built Storybook starter kit. These include every component in a standalone development environment. Vanilla CSS Download ZIP Preview Tailwind CSS Download ZIP Preview Vanilla CSS (Hooks) Download ZIP Preview Working with AI Use the menu on each page in the docs to open or copy it into your favorite AI assistant. We also have an MCP server which can be used directly in your IDE, Agent Skills which can be installed in your project, and llms.txt which can help AI agents navigate the docs. Build a component from scratch In this tutorial, we'll build a custom Select component. Import and assemble the parts Each React Aria component renders a single DOM element. Complex components like Select compose together multiple parts to build a complete pattern. import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components/Select' ; &lt; Select &gt; &lt; Label &gt;Favorite Animal&lt;/ Label &gt; &lt; Button &gt; &lt; SelectValue /&gt; &lt;/ Button &gt; &lt; Popover &gt; &lt; ListBox &gt; &lt; ListBoxItem &gt;Cat&lt;/ ListBoxItem &gt; &lt; ListBoxItem &gt;Dog&lt;/ ListBoxItem &gt; &lt; ListBoxItem &gt;Kangaroo&lt;/ ListBoxItem &gt; &lt;/ Lis",
      }
    ],
  },
  {
    slug: "heroui",
    permission: {
      status: "granted",
      source: "https://github.com/heroui-inc/heroui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "heroui install and usage",
        url: "https://www.heroui.com/en/docs/react/getting-started/quick-start",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "e Styling Animation Composition UI for Agents LLMs.txt MCP Server Agent Skills Preview AGENTS.md Web Native HeroUI v 3.2.6 Search ⌘ K Theme 27.7k Getting Started Components Releases Migration Web Native Quick Start Quick Start Copy Prompt Copy Markdown Get started with HeroUI v3 in minutes Requirements React 19+ Tailwind CSS v4 Quick Install Prefer to let your AI assistant do it? Install the HeroUI MCP Server in your editor, then paste the prompt into your AI assistant — it will analyze your project and handle the entire setup for you. Copy Prompt Install HeroUI and required dependencies: npm pnpm yarn bun npm i @heroui/styles @heroui/react pnpm add @heroui/styles @heroui/react yarn add @heroui/styles @heroui/react bun add @heroui/styles @heroui/react Import Styles Add to your main CSS file globals.css : @import \"tailwindcss\" ; @import \"@heroui/styles\" ; Import order matters. Always import tailwindcss first. Use Components import { Button } from '@heroui/react' ; function App () { return ( &lt; Button &gt; My Button &lt;/ Button &gt; ); } What's Next? Themes - Create and share your own themes Browse Components - See all available components Learn Styling - Customize with Tailwind CSS Explore Patterns - Master compound components Introduction An open-source UI component library for building beautiful and accessible user interfaces. Design Principles Core principles that guide HeroUI v3's design and development On this page Requirements Quick Install Import Styles Use Components What's Next? Hero Newsletter Subscribe",
      }
    ],
  },
  {
    slug: "mantine",
    permission: {
      status: "granted",
      source: "https://github.com/mantinedev/mantine",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "mantine install and usage",
        url: "https://mantine.dev/guides/vite/",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "Form management library @mantine/dates Date inputs, calendars @mantine/charts Recharts based charts library @mantine/notifications Notifications system @mantine/code-highlight Code highlight with your theme colors and styles @mantine/tiptap Rich text editor based on Tiptap @mantine/dropzone Capture files with drag and drop @mantine/carousel Embla based carousel component @mantine/lightbox Full-screen media lightbox with carousel navigation @mantine/spotlight Overlay command center @mantine/modals Centralized modals manager @mantine/nprogress Navigation progress Install dependencies: yarn npm yarn add @mantine/core @mantine/hooks Expand code PostCSS setup Install PostCSS plugins and postcss-preset-mantine : yarn npm yarn add --dev postcss postcss-preset-mantine postcss-simple-vars Expand code Create a postcss.config.cjs file at the root of your application with the following content: module.exports = { plugins: { 'postcss-preset-mantine': {}, 'postcss-simple-vars': { variables: { 'mantine-breakpoint-xs': '36em', 'mantine-breakpoint-sm': '48em', 'mantine-breakpoint-md': '62em', 'mantine-breakpoint-lg': '75em', 'mantine-breakpoint-xl': '88em', }, }, }, }; Expand code Setup Add styles imports and MantineProvider to your application root component (usually App.tsx ): // Import styles of packages that you've installed. // All packages except `@mantine/hooks` require styles imports import '@mantine/core/styles.css'; import { MantineProvider } from '@mantine/core'; export default function App() { return &lt;MantineProvider&gt;{/* Your app here */}&lt;/MantineProvider&gt;; } Expand code All set! Start the development server: npm run dev Expand code Usage with Next.js Usage with React Router Welcome to Mantine, React components library that you always wished for Build fully functional accessible web applications faster than ever About OpenCollective Contribute Changelog GitHub Releases Community Chat on Discord Follow on X Follow on Github GitHub discussions Project Mantine UI Help Center Github organization npm organization Built by Vitaly Rtishchev and these awesome people Join Discord community Follow Mantine on X",
      }
    ],
  },
  {
    slug: "chakra-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/chakra-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "chakra-ui install and usage",
        url: "https://github.com/chakra-ui/chakra-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "f799e4d478d31fdae1311fad6c6de7cca47b9d3e",
        content: "## Installation\n\nTo use Chakra UI components, all you need to do is install the\n`@chakra-ui/react` package and its peer dependencies:\n\n```sh\n# with Yarn\n$ yarn add @chakra-ui/react @emotion/react\n\n# with npm\n$ npm i @chakra-ui/react @emotion/react\n\n# with pnpm\n$ pnpm add @chakra-ui/react @emotion/react\n\n# with Bun\n$ bun add @chakra-ui/react @emotion/react\n```\n\n## Usage\n\nRead the docs here: https://www.chakra-ui.com/docs/get-started/installation\n\n## Contributing\n\nRead the contribution guide here:\nhttps://www.chakra-ui.com/docs/get-started/contributing\n\n## Support Chakra UI\n\n### Organizations\n\nSupport this project with your organization. Your logo will show up here with a\nlink to your website.\n[[Contribute](https://opencollective.com/chakra-ui/contribute)]\n\n<a href=\"https://opencollective.com/chakra-ui/organization/0/website\"><img src=\"https://opencollective.com/chakra-ui/organization/0/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/1/website\"><img src=\"https://opencollective.com/chakra-ui/organization/1/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/2/website\"><img src=\"https://opencollective.com/chakra-ui/organization/2/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/3/website\"><img src=\"https://opencollective.com/chakra-ui/organization/3/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/4/website\"><img src=\"https://opencollective.com/chakra-ui/organization/4/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/5/website\"><img src=\"https://opencollective.com/chakra-ui/organization/5/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/6/website\"><img src=\"https://opencollective.com/chakra-ui/organization/6/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/7/website\"><img src=\"https://opencollective.com/chakra-ui/organization/7/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/8/website\"><img src=\"https://opencollective.com/chakra-ui/organization/8/avatar.svg?avatarHeight=130\" /></a>\n<a href=\"https://opencollective.com/chakra-ui/organization/9/website\"><img src=\"https://opencollective.com/chakra-ui/organization/9/avatar.svg?avatarHeight=130\" /></a>\n\n### Individuals\n\nBy donating \\$5 or more you can support the ongoing development of this project.\nWe'll appreciate some support. Thank you to all our supporters! 🙏\n[[Contribute](https://opencollective.com/chakra-ui/contribute)]\n\n<a href=\"https://opencollective.com/chakra-ui\"><img src=\"https://opencollective.com/chakra-ui/individuals.svg?width=890\" /></a>\n\n## Testimonials\n\n> People throw React component libraries and design systems at me regularly.\n> This might be the best one I've seen. The APIs are simple but composable and\n> the accessibility on the couple components I looked is complete.\n>\n> Great work @thesegunadebayo, really inspiring work. –\n> [Ryan Florence](https://twitter.com/ryanflorence)\n\n> Awesome new open-source component library from @thesegunadebayo. Really\n> impressive stuff! –\n> [Colm Tuite](https://twitter.com/colmtuite/status/1169622886052782081)\n\n> This is incredible work. Amazing job Segun! –\n> [Lee Robinson](https://twitter.com/leeerob/status/1169330130361159682)\n\n> Chakra UI is glorious! I love the consistent use of focus styling and the\n> subtle animation –\n> [Guillermo ▲](https://twitter.com/rauchg/status/1169632334389248000)\n\n## Awards and Mentions\n\nWe've been extremely humbled to receive awards and mentions from the community\nfor all the innovation and reach Chakra UI brings to the JavaScript ecosystem.\n\n<table>\n  <tr valign=\"middle\">\n    <td width=\"124\">\n      <img src=\"https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/tech-radar.png\" width=\"124\" alt=\"Technology Radar\" />\n    </td>\n    <td>\n      <h4>Solution Worth Pursuing</h4>\n      <p><em><a href=\"https://www.thoughtworks.com/radar/languages-and-frameworks/chakra-ui\">Technology Radar</a> (2020–2021)</em></p>\n    </td>\n  </tr>\n  <tr>\n    <td width=\"124\">\n      <img src=\"https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/os-awards.png\" width=\"124\" alt=\"Open Source Awards 2020\" />\n    </td>\n    <td>\n      <h4>The Most Impactful Contribution to the community</h4>\n      <p><em><a href=\"https://osawards.com/react/2020\">Open Source Awards</a> (2020)</em></p>\n    </td>\n  </tr>\n</table>\n\n## License\n\nMIT © [Segun Adebayo](https://github.com/segunadebayo)",
      }
    ],
  },
  {
    slug: "mui",
    permission: {
      status: "granted",
      source: "https://github.com/mui/material-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "mui install and usage",
        url: "https://mui.com/material-ui/getting-started/installation/",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "al UI and MUI X v9 are out! Check out the announcement blogpost. Search… Material UI v9.5.0 Getting started Overview Installation Usage MCP New llms.txt New Example projects Templates Learn Design resources FAQs Accessibility Supported components Supported platforms Support Versions Components Component API Customization How-to guides Integrations Experimental APIs Migration Discover more Design resources Template store + Installation Install Material UI, the world's most popular React UI framework. Default installation Run one of the following commands to add Material UI to your project: npm pnpm yarn npm install @mui/material @emotion/react @emotion/styled Peer dependencies Please note that react and react-dom are peer dependencies, meaning you should ensure they are installed before installing Material UI. \"peerDependencies\" : { \"react\" : \"^17.0.0 || ^18.0.0 || ^19.0.0\" , \"react-dom\" : \"^17.0.0 || ^18.0.0 || ^19.0.0\" } , Copy Copied (or C ) React 18 and below If you are using React 18 or below, you need to set up a resolution of react-is package to the same version as the react you are using. For example, if you are using react@18.3.1 , do the following steps: Install react-is@18.3.1 . npm pnpm yarn npm install react-is@18.3.1 Set the resolutions or overrides in the package.json . npm pnpm yarn { … \"overrides\" : { \"react-is\" : \"^18.3.1\" } } Why is this needed? Material UI uses react-is@19 , which changed how React elements are identified. If you&#39;re on React 18 or below, mismatched versions of react-is can cause runtime errors in prop type checks. Forcing react-is to match your React version prevents these errors. With styled-components Material UI uses Emotion as its default styling engine. If you want to use styled-components instead, run one of the following commands: npm pnpm yarn npm install @mui/material @mui/styled-engine-sc styled-components Next, follow the styled-components how-to guide to properly configure your bundler to support @mui/styled-engine-sc . As of late 2021, styled-components is not compatible with server-rendered Material UI projects. This is because babel-plugin-styled-components isn&#39;t able to work with the styled() utility inside @mui packages. See this GitHub issue for more details. We strongly recommend using Emotion for SSR projects. Roboto font Material UI uses the Roboto font by default. Add it to your project via Fontsource, or with the Google Fonts CDN. npm pnpm yarn npm install @fontsource/roboto Then you can import it in your entry point like this: import '@fontsource/roboto/300.css' ; import '@fontsource/roboto/400.css' ; import '@fontsource/roboto/500.css' ; import '@fontsource/roboto/700.css' ; Copy Copied (or C ) Fontsource can be configured to load specific subsets, weights and styles. Material UI&#39;s default typography configuration relies only on the 300, 400, 500, and 700 font weights. Google Web Fonts To install Roboto through the Google Web Fonts CDN, add the following code inside your pro",
      }
    ],
  },
  {
    slug: "ant-design",
    permission: {
      status: "granted",
      source: "https://github.com/ant-design/ant-design",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "ant-design install and usage",
        url: "https://ant.design/docs/react/introduce",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "ign Development Components Blog Resources 6.6.5 中 En Direction Icon Theme icon Ant Design of React Changelog v6.6.5 Basic Usage Getting Started Usage with Vite Usage with Next.js UPDATED Usage with Umi Usage with Rsbuild Usage with Farm Usage with Refine Others Sponsor AI For Agents NEW design.md NEW LLMs.txt NEW MCP Server NEW CLI NEW Advanced Customize Theme CSS Compatible Server Side Rendering Use custom date library Internationalization Common Props Migration From v5 to v6 Other Third-Party Libraries Contributing FAQ ✨ Features Environment Support Version Installation Using npm or yarn or pnpm or bun Import in Browser Usage Use modularized antd TypeScript Links Non-React Implementations Companies using antd Contributing Need Help? Ant Design of React Docs Edit this page LLMs.md Changelog Resources Ant Design X Ant Design Charts Ant Design Pro Pro Components Ant Design Mobile Ant Design Mini Ant Design Web3 Ant Design Landing - Landing Templates Scaffolds - Scaffold Market Umi - React Application Framework dumi - Component doc generator qiankun - Micro-Frontends Framework Ant Motion - Motion Solution China Mirror 🇨🇳 Community Awesome Ant Design Medium X Ant Design in YuQue Ant Design in Zhihu Experience Cloud Blog SEE Conf - Experience Tech Conference Help GitHub Change Log FAQ For Agents Bug Report Issues Discussions StackOverflow SegmentFault More Products YuQue - Document Collaboration Platform AntV - Data Visualization Egg - Enterprise Node.js Framework Kitchen - Sketch Toolkit Galacean - Interactive Graphics Solution WeaveFox - AI Development with WeaveFox 🦊 Ant Financial Experience Tech Theme Editor Made with ❤ by Ant Group and Ant Design Community Following the Ant Design specification, we developed a React UI library antd ( Pronunciation ) that contains a set of high quality components and demos for building rich, interactive user interfaces. + ✨ Features 🌈 Enterprise-class UI designed for web applications. 📦 A set of high-quality React components out of the box. 🛡 Written in TypeScript with predictable static types. ⚙️ Whole package of design resources and development tools. 🌍 Internationalization support for dozens of languages. 🎨 Powerful theme customization in every detail. Environment Support Modern browsers Server-side Rendering Electron Edge Firefox Chrome Safari Opera Electron Edge last 2 versions last 2 versions last 2 versions last 2 versions last 2 versions Dropped support of IE8 after antd 2.0 . Dropped support of React 15 and IE9/10 after antd 4.0 . Dropped support of IE after antd 5.0 . Dropped support of React 16/17 after antd 6.0 . Version Stable: You can subscribe to this feed for new version notifications: https://github.com/ant-design/ant-design/releases.atom Installation Using npm or yarn or pnpm or bun We recommend using npm or yarn or pnpm or bun to install , it not only makes development easier, but also allow you to take advantage of the rich ecosystem of JavaScript packages and tooling. npm icon npm yar",
      }
    ],
  },
  {
    slug: "daisyui",
    permission: {
      status: "granted",
      source: "https://github.com/saadeghi/daisyui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "daisyui install and usage",
        url: "https://daisyui.com/docs/install/",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "luxury dracula cmyk autumn business acid lemonade night coffee winter dim nord sunset caramellatte abyss silk Make your theme! EN English AR العربية BN বাংলা CA Català CS Čeština DE Deutsch EL Ελληνικά ES Español FA فارسی FR Français HE עברית HU Magyar ID Bahasa Indonesia IT Italiano JA 日本語 KO 한국어 MS Bahasa Melayu PL Polski PT Português RO Română RU Русский TR Türkçe UK Українська UR اردو VI Tiếng Việt ZH 简体中文 ZH 繁體中文 42k Install daisyUI as a Tailwind plugin How to install daisyUI as a Tailwind CSS plugin? You need Node.js and Tailwind CSS installed. 1. Install daisyUI as a Node package: NPM npm i -D daisyui@latest PNPM pnpm add -D daisyui@latest Yarn yarn add -D daisyui@latest Bun bun add -D daisyui@latest Deno deno i -D npm:daisyui@latest 2. Add daisyUI to app.css: @import \"tailwindcss\"; @plugin \"daisyui\"; Framework install tutorials See example setup of daisyUI and Tailwind CSS on different frameworks and build tools. Vite Tailwind CSS CLI Tailwind CSS Standalone without Node Post CSS SvelteKit Astro React Laravel Rails Next.js file_type_vue file_type_vue file_type_vue Vue Nuxt Elixir Phoenix Django Electron Angular Solid Solid Start Qwik HTMX WordPress Bun dev server",
      }
    ],
  },
  {
    slug: "flowbite",
    permission: {
      status: "granted",
      source: "https://github.com/themesberg/flowbite",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "flowbite install and usage",
        url: "https://github.com/themesberg/flowbite#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "232ebdb33a9e37b31b293b9988d89b862ee121e5",
        content: "#install-using-npm)\n  - [Include via CDN](#include-via-cdn)\n  - [Bundled JavaScript](#bundled-javascript)\n  - [Data attributes](#data-attributes)\n    - [Init functions](#init-functions)\n  - [ESM and CJS](#esm-and-cjs)\n  - [TypeScript](#typescript)\n  - [RTL support](#rtl-support)\n  - [JavaScript Frameworks](#javascript-frameworks)\n  - [Back-end Frameworks](#back-end-frameworks)\n- [Components](#components)\n- [Figma Design System](#figma-design-system)\n- [Flowbite Blocks](#flowbite-blocks)\n- [Flowbite Icons](#flowbite-icons)\n- [Flowbite GPT](#flowbite-gpt)\n- [Pro version](#pro-version)\n- [Hire us](#hire-us)\n- [Learn Design Concepts](#learn-design-concepts)\n- [Community](#community)\n- [Copyright and license](#copyright-and-license)\n\n## Documentation\n\nFor full documentation, visit [flowbite.com](https://flowbite.com/).\n\n## Getting started\n\nFlowbite can be included as a plugin into an existing Tailwind CSS project and it is supposed to help you build websites faster by having a set of web components to work with built with the utility classes from Tailwind CSS.\n\n### Install using NPM\n\nMake sure that you have <a href=\"https://nodejs.org/en/\" rel=\"nofollow\" target=\"_blank\">Node.js</a> and <a href=\"https://tailwindcss.com/docs/installation/using-postcss\" rel=\"nofollow\" target=\"_blank\">Tailwind CSS</a> installed. This guide works with Tailwind v4.\n\n1. Install Flowbite as a dependency using NPM by running the following command:\n\n```\nnpm install flowbite\n```\n\n2. Import the default theme variables from Flowbite inside your main `input.css` CSS file:\n\n```\n/* choose one of the following */\n\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');\n@import \"flowbite/src/themes/default\";\n\n/* MINIMAL THEME\n@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');\n@import \"flowbite/src/themes/minimal\";\n*/\n\n/* ENTERPRISE THEME\n@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap');\n@import \"flowbite/src/themes/enterprise\";\n*/\n\n/* PLAYFUL THEME\n@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap');\n@import \"flowbite/src/themes/playful\";\n*/\n\n/* MONO THEME\n@import \"flowbite/src/themes/mono\";\n*/\n```\n\n3. Import the Flowbite plugin file in your CSS:\n\n```\n@plugin \"flowbite/plugin\";\n```\n\n4. Configure the source files of Flowbite in your CSS:\n\n```\n@source \"../node_modules/flowbite\";\n```\n\n5. Include the JavaScript code that powers the interactive elements before the end of your `<body>` tag:\n\n```\n<script src=\"../path/to/flowbite/dist/flowbite.min.js\"></script>\n```\n\nLearn more about the Flowbite JavaScript API and functionalities in the [JavaScript section](https://flowbite.com/docs/getting-started/javascript/).\n\nIf you have and old project with Tailwind CSS v3 then [check out this guide](https://flowbite.com/docs/getting-started/quickstart/#tailwind-css-v3-to-v4) to learn how to upgrade to v4.\n\n### Include using CDN\n\nThe quickest way to get started working with Flowbite is to include the CSS and JS into your project via CDN.\n\nRequire the following minified stylesheet inside the `head` tag:\n\n```html\n<link href=\"https://cdn.jsdelivr.net/npm/flowbite@{{< current_version >}}/dist/flowbite.min.css\" rel=\"stylesheet\" />\n```\n\nAnd include the following JavaScript file before the end of the `body` element:\n\n```html\n<script src=\"https://cdn.jsdelivr.net/npm/flowbite@{{< current_version >}}/dist/flowbite.min.js\"></script>\n```\n\nPlease remember that the best way to work with Tailwind CSS and Flowbite is by purging the CSS classes.\n\n### Bundled JavaScript\n\nOne of the most popular way of using Flowbite is to include the bundled Javascript file which is UMD ready using a bundler such as Webpack or Parcel which makes sure that all of the data attributes and functionality will work out-of-the-box.\n\nYou can directly import the main JavaScript file inside your bundled `app-bundle.js` file like this:\n\n```javascript\nimport 'flowbite';\n```\n\nThis file has access to all of the components and it automatically applies event listeners to the data attributes.\n\n### Data attributes\n\nThe preferred way to use the interactive UI components from Flowbite is via the data attributes interface which allows us to add functionality via the HTML element attributes and most of the examples on our documentation applies this strategy.\n\nFor example, to set up a modal component all you need to do is use `data-modal-target` and `data-modal-{toggle|show|hide}` to toggle, show, or hide the component by clicking on any trigger element.\n\n```html\n<button data-modal-target=\"defaultModal\" data-modal-toggle=\"defaultModal\" class=\"block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\" type=\"button\">\n  Toggle mo",
      }
    ],
  },
  {
    slug: "preline",
    permission: {
      status: "granted",
      source: "https://github.com/htmlstreamofficial/preline",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "preline install and usage",
        url: "https://github.com/htmlstreamofficial/preline#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "05ca59998db345cfede649b00093032409b37f25",
        content: "### Install via npm\n\n1. Install `preline`:\n\n```bash\nnpm i preline\n```\n\n2. Import the Preline CSS variants file into your Tailwind CSS file after the `tailwindcss` import:\n\n```css\n@import \"tailwindcss\";\n\n/* Preline UI */\n@source \"./node_modules/preline/dist/*.js\";\n@import \"./node_modules/preline/variants.css\";\n\n/* Preline Themes */\n@import \"./themes/theme.css\";\n```\n\n3. Add the Preline JavaScript file near the end of your `<body>` tag:\n\n```html\n<script src=\"./node_modules/preline/dist/preline.js\"></script>\n```\n\nFor setup details, framework integration, and configuration guides, visit the [Preline documentation](https://preline.co/docs/).\n\n## 🤖 Agent Skills\n\nPreline UI includes [Agent Skills](https://preline.co/docs/agent-skills.html) for agentic coding tools such as Cursor, Claude Code, and Gemini CLI, making it easier to automate theme generation and UI workflows.\n\nInstall via CLI:\n\n```bash\nnpx skills add htmlstreamofficial/preline\n```\n\n## ♿ Accessibility\n\nPreline UI includes enterprise-grade accessibility built into its components, helping teams create more inclusive interfaces with accessible Tailwind CSS components, keyboard-friendly interactions, proper focus management, and stronger support for assistive technologies. Learn more in the dedicated [Accessibility documentation](https://preline.co/docs/accessibility.html).\n\n## 🧩 Headless Tailwind CSS Plugins\n\nExplore [headless Tailwind CSS plugins](https://preline.co/plugins/) for accessible UI behavior, interactions, forms, navigation, overlays, and productivity workflows.\n\n| Category | Plugin Pages |\n| --- | --- |\n| Disclosure | [Accordion](https://preline.co/plugins/accordion.html), [Collapse](https://preline.co/plugins/collapse.html), [Tree View](https://preline.co/plugins/tree-view.html) |\n| Navigations | [Tabs](https://preline.co/plugins/tabs.html), [Scrollspy](https://preline.co/plugins/scrollspy.html), [Scroll Nav](https://preline.co/plugins/scroll-nav.html), [Stepper](https://preline.co/plugins/stepper.html) |\n| Overlays | [Dropdown](https://preline.co/plugins/dropdown.html), [Overlay](https://preline.co/plugins/overlay.html), [Tooltip](https://preline.co/plugins/tooltip.html) |\n| Forms | [Select](https://preline.co/plugins/advanced-select.html), [ComboBox](https://preline.co/plugins/combobox.html), [Datepicker](https://preline.co/plugins/advanced-datepicker.html), [Range Slider](https://preline.co/plugins/advanced-range-slider.html), [Input Number](https://preline.co/plugins/input-number.html), [File Upload](https://preline.co/plugins/file-upload.html), [Strong Password](https://preline.co/plugins/strong-password.html), [Toggle Password](https://preline.co/plugins/toggle-password.html), [Toggle Count](https://preline.co/plugins/toggle-count.html), [Copy Markup](https://preline.co/plugins/copy-markup.html), [PIN Input](https://preline.co/plugins/pin-input.html), [Textarea Auto Height](https://preline.co/plugins/textarea-autoheight.html) |\n| Miscellaneous | [DataTable](https://preline.co/plugins/datatables.html), [Carousel](https://preline.co/plugins/carousel.html), [Layout Splitter](https://preline.co/plugins/layout-splitter.html), [Remove Element](https://preline.co/plugins/remove-element.html), [Theme Switch](https://preline.co/plugins/theme-switch.html) |\n\n## 🧱 Tailwind CSS Components\n\nBrowse [Tailwind CSS component docs](https://preline.co/docs/) across layout, base UI, forms, navigation, overlays, tables, and advanced integrations.\n\n| Category | Component Pages |\n| --- | --- |\n| Layout & Content | [Container](https://preline.co/docs/components/container.html), [Columns](https://preline.co/docs/components/columns.html), [Grid](https://preline.co/docs/components/grid.html), [Layout Splitter](https://preline.co/docs/components/layout-splitter.html), [Typography](https://preline.co/docs/components/typography.html), [Images](https://preline.co/docs/components/images.html), [Links](https://preline.co/docs/components/links.html), [Dividers & HR](https://preline.co/docs/components/dividers.html), [KBD](https://preline.co/docs/components/kbd.html), [Custom Scrollbar](https://preline.co/docs/components/custom-scrollbar.html) |\n| Base Components | [Accordion](https://preline.co/docs/components/accordion.html), [Alerts](https://preline.co/docs/components/alerts.html), [Avatar](https://preline.co/docs/components/avatar.html), [Avatar Group](https://preline.co/docs/components/avatar-group.html), [Badge](https://preline.co/docs/components/badge.html), [Blockquote](https://preline.co/docs/components/blockquote.html), [Buttons](https://preline.co/docs/components/buttons.html), [Button Group](https://preline.co/docs/components/button-group.html), [Card](https://preline.co/docs/components/card.html), [Chat Bubbles](https://preline.co/docs/components/chat-bubbles.html), [Carousel](https://preline.co/docs/components/carousel.html), [Collapse](https://preline.co/docs/components/collapse.html), [Datepicker](https://preline.co/docs/components/datepicker.html), [De",
      }
    ],
  },
  {
    slug: "hyperui",
    permission: {
      status: "granted",
      source: "https://github.com/markmead/hyperui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "hyperui install and usage",
        url: "https://github.com/markmead/hyperui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "2b5aebbc50d2c9ac89650f51b554f53895b4803c",
        content: "# HyperUI\n\nFree, open-source Tailwind CSS components for marketing sites, web apps, and eCommerce projects.\n\nBrowse components on [hyperui.dev](https://hyperui.dev), copy the markup, and paste it into your Tailwind CSS project.\n\n## Use HyperUI\n\nThere is no package to install.\n\n1. Find a component on [hyperui.dev](https://hyperui.dev).\n2. Copy the code.\n3. Paste it into your project.\n\n## Run the site locally\n\n```bash\npnpm install\npnpm dev\npnpm run css:component --watch\n```\n\nTo preview the blog styles, execute: `pnpm run css:blog`.\n\n## Contributing\n\nPlease open an issue first before starting work.\n\n- Contributing guide: [CONTRIBUTING.md](./CONTRIBUTING.md)\n- Full walkthrough: [How to contribute](https://www.hyperui.dev/blog/how-to-contribute)\n\n## License\n\n[MIT](./LICENSE)",
      }
    ],
  },
  {
    slug: "motion-primitives",
    permission: {
      status: "granted",
      source: "https://github.com/ibelick/motion-primitives",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "motion-primitives install and usage",
        url: "https://tailwindcss.com/docs/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "le, and reliable — with zero-runtime. Installation Using Vite Using PostCSS Tailwind CLI Framework Guides Play CDN Installing Tailwind CSS as a Vite plugin Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS. 01 Create your project Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite . Terminal npm create vite@latest my-project cd my-project 02 Install Tailwind CSS Install tailwindcss and @tailwindcss/vite via npm. Terminal npm install tailwindcss @tailwindcss/vite 03 Configure the Vite plugin Add the @tailwindcss/vite plugin to your Vite configuration. vite.config.ts import { defineConfig } from 'vite' import tailwindcss from '@tailwindcss/vite' export default defineConfig ( { plugins : [ tailwindcss () , ] , } ) 04 Import Tailwind CSS Add an @import to your CSS file that imports Tailwind CSS. CSS @import \"tailwindcss\" ; 05 Start your build process Run your build process with npm run dev or whatever command is configured in your package.json file. Terminal npm run dev 06 Start using Tailwind in your HTML Make sure your compiled CSS is included in the &lt;head&gt; (your framework might handle this for you) , then start using Tailwind’s utility classes to style your content. HTML &#x3C;! doctype html > &#x3C; html > &#x3C; head > &#x3C; meta charset = \"UTF-8\" > &#x3C; meta name = \"viewport\" content = \"width=device-width, initial-scale=1.0\" > &#x3C; link href = \"/src/style.css\" rel = \"stylesheet\" > &#x3C;/ head > &#x3C; body > &#x3C; h1 class = \"text-3xl font-bold underline\" > Hello world! &#x3C;/ h1 > &#x3C;/ body > &#x3C;/ html > Are you stuck? Setting up Tailwind with Vite can be a bit different across different build tools. Check our framework guides to see if we have more specific instructions for your particular setup. Explore our framework guides Tailwind CSS Documentation Playground Blog Showcase Resources Refactoring UI Headless UI Heroicons Hero Patterns Community GitHub X Tailwind CSS Documentation Playground Blog Showcase Resources Refactoring UI Headless UI Heroicons Hero Patterns Community GitHub X Copyright © 2026 Tailwind Labs Inc. · Trademark Policy",
      }
    ],
  },
  {
    slug: "animata",
    permission: {
      status: "granted",
      source: "https://github.com/codse/animata",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "animata install and usage",
        url: "https://github.com/codse/animata#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "36674e4e9cfdc0f237693d8b736a2bf41065ca1d",
        content: "#install-dependencies)\n     - [Create Utility Functions](#create-utility-functions)\n3. [Contributing](#contributing)\n4. [Authors](#authors)\n5. [License](#license)\n   \n## Introduction\n\n### What is Animata?\nWelcome to Animata, a free and open-source collection of hand-crafted animations, effects, and interactions that you can seamlessly integrate into your project with a simple copy and paste. The animations are built using TailwindCSS and React.js, so they can be easily customized to fit your project's design.\n\n### What is not Animata?\nAnimata is not a full-fledged UI library like Material-UI or Chakra-UI. It is a collection of animations and effects that you can use to enhance your project's design. You can also use Animata alongside other UI libraries or design systems (you will need to set up TailwindCSS for this).\n\n## Getting Started\nYou don't need to install it as a dependency instead you can simply copy and paste the code, as shadcn/ui, into your project. However, you still need to install the other dependency that the code needs.\n\n### Requirements\n- [TailwindCSS](https://tailwindcss.com/docs/installation): For styling.\n- [Framer Motion](https://www.framer.com/motion/) (Optional): For complex animations.\n- [Lucide Icons](https://lucide.dev/) or [Radix Icons](https://www.radix-ui.com/icons) (Optional): Use for icons, or replace with any other icon library or SVGs.\n\n### Setup Instructions\n#### Folder Structure (Recommended)\n\n```bash\n/\n  /components\n  /ui\n```\n\nwhere `/` is the root of your project, `/components` is where you keep your components and the project has been set up using paths in the `tsconfig.json` file.\n\n```json\n{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"./*\"]\n    }\n  }\n}\n```\n#### Install Dependencies\nInstall the required dependencies, if you haven't already:\n\n```sh\nnpm install tailwind-merge clsx lucide-react tailwindcss-animate\n```\n\nAdd `tailwindcss-animate` to plugins in `tailwind.config.js` file:\n\n```js\nmodule.exports = {\n  plugins: [require(\"tailwindcss-animate\")],\n};\n```\n\n### Create Utility Functions\nCreate utils.ts file in the libs folder and paste the following code:\n\n```ts\nimport { type ClassValue, clsx } from \"clsx\";\nimport { twMerge } from \"tailwind-merge\";\n \nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n```\n\n#### NOTE\n1. If you see something that has been imported but not mentioned in the documentation, then it is a dependency you need to install. If it starts with @/ then it is Animata's component else it is an external dependency. In such a case, you can submit a PR to update the documentation.\n2. If something is not working, the docs probably miss the tailwind.config.js updates. You can look for the entries that have been added to the tailwind.config.js in Animata's source code. You can create an issue or submit a PR to update the documentation.\n\n## Contributing\n\nContributions to Animata are always welcome!\n\n- 📥 Pull requests and 🌟 Stars are always welcome.\n- Read our [contributing guide](https://animata.design/docs/contributing) to get started,\n  or find us on [Discord](https://discord.gg/STYEh3UW), we will take the time to guide you.\n\n## Authors\nHeartfelt gratitude goes to each of you for your amazing contributions to this project. Your hard work, creativity, and dedication have been nothing short of incredible. Whether it was coding, debugging, testing, or sharing ideas, every effort made a significant difference.\n\n<section id=\"#Authors\"\n  <a href=\"https://github.com/codse/animata/graphs/contributors\">\n    <img src=\"https://contrib.rocks/image?repo=codse/animata&max=100\"/>\n  </a>\n</section>\n\n## License\n\nThis project is licensed under the MIT License. see the [LICENSE](https://github.com/codse/animata/blob/main/LICENSE.md) file for details.",
      }
    ],
  },
  {
    slug: "lucide",
    permission: {
      status: "granted",
      source: "https://github.com/lucide-icons/lucide",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "lucide install and usage",
        url: "https://lucide.dev/guide/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "Menu Return to top Sidebar Navigation Introduction What is Lucide? Version 1 Installation Framework React Overview Getting started Migration from v0 Migration from React Feather Basics Color Sizing Stroke width Advanced Typescript Accessibility Global styling With Lucide Lab Filled icons Aliased Names Combining icons Dynamic icon component Resources Accessibility in depth VSCode On this page Are you an LLM? You can read better optimized documentation at /guide/installation.md for this page in Markdown format Installation ​ Web ​ Implementation of the Lucide icon library for web applications. pnpm yarn npm bun deno sh pnpm add lucide sh yarn add lucide sh npm install lucide sh bun add lucide sh deno add lucide For more details, see the documentation . React ​ Implementation of the Lucide icon library for React applications. pnpm yarn npm bun deno sh pnpm add lucide-react sh yarn add lucide-react sh npm install lucide-react sh bun add lucide-react sh deno add lucide-react For more details, see the documentation . For React Native use the lucide-react-native package. Vue ​ Implementation of the Lucide icon library for Vue applications. pnpm yarn npm bun deno sh pnpm add @lucide/vue sh yarn add @lucide/vue sh npm install @lucide/vue sh bun add @lucide/vue sh deno add @lucide/vue For more details, see the documentation . Svelte ​ Implementation of the Lucide icon library for Svelte applications. pnpm yarn npm bun deno sh pnpm add @lucide/svelte sh yarn add @lucide/svelte sh npm install @lucide/svelte sh bun add @lucide/svelte sh deno add @lucide/svelte @lucide/svelte is only for Svelte 5, for Svelte 4 use the lucide-svelte package. For more details, see the documentation . Solid ​ Implementation of the Lucide icon library for Solid applications. pnpm yarn npm bun deno sh pnpm add lucide-solid sh yarn add lucide-solid sh npm install lucide-solid sh bun add lucide-solid sh deno add lucide-solid @lucide/solid is for Solid 2, for Solid 1 use the lucide-solid package. Solid 2 is still a release candidate. For more details, see the documentation . Angular ​ Implementation of the Lucide icon library for Angular applications. pnpm yarn npm bun deno sh pnpm add @lucide/angular sh yarn add @lucide/angular sh npm install @lucide/angular sh bun add @lucide/angular sh deno add @lucide/angular For more details, see the documentation . Preact ​ Implementation of the Lucide icon library for preact applications. pnpm yarn npm bun deno sh pnpm add lucide-preact sh yarn add lucide-preact sh npm install lucide-preact sh bun add lucide-preact sh deno add lucide-preact For more details, see the documentation . Astro ​ Implementation of the Lucide icon library for Astro applications. pnpm yarn npm bun deno sh pnpm add @lucide/astro sh yarn add @lucide/astro sh npm install @lucide/astro sh bun add @lucide/astro sh deno add @lucide/astro For more details, see the documentation . Static usage ​ Implementation of the Lucide icon library for multiple usages that like to use: SV",
      }
    ],
  },
  {
    slug: "recharts",
    permission: {
      status: "granted",
      source: "https://github.com/recharts/recharts",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "recharts install and usage",
        url: "https://github.com/recharts/recharts#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "d9562fc605c811a9596fdf2582b82cc954a3f061",
        content: "## Installation\n\n### npm\n\nNPM is the easiest and fastest way to get started using Recharts. It is also the recommended installation method when building single-page applications (SPAs). It pairs nicely with a CommonJS module bundler such as Webpack.\n\n```sh\n# latest stable\n$ npm install recharts react-is\n```\n\n`react-is` needs to match the version of your installed `react` package.\n\n### Deno\n\nDeno is a drop-in replacement for npm, so Recharts installs the same way:\n\n```sh\n$ deno add recharts react-is\n```\n\n### umd\n\nThe UMD build is also available on unpkg.com:\n\n```html\n<script src=\"https://unpkg.com/react@18/umd/react.production.min.js\"></script>\n<script src=\"https://unpkg.com/react-dom@18/umd/react-dom.production.min.js\"></script>\n<script src=\"https://unpkg.com/react-is@18/umd/react-is.production.min.js\"></script>\n<script src=\"https://unpkg.com/recharts/umd/Recharts.js\"></script>\n```\n\nThen you can find the library on `window.Recharts`.\n\n## Contributing\n\nRecharts is open source. If you want to contribute to the project, please read the [CONTRIBUTING.md](/CONTRIBUTING.md)\nto understand how to contribute to the project and [DEVELOPING.md](/DEVELOPING.md) to set up your development\nenvironment.\n\n## Thanks\n\n<a href=\"https://www.chromatic.com/\"><img src=\"https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png\" width=\"153\" height=\"30\" alt=\"Chromatic\" /></a>\n\nThanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.\n\n[![JetBrains logo.](https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.svg)](https://jb.gg/OpenSourceSupport)\n\nThanks to JetBrains for providing OSS development license for their IDEs.\n\nBrowser testing via\n\n[![TestMu AI](www/public/assets/testmu-logo-black.svg)](https://www.testmuai.com/?utm_medium=sponsor&utm_source=recharts)\n\n## License\n\n[MIT](http://opensource.org/licenses/MIT)\n\nCopyright (c) 2015-2026 Recharts Group.",
      }
    ],
  },
  {
    slug: "tremor",
    permission: {
      status: "granted",
      source: "https://github.com/tremorlabs/tremor",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "tremor install and usage",
        url: "https://www.tremor.so/docs/getting-started/installation/next",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "box Date Picker Date Range Picker Dropdown Menu Input Label Radio Card Group Radio Group Select Select Native Slider Switch Textarea Toggle UI Accordion Badge Button Callout Card Dialog Divider Drawer Popover Table Tabs TabNavigation Toast Tooltip Utilities chartUtils cx focusInput hasErrorInput focusRing Getting Started Next.js Everything you need to set up Tremor with Next.js. Installation Tremor is designed for React and requires React v18.2.0+ 1 Create a new Next.js project: In our terminal, we create a new Next.js project. Stick to Tailwind CSS, use the src/ directory and the app router. npx create-next-app@14.2.28 my-project --ts --tailwind --eslint --app --src-dir && cd my-project Next 14 will come with Tailwind v3 preinstalled, so we have to update to version 4, run: npx @tailwindcss/upgrade 2 Install dependencies: To install the core dependencies, run: npm install tailwind-variants clsx tailwind-merge @remixicon/react (Optional) If you plan to use all components, you can add all dependencies here: npm install @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-toggle-group @radix-ui/react-toggle @internationalized/date date-fns@3.6.0 react-day-picker@8.10.1 recharts @react-aria/datepicker @react-stately/datepicker 3 Add font and dark mode background: In all our examples, we use Geist Font . This is not required, use any other font you like. To install, run: npm install geist Then in your app/layout.tsx , add the font and dark mode background like this: import type { Metadata } from \"next\" ; import { GeistSans } from \"geist/font/sans\" ; // import font import \"./globals.css\" ; export const metadata : Metadata = { title : \"Create Next App\" , description : \"Generated by create next app\" , } ; export default function RootLayout ( { children , } : Readonly &lt; { children : React . ReactNode ; } &gt; ) { return ( // add font to className, also add antialiased and dark mode &lt; html lang = \" en \" className = { ` ${ GeistSans . className } antialiased dark:bg-gray-950 ` } &gt; &lt; body &gt; { children } &lt;/ body &gt; &lt;/ html &gt; ) ; } 4 Install @tailwindcss/forms To install, run: npm install -D @tailwindcss/forms 5 Update globals.css In order for the animations to be applied correctly, we extend the globals.css . We also import the @tailwindcss/forms plugin. Show more @import \"tailwindcss\" ; @plugin \"@tailwindcss/forms\" ; @custom-variant dark ( & : where ( .dark , .dark * ) ) ; @theme { --animate-hide : hide 150 ms cubic-bezier ( 0.16 , 1 , 0.3 , 1 ) ; --animate-slide-down-and-fade : slideDownAndFade 150 ms cubic-bezier ( 0.16 , 1 , 0.3 , 1 ) ; --animate-slide-left-and-fade : slideLeftA",
      }
    ],
  },
  {
    slug: "react-three-fiber",
    permission: {
      status: "granted",
      source: "https://github.com/pmndrs/react-three-fiber",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "react-three-fiber install and usage",
        url: "https://r3f.docs.pmnd.rs/getting-started/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "Installation - React Three Fiber r3f React Three Fiber Search for anything Press / to search Toggle Sidebar 33k getting started Installation Your first scene Examples Community R3F Components api advanced tutorials development v9.8.1-50-gd604b18b master Installation Copy Page Learn how to install react-three-fiber pnpm npm yarn bun pnpm add three @react-three/fiber Warning Fiber is compatible with React v18 and v19 and works with ReactDOM and React Native. Fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19. Getting started with React Three Fiber is not nearly as hard as you might have thought, but various frameworks may require particular attention. We've put together guides for getting started with each popular framework: Vite.js Next.js CDN w/o build tools React Native If you just want to give it a try, fork this example on codesandbox ! Vite.js vite will also work out of the box. # Create app npm create vite my-app # Select react as framework # Install dependencies cd my-app npm install three @react-three/fiber # Start development server npm run dev Next.js It should work out of the box but you will encounter untranspiled add-ons in the three.js ecosystem, in that case, Next.js 13.1 or latest version You need to add three to transpilePackages property in next.config.js : transpilePackages : [ 'three' ] , Next.js 13.0 or oldest version You can install the next-transpile-modules module: pnpm npm yarn bun pnpm add next-transpile-modules --save-dev then, add this to your next.config.js const withTM = require ( 'next-transpile-modules' ) ( [ 'three' ] ) module . exports = withTM ( ) Make sure to check out our official next.js starter , too! Without build tools You can use React Three Fiber with browser-ready ES Modules from esm.sh and a JSX-like syntax powered by htm . import ReactDOM from 'https://esm.sh/react-dom' import React , { useRef , useState } from 'https://esm.sh/react' import { Canvas , useFrame } from 'https://esm.sh/@react-three/fiber' import htm from 'https://esm.sh/htm' const html = htm . bind ( React . createElement ) ReactDOM . render ( html ` &lt; ${ Canvas } &gt; ...&lt;//&gt; ` , document . getElementById ( 'root' ) ) Full example import ReactDOM from 'https://esm.sh/react-dom' import React , { useRef , useState } from 'https://esm.sh/react' import { Canvas , useFrame } from 'https://esm.sh/@react-three/fiber' import htm from 'https://esm.sh/htm' const html = htm . bind ( React . createElement ) function Box ( props ) { const meshRef = useRef ( ) const [ hovered , setHover ] = useState ( false ) const [ active",
      }
    ],
  },
  {
    slug: "shadcn-svelte",
    permission: {
      status: "granted",
      source: "https://github.com/huntabyte/shadcn-svelte",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "shadcn-svelte install and usage",
        url: "https://www.shadcn-svelte.com/docs/migration/tailwind-v4",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "v4 by following the official upgrade guide: https://tailwindcss.com/docs/upgrade-guide Use the @tailwindcss/upgrade codemod to remove deprecated utility classes and update the tailwind config. 2. Replace PostCSS with Vite # The upgrade script will automatically migrate your project to the latest PostCSS configuration of Tailwind v4, but the Tailwind team recommends using Vite instead, so we'll use that instead. Delete postcss.config.js # postcss.config.js - export default &#123; - plugins: &#123; - '@tailwindcss/postcss': &#123;&#125;, - &#125; - &#125;; Copy Uninstall @tailwindcss/postcss # pnpm npm yarn bun pnpm remove @tailwindcss/postcss npm uninstall @tailwindcss/postcss yarn remove @tailwindcss/postcss bun remove @tailwindcss/postcss Copy Install @tailwindcss/vite # pnpm npm yarn bun pnpm i @tailwindcss/vite -D npm i @tailwindcss/vite -D yarn install @tailwindcss/vite -D bun install @tailwindcss/vite -D Copy Update vite.config.ts # vite.config.ts import &#123; sveltekit &#125; from '@sveltejs/kit/vite'; import &#123; defineConfig &#125; from 'vite'; + import tailwindcss from '@tailwindcss/vite'; export default defineConfig(&#123; - plugins: [sveltekit()], + plugins: [tailwindcss(), sveltekit()], &#125;); Copy Verify the upgrade # Start your dev server and verify that all your styles are working as expected. pnpm npm yarn bun pnpm run dev npm run dev yarn run dev bun run dev Copy 2. Update your app.css file # The codemod will update your app.css file to look something like this, where it's defining the colors as CSS variables and importing your existing tailwind.config.ts file: @import \"tailwindcss\" ; @config \"../tailwind.config.ts\"; /* The default border color has changed to &#96;currentcolor&#96; in Tailwind CSS v4, so we've added these compatibility styles to make sure everything still looks the same as it did with Tailwind CSS v3. If we ever want to remove these styles, we need to add an explicit border color utility to any element that depends on these defaults. */ @layer base &#123; * , ::after , ::before , ::backdrop , :: file-selector-button &#123; border-color : var ( --color-gray-200 , currentcolor ); &#125; &#125; @layer base &#123; :root &#123; --background : 0 0 % 100 % ; --foreground : 240 10 % 3.9 % ; --muted : 240 4.8 % 95.9 % ; --muted-foreground : 240 3.8 % 46.1 % ; --popover : 0 0 % 100 % ; --popover-foreground : 240 10 % 3.9 % ; --card : 0 0 % 100 % ; --card-foreground : 240 10 % 3.9 % ; --border : 240 5.9 % 90 % ; --input : 240 5.9 % 90 % ; --primary : 240 5.9 % 10 % ; --primary-foreground : 0 0 % 98 % ; --secondary : 240 4.8 % 95.9 % ; --secondary-foreground : 240 5.9 % 10 % ; --accent : 240 4.8 % 95.9 % ; --accent-foreground : 240 5.9 % 10 % ; --destructive : 0 72.2 % 50.6 % ; --destructive-foreground : 0 0 % 98 % ; --ring : 240 10 % 3.9 % ; --radius : 0.5 rem ; --sidebar : 0 0 % 98 % ; --sidebar-foreground : 240 5.3 % 26.1 % ; --sidebar-primary : 240 5.9 % 10 % ; --sidebar-primary-foreground : 0 0 % 98 % ; --sidebar-",
      }
    ],
  },
  {
    slug: "primevue",
    permission: {
      status: "granted",
      source: "https://github.com/primefaces/primevue",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "uselayouts",
    permission: {
      status: "granted",
      source: "https://github.com/iurvish/uselayouts",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "uselayouts install and usage",
        url: "https://github.com/iurvish/uselayouts#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "07cc4f4fb8e064643168e6fc8792127af92637f5",
        content: "## Installation\n\nYou can add components to your project using the Shadcn CLI:\n\n```bash\nnpx shadcn@latest add https://uselayouts.com/r/3d-book\n```\n\nReplace `3d-book` with any component name from our [documentation](https://uselayouts.com/docs/introduction).\n\n## Features\n\n- **Accessible**: Built on top of accessible primitives.\n- **Customizable**: Fully stylable with Tailwind CSS classes.\n\n## Development\n\nIf you'd like to run the documentation site locally:\n\n1. Clone the repository:\n   ```bash\n   git clone https://github.com/iurvish/uselayouts.git\n   ```\n2. Install dependencies:\n   ```bash\n   yarn install\n   ```\n3. Run the development server:\n   ```bash\n   yarn dev\n   ```\n\n## Registry Build\n\nTo build the component registry:\n\n```bash\nyarn build:registry\n```\n\n## Community\n\n- **Website**: [uselayouts.com](https://uselayouts.com)\n- **Twitter/X**: [@0xUrvish](https://x.com/0xUrvish)\n- **GitHub**: [iurvish/uselayouts](https://github.com/iurvish/uselayouts)\n\n## License\n\nBuilt by [Urvish Mali](https://x.com/0xUrvish).\nLicensed under the [MIT License](LICENSE).",
      }
    ],
  },
  {
    slug: "nexvyn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/Nexvyn/Nexvyn-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "nexvyn-ui install and usage",
        url: "https://github.com/Nexvyn/Nexvyn-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "adece02509e44175c8a342ac0b1994cbb66e09c9",
        content: "## Install\n\nAdd the registry to your project:\n\n```bash\npnpm dlx shadcn@latest registry add @nexvyn\n```\n\nThen install any component:\n\n```bash\npnpm dlx shadcn@latest add @nexvyn/bounce-sidebar\npnpm dlx shadcn@latest add @nexvyn/goo-dropdown\n```\n\nOr install directly without adding the registry:\n\n```bash\npnpm dlx shadcn@latest add https://ui.nexvyn.dev/r/bounce-sidebar.json\n```\n\nDependencies resolve automatically. Motion animations require the `motion` package.\n\n## What makes these different\n\n- **Motion as information** - transitions make state changes legible, nothing moves for decoration\n- **Spring physics** - springs replace fixed durations, adapting naturally to interruption\n- **Drop-in compatible** - your existing shadcn theme and tokens apply automatically\n- **Original implementations** - all components built from scratch with no copied code\n\n## Tech stack\n\n[![Tech stack](https://skillicons.dev/icons?i=nextjs,react,ts,tailwindcss,pnpm&theme=light)](https://skillicons.dev)\n\n- Motion for animations\n- Radix UI primitives\n- shadcn/ui registry protocol\n- Prettier for formatting\n\n## Scripts\n\n```bash\npnpm dev             # Start dev server\npnpm build           # Production build\npnpm build:registry  # Generate registry JSON files from source\npnpm format          # Format code with Prettier\npnpm format:check    # Check formatting without writing\npnpm lint            # Run ESLint\n```\n\n## License\n\nAll installable components (`components/ui/**`) and everything else in this\nrepository, including what ships through the shadcn registry, are licensed under\n[MIT with the Commons Clause](LICENSE):\n\n- Use the components in personal and commercial products, including paid apps\n  and client work.\n- Keep the copyright and license notice in the source files you copy\n  (attribution). No visible credit in your product is required.\n- Do not sell the components themselves, for example as a UI kit, component\n  library, template, or any product whose value comes mainly from them.\n\n**Exception:** the wireframe/anatomy diagram source in `components/diagrams/**`\nand its shared drawing primitives (`components/diagrams/lib/diagram-parts.tsx`,\n`components/diagrams/lib/anatomy-parts.tsx`) are licensed separately under\nCC BY-NC 4.0 see [`components/diagrams/LICENSE`](components/diagrams/LICENSE).\nThese files are documentation-site assets only; they are never included in\nany component's registry files and are not shipped to consumers who install\na component via the CLI.",
      }
    ],
  },
  {
    slug: "cult-ui",
    permission: {
      status: "granted",
      source: "https://github.com/nolly-studio/cult-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "cult-ui install and usage",
        url: "https://github.com/nolly-studio/cult-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "67a66c6ac1cd240914ba688a907611b3437a7a2b",
        content: "## Install\n\nEvery component is a shadcn/ui registry item. The CLI copies the source into your project, so you own the code.\n\n```bash\nnpx shadcn@latest add https://www.cult-ui.com/r/shift-card.json\n```\n\nOr register the namespace once in `components.json` and install by name:\n\n```json\n{\n  \"registries\": {\n    \"@cult-ui\": \"https://www.cult-ui.com/r/{name}.json\"\n  }\n}\n```\n\n```bash\nnpx shadcn@latest add @cult-ui/shift-card\n```\n\nComponents use Tailwind CSS v4 and shadcn theme tokens, and most animate with [Motion](https://motion.dev). Each docs page lists its dependencies.\n\n## Just added\n\n**58 new components.** Illustrations, device mockups, cards and more, with the same docs and one-line install as the rest of Cult UI.\n\n<table>\n  <tr>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/globe\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/globe-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/globe-demo-light.png\" alt=\"Globe component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/globe\">Globe</a>\n    </td>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/kanban-board\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/kanban-board-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/kanban-board-demo-light.png\" alt=\"Kanban board component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/kanban-board\">Kanban board</a>\n    </td>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/fluted-glass\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/fluted-glass-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/fluted-glass-demo-light.png\" alt=\"Fluted glass component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/fluted-glass\">Fluted glass</a>\n    </td>\n  </tr>\n  <tr>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/mac-screen\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/mac-screen-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/mac-screen-demo-light.png\" alt=\"Mac screen component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/mac-screen\">Mac screen</a>\n    </td>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/analytics-chart\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/analytics-chart-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/analytics-chart-demo-light.png\" alt=\"Analytics chart component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/analytics-chart\">Analytics chart</a>\n    </td>\n    <td width=\"33%\">\n      <a href=\"https://www.cult-ui.com/docs/components/folded-card\">\n        <picture>\n          <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/folded-card-demo-dark.png\">\n          <img src=\"https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/folded-card-demo-light.png\" alt=\"Folded card component preview\">\n        </picture>\n      </a>\n      <br><a href=\"https://www.cult-ui.com/docs/components/folded-card\">Folded card</a>\n    </td>\n  </tr>\n</table>\n\n[Browse all components →](https://www.cult-ui.com/docs/components/dynamic-island)\n\n## Built with Cult UI\n\n**The components are free. The full-stack AI apps built from them are [AI SDK Agents](https://aisdkagents.com/?utm_source=cult-ui&utm_medium=github&utm_content=readme-section-link).** Agent patterns on the Vercel AI SDK with live previews. Install with shadcn, download a Next.js app, or open in v0.\n\n<table>\n  <tr>\n    <td width=\"33%\" valign=\"top\">\n      <a href=\"https://aisdkagents.com/patterns/example-agent-competitor?utm_sourc",
      }
    ],
  },
  {
    slug: "spell-ui",
    permission: {
      status: "granted",
      source: "https://github.com/xxtomm/spell-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "spell-ui install and usage",
        url: "https://spell.sh/docs/mcp",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "potify Card Logos Carousel QR Code Fallback Avatar Text Animations Blur Reveal Special Text Shimmer Text Highlighted Text Slide Up Text Text Marquee Words Stagger Signature Randomized Text Gradient Wave Text Buttons Rich Button Flow Button Copy Button Pop Button Inputs Color Selector Label Input Animated Checkbox Exploding Input Feedback Spinner Bars Spinner Backgrounds Light Rays Animated Gradient Interactive Tilt Card Docs MCP MCP Integrating MCP with Spell UI lets you control it via AI. Copy this page Installation Enable MCP in your project environment. (Supports Claude Code, Cursor, etc.) pnpm npm yarn bun Copy pnpm dlx shadcn@latest mcp init Add the registry to your project Add the following to your components.json file: { \"registries\" : { \"@spell\" : \"https://spell.sh/r/{name}.json\" } } Usage You can now ask your IDE to use any Spell UI component. Here are some examples: \"Add a badge component\" \"Add a blur reveal animation\" \"Add a vertical marquee of logos\" Previous Components Next Chart On This Page Installation Usage Edit this page X Follow @tomm_ui Discord Join community",
      }
    ],
  },
  {
    slug: "rare-ui",
    permission: {
      status: "granted",
      source: "https://github.com/swamimalode07/rare-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "rare-ui install and usage",
        url: "https://github.com/swamimalode07/rare-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "b4de46efe4eb2613e22bb8134b482ed4e0c7736a",
        content: "## Quick start\n\nInstall any component with the shadcn CLI:\n\n```bash\nnpx shadcn@latest add swamimalode07/rare-ui/{component-name}\n```\n\nFor example:\n\n```bash\nnpx shadcn@latest add swamimalode07/rare-ui/fluid-orb\n```\n\nBrowse every component, with live previews and props, at [rareui.com/components](https://rareui.com/components).\n\n## MCP (Claude Code, Cursor, Codex)\n\nIn your project, add this to `components.json`:\n\n```json\n{\n  \"registries\": {\n    \"@rare-ui\": \"https://raw.githubusercontent.com/swamimalode07/rare-ui/main/public/r/{name}.json\"\n  }\n}\n```\n\nThen:\n\n```bash\nnpx shadcn@latest mcp init --client claude\n# or: --client cursor | vscode\n```\n\nAsk: `add @rare-ui/fluid-orb`\n\nOr just: `Add the fluid orb from Rare UI`\n\nNot `add fluid-orb` on its own. That looks in the default shadcn registry.\n\nFull steps: [rareui.com/mcp](https://rareui.com/mcp).\n\n## Running locally\n\n```bash\ngit clone https://github.com/swamimalode07/rare-ui.git\ncd rare-ui\nnpm install\nnpm run dev\n```\n\nComponents live in `components/ui`. After changing a component or `registry.json`, rebuild the registry output with `npm run registry:build`.\n\n## Contributing\n\nIssues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full walkthrough, from creating a component to a working install command.\n\n## License\n\nMIT with the [Commons Clause and an attribution requirement](LICENSE). Use, modify and ship the components in anything you build, personal or commercial, closed source included.\n\nCredit is required. Any project shipping a Rare UI component must credit Rare UI with a visible link to [rareui.com](https://rareui.com), in a footer, an about page, a credits screen or a README, and must keep the credit and copyright notice in the source it copied.\n\nYou may not sell, sublicense or redistribute the components themselves, alone, in a bundle, or ported to another framework.\n\nThe name Rare UI, the logo and the site design are not covered by the license.\n\n<div align=\"center\">\n  <br />\n  <img src=\"public/logos/Rareui.svg\" alt=\"\" width=\"28\" />\n  <p><sub>Built by <a href=\"https://x.com/swamimalode\">@swamimalode</a></sub></p>\n</div>",
      }
    ],
  },
  {
    slug: "obsidian-ui",
    permission: {
      status: "granted",
      source: "https://github.com/Atharvsinh-codez/ObsidianUI",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "obsidian-ui install and usage",
        url: "https://github.com/Atharvsinh-codez/ObsidianUI#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "0b96262a414f9e35b0e5c53b17fcf4a48fe9b269",
        content: "## Quick start\n\nChoose a component from the [showcase](https://www.obsidianui.dev/components), then install it with the shadcn CLI. For example:\n\n```bash\nnpx shadcn@latest add \"https://www.obsidianui.dev/r/hover-img.json\"\n```\n\nFor the interactive prism:\n\n```bash\nnpx shadcn@latest add \"https://www.obsidianui.dev/r/v-prism.json\"\n```\n\nEach component page includes a preview, installation steps, and source files. Install the listed dependencies when copying files manually.\n\n## Running locally\n\n```bash\ngit clone https://github.com/Atharvsinh-codez/ObsidianUI.git\ncd ObsidianUI\nnpm ci\nnpm run dev\n```\n\nOpen [localhost:3000](http://localhost:3000) in your browser.\n\n- **Primitives:** `src/components/ui`\n- **Blocks and effects:** `src/components/block`\n- **Documentation:** `src/content`\n\nAfter updating a component or registry source, rebuild the registry output with `npm run registry:build`.\n\n## Commands\n\n| Command | Purpose |\n| --- | --- |\n| `npm run dev` | Start the local development server |\n| `npm run build` | Build the production site, registry manifests, and search index |\n| `npm run registry:build` | Rebuild installation manifests from component sources |\n| `npm run agent:build` | Rebuild `llms.txt`, Markdown pages, and agent route maps |\n| `npm run mcp` | Launch local Model Context Protocol (MCP) server over stdio |\n| `npm run lint` | Run ESLint check |\n| `npm run typecheck` | Run TypeScript verification |\n| `npm test` | Run unit and component test suites |\n| `npm run check` | Run lint, types, tests, and production build |\n\n## Star History\n\n<a href=\"https://www.star-history.com/?repos=atharvsinh-codez%2Fobsidianui&type=date&legend=top-left\">\n  <picture>\n    <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://api.star-history.com/chart?repos=atharvsinh-codez/obsidianui&type=date&theme=dark&legend=top-left\" />\n    <source media=\"(prefers-color-scheme: light)\" srcset=\"https://api.star-history.com/chart?repos=atharvsinh-codez/obsidianui&type=date&legend=top-left\" />\n    <img alt=\"Star History Chart\" src=\"https://api.star-history.com/chart?repos=atharvsinh-codez/obsidianui&type=date&legend=top-left\" />\n  </picture>\n</a>\n\n## Contributing\n\nIssues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full walkthrough, from creating a component to a working install command.\n\n## License\n\nObsidianUI is released under the [MIT License](LICENSE).\n\n<div align=\"center\">\n  <br />\n  <img src=\"https://cdn-new.obsidianui.dev/logo/bg-less.png\" alt=\"ObsidianUI\" width=\"28\" />\n  <p><sub>Built by <a href=\"https://x.com/athrix_codes\">@athrix_codes</a></sub></p>\n</div>",
      }
    ],
  },
  {
    slug: "ark-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/ark",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "ark-ui install and usage",
        url: "https://github.com/chakra-ui/ark#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "b94f858a97e3bf8c65b5df3510aac693c0799487",
        content: "#installation\">Installation</a> •\n  <a href=\"#features\">Features</a> •\n  <a href=\"#components\">Components</a> •\n  <a href=\"https://ark-ui.canny.io/\">Roadmap</a> •\n  <a href=\"CONTRIBUTING.md\">Contributing</a>\n</p>\n\n<br />\n\n## Overview\n\nArk UI is a headless component library that provides the foundation for building high-quality, accessible design systems\nand web applications. Built on top of [Zag.js](https://zagjs.com) state machines, Ark UI delivers robust,\nframework-agnostic component logic with perfect parity across **React**, **Solid**, **Vue**, and **Svelte**.\n\n### Why Ark UI?\n\n- **🎨 Completely Unstyled** - Zero styling opinions. Bring your own styles with CSS-in-JS, Tailwind, vanilla CSS, or\n  any styling solution\n- **♿️ Accessibility First** - WCAG compliant components tested with real assistive technologies out of the box\n- **🔄 State Machine Powered** - Predictable, testable behavior powered by Zag.js finite state machines\n- **🌍 Multi-Framework** - Same API across React, Solid, Vue, and Svelte - write once, use everywhere\n- **📦 Truly Composable** - Granular component primitives that work together seamlessly\n- **⚡️ Production Ready** - Battle-tested in products like Chakra UI, used by teams at OVHCloud, PluralSight, and more\n- **🎯 Type-Safe** - Fully typed with TypeScript for exceptional developer experience\n\n## Installation\n\nChoose your framework and install the corresponding package:\n\n```bash\n# React\nnpm install @ark-ui/react\n\n# Solid\nnpm install @ark-ui/solid\n\n# Vue\nnpm install @ark-ui/vue\n\n# Svelte\nnpm install @ark-ui/svelte\n```\n\n## Quick Start\n\nHere's a simple example showing how consistent the API is across frameworks:\n\n### React\n\n```tsx\nimport { Dialog } from '@ark-ui/react/dialog'\n\nexport const MyDialog = () => (\n  <Dialog.Root>\n    <Dialog.Trigger>Open Dialog</Dialog.Trigger>\n    <Dialog.Backdrop />\n    <Dialog.Positioner>\n      <Dialog.Content>\n        <Dialog.Title>Dialog Title</Dialog.Title>\n        <Dialog.Description>Dialog description</Dialog.Description>\n        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>\n      </Dialog.Content>\n    </Dialog.Positioner>\n  </Dialog.Root>\n)\n```\n\n### Vue\n\n```vue\n<script setup lang=\"ts\">\nimport { Dialog } from '@ark-ui/vue/dialog'\n</script>\n\n<template>\n  <Dialog.Root>\n    <Dialog.Trigger>Open Dialog</Dialog.Trigger>\n    <Dialog.Backdrop />\n    <Dialog.Positioner>\n      <Dialog.Content>\n        <Dialog.Title>Dialog Title</Dialog.Title>\n        <Dialog.Description>Dialog description</Dialog.Description>\n        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>\n      </Dialog.Content>\n    </Dialog.Positioner>\n  </Dialog.Root>\n</template>\n```\n\n### Solid\n\n```tsx\nimport { Dialog } from '@ark-ui/solid/dialog'\n\nexport const MyDialog = () => (\n  <Dialog.Root>\n    <Dialog.Trigger>Open Dialog</Dialog.Trigger>\n    <Dialog.Backdrop />\n    <Dialog.Positioner>\n      <Dialog.Content>\n        <Dialog.Title>Dialog Title</Dialog.Title>\n        <Dialog.Description>Dialog description</Dialog.Description>\n        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>\n      </Dialog.Content>\n    </Dialog.Positioner>\n  </Dialog.Root>\n)\n```\n\n### Svelte\n\n```svelte\n<script lang=\"ts\">\n  import { Dialog } from '@ark-ui/svelte/dialog'\n</script>\n\n<Dialog.Root>\n  <Dialog.Trigger>Open Dialog</Dialog.Trigger>\n  <Dialog.Backdrop />\n  <Dialog.Positioner>\n    <Dialog.Content>\n      <Dialog.Title>Dialog Title</Dialog.Title>\n      <Dialog.Description>Dialog description</Dialog.Description>\n      <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>\n    </Dialog.Content>\n  </Dialog.Positioner>\n</Dialog.Root>\n```\n\n## Features\n\n### Zero-Styling Freedom\n\nEvery component is completely unstyled, giving you total control over your design. Use any styling solution:\n\n```tsx\n// Tailwind CSS\n<Dialog.Trigger className=\"px-4 py-2 bg-blue-500 rounded\">Open</Dialog.Trigger>\n\n// CSS-in-JS\n<Dialog.Trigger css={{ padding: '8px 16px', background: 'blue' }}>Open</Dialog.Trigger>\n\n// Vanilla CSS\n<Dialog.Trigger className=\"my-button\">Open</Dialog.Trigger>\n```\n\n### Accessibility Built-In\n\nAll components follow WAI-ARIA design patterns and are tested with screen readers:\n\n- ✅ Proper ARIA attributes and roles\n- ✅ Keyboard navigation support\n- ✅ Focus management\n- ✅ Screen reader announcements\n- ✅ RTL support\n\n### State Machine Architecture\n\nPowered by Zag.js, each component uses finite state machines for predictable behavior:\n\n- 🔒 Type-safe state transitions\n- 🧪 Easier to test and debug\n- 🐛 Fewer edge cases and bugs\n- 📊 Visualizable component logic\n\n### Framework Parity\n\nMaintain a single design system across multiple frameworks without rewriting component logic:\n\n```tsx\n// Same API, same behavior, different frameworks\nconst packages = ['@ark-ui/react', '@ark-ui/solid', '@ark-ui/vue', '@ark-ui/svelte']\n```\n\n## Components\n\nArk UI provides **45+ production-ready components** covering common UI patterns:\n\n### Layout & Navigation\n\n- Accordion\n- Tabs\n- Splitter\n- Steps\n- Tree View\n- Tour\n\n### Overlays & Dialogs\n\n- Dialog",
      }
    ],
  },
  {
    slug: "park-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/park-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "park-ui install and usage",
        url: "https://park-ui.com/docs/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "the guide to setup Park UI in your project. Quickstart Short on time? Jump into our quickstart examples and start to explore Park UI in seconds. Next.js Icon Next.js Solid Start Icon Solid Start Setup Guide 1 Prerequisite Before you start, ensure that your Panda project is set up and ready to go. If not, please refer to the Panda CSS Getting Started Guide and once you've completed that, come back to this guide. 2 Install Dependencies Park UI is built on Ark UI as its headless foundation and uses Lucide Icons by default, but you can swap it out for any icon library of your choice. react solid npm install @ark-ui/react lucide-react 3 Initialize Park UI Next, initialize Park UI in your project. This will set up the necessary configuration files and directories. npx @park-ui/cli init Don't forget to run panda codegen after updating your Panda configuration. Info Park UI uses its own color system . To remove Panda’s default color tokens (50–950 shades), add this plugin to your Panda config: // panda.config.ts plugins : [ { name: 'Remove Panda Preset Colors' , hooks: { 'preset:resolved' : ({ utils , preset , name }) => name === '@pandacss/preset-panda' ? utils. omit (preset, [ 'theme.tokens.colors' , 'theme.semanticTokens.colors' ]) : preset, }, }, ], 4 Add components You can now start adding components to your project. npx @park-ui/cli add button The command above will add the Button component to your project. You can then import it like this: react solid import { Button } from '@/components/ui' export const App = () => { return &#x3C; Button >Park UI&#x3C;/ Button > } If you need additional color palettes, you can do so at any time using the CLI: npx @park-ui/cli add teal And that's it! Happy hacking! ✌️ Previous page Introduction Next page Theming On this page Quickstart Setup Guide",
      }
    ],
  },
  {
    slug: "headless-ui",
    permission: {
      status: "granted",
      source: "https://github.com/tailwindlabs/headlessui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "headless-ui install and usage",
        url: "https://github.com/tailwindlabs/headlessui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "eea57cf46fd6767ed1059012f7073b88eb159fba",
        content: "### Installing the latest version\n\nYou can install the latest version by using:\n\n- `npm install @headlessui/react@latest`\n- `npm install @headlessui/vue@latest`\n\n### Installing the insiders version\n\nYou can install the insiders version (which points to whatever the latest commit on the `main` branch is) by using:\n\n- `npm install @headlessui/react@insiders`\n- `npm install @headlessui/vue@insiders`\n\n**Note:** The insiders build doesn't follow semver and therefore doesn't guarantee that the APIs will be the same once they are released.\n\n## Packages\n\n| Name                                                                                                                 |                                                              Version                                                              |                                                              Downloads                                                               |\n| :------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |\n| [`@headlessui/react`](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-react)             |       [![npm version](https://img.shields.io/npm/v/@headlessui/react.svg)](https://www.npmjs.com/package/@headlessui/react)       |       [![npm downloads](https://img.shields.io/npm/dt/@headlessui/react.svg)](https://www.npmjs.com/package/@headlessui/react)       |\n| [`@headlessui/vue`](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-vue)                 |         [![npm version](https://img.shields.io/npm/v/@headlessui/vue.svg)](https://www.npmjs.com/package/@headlessui/vue)         |         [![npm downloads](https://img.shields.io/npm/dt/@headlessui/vue.svg)](https://www.npmjs.com/package/@headlessui/vue)         |\n| [`@headlessui/tailwindcss`](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss) | [![npm version](https://img.shields.io/npm/v/@headlessui/tailwindcss.svg)](https://www.npmjs.com/package/@headlessui/tailwindcss) | [![npm downloads](https://img.shields.io/npm/dt/@headlessui/tailwindcss.svg)](https://www.npmjs.com/package/@headlessui/tailwindcss) |\n\n## Community\n\nFor help, discussion about best practices, or feature ideas:\n\n[Discuss Headless UI on GitHub](https://github.com/tailwindlabs/headlessui/discussions)\n\n## Contributing\n\nIf you're interested in contributing to Headless UI, please read our [contributing docs](https://github.com/tailwindlabs/headlessui/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.",
      }
    ],
  },
  {
    slug: "tailwind-css",
    permission: {
      status: "granted",
      source: "https://github.com/tailwindlabs/tailwindcss",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "tailwind-css install and usage",
        url: "https://tailwindcss.com/docs",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "le, and reliable — with zero-runtime. Installation Using Vite Using PostCSS Tailwind CLI Framework Guides Play CDN Installing Tailwind CSS as a Vite plugin Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS. 01 Create your project Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite . Terminal npm create vite@latest my-project cd my-project 02 Install Tailwind CSS Install tailwindcss and @tailwindcss/vite via npm. Terminal npm install tailwindcss @tailwindcss/vite 03 Configure the Vite plugin Add the @tailwindcss/vite plugin to your Vite configuration. vite.config.ts import { defineConfig } from 'vite' import tailwindcss from '@tailwindcss/vite' export default defineConfig ( { plugins : [ tailwindcss () , ] , } ) 04 Import Tailwind CSS Add an @import to your CSS file that imports Tailwind CSS. CSS @import \"tailwindcss\" ; 05 Start your build process Run your build process with npm run dev or whatever command is configured in your package.json file. Terminal npm run dev 06 Start using Tailwind in your HTML Make sure your compiled CSS is included in the &lt;head&gt; (your framework might handle this for you) , then start using Tailwind’s utility classes to style your content. HTML &#x3C;! doctype html > &#x3C; html > &#x3C; head > &#x3C; meta charset = \"UTF-8\" > &#x3C; meta name = \"viewport\" content = \"width=device-width, initial-scale=1.0\" > &#x3C; link href = \"/src/style.css\" rel = \"stylesheet\" > &#x3C;/ head > &#x3C; body > &#x3C; h1 class = \"text-3xl font-bold underline\" > Hello world! &#x3C;/ h1 > &#x3C;/ body > &#x3C;/ html > Are you stuck? Setting up Tailwind with Vite can be a bit different across different build tools. Check our framework guides to see if we have more specific instructions for your particular setup. Explore our framework guides Tailwind CSS Documentation Playground Blog Showcase Resources Refactoring UI Headless UI Heroicons Hero Patterns Community GitHub X Tailwind CSS Documentation Playground Blog Showcase Resources Refactoring UI Headless UI Heroicons Hero Patterns Community GitHub X Copyright © 2026 Tailwind Labs Inc. · Trademark Policy",
      }
    ],
  },
  {
    slug: "kibo-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcnblocks/kibo",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "kibo-ui install and usage",
        url: "https://www.kibo-ui.com",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "6 Productize compelling ROI Dec 11, 2025 Generate dynamic users Mar 24, 2026 Synthesize transparent models Feb 23, 2026 Empower back-end synergies Apr 15, 2026 Incubate one-to-one relationships Jan 30, 2026 Today May 21, 2026 Jan 01, 2025 Thousands of ready-to-use patterns Browse through 1000+ production-ready patterns built with shadcn/ui. Copy, customize, and ship faster than ever. Explore patterns What people are saying We're proud to have a community of users who love using Kibo UI. Get started with Kibo UI Install your first component in seconds with the Kibo UI or shadcn CLI. Terminal $ npx kibo-ui add announcement Kibo UI Kibo UI Docs Benefits Community How to Contribute Introduction MCP Server New Components Philosophy Setup Troubleshooting Usage Components Announcement Avatar Stack Banner Calendar Choicebox Code Block Color Picker Combobox Comparison Contribution Graph Credit Card Cursor Deck Dialog Stack Dropzone Editor Gantt Glimpse Image Crop Image Zoom Kanban List Marquee Mini Calendar Pill QR Code Rating Reel Relative Time Sandbox Snippet Spinner Status Stories Table Tags Theme Switcher Ticker Tree Typography Video Player Blocks About Awards Blog Blog Post Careers Case Studies Case Study Changelog Code Example Codebase Collaborative Canvas Community Compare Compliance Contact CTA Download Experience FAQ Feature Footer Form Hero Pricing Roadmap Stats Team Testimonial Patterns Accordion Alert Alert Dialog Aspect Ratio Avatar Badge Breadcrumb Button Button Group Calendar Card Carousel Chart Checkbox Collapsible Combobox Command Context Menu Data Table Date Picker Dialog Drawer Dropdown Menu Empty Field Form Hover Card Input Input Group Input OTP Item Kbd Label Menubar Navigation Menu Pagination Popover Progress Radio Group Scroll Area Separator Sheet Skeleton Slider Sonner Spinner Switch Table Tabs Textarea Toggle Toggle Group Tooltip Arthur Brito @ arthurbritom · Follow I'm in love with Kibo UI. Feels like the missing parts of shadcn/ui. And that's the whole point of the lib. As the docs say: \"While shadcn/ui focuses on wrapping primitives from Radix UI, Kibo UI is designed to be a more comprehensive library of components that can be used to Show more Watch on X Watch on X 11:59 AM · May 14, 2025 9 Reply Copy link Read 2 replies Dmytro @ webpnkdotdev · Follow Was looking for a stack dialog component for shadcn - came across amazing Kibo UI components by @haydenbleasel It's really NUTS 🔥 kibo-ui.com/components 3:45 PM · Apr 25, 2025 2 Reply Copy link Read more on X jQueryScript @ jqueryscript · Follow Extend your #shadcnui toolkit with Kibo UI! Adds complex, open-source components like Gantt, Kanban, Editor, Color Picker, Dropzone & more directly into your #React project 👉 next.jqueryscript.net/shadcn-ui/comp… #WebDev #UI 3:22 AM · Apr 1, 2025 1 Reply Copy link Read more on X Rajiv S @ rjv_im · Follow I was exploring kibo-ui.com/overview by @haydenbleasel - amazing work. Cherry on the top: Cool codebase: github.com/haydenbleasel/… Ju",
      }
    ],
  },
  {
    slug: "ruixen-ui",
    permission: {
      status: "granted",
      source: "https://github.com/ruixenui/ruixen.com",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "ruixen-ui install and usage",
        url: "https://github.com/ruixenui/ruixen.com#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "f6b20860623fa39122ac2b5f0e5bd29a9eb10941",
        content: "## Quick start\n\n```bash\n# Tailwind v4 + Radix  (default)\nnpx shadcn@latest add \"https://ruixen.com/r/staggered-faq-section\"\n\n# Tailwind v3 + Radix\nnpx shadcn@latest add \"https://ruixen.com/r/tw3/staggered-faq-section\"\n\n# Tailwind v4 + Base UI\nnpx shadcn@latest add \"https://ruixen.com/r/baseui/staggered-faq-section\"\n\n# Tailwind v3 + Base UI\nnpx shadcn@latest add \"https://ruixen.com/r/baseui/tw3/staggered-faq-section\"\n```\n\nThe component lands in your project with dependencies resolved. Just JSX — yours to edit, ship, and refactor.\n\n<br />\n\n## Built with intention\n\nThe catalog isn't styled to look good in a screenshot — it's built to feel right in production. Where it matters, components carry weight:\n\n- **Motion as physics, not transitions.** Buttons, switches, badges, and accordions use spring configs from `motion/react` — momentum, overshoot, settling. Not a 300ms ease-out timer pretending to be life.\n- **Audio as feedback.** Interactive primitives ship with a 3ms Web Audio click on press for a tactile feel. Opt out per-component with `sound={false}`.\n- **Tokens, not hex.** Every component reads from shadcn theme tokens (`bg-card`, `border-border`, `text-foreground`). Change one CSS variable, re-skin the catalog.\n- **Identical code, different wrappers.** Switching from Radix to Base UI doesn't change the component file — just the underlying primitive layer. Component logic stays portable.\n\nMost of the catalog is pure render. Physics and audio are a flavor on the interactive primitives, not a tax on everything else.\n\n<br />\n\n## Showcase\n\n<table>\n<tr>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/faq-chat-accordion-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>FAQ Chat Accordion</strong><br /><sub>Conversational FAQ section</sub>\n</td>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/wordmark-footer-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>Wordmark Footer</strong><br /><sub>Half-cut brand footer with luminance gradient</sub>\n</td>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/split-feature-showcase-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>Split Feature Showcase</strong><br /><sub>Side-by-side feature highlight section</sub>\n</td>\n</tr>\n<tr>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/integration-and-stats-section-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>Integration &amp; Stats Section</strong><br /><sub>Logos and metrics block for trust-building</sub>\n</td>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/rising-glow-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>Rising Glow</strong><br /><sub>Animated particles for hero accents</sub>\n</td>\n<td width=\"33%\" align=\"center\">\n<video src=\"https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/badge-morph-dark.mp4\" width=\"100%\" autoplay loop muted playsinline></video>\n<strong>Badge Morph</strong><br /><sub>Spring-animated status badge</sub>\n</td>\n</tr>\n</table>\n\n<p align=\"center\">\n<a href=\"https://ruixen.com/docs\"><strong>Browse all 240+ components &rarr;</strong></a>\n</p>\n\n<br />\n\n## What's inside\n\n**Sections** &mdash; 59 marketing blocks across 8 categories\n\n| | | | |\n|:---|:---|:---|:---|\n| Navbars (16) | Hero Sections (9) | Pricing (10) | FAQs (6) |\n| Featured (6) | Testimonials (4) | Clients (4) | Footers (4) |\n\n**Components** &mdash; primitives and effects across 24 categories\n\nButtons &middot; Inputs &middot; Cards &middot; Forms &middot; Accordions &middot; Avatars &middot; Badges &middot; Banners &middot; Backgrounds &middot; Text Effects &middot; Loaders &middot; Carousels &middot; AI Chat Inputs &middot; Audio &amp; Media &middot; Image Tools &middot; Video Players &middot; Checkboxes &middot; Selects &middot; Sliders &middot; Tabs &middot; Charts &middot; Dialogs &middot; Docks &middot; Stepper\n\n**App UI** &mdash; bonus catalog for product interfaces\n\nCalendars &middot; Event Calendars &middot; Date Pickers &middot; Pagination &middot; File Management &middot; Notifications &middot; Drawer &middot; Menu &middot; Breadcrumbs\n\n**Gradients** &mdash; 31 hand-tuned 4K gradients (3840 &times; 2160) across 6 collections: Shade Shifters, Crimson Aura, Fractional Walls, Hero Gradients, Hue Flows, Moon Backgrounds. Free for personal and commercial use.\n\n<br />\n\n## Pro\n\nWhen the free catalog isn't enough — when you need everything to look like it shipped from a design team that's been working together for a year:\n\n- **50+ premium components** with motion polish and theme d",
      }
    ],
  },
  {
    slug: "fancy-components",
    permission: {
      status: "granted",
      source: "https://github.com/danielpetho/fancy",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "anime-js",
    permission: {
      status: "granted",
      source: "https://github.com/juliangarnier/anime",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "anime-js install and usage",
        url: "https://github.com/juliangarnier/anime#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "01b81be1df6843ccfe0a71c0699a746bf740dd77",
        content: "## Usage\n\nAnime.js V4 works by importing ES modules like so:\n\n\n<table>\n<tr>\n  <td>\n\n```javascript\nimport {\n  animate,\n  stagger,\n} from 'animejs';\n\nanimate('.square', {\n  x: 320,\n  rotate: { from: -180 },\n  duration: 1250,\n  delay: stagger(65, { from: 'center' }),\n  ease: 'inOutQuint',\n  loop: true,\n  alternate: true\n});\n```\n\n  </td>\n  <td>\n    <img align=\"center\" alt=\"Anime.js code example\" src=\"./assets/images/usage-example-result.gif\">\n  </td>\n</tr>\n</table>\n\n## V4 Documentation\n\nThe full documentation is available [here](https://animejs.com/documentation).\n\n## V3 Migration guide\n\nYou can find the v3 to v4 migration guide [here](https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4).\n\n## NPM development scripts\n\nFirst, run `npm i` to install all the necessary packages.\nThen, execute the following scripts with `npm run <script>`.\n\n| script | action |\n| ------ | ------ |\n| `dev` | Watches for changes in `src/**/*.js`, bundles the ESM version to `lib/` and creates type declarations in `types/` |\n| `dev:test` | Runs `dev` and `test:browser` concurrently |\n| `build` | Bundles ESM / UMD / CJS / IIFE versions to `lib/` and creates type declarations in `types/` |\n| `test:browser` | Starts a local server and runs all browser-related tests |\n| `test:node` | Starts Node-related tests |\n| `open:examples` | Starts a local server to browse the examples locally |\n\n© [Julian Garnier](http://juliangarnier.com) | [MIT License](LICENSE.md)",
      }
    ],
  },
  {
    slug: "react-spring",
    permission: {
      status: "granted",
      source: "https://github.com/pmndrs/react-spring",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "react-spring install and usage",
        url: "https://github.com/pmndrs/react-spring#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "ea91c9d3415b519e085a0bf39b7d0bb6492e1929",
        content: "## Getting Started\n\n### ⚡️ Jump Start\n\n```shell\n# Install the entire library\nnpm install react-spring\n# or just install your specific target (recommended)\nnpm install @react-spring/web\n```\n\n```jsx\nimport { animated, useSpring } from '@react-spring/web'\n\nconst FadeIn = ({ isVisible, children }) => {\n  const styles = useSpring({\n    opacity: isVisible ? 1 : 0,\n    y: isVisible ? 0 : 24,\n  })\n\n  return <animated.div style={styles}>{children}</animated.div>\n}\n```\n\nIt's as simple as that to create scroll-in animations when value of `isVisible` is toggled.\n\n### 📖 Documentation and Examples\n\nMore documentation on the project can be found [here](https://www.react-spring.io).\n\nPages contain their own [examples](https://react-spring.io/hooks/use-spring#demos) which you can check out there, or [open in codesandbox](https://codesandbox.io/s/github/pmndrs/react-spring/tree/main/demo/src/sandboxes/card) for a more in-depth view!\n\n---\n\n## 📣 What others say\n\n<p align=\"middle\">\n  <img src=\"assets/testimonies.jpg\" />\n</p>\n\n## Used by\n\n<p align=\"middle\">\n  <a href=\"https://nextjs.org/\"><img width=\"285\" src=\"assets/projects/next.png\"></a>\n  <a href=\"https://codesandbox.io/\"><img width=\"285\" src=\"assets/projects/csb.png\"></a>\n  <a href=\"https://aragon.org/\"><img width=\"285\" src=\"assets/projects/aragon.png\"></a>\n</p>\n\nAnd [many others...](https://github.com/pmndrs/react-spring/network/dependents)\n\n## Backers\n\nThank you to all our backers! 🙏 If you want to join them here, then consider contributing to our [Opencollective](https://opencollective.com/react-spring).\n\n<a href=\"https://opencollective.com/react-spring#backers\" target=\"_blank\">\n  <img src=\"https://opencollective.com/react-spring/backers.svg?width=890\"/>\n</a>\n\n## Contributors\n\nThis project exists thanks to all the people who contribute.\n\n<a href=\"https://github.com/react-spring/react-spring/graphs/contributors\">\n  <img src=\"https://opencollective.com/react-spring/contributors.svg?width=890\" />\n</a>",
      }
    ],
  },
  {
    slug: "lenis",
    permission: {
      status: "granted",
      source: "https://github.com/darkroomengineering/lenis",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "lenis install and usage",
        url: "https://github.com/darkroomengineering/lenis#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "bc152f90d7c9b04ef372718350e2f616f3c706b2",
        content: "#installation)\n- [Setup](#setup)\n- [No-code usage](#no-code-usage)\n- [Settings](#settings)\n- [Properties](#properties)\n- [Methods](#methods)\n- [Events](#events)\n- [Considerations](#considerations)\n- [Limitations](#limitations)\n- [Troubleshooting](#troubleshooting)\n- [Tutorials](#tutorials)\n- [Plugins](#plugins)\n- [License](#license)\n\n<br/>\n\n## Features\n\n- **Lightweight & dependency-free** — the whole library is a few KB with zero runtime dependencies\n- **Runs on native scroll** — wraps the browser's own scroll, so position: sticky, anchor links, and accessibility keep working\n- **Any axis** — smooth vertical, horizontal, and nested scrolling from a single instance\n- **Built for sync** — drives WebGL scroll scenes, GSAP ScrollTrigger, and parallax off one loop\n- **Framework adapters** — first-class packages for React, Vue, and Framer\n- **Scroll snapping** — the snap plugin aligns sections without fighting the smooth scroll\n\n## Sponsors\n\nIf you’ve used Lenis and it made your site feel just a little more alive, consider [sponsoring](https://github.com/sponsors/darkroomengineering).\n\nYour support helps us smooth out the internet one library at a time—and lets us keep building tools that care about the details most folks overlook.\n\n<!-- sponsors -->\n<a href=\"https://www.contentarchitecture.dev/?utm_source=lenis&utm_medium=github\"><img src=\"https://darkroom-lenis-showcase.s3.us-east-1.amazonaws.com/pbc_3665759510/23raiqpdg8nej3m/word_49x1dnfo22.svg\" height=\"96\" alt=\"The Content Architecture\"/></a>\n\n<a href=\"https://glauber.org/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/glauber-sampaio.png?size=64\" width=\"64\" height=\"64\" alt=\"Glauber\"/></a> <a href=\"https://smsunarto.com/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/smsunarto.png?size=64\" width=\"64\" height=\"64\" alt=\"Scott\"/></a> <a href=\"https://bizar.ro/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/bizarro.png?size=64\" width=\"64\" height=\"64\" alt=\"Luis Bizarro\"/></a> <a href=\"https://www.edoardolunardi.dev/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/edoardolunardi.png?size=64\" width=\"64\" height=\"64\" alt=\"Edoardo Lunardi\"/></a> <a href=\"https://www.cachet.studio/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/cachet-studio.png?size=64\" width=\"64\" height=\"64\" alt=\"cachet.studio\"/></a> <a href=\"https://good-fella.com/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/GoodFellaStudio.png?size=64\" width=\"64\" height=\"64\" alt=\"Julian Fella\"/></a> <a href=\"https://oho.design/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/OHO-Design.png?size=64\" width=\"64\" height=\"64\" alt=\"OHO Design\"/></a> <a href=\"https://itsoffbrand.com/?utm_source=lenis&utm_medium=github\"><img src=\"https://github.com/itsoffbrand.png?size=64\" width=\"64\" height=\"64\" alt=\"OFF+BRAND.\"/></a>\n<!-- sponsors -->\n\n<br/>\n\n## Packages\n\n- [lenis](https://github.com/darkroomengineering/lenis/blob/main/README.md)\n- [lenis/react](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)\n- [lenis/vue](https://github.com/darkroomengineering/lenis/tree/main/packages/vue/README.md)\n- [lenis/framer](https://lenis.framer.website/)\n- [lenis/snap](https://github.com/darkroomengineering/lenis/tree/main/packages/snap/README.md)\n\n<br/>\n\n## Installation\n\nUsing a package manager:\n\n```bash\nnpm i lenis\n# or\nyarn add lenis\n# or\npnpm add lenis\n```\n\n```js\nimport Lenis from 'lenis'\n```\n\n<br/>\n\nUsing scripts:\n\n```html\n<script src=\"https://unpkg.com/lenis@1.3.26/dist/lenis.min.js\"></script> \n```\n\n\n<br/>\n\n## Setup\n\n### Basic:\n\n```js\n// Initialize Lenis\nconst lenis = new Lenis({\n  autoRaf: true,\n});\n\n// Listen for the scroll event and log the event data\nlenis.on('scroll', (e) => {\n  console.log(e);\n});\n```\n\n### Custom raf loop:\n\n```js\n// Initialize Lenis\nconst lenis = new Lenis();\n\n// Use requestAnimationFrame to continuously update the scroll\nfunction raf(time) {\n  lenis.raf(time);\n  requestAnimationFrame(raf);\n}\n\nrequestAnimationFrame(raf);\n```\n\n### Recommended CSS:\n\n**Import stylesheet:**\n```js\nimport 'lenis/dist/lenis.css'\n```\n\n**Or link the CSS file:**\n\n```html\n<link rel=\"stylesheet\" href=\"https://unpkg.com/lenis@1.3.26/dist/lenis.css\">\n```\n\n**Or add it manually:**\n\n[See lenis.css stylesheet](./packages/core/lenis.css)\n\n### GSAP ScrollTrigger:\n```js\n// Initialize a new Lenis instance for smooth scrolling\nconst lenis = new Lenis();\n\n// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin\nlenis.on('scroll', ScrollTrigger.update);\n\n// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker\n// This ensures Lenis's smooth scroll animation updates on each GSAP tick\ngsap.ticker.add((time) => {\n  lenis.raf(time * 1000); // Convert time from seconds to milliseconds\n});\n\n// Disable lag smoothing in GSAP to prevent any delay in scroll animations\ngsap.ticker.lagSmoothing(0);\n\n```\n\n<br/>\n\n## No-code usage\n\nOne line, no build step — just drop this into your HTML:\n\n```html\n<li",
      }
    ],
  },
  {
    slug: "rive",
    permission: {
      status: "granted",
      source: "https://github.com/rive-app/rive-wasm",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "dotlottie",
    permission: {
      status: "granted",
      source: "https://github.com/LottieFiles/dotlottie-web",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "dotlottie install and usage",
        url: "https://github.com/LottieFiles/dotlottie-web#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "d8a4e9e2cf76740b7b3848257f962b38d71aa71a",
        content: "## Quick Start\n\nInstall the package for your framework, then drop in a few lines. The same player loads both Lottie `.json` and dotLottie `.lottie` files — just point `src` at either:\n\n### Vanilla JS\n\n```bash\nnpm install @lottiefiles/dotlottie-web\n```\n\n```html\n<canvas id=\"canvas\" style=\"width: 300px; height: 300px\"></canvas>\n```\n\n```js\nimport { DotLottie } from '@lottiefiles/dotlottie-web';\n\nconst dotLottie = new DotLottie({\n  canvas: document.getElementById('canvas'),\n  src: 'https://your-animation-url.lottie',\n  autoplay: true,\n  loop: true,\n});\n```\n\n<details>\n  <summary><b>⚛️ React</b></summary>\n\n  ```bash\n  npm install @lottiefiles/dotlottie-react\n  ```\n\n  ```jsx\n  import { DotLottieReact } from '@lottiefiles/dotlottie-react';\n\n  const App = () => (\n    <DotLottieReact\n      src=\"path/to/animation.lottie\"\n      loop\n      autoplay\n    />\n  );\n  ```\n</details>\n\n<details>\n  <summary><b>💚 Vue</b></summary>\n\n  ```bash\n  npm install @lottiefiles/dotlottie-vue\n  ```\n\n  ```vue\n  <script setup>\n  import { DotLottieVue } from '@lottiefiles/dotlottie-vue';\n  </script>\n\n  <template>\n    <DotLottieVue\n      style=\"height: 500px; width: 500px\"\n      autoplay\n      loop\n      src=\"https://path-to-lottie.lottie\"\n    />\n  </template>\n  ```\n</details>\n\n<details>\n  <summary><b>🧡 Svelte</b></summary>\n\n  ```bash\n  npm install @lottiefiles/dotlottie-svelte\n  ```\n\n  ```svelte\n  <script lang=\"ts\">\n    import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';\n  </script>\n\n  <DotLottieSvelte src=\"path/to/animation.lottie\" loop autoplay />\n  ```\n</details>\n\n<details>\n  <summary><b>🔵 Solid</b></summary>\n\n  ```bash\n  npm install @lottiefiles/dotlottie-solid\n  ```\n\n  ```jsx\n  import { DotLottieSolid } from '@lottiefiles/dotlottie-solid';\n\n  const App = () => (\n    <DotLottieSolid\n      src=\"path/to/animation.lottie\"\n      loop\n      autoplay\n    />\n  );\n  ```\n</details>\n\n<details>\n  <summary><b>🌐 Web Component (drop-in, no build step)</b></summary>\n\n  ```html\n  <dotlottie-wc\n    src=\"https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie\"\n    autoplay\n    loop\n  ></dotlottie-wc>\n\n  <script\n    type=\"module\"\n    src=\"https://unpkg.com/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js\"\n  ></script>\n  ```\n\n  Or via npm:\n\n  ```bash\n  npm install @lottiefiles/dotlottie-wc\n  ```\n\n  ```js\n  import '@lottiefiles/dotlottie-wc';\n  ```\n</details>\n\n## Features\n\n### 🤖 Interactive State Machines\n\ndotLottie v2 ships **state machines** built into the file format — no JS glue required. Define states, transitions, and inputs in a single `.lottie` and drive them at runtime through pointer events, custom events, or input values.\n\n```js\nconst dotLottie = new DotLottie({\n  canvas: document.getElementById('canvas'),\n  src: 'interactive-button.lottie',\n  stateMachineId: 'main',\n  autoplay: true,\n});\n```\n\nThe player exposes typed events for `stateMachineStart`, `stateMachineTransition`, `stateMachineStateEntered`, custom events, and input changes — perfect for wiring animations into your UI logic.\n\n### 🎨 Runtime Theming\n\nSwitch palettes, animate gradients, swap text, or replace images at runtime — without re-exporting from After Effects. Themes can be embedded in the `.lottie` manifest or supplied programmatically.\n\n```js\n// Use a theme defined in the .lottie manifest\ndotLottie.setTheme('dark');\n\n// Or supply a theme object at runtime\ndotLottie.setThemeData({\n  rules: [\n    { id: 'primary', type: 'Color', value: [0.9, 0.2, 0.4, 1.0] },\n  ],\n});\n```\n\nThe full `Theme` type covers color, scalar, position, vector, gradient, image, and text rules — all keyframe-aware.\n\n### 🔊 Audio Support\n\n`dotLottie` files can carry embedded audio tracks alongside the animation timeline — handy for UI sound effects, onboarding flows, or interactive characters. Audio is decoded and played in lockstep with the animation timeline.\n\n> Audio is an experimental feature in `dotlottie-rs`. Browser autoplay policies still apply — initiate playback from a user gesture.\n\n### 🧵 Off-Main-Thread Rendering\n\nFor pages with many animations, swap `DotLottie` for `DotLottieWorker`. Identical API, but rendering happens on a Web Worker with an `OffscreenCanvas`, freeing the main thread for layout, scrolling, and your app code.\n\n```js\nimport { DotLottieWorker } from '@lottiefiles/dotlottie-web';\n\nconst player = new DotLottieWorker({\n  canvas: document.getElementById('canvas'),\n  src: 'animation.lottie',\n  autoplay: true,\n  loop: true,\n  workerId: 'shared-pool', // optional: share one worker across many instances\n});\n```\n\nAll `DotLottieWorker` methods are async (Promise-returning) since they cross a worker boundary.\n\n### ⚡ Hardware-Accelerated Rendering\n\nThe default Software backend works everywhere. For demanding workloads — many concurrent animations, large canvases, complex masks — opt in to GPU rendering via subpath imports:\n\n```js\n// WebGL2 — broadly supported\nimport { DotLottie } from '@lottiefiles/dotlottie-web/webgl';\n\n// WebGPU — experimental, modern C",
      }
    ],
  },
  {
    slug: "godui",
    permission: {
      status: "granted",
      source: "https://github.com/LucasBassetti/godui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "godui install and usage",
        url: "https://github.com/LucasBassetti/godui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "1f632a76a346f09dc9fe066969906c6f98763e1e",
        content: "## Installation\n\nGodUI is distributed as a shadcn registry. Components are copied straight into\nyour project, so you own the source.\n\n**1. Create or set up a project:**\n\n```bash\npnpm dlx shadcn@latest init\n```\n\n**2. Add the GodUI registries** to the `registries` field of your\n`components.json` (one-time setup). `@godui` serves the animated shadcn/ui\ndrop-ins; `@godui-lab` serves Lab, GodUI's expressive, experimental pieces\nbeyond the shadcn catalog:\n\n```json\n{\n  \"registries\": {\n    \"@godui\": \"https://godui.design/r/{name}.json\",\n    \"@godui-lab\": \"https://godui.design/r/lab/{name}.json\"\n  }\n}\n```\n\nLab used to be called Extras: an existing `\"@godui-extras\"` entry pointing at\n`https://godui.design/r/extras/{name}.json` keeps working.\n\n**3. Add any component by name:**\n\n```bash\npnpm dlx shadcn@latest add @godui/dialog\n```\n\nThis replaces `components/ui/dialog.tsx` with the animated version and merges\nthe `godui-motion` tokens into your global stylesheet. Lab components install\nthe same way from the second registry, into `components/godui/`:\n\n```bash\npnpm dlx shadcn@latest add @godui-lab/magic-button\n```\n\n> To skip step 2, install with the full registry URL:\n> `pnpm dlx shadcn@latest add https://godui.design/r/lab/magic-button.json`\n\nSee the full [installation guide](https://godui.design/docs/installation) for\ntypography and dark-mode setup.\n\n## Quick start\n\nCore components keep shadcn's import paths:\n\n```tsx\nimport { Button } from \"@/components/ui/button\";\n\nexport function Demo() {\n  return <Button>Get Started</Button>;\n}\n```\n\nLab components import from `components/godui/`:\n\n```tsx\nimport { MagicButton } from \"@/components/godui/magic-button\";\n\nexport function Demo() {\n  return <MagicButton size=\"lg\">Get Started</MagicButton>;\n}\n```\n\n## Components\n\n[Components](https://godui.design/docs/components) covers the shadcn/ui\ncatalog: accordion, dialog, dropdown menu, select, sidebar, tabs and the rest.\n[Lab](https://godui.design/docs/lab) groups its pieces by category: buttons,\ntext, overlays, navigation, layout, effects, glass, backgrounds,\nvisualizations, inputs, AI and collaboration.\n\n## Local development\n\nGodUI is a [pnpm](https://pnpm.io) + [Turborepo](https://turborepo.com)\nmonorepo. Requires **Node >= 20.19.0** and **pnpm 10.x**.\n\n```bash\n# Clone\ngit clone https://github.com/LucasBassetti/godui.git\ncd godui\n\n# Install dependencies\npnpm install\n\n# Start everything (docs + storybook) in dev\npnpm dev\n\n# Build the shadcn registry from registry.json\npnpm build:registry\n\n# Run tests\npnpm test\n\n# Lint & format with Biome\npnpm check        # check\npnpm check:fix    # check and auto-fix\n```\n\n## Project structure\n\n```\ngodui/\n├── apps/\n│   ├── docs/          # Documentation site (Next.js + Fumadocs)\n│   └── storybook/     # Component showcase (Storybook)\n├── packages/\n│   ├── components/    # @godui/components: animated shadcn/ui drop-ins (core)\n│   └── lab/           # @godui/lab: expressive, experimental pieces (maintained as-is)\n├── registry.json      # core shadcn registry definition (source of truth)\n└── registry-lab.json  # Lab registry, served from /r/lab (/r/extras still works)\n```\n\n## Contributing\n\nNew components, bug fixes, docs and ideas are welcome. Read the\n[Contributing Guide](./CONTRIBUTING.md) and follow the\n[Code of Conduct](./CODE_OF_CONDUCT.md).\n\n## License\n\n[MIT](./LICENSE) © Lucas Bassetti\n\n## Star History\n\n<a href=\"https://www.star-history.com/?repos=LucasBassetti%2Fgodui&type=date&legend=top-left\">\n <picture>\n   <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://api.star-history.com/chart?repos=LucasBassetti/godui&type=date&theme=dark&legend=top-left&sealed_token=Eco6rP5S6yhB-dwc1cgNpBCcbIi_Wg570aLFL_JgOQ8sDHnqysK_Dg_N_tEHNchW5IRlhIltx060Q0kZ8Dkk_b6ZigA559HwP7OMDalppL8khPsz0TWUrw\" />\n   <source media=\"(prefers-color-scheme: light)\" srcset=\"https://api.star-history.com/chart?repos=LucasBassetti/godui&type=date&legend=top-left&sealed_token=Eco6rP5S6yhB-dwc1cgNpBCcbIi_Wg570aLFL_JgOQ8sDHnqysK_Dg_N_tEHNchW5IRlhIltx060Q0kZ8Dkk_b6ZigA559HwP7OMDalppL8khPsz0TWUrw\" />\n   <img alt=\"Star History Chart\" src=\"https://api.star-history.com/chart?repos=LucasBassetti/godui&type=date&legend=top-left&sealed_token=Eco6rP5S6yhB-dwc1cgNpBCcbIi_Wg570aLFL_JgOQ8sDHnqysK_Dg_N_tEHNchW5IRlhIltx060Q0kZ8Dkk_b6ZigA559HwP7OMDalppL8khPsz0TWUrw\" />\n </picture>\n</a>\n\n---\n\n<div align=\"center\">\n\nBuilt by <a href=\"https://github.com/LucasBassetti\">Lucas Bassetti</a> and\n<a href=\"https://github.com/LucasBassetti/godui/graphs/contributors\">contributors</a>.\n\n<a href=\"https://github.com/LucasBassetti/godui\">Star the repo</a> ·\n<a href=\"https://godui.design\">godui.design</a>\n\n</div>",
      }
    ],
  },
  {
    slug: "hampton-ui",
    permission: {
      status: "granted",
      source: "https://ui.hampton.io/license",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "satisium-ui",
    permission: {
      status: "granted",
      source: "https://github.com/satisium/ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "satisium-ui install and usage",
        url: "https://github.com/satisium/ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "bb24d923ddee009a03c8508a1d6c157bd84cceb1",
        content: "## Install a component\n\n```bash\nnpx shadcn@latest add https://ui.satisium.com/r/<component-name>.json\n```\n\nThe CLI copies the component source into your project, auto-installs missing dependencies, and leaves you in full control of the code.\n\nBrowse and preview all components at [ui.satisium.com](https://ui.satisium.com).\n\n## Quick start\n\n```bash\ngit clone https://github.com/satisium/ui.git\ncd ui\npnpm install\npnpm dev\n```\n\nOpen [http://localhost:3000](http://localhost:3000) to explore the docs site.\n\n## Tech stack\n\n- Next.js 16 with App Router\n- React 19\n- Tailwind CSS v4\n- GSAP and @gsap/react\n- Motion\n- Three.js and React Three Fiber\n- Radix UI\n- shadcn/ui\n- Fumadocs\n- Changesets\n- pnpm\n\n## Prerequisites\n\nTo use Satisium UI components in your project:\n\n- Node.js 20 or higher\n- Next.js 16 or later with App Router\n- Tailwind CSS v4 configured\n- shadcn/ui initialized (`npx shadcn@latest init`)\n\n## Community & Support\n\nJoin the Satisium HQ Discord to get help, showcase your projects, and talk design engineering with the founder and the community.\n\n[💬 Join the Satisium Discord](https://discord.gg/xQ5cPHmT7)\n\nFor bug reports and feature requests, please use [GitHub Issues](https://github.com/satisium/ui/issues). For security vulnerabilities, **Direct Message the Founder on Discord** or email **satisiumhq@gmail.com** (do not open a public issue).\n\n## Contributing\n\nContributions are welcome. Before opening a PR, please read the following:\n\n- [CONTRIBUTING.md](./CONTRIBUTING.md) — setup instructions, the component pipeline, and PR checklist\n- [GITHUB_STRATEGY.md](./GITHUB_STRATEGY.md) — branching model, releases, CI/CD, and open-source workflow\n\n### Contributor setup\n\n```bash\ngit clone https://github.com/satisium/ui.git\ncd ui\npnpm install\npnpm dev\n```\n\n## License\n\nMIT — see [LICENSE](./LICENSE) for details.",
      }
    ],
  },
  {
    slug: "wensity-ui",
    permission: {
      status: "granted",
      source: "https://github.com/wensity/registry",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "wensity-ui install and usage",
        url: "https://github.com/wensity/registry#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "d273e3fc0eda5bb9c2b88ad057e413cf7cbe2101",
        content: "## Install\n\nEvery item in this registry is free and MIT licensed. Install one with the\nshadcn CLI:\n\n```bash\nnpx shadcn@latest add @wensity/liquid-multimodal-input\n```\n\nThe `@wensity` namespace is registered in shadcn's public registry index, so it\nresolves without any `components.json` configuration on your side.\n\nYou can also point at this repository directly:\n\n```bash\nnpx shadcn@latest add https://raw.githubusercontent.com/wensity/registry/main/button.json\n```\n\n### Start with the base tokens\n\n`wensity-base` installs the CSS custom property contract that every Wensity\ncomponent reads from. Add it once before or after your first component:\n\n```bash\nnpx shadcn@latest add @wensity/wensity-base\n```\n\nComponents still render without it, falling back to your existing shadcn\nvariables, but the base contract is what makes radius, control colors, and\nmotion consistent across the set.\n\n## Requirements\n\n- React 18 or later\n- Tailwind CSS v4\n- A project already initialised with `npx shadcn@latest init`\n\nIndividual items declare their own npm dependencies (`framer-motion`,\n`@tabler/icons-react`, `@base-ui/react`, and similar). The shadcn CLI installs\nthose for you at add time.\n\n## What is in here\n\n95 registry items across six groups.\n\n### Agentic AI Interfaces\n\nChat, voice, and model-selection surfaces for AI products.\n\n| Item | Name | Description | Install |\n| --- | --- | --- | --- |\n| [`liquid-multimodal-input`](https://ui.wensity.com/components/liquid-multimodal-input) | Liquid Multimodal Input | Expanding prompt area with a glowing drop-zone. | `npx shadcn@latest add @wensity/liquid-multimodal-input` |\n| [`generative-skeleton-mesh`](https://ui.wensity.com/components/generative-skeleton-mesh) | Generative Skeleton Mesh | An organic loading state, not a spinner. | `npx shadcn@latest add @wensity/generative-skeleton-mesh` |\n| [`voice-aurora-wave`](https://ui.wensity.com/components/voice-aurora-wave) | Voice Aurora Wave | A breathing voice orb. Never jittery, always organic. | `npx shadcn@latest add @wensity/voice-aurora-wave` |\n| [`model-context-switcher`](https://ui.wensity.com/components/model-context-switcher) | Model Context Switcher | A Radix dropdown that scales out from the trigger and glides between options. | `npx shadcn@latest add @wensity/model-context-switcher` |\n\n### Text Animations\n\nHeadline and word-level motion, from shimmer and glitch to scribble and morph.\n\n| Item | Name | Description | Install |\n| --- | --- | --- | --- |\n| [`text-shimmer`](https://ui.wensity.com/components/text-shimmer) | Text Shimmer | A CSS shimmer sweep for headlines, one single element and entirely GPU-friendly. | `npx shadcn@latest add @wensity/text-shimmer` |\n| [`text-flip`](https://ui.wensity.com/components/text-flip) | Text Flip | A 3D character flip on hover, staggered and springy across every single letter. | `npx shadcn@latest add @wensity/text-flip` |\n| [`text-morphing`](https://ui.wensity.com/components/text-morphing) | Text Morphing | Blur-morphing headlines that cycle phrases with a gooey, seamless crossfade. | `npx shadcn@latest add @wensity/text-morphing` |\n| [`text-char-slide`](https://ui.wensity.com/components/text-char-slide) | Text Char Slide | A per-character slide-left cascade with a cleanly staggered entrance timing. | `npx shadcn@latest add @wensity/text-char-slide` |\n| [`text-motion`](https://ui.wensity.com/components/text-motion) | Text Motion | Headline entrances driven entirely by your own custom Framer Motion variants. | `npx shadcn@latest add @wensity/text-motion` |\n| [`text-cycle`](https://ui.wensity.com/components/text-cycle) | Text Cycle | Cycles through your headline words with a soft per-character blur stagger. | `npx shadcn@latest add @wensity/text-cycle` |\n| [`text-word-flip`](https://ui.wensity.com/components/text-word-flip) | Text Word Flip | Spring-loaded word flips paired with a soft letter-by-letter blur stagger. | `npx shadcn@latest add @wensity/text-word-flip` |\n| [`text-blur-reveal`](https://ui.wensity.com/components/text-blur-reveal) | Text Blur Reveal | A blur-in stagger by word or by letter, triggered the moment you scroll. | `npx shadcn@latest add @wensity/text-blur-reveal` |\n| [`canvas-text`](https://ui.wensity.com/components/canvas-text) | Canvas Text | Loading-ring canvas particles that slowly resolve into solid letterforms. | `npx shadcn@latest add @wensity/canvas-text` |\n| [`line-fill-text`](https://ui.wensity.com/components/line-fill-text) | Line Fill Text | Alpha-cascade ribbons clipped neatly inside the letterforms themselves. | `npx shadcn@latest add @wensity/line-fill-text` |\n| [`text-glitch`](https://ui.wensity.com/components/text-glitch) | Text Glitch | A chromatic clip-path glitch for headlines, CSS-only and entirely GPU-friendly. | `npx shadcn@latest add @wensity/text-glitch` |\n| [`text-path`](https://ui.wensity.com/components/text-path) | Text Path | SVG text riding a curved wave, arc, or circle path on a seamless, light loop. | `npx shadcn@latest add @wensity/text-path",
      }
    ],
  },
  {
    slug: "ai-canvas",
    permission: {
      status: "granted",
      source: "https://github.com/aicanvas-me/aicanvas",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "ai-canvas install and usage",
        url: "https://github.com/aicanvas-me/aicanvas#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "0242a000368640404f6bc1a32d56df4801bd0629",
        content: "#install\"><img src=\"assets/readme-buttons/btn-registry.png\" alt=\"shadcn registry: @aicanvas\" width=\"218\" height=\"45\" valign=\"middle\" /></a>\n  &nbsp;\n  <a href=\"#use-it-with-your-ai-editor-mcp\"><img src=\"assets/readme-buttons/btn-agents.png\" alt=\"Works with Claude, Codex and Cursor\" width=\"319\" height=\"45\" valign=\"middle\" /></a>\n  &nbsp;\n  <a href=\"https://mcpservers.org/servers/uinerd16/aicanvas\"><img src=\"assets/readme-buttons/btn-mcpservers.png\" alt=\"Listed on mcpservers.org\" width=\"259\" height=\"45\" valign=\"middle\" /></a>\n  &nbsp;\n  <a href=\"https://github.com/aicanvas-me/aicanvas\"><img src=\"assets/readme-buttons/btn-github.png\" alt=\"aicanvas-me on GitHub\" width=\"220\" height=\"45\" valign=\"middle\" /></a>\n</p>\n\n<p align=\"center\"><sub><a href=\"#install\">Install</a> · <a href=\"#components\">Components</a> · <a href=\"#blocks\">Blocks</a> · <a href=\"#use-it-with-your-ai-editor-mcp\">MCP</a> · <a href=\"#repository-layout\">Repo layout</a> · <a href=\"#common-questions\">FAQ</a> · <a href=\"#license\">License</a></sub></p>\n\n## Install\n\nAdd any component to your project with one command:\n\n```bash\nnpx shadcn@latest add @aicanvas/task-cards\n```\n\nStarting a new project? Initialize first, then add:\n\n```bash\nnpx shadcn@latest init        # new projects only\nnpx shadcn@latest add @aicanvas/task-cards\n```\n\nInstalls are tied to a free AI Canvas account. Signed out, the CLI writes a small placeholder file instead of the component, so authenticate once first:\n\n1. [Sign up free](https://aicanvas.me/account/sign-up) and copy your token from [account settings](https://aicanvas.me/account/settings).\n2. Put it in `.env.local` as `AICANVAS_TOKEN`.\n3. Add the registry to your project's `components.json`, once:\n\n```json\n{ \"registries\": { \"@aicanvas\": { \"url\": \"https://aicanvas.me/r/{name}.json\", \"params\": { \"token\": \"${AICANVAS_TOKEN}\" } } } }\n```\n\nEvery `npx shadcn@latest add @aicanvas/<slug>` is authenticated after that. Each component page also shows a ready tokenized command when you are signed in.\n\nNo account is needed to read the code: every component page shows its full source, free to read and copy.\n\n### Requirements\n\nTailwind CSS **v4**, React 19 and Framer Motion. Components are written against Tailwind v4 tokens and will not render correctly on v3. The Next.js App Router is the default target, not a requirement.\n\n### Three ways to use it\n\n| Path | Command or action | Best for |\n| --- | --- | --- |\n| **shadcn CLI** | `npx shadcn@latest add @aicanvas/<slug>` | Dropping finished, open-source code straight into your repo |\n| **AI Canvas MCP** | `npx -y @aicanvas/mcp` | Letting your AI editor search and install components for you |\n| **Remix with AI** | Copy the full prompt from any free component page | Rebuilding a component your way in any AI coding tool |\n\nBrowse the full catalog and copy the exact command for any component at [aicanvas.me](https://aicanvas.me). `pnpm dlx`, `yarn dlx`, and `bunx` work too.\n\n## Why AI Canvas\n\n- **MIT licensed.** The free library is MIT, so you can use it in personal and commercial projects, modify it freely, and ship it without attribution. Premium components, design systems, and templates are proprietary.\n- **Full source, yours to keep.** Every component arrives as real React and TypeScript code in your codebase, not a black-box dependency. Restyle it, extend it, or ship it as is. It is yours.\n- **Built for AI workflows.** Install with the shadcn CLI, connect the MCP so your agent installs for you, or hand it a remix prompt that works in any AI coding tool.\n- **Animated by default.** Built with Framer Motion and Tailwind CSS, ready for the Next.js App Router or any modern React setup. 3D pieces use Three.js.\n\n## Components\n\n<p align=\"center\">\n  <a href=\"https://aicanvas.me/components/tilted-coverflow\"><img src=\"https://ik.imagekit.io/aitoolkit/tilted-coverflow.png\" width=\"48%\" alt=\"Tilted Coverflow: 3D coverflow card carousel of seven tilted photos, drag or arrows to focus any card\" /></a>\n  <a href=\"https://aicanvas.me/components/crypto-swap\"><img src=\"https://ik.imagekit.io/aitoolkit/crypto-swap.png?v=2\" width=\"48%\" alt=\"Crypto Swap: token-swap widget with live exchange rates, price impact and an animated swap button\" /></a>\n  <a href=\"https://aicanvas.me/components/signature-pad\"><img src=\"https://ik.imagekit.io/aitoolkit/signature-pad.png?v=2&tr=w-846,h-480\" width=\"48%\" alt=\"Signature Pad: pill button morphs into a canvas to draw with mouse or touch\" /></a>\n  <a href=\"https://aicanvas.me/components/product-card-deck\"><img src=\"https://ik.imagekit.io/aitoolkit/product-card-deck.png?v=1\" width=\"48%\" alt=\"Product Card Deck: a draggable card deck you flick through one card at a time\" /></a>\n  <a href=\"https://aicanvas.me/components/glass-ai-compose\"><img src=\"https://ik.imagekit.io/aitoolkit/glass-ai-compose.png\" width=\"48%\" alt=\"Glass AI Composer: glassmorphism AI chat input with image upload, web search toggle and model switcher\" /></a>\n  <a href=\"https://aicanvas.me/components/voice-chat-pill\">",
      }
    ],
  },
  {
    slug: "codefronts",
    permission: {
      status: "granted",
      source: "https://github.com/codefronts/toolkit",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "codefronts install and usage",
        url: "https://github.com/codefronts/toolkit#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "1d86c4c6ec04de5694b0bb4feb5b48caaa5d89cd",
        content: "# Toolkit\n\nStandalone, framework-free versions of [CodeFronts](https://codefronts.com)' CSS tools and generators. Each tool is a single HTML file — no build step, no `npm install`, no dependencies. Open it in a browser, or drop it into your own project.\n\nThe live, polished versions of these tools live at [codefronts.com/tools](https://codefronts.com/tools) and [codefronts.com/generators](https://codefronts.com/generators). This repo extracts the same underlying logic into portable HTML files that work anywhere, including offline.\n\n## Tools in v1\n\n| Tool | Status |\n|---|---|\n| [px → rem converter](tools/px-to-rem-converter/) | ✅ ready |\n| [CSS Minifier](tools/css-minifier/) | ✅ ready |\n| [CSS Formatter](tools/css-formatter/) | ✅ ready |\n| [CSS Specificity Calculator](tools/css-specificity-calculator/) | ✅ ready |\n| [CSS → Tailwind Converter](tools/css-to-tailwind/) | ✅ ready |\n| [Tailwind → CSS Converter](tools/tailwind-to-css/) | ✅ ready |\n| [HTML → JSX Converter](tools/html-to-jsx/) | ✅ ready |\n| [Box Shadow Generator](tools/css-box-shadow-generator/) | ✅ ready |\n| [Gradient Generator](tools/css-gradient-generator/) | ✅ ready |\n\nMore tools and generators ship as standalone versions over time. The full set lives on [codefronts.com](https://codefronts.com).\n\n## Structure\n\n```\ntoolkit/\n├── index.html              # landing page — renders the grid from tools.json\n├── tools.json              # manifest: source of truth for the tool list\n├── assets/style.css        # shared theme (auto light/dark via prefers-color-scheme)\n├── tools/<slug>/index.html # one folder per tool\n├── .nojekyll               # disables Jekyll on GitHub Pages so _files aren't ignored\n├── LICENSE                 # MIT\n└── README.md\n```\n\n## Run locally\n\nThe landing page fetches `tools.json`, so it needs to be served over HTTP rather than opened as `file://`:\n\n```sh\npython3 -m http.server 8000\n# visit http://localhost:8000\n```\n\nIndividual tool pages work fine via `file://` — they're self-contained and don't fetch anything.\n\n## Live on GitHub Pages\n\nWhen the repo is public and Pages is enabled, the site is live at:\n\n```\nhttps://codefronts.github.io/toolkit/\n```\n\nEach tool gets its own clean URL — e.g. `https://codefronts.github.io/toolkit/tools/px-to-rem-converter/`.\n\n## Adding a new tool\n\n1. Create `tools/<slug>/index.html` (copy any existing tool as a starting point).\n2. Add an entry to `tools.json`:\n   ```json\n   { \"slug\": \"my-tool\", \"name\": \"My Tool\", \"description\": \"What it does.\", \"category\": \"tool\", \"status\": \"ready\" }\n   ```\n\nNo other file needs to change — the landing page renders directly from the manifest.\n\n## Contributing\n\nPull requests welcome — especially for:\n- New standalone tool implementations of anything from [codefronts.com/tools](https://codefronts.com/tools) or [codefronts.com/generators](https://codefronts.com/generators) that isn't here yet.\n- Bug fixes or polish on existing tools.\n- Accessibility improvements (keyboard navigation, screen-reader support, focu",
      }
    ],
  },
  {
    slug: "intent-ui",
    permission: {
      status: "granted",
      source: "https://github.com/irsyadadl/intentui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "intent-ui install and usage",
        url: "https://intentui.com/docs/getting-started/ai",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "m\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Docs\",\"item\":\"https://intentui.com/docs\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Getting started\",\"item\":\"https://intentui.com/docs/getting-started\"},{\"@type\":\"ListItem\",\"position\":4,\"name\":\"Working with AI\",\"item\":\"https://intentui.com/docs/getting-started/ai\"}]}]} Working with AI Copy page Registry To use the Intent UI registry, add the following entry to your components.json : { \"registries\" : { \"@intentui\" : \"https://intentui.com/r/{name}\" } } Initialize Choose a client and run one of the following commands: Codex Claude Cursor Gemini VS Code npx shadcn@latest mcp init --client codex Copy to clipboard Add the following to ~/.codex/config.toml : React aria MCP If you work with AI and use Intent UI, you should consider using the React Aria MCP server. The reason is simple. Intent UI provides a complete set of components, but there are cases where you may need to build a custom component with a different visual style without modifying Intent UI itself. In those situations, the MCP server becomes extremely helpful. Codex Claude Cursor Gemini VS Code codex mcp add react-aria -- npx @react-aria/mcp@latest Copy to clipboard Add the following to ~/.codex/config.toml : If you use both MCP servers, your config should look like this: Skills We provide a dedicated skill for Intent UI. To install it, run the command below. npm pnpm yarn bun npx skills add intentui/skills Copy to clipboard This skill enforces Intent UI conventions when writing or reviewing React and TSX code. You can see a preview of it in action here . What it does The intentui skill helps keep your code aligned with Intent UI best practices by: using components from src/components/ui/ instead of raw HTML elements using semantic design tokens like text-muted-fg and bg-primary instead of raw Tailwind utility colors like text-blue-500 or bg-red-600 applying Heroicons correctly without redundant data-slot=\"icon\" attributes or manual icon sizing inside UI components following the proper form structure with Fieldset , Legend , FieldError , and Description installing missing components from the registry through the shadcn CLI Structure intentui / ├── SKILL .md # Main skill definition └── rules / ├── styling.md # Semantic colors, cx / cn, size -* shorthand, intent prop ├── icons.md # Heroicons rules, 25 components that control icon sizing ├── forms.md # Fieldset, Legend, TextField, FieldError, Description patterns ├── components.md # HTML → Intent UI component mapping, Text / TextLink / Strong / Code └── cli.md # Search & install missing components from the registry Markdown files Every page in the docs is also published as a standalone Markdown file. To view it, add .md to the end of the page URL. You can also use the Copy page button on each page to copy the full content to your clipboard as Markdown. llms.txt The llms.txt file provides an index of all Markdown pages available across the React Aria documentation. References React Aria Shadcn MCP T",
      }
    ],
  },
  {
    slug: "reui",
    permission: {
      status: "granted",
      source: "https://github.com/keenthemes/reui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "reui install and usage",
        url: "https://github.com/keenthemes/reui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "ef0fe1252d9b24d69bdedee48a69ec9b29d1f217",
        content: "## Getting Started\n\n### Installation\n\nReUI follows the shadcn CLI approach - add blocks from the registry directly into your project (registry items use the `c-` prefix):\n\n```bash\nnpx shadcn@latest add @reui/c-button-10\nnpx shadcn@latest add @reui/c-data-grid-9\nnpx shadcn@latest add @reui/c-filters-5\n```\n\n### Quick Start\n\n1. **Browse the catalog** - Visit [reui.io/components](https://reui.io/components?utm_source=github&utm_medium=readme) to explore 1,175 composed examples (`c-*` blocks)\n2. **Copy code** - Each example includes a ready-to-use code snippet\n3. **Customize** - Modify with your Tailwind CSS tokens and design system\n4. **Own it** - The code lives in your repo, not a package\n\nReUI builds on [@tanstack/react-table](https://tanstack.com/table), [@dnd-kit/core](https://dndkit.com), [recharts](https://recharts.org), [react-hook-form](https://react-hook-form.com), and [Headless Tree](https://headless-tree.lukasbach.com) where it helps, and on plain React everywhere else.\n\n### Requirements\n\n- **React** 18+\n- **Tailwind CSS** 3+\n\n---\n\n## Documentation\n\n- **ReUI Docs** - [reui.io/docs](https://reui.io/docs?utm_source=github&utm_medium=readme)\n- **Component catalog** - [reui.io/components](https://reui.io/components?utm_source=github&utm_medium=readme) - legacy `/patterns` URLs redirect here\n- **GitHub** - [github.com/keenthemes/reui](https://github.com/keenthemes/reui)\n\nEach component page includes live examples, copy-paste snippets, CLI installation guides, TypeScript types, prop documentation, and accessibility notes.\n\n---\n\n## ReUI Pro\n\nReUI's **MCP Server** and **Agent Skill** are free for everyone - they make any AI coding agent genuinely good at building with ReUI.\nA one-time license then unlocks the premium catalog on the same shadcn/ui foundation, with lifetime source ownership - **Pro** for the blocks, **Ultimate** for the blocks plus the motion icons and the templates.\n\n| Feature | Access | Description | Live preview & docs |\n|---------|--------|-------------|---------------------|\n| **629 Pro Blocks** | Pro | Full-page sections across Application, Data Grid, Solutions, eCommerce, Marketing, and AI & Agents, including Event Calendar, Gantt, and Kanban board layouts | [Blocks](https://reui.io/blocks?utm_source=github&utm_medium=readme) · [Application](https://reui.io/blocks/application?utm_source=github&utm_medium=readme) · [Data Grid](https://reui.io/blocks/data-grid?utm_source=github&utm_medium=readme) · [Solutions](https://reui.io/blocks/solutions?utm_source=github&utm_medium=readme) · [eCommerce](https://reui.io/blocks/ecommerce?utm_source=github&utm_medium=readme) · [Marketing](https://reui.io/blocks/marketing?utm_source=github&utm_medium=readme) · [AI & Agents](https://reui.io/blocks/ai-agents?utm_source=github&utm_medium=readme) |\n| **638 Motion Icons** | Ultimate | Hand-crafted icons in 4 styles (Outline, Solid, Duotone, Filled) with hover animation, 2,552 variants | [Icons catalog](https://reui.io/icons?utm_source=github&utm_medium=readme) |\n| **MCP Server** | Free | Connect any coding agent (Claude, Codex, Cursor, v0, Lovable, Replit, OpenCode, VS Code, Zed) to the ReUI registry for live search, real component APIs and one-command installs | [MCP guide](https://reui.io/mcp?utm_source=github&utm_medium=readme) |\n| **Agent Skill** | Free | One command teaches your agent the ReUI workflow - search, install, read the real API, adapt by reuse | [Agent skills](https://reui.io/docs/agent-skills?utm_source=github&utm_medium=readme) |\n| **Workspace** | Pro | ReUI account with favorites, collections, and team access | [Sign in](https://reui.io/account?utm_source=github&utm_medium=readme) |\n\n### Pro Block Categories (65)\n\nEvery Pro category in the catalog, with its current block count. Blocks are full-page sections built on the same free primitives in this repo - [browse them all](https://reui.io/blocks?utm_source=github&utm_medium=readme).\n\n#### Application (344 blocks)\n\n| Category | Blocks | Description | Live preview |\n|----------|--------|-------------|--------------|\n| **App Shell** | 31 | App shell layouts with sidebar, rail, or top bar navigation for dashboards, settings panels, and multi-page apps | [App Shell blocks](https://reui.io/blocks/application/app-shell?utm_source=github&utm_medium=readme) |\n| **Auth** | 20 | Login, register, forgot password, and two-factor authentication page layouts | [Auth blocks](https://reui.io/blocks/application/auth?utm_source=github&utm_medium=readme) |\n| **Card** | 43 | Card components for content display, data summaries, and interactive elements | [Card blocks](https://reui.io/blocks/application/card?utm_source=github&utm_medium=readme) |\n| **Chart** | 47 | Chart components and layouts with bar, line, pie, and area charts for data storytelling | [Chart blocks](https://reui.io/blocks/application/chart?utm_source=github&utm_medium=readme) |\n| **Dashboard** | 8 | Dashboard components and layouts that combine stats, charts, and tables into a complete overvie",
      }
    ],
  },
  {
    slug: "elevenlabs-ui",
    permission: {
      status: "granted",
      source: "https://github.com/elevenlabs/ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "elevenlabs-ui install and usage",
        url: "https://github.com/elevenlabs/ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "23c31bd3088814215a8b5d0bfb56b327cad1a578",
        content: "## Installation\nYou can use the ElevenLabs Agents CLI directly with npx, or install it globally:\n```bash\n# Use directly (recommended)\nnpx @elevenlabs/cli@latest components add <component-name>\n\n# Or using shadcn cli\nnpx shadcn@latest add https://ui.elevenlabs.io/r/all.json\n```\n\n## Prerequisites\nBefore using ElevenLabs UI, ensure your Next.js project meets these requirements:\n- **Node.js 18** or later\n- **shadcn/ui** initialized in your project (npx shadcn@latest init)\n- **Tailwind CSS** configured\n\n## Usage\n\n### Install All Components\nInstall all available ElevenLabs UI components at once:\n```bash\nnpx @elevenlabs/cli@latest components add all\n```\nThis command will:\n- Set up shadcn/ui if not already configured\n- Install all ElevenLabs UI components to your configured components directory\n- Add necessary dependencies to your project\n\n### Install Specific Components\nInstall individual components using the `components add` command:\n```bash\nnpx @elevenlabs/cli@latest components add <component-name>\n```\nExamples:\n```bash\n# Install the orb component\nnpx @elevenlabs/cli@latest components add orb\n```\n\n### Alternative: Use with shadcn/ui CLI\n\nYou can also install components using the standard shadcn/ui CLI:\n```bash\n# Install all components\nnpx shadcn@latest add https://ui.elevenlabs.io/r/all.json\n\n# Install a specific component\nnpx shadcn@latest add https://ui.elevenlabs.io/r/orb.json\n```\n\nAll available components can be found [here](https://ui.elevenlabs.io/docs/components) or explore a list of example components [here](https://ui.elevenlabs.io/blocks).\n\n## Contributing\n\nIf you'd like to contribute to ElevenLabs UI, please follow these steps:\n\n1. Fork the repository\n2. Create a new branch\n3. Make your changes to the components in the registry.\n4. Open a PR to the main branch.\n\nPlease read the [contributing guide](/CONTRIBUTING.md).\n\n## License\n\nLicensed under the [MIT license](https://github.com/elevenlabs/ui/blob/main/LICENSE.md).\n\nEngineered by [ElevenLabs](https://elevenlabs.io).",
      }
    ],
  },
  {
    slug: "inspira-ui",
    permission: {
      status: "granted",
      source: "https://github.com/unovue/inspira-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "inspira-ui install and usage",
        url: "https://inspira-ui.com/docs/en/getting-started/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "ira UI Getting Started Components Changelogs Search… k Overview 4 Getting Started Installation How To Contribute Code of Conduct Getting Started Installation Copy page How to install Inspira UI in your app. This guide will help you install and set up Inspira UI components in your Vue or Nuxt application. If you are using Tailwind CSS v3, Checkout Inspira UI v1 here . Getting Started with Inspira UI Set up tailwindcss To begin, install tailwindcss using this Vite install guide for Vue or using this framework-specific guide for Nuxt . Add dependencies Install following supporting libraries. npm pnpm bun yarn npm install @vueuse/core motion-v tw-animate-css @inspira-ui/plugins pnpm install @vueuse/core motion-v tw-animate-css @inspira-ui/plugins bun add @vueuse/core motion-v tw-animate-css @inspira-ui/plugins yarn add @vueuse/core motion-v tw-animate-css @inspira-ui/plugins Follow this guide to setup motion-v on Vue or Nuxt . Update your main.css file Skip this step if you are using shadcn-vue . Add the following code to your main.css file, this setup the variable required for the components: Nuxt UI Other TailwindCSS Kit main.css @import \" tailwindcss \" ; @import \" @nuxt/ui \" ; @theme static { --color-background: var(--ui-bg); --color-foreground: var(--ui-text); --color-card: var(--ui-bg-elevated); --color-card-foreground: var(--ui-text); --color-popover: var(--ui-bg-elevated); --color-popover-foreground: var(--ui-text); --color-muted: var(--ui-bg-muted); --color-muted-foreground: var(--ui-text-muted); --color-accent: var(--ui-bg-accented); --color-accent-foreground: var(--ui-text); --color-border: var(--ui-border); --color-input: var(--ui-border); --color-primary: var(--ui-primary); --color-primary-foreground: var(--ui-text-inverted); --color-secondary: var(--ui-secondary); --color-secondary-foreground: var(--ui-text-inverted); --color-destructive: var(--ui-error); --color-destructive-foreground: var(--ui-text-inverted); --color-ring: var(--ui-primary); --radius: var(--ui-radius); } : root { --background : var ( --ui-bg ); --foreground : var ( --ui-text ); --card : var ( --ui-bg-elevated ); --card-foreground : var ( --ui-text ); --popover : var ( --ui-bg-elevated ); --popover-foreground : var ( --ui-text ); --muted : var ( --ui-bg-muted ); --muted-foreground : var ( --ui-text-muted ); --accent : var ( --ui-bg-accented ); --accent-foreground : var ( --ui-text ); --border : var ( --ui-border ); --input : var ( --ui-border ); --primary : var ( --ui-primary ); --primary-foreground : var ( --ui-text-inverted ); --secondary : var ( --ui-secondary ); --secondary-foreground : var ( --ui-text-inverted ); --destructive : var ( --ui-error ); --destructive-foreground : var ( --ui-text-inverted ); --ring : var ( --ui-primary ); } Expand code main.css @import \" tailwindcss \" ; @import \" tw-animate-css \" ; @custom-variant dark (&:is(.dark *)) ; : root { --card : oklch ( 1 0 0 ); --card-foreground : oklch ( 0.141 0.005 285.823 ); --popover : oklch ( 1 0 0 ); --po",
      }
    ],
  },
  {
    slug: "reka-ui",
    permission: {
      status: "granted",
      source: "https://github.com/unovue/reka-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "reka-ui install and usage",
        url: "https://github.com/unovue/reka-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "75747ccd7a04eae0d3352052bda88a2bebd4b803",
        content: "## Installation\n\n```bash\npnpm add radix-vue\n```\n```bash\nnpm install radix-vue\n```\n```bash\nyarn add radix-vue\n```\n\n## Documentation\n\nFor full documentation, visit [radix-vue.com](https://radix-vue.com).\n\n## Releases\n\nFor changelog, visit [releases](https://github.com/unovue/radix-vue/releases).\n\n## Contributing\n\nWe would love to have your contributions! All PRs all welcomed! We need help building the core components, docs, tests, stories! Join our discord and we will get you up and running!\n\n## Dev Setup\n\n### Docs\n\n1. Clone the repo\n2. Run `pnpm i`\n3. Run `pnpm build` to run build `radix-vue` locally\n3. Run `pnpm docs:dev` to run vitepress\n4. Open `http://localhost:5173`\n\n### Package\n\n1. Clone the repo\n2. Run `pnpm i`\n3. Run `pnpm story:dev` to run histoire (storybook)\n4. Open `http://localhost:6006`\n\n## Authors\n\n- [Khairul Haaziq](https://github.com/k11q)\n- [Mujahid Anuar](https://github.com/mujahidfa)\n- [Zernonia](https://github.com/zernonia)\n\n## Credits\n\nAll credits go to these open-source works and resources\n\n- [Radix UI](https://radix-ui.com) for doing all the hard work to make sure components are accessible\n- [Floating UI](https://floating-ui.com) for creating powerful components that as the base of many Radix Vue components\n- [VueUse](https://vueuse.org) for providing many useful utilities.\n- [Ark UI](https://ark-ui.com) for the `<Primitive>` component\n- [Radix Svelte](https://radix-svelte.com)\n- [Headless UI](https://headlessui.com)",
      }
    ],
  },
  {
    slug: "melt-ui",
    permission: {
      status: "granted",
      source: "https://github.com/melt-ui/next-gen",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "melt-ui install and usage",
        url: "https://next.melt-ui.com/guides/installation",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "ct theme Dark Light Auto On this page Overview Prerequisites Installation Basic Usage Using Builders Using Components Next Steps On this page Overview Prerequisites Installation Basic Usage Using Builders Using Components Next Steps Installation Get started with Melt UI by installing it in your Svelte project. 🚧 Melt is in its early stages. Expect breaking changes in minor releases until 1.0 is ready! And lots of new stuff too. 🚀 Prerequisites Section titled “Prerequisites” Node.js version 18 or higher A Svelte project using version 5.0.0 or higher Installation Section titled “Installation” pnpm npm yarn Terminal window pnpm add melt Terminal window npm install melt Terminal window yarn add melt Basic Usage Section titled “Basic Usage” Melt UI provides two ways to use components. Using Builders Section titled “Using Builders” Builders can be called from a Svelte component, or svelte.js|ts files. Uses getters and setters for reactive properties. &#x3C; script lang = \" ts \" > import { Toggle } from \" melt/builders \" ; let value = $ state ( false ) const toggle = new Toggle ( { value : () => value , onValueChange : ( v ) => (value = v) , } ) ; &#x3C;/ script > &#x3C; button { ... toggle . trigger } > { toggle . value ? \" On \" : \" Off \" } &#x3C;/ button >  {toggle.value ? &#x22;On&#x22; : &#x22;Off&#x22;} \"> Using Components Section titled “Using Components” The component pattern provides a more traditional Svelte experience. It provides no elements or styling, and instead provides you with a instance from the builder. The difference lies in being able to use the bind: directive. &#x3C; script lang = \" ts \" > import { Toggle } from \" melt/components \" ; let value = $ state ( false ) &#x3C;/ script > &#x3C; Toggle bind : value > {# snippet children (toggle) } &#x3C; button { ... toggle . trigger } > { toggle . value ? \" On \" : \" Off \" } &#x3C;/ button > {/ snippet } &#x3C;/ Toggle >  {#snippet children(toggle)}  {toggle.value ? &#x22;On&#x22; : &#x22;Off&#x22;}  {/snippet} \"> Next Steps Section titled “Next Steps” Check out our components and preview how they work Learn about styling to customize the look and feel Read our How to Use guide for tips on using Melt UI effectively Next Styling",
      }
    ],
  },
  {
    slug: "zard-ui",
    permission: {
      status: "granted",
      source: "https://github.com/zard-ui/zardui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "zard-ui install and usage",
        url: "https://www.zardui.com/docs/cli",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "Setup Architecture Project Structure Components Blocks Documentation Testing Workflow Release FAQ CLI Copy Page Previous Next Use the zard/ui CLI to add beautiful, accessible components to your Angular project with a single command. Installation Get zard/ui up and running in your project with these steps. Step 1: Initialize your project Run the init command to set up zard/ui. It installs the dependencies, writes the theme tokens and configures the import aliases — and, in an application, wires Tailwind into the build. What runs follows from the project type you pick in the first question. npm pnpm yarn bun npx zard-cli@latest init pnpm dlx zard-cli@latest init yarn zard-cli@latest init bunx zard-cli@latest init The first question is what kind of project you are setting up. Everything after it follows from that answer — which files get configured, and where the components will live. Terminal ◇ zard/ui · initialize Setting up zard/ui in your project… ◆ What are you setting up? ❯ Angular Application — providers in app.config.ts, tokens in the global CSS. Angular Library Publishable library — components ship with it, no app providers. Nx Application inside an Nx workspace — paths go to tsconfig.base.json. Nx Library Library inside an Nx workspace — lives in libs/, no app providers. Analog.js Vite-powered Angular app — Tailwind is a Vite plugin, not PostCSS. Decides where the components live and what init has to configure. ↑/↓ choose enter confirm esc back Answered questions stay on screen as a transcript, and the paths suggested from there on come from the project you picked: Terminal ✔ project type … Nx ✔ app … web ◆ Where is your app.config.ts file? › apps/web/src/app/app.config.ts zard/ui registers its global providers in this file. enter confirm ⌫ edit esc back Text fields are fully editable: arrows and Home / End move the caret, Delete and Backspace cut on either side of it, and Ctrl+W drops the previous word. The first keystroke replaces the whole suggestion — press ← first if you would rather edit it. Once everything is answered, the steps run with live progress. Steps that take a while — installing dependencies, usually — show how long they have been running, so a spinner is never mistaken for a stuck process. Terminal ✔ Writing configuration… ✔ components.json — component & utils aliases ✔ dependencies — CDK, CVA, tailwind-merge, ng-icons (Lucide) ✔ apps/web/src/app/app.config.ts — zard/ui providers ✔ apps/web/.postcssrc.json — Tailwind PostCSS plugin ✔ apps/web/src/styles.css — theme tokens (neutral) ✔ tsconfig.base.json — import path aliases ✔ core & utils — shared helpers used by every component ████████████████████████████████████████ 100% ╭───────────────────────────────────────────────╮ │ ✔ zard/ui has been initialized successfully! │ ╰───────────────────────────────────────────────╯ Step 2: Add components Add one component, several at once, or every available one. Dependencies between components are resolved for you: asking for a comp",
      }
    ],
  },
  {
    slug: "spartan-ui",
    permission: {
      status: "granted",
      source: "https://github.com/spartan-ng/spartan",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "spartan-ui install and usage",
        url: "https://github.com/spartan-ng/spartan#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "d09b75c826cf064508cac69958e21f883555e3fe",
        content: "### Install Dependencies\n\nRun `pnpm install` to install the dependencies of this project.\n\n### Development with storybook\n\nA storybook project is set up and is the primary way to develop UI components. You can run it with:\n\n```\npnpm run storybook\n```\n\nStory files live in `apps/ui-storybook/stories`, one per primitive, e.g. `apps/ui-storybook/stories/accordion.stories.ts`.\n\nUse these files to add stories and drive development of the primitives.\n\n### Testing\n\nspartan uses [Jest](https://jestjs.io) for tests. To test all projects locally, run the following command from the root\nfolder:\n\n```shell\npnpm run test\n```\n\n### e2e testing\n\nCypress e2e testing is set up to run on the storybook. You can run it with:\n\n```\npnpm run e2e\n```\n\nTo add your own `e2e` tests add them to the `apps/ui-storybook-e2e` application.\n\n## spartan/stack\n\nAn example application running\non [Supabase](https://supabase.com/), [Drizzle](https://orm.drizzle.team/), [Analog](https://analogjs.org/),\n[tRPC](https://trpc.io/), [Tailwind](https://tailwindcss.com/), [Angular](https://angular.io/),\nand [Nx](https://nx.dev/). It also serves as the documentation page introducing the stack and UI library.\n\nFollow the directions in the official documentation to set up your own project:\nhttps://www.spartan.ng/stack/overview\n\n### Example App\n\nIn the `apps` folder of this repository, you can also find an example application of the spartan stack.\nIt also serves as the documentation page for this project.\n\nFollow the directions below to get it up and running:\n\n#### Prerequisites\n\n- You will need `pnpm` as your package manager.\n- You will need to set up a [Supabase](https://supabase.com/) account (it's free)\n- You will need [NodeJs](https://nodejs.org/en) installed. The version I have working is `20.17.0`.\n\n#### Development server\n\nThen you can run the following command:\n\n```shell\npnpm nx serve app\n```\n\nor\n\n```shell\npnpm run dev\n```\n\nfor a dev server. Navigate to http://localhost:4200/. The app will automatically reload\nif you change any of the source files.\n\n#### Database\n\nWe use Drizzle to connect to a Supabase instance for the example app.\n\nAdd an `.env` file to your repo with the following contents:\n\nAdd a `.env` file at the root of your Nx workspace and add the connection string like so:\n\n```\nDATABASE_URL=\"postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-REFERENCE-ID].supabase.co:5432/postgres?schema=public\"\n```\n\nAnd make sure to run the following script in your Supabase editor to set up the necessary tables:\n\n```sql\ncreate table\n  public.note (\n    id bigserial,\n    title text not null,\n    content text null,\n    created_at timestamp with time zone null default current_timestamp,\n    constraint notes_pkey primary key (id)\n  ) tablespace pg_default;\n```\n\n> [!NOTE] > `.env` should be added to `.gitignore`\n\n## Understand this workspace\n\nRun `pnpm nx graph` to see a diagram of the dependencies of the projects.\n\n## Documentation\n\n- [Introduction](https://www.spartan.ng/documentation/introduction)\n- [Installation](https://www.spartan.ng/documentation/installation)\n- [CLI](https://www.spartan.ng/documentation/cli)\n- [Theming](https://www.spartan.ng/documentation/theming)\n- [Components](https://www.spartan.ng/components)\n- [Blocks](https://www.spartan.ng/blocks)\n\n## Community\n\n- [Discord](https://discord.gg/EqHnxQ4uQr)\n- [GitHub](https://github.com/spartan-ng/spartan)\n- [Sponsor the project](https://github.com/sponsors/goetzrobin)\n\nRun into an issue or have a question? Open an issue on [GitHub](https://github.com/spartan-ng/spartan/issues) or say hi in [Discord](https://discord.gg/EqHnxQ4uQr).\n\n## License\n\nMIT © [goetzrobin](https://github.com/goetzrobin) and the [spartan contributors](https://github.com/spartan-ng/spartan/graphs/contributors)",
      }
    ],
  },
  {
    slug: "corvu",
    permission: {
      status: "granted",
      source: "https://github.com/corvudev/corvu",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "corvu install and usage",
        url: "https://corvu.dev/docs/installation/",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "croll transitionSize Overview Introduction Installation Usage Overview State Styling Dynamic Primitives Accordion Calendar Dialog Disclosure Drawer OTP Field Popover Resizable Tooltip Utilities dismissible focusTrap list persistent presence preventScroll transitionSize Installation corvu provides every UI primitive as a separate package. This allows you to only install the primitives you need, to use the semver of every package as a reference for breaking/feature changes and progressively update packages in case of new versions. For example the drawer component is available as @corvu/drawer : npm install @corvu/drawer Copy code If you want to install all primitives at once you can install the main package. Unused primitives will get tree-shaken by your bundler, so you don’t have to worry about the bundle size. npm install corvu Copy code You’re good to go! Head over to Usage to learn how to use corvu. Tailwind CSS plugin Section titled Tailwind CSS plugin If you want make use of the tailwind modifiers like corvu-open: , install the tailwind plugin: npm install @corvu/tailwind Copy code Then add the plugin to your tailwind.config.js file: module . exports = { // ... plugins : [ // Use it with the default prefix 'corvu' require ( '@corvu/tailwind' ) , // or with a custom prefix require ( '@corvu/tailwind' )({ prefix : 'ui' }) , // ... ] , } Check out the Styling guide learn how to use the tailwind plugin. Tailwind v4.0 Section titled Tailwind v4.0 Tailwind CSS v4.0 improved working with data attributes a lot and this plugin isn’t considered useful anymore. You can target corvu’s data attributes directly (eg. data-open: or group-data-open: ). UnoCSS preset Section titled UnoCSS preset We also provide a preset for UnoCSS that adds the same modifiers. npm install @corvu/unocss Copy code Add the preset to your uno.config.tsx file: import { defineConfig } from 'unocss' import presetCorvu from '@corvu/unocss' export default defineConfig ({ // ... presets : [ // Use it with the default prefix 'corvu' presetCorvu () , // or with a custom prefix presetCorvu ({ prefix : 'ui' }) , // ... ] , }) Check out the Styling guide learn how to use the UnoCSS preset. Developed and designed by Jasmin On this page Tailwind CSS plugin Tailwind v4.0 UnoCSS preset",
      }
    ],
  },
  {
    slug: "starwind-ui",
    permission: {
      status: "granted",
      source: "https://github.com/starwind-ui/starwind-ui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "starwind-ui install and usage",
        url: "https://github.com/starwind-ui/starwind-ui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "eae0233c05ae6cdef4978787fc4a202beb1eb023",
        content: "<p align=\"center\">\n  <img alt=\"Starwind UI\" src=\"https://shieldcn.dev/header/gradient.svg?title=Starwind+UI&amp;mode=dark&amp;theme=blue\" />\n</p>\n\n<p align=\"center\">\n  <a href=\"https://github.com/starwind-ui/starwind-ui\"><img alt=\"npm + stars\" src=\"https://shieldcn.dev/group/npm/starwind+github/stars/starwind-ui/starwind-ui.svg\" /></a>\n  <!-- <a href=\"https://www.npmjs.com/package/starwind\"><img alt=\"badge\" src=\"https://shieldcn.dev/npm/starwind.svg\" /></a>\n  <a href=\"https://github.com/starwind-ui/starwind-ui\"><img alt=\"badge\" src=\"https://shieldcn.dev/github/starwind-ui/starwind-ui/stars.svg\" /></a> -->\n  <a href=\"https://www.npmjs.com/package/starwind\"><img alt=\"downloads\" src=\"https://shieldcn.dev/npm/dm/starwind.svg\" /></a>\n  <a href=\"https://x.com/boston343builds\"><img alt=\"follow\" src=\"https://shieldcn.dev/x/follow/boston343builds.svg?split=true\" /></a>\n</p>\n\n**Astro-first, framework-portable UI components you can own.**\n\nStarwind UI gives you accessible, Tailwind CSS components with Starwind/shadcn-style ergonomics,\nbacked by a portable Runtime that powers Astro, React, Vue 3.5 beta, and Svelte 5 beta adapters\ntoday.\n\n**[Explore Components](https://starwind.dev/docs/components/)**\n\n## Why Starwind?\n\n- **🎯 Own Your Code** — Styled components live in your project, where you can understand and customize them.\n- **✨ Animated by Default** — Smooth, polished animations out of the box with Tailwind CSS v4.\n- **♿ Accessible** — Keyboard navigable and screen reader friendly. Built with a11y in mind.\n- **🚀 Portable Runtime** — Shared DOM behavior with generated Astro, React, Vue 3.5 beta, and Svelte 5 beta adapters.\n- **🛠️ CLI-Powered** — Add only what you need with a simple `npx starwind add` command.\n\n> Looking for the main package? See [starwind-ui/cli](/packages/cli/README.md).\n\n## Get Started\n\nInitialize an Astro or React project with the stable release:\n\n```bash\nnpx starwind@latest init\n```\n\nThen add the components you need:\n\n```bash\nnpx starwind@latest add\n```\n\n### Vue 3.5 beta\n\nTry the public beta in Vite Vue, Astro Vue, Nuxt 3 or 4, Laravel with Inertia Vue, or Quasar Vite\nSPA/SSR projects:\n\n```bash\nnpm install @starwind-ui/vue@beta vue@^3.5\nnpx starwind@latest init --framework vue\n```\n\nVue adapters use idiomatic `v-model` arguments, matching `update:*` events, and normal detailed\nevent listeners. The Styled Image component remains Astro-only. The Vue API can change during the\n`0.x` series. Report beta feedback in the\n[Starwind UI issue tracker](https://github.com/starwind-ui/starwind-ui/issues).\n\n### Svelte 5 beta\n\nTry the public beta in Vite with Svelte, SvelteKit, or Astro with Svelte:\n\n```bash\nnpm install @starwind-ui/svelte@beta \"svelte@>=5.29.0 <6\"\nnpx starwind@latest init --framework svelte\n```\n\nThe beta provides the same 36 Primitive families and 54 portable Styled components as the other\nfirst-party adapters. The Styled Image component remains Astro-only. Starwind Pro setup is not\navailable for Svelte. The Svelte API can change",
      }
    ],
  },
  {
    slug: "webcoreui",
    permission: {
      status: "granted",
      source: "https://github.com/Frontendland/webcoreui",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "webcoreui install and usage",
        url: "https://github.com/Frontendland/webcoreui#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "f82f6226fa06ac4025aa07d13d0ab3b605dcb89d",
        content: "#installation-with-cli)\n    - [Manual Installation](#manual-installation)\n    - [Setup](#setup)\n    - [Using Components](#using-components)\n- [Components](#components)\n- [Blocks](#blocks)\n- [Templates](#templates)\n\n## Documentation\n\n- Full documentation available on [webcoreui.dev](https://webcoreui.dev).\n- For installation steps, visit our [setup docs](https://webcoreui.dev/docs/setup).\n- To build and test components visually, visit our [builder](https://webcoreui.dev/build).\n\n## Getting Started\n\nWebcore can be used as a standalone project, or it can be integrated into your existing Astro, Svelte, or React ecosystems. The easiest way to get started is to clone the repository and run `npm run dev` to start building your pages with the components available.\n\n### Prerequisites\n\n> [!NOTE]\n> Before getting started, make sure you have a package manager installed, such as <a href=\"https://nodejs.org/en/\" rel=\"noreferrer\">Node</a>.\n\nWebcore components use Sass for styling. To use the component library, you must have the following packages installed:\n\n- [Sass](https://www.npmjs.com/package/sass) - `v1.100`\n- [TypeScript](https://www.npmjs.com/package/typescript) - `v5.9`\n\nDepending on your project setup, you'll also need the following packages:\n\n- **For Astro projects**\n    - [Astro](https://www.npmjs.com/package/astro) - `v5.18`\n- **For Svelte projects**\n    - [Svelte](https://www.npmjs.com/package/svelte) - `v5.55`\n- **For React projects**\n    - [React](https://www.npmjs.com/package/react) - `v19.2`\n    - [React DOM](https://www.npmjs.com/package/react-dom) -`v19.2`\n\n### Installation with CLI\n\nYou can use our CLI tool to create a new Webcore project, or integrate it into an existing project more easily:\n\n```bash\n# Create a new Webcore project\nnpm create webcore@latest\n\n# Update configuration files for an existing Astro project\nnpm create webcore@latest config\n\n# Create a new Webcore project with a specific template\nnpm create webcore@latest template [TemplateName] [destination]\n\n# Use the \"Portfolio\" template on the current directory\nnpm create webcore@latest template Portfolio\n\n# Create the \"Portfolio\" template in the \"portfolio\" directory\nnpm create webcore@latest template Portfolio ./portfolio\n```\n\n### Manual Installation\n\nInstall Webcore as a dependency by running one of the following command:\n\n```bash\n# Using NPM\nnpm i webcoreui\n\n# Using Yarn\nyarn add webcoreui\n```\n\n### Setup\n\nAdd the following integration to your Astro configuration file (`astro.config.mjs`) at the root of your project directory:\n\n```js\nimport { webcore } from 'webcoreui/integration'\n\nexport default defineConfig({\n    integrations: [webcore()]\n})\n```\n\n> [!TIP]\n> We also recommend adding [`astro-purgecss`](https://www.npmjs.com/package/astro-purgecss) to improve your CSS bundle size.\n\nCreate an empty [`webcore.config.scss`](https://webcoreui.dev/docs/css-configuration#webcoreconfigscss) file at the root of your project to setup CSS configurations. Setup default styles and fonts by calling the following in your global SCSS file:\n\n```scss\n@use 'webcoreui/styles' as *;\n@include setup((\n    // Define paths for your fonts\n    fontRegular: '/fonts/Inter-Regular.woff2',\n    fontBold: '/fonts/Inter-Bold.woff2'\n));\n```\n\n> [!TIP]\n> You can download the fonts Webcore uses from the [`public/fonts`](https://github.com/Frontendland/webcoreui/tree/main/public/fonts) directory.\n\nThe `setup` mixin can also accept the following options:\n\n\n| Property  | Default value | Purpose |\n|-----------|---------------|---------|\n| `includeResets` | `true` | Include reset styles. Set to `false` if you want to use your own CSS resets. |\n| `includeUtilities` | `true` | Adds utility classes for CSS. Read more about the available utility classes [here](https://webcoreui.dev/docs/layout). |\n| `includeTooltip` | `true` | Adds styles for using tooltips.\n| `includeScrollbarStyles` | `true` | Adds styles for scrollbars.\n| `includeBreakpoints` | `true` | Exposes breakpoint variables in CSS for JS. Used by components for responsiveness. |\n| `theme` | `dark` | Sets the default theme. Read more about available themes [here](https://webcoreui.dev/docs/themes). |\n| `themes` | `()` | Pass a map to enable multiple themes. Values can be arbitrary CSS selectors that actives the theme. |\n\nDefault component styles can be changed by overriding the following CSS variables:\n\n```scss\nhtml body {\n    // Avatar component\n    --w-avatar-border: var(--w-color-primary-70);\n\n    // Banner component\n    --w-banner-top: 0;\n\n    // BottomNavigation component\n    --w-bottom-navigation-max-width: auto;\n\n    // Checkbox component\n    --w-checkbox-color: var(--w-color-primary);\n\n    // Collapsible component\n    --w-collapsible-initial-height: 0;\n    --w-collapsible-max-height: 100%;\n\n    // Counter component\n    --w-counter-width: 10ch;\n\n    // Masonry component\n    --w-masonry-gap: 5px;\n\n    // Progress component\n    --w-progress-color: var(--w-color-primary);\n    --w-progress-background: var(--w-color-prima",
      }
    ],
  },
  {
    slug: "web-awesome",
    permission: {
      status: "granted",
      source: "https://github.com/shoelace-style/webawesome",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "web-awesome install and usage",
        url: "https://webawesome.com/docs",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "site-docs@2026-10-10",
        content: "/utilities.css \" /> &lt;!-- Optional: CSS reset (\"Native Styles\") --> &lt; link rel = \" stylesheet \" href = \" https://ka-f.webawesome.com/ [email&#160;protected] /styles/native.css \" /> Prefer one line? styles/webawesome.css pulls in the theme, utility classes, and native styles together. Now you can use any Web Awesome component ! Try putting a button on the page: &lt; wa-button variant = \" brand \" > Click me! &lt;/ wa-button > Using Web Awesome Pro? Visit your workspaces for personalized installation docs. Installing with npm Link to This Section Start by installing the Web Awesome package: npm install @awesome.me/webawesome Then, in your JavaScript files, import the default theme and any components you want to use. // Web Awesome styles import '@awesome.me/webawesome/dist/styles/webawesome.css' ; // Import the components you want to use import '@awesome.me/webawesome/dist/components/button/button.js' ; import '@awesome.me/webawesome/dist/components/input/input.js' ; Once a component has been imported, you can use it in your HTML normally. Components are cherry picked to ensure you're getting the smallest possible bundle. You can find each component import in the \"Importing\" section of its documentation. Using Web Awesome Pro? Visit your workspaces for personalized installation docs. Get the Download (Advanced) Link to This Section You can download Web Awesome from npm and self-host it. npm pack @awesome.me/webawesome This will download a .tgz archive containing all Web Awesome files. Extract it and host the files on your own server. Additional Setup Link to This Section The Difference Between /dist & /dist-cdn Link to This Section If you have Web Awesome installed locally via npm, you'll notice the following directories in the project's root: dist/ dist-cdn/ The dist-cdn files come with everything bundled together, so you can use them directly without a build tool. The dist files keep dependencies separate, which lets your bundler optimize and share code more efficiently. Use dist-cdn if you're loading directly in the browser or from a CDN. Use dist if you're using a bundler like Webpack or Vite. Referencing Necessary Styles Link to This Section If you're self-hosting Web Awesome, you'll need to set up your pages to reference any necessary styles. You can do so by referencing webawesome.css , or you can pick and choose specific stylesheets you'd like to use. &lt;!-- Option 1: use all Web Awesome styles --> &lt; link rel = \" stylesheet \" href = \" /dist/styles/webawesome.css \" /> &lt;!-- Option 2: pick and choose styles --> &lt;!-- Required: theme --> &lt; link rel = \" stylesheet \" href = \" /dist/styles/themes/default.css \" /> &lt;!-- Recommended: utility classes (\"CSS Utilities\") --> &lt; link rel = \" stylesheet \" href = \" /dist/styles/utilities.css \" /> &lt;!-- Optional: CSS reset (\"Native Styles\") --> &lt; link rel = \" stylesheet \" href = \" /dist/styles/native.css \" /> If you choose to use a theme other than the default theme, be sure to add",
      }
    ],
  },
  {
    slug: "cmdk",
    permission: {
      status: "granted",
      source: "https://github.com/pacocoursey/cmdk",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "cmdk install and usage",
        url: "https://github.com/pacocoursey/cmdk#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "dd2250ed608443e8f32bafc5fa2d1d07a3746aa3",
        content: "## Install\n\n```bash\npnpm install cmdk\n```\n\n## Use\n\n```tsx\nimport { Command } from 'cmdk'\n\nconst CommandMenu = () => {\n  return (\n    <Command label=\"Command Menu\">\n      <Command.Input />\n      <Command.List>\n        <Command.Empty>No results found.</Command.Empty>\n\n        <Command.Group heading=\"Letters\">\n          <Command.Item>a</Command.Item>\n          <Command.Item>b</Command.Item>\n          <Command.Separator />\n          <Command.Item>c</Command.Item>\n        </Command.Group>\n\n        <Command.Item>Apple</Command.Item>\n      </Command.List>\n    </Command>\n  )\n}\n```\n\nOr in a dialog:\n\n```tsx\nimport { Command } from 'cmdk'\n\nconst CommandMenu = () => {\n  const [open, setOpen] = React.useState(false)\n\n  // Toggle the menu when ⌘K is pressed\n  React.useEffect(() => {\n    const down = (e) => {\n      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {\n        e.preventDefault()\n        setOpen((open) => !open)\n      }\n    }\n\n    document.addEventListener('keydown', down)\n    return () => document.removeEventListener('keydown', down)\n  }, [])\n\n  return (\n    <Command.Dialog open={open} onOpenChange={setOpen} label=\"Global Command Menu\">\n      <Command.Input />\n      <Command.List>\n        <Command.Empty>No results found.</Command.Empty>\n\n        <Command.Group heading=\"Letters\">\n          <Command.Item>a</Command.Item>\n          <Command.Item>b</Command.Item>\n          <Command.Separator />\n          <Command.Item>c</Command.Item>\n        </Command.Group>\n\n        <Command.Item>Apple</Command.Item>\n      </Command.List>\n    </Command.Dialog>\n  )\n}\n```\n\n## Parts and styling\n\nAll parts forward props, including `ref`, to an appropriate element. Each part has a specific data-attribute (starting with `cmdk-`) that can be used for styling.\n\n### Command `[cmdk-root]`\n\nRender this to show the command menu inline, or use [Dialog](#dialog-cmdk-dialog-cmdk-overlay) to render in a elevated context. Can be controlled with the `value` and `onValueChange` props.\n\n> **Note**\n>\n> Values are always trimmed with the [trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) method.\n\n```tsx\nconst [value, setValue] = React.useState('apple')\n\nreturn (\n  <Command value={value} onValueChange={setValue}>\n    <Command.Input />\n    <Command.List>\n      <Command.Item>Orange</Command.Item>\n      <Command.Item>Apple</Command.Item>\n    </Command.List>\n  </Command>\n)\n```\n\nYou can provide a custom `filter` function that is called to rank each item. Note that the value will be trimmed.\n\n```tsx\n<Command\n  filter={(value, search) => {\n    if (value.includes(search)) return 1\n    return 0\n  }}\n/>\n```\n\nA third argument, `keywords`, can also be provided to the filter function. Keywords act as aliases for the item value, and can also affect the rank of the item. Keywords are trimmed.\n\n```tsx\n<Command\n  filter={(value, search, keywords) => {\n    const extendValue = value + ' ' + keywords.join(' ')\n    if (extendValue.includes(search)) return 1\n    return 0\n  }}\n/>\n```\n\nOr disable filtering and sorting entirely:\n\n```tsx\n<Command shouldFilter={false}>\n  <Command.List>\n    {filteredItems.map((item) => {\n      return (\n        <Command.Item key={item} value={item}>\n          {item}\n        </Command.Item>\n      )\n    })}\n  </Command.List>\n</Command>\n```\n\nYou can make the arrow keys wrap around the list (when you reach the end, it goes back to the first item) by setting the `loop` prop:\n\n```tsx\n<Command loop />\n```\n\n### Dialog `[cmdk-dialog]` `[cmdk-overlay]`\n\nProps are forwarded to [Command](#command-cmdk-root). Composes Radix UI's Dialog component. The overlay is always rendered. See the [Radix Documentation](https://www.radix-ui.com/docs/primitives/components/dialog) for more information. Can be controlled with the `open` and `onOpenChange` props.\n\n```tsx\nconst [open, setOpen] = React.useState(false)\n\nreturn (\n  <Command.Dialog open={open} onOpenChange={setOpen}>\n    ...\n  </Command.Dialog>\n)\n```\n\nYou can provide a `container` prop that accepts an HTML element that is forwarded to Radix UI's Dialog Portal component to specify which element the Dialog should portal into (defaults to `body`). See the [Radix Documentation](https://www.radix-ui.com/docs/primitives/components/dialog#portal) for more information.\n\n```tsx\nconst containerElement = React.useRef(null)\n\nreturn (\n  <>\n    <Command.Dialog container={containerElement.current} />\n    <div ref={containerElement} />\n  </>\n)\n```\n\n### Input `[cmdk-input]`\n\nAll props are forwarded to the underlying `input` element. Can be controlled with the `value` and `onValueChange` props.\n\n```tsx\nconst [search, setSearch] = React.useState('')\n\nreturn <Command.Input value={search} onValueChange={setSearch} />\n```\n\n### List `[cmdk-list]`\n\nContains items and groups. Animate height using the `--cmdk-list-height` CSS variable.\n\n```css\n[cmdk-list] {\n  min-height: 300px;\n  height: var(--cmdk-list-height);\n  max-height: 500px;\n  transition: height 100ms ease;\n}\n```\n\nTo scroll item in",
      }
    ],
  },
  {
    slug: "kbar",
    permission: {
      status: "granted",
      source: "https://github.com/timc1/kbar",
      checkedAt: "2026-10-09T20:12:29.747Z",
    },
    snapshots: [
      {
        title: "kbar install and usage",
        url: "https://github.com/timc1/kbar#readme",
        fetchedAt: "2026-10-09T20:12:29.747Z",
        sourceRevision: "26ec0f49f92ab34fa6ab59392782d56020f28098",
        content: "### Usage\n\nHave a fully functioning command menu for your site in minutes. First, install kbar.\n\n```\nnpm install kbar\n```\n\nThere is a single provider which you will wrap your app around; you do not have to wrap your\n_entire_ app; however, there are no performance implications by doing so.\n\n```tsx\n// app.tsx\nimport { KBarProvider } from \"kbar\";\n\nfunction MyApp() {\n  return (\n    <KBarProvider>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nLet's add a few default actions. Actions are the core of kbar – an action define what to execute\nwhen a user selects it.\n\n```tsx\n  const actions = [\n    {\n      id: \"blog\",\n      name: \"Blog\",\n      shortcut: [\"b\"],\n      keywords: \"writing words\",\n      perform: () => (window.location.pathname = \"blog\"),\n    },\n    {\n      id: \"contact\",\n      name: \"Contact\",\n      shortcut: [\"c\"],\n      keywords: \"email\",\n      perform: () => (window.location.pathname = \"contact\"),\n    },\n  ]\n\n  return (\n    <KBarProvider actions={actions}>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nNext, we will pull in the provided UI components from kbar:\n\n```tsx\n// app.tsx\nimport {\n  KBarProvider,\n  KBarPortal,\n  KBarPositioner,\n  KBarAnimator,\n  KBarSearch,\n  useMatches,\n  NO_GROUP\n} from \"kbar\";\n\n// ...\n  return (\n    <KBarProvider actions={actions}>\n      <KBarPortal> // Renders the content outside the root node\n        <KBarPositioner> // Centers the content\n          <KBarAnimator> // Handles the show/hide and height animations\n            <KBarSearch /> // Search input\n          </KBarAnimator>\n        </KBarPositioner>\n      </KBarPortal>\n      <MyApp />\n    </KBarProvider>;\n  );\n}\n```\n\nAt this point hitting <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) will animate in a search input and nothing more.\n\nkbar provides a few utilities to render a performant list of search results.\n\n- `useMatches` at its core returns a flattened list of results and group name based on the current\n  search query; i.e. `[\"Section name\", Action, Action, \"Another section name\", Action, Action]`\n- `KBarResults` renders a performant virtualized list of these results\n\nCombine the two utilities to create a powerful search interface:\n\n```tsx\nimport {\n  // ...\n  KBarResults,\n  useMatches,\n  NO_GROUP,\n} from \"kbar\";\n\n// ...\n// <KBarAnimator>\n//   <KBarSearch />\n<RenderResults />;\n// ...\n\nfunction RenderResults() {\n  const { results } = useMatches();\n\n  return (\n    <KBarResults\n      items={results}\n      onRender={({ item, active }) =>\n        typeof item === \"string\" ? (\n          <div>{item}</div>\n        ) : (\n          <div\n            style={{\n              background: active ? \"#eee\" : \"transparent\",\n            }}\n          >\n            {item.name}\n          </div>\n        )\n      }\n    />\n  );\n}\n```\n\nHit <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) and you should see a primitive command menu. kbar allows you to have full control over all\naspects of your command menu – refer to the <a href=\"https://kbar.vercel.app/docs\">docs</a> to get\nan understanding of further capabilities. Looking forward to see what you build.\n\n## Used by\n\nListed are some of the various usages of kbar in the wild – check them out! Create a PR to add your\nsite below.\n\n- [Outline](https://www.getoutline.com/)\n- [zenorocha.com](https://zenorocha.com/)\n- [griko.id](https://griko.id/)\n- [lavya.me](https://www.lavya.me/)\n- [OlivierAlexander.com](https://olivier-alexander-com-git-master-olivierdijkstra.vercel.app/)\n- [dhritigabani.me](https://dhritigabani.me/)\n- [jpedromagalhaes](https://jpedromagalhaes.vercel.app/)\n- [animo](https://demo.animo.id/)\n- [tobyb.xyz](https://www.tobyb.xyz/)\n- [higoralves.dev](https://www.higoralves.dev/)\n- [coderdiaz.dev](https://coderdiaz.dev/)\n- [NextUI](https://nextui.org/)\n- [evm.codes](https://www.evm.codes/)\n- [filiphalas.com](https://filiphalas.com/)\n- [benslv.dev](https://benslv.dev/)\n- [vortex](https://hydralite.io/vortex)\n- [ladislavprix](https://ladislavprix.cz/)\n- [pixiebrix](https://www.pixiebrix.com/)\n- [nfaustino.com](https://nfaustino-com.vercel.app/)\n- [bradleyyeo.com](https://bradleyyeo-com.vercel.app/)\n- [andredevries.dev](https://www.andredevries.dev/)\n- [about-ebon](https://about-ebon.vercel.app/)\n- [frankrocha.dev](https://www.frankrocha.dev/)\n- [cameronbrill.me](https://www.cameronbrill.me/)\n- [codaxx.ml](https://codaxx.ml/)\n- [jeremytenjo.com](https://jeremytenjo.com/)\n- [villivald.com](https://villivald.com/)\n- [maxthestranger](https://code.maxthestranger.com/)\n- [koripallopaikat](https://koripallopaikat.com/)\n- [alexcarpenter.me](https://alexcarpenter.me/)\n- [hackbar](https://github.com/Uier/hackbar)\n- [web3kbar](https://web3kbar.vercel.app/)\n- [burakgur](https://burakgur-com.vercel.app/)\n- [ademilter.com](https://ademilter.com/)\n- [anasaraid.me](https://anasaraid.me/)\n- [daniloleal.co](https://daniloleal.co/)\n- [hyperround](https://github.com/heyAyushh/hyperound)\n- [Omnivore](https://omnivore.app)\n- [tiagohermano.dev](",
      }
    ],
  },
];
