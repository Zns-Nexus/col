## Resposnses & prose 

- A question is a request for an answer, not for changes. If the message
opens with "how hard would it be", "what are your thoughts", "why does", "should we", "is it possible", "can X do Y", or otherwise asks rather than instructs, answer it do not edit the files.

## Doing the work

- Infer the outcome I want from the request, conversation,
and project context. Include the ordinary steps needed to
make that outcome usable, even when I have not listed
each step. Keep this within the requested scope.

- Resolve routine uncertainty by inspecting the relevant
context and making reasonable, reversible choices. Ask
only when a missing answer would materially change the
result and cannot be inferred. Continue independent
work while waiting.

- Carry the work through the necessary implementation,
integration, and relevant verification. An intermediate
artifact, a passing build, or a list of findings is complete
only when it satisfies the requested outcome. Keep
explanations concise without shortening the work.

- In performance work, measure the actual bottleneck
before changing it. Compare the same workload before
and after, report the numbers and tradeoffs, and keep
behavior intact.

- Type-safety is useful take advantage of it.

- Do not delete something that the I did not explicitly request.

- Tests are good. But endless smoke tests, "regression tests" for feature
deletions, etc, are not good. Tests should be focused, not slop.

- Comments are a great way to clarify functionality and how code is
used. Don't comment every line, but feel free to describe (concisely)
how functions are used above function definitions, classes, etc.

- Keep comments up to date! When making changes, it's important to
keep things in sync

- Never do Live browser testing, or use your browser to check things that i never asked you to do.

## Typescript Preferences

- `any` is the enemy. Inferred types are our friend. Our systems should
adapt to changes, instead of requiring changes everywhere.

- If your TS code looks like a Python dev wrote it, it is bad TS code.

- Use Mattpocock skills & workflows when writing TS, use the `$ask-matt` skill.

## Work with other agents

- Dont use multiple agent for work that one agent can complete in one pass.

- Do not create subagents or an agent panel for routine work.

- Use other agents when the task needs wider coverage or an independent
review that challenges the work.

- When several agents do work in parallel, state file ownership up front so they do not collide.

## Visual designs

- For dark mode, use a true black (`#000`) background or a similar dark color.

- Use white for the primary text in dark mode.

- Secondary text in dark mode must meet WCAG AA contrast against its background: at least 4.5:1 for normal text and 3:1 for large text.

- Do not add decorative card frames or pill shapes.

- Keep the text to a minimum.

- Dont use eye brow text or ambigious terms like (people, connect, better) anywhere that it should not be.

- Do not over use CSS animations that cause continuous repainting, such as pulse, shimmer, blur, or spinner effects.
  - These animations cause high GPU use on displays with high refresh rates.

- Never use highlighting on text boxes, or click able elements like buttons, drop down menus, etc.



<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Tests

`npm test` builds first, because page tests read `.next/`. `node --test` loads `lib/*.ts` through Node's type stripping, so a runtime import inside `lib/` or `data/` needs the `.ts` extension (`import { x } from "../data/integrations.ts"`); type-only imports can omit it.

## Windows shell

In PowerShell, discard output with `> $null`, `2> $null`, or `Out-Null`. Never redirect to `NUL` or `nul`; PowerShell can create a file with that Windows-reserved name, which breaks Git staging.
