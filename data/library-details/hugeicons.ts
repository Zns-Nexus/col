import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://hugeicons.com/docs",
  repoUrl: "https://github.com/hugeicons/hugeicons",
  preview: {
    src: "https://hugeicons.com/og_preview.png",
    alt: "Hugeicons icon library official preview",
  },
  pricing: {
    model: "freemium",
    summary:
      "The free tier is 6,000+ Stroke Rounded icons under MIT with no account, seat, or license key; Pro unlocks 60,000+ icons in 10 styles from $99 per seat per year, with a $1,197 one-time Pro Plus option, under a proprietary license.",
    license: "MIT for the free icons; proprietary license agreement for Pro icons",
    source: "https://hugeicons.com/pricing",
  },
} satisfies LibraryDetails;
