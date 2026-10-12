import * as z from "zod/v4";
import type { Category, Library, Stack, UseCase } from "../data/libraries";
import { CATEGORIES, STACKS, USE_CASES } from "../data/libraries.ts";
import type { ComponentIndex, LibraryComponent } from "../data/components";
import { componentConcepts, type ComponentKind } from "../data/components.ts";
import type { LibraryDetails } from "../data/library-details/types";
import type { DocSnapshot, LibraryCorpusEntry } from "../data/library-corpus/types";
import type { CompatibilityFact, LibraryCompatibility } from "../data/compatibility";
import { componentHaystack, componentRank, createDirectorySearch, normalizeWords, tokenMatches, wordTokens, type SearchResult } from "./directory.ts";
import { PREVIEW_WIDGET_URI } from "./preview-widget.ts";
import { admissibleSnapshots } from "./corpus.ts";
import { compatibilityReport, trackedSubjects, type CompatibilityReport } from "./compatibility.ts";
import { libraryPath, siteUrl } from "./site.ts";
import { libraryOutbound } from "./library-outbound.ts";

/**
 * The MCP tool layer — the one seam the MCP endpoint serves.
 *
 * `createCatalogueTools` returns a pure request-to-result entry point over the
 * catalogue data; `lib/mcp-server.ts` adapts it to the MCP SDK and the HTTP
 * route adapts that to Next.js. Tests call `invoke` directly, so tool behavior
 * is verified without HTTP or transport machinery.
 *
 * The zod schemas below are the single source of truth for tool arguments:
 * `invoke` validates with them and `list()` hands the same schemas to the MCP
 * SDK, which publishes them to clients as JSON Schema. What a client shows can
 * never drift from what the server enforces.
 *
 * Every catalogue result carries the same envelope: canonical source links, a
 * verification marker, and explicit gaps. `render_component` only validates the
 * agent's module and states its gaps; the chat widget does the rendering.
 * Col's honesty rules live in the tool descriptions because host agents read
 * those, not the website.
 */

/** How well Col has verified what a result claims. */
export type Verification = "verified" | "partial" | "unverified";

/**
 * Verification stated per field, so "verified" never means different things in
 * different tools and a gap stays attributable to the field that has it.
 */
export interface FieldVerification {
  page: "verified" | "unverified";
  compatibility: "recorded" | "unknown";
  snapshot: "ingested" | "none";
}

/** The shared envelope every tool result carries. */
export interface Evidence {
  verification: FieldVerification;
  /** What Col has not verified for this result; shared caveats live once on the response envelope. */
  gaps: string[];
}

export interface LibraryHit {
  /** Stable exact ID for follow-up lookups. */
  slug: string;
  name: string;
  description: string;
  url: string;
  /** The library's own page in Col, for stable referencing. */
  colListingUrl: string;
  matchedOn: string[];
  category: Category;
  stacks: Stack[];
  useCases: UseCase[];
  /** Components that explain why this library matched the query. */
  matchedComponents: LibraryComponent[];
  evidence: Evidence;
}

/** The empty-result explanations the tools use; a closed set, never free prose. */
export type EmptyHint =
  | "no recorded library matches"
  | "no recorded component matches"
  | "library indexed, component not recorded"
  | "library not in index";

/** A component pointer: enough to browse or re-fetch, never the whole record. */
export interface ComponentRef {
  id: string;
  name: string;
  kind?: ComponentKind;
}

export interface SearchLibrariesResult {
  /** Present only on an empty result: which kind of empty it is. */
  indexStatus?: EmptyHint;
  results: LibraryHit[];
  /** Total matches before pagination. */
  total: number;
  evidence: Evidence;
}

export interface ComponentHit {
  /** Stable exact ID: `<library-slug>/<component name>`. */
  id: string;
  name: string;
  aliases: string[];
  /** Canonical documentation page for this exact component. */
  url: string;
  kind?: ComponentKind;
  summary?: string;
  builtOn?: string;
  verifiedAt?: string;
  variants?: Record<string, string>;
  matchedOn?: string[];
  library: { slug: string; name: string; url: string; stacks: Stack[] };
  evidence: Evidence;
}

