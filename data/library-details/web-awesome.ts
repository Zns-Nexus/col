import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://webawesome.com/docs",
  repoUrl: "https://github.com/shoelace-style/webawesome",
  preview: {
    src: "https://webawesome.com/assets/images/open-graph/default.png",
    alt: "Web Awesome Core official preview",
  },
  pricing: {
    model: "freemium",
    summary: "Web Awesome Core is free under MIT; Pro adds paid components, themes, patterns, and design assets.",
    license: "MIT (Core)",
    source: "https://webawesome.com/license/",
  },
} satisfies LibraryDetails;
