import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://21st.dev",
  repoUrl: "https://github.com/serafimcloud/21st",
  preview: {
    src: "https://21st.dev/opengraph-image.png",
    alt: "21st.dev home page preview",
  },
  pricing: {
    model: "freemium",
    summary: "Browsing is free with a daily limit on free component copies; unlimited copies, premium templates and 21st AI need a paid subscription.",
    source: "https://21st.dev/pricing",
  },
  collection: "Anyone can publish to the registry, so components come from many community authors and terms can vary from one component to the next.",
} satisfies LibraryDetails;
