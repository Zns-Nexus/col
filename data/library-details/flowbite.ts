import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://flowbite.com/docs/",
  repoUrl: "https://github.com/themesberg/flowbite",
  preview: {
    src: "https://flowbite.com/docs/images/og-image.png",
    alt: "Flowbite og:image preview for the Tailwind CSS component library",
  },
  pricing: {
    model: "freemium",
    summary: "The open-source component library is free; Flowbite Pro (Figma design system, blocks and dashboard) is a one-time purchase with lifetime updates.",
    license: "MIT",
    source: "https://flowbite.com/pro/",
  },
} satisfies LibraryDetails;
