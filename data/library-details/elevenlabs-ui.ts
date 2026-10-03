import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.elevenlabs.io/docs",
  repoUrl: "https://github.com/elevenlabs/ui",
  preview: {
    src: "https://github.com/user-attachments/assets/a5b73bfc-b0a3-4b4e-8915-f90a086c5723",
    alt: "ElevenLabs UI official preview",
  },
  registrySetup: {
    description: "Use a React project with Tailwind CSS and shadcn/ui initialized. The official Next.js setup requires Node.js 18 or later, subject to the framework's own minimum. Install a component with the ElevenLabs CLI or its direct shadcn registry URL; no named registry configuration is required for the URL command.",
  },
  install: [
    { label: "Initialize shadcn/ui if needed", command: "npx shadcn@latest init" },
    { label: "Add an orb with the ElevenLabs CLI", command: "npx @elevenlabs/cli@latest components add orb" },
    { label: "Add an orb with shadcn", command: "npx shadcn@latest add https://ui.elevenlabs.io/r/orb.json" },
  ],
  gettingStarted: [
    "Start with React, Tailwind CSS, and shadcn/ui configured. The repository documents a Next.js setup with Node.js 18 or later; the app framework may require a newer Node.js version.",
    "Install one component with `npx @elevenlabs/cli@latest components add orb`, or use the direct shadcn URL `https://ui.elevenlabs.io/r/orb.json`. Both approaches copy source and install the component's dependencies.",
    "Import from the generated files and use the matching page at https://ui.elevenlabs.io/docs/components/orb. Audio, waveform, microphone, and agent components have different props and runtime needs.",
    "Render browser-dependent components within the app's client boundary. Microphone features need user permission, and any ElevenLabs API integration needs its own authentication and service setup; the UI source alone does not connect a live agent.",
  ],
  agentPrompt: `Add ElevenLabs UI (https://ui.elevenlabs.io) to this existing React project.

This MIT-licensed source registry provides audio players, waveforms, microphone controls, transcription, and voice agent interfaces on top of shadcn/ui.

Prerequisites:
- React, Tailwind CSS, and shadcn/ui configured. The repository's Next.js guide specifies Node.js 18+, but honor the app framework's minimum too.
- Inspect components.json and the current component directory before installing.

Steps:
1. Read https://ui.elevenlabs.io/docs and the matching component page. Installation commands are also documented in https://github.com/elevenlabs/ui.
2. Initialize shadcn/ui only if missing. Add one requested component with npx @elevenlabs/cli@latest components add orb, or npx shadcn@latest add https://ui.elevenlabs.io/r/orb.json for the orb example. Use the catalog's exact name for other components.
3. Inspect the copied source and dependency changes, then import from its actual generated path. Keep interactive audio and visualization code inside the framework's client boundary.
4. Wire the component to real project state. For audio or microphone features, handle permissions and cleanup. For live agent or transcription services, follow that component's authentication guide and keep private API keys on the server.
5. Preserve existing design tokens and accessibility behavior. Run the project's typecheck and build.

The UI components are free; usage of external ElevenLabs services has separate pricing and credentials. Do not install the entire registry for a single requested component.`,
  pricing: {
    model: "free",
    summary: "The UI components are free under MIT; ElevenLabs API and agent services have separate usage pricing.",
    license: "MIT",
    source: "https://github.com/elevenlabs/ui/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
