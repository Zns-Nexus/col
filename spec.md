# Spec: Col MCP server and agent plugin

Synthesized from the discussion around issue #40 using the `to-spec` workflow.

## Problem Statement

Developers who let a coding agent pick UI components cannot reach Col's curated catalogue from inside their project. The agent can only read the Col website like any other page, so it guesses which library fits the developer's stack, cannot tell verified component coverage from absence, and cannot see which setup commands and links were checked. The result is recommendations built on marketing pages and generic tags, with no way to mark what is unverified.

## Solution

A hosted MCP server over Col's existing catalogue and verified component index, plus a thin agent plugin. A coding agent working in the developer's project calls the server to find a fitting library, inspect the exact component with its documented installation, API, examples, and variants, and then implement using the documented setup. Every answer links to its canonical source and marks what is verified, partial, or unverified; unknowns are stated rather than filled in. The plugin installs with one connection and ships a `ui-components` skill that scripts the find → inspect → implement workflow.

## User Stories

1. As a developer with a coding agent, I want the agent to find a UI component library that fits my framework, styling approach, and use case through Col's catalogue, so that I stop comparing libraries by browsing marketing pages myself.
2. As a coding agent, I want search results that include framework, styling, dependencies, source links, and known gaps for each library, so that I can shortlist candidates without guessing.
3. As a coding agent, I want to search the verified component index by exact component name, so that "command menu" leads me to the components libraries actually document under that name.
4. As a coding agent, I want to search components by the aliases people genuinely use, so that a natural phrase like "command palette" still finds the documented entry.
5. As a coding agent, I want to scope component search to one library, so that I can confirm a chosen library documents the component I need.
6. As a developer, I want my agent to inspect one exact component with its documented installation, API, example, variant, and source revision, so that the implementation follows the library's own docs instead of memory.
7. As a coding agent, I want every result to link to its canonical source page, so that every claim I make can be checked by the developer.
8. As a coding agent, I want results marked verified, partial, or unverified, so that I can say plainly how much evidence stands behind a recommendation.
9. As a developer, I want a missing component entry never presented as proof the library lacks it, so that my agent does not rule out a good library on incomplete data.
10. As a coding agent, I want tool descriptions that state Col's honesty rules about partial coverage, so that I follow them without ever visiting the website.
11. As a developer, I want the agent to follow the documented setup for the library I chose and adapt it to my project, so that the component lands working instead of half-configured.
12. As a developer, I want the plugin to install with a single connection, so that setup costs me one configuration step and no credentials.
13. As a developer, I want a `ui-components` skill in the plugin that scripts the find → inspect → implement workflow, so that my agent follows Col's intended process every time.
14. As a Col maintainer, I want documentation snapshots for deep-coverage libraries that record reuse permission before anything is ingested, so that the corpus is lawful by construction.
15. As a Col contributor, I want the corpus format to require a fetch date and source revision per snapshot, so that evidence can be re-verified and aged out.
16. As a Col maintainer, I want about eight libraries covered in depth with setup, API evidence, and verified commands, so that the first version is genuinely useful rather than shallow.
17. As a Col maintainer, I want version and variant compatibility recorded per library with supported, unsupported, and unknown as distinct states, so that uncertainty is never silently replaced by an assumption.
18. As a coding agent, I want hard filters on framework and styling to be correct, so that a shortlist never contains a library the project cannot use.
19. As a coding agent, I want explicit dependency lists and supported constraints per component family, so that I can plan the install before touching the project.
20. As a Col maintainer, I want labelled tests that assert unknowns stay explicit, so that compatibility gaps are visible instead of laundered into answers.
21. As a Col maintainer, I want an evaluation set of realistic agent queries with expected hits running as tests, so that search quality is measured before anyone reaches for embeddings.
22. As a Col maintainer, I want embeddings or reranking added only when measured query failures justify them, so that the stack stays simple while it earns its complexity.
23. As a coding agent, I want stable exact IDs for libraries and components, so that results are addressable and follow-up lookups are unambiguous.
24. As a developer, I want the MCP server to never request or store credentials, so that connecting Col to my agent carries no secret-handling risk.
25. As an MCP client integrator, I want one remote Streamable HTTP endpoint using the standard TypeScript SDK, so that Cursor, Claude Code, Codex, and VS Code clients work against the same connection.
26. As a Col maintainer, I want the endpoint to serve the same catalogue data the website renders, so that the website and MCP answers can never diverge.
27. As a coding agent, I want results capped and paginated, so that a broad query does not flood my context window.
28. As a Col maintainer, I want host and protocol versions recorded from deployed client tests, so that claimed client support is evidence rather than intent.
29. As a Col maintainer, I want to run a small pilot of real component tasks before expanding ingestion or the gallery, so that growth follows demonstrated value.
30. As a Col contributor, I want component entries validated at contribution time — names spelled as the library documents them and URLs on the library's own domain — so that the index stays trustworthy as it grows.

