import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.evilbuttons.com/docs",
  repoUrl: "https://github.com/radiumcoders/evil-buttons",
  preview: {
    src: "https://evilbuttons.com/og-image.png",
    alt: "Evil Buttons official preview",
  },
  pricing: {
    model: "free",
    summary: "All components are free and open source under Apache 2.0, with no paid tier; the site only lists sponsors.",
    license: "Apache-2.0",
    source: "https://github.com/radiumcoders/evil-buttons/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
