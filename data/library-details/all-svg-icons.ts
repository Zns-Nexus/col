import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://allsvgicons.com",
  gettingStarted: [
    "Open https://allsvgicons.com/search/ and search by name or meaning across every pack. Or open a pack directly at `https://allsvgicons.com/pack/<name>/`, for example https://allsvgicons.com/pack/lucide/, which lists every icon in that pack.",
    "For motion, open https://allsvgicons.com/collections/animated/. It groups three animated packs: SVG Spinners (https://allsvgicons.com/pack/svg-spinners/), Material Line Icons and Meteocons (https://allsvgicons.com/pack/meteocons/).",
    "Open an icon and copy it as SVG or JSX, or download it as PNG or Base64. No account is needed.",
    "Check the license shown on the pack page before shipping. Each pack keeps its original license, from MIT and Apache-2.0 to CC-BY, and some require attribution to the pack author. The terms are at https://allsvgicons.com/terms/.",
    "Clean up what you copied with the in-browser tools: https://allsvgicons.com/svg-optimizer/, https://allsvgicons.com/svg-to-component/ (React, Vue 3, Svelte 5, Solid, Astro or React Native components) and https://allsvgicons.com/svg-sprite-maker/.",
  ],
  preview: {
    src: "https://allsvgicons.com/og.png",
    alt: "All SVG Icons home page preview",
  },
  agentPrompt: `Use All SVG Icons (https://allsvgicons.com) to find and copy an SVG icon into this project.

All SVG Icons is a searchable index of about 380,000 icons from 238 open-source icon packs. It is not a package: nothing is installed, and the packs are other authors' work, each with its own license.

Steps:
1. Ask me which icon, style (outline, solid, duotone, animated) and visual weight I need, and which icon library the project already uses. If it already uses a library such as Lucide, prefer an icon from that same pack so the set stays consistent.
2. Search at https://allsvgicons.com/search/, or browse a pack at https://allsvgicons.com/pack/<name>/. For animated icons use https://allsvgicons.com/collections/animated/.
3. Before using an icon, read the license on its pack page and tell me the license and author. If it needs attribution (for example CC-BY), say where the attribution should go. Attribute the original pack author, not All SVG Icons.
4. Copy the SVG or JSX, then convert it to the project's convention: a typed component with props forwarded, currentColor for color, and an aria-hidden or aria-label depending on whether it is decorative. https://allsvgicons.com/svg-to-component/ generates React, Vue 3, Svelte 5, Solid, Astro and React Native output.
5. If the project already depends on the pack's own npm package (for example lucide-react for Lucide), import from that package instead of pasting the SVG, so updates keep flowing.
6. Run the project's build and check the icon renders at its real size.

Notes:
- The site also offers an optional MCP server for icon search (free plan: 20 tool calls a day after signing in; no daily cap with the paid MCP Pro). Setup is at https://allsvgicons.com/mcp/. Do not assume it is configured.
- Do not scrape or mass-download the site: the terms prohibit systematic downloading and building a competing icon aggregator.`,
  pricing: {
    model: "freemium",
    summary: "Browsing, copying and downloading icons is free with no sign-up; the optional MCP server for AI agents is free for 20 calls a day, with a paid MCP Pro removing the cap.",
    source: "https://allsvgicons.com/mcp/",
  },
  collection: "It indexes icon packs made by many outside authors, and each pack keeps its original license, shown on its pack page.",
} satisfies LibraryDetails;
