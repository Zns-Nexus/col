import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://codefronts.com",
  repoUrl: "https://github.com/codefronts/toolkit",
  gettingStarted: [
    "Open https://codefronts.com. The site is 100% client-side: no signup, no account, no paywall, and ads plus optional Ko-fi support are how the demos stay free. There is nothing to install.",
    "Browse by category from the nav: Components, Motion, Layouts, Navigation, Snippets, Design Styles, plus Generators and Tools, or use the full catalog at https://codefronts.com/collections/. Browse by framework at https://codefronts.com/css/ (155 CSS collections) and https://codefronts.com/tailwind/ (41 Tailwind v4 collections).",
    "Open a collection, for example https://codefronts.com/components/css-buttons/ (51 CSS Buttons). Each demo has its own page at `https://codefronts.com/<collection>/<demo-slug>/` and shows the rendered demo alongside the HTML, CSS and any JS.",
    "Copy the code and paste it into your project. Every demo page also has a `For AI` tab that emits a single pre-framed markdown block (HTML, CSS and JS in fenced blocks, plus the source URL and a scoping note) ready to paste into an AI assistant, and an `Open in CodePen` button that pre-fills a pen with no API key or signup.",
    "Bookmark demos with the nav bookmark icon and review them later in your personal list at https://codefronts.com/saved/, which is stored in browser localStorage. For agent or bulk extraction, use the machine-readable manifests: the https://codefronts.com/llms.txt index, the full corpus at https://codefronts.com/llms-full.txt, and a per-collection file at `https://codefronts.com/llms/<collection-slug>.txt`.",
  ],
  preview: {
    src: "https://codefronts.com/og-default.png",
    alt: "CodeFronts open graph preview image",
  },
  agentPrompt: `Use CodeFronts (https://codefronts.com) as a copy-paste source for CSS, Tailwind and vanilla JS components while I work in this repo.

What CodeFronts is: a free library of hand-coded CSS and Tailwind v4 components, motion/effect examples, layouts, navigation patterns, UI snippets and design styles, plus interactive generators and developer tools. It is a website, not a package: there is no npm package, no CLI, no MCP server and no build step, so do not add anything to package.json for CodeFronts itself.

What it publishes today (verified at https://codefronts.com/about/): 54 component collections, 41 motion and effects, 30 layout patterns, 23 navigation, 28 UI snippets, 20 design styles (196 total content collections), 26 visual generators and 24 developer tools. Demos are plain HTML with either a stylesheet or Tailwind utility classes; JavaScript is included only when the interaction needs it. Everything is free with no signup, no build step and no paywall; the site is ad-supported with optional Ko-fi support.

Prerequisites:
- The project already has its own HTML/CSS or Tailwind setup. CodeFronts is reference material, not a dependency, so keep its styling consistent with this project's conventions.
- Standalone offline copies of the most-used CSS tools are public and MIT-licensed at https://github.com/codefronts/toolkit (one self-contained HTML file per tool, no build step). Fork, self-host or drop a single file into the repo if a local tool is useful; the README explicitly says there is no npm install.

Steps:
1. Read the official catalog at https://codefronts.com/collections/ (or a category page such as https://codefronts.com/components/) and pick the collection that matches what I am building. Collections are grouped as Components, Motion, Layouts, Navigation, Snippets and Design Styles; some also have a Tailwind v4 edition, browsable at https://codefronts.com/tailwind/.
2. Open the specific demo page at https://codefronts.com/<collection>/<demo-slug>/ and read the whole demo before copying: its HTML, its CSS (or utility classes), and any JS. The site states the gallery preview and the pasted result are the same code.
3. Copy the code. If I am using an AI assistant, prefer the demo's \`For AI\` tab: it returns one pre-framed markdown block with the HTML, CSS and JS in fenced code blocks plus the source URL and a scoping note. For a quick throwaway preview, the \`Open in CodePen\` button pre-fills a CodePen pen with no API key or signup.
4. Integrate the snippet with this project's conventions rather than pasting it verbatim: keep the existing component and token structure, reuse the project's spacing, color, radius and typography scales, and convert the markup to the framework's syntax if needed (for example class becomes className in JSX).
5. Preserve the accessibility the demo already has. CodeFronts holds every demo to semantic HTML (real button, form, details and dialog elements, not div plus ARIA), keyboard operability with a visible focus ring, correctness at 320 px, 600 px and 1200 px, and honoring prefers-reduced-motion. Keep those behaviors and confirm them after the paste.
6. Use the interactive tools and generators as scratch utilities, not as a build step: /tools/ (CSS minifier, CSS to Tailwind converter, color contrast checker, px to rem converter, responsive breakpoint tester) and /generators/ (gradient, box-shadow, border-radius, flexbox, grid, animation) all run in the browser and emit ready-to-paste CSS. For accessibility-relevant values, check color contrast with the Color Contrast Checker at https://codefronts.com/tools/color-contrast-checker/.
7. For bulk or agent-driven extraction, read the machine-readable manifests instead of scraping rendered HTML: the index at https://codefronts.com/llms.txt, the full corpus at https://codefronts.com/llms-full.txt, and a per-collection file at https://codefronts.com/llms/<collection-slug>.txt that contains the complete HTML, CSS and JS for every demo in that collection (a few hundred KB, far smaller than the whole corpus). Each snippet ends with a source-URL comment deep-linking back to the live demo.

Optional: bookmark promising demos with the nav bookmark icon and review them later in the localStorage-backed list at https://codefronts.com/saved/.

Use only code from the current demo pages, generators and tools on https://codefronts.com, and open the docs again whenever a demo needs behavior you do not see in the copied example.`,
  pricing: {
    model: "free",
    summary: "All collections and demos are free and copy-paste ready, with no signup or paywall.",
    license: "MIT",
    source: "https://codefronts.com",
  },
} satisfies LibraryDetails;
