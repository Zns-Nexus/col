import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.nexvyn.dev",
  repoUrl: "https://github.com/Nexvyn/Nexvyn-ui",
  preview: {
    src: "https://ui.nexvyn.dev/opengraph-image?64c9dbc329816c06",
    alt: "Nexvyn/UI home page preview",
  },
  pricing: {
    model: "free",
    summary: "The components are free to use, but the license forbids selling the library itself, and the diagram components are non-commercial (CC BY-NC).",
    license: "MIT + Commons Clause",
    source: "https://github.com/Nexvyn/Nexvyn-ui/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
