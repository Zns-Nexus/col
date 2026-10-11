import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://lordicon.com/docs",
  repoUrl: "https://github.com/lordicondev/player-element",
  install: [
    { label: "Web custom element", command: "npm install @lordicon/element" },
    { label: "React player", command: "npm install @lordicon/react" },
  ],
  gettingStarted: [
    "Browse https://lordicon.com/icons and pick a style family: Wired for larger decorative icons, System for 24 px UI icons, Doodle for hand-drawn ones (see https://lordicon.com/docs/icon-styles). Each icon can have several animation states, such as hover, loop or morph.",
    "Download the icon as Lottie JSON from https://lordicon.com/icons, or copy the icon's Lottie JSON from the icon page. The free plan covers about 9,700 icons and requires attribution; PRO unlocks the rest and drops the attribution requirement. See https://lordicon.com/pricing and https://lordicon.com/licenses.",
    "For plain web pages, run `npm install @lordicon/element`, call `defineElement()` once, then use `<lord-icon trigger=\"hover\" src=\"/my-icon.json\"></lord-icon>`. Attributes include `colors`, `stroke`, `speed`, `trigger`, `target` and `state`. Full reference: https://lordicon.com/docs/web.",
    "For React, run `npm install @lordicon/react` and render `<Player icon={ICON} />`, using a ref for `play()` and `playFromBeginning()`. Props include `size`, `state`, `colorize` and `colors`. Full reference: https://lordicon.com/docs/react.",
    "Host the JSON files yourself for production. The docs note there is no guarantee of 100% CDN uptime for icons loaded from Lordicon's CDN, and the minify option on download gives smaller files. Add the attribution link described at https://lordicon.com/docs/license/attribution if you use free icons.",
  ],
  agentPrompt: `Add Lordicon (https://lordicon.com) animated icons to this existing project.

Lordicon is an animated icon library delivered as Lottie JSON files, with free MIT-licensed player packages for the web and React. The icons themselves are proprietary assets under the Lordicon license, not open source.

Prerequisites:
- Node.js and a package manager. Decide whether the app uses plain HTML or a web framework (use @lordicon/element) or React (use @lordicon/react).
- The icon JSON files. Ask me which icons to use, or ask me to download them from https://lordicon.com/icons and place them in the project, for example under public/icons or src/assets. Do not invent icon JSON.
- Confirm with me whether the project uses the free plan (attribution required) or PRO (no attribution), because it changes what you must add to the site.

Steps:
1. Read https://lordicon.com/docs/web for the custom element or https://lordicon.com/docs/react for the React player, and https://lordicon.com/licenses for the license terms.
2. For web projects, install the element: npm install @lordicon/element. Call defineElement() once at the app entry: import { defineElement } from "@lordicon/element"; defineElement();
3. Render an icon with <lord-icon trigger="hover" src="/icons/my-icon.json"></lord-icon>. Customize with the colors attribute (for example primary:#ff0000), stroke (light, regular or bold), speed, and state. To make a parent element trigger the animation, set target to its CSS selector. For one color that follows the text color, add the class current-color.
4. For React projects, install the player instead: npm install @lordicon/react. Import { Player } from "@lordicon/react", pass the parsed icon JSON as icon, and use a ref to call play() or playFromBeginning(). Use size, state, colorize and colors as documented.
5. Load icons on demand where possible (the web element supports lazy loading through the loading attribute) and host the JSON files from the project instead of depending on the Lordicon CDN.
6. If the project uses free-plan icons, add the credit link from https://lordicon.com/docs/license/attribution, for example <a href="https://lordicon.com/">Animated icons by Lordicon.com</a> in the footer. Then run the project's build and check the icons in the browser.

Notes:
- The license forbids reselling the icons as standalone files, using them as the core of an icon library or icon pack, and including them in HTML templates or themes.
- Colors are set per icon palette name, which differs between icons. Check the icon's palette in the Lordicon editor before using the colors attribute.
- Respect prefers-reduced-motion: avoid looping triggers for non-essential icons.`,
  pricing: {
    model: "freemium",
    summary: "The free plan gives about 9,700 animated icons with unlimited exports and a commercial license that requires attribution; PRO is $8 a month billed annually and adds the rest of the icons without attribution.",
    license: "MIT (player packages); icons under the Lordicon license",
    source: "https://lordicon.com/pricing",
  },
} satisfies LibraryDetails;
