import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://amicons.design/icons",
  install: [
    { label: "Free set (npm)", command: "npm install amicons" },
  ],
  gettingStarted: [
    "Browse the set at https://amicons.design/icons. Switch between Line and Solid and between Round and Sharp, filter by category (43 of them), and filter by Free or Pro. Each icon page, for example https://amicons.design/icons/alarm-clock, shows its tags and a Download SVG button.",
    "To use the free set (300 icons in 1,200 variants) from a project, run `npm install amicons`. The package contains plain SVG files laid out as `icons/<round|sharp>/<line|solid>/<name>.svg`, plus an `index.json` manifest with each icon's name, category and tags.",
    "Import a single file with a bundler that handles SVG: `import arrowRight from 'amicons/icons/round/line/arrow-right.svg';`. The package ships SVG only, with no React or Vue components, so wrap the files with your bundler's SVG loader or inline the markup.",
    "The SVG files are sized `1em` and fill with `currentColor`, so they follow the surrounding font size and text color. Every icon is drawn on a 24px grid with a 2px stroke, so 24px (or an even multiple) keeps strokes crisp.",
    "For all 760 icons and the Figma file, buy Pro from the pricing section at https://amicons.design/#pricing. Read https://amicons.design/licenses first, because the terms differ by company size and forbid redistributing the icon files, including inside templates or UI kits.",
  ],
  preview: {
    src: "https://amicons.design/og-image.png",
    alt: "Amicons icon set official preview",
  },
  agentPrompt: `Add Amicons (https://amicons.design), a set of hand-crafted SVG icons, to this existing project.

Amicons ships each icon in four variants: round or sharp corners, line or solid fill. Every icon is on a 24px grid with a 2px stroke. The npm package contains only the free set (300 icons, 1,200 SVG files). The full 760-icon set and the Figma file are a paid download from the site.

Prerequisites:
- Confirm the project's bundler can import .svg files as URLs, as components, or as raw strings. Amicons does not ship React, Vue, or Svelte components.
- Read https://amicons.design/licenses. The icon files may be used in unlimited commercial projects, but they may not be redistributed, resold, or bundled into templates or UI kits.

Steps:
1. Check https://amicons.design/icons for the icon names you need, and note whether each one is marked Free or Pro. Only Free icons are in the npm package.
2. Install the free set with npm install amicons.
3. Import the needed files by path, for example import arrowRight from 'amicons/icons/round/line/arrow-right.svg'. Pick one corner style (round or sharp) and one fill style per surface, and use the other fill, for example solid, for active states.
4. Read icon names and categories from amicons/index.json instead of guessing file names. Names are lowercase and hyphenated, for example alarm-clock, arrow-down and bell-slash.
5. The SVGs are sized 1em and fill with currentColor, so set the size through font-size or CSS width and height, using 24px or an even multiple to keep the 2px stroke crisp, and set the color through the text color. Add an accessible label such as aria-label on standalone icons, and mark icons that sit next to visible text aria-hidden.
6. If a needed icon is Pro, tell me instead of substituting a lookalike from another set. The Pro purchase is at https://amicons.design/#pricing.
7. Run the project's typecheck and build, and confirm unused icons are not included in the bundle.

Notes:
- The npm package is the free set only and is versioned separately from the site, so check the name against index.json before importing.
- Missing icons can be requested from the site, and Pro licenses include free lifetime updates.
- Changes between releases, including renamed icons, are listed at https://amicons.design/changelog.`,
  pricing: {
    model: "freemium",
    summary: "The free set has 300 icons in 1,200 variants; Pro unlocks all 760 icons and 3,040 variants with lifetime updates as a one-time purchase starting at $89 for one person, scaling with company size.",
    license: "Amicons License Agreement (proprietary, no redistribution)",
    source: "https://amicons.design/#pricing",
  },
} satisfies LibraryDetails;
