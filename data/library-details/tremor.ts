import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.tremor.so/docs/getting-started/installation",
  repoUrl: "https://github.com/tremorlabs/tremor",
  preview: {
    src: "https://tremor.so/opengraph-image.png",
    alt: "Tremor Raw open graph preview",
  },
  pricing: {
    model: "free",
    summary: "The components are open source, and the former paid blocks and templates are now free and open source too.",
    license: "Apache-2.0",
    source: "https://blocks.tremor.so",
  },
} satisfies LibraryDetails;