export interface SearchComponentsResult {
  /** Present only on an empty result: which kind of empty it is. */
  indexStatus?: EmptyHint;
  /** Near misses worth trying when the strict query matched nothing. */
  suggestions?: ComponentRef[];
  results: ComponentHit[];
  total: number;
  evidence: Evidence;
}

export interface LibraryDetailsResult {
  slug: string;
  name: string;
  description: string;
  url: string;
  colListingUrl: string;
  category: Category;
  stacks: Stack[];
  useCases: UseCase[];
  docsUrl: string | null;
  repoUrl: string | null;
  /** Every component Col records for this library, browsable without guessing queries. */
  components: ComponentRef[];
  componentCount: number;
  /** Official setup links; Col publishes no install commands of its own. */
  gettingStarted: string[];
  pricing: LibraryDetails["pricing"] | null;
  /** Recorded facts and named unknowns; never a guess. */
  compatibility: CompatibilityReport;
  documentation: {
    /** Verification of the deep-coverage corpus entry, and its snapshots when permission allows. */
    verification: Verification;
    snapshots: DocSnapshot[];
  };
  evidence: Evidence;
}

export type ComponentDetailsResult = Omit<ComponentHit, "library"> & {
  library: { slug: string; name: string; url: string; docsUrl: string | null; stacks: Stack[] };
  /** npm packages this component installs, as its registry records them. */
  dependencies: string[];
  /** Registry components this one pulls in, by registry name. */
  registryDependencies: string[];
  compatibility: CompatibilityReport;
  evidence: Evidence;
};

