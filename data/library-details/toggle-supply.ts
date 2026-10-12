import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://toggle.supply/",
  repoUrl: "https://github.com/jaretpeerson/toggleSupply",
  preview: {
    src: "https://toggle.supply/assets/og-image/togglesupply-OGImage.png",
    alt: "Toggle Supply home page preview",
  },
  pricing: {
    model: "free",
    summary: "Every component is free to copy under the MIT license; the site and repository list no paid tier.",
    license: "MIT",
    source: "https://github.com/jaretpeerson/toggleSupply/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
