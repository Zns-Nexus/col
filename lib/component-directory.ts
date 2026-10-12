import type { Library } from "../data/libraries.ts";
import type { ComponentIndex } from "../data/components.ts";
import { componentHaystack, componentRank, normalizeWords, tokenMatches, wordTokens } from "./directory.ts";

/** Search individual documented components using the directory's matching and ranking rules. */
export function createComponentSearch(libraries: readonly Library[], components: ComponentIndex) {
  const index = libraries.flatMap((library) =>
    (components[library.slug] ?? []).map((component) => ({ library, component, haystack: componentHaystack(component) })),
  );
  return (query: string) => {
    const tokens = wordTokens(query);
    const normalized = normalizeWords(query);
    return index
      .filter(({ haystack }) => tokens.every((token) => tokenMatches(haystack, token)))
      .sort((a, b) => componentRank(a.component, tokens, normalized) - componentRank(b.component, tokens, normalized));
  };
}
