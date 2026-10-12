import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://magicui.design/docs",
  repoUrl: "https://github.com/magicuidesign/magicui",
  preview: {
    src: "https://magicui.design/og",
    alt: "Magic UI website preview",
  },
  pricing: {
    model: "freemium",
    summary: "The components are free; Magic UI Pro sections and templates are a paid one-time purchase.",
    license: "MIT",
    source: "https://pro.magicui.design",
  },
} satisfies LibraryDetails;
