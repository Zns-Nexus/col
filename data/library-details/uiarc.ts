import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://uiarc.dev/docs/installation",
  repoUrl: "https://github.com/kuratlielia/arc-library",
  preview: {
    src: "https://uiarc.dev/opengraph-image.png?e0ab1ba2db881709",
    alt: "Arc library website preview",
  },
  pricing: {
    model: "freemium",
    summary: "The open-source components are free under MIT; additional Pro components, blocks, and templates require paid access.",
    license: "MIT (free components)",
    source: "https://uiarc.dev/pricing",
  },
} satisfies LibraryDetails;
