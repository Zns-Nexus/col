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
- `get_component` for the component's own documentation link plus the npm
  dependencies and registry components it needs.
- `get_library` for the full picture: description, the official docs and site to
  set it up from, `gettingStarted` links, pricing, and `compatibility` facts.
  Compatibility facts are `supported`, `unsupported`, or `unknown` — never guess
  past `unknown`, and check `evidence.gaps` for what is unverified.

## 3. Render it in the chat

Call `render_component` with one TSX module whose default export shows the
chosen component in the user's own use case: their labels, layout, and theme,
not a generic demo. Import packages by npm name, optionally pinned
(`@mantine/core@9.7.1`); they load from esm.sh with React 19 shared. Import
package CSS directly (`@mantine/core/styles.css`); Tailwind classes work.
Relative and `@/` imports fail, so inline local files such as shadcn's
`components/ui` sources. Never send real user data in tool arguments.

Hosts that support MCP Apps render the module live in the chat. If the module
fails, the error comes back to you as model context: fix it and call again.

Claude Code does not show MCP Apps. There, call `render_component` with the
same code and `format: "html"`, then show the returned `html`:

- If you have an inline HTML widget tool (such as `show_widget`), pass `html`
  to it unchanged.
- Otherwise write `<!doctype html><meta charset="utf-8">` followed by `html`
  to a temporary `.html` file and open it in the user's browser.

Errors in this fallback show only inside the render, so ask the user what they
see. Never claim a render you did not see happen.

## 4. Implement in context

1. Inspect the project first: framework, styling approach, TypeScript, and
   existing component conventions.
2. Set up from the library's own documentation, opened through the source
   links Col returned: the component's page and the library's `gettingStarted`
   links. Col records no install commands, so take the current ones from those
   pages rather than from memory.
3. Adapt the installed code to the project's own conventions and theme.
4. Confirm the project still builds and the component renders, and tell the
   user which sources the implementation was based on.
