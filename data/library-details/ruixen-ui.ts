import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ruixen.com/docs",
  repoUrl: "https://github.com/ruixenui/ruixen.com",
  preview: {
    src: "https://ruixen.com/og",
    alt: "Ruixen UI, marketing UI for shadcn projects, multi-stack",
  },
  pricing: {
    model: "freemium",
    summary: "The component library is free and MIT licensed; Ruixen Pro adds premium components and templates as a one-time lifetime purchase.",
    license: "MIT",
    source: "https://ruixen.com/pricing",
  },
} satisfies LibraryDetails;
