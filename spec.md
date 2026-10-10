# Spec: Component previews in the user's use case

Synthesized from the discussion in the "Show components in user use cases" thread using the `to-spec` workflow. Tracker issue: screen/col#64 on GitCafe.

## Problem Statement

A developer whose coding agent picks UI components through Col's MCP gets names, documentation links, and honest evidence markers — but never a look at the component itself. The agent can say which library documents a Date Picker and link its docs, yet the developer cannot answer the question that actually decides the choice: what will this look like in my product, with my stack, my theme, and my use case? They end up opening a row of documentation tabs anyway, and any visual judgment happens outside Col, against the library's default styling rather than their own.

## Solution

Col renders each verified component in a preview harness and shows it in the developer's own context: their framework and styling system, their theme tokens, and a scene matching their use case with plausible sample data. One shared Col preview page is the single render surface; the MCP delivers it through three progressive channels — a live interactive MCP Apps widget where the host supports one, a screenshot where the host renders images, and a Col preview URL everywhere, terminals included — and the same previews appear on Col's own library and component pages. Previews ride the catalogue's existing verification and recorded reuse-permission rules and state their rendered source and applied theme, so a render is never mistaken for compatibility evidence.

## User Stories

1. As a developer with a coding agent, I want to see how a candidate component actually looks rendered, so that I can judge its fit before anything changes in my project.
2. As a developer, I want the preview rendered in my project's framework and styling system, so that what I see is what my app can actually ship.
3. As a developer, I want the preview styled with my theme tokens — colors, radii, typography — so that I judge the component in my product's look rather than the library's default.
4. As a developer, I want the preview composed into a scene matching my use case (dashboard, settings, checkout) with plausible sample data, so that I can picture the component in my product instead of as an isolated specimen.
5. As a developer, I want the preview reachable from my agent conversation even in a plain terminal, so that my choice of client never blocks the feature.
6. As a developer browsing Col without an agent, I want component previews on the library and component pages, so that discovery is visual there too.
7. As a developer, I want a preview to open a stable Col URL I can share with a teammate, so that a component discussion can reference the exact look I mean.
8. As a developer, I want the preview to render quickly and without a full page reload, so that comparing candidates stays fluid.
9. As a coding agent, I want previews delivered progressively — widget where supported, image where rendered, URL everywhere — so that one tool call serves every client I run on.
10. As a coding agent, I want the preview payload inside the component lookup rather than a new tool, so that the tool surface stays small and the find → inspect → see flow stays one call.
11. As a coding agent, I want the use-case context — stack, styling system, theme tokens, scene, sample data — accepted as explicit arguments, so that previews adapt to the project I inspected instead of a generic default.
12. As a coding agent, I want every preview to state its rendered source and applied theme, so that I never present a library-default screenshot as the user's own look.
13. As a coding agent, I want previews to never count as compatibility evidence, so that a good-looking render never launders an unverified claim past Col's honesty rules.
14. As a developer, I want previews withheld for libraries without recorded reuse permission, so that Col's visual layer is lawful by construction like its documentation corpus.
15. As a developer, I want my real data kept out of previews — synthetic sample data that resembles my domain is enough — so that nothing sensitive rides tool arguments.
16. As a developer on an MCP Apps host, I want the live themed preview rendered inline in the conversation, so that I compare candidates without leaving the chat.
17. As a developer whose host renders images but no widgets, I want a screenshot in the tool result, so that I still see the component where I am working.
18. As a developer in a terminal client, I want the preview URL and its evidence markers in the text result, so that the workflow completes through the browser.
19. As a developer with a non-React project, I want components Col cannot render marked preview-unavailable with their documentation link, so that an honest gap beats a misleading render.
20. As an MCP host integrator, I want the interactive channel delivered through the standard MCP Apps extension with a text fallback, so that a host without the extension loses only the interactivity.
21. As a developer, I want previews to run in sandboxed frames that reach nothing but Col's own origin, so that a preview cannot phone home.
22. As a Col maintainer, I want preview media gated on the same recorded reuse permission as documentation snapshots, so that ingest stays lawful by construction.
23. As a Col maintainer, I want previews rendered at build time in CI, so that the deployed site and endpoint carry no runtime browser dependency.
24. As a Col maintainer, I want one preview page behind all three channels, so that the widget and the screenshots can never drift from what the site shows.
25. As a Col maintainer, I want each preview to carry the shared envelope — verification marker and explicit gaps — so that the honesty rules hold for visuals exactly as they hold for text.
26. As a Col contributor, I want a small, validated story format for adding a preview to a component, so that contributions stay focused and verifiable.
27. As a Col contributor, I want story validation at contribution time — the story names the documented component it renders and declares its dependencies — so that the preview index stays trustworthy as it grows.
28. As a Col maintainer, I want preview coverage to start with the deep-coverage libraries whose permissions are recorded, so that growth follows demonstrated value.

