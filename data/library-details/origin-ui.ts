import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://coss.com/ui/docs",
  repoUrl: "https://github.com/cosscom/coss",
  preview: {
    src: "https://coss.com/ui/opengraph-image.png",
    alt: "coss ui documentation site preview, formerly Origin UI",
  },
  pricing: {
    model: "free",
    summary: "coss ui components are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/cosscom/coss/blob/main/LICENSING.md",
  },
} satisfies LibraryDetails;
