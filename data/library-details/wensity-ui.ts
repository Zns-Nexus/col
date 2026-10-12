import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.wensity.com/docs",
  repoUrl: "https://github.com/wensity/registry",
  preview: {
    src: "https://ui.wensity.com/og/wensity-og-image.png",
    alt: "Wensity UI React components, UI blocks, templates, and homepage interface preview",
  },
  pricing: {
    model: "freemium",
    summary: "A free React and Tailwind component catalog is available; Wensity Pro is a yearly or lifetime purchase, and templates are sold separately.",
    source: "https://ui.wensity.com/pricing",
  },
} satisfies LibraryDetails;
