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
 * Snapshots so far cover the README install/usage of the deep-coverage batch;
 * the remaining granted libraries follow the same shape as they are ingested.
 */
export const libraryCorpus: LibraryCorpusEntry[] = [
  {
    slug: "21st-dev",
    permission: {
      status: "granted",
      source: "https://github.com/serafimcloud/21st",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "react-bits",
    permission: {
      status: "granted",
      source: "https://github.com/DavidHDev/react-bits",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "transition-dev",
    permission: {
      status: "granted",
      source: "https://github.com/Jakubantalik/transitions.dev",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "shadcn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcn-ui/ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "shadcn-ui README — install and usage",
        url: "https://github.com/shadcn-ui/ui#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "aceternity-ui",
    permission: {
      status: "denied",
      source: "https://ui.aceternity.com/licence",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "motion",
    permission: {
      status: "granted",
      source: "https://github.com/motiondivision/motion",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "radix-ui",
    permission: {
      status: "granted",
      source: "https://github.com/radix-ui/primitives",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "radix-ui README — install and usage",
        url: "https://github.com/radix-ui/primitives#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "base-ui README — install and usage",
        url: "https://github.com/mui/base-ui#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "react-aria README — install and usage",
        url: "https://github.com/adobe/react-spectrum#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "mantine",
    permission: {
      status: "granted",
      source: "https://github.com/mantinedev/mantine",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "mantine README — install and usage",
        url: "https://github.com/mantinedev/mantine#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "mui",
    permission: {
      status: "granted",
      source: "https://github.com/mui/material-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "mui README — install and usage",
        url: "https://github.com/mui/material-ui#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "daisyui",
    permission: {
      status: "granted",
      source: "https://github.com/saadeghi/daisyui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "flowbite",
    permission: {
      status: "granted",
      source: "https://github.com/themesberg/flowbite",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "preline",
    permission: {
      status: "granted",
      source: "https://github.com/htmlstreamofficial/preline",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "hyperui",
    permission: {
      status: "granted",
      source: "https://github.com/markmead/hyperui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "motion-primitives",
    permission: {
      status: "granted",
      source: "https://github.com/ibelick/motion-primitives",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "animata",
    permission: {
      status: "granted",
      source: "https://github.com/codse/animata",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "lucide",
    permission: {
      status: "granted",
      source: "https://github.com/lucide-icons/lucide",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "recharts",
    permission: {
      status: "granted",
      source: "https://github.com/recharts/recharts",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "tremor",
    permission: {
      status: "granted",
      source: "https://github.com/tremorlabs/tremor",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "react-three-fiber",
    permission: {
      status: "granted",
      source: "https://github.com/pmndrs/react-three-fiber",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "shadcn-svelte",
    permission: {
      status: "granted",
      source: "https://github.com/huntabyte/shadcn-svelte",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "shadcn-svelte README — install and usage",
        url: "https://github.com/huntabyte/shadcn-svelte#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "uselayouts",
    permission: {
      status: "granted",
      source: "https://github.com/iurvish/uselayouts",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "nexvyn-ui",
    permission: {
      status: "granted",
      source: "https://github.com/Nexvyn/Nexvyn-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "cult-ui",
    permission: {
      status: "granted",
      source: "https://github.com/nolly-studio/cult-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "spell-ui",
    permission: {
      status: "granted",
      source: "https://github.com/xxtomm/spell-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "rare-ui",
    permission: {
      status: "granted",
      source: "https://github.com/swamimalode07/rare-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "obsidian-ui",
    permission: {
      status: "granted",
      source: "https://github.com/Atharvsinh-codez/ObsidianUI",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "ark-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/ark",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "park-ui",
    permission: {
      status: "granted",
      source: "https://github.com/chakra-ui/park-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "headless-ui",
    permission: {
      status: "granted",
      source: "https://github.com/tailwindlabs/headlessui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "headless-ui README — install and usage",
        url: "https://github.com/tailwindlabs/headlessui#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "kibo-ui",
    permission: {
      status: "granted",
      source: "https://github.com/shadcnblocks/kibo",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "ruixen-ui",
    permission: {
      status: "granted",
      source: "https://github.com/ruixenui/ruixen.com",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "fancy-components",
    permission: {
      status: "granted",
      source: "https://github.com/danielpetho/fancy",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "anime-js",
    permission: {
      status: "granted",
      source: "https://github.com/juliangarnier/anime",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "react-spring",
    permission: {
      status: "granted",
      source: "https://github.com/pmndrs/react-spring",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "lenis",
    permission: {
      status: "granted",
      source: "https://github.com/darkroomengineering/lenis",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "rive",
    permission: {
      status: "granted",
      source: "https://github.com/rive-app/rive-wasm",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "dotlottie",
    permission: {
      status: "granted",
      source: "https://github.com/LottieFiles/dotlottie-web",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "godui",
    permission: {
      status: "granted",
      source: "https://github.com/LucasBassetti/godui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "hampton-ui",
    permission: {
      status: "granted",
      source: "https://ui.hampton.io/license",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "satisium-ui",
    permission: {
      status: "granted",
      source: "https://github.com/satisium/ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "wensity-ui",
    permission: {
      status: "granted",
      source: "https://github.com/wensity/registry",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "ai-canvas",
    permission: {
      status: "granted",
      source: "https://github.com/aicanvas-me/aicanvas",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "codefronts",
    permission: {
      status: "granted",
      source: "https://github.com/codefronts/toolkit",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "intent-ui",
    permission: {
      status: "granted",
      source: "https://github.com/irsyadadl/intentui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "reui",
    permission: {
      status: "granted",
      source: "https://github.com/keenthemes/reui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "elevenlabs-ui",
    permission: {
      status: "granted",
      source: "https://github.com/elevenlabs/ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "inspira-ui",
    permission: {
      status: "granted",
      source: "https://github.com/unovue/inspira-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "reka-ui",
    permission: {
      status: "granted",
      source: "https://github.com/unovue/reka-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "reka-ui README — install and usage",
        url: "https://github.com/unovue/reka-ui#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "zard-ui",
    permission: {
      status: "granted",
      source: "https://github.com/zard-ui/zardui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "spartan-ui",
    permission: {
      status: "granted",
      source: "https://github.com/spartan-ng/spartan",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "corvu",
    permission: {
      status: "granted",
      source: "https://github.com/corvudev/corvu",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "starwind-ui",
    permission: {
      status: "granted",
      source: "https://github.com/starwind-ui/starwind-ui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "webcoreui",
    permission: {
      status: "granted",
      source: "https://github.com/Frontendland/webcoreui",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "web-awesome",
    permission: {
      status: "granted",
      source: "https://github.com/shoelace-style/webawesome",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
    ],
  },
  {
    slug: "cmdk",
    permission: {
      status: "granted",
      source: "https://github.com/pacocoursey/cmdk",
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "cmdk README — install and usage",
        url: "https://github.com/pacocoursey/cmdk#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
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
      checkedAt: "2026-10-09T19:45:51.954Z",
    },
    snapshots: [
      {
        title: "kbar README — install and usage",
        url: "https://github.com/timc1/kbar#readme",
        fetchedAt: "2026-10-09T19:45:51.954Z",
        sourceRevision: "26ec0f49f92ab34fa6ab59392782d56020f28098",
        content: "### Usage\n\nHave a fully functioning command menu for your site in minutes. First, install kbar.\n\n```\nnpm install kbar\n```\n\nThere is a single provider which you will wrap your app around; you do not have to wrap your\n_entire_ app; however, there are no performance implications by doing so.\n\n```tsx\n// app.tsx\nimport { KBarProvider } from \"kbar\";\n\nfunction MyApp() {\n  return (\n    <KBarProvider>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nLet's add a few default actions. Actions are the core of kbar – an action define what to execute\nwhen a user selects it.\n\n```tsx\n  const actions = [\n    {\n      id: \"blog\",\n      name: \"Blog\",\n      shortcut: [\"b\"],\n      keywords: \"writing words\",\n      perform: () => (window.location.pathname = \"blog\"),\n    },\n    {\n      id: \"contact\",\n      name: \"Contact\",\n      shortcut: [\"c\"],\n      keywords: \"email\",\n      perform: () => (window.location.pathname = \"contact\"),\n    },\n  ]\n\n  return (\n    <KBarProvider actions={actions}>\n      // ...\n    </KBarProvider>\n  );\n}\n```\n\nNext, we will pull in the provided UI components from kbar:\n\n```tsx\n// app.tsx\nimport {\n  KBarProvider,\n  KBarPortal,\n  KBarPositioner,\n  KBarAnimator,\n  KBarSearch,\n  useMatches,\n  NO_GROUP\n} from \"kbar\";\n\n// ...\n  return (\n    <KBarProvider actions={actions}>\n      <KBarPortal> // Renders the content outside the root node\n        <KBarPositioner> // Centers the content\n          <KBarAnimator> // Handles the show/hide and height animations\n            <KBarSearch /> // Search input\n          </KBarAnimator>\n        </KBarPositioner>\n      </KBarPortal>\n      <MyApp />\n    </KBarProvider>;\n  );\n}\n```\n\nAt this point hitting <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) will animate in a search input and nothing more.\n\nkbar provides a few utilities to render a performant list of search results.\n\n- `useMatches` at its core returns a flattened list of results and group name based on the current\n  search query; i.e. `[\"Section name\", Action, Action, \"Another section name\", Action, Action]`\n- `KBarResults` renders a performant virtualized list of these results\n\nCombine the two utilities to create a powerful search interface:\n\n```tsx\nimport {\n  // ...\n  KBarResults,\n  useMatches,\n  NO_GROUP,\n} from \"kbar\";\n\n// ...\n// <KBarAnimator>\n//   <KBarSearch />\n<RenderResults />;\n// ...\n\nfunction RenderResults() {\n  const { results } = useMatches();\n\n  return (\n    <KBarResults\n      items={results}\n      onRender={({ item, active }) =>\n        typeof item === \"string\" ? (\n          <div>{item}</div>\n        ) : (\n          <div\n            style={{\n              background: active ? \"#eee\" : \"transparent\",\n            }}\n          >\n            {item.name}\n          </div>\n        )\n      }\n    />\n  );\n}\n```\n\nHit <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux/Windows) and you should see a primitive command menu. kbar allows you to have full control over all\naspects of your command menu – refer to the <a href=\"https://kbar.vercel.app/docs\">docs</a> to get\nan understanding of further capabilities. Looking forward to see what you build.\n\n## Used by\n\nListed are some of the various usages of kbar in the wild – check them out! Create a PR to add your\nsite below.\n\n- [Outline](https://www.getoutline.com/)\n- [zenorocha.com](https://zenorocha.com/)\n- [griko.id](https://griko.id/)\n- [lavya.me](https://www.lavya.me/)\n- [OlivierAlexander.com](https://olivier-alexander-com-git-master-olivierdijkstra.vercel.app/)\n- [dhritigabani.me](https://dhritigabani.me/)\n- [jpedromagalhaes](https://jpedromagalhaes.vercel.app/)\n- [animo](https://demo.animo.id/)\n- [tobyb.xyz](https://www.tobyb.xyz/)\n- [higoralves.dev](https://www.higoralves.dev/)\n- [coderdiaz.dev](https://coderdiaz.dev/)\n- [NextUI](https://nextui.org/)\n- [evm.codes](https://www.evm.codes/)\n- [filiphalas.com](https://filiphalas.com/)\n- [benslv.dev](https://benslv.dev/)\n- [vortex](https://hydralite.io/vortex)\n- [ladislavprix](https://ladislavprix.cz/)\n- [pixiebrix](https://www.pixiebrix.com/)\n- [nfaustino.com](https://nfaustino-com.vercel.app/)\n- [bradleyyeo.com](https://bradleyyeo-com.vercel.app/)\n- [andredevries.dev](https://www.andredevries.dev/)\n- [about-ebon](https://about-ebon.vercel.app/)\n- [frankrocha.dev](https://www.frankrocha.dev/)\n- [cameronbrill.me](https://www.cameronbrill.me/)\n- [codaxx.ml](https://codaxx.ml/)\n- [jeremytenjo.com](https://jeremytenjo.com/)\n- [villivald.com](https://villivald.com/)\n- [maxthestranger](https://code.maxthestranger.com/)\n- [koripallopaikat](https://koripallopaikat.com/)\n- [alexcarpenter.me](https://alexcarpenter.me/)\n- [hackbar](https://github.com/Uier/hackbar)\n- [web3kbar](https://web3kbar.vercel.app/)\n- [burakgur](https://burakgur-com.vercel.app/)\n- [ademilter.com](https://ademilter.com/)\n- [anasaraid.me](https://anasaraid.me/)\n- [daniloleal.co](https://daniloleal.co/)\n- [hyperround](https://github.com/heyAyushh/hyperound)\n- [Omnivore](https://omnivore.app)\n- [tiagohermano.dev](",
      }
    ],
  },
];
