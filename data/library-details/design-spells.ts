import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://designspells.com",
  gettingStarted: [
    "Open https://designspells.com to browse the gallery. Each entry is a short looping video of one detail, captioned with the product it was found in (for example spell 338, \"Smooth sheet transitions in Sudoku a Day\").",
    "Narrow the list with the tag filter buttons above the grid: Mobile, Desktop, Interaction, Easter Egg, Animation, Motion, Transition, Confetti, 3D, Dynamic Island, Button, and others. Each spell page links back to its tags, so you can walk a single idea across products.",
    "Open a spell at `https://designspells.com/spells/<slug>` for the full-size demo and its related entries. Every spell is credited to an app, and the app link goes to `https://designspells.com/apps/<slug>`, which lists every spell found in that product.",
    "Watch the clip, then copy the behavior into your own product: the site publishes no code, so reimplement the motion, timing and easing yourself with your animation library of choice.",
    "Follow along passively with the newsletter at https://designspells.com/newsletter, sent every alternate Saturday (10,000+ subscribers), or subscribe to the RSS feed at https://designspells.com/feed. Past issues are browsable at `https://designspells.com/newsletters/<number>`.",
  ],
  preview: {
    src: "https://designspells.com/og.png",
    alt: "Design Spells home page preview",
  },
  agentPrompt: `Use Design Spells (https://designspells.com) as a design reference for motion and micro-interactions while I work in this repo.

Design Spells is a curated gallery, not a library. It collects micro-interactions, easter eggs and other small design details from real products, each shown as a short looping video. Nothing is installed: there is no package, no CLI, no MCP server and no code to copy, so do not try to install anything.

Steps:
1. Read https://designspells.com to see what the gallery currently contains, and use the tag filter buttons (Mobile, Desktop, Interaction, Easter Egg, Animation, Motion, Transition, Confetti, 3D, Dynamic Island, Button) to narrow it down. Filter by a surface I am actually working on, such as a bottom sheet or an onboarding flow.
2. Ask me which screen or component I am building, then pick two or three spells that match it. Open each at https://designspells.com/spells/<slug> and describe the motion in concrete terms before writing any code: what triggers it, what property animates (translate, scale, opacity, clip-path, border-radius), the duration, the easing curve, and how it settles.
3. Use the app page at https://designspells.com/apps/<slug> to see how the same team solved the same problem elsewhere, which often reveals the pattern behind the one-off.
4. Reimplement the chosen detail with this project's own components, tokens and animation library. Keep it in the project's conventions: reuse existing primitives, respect the reduced-motion media query, and prefer existing transition and easing tokens over new values. Preserve the original's trigger, easing and resting state instead of approximating from memory of the clip.
5. Verify the result in the browser at the real trigger point, then check it with prefers-reduced-motion enabled and with keyboard-only navigation. Confirm the element returns to its resting state and does not trap focus.

Treat the gallery as inspiration, not as a source to copy into this repo. The motion is observed from a video, so the exact values are mine to decide: name the values you chose and why.`,
  pricing: {
    model: "free",
    summary: "Browsing the collection is free, with no paid tier.",
    source: "https://designspells.com",
  },
  collection: "It showcases design details from many other apps and sites; the work shown belongs to those products, so it is inspiration, not code you can reuse.",
} satisfies LibraryDetails;
