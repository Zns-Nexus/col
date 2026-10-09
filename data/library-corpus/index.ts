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
 * forbids it (Aceternity), and "unknown" where no reusable grant was found.
 * Snapshots cover README install/usage across the granted set,
 * the remaining granted libraries follow the same shape as they are ingested.
 */
export const libraryCorpus: LibraryCorpusEntry[] = [
  {
    slug: "21st-dev",
    permission: {
      status: "granted",
      source: "https://github.com/serafimcloud/21st",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "21st-dev README — install and usage",
        url: "https://github.com/serafimcloud/21st#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "react-bits README — install and usage",
        url: "https://github.com/DavidHDev/react-bits#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "d86fccbd477786f94ca7eb891fbe0ec039d3cd3b",
        content: "<div align=\"center\">\n\t<br>\n\t<br>\n    <picture>\n      <source media=\"(prefers-color-scheme: light)\" srcset=\"src/assets/logos/reactbits-gh-black.svg\">\n      <source media=\"(prefers-color-scheme: dark)\" srcset=\"src/assets/logos/reactbits-gh-white.svg\">\n      <img src=\"src/assets/logos/reactbits-gh-black.svg\" alt=\"react-bits logo\" width=\"600\">\n    </picture>\n\t<br>\n\t<br>\n  <strong>The largest & most creative library of animated React components.</strong>\n  <br />\n  <sub>Stand out with 200+ free, customizable animations for text, backgrounds, UI, and micro interactions.</sub>\n\t<br>\n\t<br>\n  <a href=\"https://github.com/davidhdev/react-bits/stargazers\"><img alt=\"GitHub Repo stars\" src=\"https://img.shields.io/github/stars/davidhdev/react-bits\"></a>\n  <a href=\"https://github.com/davidhdev/react-bits/blob/main/LICENSE.md\"><img alt=\"License\" src=\"https://img.shields.io/badge/License-MIT+Commons_Clause-magenta\"></a>\n  <br>\n  <br>\n  <a href=\"https://reactbits.dev/\">📖 Documentation</a> · <a href=\"https://reactbits.dev/get-started/installation\">⚡ Quick Start</a> · <a href=\"https://reactbits.dev/tools\">🛠️ Tools</a>\n</div>\n\n<br />\n\n<div align=\"center\">\n  <img src=\"src/assets/common/gh-showcase.png\" alt=\"React Bits component showcase\" width=\"1000\">\n</div>\n\n<br />\n\n## React Bits Pro\n\nReact Bits Pro adds premium components, page blocks, app UI, and complete templates for your next project.\n\n[![React Bits Pro previews: ASCII Ripple, Radial Liquid, Hero 12, and Dashboard 12](public/assets/readme/react-bits-pro.webp)](https://pro.reactbits.dev/?utm_source=github&utm_medium=readme&utm_campaign=pro-conversion&utm_content=readme-pro)\n\n## ✨ Why React Bits?\n\nReact Bits helps you **ship stunning interfaces faster**. Instead of spending hours crafting animations from scratch, grab a polished component and customize it to fit your vision.\n\n> 💬 **Text Animations** · 🌀 **Animations** · 🧩 **Components** · ⚡ **Micro** · 🖼️ **Backgrounds**\n\n## 🚀 Features\n\n- **200+ components** — text animations, UI elements, micro interactions, and backgrounds, growing weekly\n- **Minimal dependencies** — lightweight and tree-shakeable\n- **Fully customizable** — tweak everything via props or edit the source directly\n- **4 variants per component** — JS-CSS, JS-TW, TS-CSS, TS-TW (everyone's happy)\n- **Copy-paste ready** — works with any modern React project\n\n## 🛠️ Creative Tools\n\n<div align=\"center\">\n  <img src=\"src/assets/common/tools-readme.webp\" alt=\"React Bits Tools\" width=\"1000\" style=\"border-radius: 30px; max-width: 1920px;\">\n</div>\n\n<hr />\n\n### Beyond components, React Bits offers **free creative tools** to supercharge your workflow:\n\n| Tool                                                 | What it does                                                                             |\n| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |\n| **[Background Studio](https://reactbits.dev/tools)** | Explore",
      }
    ],
  },
  {
    slug: "transition-dev",
    permission: {
      status: "granted",
      source: "https://github.com/Jakubantalik/transitions.dev",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "transition-dev README — install and usage",
        url: "https://github.com/Jakubantalik/transitions.dev#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "shadcn-ui README — install and usage",
        url: "https://github.com/shadcn-ui/ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "2d3f1cd436b18ea12f24130de4df781355925b08",
        content: "# shadcn/ui\n\nA set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code. **Use this to build your own component library**.\n\n![hero](apps/v4/public/opengraph-image.png)\n\n## Documentation\n\nVisit https://ui.shadcn.com/docs to view the documentation.\n\n## Contributing\n\nPlease read the [contributing guide](/CONTRIBUTING.md).\n\n## License\n\nLicensed under the [MIT license](./LICENSE.md).",
      }
    ],
  },
  {
    slug: "magic-ui",
    permission: {
      status: "granted",
      source: "https://github.com/magicuidesign/magicui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "magic-ui README — install and usage",
        url: "https://github.com/magicuidesign/magicui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "cdb348cb4c72a9b54b554d8617801e479fbc8714",
        content: "<img alt=\"Magic UI - UI Library for Design Engineers\" src=\"https://cdn.magicui.design/bento-grid.gif\" width=\"100%\">\n<h3 align=\"center\">Magic UI</h3>\n<p align=\"center\">\n    UI Library for Design Engineers\n</p>\n<div align=\"center\">\n  <a href=\"https://github.com/magicuidesign/magicui/stargazers\"><img alt=\"GitHub Repo stars\" src=\"https://img.shields.io/github/stars/magicuidesign/magicui\"></a>\n  <a href=\"https://twitter.com/magicuidesign\"><img alt=\"Twitter Follow\" src=\"https://img.shields.io/twitter/follow/magicuidesign\"></a>\n  <a href=\"https://github.com/magicuidesign/magicui/blob/main/LICENSE.md\"><img alt=\"License\" src=\"https://img.shields.io/badge/License-MIT-yellow.svg\"></a>\n  <a href=\"https://discord.com/invite/87p2vpsat5\"><img alt=\"Discord\" src=\"https://img.shields.io/discord/1151315619246002176\"></a>\n  \n</div>\n\n## Documentation\n\nVisit https://magicui.design/docs to view the documentation.\n\n## Contributing\n\nVisit our [contributing guide](https://github.com/magicuidesign/magicui/blob/main/CONTRIBUTING.md) to learn how to contribute. It only takes ~5 minutes to add your own!\n\n## Community\n\nHave questions, comments or feedback? [Join our discord](http://magicui.design/discord).\n\n## Authors\n\n<a href=\"https://github.com/magicuidesign/magicui/graphs/contributors\">\n  <img src=\"https://contrib.rocks/image?repo=magicuidesign/magicui\" />\n</a>\n\n## Stats\n\n![Alt](https://repobeats.axiom.co/api/embed/38b63c4514a8a4cd7d1307985af2889c78d67bcc.svg \"Repobeats analytics image\")\n\n## Star History\n\n[![Star History Chart](https://api.star-history.com/svg?repos=magicuidesign/magicui&type=Date)](https://www.star-history.com/#magicuidesign/magicui&Date)\n\n## License\n\nLicensed under the [MIT license](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md).",
      }
    ],
  },
  {
    slug: "aceternity-ui",
    permission: {
      status: "denied",
      source: "https://ui.aceternity.com/licence",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "motion",
    permission: {
      status: "granted",
      source: "https://github.com/motiondivision/motion",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "motion README — install and usage",
        url: "https://github.com/motiondivision/motion#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "radix-ui README — install and usage",
        url: "https://github.com/radix-ui/primitives#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "base-ui README — install and usage",
        url: "https://github.com/mui/base-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "ad7ecda5296b0295b41a51ecb01fce6204acd099",
        content: "# Base UI\n\nFrom the creators of Radix, Floating UI, and Material UI, Base UI is an unstyled UI component library for building accessible user interfaces.\n\n---\n\n## Documentation\n\nTo get started, check out the [Base UI documentation](https://base-ui.com/react/overview/quick-start).\n\n## Contributing\n\nRead our [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes.\n\n## Releases\n\nTo see the latest updates, check out the [releases](https://base-ui.com/react/overview/releases).\n\n## Community\n\n- **Discord** For community support, questions, and tips, join our [Discord](https://discord.gg/g6C3hUtuxz).\n- **X** To stay up-to-date on new releases and announcements follow [Base UI on X](https://x.com/base_ui).\n- **Bluesky** We're also on [Bluesky](https://bsky.app/profile/base-ui.com).\n\n## Team\n\n- **Colm Tuite** [@colmtuite](https://x.com/colmtuite)\n- **Marija Najdova** [@marijanajdova](https://x.com/marijanajdova)\n- **Flavien Delangle** [@flaviendelangle](https://github.com/flaviendelangle)\n- **James Nelson** [@atomiksdev](https://x.com/atomiksdev)\n- **Jenna Smith** [@jjenzz](https://x.com/jjenzz)\n- **Michał Dudak** [@michaldudak](https://x.com/michaldudak)\n- **Aarón García** [@aarongarciah](https://github.com/aarongarciah)\n\n## License\n\nThis project is licensed under the terms of the [MIT license](/LICENSE).",
      }
    ],
  },
  {
    slug: "react-aria",
    permission: {
      status: "granted",
      source: "https://github.com/adobe/react-spectrum",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "react-aria README — install and usage",
        url: "https://github.com/adobe/react-spectrum#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "3bdef480e85ff135cd485e9f4511b98300127d4b",
        content: "## Getting started\n\nReact Spectrum includes several libraries, which you can choose depending on your usecase.\n\n* [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/getting-started.html) is an implementation of Adobe's design system. If you’re integrating with Adobe software or would like a complete component library to use in your project, look no further!\n* [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html) is a collection of unstyled React components and hooks that helps you build accessible, high quality UI components for your own application or design system. If you're building a component library for the web from scratch with your own styling, start here.\n* [React Stately](https://react-spectrum.adobe.com/react-stately/getting-started.html) is a library of state management hooks for use in your component library. If you're using React Aria, you'll likely also use React Stately, but it can also be used independently (e.g. on other platforms like React Native).\n\n[Read more about our architecture](https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-architecture.md).\n\n## Contributing\n\nOne of the goals of the React Spectrum project is to make building design systems and component libraries as easy as possible, while maintaining high quality interactions and accessibility support. We aim to raise the bar for web applications. The best way to achieve that goal is **together**. We would love contributions from the community no matter how big or small. 😍\n\nRead our [contributing guide](https://github.com/adobe/react-spectrum/blob/main/CONTRIBUTING.md) to learn about how to propose bugfixes and improvements, and how the development process works. For detailed information about our architecture, and how all of the pieces fit together, read our [architecture rfc](https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-architecture.md).",
      }
    ],
  },
  {
    slug: "heroui",
    permission: {
      status: "granted",
      source: "https://github.com/heroui-inc/heroui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "heroui README — install and usage",
        url: "https://github.com/heroui-inc/heroui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "ece1e4e15ea5d21e86cc4dcd11dd21647f96c678",
        content: "packages/core/react/README.md",
      }
    ],
  },
  {
    slug: "mantine",
    permission: {
      status: "granted",
      source: "https://github.com/mantinedev/mantine",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "mantine README — install and usage",
        url: "https://github.com/mantinedev/mantine#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "f7ab1ef52579366e2310fc12b1a12e88a821053a",
        content: "# Mantine\n\n[![NPM](https://img.shields.io/npm/l/@mantine/core)](https://github.com/mantinedev/mantine/blob/master/LICENSE)\n[![Backers](https://opencollective.com/mantinedev/backers/badge.svg)](https://opencollective.com/mantinedev)\n[![GitHub contributors](https://img.shields.io/github/contributors/mantinedev/mantine)](https://github.com/mantinedev/mantine/graphs/contributors)\n[![npm](https://img.shields.io/npm/v/@mantine/core)](https://www.npmjs.com/package/@mantine/core)\n[![npm](https://img.shields.io/npm/dm/@mantine/hooks)](https://www.npmjs.com/package/@mantine/hooks)\n[![Help wanted](https://img.shields.io/github/labels/mantinedev/mantine/help%20wanted?label=Contribute)](https://github.com/mantinedev/mantine/labels/help%20wanted)\n[![Discord](https://img.shields.io/badge/Chat%20on-Discord-%235865f2)](https://discord.gg/wbH82zuWMN)\n[![X Follow](https://img.shields.io/twitter/follow/mantinedev?style=social)](https://x.com/mantinedev)\n\n## Links\n\n- [Documentation](https://mantine.dev/)\n- [Contribute](https://mantine.dev/contribute)\n- [Ask question or give feedback](https://github.com/mantinedev/mantine/discussions)\n- [Changelog](https://mantine.dev/changelog/all-releases)\n- [Follow on X](https://x.com/mantinedev)\n- [Join Discord community](https://discord.gg/wbH82zuWMN)\n\n## Packages\n\n- [`@mantine/hooks`](https://mantine.dev/hooks/package/) – collection of 80+ hooks for state and UI management\n- [`@mantine/core`](https://mantine.dev/core/package/) – core components library – 100+ components\n- [`@mantine/form`](https://mantine.dev/form/use-form) – forms management library\n- [`@mantine/charts`](https://mantine.dev/charts/getting-started/) – recharts based charts library\n- [`@mantine/notifications`](https://mantine.dev/x/notifications) – a fully featured notifications system\n- [`@mantine/spotlight`](https://mantine.dev/x/spotlight) – `Ctrl + K` command center for your application\n- [`@mantine/code-highlight`](https://mantine.dev/code-highlight/code-highlight/) – code highlight built with [highlight.js](https://highlightjs.org/)\n- [`@mantine/tiptap`](https://mantine.dev/x/tiptap) – a Tiptap based rich text editor\n- [`@mantine/dropzone`](https://mantine.dev/x/dropzone) – manages files drag 'n' drop to an area or entire screen\n- [`@mantine/carousel`](https://mantine.dev/x/carousel) – Carousel component\n- [`@mantine/nprogress`](https://mantine.dev/x/nprogress) – navigation progress\n- [`@mantine/modals`](https://mantine.dev/x/modals) – centralized modals manager\n- [`@mantine/schedule`](https://mantine.dev/x/schedule) – Schedule component for displaying events\n\n## Getting help\n\nMantine has a very friendly community, we are always happy to help you get started:\n\n- [Join Discord community](https://discord.gg/wbH82zuWMN) – it is the easiest way to get help, all questions are usually answered in about 30 minutes\n- [GitHub Discussions](https://github.com/mantinedev/mantine/discussions) – ask anything about the project or give feedback\n\n## Contributors\n\n<a href=\"h",
      }
    ],
  },
  {
    slug: "chakra-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/chakra-ui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "chakra-ui README — install and usage",
        url: "https://github.com/chakra-ui/chakra-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "mui README — install and usage",
        url: "https://github.com/mui/material-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "41c9cb4030274f3bde585d136949f447674e728b",
        content: "<!-- lint disable mui-first-block-heading -->\n<!-- #host-reference -->\n\n<p align=\"center\">\n  <a href=\"https://next.mui.com/core/\" target=\"_blank\"><img width=\"150\" height=\"133\" src=\"https://next.mui.com/static/logo.svg\" alt=\"Material UI logo\"></a>\n</p>\n\n<h1 align=\"center\">Material UI</h1>\n\n<div align=\"center\">\n\n[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)\n[![npm latest package](https://img.shields.io/npm/v/@mui/material/latest.svg)](https://www.npmjs.com/package/@mui/material)\n[![npm next package](https://img.shields.io/npm/v/@mui/material/next.svg)](https://www.npmjs.com/package/@mui/material)\n[![npm downloads](https://img.shields.io/npm/dm/@mui/material.svg)](https://www.npmjs.com/package/@mui/material)\n[![GitHub branch status](https://img.shields.io/github/checks-status/mui/material-ui/HEAD)](https://github.com/mui/material-ui/commits/HEAD/)\n[![Coverage Status](https://img.shields.io/codecov/c/github/mui/material-ui.svg)](https://app.codecov.io/gh/mui/material-ui/)\n[![Follow on X](https://img.shields.io/twitter/follow/MaterialUI.svg?label=follow+Material+UI)](https://x.com/MaterialUI)\n[![Renovate status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/mui/material-ui/issues/27062)\n[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/mui/material-ui.svg)](https://isitmaintained.com/project/mui/material-ui 'Average time to resolve an issue')\n[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/mui-org)](https://opencollective.com/mui-org)\n[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/1320/badge)](https://www.bestpractices.dev/projects/1320)\n\n</div>\n\n[Material UI](https://next.mui.com/material-ui/) is a comprehensive library of React components that features our independent implementation of Google's [Material Design](https://m2.material.io/design/introduction/) system.\nIt's trusted by some of the world's greatest product teams because it's been rigorously battle-tested through more than a decade of development by thousands of open-source contributors.\n\nMaterial UI's core functionality is extended by [MUI X](https://github.com/mui/mui-x), a suite of complex components for advanced use cases.\n\n## Documentation\n\nGet started in the [Material UI documentation](https://next.mui.com/material-ui/getting-started/).\n\n<details>\n  <summary>Older versions</summary>\n\n- **[v5.x](https://v5.mui.com/)** ([Upgrading from v5 to v6](https://next.mui.com/material-ui/migration/upgrade-to-v6/))\n- **[v4.x](https://v4.mui.com/)** ([Upgrading from v4 to v5](https://next.mui.com/material-ui/migration/migration-v4/))\n- **[v3.x](https://v3.mui.com/)** ([Upgrading from v3 to v4](https://next.mui.com/material-ui/migration/migration-v3/))\n- **[v0.x](https://v0.mui.com/)** ([Upgrading to v1](https://next.mui.com/material-ui/migration/migration-v0x/))\n\n</details>\n\n**Note:** `@next` points to pre-releases.\nUse `@latest` for the latest stable",
      }
    ],
  },
  {
    slug: "ant-design",
    permission: {
      status: "granted",
      source: "https://github.com/ant-design/ant-design",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "ant-design README — install and usage",
        url: "https://github.com/ant-design/ant-design#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "699e5b8b1a6a811e35f0cc1426c7f593b1f51a2a",
        content: "<div align=\"center\"><a name=\"readme-top\"></a>\n\n<img height=\"180\" src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\">\n\n<h1>Ant Design</h1>\n\nAn enterprise-class UI design language and React UI library.\n\n[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![][bundlephobia-image]][bundlephobia-url] [![][jsdelivr-image]][jsdelivr-url]\n\n[![Follow Twitter][twitter-image]][twitter-url] [![dumi][dumi-image]][dumi-url] [![FOSSA Status][fossa-image]][fossa-url] [![Issues need help][help-wanted-image]][help-wanted-url] [![LFX Active Contributors][lfx-image]][lfx-url]\n\n[Changelog](./CHANGELOG.en-US.md) · [Report Bug][github-issues-url] · [Request Feature][github-issues-url] · English · [中文](./README-zh_CN.md)\n\n## ❤️ Sponsors [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design/contribute/sponsors-218)\n\n| <a href=\"https://youmind.com?utm_source=ant-design\"><img src=\"https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*SXcuQYBZ6oQAAAAAQJAAAAgAeh6VAQ/original\" width=\"80\" alt=\"YouMind\"></a> | <a href=\"https://tractian.com?utm_source=ant-design\"><img src=\"https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*Z4-4Q67SG5UAAAAAQLAAAAgAeh6VAQ/original\" width=\"80\" alt=\"TRACTIAN\"></a> | <a href=\"https://lobehub.com?utm_source=ant-design\"><img src=\"https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg\" width=\"80\" alt=\"LobeHub\"></a> | <a href=\"https://coderabbit.ai?utm_source=ant-design\"><img src=\"https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*yHnhRL4x1DEAAAAAQBAAAAgAeh6VAQ/original\" width=\"80\" alt=\"CodeRabbit\"></a> |\n| :-: | :-: | :-: | :-: |\n\n[npm-image]: https://img.shields.io/npm/v/antd.svg?style=flat-square\n[npm-url]: https://www.npmjs.com/package/antd\n[github-action-image]: https://github.com/ant-design/ant-design/actions/workflows/test.yml/badge.svg\n[github-action-url]: https://github.com/ant-design/ant-design/actions/workflows/test.yml\n[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square\n[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master\n[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square\n[download-url]: https://www.npmjs.com/package/antd\n[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fant-design%2Fant-design.svg?type=shield\n[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fant-design%2Fant-design?ref=badge_shield\n[help-wanted-image]: https://img.shields.io/github/issues/ant-design/ant-design/help%20wanted?color=green&style=flat-square\n[help-wanted-url]: https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22\n[twitter-image]: https://img.shields.io/twitter/follow/AntDesignUI.svg?label=Ant%20Design\n[twitter-url]: https://x.com",
      }
    ],
  },
  {
    slug: "daisyui",
    permission: {
      status: "granted",
      source: "https://github.com/saadeghi/daisyui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "daisyui README — install and usage",
        url: "https://github.com/saadeghi/daisyui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "8c24218588f34a678f48df435950790b57ef2bf7",
        content: "<div align=\"center\">\n\n[![][logo-url]][docs-url]\n\n**The most popular, free and open-source component library for Tailwind CSS**\n\n[![][version]](https://www.npmjs.com/package/daisyui)\n[![][commit]](https://github.com/saadeghi/daisyui)\n[![][license]](https://github.com/saadeghi/daisyui/blob/master/LICENSE)\n[![][stars]](https://github.com/saadeghi/daisyui)\n[![][installs]](https://www.npmjs.com/package/daisyui)\n[![][jsdelivr]](https://cdn.jsdelivr.net/npm/daisyui@5)\n[![][discord]](https://daisyui.com/discord/)\n[![][opencollectivebadge]](https://opencollective.com/daisyui)\n\n</div>\n\n# daisyUI 5\n\n### 🌼 [Official website →](https://daisyui.com/)\n\n### 🧩 [See all components →](https://daisyui.com/components/)\n\n### 🚀 [How to use →](https://daisyui.com/docs/install/)\n\n### 🤝 [Contribute →](.github/CONTRIBUTING.md)\n\n---\n\n<div align=\"center\">\n\nSponsors and backers\n\n[![][backers_org]][opencollective]\n[![][backers]][opencollective]\n\nContributors\n\n[![][contributors_img]][contributors]\n\n</div>\n\n<div align=\"center\">\n\n༼ つ ◕_◕ ༽つ Please share\n\n[![][tweet]](https://twitter.com/intent/tweet?text=daisyUI%20%0D%0AComponents%20for%20Tailwind%20CSS%20%0D%0Ahttps://github.com/saadeghi/daisyui)\n\n</div>\n\n[version]: https://badgen.net/github/tag/saadeghi/daisyui?label=Version&color=1AD1A5\n[commit]: https://badgen.net/github/last-commit/saadeghi/daisyui?label=Last%20commit&color=1AD1A5\n[license]: https://badgen.net/github/license/saadeghi/daisyui?label=License&color=1AD1A5\n[stars]: https://badgen.net/github/stars/saadeghi/daisyui?label=GitHub%20stars&color=1AD1A5\n[installs]: https://badgen.net/npm/dt/daisyui?label=NPM%20installs&color=1AD1A5\n[jsdelivr]: https://badgen.net/jsdelivr/hits/npm/daisyui?color=1AD1A5\n[discord]: https://badgen.net/discord/members/S6TZxycVHs?label=Discord&color=1AD1A5\n[opencollectivebadge]: https://badgen.net/opencollective/backers/daisyui?label=Open%20Collective&color=1AD1A5\n[tweet]: https://img.shields.io/twitter/url?label=Share&url=https%3A%2F%2Fgithub.com%2Fsaadeghi%2Fdaisyui\n[docs-url]: https://daisyui.com/\n[logo-url]: https://img.daisyui.com/images/daisyui/daisyui-logo-192.png\n[opencollective]: https://opencollective.com/daisyui\n[sponsors]: https://opencollective.com/daisyui/tiers/premium-sponsor.svg?button=false&avatarHeight=60\n[backers]: https://opencollective.com/daisyui/backers.svg?button=false&width=978&avatarHeight=36\n[backers_org]: https://opencollective.com/daisyui/organizations.svg?button=false&avatarHeight=36\n[contribute]: https://github.com/saadeghi/daisyui/blob/master/.github/CONTRIBUTING.md\n[contributors_img]: https://opencollective.com/daisyui/contributors.svg?width=1060&button=false&avatarHeight=40\n[contributors]: https://github.com/saadeghi/daisyui/graphs/contributors",
      }
    ],
  },
  {
    slug: "flowbite",
    permission: {
      status: "granted",
      source: "https://github.com/themesberg/flowbite",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "flowbite README — install and usage",
        url: "https://github.com/themesberg/flowbite#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "preline README — install and usage",
        url: "https://github.com/htmlstreamofficial/preline#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "hyperui README — install and usage",
        url: "https://github.com/markmead/hyperui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "motion-primitives README — install and usage",
        url: "https://github.com/ibelick/motion-primitives#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
        content: "# Motion-Primitives\n\nBeautifully designed, easy-to-integrate motion components for engineers and designers, built with [motion](https://motion.dev/) and [Tailwind CSS](https://tailwindcss.com/).\n\n**This project is in beta. Expect new components to be released regularly and significant updates to the code.**\n\n<p align=\"center\">\n<img src=\"https://raw.githubusercontent.com/ibelick/motion-primitives/main/app/opengraph-image.jpg\" alt=\"hero\" width=\"80%\" />\n</p>\n\n## Documentation\n\nVisit [motion-primitives.com/docs](http://motion-primitives.com/docs) to view the full documentation.\n\n## Contributing\n\nPlease read the [contributing guide](/CONTRIBUTING.md).\n\n## License\n\nLicensed under the [MIT license](/LICENSE.md).",
      }
    ],
  },
  {
    slug: "animata",
    permission: {
      status: "granted",
      source: "https://github.com/codse/animata",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "animata README — install and usage",
        url: "https://github.com/codse/animata#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "lucide README — install and usage",
        url: "https://github.com/lucide-icons/lucide#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "70562c1ee1c4fdcf736fe97bc893fb8511927934",
        content: "<p align=\"center\">\n  <a href=\"https://github.com/lucide-icons/lucide#gh-light-mode-only\">\n    <img src=\"https://lucide.dev/lucide-logo-repo.svg#gh-light-mode-only\" alt=\"Lucide - Beautiful & consistent icon toolkit made by the community. Open-source project and a fork of Feather Icons.\" width=\"480\">\n  </a>\n  <a href=\"https://github.com/lucide-icons/lucide#gh-dark-mode-only\">\n    <img src=\"https://lucide.dev/lucide-logo-repo-dark.svg#gh-dark-mode-only\" alt=\"Lucide - Beautiful & consistent icon toolkit made by the community. Open-source project and a fork of Feather Icons.\" width=\"480\">\n  </a>\n</p>\n<p align=\"center\">\n  <a href=\"https://github.com/lucide-icons/lucide/blob/main/LICENSE\"><img src=\"https://img.shields.io/badge/license-ISC-green\" alt=\"license\"></a>\n  <a href=\"https://www.figma.com/community/plugin/939567362549682242/Lucide-Icons\"><img src=\"https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white\" alt=\"figma installs\"></a>\n  <a href=\"https://github.com/lucide-icons/lucide/actions/workflows/ci.yml\"><img src=\"https://github.com/lucide-icons/lucide/actions/workflows/ci.yml/badge.svg\" alt=\"build status\"></a>\n  <a href=\"https://discord.gg/EH6nSts\"><img src=\"https://img.shields.io/discord/723074157486800936?label=chat&logo=discord&logoColor=%23ffffff&colorB=%237289DA\" alt=\"discord chat\"></a>\n</p>\n<p align=\"center\">\n  <a href=\"https://lucide.dev/icons/\">Icons</a>\n  ·\n  <a href=\"https://lucide.dev/guide/\">Guide</a>\n  ·\n  <a href=\"https://lucide.dev/packages\">Packages</a>\n  ·\n  <a href=\"https://lucide.dev/license\">License</a>\n  ·\n  <a href=\"https://lucide.dev/showcase\">Showcase</a>\n</p>\n\n# Lucide\n\nLucide is an open-source icon library that provides 1600+ vector (svg) files for displaying icons and symbols in digital and non-digital projects. The library aims to make it easier for designers and developers to incorporate icons into their projects by providing several official [packages](https://lucide.dev/packages) to make it easier to use these icons in your project.\n\n## Packages\n\n| Logo | Package | Version | Downloads | Links |\n| ---- | ------- | ------- | --------- | ----- |\n| <img src=\"https://lucide.dev/framework-logos/js.svg\" alt=\"JS logo\" width=\"48\"> | **`lucide`** | [![npm](https://img.shields.io/npm/v/lucide)](https://www.npmjs.com/package/lucide) | ![NPM Downloads](https://img.shields.io/npm/dw/lucide) | [Docs](https://lucide.dev/guide/lucide) · [Source](./packages/lucide) |\n| <img src=\"https://lucide.dev/framework-logos/react.svg\" alt=\"React logo\" width=\"48\"> | **`lucide-react`** | [![npm](https://img.shields.io/npm/v/lucide-react)](https://www.npmjs.com/package/lucide-react) | ![NPM Downloads](https://img.shields.io/npm/dw/lucide-react) | [Docs](https://lucide.dev/guide/react) · [Source](./packages/lucide-react) |\n| <img src=\"https://lucide.dev/framework-logos/vue.svg\" alt=\"Vue logo\" width=\"48\"> | **`@lucide/vue`** | [![npm](https://img.shields.io/npm/v/@lucide/vue)](https://www.npmjs.com/package/@lucide/vue) | ![NPM Download",
      }
    ],
  },
  {
    slug: "recharts",
    permission: {
      status: "granted",
      source: "https://github.com/recharts/recharts",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "recharts README — install and usage",
        url: "https://github.com/recharts/recharts#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "tremor README — install and usage",
        url: "https://github.com/tremorlabs/tremor#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "ca4d588f47820ff3d514d37fa4ee08a4222dec11",
        content: "## Getting Started\n\nSee our [Installation Guide](https://tremor.so/docs/getting-started/installation) to get started.\n\n## Socials\n\n- [Tremor Website](https://tremor.so)\n- [Tremor on X (formerly Twitter)](https://twitter.com/tremorlabs)\n- [Tremor on Slack](https://tremor.so/slack)\n\n## Community and Contribution\n\nWe are always looking for new ideas or other ways to improve Tremor Raw. If you have developed anything cool or found a bug, send us a pull request. Check out our Contributor License Agreement [here](https://www.tremor.so/contributors).\n\n## License\n\n[Apache License 2.0](https://github.com/tremorlabs/tremor?tab=Apache-2.0-1-ov-file#readme)\n\nCopyright &copy; 2025 Tremor. All rights reserved.",
      }
    ],
  },
  {
    slug: "react-three-fiber",
    permission: {
      status: "granted",
      source: "https://github.com/pmndrs/react-three-fiber",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "shadcn-svelte",
    permission: {
      status: "granted",
      source: "https://github.com/huntabyte/shadcn-svelte",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "shadcn-svelte README — install and usage",
        url: "https://github.com/huntabyte/shadcn-svelte#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "493481fab94f68b8982949bc8a37eede786f2462",
        content: "<p align=\"center\">\n <img align=\"center\" src=\"https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/docs/static/android-chrome-192x192.png\" height=\"96\" />\n <h1 align=\"center\">\n  shadcn-svelte\n </h1>\n</p>\n\n[![](https://dcbadge.vercel.app/api/server/fdXy3Sk8Gq?style=flat)](https://discord.gg/fdXy3Sk8Gq)\n\n[shadcn-svelte](https://www.shadcn-svelte.com/) is an unofficial community-led [Svelte](https://svelte.dev) port of [shadcn/ui](https://ui.shadcn.com/).\n\n> **Note** <br> **We are not affiliated with shadcn, but we did get his blessing prior to creating this project** <br> This is a project born out of the need for a similar project for the Svelte ecosystem.\n\nAccessible and customizable components that you can copy and paste into your apps. Free. Open Source. **Use this to build your own component library**.\n\n![hero](docs/static/opengraph-image.png)\n\n## Documentation\n\nVisit https://shadcn-svelte.com/docs to view the documentation.\n\n## Sponsors\n\nThis project is supported by the following beautiful people/organizations:\n\n<p align=\"center\">\n  <a href=\"https://github.com/sponsors/huntabyte\">\n    <img src='https://github.com/huntabyte/static/blob/main/sponsors.svg?raw=true' alt=\"Logos from Sponsors\" />\n  </a>\n</p>\n\n## License\n\n<!-- automd:contributors license=MIT author=\"huntabyte\" -->\n\nPublished under the [MIT](https://github.com/huntabyte/shadcn-svelte/blob/main/LICENSE.md) license.\nBuilt by [@huntabyte](https://github.com/huntabyte), [CokaKoala](https://github.com/adriangonz97),and [community](https://github.com/huntabyte/shadcn-svelte/graphs/contributors) 💛\n<br><br>\n<a href=\"https://github.com/huntabyte/shadcn-svelte/graphs/contributors\">\n<img src=\"https://contrib.rocks/image?repo=huntabyte/shadcn-svelte\" />\n</a>\n\n<!-- /automd -->\n\n## Community\n\nJoin the Discord server to ask questions, find collaborators, or just say hi!\n\n<a href=\"https://shadcn-svelte.com/discord\" alt=\"Svecosystem Discord community\">\n<picture>\n  <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://invidget.switchblade.xyz/fdXy3Sk8Gq\">\n  <img alt=\"Svecosystem Discord community\" src=\"https://invidget.switchblade.xyz/fdXy3Sk8Gq?theme=light\">\n</picture>\n</a>",
      }
    ],
  },
  {
    slug: "primevue",
    permission: {
      status: "granted",
      source: "https://github.com/primefaces/primevue",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "primevue README — install and usage",
        url: "https://github.com/primefaces/primevue#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "36965f13dc40597deeb16192a8568308cbeb70d9",
        content: "# PrimeVue\n\n> [!WARNING]\n> **This repository is no longer under active development and receives security fixes only.** PrimeVue continues as part of [PrimeUI](https://primeui.dev/nextchapter).\n> Issues here are read-only. Bug reports and feature requests belong at PrimeUI; for security vulnerabilities, see [SECURITY.md](./SECURITY.md).\n\n### The next chapter has begun.\n\nAfter years as an open source library, PrimeVue enters its next chapter as part of **PrimeUI**, a sustainable foundation for the libraries you rely on.\n\n## What this means\n\n**Existing MIT versions remain MIT, forever.**\nEvery release published under the MIT license stays exactly as it is. Your existing projects are unaffected. Nothing is taken away.\n\n**Security updates continue here.**\nWe keep publishing security fixes for the MIT-licensed releases. How to report one is in [SECURITY.md](./SECURITY.md).\n\n**Development continues at a new home.**\nActive development, new releases, and everything ahead now live under PrimeUI.\n\n➡️ **Read the announcement:** [primeui.dev/nextchapter](https://primeui.dev/nextchapter)\n\n➡️ **The journey continues at:** [primevue.dev](https://primevue.dev)\n\n## Thank you\n\nTo everyone who used PrimeVue, filed an issue, opened a pull request, answered a question, or simply built something with it, thank you. This library reached hundreds of millions of downloads because of you.\n\nThe next chapter is just beginning, and we hope you'll be part of it.\n\nThe PrimeTek Team",
      }
    ],
  },
  {
    slug: "uselayouts",
    permission: {
      status: "granted",
      source: "https://github.com/iurvish/uselayouts",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "uselayouts README — install and usage",
        url: "https://github.com/iurvish/uselayouts#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "nexvyn-ui README — install and usage",
        url: "https://github.com/Nexvyn/Nexvyn-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "cult-ui README — install and usage",
        url: "https://github.com/nolly-studio/cult-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "spell-ui README — install and usage",
        url: "https://github.com/xxtomm/spell-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "fffe96db7b67b44243bf35815916fdfc58fe5014",
        content: "<img alt=\"Spell UI - Beautiful UI components for modern React\" src=\"https://spell.sh/og?title=Spell%20UI&description=Beautiful%2C%20sophisticated%20UI%20components\" width=\"100%\">\n\n<h3 align=\"center\">Spell UI</h3>\n\n<p align=\"center\">\n  Beautiful, sophisticated UI components designed for modern React and Tailwind CSS applications.\n</p>\n\n<div align=\"center\">\n  <a href=\"https://github.com/xxtomm/spell-ui/stargazers\"><img alt=\"GitHub Repo stars\" src=\"https://img.shields.io/github/stars/xxtomm/spell-ui\"></a>\n  <a href=\"https://x.com/tomm_ui\"><img alt=\"Twitter Follow\" src=\"https://img.shields.io/twitter/follow/tomm_ui\"></a>\n  <a href=\"https://github.com/xxtomm/spell-ui/blob/main/LICENSE\"><img alt=\"License\" src=\"https://img.shields.io/badge/License-MIT-yellow.svg\"></a>\n  <a href=\"https://discord.gg/CxzqwQ2EAa\"><img alt=\"Discord\" src=\"https://img.shields.io/badge/Discord-join-blue.svg\"></a>\n</div>\n\n## Documentation\n\nVisit https://spell.sh/docs to view the documentation.\n\n## Contributing\n\nVisit our [contributing guide](https://github.com/xxtomm/spell-ui/blob/main/CONTRIBUTING.md) to learn how to contribute.\n\n## Community\n\nHave questions, comments or feedback? [Join our Discord](https://discord.gg/CxzqwQ2EAa).\n\n## Star History\n\n[![Star History Chart](https://api.star-history.com/svg?repos=xxtomm/spell-ui&type=Date)](https://www.star-history.com/#xxtomm/spell-ui&Date)\n\n\n## License\n\nLicensed under the [MIT license](https://github.com/xxtomm/spell-ui/blob/main/LICENSE).",
      }
    ],
  },
  {
    slug: "rare-ui",
    permission: {
      status: "granted",
      source: "https://github.com/swamimalode07/rare-ui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "rare-ui README — install and usage",
        url: "https://github.com/swamimalode07/rare-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "obsidian-ui README — install and usage",
        url: "https://github.com/Atharvsinh-codez/ObsidianUI#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "ark-ui README — install and usage",
        url: "https://github.com/chakra-ui/ark#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "park-ui README — install and usage",
        url: "https://github.com/chakra-ui/park-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "102769cc91a9d36753dbc5893c74b7954b495efe",
        content: "## Park UI\n\nBeautifully designed components built with [Ark UI](https://ark-ui.com) and [Panda CSS](https://panda-css.com) that work with a variety of JS frameworks.\n\n![Park UI OG Image](https://park-ui.com/opengraph-image.png)\n\n## Documentation\n\nVisit http://park-ui.com to view the documentation.\n\n## Contributing\n\nIf you would like to contribute to Park UI, please reach out to me on [Twitter](https://twitter.com/grizzly_codes).\n\n## License\n\nLicensed under the [MIT license](https://github.com/cschroeter/park-ui/blob/main/LICENSE).",
      }
    ],
  },
  {
    slug: "headless-ui",
    permission: {
      status: "granted",
      source: "https://github.com/tailwindlabs/headlessui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "headless-ui README — install and usage",
        url: "https://github.com/tailwindlabs/headlessui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "tailwind-css README — install and usage",
        url: "https://github.com/tailwindlabs/tailwindcss#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "fa81d697fe572a10ac150d18964a093a7a874081",
        content: "<p align=\"center\">\n  <a href=\"https://tailwindcss.com\" target=\"_blank\">\n    <picture>\n      <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-dark.svg\">\n      <source media=\"(prefers-color-scheme: light)\" srcset=\"https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg\">\n      <img alt=\"Tailwind CSS\" src=\"https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg\" width=\"350\" height=\"70\" style=\"max-width: 100%;\">\n    </picture>\n  </a>\n</p>\n\n<p align=\"center\">\n  A utility-first CSS framework for rapidly building custom user interfaces.\n</p>\n\n<p align=\"center\">\n    <a href=\"https://github.com/tailwindlabs/tailwindcss/actions\"><img src=\"https://img.shields.io/github/actions/workflow/status/tailwindlabs/tailwindcss/ci.yml?branch=main\" alt=\"Build Status\"></a>\n    <a href=\"https://www.npmjs.com/package/tailwindcss\"><img src=\"https://img.shields.io/npm/dt/tailwindcss.svg\" alt=\"Total Downloads\"></a>\n    <a href=\"https://github.com/tailwindlabs/tailwindcss/releases\"><img src=\"https://img.shields.io/npm/v/tailwindcss.svg\" alt=\"Latest Release\"></a>\n    <a href=\"https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE\"><img src=\"https://img.shields.io/npm/l/tailwindcss.svg\" alt=\"License\"></a>\n</p>\n\n---\n\n## Documentation\n\nFor full documentation, visit [tailwindcss.com](https://tailwindcss.com).\n\n## Community\n\nFor help, discussion about best practices, or feature ideas:\n\n[Discuss Tailwind CSS on GitHub](https://github.com/tailwindlabs/tailwindcss/discussions)\n\n## Contributing\n\nIf you're interested in contributing to Tailwind CSS, please read our [contributing docs](https://github.com/tailwindlabs/tailwindcss/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.",
      }
    ],
  },
  {
    slug: "kibo-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcnblocks/kibo",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "kibo-ui README — install and usage",
        url: "https://github.com/shadcnblocks/kibo#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "3d63cdb15b79d972e3dc38a10997987672f9b263",
        content: "## Installation\n\n[Read the docs](https://www.kibo-ui.com/)\n\n## Contributors\n\n<a href=\"https://github.com/shadcnblocks/kibo/graphs/contributors\">\n  <img src=\"https://contrib.rocks/image?repo=shadcnblocks/kibo\" />\n</a>\n\nMade with [contrib.rocks](https://contrib.rocks).",
      }
    ],
  },
  {
    slug: "ruixen-ui",
    permission: {
      status: "granted",
      source: "https://github.com/ruixenui/ruixen.com",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "ruixen-ui README — install and usage",
        url: "https://github.com/ruixenui/ruixen.com#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "fancy-components README — install and usage",
        url: "https://github.com/danielpetho/fancy#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "f9f62c61207b2dd3210476dd98af3c9a5be24094",
        content: "# Fancy Components\n\nA growing library of fancy, fun, animated react components & microinteractions to make the web fun again. Free & Open Source.\n\n## Documentation\n\nVisit https://fancycomponents.dev/docs/introduction to view the documentation.\n\n## Contributing\n\nPlease read the [contribution guidelines](./CONTRIBUTING.md).\n\n## Acknowledgments\n\nHuge thanks to [shadcn](https://github.com/shadcn-ui/ui), as many parts of this repository—documentation page, structure, registry system, guides, and many more—is built upon it.\n\n## License\n\nLicensed under the [MIT license](LICENSE).\n\n<br/>\n<a href=\"https://vercel.com/oss\">\n    <img alt=\"Vercel OSS Program\" src=\"https://vercel.com/oss/program-badge.svg\" />\n</a>",
      }
    ],
  },
  {
    slug: "anime-js",
    permission: {
      status: "granted",
      source: "https://github.com/juliangarnier/anime",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "anime-js README — install and usage",
        url: "https://github.com/juliangarnier/anime#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "react-spring README — install and usage",
        url: "https://github.com/pmndrs/react-spring#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "lenis README — install and usage",
        url: "https://github.com/darkroomengineering/lenis#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "rive README — install and usage",
        url: "https://github.com/rive-app/rive-wasm#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "6e9c470edac3fac97dd0379eb67b927c1a1efb67",
        content: "## Getting started\n\nFollow along with the link below for a quick start in getting Rive JS integrated into your web applications.\n\n- [Getting Started with Rive in Web](https://rive.app/docs/runtimes/web/web-js)\n- [API documentation](https://rive.app/docs/runtimes/web/rive-parameters)\n\nFor more information, see the Runtime sections of the Rive help documentation:\n\n- [Layout](https://rive.app/docs/runtimes/layout)\n- [State Machines](https://rive.app/docs/runtimes/state-machines)\n- [Data Binding](https://rive.app/docs/runtimes/data-binding)\n- [Rive Events](https://rive.app/docs/runtimes/rive-events)\n- [Loading Assets](https://rive.app/docs/runtimes/web/loading-assets)\n\n## Supported browsers\n\nRive can be used in all major browsers. We're constantly working to improve performance with our renderer so that animations playback smoothly for all.\n\n## Examples\n\nCheck out some of the demos using this JS/WASM runtime in the [Rive documentation](https://rive.app/docs/runtimes/demos).\n\n### Awesome Rive\n\nFor even more examples and resources on using Rive at runtime or in other tools, checkout the [awesome-rive](https://github.com/rive-app/awesome-rive) repo.\n\n## Migration guides\n\nUsing an older version of the runtime and need to learn how to upgrade to the latest version? Check out the migration guides below in our help center that help guide you through major version bumps; breaking changes and all!\n\n[Migration guides](https://rive.app/docs/runtimes/web/migration-guides)\n\n## Contributing\n\nWe love contributions! Check out our [contributing docs](./CONTRIBUTING.md) to get more details into how to run this project, the examples, and more all locally.\n\n## Issues\n\nHave an issue with using the runtime, or want to suggest a feature/API to help make your development life better? Log an issue in our [issues](https://github.com/rive-app/rive-wasm/issues) tab! You can also browse older issues and discussion threads there to see solutions that may have worked for common problems.",
      }
    ],
  },
  {
    slug: "dotlottie",
    permission: {
      status: "granted",
      source: "https://github.com/LottieFiles/dotlottie-web",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "dotlottie README — install and usage",
        url: "https://github.com/LottieFiles/dotlottie-web#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "godui README — install and usage",
        url: "https://github.com/LucasBassetti/godui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "satisium-ui",
    permission: {
      status: "granted",
      source: "https://github.com/satisium/ui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "satisium-ui README — install and usage",
        url: "https://github.com/satisium/ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "wensity-ui README — install and usage",
        url: "https://github.com/wensity/registry#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "ai-canvas README — install and usage",
        url: "https://github.com/aicanvas-me/aicanvas#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "codefronts README — install and usage",
        url: "https://github.com/codefronts/toolkit#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "intent-ui README — install and usage",
        url: "https://github.com/irsyadadl/intentui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "148acd77308d4a13b31b2ae2846d243b486c1f60",
        content: "## Intent\n\n![OG](https://intentui.com/opengraph-image.png?v=1)\nIntent is a chill set of React components, built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/getting-started.html?ref=intentui.com), all about keeping the web accessible. Easy to customize and just copy & paste into your React projects. Plus, it includes Tailwind CSS for sleek styling right out of the box.\n\n\n## Documentation\nSwing by [intentui.com](https://intentui.com/docs/2.x/getting-started/introduction) to peep the docs and get the lowdown on getting started!\n\n## Blocks\nDesign pages faster than ever with [Intent Blocks](https://blocks.intentui.com).\n\n## Contributing\n\nMake sure to check out the [contributing guide](https://intentui.com/docs/2.x/prologue/contribution-guide), and join our awesome list of [contributors](https://github.com/irsyadadl/d./graphs/contributors). We can't wait to see what you bring to the table!\n\n## License\nLicensed under the [MIT license](https://github.com/irsyadadl/d./blob/main/LICENSE), so feel free to tweak, share, and remix as long as you give the proper shout-out!",
      }
    ],
  },
  {
    slug: "reui",
    permission: {
      status: "granted",
      source: "https://github.com/keenthemes/reui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "reui README — install and usage",
        url: "https://github.com/keenthemes/reui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "elevenlabs-ui README — install and usage",
        url: "https://github.com/elevenlabs/ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "inspira-ui README — install and usage",
        url: "https://github.com/unovue/inspira-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "04c57ab62b9713872ebbf68988dff1836ed3d764",
        content: "<p align=\"center\">\n  <a href=\"https://github.com/unovue/inspira-ui\">\n    <img src=\"./logo.png\" alt=\"Logo\" width=\"150\" />\n  </a>\n</p>\n<h1 align=\"center\">\n  Inspira UI\n</h1>\n<p align=\"center\">\n  <b>Build beautiful websites using Vue & Nuxt.</b><br>\n  A curated collection of beautifully designed, reusable components for Vue & Nuxt.\n</p>\n\n<p align=\"center\">\n  <a href=\"https://github.com/unovue/inspira-ui/stargazers\">\n    <img alt=\"GitHub stars\" src=\"https://img.shields.io/github/stars/unovue/inspira-ui?style=social\">\n  </a>\n  <a href=\"https://github.com/unovue/inspira-ui/blob/main/LICENSE.md\">\n    <img alt=\"License\" src=\"https://img.shields.io/badge/License-MIT-yellow.svg\">\n  </a>  \n</p>\n\n<p align=\"center\">🌐 Available Languages</h2>\n\n<p align=\"center\">\n  <a href=\"README.md\">🇺🇸 English</a> |\n  <a href=\"README_CN.md\">🇨🇳 Chinese</a> |\n  <a href=\"README_IT.md\">🇮🇹 Italian</a>\n</p>\n\n---\n\nWelcome to [**Inspira UI**](https://inspira-ui.com), a community-driven project that brings the beauty and functionality of both [Aceternity UI](https://ui.aceternity.com) and [Magic UI](https://magicui.design) to the [Vue](https://vuejs.org) & [Nuxt](https://nuxt.com) ecosystem! While this project draws inspiration from these sources, it also includes unique custom components contributed by the community and created by us.\nFor **Chinese version** visit [here](README_CN.md).\n\n## ✨ About Inspira UI\n\nInspira UI is a collection of elegant, ready-to-use Vue components designed to be flexible and easy to integrate. Rather than being a traditional component library, it allows you to pick, customize, and adapt components as needed, giving you the freedom to shape them to fit your unique project requirements.\n\n## 🚀 Why Inspira UI?\n\nInspira UI was created to fill a gap in the Vue community by providing a set of components with the aesthetics and functionality of both Aceternity UI and Magic UI. Our goal is to empower developers to build beautiful applications more efficiently while adding our own custom and community-driven designs.\n\n## 🎯 Key Features\n\n- **Free and Open Source**: Completely [open source](https://github.com/unovue/inspira-ui) under the MIT license.\n- **Highly Configurable**: Tailor components to your specific design needs. Check out our [configuration guide](/api/configuration).\n- **Diverse Component Range**: A broad selection of [components](/components), inspired by Aceternity UI, Magic UI, and custom contributions, to help you build anything you imagine.\n- **Mobile Optimized**: Designed to look great on all devices.\n- **Nuxt Compatibility**: Fully compatible with [Nuxt](https://nuxt.com).\n\n## 📚 Documentation\n\nFor full documentation and usage examples, visit [**Inspira UI Documentation**](https://inspira-ui.com).\n\n## 🙏 Acknowledgments\n\nA special thanks to:\n\n- [Aceternity UI](https://ui.aceternity.com) for providing the inspiration and permission to adapt the original designs.\n- [Magic UI](https://magicui.design) for its beautiful design inspiration.\n- [",
      }
    ],
  },
  {
    slug: "reka-ui",
    permission: {
      status: "granted",
      source: "https://github.com/unovue/reka-ui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "reka-ui README — install and usage",
        url: "https://github.com/unovue/reka-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "melt-ui README — install and usage",
        url: "https://github.com/melt-ui/next-gen#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "3450a91f47c1c7392c5c9385c12b3d4897e85ffe",
        content: "## Getting started\n\nRead our [docs](https://next.melt-ui.com/guides/installation) for more info.\n\n## Contributing\n\n**Contributions are welcome and encouraged!**\n\nMelt UI is under active development. Currently planned features can be found in the\n[issues tab](https://github.com/melt-ui/next-gen/issues), alongside bug reports.\n\nWe work on this project on a volunteer basis in our free time. If you notice something that hasn't\nbeen implemented yet or could be improved, do consider contributing to the project! The goal is to\nenhance the experience of building with Svelte and improve the ecosystem for everyone.\n\nCheck out our [Contributing guide](./CONTRIBUTING.md) to learn more.\n\n### Roadmap\n\nFor a rough roadmap of planned features, check out [ROADMAP.MD](./ROADMAP.md)\n\n## Sponsors\n\n<p align=\"center\">\n  <a href=\"https://github.com/sponsors/tglide\">\n    <img src='https://github.com/tglide/sponsors/blob/main/sponsors.svg?raw=true' alt=\"Logos from Sponsors\" />\n  </a>\n</p>\n\n## Community\n\nMelt UI is an open-source project built by the community for the community. It wouldn't be possible\nif it wasn't for the work of some amazing people.\n\n[![Contributors](https://contrib.rocks/image?repo=melt-ui/next-gen)](<[https://github.com/codemaniac-sahil/news-webapp-api](https://github.com/melt-ui/next-gen)https://github.com/melt-ui/next-gen/graphs/contributors>)\n\n### Discord\n\nGot any questions? Want to talk to the maintainers?\n\nOur [Discord community](https://melt-ui.com/discord) is a great place to get in touch with us, and\nwe'd love to have you there.\n\n<a href=\"https://melt-ui.com/discord\" alt=\"Melt UI Discord community\">\n<picture>\n  <source media=\"(prefers-color-scheme: dark)\" srcset=\"https://invidget.switchblade.xyz/2QDjZkYunf\">\n  <img alt=\"Melt UI Discord community\" src=\"https://invidget.switchblade.xyz/2QDjZkYunf?theme=light\">\n</picture>\n</a>\n\n## Similar projects\n\nLooking for more? Check out the\n[other component library projects available for Svelte](https://sveltesociety.dev/components#design-systems).",
      }
    ],
  },
  {
    slug: "zard-ui",
    permission: {
      status: "granted",
      source: "https://github.com/zard-ui/zardui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "zard-ui README — install and usage",
        url: "https://github.com/zard-ui/zardui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "434090942c850fd21546c25fed1fd0ddae72150b",
        content: "### Quick Start for Contributors\n\n1. Fork the repository\n2. Create your feature branch: `git checkout -b feat/#123-your-feature`\n3. Develop with as many commits as you want\n4. Open a PR to `master`\n5. After review + merge = automatic release!\n\n### Development Commands\n\n```bash\nnpm start          # Start dev server (port 4222)\nnpm test           # Run all tests\nnpm run build      # Build production\nnpm run release    # Automated release\n```\n\n## License\n\nLicensed under the [MIT license](/LICENSE.md).\n\n## Get In Touch\n\n<p>Click on one of the icons and Help us on this journey and be part of our community.</p>\n\n<a href=\"https://chat.whatsapp.com/Dctdh6Huhvm24OX6js5XKT\" target=\"_blank\">\n  <img src=\"https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white\" alt=\"whatsapp\" />\n</a>\n<img src=\"https://dcbadge.limes.pink/api/server/https://discord.com/invite/yP8Uj9rAX9\" alt=\"discord\" />\n\n<span>Follow us in</span> <a href=\"https://x.com/zard_ui\" target=\"_blank\">\n  <img src=\"https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white\" alt=\"X\" />\n</a>",
      }
    ],
  },
  {
    slug: "spartan-ui",
    permission: {
      status: "granted",
      source: "https://github.com/spartan-ng/spartan",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "spartan-ui README — install and usage",
        url: "https://github.com/spartan-ng/spartan#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "corvu README — install and usage",
        url: "https://github.com/corvudev/corvu#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "8b441a0c6d17f64b17b3ee64d5d94b92e1711754",
        content: "<div align=\"center\">\n  <a href=\"https://corvu.dev\">\n    <img src=\"https://corvu.dev/readme/corvu.png\" width=1000 alt=\"corvu banner\" />\n  </a>\n</div>\n<br />\n<div align=\"center\">\n\n![NPM Downloads](https://img.shields.io/endpoint?color=a888f1&label=downloads&url=https://combined-npm-downloads.deno.dev/@corvu/accordion,@corvu/calendar,@corvu/dialog,@corvu/disclosure,@corvu/drawer,@corvu/otp-field,@corvu/popover,@corvu/resizable,@corvu/tooltip)\n[![License](https://img.shields.io/github/license/corvudev/corvu?color=a888f1)](https://github.com/corvudev/corvu/blob/main/LICENSE)\n\n**[Documentation](https://corvu.dev/) • [Discussion](https://github.com/corvudev/corvu/discussions) • [Discord](https://discord.com/invite/solidjs)**\n</div>\n\n## About\ncorvu is a collection of open source UI primitives for SolidJS. It offers:\n\n- 🫥 Unstyled,\n- ♿ Accessible primitives\n- 🪄 High customizability\n- 🌟 Delightful developer experience\n- 📝 Good documentation\n- ✅ SSR Support\n\nRead more at [corvu.dev](https://corvu.dev).\n\n## Primitives\n\n<table>\n  <tr>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/accordion/\">\n        <img src=\"https://corvu.dev/primitives/accordion.jpg\" alt=\"SolidJS Accordion\">\n        <p>Accordion</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/calendar/\">\n        <img src=\"https://corvu.dev/primitives/calendar.jpg\" alt=\"SolidJS Calendar\">\n        <p>Calendar</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/dialog/\">\n        <img src=\"https://corvu.dev/primitives/dialog.jpg\" alt=\"SolidJS Dialog\">\n        <p>Dialog</p>\n      </a>\n    </td>\n  </tr>\n  <tr>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/disclosure/\">\n        <img src=\"https://corvu.dev/primitives/disclosure.jpg\" alt=\"SolidJS Disclosure\">\n        <p>Disclosure</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/drawer/\">\n        <img src=\"https://corvu.dev/primitives/drawer.jpg\" alt=\"SolidJS Drawer\">\n        <p>Drawer</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/otp-field/\">\n        <img src=\"https://corvu.dev/primitives/otp-field.jpg\" alt=\"SolidJS OTP Field\">\n        <p>OTP Field</p>\n      </a>\n    </td>\n  </tr>\n  <tr>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/popover/\">\n        <img src=\"https://corvu.dev/primitives/popover.jpg\" alt=\"SolidJS Popover\">\n        <p>Popover</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/resizable/\">\n        <img src=\"https://corvu.dev/primitives/resizable.jpg\" alt=\"SolidJS Resizable/Splitter\">\n        <p>Resizable</p>\n      </a>\n    </td>\n    <td align=\"center\" width=33%>\n      <a href=\"https://corvu.dev/docs/primitives/tooltip/\">\n        <img src=\"https:/",
      }
    ],
  },
  {
    slug: "starwind-ui",
    permission: {
      status: "granted",
      source: "https://github.com/starwind-ui/starwind-ui",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "starwind-ui README — install and usage",
        url: "https://github.com/starwind-ui/starwind-ui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "webcoreui README — install and usage",
        url: "https://github.com/Frontendland/webcoreui#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "web-awesome README — install and usage",
        url: "https://github.com/shoelace-style/webawesome#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "e99dc5e26ae63410bd481aa8a686a61ff7158ccd",
        content: "# wa-components\nWeb Awesome's open source components.",
      }
    ],
  },
  {
    slug: "cmdk",
    permission: {
      status: "granted",
      source: "https://github.com/pacocoursey/cmdk",
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "cmdk README — install and usage",
        url: "https://github.com/pacocoursey/cmdk#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
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
      checkedAt: "2026-10-09T19:55:23.793Z",
    },
    snapshots: [
      {
        title: "kbar README — install and usage",
        url: "https://github.com/timc1/kbar#readme",
        fetchedAt: "2026-10-09T19:55:23.793Z",
        sourceRevision: "26ec0f49f92ab34fa6ab59392782d56020f28098",
        content: "### Usage\n\nHave a fully functioning command menu for your site in minutes. First, install kbar.\n\n```\nnpm install kbar\n```\n\nThere is a single provider which you will wrap your app around; you do not have to wrap your\n_entire_ app; however, there are no performance implications by doing so.\n\n```tsx\n// app.tsx\nimport { KBarProvider } from \"kbar\";\n\nfunction MyApp() {\n  return (\n    <KBarProvider>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nLet's add a few default actions. Actions are the core of kbar – an action define what to execute\nwhen a user selects it.\n\n```tsx\n  const actions = [\n    {\n      id: \"blog\",\n      name: \"Blog\",\n      shortcut: [\"b\"],\n      keywords: \"writing words\",\n      perform: () => (window.location.pathname = \"blog\"),\n    },\n    {\n      id: \"contact\",\n      name: \"Contact\",\n      shortcut: [\"c\"],\n      keywords: \"email\",\n      perform: () => (window.location.pathname = \"contact\"),\n    },\n  ]\n\n  return (\n    <KBarProvider actions={actions}>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nNext, we will pull in the provided UI components from kbar:\n\n```tsx\n// app.tsx\nimport {\n  KBarProvider,\n  KBarPortal,\n  KBarPositioner,\n  KBarAnimator,\n  KBarSearch,\n  useMatches,\n  NO_GROUP\n} from \"kbar\";\n\n// ...\n  return (\n    <KBarProvider actions={actions}>\n      <KBarPortal> // Renders the content outside the root node\n        <KBarPositioner> // Centers the content\n          <KBarAnimator> // Handles the show/hide and height animations\n            <KBarSearch /> // Search input\n          </KBarAnimator>\n        </KBarPositioner>\n      </KBarPortal>\n      <MyApp />\n    </KBarProvider>;\n  );\n}\n```\n\nAt this point hitting <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) will animate in a search input and nothing more.\n\nkbar provides a few utilities to render a performant list of search results.\n\n- `useMatches` at its core returns a flattened list of results and group name based on the current\n  search query; i.e. `[\"Section name\", Action, Action, \"Another section name\", Action, Action]`\n- `KBarResults` renders a performant virtualized list of these results\n\nCombine the two utilities to create a powerful search interface:\n\n```tsx\nimport {\n  // ...\n  KBarResults,\n  useMatches,\n  NO_GROUP,\n} from \"kbar\";\n\n// ...\n// <KBarAnimator>\n//   <KBarSearch />\n<RenderResults />;\n// ...\n\nfunction RenderResults() {\n  const { results } = useMatches();\n\n  return (\n    <KBarResults\n      items={results}\n      onRender={({ item, active }) =>\n        typeof item === \"string\" ? (\n          <div>{item}</div>\n        ) : (\n          <div\n            style={{\n              background: active ? \"#eee\" : \"transparent\",\n            }}\n          >\n            {item.name}\n          </div>\n        )\n      }\n    />\n  );\n}\n```\n\nHit <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) and you should see a primitive command menu. kbar allows you to have full control over all\naspects of your command menu – refer to the <a href=\"https://kbar.vercel.app/docs\">docs</a> to get\nan understanding of further capabilities. Looking forward to see what you build.\n\n## Used by\n\nListed are some of the various usages of kbar in the wild – check them out! Create a PR to add your\nsite below.\n\n- [Outline](https://www.getoutline.com/)\n- [zenorocha.com](https://zenorocha.com/)\n- [griko.id](https://griko.id/)\n- [lavya.me](https://www.lavya.me/)\n- [OlivierAlexander.com](https://olivier-alexander-com-git-master-olivierdijkstra.vercel.app/)\n- [dhritigabani.me](https://dhritigabani.me/)\n- [jpedromagalhaes](https://jpedromagalhaes.vercel.app/)\n- [animo](https://demo.animo.id/)\n- [tobyb.xyz](https://www.tobyb.xyz/)\n- [higoralves.dev](https://www.higoralves.dev/)\n- [coderdiaz.dev](https://coderdiaz.dev/)\n- [NextUI](https://nextui.org/)\n- [evm.codes](https://www.evm.codes/)\n- [filiphalas.com](https://filiphalas.com/)\n- [benslv.dev](https://benslv.dev/)\n- [vortex](https://hydralite.io/vortex)\n- [ladislavprix](https://ladislavprix.cz/)\n- [pixiebrix](https://www.pixiebrix.com/)\n- [nfaustino.com](https://nfaustino-com.vercel.app/)\n- [bradleyyeo.com](https://bradleyyeo-com.vercel.app/)\n- [andredevries.dev](https://www.andredevries.dev/)\n- [about-ebon](https://about-ebon.vercel.app/)\n- [frankrocha.dev](https://www.frankrocha.dev/)\n- [cameronbrill.me](https://www.cameronbrill.me/)\n- [codaxx.ml](https://codaxx.ml/)\n- [jeremytenjo.com](https://jeremytenjo.com/)\n- [villivald.com](https://villivald.com/)\n- [maxthestranger](https://code.maxthestranger.com/)\n- [koripallopaikat](https://koripallopaikat.com/)\n- [alexcarpenter.me](https://alexcarpenter.me/)\n- [hackbar](https://github.com/Uier/hackbar)\n- [web3kbar](https://web3kbar.vercel.app/)\n- [burakgur](https://burakgur-com.vercel.app/)\n- [ademilter.com](https://ademilter.com/)\n- [anasaraid.me](https://anasaraid.me/)\n- [daniloleal.co](https://daniloleal.co/)\n- [hyperround](https://github.com/heyAyushh/hyperound)\n- [Omnivore](https://omnivore.app)\n- [tiagohermano.dev](",
      }
    ],
  },
];