/** A JSON-RPC tool result: either a payload or a typed error. */
export type ToolResult = {
  content: { type: "text"; text: string }[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};

export interface ToolDefinition {
  name: string;
  title: string;
  description: string;
  /** The zod schema `invoke` validates with; published to clients as JSON Schema. */
  args: z.ZodType<unknown>;
  annotations: { readOnlyHint: true; destructiveHint: false; idempotentHint: true; openWorldHint: false };
  /** Tool-level metadata, e.g. the MCP Apps UI linkage (`ui.resourceUri`). */
  meta?: Record<string, unknown>;
}

/** The tool calls, as one request-to-result interface. */
export interface CatalogueTools {
  invoke(name: string, args: unknown): ToolResult;
  list(): ToolDefinition[];
}

export interface CatalogueData {
  libraries: readonly Library[];
  componentIndex: ComponentIndex;
  details: Record<string, LibraryDetails>;
  corpus: readonly LibraryCorpusEntry[];
  compatibility: readonly LibraryCompatibility[];
}

const MAX_LIMIT = 25;

const COVERAGE_NOTE =
  "Col's component coverage is partial: a missing component means 'not yet verified', never 'this library does not have it'. Never infer a component from a library's generic tags. Results link to their canonical sources and mark what is unverified.";

const NO_CREDENTIALS_NOTE = "This server is read-only and never requests or stores credentials.";

const COVERAGE_GAP = "Component coverage is partial; a missing component is not evidence of absence.";

function compatibilityGap(facts: readonly CompatibilityFact[]): string {
  return facts.length > 0
    ? "Only the recorded compatibility facts above are verified; anything not listed is unknown."
    : "No compatibility constraints have been verified for this library yet; treat every version constraint as unknown.";
}

/**
 * Component ids are the one identifier outside the catalogue's slugs, so they
 * get a single format/parse pair rather than ad-hoc splitting at each use.
 */
function componentId(slug: string, name: string): string {
  return `${slug}/${name}`;
}

function parseComponentId(id: string): { slug: string; name: string } | null {
  const separator = id.indexOf("/");
  if (separator < 1 || separator === id.length - 1) return null;
  return { slug: id.slice(0, separator), name: id.slice(separator + 1) };
}

const PAGE_ARGS = {
  limit: z.number().int().min(1).max(MAX_LIMIT).optional(),
  offset: z.number().int().min(0).optional(),
};

const searchLibrariesArgs = z.object({
  query: z.string().optional().describe("What to find, e.g. 'accessible command menu'. Keywords match library names, descriptions, tags, and verified component names and aliases."),
  category: z.enum(CATEGORIES).nullish().describe("Exact category filter."),
  stacks: z.array(z.enum(STACKS)).optional().describe("Every listed stack must apply (AND). At most one framework."),
  useCases: z.array(z.enum(USE_CASES)).optional().describe("At least one listed use case must apply."),
  ...PAGE_ARGS,
});

const searchComponentsArgs = z.object({
  query: z.string().min(1).describe("Component name or alias, e.g. 'command palette' or 'datepicker'."),
  library: z.string().min(1).optional().describe("Restrict to one library slug."),
  stacks: z.array(z.enum(STACKS)).optional().describe("Every listed stack must apply (AND). At most one framework."),
  ...PAGE_ARGS,
});

const getLibraryArgs = z.object({
  slug: z.string().min(1).describe("Library slug from search_libraries, e.g. 'shadcn-ui'."),
});

const getComponentArgs = z.object({
  id: z.string().min(1).describe("Component id from search_components, e.g. 'shadcn-ui/Command'."),
});

/** Large enough for a component plus inlined shadcn-style sources, small enough to bound a tool call. */
const MAX_RENDER_CODE = 50_000;

const renderComponentArgs = z.object({
  code: z
    .string()
    .min(1)
    .max(MAX_RENDER_CODE)
    .describe(
      "One self-contained TSX module whose default export is a React component showing the chosen component in the user's own use case. Import packages by npm name, optionally pinned ('@mantine/core@9.7.1'); they load from esm.sh with React 19 shared. Import package CSS directly ('@mantine/core/styles.css'). Tailwind utility classes work. Relative and '@/' imports fail: inline local files such as shadcn's components/ui sources. Use synthetic sample data only.",
    ),
});

/** What render_component answers: the render itself happens in the user's chat, never on Col's server. */
export interface RenderComponentResult {
  status: "sent-to-chat";
  gaps: string[];
}

const RENDER_GAPS = [
  "The component renders inside the chat only on hosts that support MCP Apps (such as Claude, ChatGPT, and VS Code); terminal hosts show nothing, so do not claim a render there.",
  "If the module fails to compile or render, the chat shows the error and reports it back to you as model context; fix the code and call render_component again.",
];

/**
 * Words that carry no retrieval signal: English filler plus the catalogue's
 * own generic vocabulary ("library" matches 57% of entries, "component" 82%).
 * Keeping them would over-constrain the directory's AND matching and turn a
 * natural request ("a library for react with tailwind") into a worse query
 * than its keywords ("react tailwind"), which the evaluation fixtures assert
 * against.
 */
const STOP_WORDS = new Set([
  "a", "an", "the", "for", "with", "and", "or", "of", "in", "on", "to", "our", "we", "is", "as", "by", "from", "that", "this",
  "library", "libraries", "component", "components", "ui", "find", "need", "want", "using", "use",
]);

function keywordTokens(query: string): string[] {
  return wordTokens(query).filter((token) => !STOP_WORDS.has(token));
}

/**
 * Drops tokens no catalogue entry contains at all ("setup", "install" in a
 * headline request). A token matching nothing cannot discriminate between
 * entries, yet under the directory's AND matching it empties the whole result
 * set. When every token is unknown to the catalogue, they are kept: that query
 * genuinely matches nothing and must answer empty, not the whole catalogue.
 */
function liveTokens(tokens: readonly string[], inCatalogue: (token: string) => boolean): string[] {
  const live = tokens.filter(inCatalogue);
  return live.length > 0 ? live : [...tokens];
}

function absolute(path: string): string {
  return new URL(path, siteUrl).toString();
}

class ArgumentError extends Error {}

function parseArgs<T>(name: string, schema: z.ZodType<T>, args: unknown): T {
  const parsed = schema.safeParse(args);
  if (parsed.success) return parsed.data;
  const detail = parsed.error.issues
    .map((issue) => `${issue.path.map(String).join(".") || "arguments"}: ${issue.message}`)
    .join("; ");
  throw new ArgumentError(`${name} arguments invalid — ${detail}`);
}

function componentHit(library: Library, component: LibraryComponent, verification: FieldVerification): ComponentHit {
  return {
    id: componentId(library.slug, component.name),
    name: component.name,
    aliases: component.aliases ?? [],
    url: component.url,
    kind: component.kind,
    summary: component.summary,
    builtOn: component.builtOn,
    verifiedAt: component.verifiedAt,
    variants: component.variants,
    library: { slug: library.slug, name: library.name, url: library.url, stacks: library.stacks },
    evidence: {
      verification,
      gaps: [],
    },
  };
}

function libraryHit(result: SearchResult, verification: FieldVerification): LibraryHit {
  const { library, components, matchedOn } = result;
  return {
    slug: library.slug,
    name: library.name,
    description: library.description,
    url: library.url,
    colListingUrl: absolute(libraryPath(library.slug)),
    category: library.category,
    stacks: library.stacks,
    useCases: library.useCases,
    matchedComponents: components,
    matchedOn,
    evidence: {
      verification,
      gaps: [],
    },
  };
}

function compatibilityFor(data: CatalogueData, slug: string): CompatibilityFact[] {
  return data.compatibility.find((entry) => entry.slug === slug)?.facts ?? [];
}

function corpusFor(data: CatalogueData, slug: string): LibraryCorpusEntry | undefined {
  return data.corpus.find((entry) => entry.slug === slug);
}

function verificationFor(entry: LibraryCorpusEntry | undefined): Verification {
  if (!entry) return "unverified";
  return admissibleSnapshots(entry).length > 0 ? "partial" : "unverified";
}

function evidenceState(
  facts: readonly CompatibilityFact[],
  entry: LibraryCorpusEntry | undefined,
): Pick<FieldVerification, "compatibility" | "snapshot"> {
  return {
    compatibility: facts.length > 0 ? "recorded" : "unknown",
    snapshot: entry && admissibleSnapshots(entry).length > 0 ? "ingested" : "none",
  };
}

function componentVerification(
  facts: readonly CompatibilityFact[],
  entry: LibraryCorpusEntry | undefined,
): FieldVerification {
  return {
    page: "verified",
    ...evidenceState(facts, entry),
  };
}

function libraryVerification(
  facts: readonly CompatibilityFact[],
  entry: LibraryCorpusEntry | undefined,
): FieldVerification {
  return {
    page: "verified",
    ...evidenceState(facts, entry),
  };
}

/**
 * The weakest per-field state across a response, so a shared envelope never
 * overstates what any single hit supports.
 */
function weakestVerification(states: readonly FieldVerification[]): FieldVerification {
  const worst = <T extends string>(values: readonly T[], order: readonly T[]) =>
    [...order].reverse().find((value) => values.includes(value)) ?? order[order.length - 1];
  return {
    page: worst(states.map((state) => state.page), ["verified", "unverified"]),
    compatibility: worst(states.map((state) => state.compatibility), ["recorded", "unknown"]),
    snapshot: worst(states.map((state) => state.snapshot), ["ingested", "none"]),
  };
}

/** Concept aliases are searchable on every component that links to the concept. */
function withConceptAliases(index: ComponentIndex, concepts: Record<string, string[]>): ComponentIndex {
  return Object.fromEntries(
    Object.entries(index).map(([slug, components]) => [
      slug,
      components.map((component) => {
        const extra = component.concept ? concepts[component.concept] ?? [] : [];
        return extra.length > 0
          ? { ...component, aliases: [...new Set([...(component.aliases ?? []), ...extra])] }
          : component;
      }),
    ]),
  );
}

export function createCatalogueTools(data: CatalogueData): CatalogueTools {
  const index = withConceptAliases(data.componentIndex, componentConcepts);
  const searchDirectory = createDirectorySearch(data.libraries, index);
  function searchLibraries(raw: unknown): SearchLibrariesResult {
    const args = parseArgs("search_libraries", searchLibrariesArgs, raw);
    const limit = args.limit ?? MAX_LIMIT;
    const offset = args.offset ?? 0;

    const keywords = keywordTokens(args.query ?? "");
    // A query that was all noise ("e") must not become a blank query that
    // browses the whole catalogue.
    if ((args.query ?? "").trim() !== "" && keywords.length === 0) {
      return {
        results: [],
        total: 0,
        indexStatus: "no recorded library matches",
        evidence: {
          verification: weakestVerification([]),
          gaps: [COVERAGE_GAP, "Compatibility constraints are recorded only where verified; ask for one library's details to see its explicit unknowns."],
        },
      };
    }
    const matches = searchDirectory({
      query: liveTokens(keywords, (token) => searchDirectory({ query: token, category: null, stacks: [], useCases: [], sort: "curated" }).length > 0).join(" "),
      category: args.category ?? null,
      stacks: args.stacks ?? [],
      useCases: args.useCases ?? [],
      sort: "curated",
    });
    return {
      results: matches.slice(offset, offset + limit).map((match) =>
        libraryHit(match, libraryVerification(compatibilityFor(data, match.library.slug), corpusFor(data, match.library.slug))),
      ),
      total: matches.length,
      ...(matches.length === 0 ? { indexStatus: "no recorded library matches" as EmptyHint } : {}),
      evidence: {
        verification: weakestVerification(
          matches.map((match) =>
            libraryVerification(compatibilityFor(data, match.library.slug), corpusFor(data, match.library.slug)),
          ),
        ),
        gaps: [
          "Component coverage is partial: a missing component is not evidence that a library lacks it.",
          "Compatibility constraints are recorded only where verified; ask for one library's details to see its explicit unknowns.",
        ],
      },
    };
  }

  function searchComponents(raw: unknown): SearchComponentsResult {
    const args = parseArgs("search_components", searchComponentsArgs, raw);
    const limit = args.limit ?? MAX_LIMIT;
    const offset = args.offset ?? 0;

    const keywords = keywordTokens(args.query);
    const matches: ComponentHit[] = [];
    for (const entry of data.libraries) {
      if (args.library !== undefined && entry.slug !== args.library) continue;
      if (args.stacks !== undefined && !args.stacks.every((stack) => entry.stacks.includes(stack))) continue;
      const details = data.details[entry.slug];
      const facts = compatibilityFor(data, entry.slug);
      const corpusEntry = corpusFor(data, entry.slug);
      for (const component of index[entry.slug] ?? []) {
        const haystack = componentHaystack(component);
        if (keywords.length > 0 && keywords.every((token) => tokenMatches(haystack, token))) {
          const matchedOn = [
            ...keywords.flatMap((token) =>
              tokenMatches(normalizeWords(component.name), token)
                ? [`name:${token}`]
                : (component.aliases ?? [])
                    .filter((alias) => tokenMatches(normalizeWords(alias), token))
                    .map((alias) => `alias:${alias}`),
            ),
            ...(args.stacks ?? []).map((stack) => `stack:${stack}`),
          ];
          matches.push({
            ...componentHit(entry, component, componentVerification(facts, corpusEntry)),
            matchedOn,
          });
        }
      }
    }
    // Same exact-name-first rule the directory uses, so an exact official name
    // or recorded alias outranks a substring touch on any other component.
    const normalizedQuery = keywords.join(" ");
    matches.sort((a, b) => componentRank(a, keywords, normalizedQuery) - componentRank(b, keywords, normalizedQuery));
    const envelopeGaps = [
      "Every listed component is verified on the library's own documentation, but coverage is partial: a missing component is not evidence of absence.",
    ];
    const envelopeVerification = weakestVerification(matches.map((hit) => hit.evidence.verification));
    if (matches.length > 0) {
      return {
        results: matches.slice(offset, offset + limit),
        total: matches.length,
        evidence: { verification: envelopeVerification, gaps: envelopeGaps },
      };
    }
    // An empty result must say which kind of empty it is, and offer near misses.
    const indexStatus = args.library === undefined
      ? "no recorded component matches"
      : data.libraries.some((entry) => entry.slug === args.library)
        ? "library indexed, component not recorded"
        : "library not in index";
    const suggestions: ComponentRef[] = [];
    if (args.library === undefined) {
      for (const entry of data.libraries) {
        for (const component of index[entry.slug] ?? []) {
          const haystack = componentHaystack(component);
          if (keywords.some((token) => tokenMatches(haystack, token))) {
            suggestions.push({ id: componentId(entry.slug, component.name), name: component.name, kind: component.kind });
          }
        }
      }
    }
    return {
      results: [],
      total: 0,
      indexStatus,
      suggestions: suggestions.slice(0, 3),
      evidence: { verification: weakestVerification([]), gaps: envelopeGaps },
    };
  }

  function getLibrary(raw: unknown): LibraryDetailsResult {
    const args = parseArgs("get_library", getLibraryArgs, raw);
    const library = data.libraries.find((entry) => entry.slug === args.slug);
    if (!library) {
      throw new ArgumentError(`unknown library slug "${args.slug}"; use search_libraries to find valid slugs`);
    }
    const details = data.details[library.slug];
    const entry = corpusFor(data, library.slug);
    const facts = compatibilityFor(data, library.slug);
    const setup = details ? libraryOutbound(library, details) : null;

    return {
      slug: library.slug,
      name: library.name,
      description: library.description,
      url: library.url,
      colListingUrl: absolute(libraryPath(library.slug)),
      category: library.category,
      stacks: library.stacks,
      useCases: library.useCases,
      docsUrl: details?.docsUrl ?? null,
      repoUrl: details?.repoUrl ?? null,
      components: (index[library.slug] ?? []).map((component) => ({
        id: componentId(library.slug, component.name),
        name: component.name,
        kind: component.kind,
      })),
      componentCount: (index[library.slug] ?? []).length,
      gettingStarted: setup?.links.map(({ url, text }) => `${text} ${url}`) ?? [],
      pricing: details?.pricing ?? null,
      compatibility: compatibilityReport(facts, trackedSubjects(library.stacks, facts)),
      documentation: { verification: verificationFor(entry), snapshots: !library.outboundOnly && entry ? admissibleSnapshots(entry) : [] },
      evidence: {
        verification: libraryVerification(facts, entry),
        gaps: [
          COVERAGE_GAP,
          compatibilityGap(facts),
          verificationFor(entry) === "unverified"
            ? "No deep documentation snapshots are ingested for this library; verify installation and API against the linked official docs."
            : "Documentation snapshots cover only the pages listed; verify current APIs against the linked official docs.",
        ],
      },
    };
  }

  function getComponent(raw: unknown): ComponentDetailsResult {
    const args = parseArgs("get_component", getComponentArgs, raw);
    const parsedId = parseComponentId(args.id);
    if (!parsedId) {
      throw new ArgumentError(`id must be '<library-slug>/<component name>', as returned by search_components`);
    }

    const library = data.libraries.find((entry) => entry.slug === parsedId.slug);
    const component = library && (index[parsedId.slug] ?? []).find((entry) => entry.name === parsedId.name);
    if (!library || !component) {
      throw new ArgumentError(`unknown component id "${args.id}"; use search_components to find valid ids`);
    }
    const details = data.details[library.slug];
    const facts = compatibilityFor(data, library.slug);

    return {
      ...componentHit(library, component, componentVerification(facts, corpusFor(data, library.slug))),
      library: { slug: library.slug, name: library.name, url: library.url, docsUrl: details?.docsUrl ?? null, stacks: library.stacks },
      dependencies: library.outboundOnly ? [] : component.dependencies ?? [],
      registryDependencies: library.outboundOnly ? [] : component.registryDependencies ?? [],
      compatibility: compatibilityReport(facts, trackedSubjects(library.stacks, facts)),
      evidence: {
        verification: componentVerification(facts, corpusFor(data, library.slug)),
        gaps: [
          "The component page is verified on the library's own documentation. Col publishes no install commands, so read the library's setup docs for installation and API details, which may cover more than this component.",
          compatibilityGap(facts),
          COVERAGE_GAP,
        ],
      },
    };
  }

  /** Validates the module and hands it to the chat widget, which does the rendering; Col's server runs no code. */
  function renderComponent(raw: unknown): RenderComponentResult {
    parseArgs("render_component", renderComponentArgs, raw);
    return { status: "sent-to-chat", gaps: RENDER_GAPS };
  }

  const handlers: Record<string, (args: unknown) => unknown> = {
    search_libraries: searchLibraries,
    search_components: searchComponents,
    get_library: getLibrary,
    get_component: getComponent,
    render_component: renderComponent,
  };

  function invoke(name: string, args: unknown): ToolResult {
    const handler = handlers[name];
    if (!handler) {
      return errorResult(`unknown tool "${name}"; available tools: ${Object.keys(handlers).join(", ")}`);
    }
    try {
      const payload = handler(args) as Record<string, unknown>;
      return {
        content: [{ type: "text", text: JSON.stringify(payload) }],
        structuredContent: payload,
      };
    } catch (error) {
      return errorResult(error instanceof ArgumentError ? error.message : `${name} failed: ${String(error)}`);
    }
  }

  return { invoke, list: () => TOOL_DEFINITIONS };
}

function errorResult(message: string): ToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}

