import type { Category, Library, Stack, UseCase } from "../data/libraries";
import { isFrameworkStack } from "../data/libraries.ts";
import type { ComponentIndex, LibraryComponent } from "../data/components";

/**
 * Directory search over a fixed library registry.
 *
 * The registry is a static module, so every searchable field is flattened once
 * when the searcher is created rather than on each keystroke.
 */

export type DirectorySort = "curated" | "name";

export interface DirectoryQuery {
  query: string;
  category: Category | null;
  stacks: readonly Stack[];
  useCases: readonly UseCase[];
  sort: DirectorySort;
}

export interface DirectoryFacetQuery {
  query: string;
  category: Category | null;
  stacks: readonly Stack[];
  useCases: readonly UseCase[];
}

export type DirectoryFacetCounts = {
  category: ReadonlyMap<Category, number>;
  stack: ReadonlyMap<Stack, number>;
  useCase: ReadonlyMap<UseCase, number>;
  total: {
    category: number;
    stack: number;
    useCase: number;
  };
};

export interface SearchResult {
  library: Library;
  /**
   * Components whose name or an alias matched. Empty when only the library's
   * own fields matched, so a non-empty list is always the reason to show it.
   */
  components: LibraryComponent[];
  /** What matched, as "<field>:<text>" — never a bare boolean. */
  matchedOn: string[];
}

interface IndexedComponent {
  component: LibraryComponent;
  haystack: string;
}

interface IndexedLibrary {
  library: Library;
  haystack: string;
  components: IndexedComponent[];
}

/**
 * Matching vocabulary: lowercase, fold separators into spaces, collapse runs.
 * "command-Palette" and "cmd+k" then speak the same language as "command
 * palette", while symbols like ⌘ survive untouched.
 */
export function normalizeWords(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_+]+/g, " ")
    .replace(/[^a-z0-9.+#⌘ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Query tokens that can discriminate: folded, and long enough to mean something. */
export function wordTokens(query: string): string[] {
  return normalizeWords(query).split(" ").filter((token) => token.length > 1);
}

/**
 * A token matches at a word start, never mid-word: "cmd" touches "cmdk", while
 * a stray letter matches nothing at all.
 */
export function tokenMatches(haystack: string, token: string): boolean {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z0-9])" + escaped).test(haystack);
}

/** Folded terms plus their de-spaced forms, so glued spellings still match. */
function buildHaystack(terms: readonly string[]): string {
  const folded = terms.map(normalizeWords).filter(Boolean);
  const despaced = folded
    .filter((term) => term.length <= 40 && term.includes(" "))
    .map((term) => term.replace(/ /g, ""));
  return [...folded, ...despaced].join(" ");
}

export function componentHaystack(component: LibraryComponent): string {
  return buildHaystack([component.name, ...(component.aliases ?? [])]);
}

/**
 * Flattens every searchable field once. The registry only changes on deploy, so
 * paying this on each keystroke instead would be pure waste.
 */
function buildIndex(registry: readonly Library[], components: ComponentIndex): IndexedLibrary[] {
  return registry.map((library) => ({
    library,
    haystack: buildHaystack([
      library.name,
      library.description,
      library.category,
      ...library.stacks,
      ...library.useCases,
      ...(library.tags ?? []),
    ]),
    components: (components[library.slug] ?? []).map((component) => ({
      component,
      haystack: componentHaystack(component),
    })),
  }));
}

/**
 * Relevance tiers, best first. An exact component name or alias beats a loose
 * component match, which beats a match on the library's own metadata.
 */
function relevanceTier(result: SearchResult, normalizedQuery: string): number {
  if (normalizedQuery === "") return 2;
  const exact = result.components.some(
    ({ name, aliases }) =>
      name.toLowerCase() === normalizedQuery ||
      (aliases ?? []).some((alias) => alias.toLowerCase() === normalizedQuery),
  );
  if (exact) return 0;
  return result.components.length > 0 ? 1 : 2;
}

/**
 * Ranks one matched component against the query, best first.
 *
 * Exact names lead before prefixes, aliases and loose matches. Exported because
 * the MCP tool layer orders component search results by the same rule.
 */
export function componentRank(
  component: LibraryComponent,
  tokens: readonly string[],
  normalizedQuery: string,
): number {
  const name = component.name.toLowerCase();
  const aliases = (component.aliases ?? []).map((alias) => alias.toLowerCase());
  const nameExact = normalizedQuery !== "" && name === normalizedQuery;
  const aliasExact = aliases.includes(normalizedQuery);
  const namePhrase = tokens.length > 0 && tokens.every((token) => name.includes(token)) || normalizedQuery !== "" && name.startsWith(normalizedQuery);
  const aliasPhrase = aliases.some((alias) => tokens.length > 0 && tokens.every((token) => alias.includes(token)) || normalizedQuery !== "" && alias.startsWith(normalizedQuery));
  const nameHit = nameExact || namePhrase;
  const aliasHit = aliasExact || aliasPhrase;
  const loose = nameHit || aliasHit || tokens.some((token) => name.includes(token) || aliases.some((alias) => alias.includes(token)));
  if (!loose) return 8;
  // Spec order: exact group -> functional over visual effect -> name over
  // alias -> phrase over single token.
  return (
    (nameExact || aliasExact ? 0 : 1) * 8 +
    (component.kind === "visual-effect" ? 4 : 0) +
    (aliasHit && !nameHit ? 2 : 0) +
    (nameHit || aliasHit ? 0 : 1)
  );
}

