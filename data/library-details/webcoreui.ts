import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://webcoreui.dev/docs/setup",
  repoUrl: "https://github.com/Frontendland/webcoreui",
  preview: {
    src: "https://raw.githubusercontent.com/Frontendland/webcoreui/main/public/img/banner.png",
    alt: "WebcoreUI official preview",
  },
  pricing: {
    model: "freemium",
    summary: "The core library is free under MIT; WebcoreUI Pro adds paid blocks, templates, and support.",
    license: "MIT",
    source: "https://webcoreui.dev/pro",
  },
} satisfies LibraryDetails;
