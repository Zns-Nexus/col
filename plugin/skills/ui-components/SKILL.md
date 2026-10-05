---
name: ui-components
description: Find, inspect, and implement UI components from Col's curated catalogue. Use when choosing a UI library for a project or adding a component to one, so recommendations are source-linked and gaps are explicit.
---

# UI components with Col

Col's `col` MCP server searches a curated UI library catalogue and its verified
component index. It is read-only and never requests credentials. Its coverage
is partial: a missing component means "not yet verified", never "this library
does not have it". Every answer links to its canonical source and marks what is
verified, partial, or unverified — pass those links and markers on to the user
instead of smoothing them over.

## 1. Find a fit

Call `search_libraries` with the user's requirement in plain words (it handles
natural phrasing), and narrow with hard filters from the project:
`stacks` for the framework and styling approach (`React`, `Svelte`, `Tailwind
CSS`, …), `category`, `useCases`. Read each hit's `matchedComponents` to see why
it matched, and its `evidence.gaps` before recommending it. Shortlist two or
three candidates and show the user the source links before committing.

## 2. Inspect the exact component

- `search_components` by official name or a real alias (`command palette`,
  `datepicker`), optionally scoped to one library slug.
- `get_component` for the component's own documentation link plus its library's
  install commands and registry setup.
- `get_library` for the full picture: description, install commands,
  `registrySetup` prerequisites, `gettingStarted`, pricing, and `compatibility`
  facts. Compatibility facts are `supported`, `unsupported`, or `unknown` —
  never guess past `unknown`, and check `evidence.gaps` for what is unverified.

## 3. Implement in context

1. Inspect the project first: framework, styling approach, TypeScript, and
   existing component conventions.
2. Follow the library's documented setup in order: `registrySetup`
   prerequisites before `install` commands, then the component's own docs from
   its source link. Verify current commands against those docs rather than
   memory; they may have moved since Col recorded them.
3. Adapt the installed code to the project's own conventions and theme.
4. Confirm the project still builds and the component renders, and tell the
   user which sources the implementation was based on.