/**
 * Builds a searcher over a fixed registry and component index. Call once and
 * reuse, so the term flattening above is paid for a single time.
 */
export function createDirectorySearch(
  registry: readonly Library[],
  components: ComponentIndex = {},
) {
  const index = buildIndex(registry, components);
  const categoryOptions = [...new Set(registry.map(({ category }) => category))];
  const stackOptions = [...new Set(registry.flatMap(({ stacks }) => stacks))];
  const useCaseOptions = [...new Set(registry.flatMap(({ useCases }) => useCases))];

  function searchDirectory({
    query,
    category,
    stacks,
    useCases,
    sort,
  }: DirectoryQuery): SearchResult[] {
    const normalizedQuery = normalizeWords(query);
    const tokens = wordTokens(query);

    const results = index
      .filter(({ library }) => {
        return (
          (category === null || library.category === category) &&
          stacks.every((stack) => library.stacks.includes(stack)) &&
          (useCases.length === 0 || useCases.some((useCase) => library.useCases.includes(useCase)))
        );
      })
      .flatMap((entry) => {
        const componentTokens = tokens.filter((token) => !tokenMatches(entry.haystack, token));
        // With no tokens every component would vacuously match, so browsing the
        // directory must not present a seeded library's components as hits.
        // Library metadata can supply context such as "radix" in "radix accordion",
        // but the remaining tokens must match the same component.
        const components =
          tokens.length === 0
            ? []
            : entry.components
                .filter(({ haystack }) =>
                  tokens.some((token) => tokenMatches(haystack, token)) &&
                  componentTokens.every((token) => tokenMatches(haystack, token)),
                )
                .map(({ component, haystack }) => {
                  const matchingTokens = tokens.filter((token) => tokenMatches(haystack, token));
                  return {
                    component,
                    rank: componentRank(component, matchingTokens, matchingTokens.join(" ")),
                  };
                })
                // Stable sort, so components of equal strength keep the order
                // the registry lists them in.
                .sort((a, b) => a.rank - b.rank)
                .map(({ component }) => component);
        if (componentTokens.length > 0 && components.length === 0) return [];
        const matchedOn = [
          ...components.map((component) => `component:${component.name}`),
          ...tokens
            .filter((token) => tokenMatches(entry.haystack, token))
            .map((token) => {
              if (tokenMatches(normalizeWords(entry.library.name), token)) return `name:${token}`;
              if ((entry.library.tags ?? []).some((tag) => tokenMatches(normalizeWords(tag), token))) return `tag:${token}`;
              if (entry.library.stacks.some((stack) => tokenMatches(normalizeWords(stack), token))) return `stack:${token}`;
              if (entry.library.useCases.some((useCase) => tokenMatches(normalizeWords(useCase), token))) return `useCase:${token}`;
              return `description:${token}`;
            }),
        ];
        return [{ library: entry.library, components, matchedOn }];
      });

    // Array.prototype.sort is stable, so returning 0 keeps curated order.
    return results.sort((a, b) => {
      const byRelevance =
        relevanceTier(a, normalizedQuery) - relevanceTier(b, normalizedQuery);
      if (byRelevance !== 0) return byRelevance;
      return sort === "name" ? a.library.name.localeCompare(b.library.name) : 0;
    });
  }

  /**
   * Counts each facet against the same matching set as the directory search.
   * Category and use case counts clear their own facet. Stack counts keep
   * compatible selections and replace the current framework when needed.
   * Pass the saved slugs only when the Saved view is active.
   */
  searchDirectory.facetCounts = (
    { query, category, stacks, useCases }: DirectoryFacetQuery,
    saved?: ReadonlySet<string>,
  ): DirectoryFacetCounts => {
    const savedOnly = (results: SearchResult[]) =>
      saved === undefined ? results : results.filter(({ library }) => saved.has(library.slug));
    const matching = (filters: DirectoryFacetQuery) =>
      savedOnly(searchDirectory({ ...filters, sort: "curated" }));

    const categoryMatches = matching({ query, category: null, stacks, useCases });
    const stackMatches = matching({ query, category, stacks: [], useCases });
    const useCaseMatches = matching({ query, category, stacks, useCases: [] });

    return {
      category: new Map<Category, number>(
        categoryOptions.map((option) => [
          option,
          categoryMatches.filter(({ library }) => library.category === option).length,
        ]),
      ),
      stack: new Map<Stack, number>(
        stackOptions.map((option) => [
          option,
          matching({
            query,
            category,
            stacks: stacks.filter((selected) => selected !== option && !(isFrameworkStack(option) && isFrameworkStack(selected))),
            useCases,
          }).filter(({ library }) => library.stacks.includes(option)).length,
        ]),
      ),
      useCase: new Map<UseCase, number>(
        useCaseOptions.map((option) => [
          option,
          useCaseMatches.filter(({ library }) => library.useCases.includes(option)).length,
        ]),
      ),
      total: {
        category: categoryMatches.length,
        stack: stackMatches.length,
        useCase: useCaseMatches.length,
      },
    };
  };

  return searchDirectory;
}

/** Keep one framework, while allowing compatible styling and language choices. */
export function toggleStackSelection(current: readonly Stack[], stack: Stack | null): Stack[] {
  if (stack === null) return [];
  if (current.includes(stack)) return current.filter((value) => value !== stack);
  return isFrameworkStack(stack)
    ? [...current.filter((value) => !isFrameworkStack(value)), stack]
    : [...current, stack];
}