## Implementation Decisions

- A preview story is new catalogue data beside the verified component index: for one component of one library, the renderable code, its declared dependencies, and a scene and sample-data flavour drawn from the catalogue's use-case vocabulary. Stories exist only for libraries whose recorded reuse permission is granted; validation at contribution time enforces that the story names the documented component it renders.
- One shared Col preview page is the single render surface. It mounts a pre-built story bundle and injects the caller's design tokens as CSS variables — the Tailwind v4 / shadcn token conventions the ecosystem already standardises on — then wraps the component in a use-case scene with synthetic sample data. Scene templates come from the catalogue's existing use cases.
- Story bundles are compiled at build time (one small library build per story), and screenshots are rendered in CI against a story-gallery page using the Playwright component-testing pattern. No runtime headless browser is deployed: serverless Chromium is a workaround, not a foundation, and build-time rendering keeps the endpoint and site free of a browser dependency.
- The MCP tool surface stays four tools. The component lookup gains the preview payload — preview URL, preview evidence markers (rendered source, applied theme, explicit gaps) — and its tool result widens from text-only to text plus image content blocks, carrying the build-rendered screenshot. The shared envelope is extended, never bypassed.
- The interactive channel is one generic preview template resource in the standard MCP Apps shape (`text/html;profile=mcp-app` under the `ui://` scheme), declared through the tool's UI metadata. The template iframes the shared preview page — the extension's frame-domain policy permits exactly this — so the widget is a thin shell over the same renderer. Use-case context travels as tool arguments and structured content to the widget over the standard bridge; tool results always carry the text and image fallbacks alongside the UI, per the extension's progressive-enhancement contract. Preview rendering through the widget is read-only and reaches only Col's own origin.
- The agent-facing skill gains one step: extract the project's theme tokens and use-case scene during inspection, pass them as preview arguments, and pass synthetic sample data only — never real user data.
- Stack coverage is React-first, matching the catalogue's majority. A story runtime for other stacks is added later; until then those components answer preview-unavailable with their documentation link, which the envelope marks as a gap rather than hiding.

## Testing Decisions

A good test asserts external behavior only: what the component lookup returns for a given request, what the story validator refuses, what the build ships. Internal rendering internals are not tested.

The primary seam is unchanged — the MCP tool layer's single request-to-result entry point — and the preview payload tests join its existing suite: a lookup for a story-bearing component must return the preview URL, the preview evidence markers, and an image block; a lookup for a component of a library without recorded permission must return no preview and an explicit gap. The one new seam is the story validator, tested the way the component index is already validated at contribution time. A build-artifact test asserts the external promise of the pipeline: every shipped story has a rendered screenshot and a live preview page, and stories that fail to render fail the build rather than shipping blank. The screenshot pipeline itself is covered by a smoke check that mounts every story in the gallery; pixel comparison is out of scope.

Prior art in the repository: the tool-layer test suite asserting result envelopes and honesty markers, the data-validation tests over the component index and the documentation corpus, and the build-artifact tests over generated discovery output.

## Out of Scope

- On-demand, per-request themed screenshot rendering; it needs a runtime headless browser and its measured demand can come later.
- Story runtimes for Svelte, Vue, and other stacks beyond honest preview-unavailable marking.
- Editing or playground interactivity in the preview; v1 renders, it does not edit.
- Any change to search, ranking, or the number of MCP tools.
- Write or contribution operations through MCP, and any credential flow.
- Pixel-perfect or visual-regression guarantees for previews.
- AI-generated stories, or inferring components absent from the verified component index.

## Further Notes

- Build order: story format and validator → shared preview page with theming and scenes → build-time screenshots and site gallery → MCP preview payload → MCP Apps widget. The widget is deliberately last: it is a thin iframe shell that only becomes cheap once the shared page exists, and every earlier step ships user value on its own.
- Preview media reuse permission is the same open decision the MCP spec recorded for documentation, code, and preview media. The gate is a recorded `granted` per library; everything else links to official documentation instead of rendering.
- Interactive-widget support among MCP hosts is uneven as of October 2026 — ChatGPT, Claude desktop/claude.ai, Cursor, and Codex Desktop render it, while Claude Code takes text only — which is precisely why the URL channel is the floor of the design rather than a fallback afterthought.
- The three channels are one implementation: the screenshot is a picture of the shared page, the widget is that page in a frame, and the URL is the page. A channel can be dropped without stranding the others.
- Phasing: the first implementation ships theme tokens (the semantic colour set Col's theme defines) as the use-case context argument, with one recorded scene per story. Scene selection per request, sample-data and stack/styling arguments, radius and typography tokens, and CI-automated screenshot rendering are follow-ups tracked on the issue; the render step is `npm run previews`, and the build-artifact tests refuse to ship a story without its rendered screenshot.
