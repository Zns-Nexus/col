import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://morphin.dev/components",
  repoUrl: "https://github.com/sikkeep/morphin-registry",
  preview: {
    src: "https://morphin.dev/inspirations-og.png",
    alt: "Morphin UI design inspiration page preview",
  },
  pricing: {
    model: "freemium",
    summary: "Browsing and the free components cost nothing; PRO is $15 per month (billed $45 every three months) or $179 one-time for lifetime access, and unlocks the PRO screens, Cursor prompts and CLI access to PRO items.",
    source: "https://morphin.dev/pricing",
  },
  collection: "Morphin hosts components that users submit and moderates them, so quality, dependencies and PRO status vary per item.",
} satisfies LibraryDetails;
