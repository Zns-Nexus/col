# Spec: Close the nine verified quality gaps in Col MCP

Synthesized from issue #61 (itself built from the independently re-verified external review of the Col MCP server).

## Problem Statement

A coding agent using Col's MCP server can find a UI library and its documented components faster than with web search, and stays honest while doing it — but the answers are too thin and too noisy to finish the job. The component index is missing entries for libraries Col already lists, so shortlists come back short. Install instructions are library-wide, so an agent told to install Command is handed `add button`. Compatibility answers repeat one placeholder list for every library, including subjects the library does not even use, while contradicting the library's own getting-started text elsewhere in the same response. Search floods results with letter-level substring noise and misses glued spellings, and hits never say why they matched. Documentation snapshots are empty, so the agent leaves Col anyway, and nothing in the data says when anything was last checked.

## Solution

Make every answer self-sufficient and self-explaining, using the data Col already hosts plus verified upstream facts. A component record answers what the thing is (a full palette or a building block), what to call it (shared aliases across libraries), how to install it exactly (per-component command and its dependencies), and when Col last checked it. Search returns the right things in the right order and states what matched. Compatibility names only the subjects that apply, carries real ranges where the library or its dependencies state them, and is forced to agree with the library's own documentation. Empty results explain whether the library is unknown to Col or merely unverified at the component level. Nothing is guessed: unverified stays `unknown`, and gaps stay visible.

## User Stories

