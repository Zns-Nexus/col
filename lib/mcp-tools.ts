import * as z from "zod/v4";
import type { Category, Library, Stack, UseCase } from "../data/libraries";
import { CATEGORIES, STACKS, USE_CASES } from "../data/libraries.ts";
import type { ComponentIndex, LibraryComponent } from "../data/components";
import type { LibraryDetails } from "../data/library-details/types";
import type { DocSnapshot, LibraryCorpusEntry } from "../data/library-corpus/types";
import type { CompatibilityFact, LibraryCompatibility } from "../data/compatibility";
import { componentRank, createDirectorySearch, type SearchResult } from "./directory.ts";
import { admissibleSnapshots } from "./corpus.ts";
import { compatibilityReport, type CompatibilityReport } from "./compatibility.ts";
import { libraryPath, siteUrl } from "./site.ts";

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
 * Every result carries the same envelope: canonical source links, a
 * verification marker, and explicit gaps. Col's honesty rules live in the tool
 * descriptions because host agents read those, not the website.
 */

/** How well Col has verified what a result claims. */
export type Verification = "verified" | "partial" | "unverified";

/** The shared envelope every tool result carries. */
export interface Evidence {
  verification: Verification;
  /** What Col has not verified. Never empty for "partial" or "unverified". */
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
  category: Category;
  stacks: Stack[];
  useCases: UseCase[];
  /** Components that explain why this library matched the query. */
  matchedComponents: LibraryComponent[];
  evidence: Evidence;
}

export interface SearchLibrariesResult {
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
  library: { slug: string; name: string; url: string };
  evidence: Evidence;
}

export interface SearchComponentsResult {
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
  install: { label: string; command: string }[];
  registrySetup: { description: string; config?: string } | null;
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

export interface ComponentDetailsResult {
  id: string;
  name: string;
  aliases: string[];
  url: string;
  library: { slug: string; name: string; url: string; docsUrl: string | null };
  /** Installation evidence is only claimed when the library's details record it. */
  install: { label: string; command: string }[];
  registrySetup: { description: string; config?: string } | null;
  compatibility: CompatibilityReport;
  evidence: Evidence;
}

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
}

/** The four tool calls, as one request-to-result interface. */
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
  ...PAGE_ARGS,
});

const getLibraryArgs = z.object({
  slug: z.string().min(1).describe("Library slug from search_libraries, e.g. 'shadcn-ui'."),
});

