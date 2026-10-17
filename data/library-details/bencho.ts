import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://bencho.dev",
  preview: {
    src: "https://bencho.dev/share-cover-orbit.png",
    alt: "Bencho home page preview showing the orbit of interactive UI blocks",
  },
  pricing: {
    model: "freemium",
    summary: "40 blocks and 24 sounds are free, and the free blocks are MIT licensed; Pro unlocks every block and sound with full source plus the Bencho MCP, at €79 a year or a €99 one-time Forever plan for the first 200 members.",
    license: "MIT (free blocks); Bencho Pro licence (Pro blocks)",
    source: "https://bencho.dev/pricing",
  },
} satisfies LibraryDetails;