/** Read-only, local dataset: no world interaction and nothing destructive. */
const annotation = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } as const;

const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: "search_libraries",
    title: "Search Col's UI library catalogue",
    description: `Find UI libraries that fit a project's framework, styling approach, and use case. Returns stable library slugs, official source links, the components that explain each match, and explicit gaps. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: searchLibrariesArgs,
    annotations: annotation,
  },
  {
    name: "search_components",
    title: "Search Col's verified component index",
    description: `Find components by their official name or a real alias, optionally scoped to one library and one or more stacks. Every hit links to the component's own documentation page on the library's domain, states what matched, and names its kind. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: searchComponentsArgs,
    annotations: annotation,
  },
  {
    name: "get_library",
    title: "Inspect one library in Col",
    description: `Discover one library: description, stacks, the official docs and site to set it up from, pricing, the components Col records for it (with componentCount), verified compatibility facts (explicit "unknown" where nothing is verified), and permitted documentation snapshots. Col publishes no install commands: read the current official docs before installing. Libraries marked outboundOnly omit setup links and snapshots. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: getLibraryArgs,
    annotations: annotation,
  },
  {
    name: "get_component",
    title: "Inspect one component in Col",
    description: `One component's canonical documentation link, the npm dependencies and registry components the library records for it, and verified compatibility facts (explicit "unknown" where nothing is verified). Col publishes no install commands: read the library's setup docs for those. Ids come from search_components as '<library-slug>/<component name>'. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: getComponentArgs,
    annotations: annotation,
  },
  {
    name: "render_component",
    title: "Render a component in the chat",
    description: `Show the user a live, interactive render of a component inside the chat, after choosing it with search_components and get_component. Write the module for the user's real use case (their labels, layout, and theme), not a generic demo. Packages load from esm.sh at render time; Col bundles none. ${NO_CREDENTIALS_NOTE}`,
    args: renderComponentArgs,
    annotations: annotation,
    meta: { ui: { resourceUri: PREVIEW_WIDGET_URI } },
  },
];