1. As a coding agent, I want the React and Tailwind libraries Col already lists to return their documented components, so that a shortlist is limited by relevance rather than by missing data.
2. As a coding agent, I want standalone command packages (cmdk, kbar) findable as their own entries, so that "command palette" does not force me to leave Col for npm.
3. As a coding agent, I want `get_component` to return the exact install command for that component, so that I never install the wrong component from a library-wide template.
4. As a coding agent, I want each component's npm and registry dependencies listed, so that I can plan the install before touching the project.
5. As a coding agent, I want registry-style libraries (shadcn-style) to generate the component command from their own documented pattern, so that the command matches the library's current CLI.
6. As a coding agent, I want compatibility answers to name only subjects that apply to that library, so that I never read "Emotion: unknown" for a Tailwind library.
7. As a coding agent, I want real version ranges where the library or its dependencies state them (for example React 18–19 via cmdk's peer dependencies), so that I can judge fit instead of reading "unknown" everywhere.
8. As a coding agent, I want compatibility to never contradict the same response's getting-started text, so that I can trust either one.
9. As a Col maintainer, I want the build to fail when recorded compatibility disagrees with the library's own documentation, so that contradictions cannot ship.
10. As a coding agent, I want every component to say what kind of thing it is (full pattern, primitive, visual effect, layout), so that a "Spotlight" animation is never mistaken for a Spotlight search.
11. As a coding agent, I want a one-line summary per component, so that I can shortlist without fetching each documentation page.
12. As a coding agent, I want to know what a component is built on (cmdk, Radix, Base UI), so that I can prefer components matching the project's existing primitives.
13. As a coding agent, I want the same concept found under the names people actually use (modal, dialog, popup), so that one library's naming choice does not hide another's component.
14. As a coding agent, I want `search_components` to filter by stack and show each hit's stacks, so that React queries never return Svelte libraries.
15. As a coding agent, I want search to match words and prefixes rather than raw substrings, so that "cmd k" returns command palettes instead of every name containing the letter k.
16. As a coding agent, I want glued and symbol spellings (`commandpalette`, `cmd+k`, ⌘K) to resolve like the spaced form, so that typing conventions do not decide results.
17. As a coding agent, I want trivial single-letter tokens to be ignored, so that one stray letter never floods my context window.
18. As a coding agent, I want real search UIs ranked above visual effects that share a word, so that "spotlight" leads with search components.
19. As a coding agent, I want each hit to state what matched (name, alias, tag, description), so that I can explain a recommendation without guessing.
20. As a coding agent, I want description-only matches ranked below component matches, so that marketing copy never outrides the component index.
21. As a coding agent, I want an empty result to say whether the library is not in the index or indexed without a recorded component, so that "missing" tells me which follow-up to run.
22. As a coding agent, I want suggestions when a query misses, so that a near-miss name or alias still lands somewhere useful.
23. As a coding agent, I want `get_library` to list the library's recorded components, so that I can browse instead of guessing queries.
24. As a coding agent, I want shared caveat text once per response instead of on every hit, so that my context budget goes to results.
25. As a coding agent, I want each record to carry when Col last verified it, so that I can weigh staleness and cite it.
26. As a coding agent, I want source URLs that record where they redirect and which variants exist (Radix, Base), so that two agents do not silently pick different variants of the same component.
27. As a coding agent, I want verification stated per field (page, install, compatibility, snapshot), so that "verified" never means different things in different tools.
28. As a Col maintainer, I want one re-runnable source checker that re-verifies stored URLs and records redirects, so that freshness is maintained mechanically.
29. As a Col maintainer, I want recorded compatibility facts to cite an official source as before, so that new ranges are evidence-backed, not copied from memory.
30. As a developer using a coding agent, I want the agent to finish a find → inspect → install plan entirely from Col answers, so that speed and honesty arrive together.

## Implementation Decisions

- The component record grows: `kind` (`full-pattern` | `primitive` | `visual-effect` | `layout`), one-line `summary`, `builtOn` (the primitive it wraps), optional shared concept link, optional per-component install override, `dependencies` and `registryDependencies`, `verifiedAt`, and an optional `variants` map of source-URL alternatives (for example Radix and Base documentation pages). Existing fields and ids are unchanged.
- Component records carry `verifiedAt`, and registry-style libraries carry a component-install template (the documented pattern with the component's slug substituted) plus the ability for components to override it. Only templates the library documents are recorded.
- The shared-concept decision from the review is kept minimal: components may link to a named concept (dialog, command-palette, …) and inherit that concept's cross-library aliases. Concepts are data, not a taxonomy service.
- Matching normalises case and separators and indexes a de-spaced variant of names and aliases, so glued spellings and `cmd+k`-style symbols resolve; symbol aliases like ⌘K live as data on the components that document them. Tokens shorter than two characters are ignored as noise.
- Multi-token queries keep the current attribution rule: library metadata may supply context tokens, but the remaining tokens must match one component (already shipped). Within components, matching is word- and prefix-based, not raw substring.
- Ranking key, best first: exact-match group (name or alias) → functional kind over visual effect → name over alias → phrase/prefix over single-token → existing stable order. `matchedOn` is emitted on every hit: component hits name the field and text that matched (name/alias — concept aliases surface as aliases), library hits name component/alias/tag/description.
- Result envelopes gain a top-level `evidence.gaps` shared once per response; per-hit gaps survive only where they differ from the shared list. Empty results gain `indexStatus` (`"library not in index"` / `"library indexed, component not recorded"` / `"no recorded component matches"` / `"no recorded library matches"`) and, on component search, `suggestions` from nearest neighbours.
- `get_library` gains a `components` list (id, name, kind) and a `componentCount`; nothing else on that envelope changes.
- Verification becomes per field: `{ page, install, compatibility, snapshot }` states replacing the single `verification` word in `evidence`. Both tools render the same object, ending the cross-tool contradiction.
- Compatibility tracking becomes per-library vocabulary: the tracked subjects are derived from the frameworks a library targets plus its own recorded facts; the unknown list is computed against that vocabulary instead of the global union of every recorded subject. Ranges are recorded where an official source states them (a library's own docs, or the peer dependencies of the package the component installs). The data validator gains one rule: a recorded fact that contradicts the library's own getting-started text, or a version claim in that text with no matching fact, fails validation.
- A re-runnable source checker script walks stored source URLs, follows redirects, and reports drift — dead links and redirects whose target differs from what Col recorded — so a maintainer can update the record. It never rewrites data itself; tests never hit the network.
- Documentation-snapshot ingestion is deferred: the corpus mechanism exists and is permission-gated by design, and no reuse permissions are recorded yet (an open decision from the original MCP issue). No snapshot data ships in this work.

## Testing Decisions

A good test asserts external behavior only: what a tool call returns for a given input, what the search function ranks first, what the validator refuses. Internal structure is not tested, and nothing is mocked — the tests run against the real catalogue data, the same style as the existing labelled tests in `lib/`.

Seams under test (all existing, highest first):

1. The MCP tool layer — one pure request-to-result entry point over real catalogue data. Envelope contracts (install commands, dependencies, `matchedOn`, `indexStatus`, component lists, per-field verification, gap placement) are asserted here. Prior art: the labelled tool tests and the eval fixture suite.
2. The directory search module — matching, normalisation and ranking behavior, including the spotlight-vs-effects ordering and noise-token rules. Prior art: the existing ranking and matching tests.
3. The data validators — compatibility vocabulary, the new getting-started contradiction rule, and record completeness (kind, verifiedAt) as labelled refusal tests. Prior art: the corpus and compatibility validator tests.

The eval fixture suite is the quality gate: its query → expected-hit cases must stay green. Where a fixture asserts an envelope shape this spec deliberately changes, the fixture is updated to the new contract in the same commit — never weakened to mask a regression.

## Out of Scope

- Embeddings, reranking, or any learned retrieval.
- Ingesting documentation snapshots before reuse permissions are recorded.
- Adding libraries to the catalogue beyond the component-fill slice (cmdk, kbar as standalone entries; components for the listed empty shells).
- A hosted or scheduled link checker (the shipped checker is a maintainer-run script).
- Website, gallery, or visual changes; the integrations directory and its connector paths.
- Any credential, authentication, or write path through MCP.
- Plugin packaging and store submission work.

## Further Notes

- The nine work items map one-to-one onto issue #61's checklist; that issue remains the tracker of record, and this spec records the decisions behind the implementation.
- The external review that seeded the issue was itself re-verified claim-by-claim before this spec was written (19 of 21 claims reproduced; two needed corrections, folded into the stories above).
- Item 7 of the issue (per-component documentation snapshots) is the one checklist line this spec cannot honestly close: it waits on the reuse-permission decision recorded as open in the original MCP issue.
