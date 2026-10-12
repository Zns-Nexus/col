import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.elevenlabs.io/docs",
  repoUrl: "https://github.com/elevenlabs/ui",
  preview: {
    src: "https://github.com/user-attachments/assets/a5b73bfc-b0a3-4b4e-8915-f90a086c5723",
    alt: "ElevenLabs UI official preview",
  },
  pricing: {
    model: "free",
    summary: "The UI components are free under MIT; ElevenLabs API and agent services have separate usage pricing.",
    license: "MIT",
    source: "https://github.com/elevenlabs/ui/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
