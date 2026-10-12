import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://animejs.com/documentation",
  repoUrl: "https://github.com/juliangarnier/anime",
  preview: {
    src: "https://animejs.com/media/pages/documentation/c5370b24f4-1787698628/generated-og-image.en.png",
    alt: "Open Graph preview image for the Anime.js documentation page",
  },
  pricing: {
    model: "free",
    summary: "Anime.js is completely free and funded by sponsors, with no paid tiers or features.",
    license: "MIT",
    source: "https://github.com/juliangarnier/anime/blob/master/LICENSE.md",
  },
} satisfies LibraryDetails;
