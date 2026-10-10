import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for ElevenLabs UI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "elevenlabs-ui",
  permission: {
    status: "granted",
    source: "https://github.com/elevenlabs/ui/blob/main/LICENSE.md",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    { component: "Orb", scene: "Landing Pages", dependencies: [] },
    {
      component: "Audio Player",
      scene: "Marketing Sites",
      dependencies: ["radix-ui", "lucide-react"],
    },
    { component: "Waveform", scene: "Rapid Prototyping", dependencies: [] },
    { component: "Live Waveform", scene: "Rapid Prototyping", dependencies: [] },
    { component: "Conversation", scene: "Dashboards", dependencies: ["lucide-react"] },
    { component: "Voice Button", scene: "Landing Pages", dependencies: ["lucide-react"] },
  ],
};
