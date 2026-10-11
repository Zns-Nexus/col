import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://toggle.supply/",
  repoUrl: "https://github.com/jaretpeerson/toggleSupply",
  gettingStarted: [
    "Open https://toggle.supply/ and pick a component from the grid, for example https://toggle.supply/components/expandImageHover/. Each page describes how the effect works, then has HTML, CSS and JS links to the three source files in the GitHub repository.",
    "Copy the markup, the stylesheet from `src/styles/components/<name>.css` and the script from `public/scripts/components/<name>.js` into your project. Components are vanilla HTML, CSS and JavaScript with no framework or package to install; a few use GSAP for sequenced animation, so check the script's imports.",
    "Adapt the class names and content to your page. The pages explain the technique, such as flex values interpolated per frame in `requestAnimationFrame`, and `:nth-child` rules that remove items at smaller breakpoints, so you can change behavior without guessing.",
    "Use https://toggle.supply/inspiration/ for a separate archive of outside websites with notable design and interaction, each linking to the original site. It is reference only and contains no code.",
    "To run the site locally, clone https://github.com/jaretpeerson/toggleSupply and run `npm install` and `npm run dev`. The site is an Astro project and each component is one `.astro` page, one CSS file and one JS file.",
  ],
  preview: {
    src: "https://toggle.supply/assets/og-image/togglesupply-OGImage.png",
    alt: "Toggle Supply home page preview",
  },
  agentPrompt: `Use Toggle Supply (https://toggle.supply) as a source of vanilla HTML, CSS and JavaScript UI components for this project.

Toggle Supply is a CSS-first collection of hand-coded components and interactions, such as scroll-direction marquees, pixelated page transitions, lightboxes, an expandable accordion and a form validation pattern. There is no package, CLI or registry: you copy three files per component from its GitHub repository (https://github.com/jaretpeerson/toggleSupply). The inspiration archive at https://toggle.supply/inspiration/ links to other people's sites and has no code.

Prerequisites:
- A project where plain HTML, CSS and JavaScript can be added. Frameworks work, but you will port the markup and the script by hand.
- Know where this project keeps component styles and client-side scripts, so the copied files follow its conventions.

Steps:
1. Ask me which interaction I am building, then find the closest component at https://toggle.supply/. Open its page, for example https://toggle.supply/components/expandImageHover/, and read the explanation of how the effect works.
2. Open the HTML, CSS and JS links on that page. They point at src/pages/components/<name>.astro, src/styles/components/<name>.css and public/scripts/components/<name>.js in the repository. Read all three before copying anything.
3. Port the markup from the .astro file into this project's templates, keeping the class names and DOM structure that the script and CSS rely on. Strip the Astro layout and site chrome.
4. Copy the CSS into this project's stylesheet setup and rename classes only if they collide with existing ones. Copy the JavaScript into a module this project loads on the relevant page, and check whether it imports GSAP. If it does, install gsap with this project's package manager.
5. Replace the demo content and images with real content, then test at the real trigger point. Components that use requestAnimationFrame or scroll listeners should be checked for cleanup on unmount if the target is a framework component.
6. Check keyboard access and prefers-reduced-motion, since the pages describe the technique but not every accessibility fallback.

Notes:
- The repository is MIT licensed. Keep the copyright notice if you copy files in bulk.
- README says Toggle Supply is framework-agnostic and CSS-first: animations use CSS transitions where possible and JavaScript only for logic.
- Components are small and specific. Expect to adapt them rather than drop them in.`,
  pricing: {
    model: "free",
    summary: "Every component is free to copy under the MIT license; the site and repository list no paid tier.",
    license: "MIT",
    source: "https://github.com/jaretpeerson/toggleSupply/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