## Implementation Decisions

- The MCP server runs inside the existing Next.js application as a route handler on the official TypeScript MCP SDK, in stateless Streamable HTTP JSON mode. One deployment serves the website and the endpoint; the tools import the existing catalogue data and search logic directly, so there is no second index to sync.
- The tool surface is four tools and stays small: `search_libraries` (faceted catalogue search over stacks, categories, and use cases, returning library IDs and Col listing links), `search_components` (lookup over the verified component index by exact name, alias, or lexical match, optionally scoped to one library), `get_library` (one library in full: description, stacks, install commands, registry setup, pricing model, documentation and repository links), and `get_component` (one component's canonical documentation URL, verification status, and known gaps).
- Every tool result carries a shared envelope: canonical source URL, a verification marker (`verified`, `partial`, or `unverified`), and an explicit gaps field. Tool descriptions embed Col's coverage-honesty rules, since host agents read tool descriptions rather than site copy.
- The documentation corpus is a validated, file-based corpus: one entry per deep-coverage library holding page snapshots, fetch date, source revision, and an explicit reuse-permission record. Ingestion is blocked without a recorded permission. Validated files first; a Postgres service only once the corpus outgrows them.
- Compatibility data is additive per library: a version/variant matrix where `supported`, `unsupported`, and `unknown` are distinct, never inferred. Libraries without recorded compatibility simply answer `unknown` and do not block launch. Hard filters derive from the catalogue's existing stack and category metadata.
- Search is exact IDs, hard filters, names, aliases, and lexical matching. Embeddings or reranking are admitted only behind measured failures in the evaluation set.
- The evaluation harness is a fixture set of realistic agent queries mapped to expected hits, run in the repository's existing test runner style. It is the gate evidence for search quality and for compatibility unknowns.
- The plugin is a thin package — plugin manifest, MCP connection manifest, and a `ui-components` skill — with one connection to the hosted endpoint. The skill scripts the find → inspect → implement workflow and draws on the per-library agent prompts already recorded in the catalogue data.
- The endpoint is strictly read-only. It never requests, stores, or accepts credentials.

## Testing Decisions

A good test asserts external behavior only: what a tool call returns for a given input, what the endpoint accepts, what the corpus validator refuses. Internal structure is not tested.

The primary seam is the MCP tool layer — one pure request-to-result entry point that the HTTP route adapts to the SDK. Tests invoke that entry point directly with typed arguments and assert on result envelopes, rather than going through HTTP or the SDK's transport. This is the single new seam, proposed at the highest point that all four tools share. Existing seams are preferred where they already cover behavior: the directory search module's existing unit tests cover ranking and matching and keep running unchanged; the build-artifact tests that verify generated discovery output cover the endpoint's published surface where applicable; the per-data-module validation tests cover corpus and compatibility schemas the way the component index is already enforced.

Modules under test: the tool layer (per tool, asserting envelope shape, verification markers, source links, and explicit unknowns), the documentation corpus validator (permission recorded or rejected, revision and fetch date required), the compatibility resolver (distinct supported/unsupported/unknown), and the evaluation harness (each fixture query meets its expected hits). Prior art is the repository's existing `node --test` suites over transpiled data modules.

## Out of Scope

- Listing third-party MCP servers in the catalogue (issue #4).
- The visual gallery; it follows only after the catalogue, documentation, compatibility, and plugin gates pass.
- Embeddings, reranking, or any learned retrieval without measured query failures to justify them.
- Any credential flow: requesting, storing, or transmitting secrets.
- Write or contribution operations through MCP; the server is read-only.
- A database migration; validated files until the corpus grows.
- Deep documentation coverage beyond the initial eight libraries.
- Marketing, outreach, or launch work.

## Further Notes

- The build order in issue #40 maps onto this spec as: tool layer plus endpoint (catalogue gate), corpus with recorded permissions (documentation gate), version/variant matrix (compatibility gate), plugin package (plugin gate), gallery later.
- Two open decisions from issue #40 need maintainer input and do not block the endpoint work: the final choice of eight deep-coverage libraries (a starting proposal exists from the catalogue's deepest entries), and the reuse permission for each library's documentation, code, and preview media.
- Proposed test seams for confirmation: one new seam at the MCP tool layer (the shared request-to-result entry point), reusing the existing directory search, build-artifact, and data-validation seams elsewhere. The fewer seams the better; this is the minimum that still lets every gate be tested at a high level.
