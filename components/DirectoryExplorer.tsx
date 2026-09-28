"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart, LayoutGrid, List, Search, SearchX } from "lucide-react";
import {
  libraries,
  type Category,
  type Stack,
  type UseCase,
} from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { createDirectorySearch, toggleStackSelection } from "@/lib/directory";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FilterBar, FilterDropdown } from "./FilterBar";
import { LibraryCard } from "./LibraryCard";

const SAVED_LIBRARIES_KEY = "col:saved-libraries";

const searchDirectory = createDirectorySearch(libraries, componentIndex);

export function DirectoryExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Category | null>(null);
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showSaved, setShowSaved] = useState(false);
  const [sort, setSort] = useState<"curated" | "name">("curated");
  const [layout, setLayout] = useState<"grid" | "line">("grid");

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(SAVED_LIBRARIES_KEY) ?? "[]");
      if (Array.isArray(stored)) setSaved(new Set(stored.filter((slug): slug is string => typeof slug === "string")));
    } catch {
      localStorage.removeItem(SAVED_LIBRARIES_KEY);
    }
  }, []);

  const results = useMemo(
    () => searchDirectory({ query, category, stacks, useCases, sort }),
    [query, category, stacks, useCases, sort],
  );

  const facetCounts = useMemo(
    () => searchDirectory.facetCounts({ query, category, stacks, useCases }, showSaved ? saved : undefined),
    [query, category, stacks, useCases, saved, showSaved],
  );

  useEffect(() => {
    if (window.location.hash === "#library-search") document.getElementById("library-search")?.focus();
  }, []);

  const visibleResults = showSaved
    ? results.filter(({ library }) => saved.has(library.slug))
    : results;

  const toggleSaved = (slug: string) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      try {
        localStorage.setItem(SAVED_LIBRARIES_KEY, JSON.stringify([...next]));
      } catch {
        // Keep the selection for this session when storage is unavailable.
      }
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory(null);
    setStacks([]);
    setUseCases([]);
    setShowSaved(false);
  };

  const emptyHint = showSaved
    ? saved.size === 0
      ? "Leave Saved to browse the directory, then tap the heart on any library to save it here."
      : "Clear the filters to see your saved libraries."
    : query.trim()
      ? "Col's component index is partial and grows with contributions, so a missing component may not be missing from the library. Try a broader keyword or clear the filters."
      : "Try another keyword or clear the filters.";

  return (
    <section className="directory-section w-full px-0">
      <SidebarProvider className="directory-layout min-h-[calc(100dvh-var(--site-header-height))] flex-col lg:flex-row">
        <FilterBar
          showSaved={showSaved}
          query={query}
          activeCategory={category}
          activeStacks={stacks}
          activeUseCases={useCases}
          facetCounts={facetCounts}
          onCategoryChange={setCategory}
          onStackChange={(stack) => setStacks((current) => toggleStackSelection(current, stack))}
          onUseCaseChange={(useCase) => setUseCases((current) => useCase === null ? [] : current.includes(useCase) ? current.filter((value) => value !== useCase) : [...current, useCase])}
          onClearAll={clearFilters}
        />

        <div className={`directory-results-pane min-w-0 flex-1 px-5 py-4 sm:px-8 lg:px-8 lg:py-6 ${visibleResults.length ? "pb-40" : ""}`}>
          <div className="directory-toolbar theme-border space-y-3 border-b pb-4">
            <label className="directory-search-label relative block w-full max-w-xl">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden />
              <input
                id="library-search"
                data-library-search="true"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Libraries or components..."
                aria-label="Search libraries or components"
                className="directory-search theme-control h-11 w-full rounded-md border bg-transparent pr-4 pl-10 text-sm outline-none placeholder:text-current/50 focus-visible:ring-2"
              />
              <kbd className="search-key-hint pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border px-2 py-1 text-[10px]">/</kbd>
            </label>
            <div className="directory-toolbar-row flex flex-wrap items-center justify-between gap-3">
              <h1 className="theme-text text-xl font-semibold tracking-tight">{query || category || stacks.length || useCases.length ? "Results" : "All libraries"}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p role="status" className="theme-muted whitespace-nowrap text-sm tabular-nums">{visibleResults.length} of {libraries.length}</p>
                <FilterDropdown
                  label={sort === "curated" ? "Curated order" : "Name A–Z"}
                  value={sort}
                  items={[{ label: "Curated order", value: "curated" }, { label: "Name A–Z", value: "name" }]}
                  onValueChange={(value) => setSort(value as "curated" | "name")}
                  className="w-40"
                />
                {visibleResults.length > 0 && (
                  <ToggleGroup
                    type="single"
                    value={layout}
                    onValueChange={(value) => { if (value === "grid" || value === "line") setLayout(value); }}
                    aria-label="Library layout"
                    className="theme-control h-11 gap-1 rounded-md border p-1"
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view" className="h-9 min-h-0 flex-none gap-2 px-3 text-sm text-muted-foreground data-[state=on]:bg-secondary data-[state=on]:text-foreground"><LayoutGrid className="size-4" aria-hidden /> Grid</ToggleGroupItem>
                    <ToggleGroupItem value="line" aria-label="Line view" className="h-9 min-h-0 flex-none gap-2 px-3 text-sm text-muted-foreground data-[state=on]:bg-secondary data-[state=on]:text-foreground"><List className="size-4" aria-hidden /> Line</ToggleGroupItem>
                  </ToggleGroup>
                )}
                <Button type="button" variant="outline" onClick={() => setShowSaved((current) => !current)} aria-pressed={showSaved} className="theme-control min-h-11 hover:opacity-80">
                  <Heart fill={showSaved ? "currentColor" : "none"} aria-hidden /> Saved {saved.size}
                </Button>
              </div>
            </div>
          </div>
          {query.trim() && <p className="theme-muted mt-3 text-xs leading-5">Component coverage is partial. Links below are verified matches, not a complete inventory.</p>}

          {visibleResults.length ? (
            <div className={`directory-gallery mt-5 grid grid-cols-1 ${layout === "grid" ? "gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "gap-3"}`}>
              {visibleResults.map(({ library, components }) => (
                <LibraryCard key={library.slug} layout={layout} library={library} matches={components} saved={saved.has(library.slug)} onToggleSaved={() => toggleSaved(library.slug)} />
              ))}
            </div>
          ) : (
            <div className="theme-border mt-6 flex flex-col items-center border border-dashed py-24 text-center">
              {showSaved ? <Heart className="theme-muted size-7" aria-hidden /> : <SearchX className="theme-muted size-7" aria-hidden />}
              <p className="theme-text mt-5 font-medium">{showSaved ? (saved.size === 0 ? "No saved libraries yet" : "No saved libraries match") : "Nothing matches that search"}</p>
              <p className="theme-muted mt-1.5 text-sm">{emptyHint}</p>
            </div>
          )}
        </div>
      </SidebarProvider>
    </section>
  );
}
