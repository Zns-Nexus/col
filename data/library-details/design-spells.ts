import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://designspells.com",
  preview: {
    src: "https://designspells.com/og.png",
    alt: "Design Spells home page preview",
  },
  pricing: {
    model: "free",
    summary: "Browsing the collection is free, with no paid tier.",
    source: "https://designspells.com",
  },
  collection: "It showcases design details from many other apps and sites; the work shown belongs to those products, so it is inspiration, not code you can reuse.",
} satisfies LibraryDetails;