const getComponentArgs = z.object({
  id: z.string().min(1).describe("Component id from search_components, e.g. 'shadcn-ui/Command'."),
});

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
  return query.toLowerCase().split(/[^a-z0-9.+#-]+/).filter((token) => token !== "" && !STOP_WORDS.has(token));
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

function componentHit(library: Library, component: LibraryComponent): ComponentHit {
  return {
    id: componentId(library.slug, component.name),
    name: component.name,
    aliases: component.aliases ?? [],
    url: component.url,
    library: { slug: library.slug, name: library.name, url: library.url },
    evidence: {
      verification: "verified",
      gaps: ["Component coverage for this library is partial; other components may be undocumented."],
    },
  };
}

function libraryHit(result: SearchResult): LibraryHit {
  const { library, components } = result;
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
    evidence: {
      verification: "partial",
      gaps: [
        COVERAGE_GAP,
        "Stack and use-case metadata is curated, not exhaustive: check the library's official docs for full compatibility.",
      ],
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

export function createCatalogueTools(data: CatalogueData): CatalogueTools {
  const searchDirectory = createDirectorySearch(data.libraries, data.componentIndex);
  // Every subject Col has ever recorded a fact for: the vocabulary a library's
  // report names its unknowns against, so gaps are named rather than implied.
  const subjects = [...new Set(data.compatibility.flatMap((entry) => entry.facts.map((fact) => fact.subject)))];

  function searchLibraries(raw: unknown): SearchLibrariesResult {
    const args = parseArgs("search_libraries", searchLibrariesArgs, raw);
    const limit = args.limit ?? MAX_LIMIT;
    const offset = args.offset ?? 0;

    const keywords = keywordTokens(args.query ?? "");
    const matches = searchDirectory({
      query: liveTokens(keywords, (token) => searchDirectory({ query: token, category: null, stacks: [], useCases: [], sort: "curated" }).length > 0).join(" "),
      category: args.category ?? null,
      stacks: args.stacks ?? [],
      useCases: args.useCases ?? [],
      sort: "curated",
    });
    return {
      results: matches.slice(offset, offset + limit).map(libraryHit),
      total: matches.length,
      evidence: {
        verification: "partial",
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
      for (const component of data.componentIndex[entry.slug] ?? []) {
        const haystack = `${component.name} ${(component.aliases ?? []).join(" ")}`.toLowerCase();
        if (keywords.some((token) => haystack.includes(token))) matches.push(componentHit(entry, component));
      }
    }
    // Same exact-name-first rule the directory uses, so an exact official name
    // or recorded alias outranks a substring touch on any other component.
    const normalizedQuery = keywords.join(" ");
    matches.sort((a, b) => componentRank(a, keywords, normalizedQuery) - componentRank(b, keywords, normalizedQuery));
    return {
      results: matches.slice(offset, offset + limit),
      total: matches.length,
      evidence: {
        verification: "partial",
        gaps: [
          "Every listed component is verified on the library's own documentation, but coverage is partial: a missing component is not evidence of absence.",
        ],
      },
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
      install: details?.install ?? [],
      registrySetup: details?.registrySetup ?? null,
      gettingStarted: details?.gettingStarted ?? [],
      pricing: details?.pricing ?? null,
      compatibility: compatibilityReport(facts, subjects),
      documentation: { verification: verificationFor(entry), snapshots: entry ? admissibleSnapshots(entry) : [] },
      evidence: {
        verification: details ? "partial" : "unverified",
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
    const component = library && (data.componentIndex[parsedId.slug] ?? []).find((entry) => entry.name === parsedId.name);
    if (!library || !component) {
      throw new ArgumentError(`unknown component id "${args.id}"; use search_components to find valid ids`);
    }
    const details = data.details[library.slug];
    const facts = compatibilityFor(data, library.slug);

    return {
      ...componentHit(library, component),
      library: { slug: library.slug, name: library.name, url: library.url, docsUrl: details?.docsUrl ?? null },
      install: details?.install ?? [],
      registrySetup: details?.registrySetup ?? null,
      compatibility: compatibilityReport(facts, subjects),
      evidence: {
        verification: "partial",
        gaps: [
          "The component page is verified on the library's own documentation; installation and API details come from the library's setup docs and may cover more than this component.",
          compatibilityGap(facts),
          COVERAGE_GAP,
        ],
      },
    };
  }

  const handlers: Record<string, (args: unknown) => unknown> = {
    search_libraries: searchLibraries,
    search_components: searchComponents,
    get_library: getLibrary,
    get_component: getComponent,
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
    description: `Find components by their official name or a real alias, optionally scoped to one library. Every hit links to the component's own documentation page on the library's domain. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: searchComponentsArgs,
    annotations: annotation,
  },
  {
    name: "get_library",
    title: "Inspect one library in Col",
    description: `Everything Col records about one library: description, stacks, install commands, registry setup, pricing, verified compatibility facts (explicit "unknown" where nothing is verified), and any ingested documentation snapshots. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: getLibraryArgs,
    annotations: annotation,
  },
  {
    name: "get_component",
    title: "Inspect one component in Col",
    description: `One component's canonical documentation link plus its library's install commands, registry setup, and verified compatibility facts (explicit "unknown" where nothing is verified). Ids come from search_components as '<library-slug>/<component name>'. ${COVERAGE_NOTE} ${NO_CREDENTIALS_NOTE}`,
    args: getComponentArgs,
    annotations: annotation,
  },
];
