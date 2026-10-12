import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.shadcnblocks.com/docs",
  repoUrl: "https://github.com/shadcnblocks/shadcn-ui-blocks",
  preview: {
    src: "https://cdn.shadcnblocks.com/shadcnblocks/images/og/og-default.png",
    alt: "Shadcnblocks open graph preview of the shadcn/ui block library",
  },
  pricing: {
    model: "freemium",
    summary: "Free blocks only need a login; Pro, Premium and Elite plans unlock the full catalog as one-time lifetime purchases.",
    source: "https://www.shadcnblocks.com/pricing",
  },
} satisfies LibraryDetails;
