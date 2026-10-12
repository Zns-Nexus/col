import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://chakra-ui.com/docs/get-started/installation",
  repoUrl: "https://github.com/chakra-ui/chakra-ui",
  preview: {
    src: "https://next.chakra-ui.com/og-image.png",
    alt: "Chakra UI website social preview image",
  },
  pricing: {
    model: "freemium",
    summary: "Chakra UI is free; Chakra UI Pro blocks and page layouts are paid.",
    license: "MIT",
    source: "https://pro.chakra-ui.com/pricing",
  },
} satisfies LibraryDetails;
