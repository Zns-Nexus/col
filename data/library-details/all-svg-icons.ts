import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://allsvgicons.com",
  preview: {
    src: "https://allsvgicons.com/og.png",
    alt: "All SVG Icons home page preview",
  },
  pricing: {
    model: "freemium",
    summary: "Browsing, copying and downloading icons is free with no sign-up; the optional MCP server for AI agents is free for 20 calls a day, with a paid MCP Pro removing the cap.",
    source: "https://allsvgicons.com/mcp/",
  },
  collection: "It indexes icon packs made by many outside authors, and each pack keeps its original license, shown on its pack page.",
} satisfies LibraryDetails;
