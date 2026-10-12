import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://transitions.dev/skill.html",
  repoUrl: "https://github.com/Jakubantalik/transitions.dev",
  preview: {
    src: "https://transitions.dev/assets/og-main.jpg",
    alt: "Transitions.dev: UI transitions for AI agents",
  },
  pricing: {
    model: "freemium",
    summary: "Core transitions are free; the full library and a commercial license come with paid Pro plans, monthly or lifetime.",
    license: "MIT",
    source: "https://transitions.dev/pro.html",
  },
} satisfies LibraryDetails;
