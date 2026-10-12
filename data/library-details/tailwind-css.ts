import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://tailwindcss.com/docs",
  repoUrl: "https://github.com/tailwindlabs/tailwindcss",
  preview: {
    src: "https://tailwindcss.com/api/og?path=/docs/installation/using-vite",
    alt: "Tailwind CSS - Installing with Vite documentation page preview",
  },
  pricing: {
    model: "freemium",
    summary: "The framework is free and open source; Tailwind Plus components, templates and UI kit are a separate paid product.",
    license: "MIT",
    source: "https://tailwindcss.com/plus",
  },
} satisfies LibraryDetails;
