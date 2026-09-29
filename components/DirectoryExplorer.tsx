"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Heart, Search, SearchX } from "lucide-react";
import { Icons } from "./MaskIcon";
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
import { FilterBar } from "./FilterBar";
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

  // FLIP: cards that stay glide from their old slot to the new one; new cards rise in.
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardPositionsRef = useRef(new Map<string, { x: number; y: number }>());
  const hasLaidOutRef = useRef(false);
  const resultKey = visibleResults.map(({ library }) => library.slug).join(",");

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const previous = cardPositionsRef.current;
    const next = new Map<string, { x: number; y: number }>();
    cardPositionsRef.current = next;
    if (!gallery) return;

    const animate = hasLaidOutRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hasLaidOutRef.current = true;
    const origin = gallery.getBoundingClientRect();
    let entering = 0;

    for (const element of Array.from(gallery.children) as HTMLElement[]) {
      const slug = element.dataset.slug;
      if (!slug) continue;
      const rect = element.getBoundingClientRect();
      const position = { x: rect.left - origin.left, y: rect.top - origin.top };
      next.set(slug, position);
      if (!animate) continue;

      element.getAnimations().forEach((animation) => animation.cancel());
      const before = previous.get(slug);
      if (before) {
        // Whole pixels only, so text lands on the same pixel grid it started on.
        const dx = Math.round(before.x - position.x);
        const dy = Math.round(before.y - position.y);
        if (dx || dy) {
          element.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: 560, easing: "cubic-bezier(.32, .72, 0, 1)" },
          );
        }
      } else if (rect.top < window.innerHeight + 200) {
        element.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 520, delay: Math.min(entering++, 12) * 35, easing: "cubic-bezier(.32, .72, 0, 1)", fill: "backwards" },
        );
      }
    }
  }, [resultKey, layout]);

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
          <div className="dir-toolbar">
            <div className="dir-toolbar-title">
              <h1>{query || category || stacks.length || useCases.length ? "Results" : "All libraries"}</h1>
              <p role="status" className="dir-count">
                {visibleResults.length}
                {visibleResults.length !== libraries.length && <span> / {libraries.length}</span>}
                <span className="sr-only"> libraries shown</span>
              </p>
            </div>
            <div className="dir-toolbar-controls">
              <label className="dir-search">
                <Search aria-hidden />
                <input
                  id="library-search"
                  data-library-search="true"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search libraries or components"
                  aria-label="Search libraries or components"
                />
                <kbd aria-hidden>/</kbd>
              </label>
              <div role="radiogroup" aria-label="Sort libraries" className="dir-segment dir-segment-text" data-value={sort === "curated" ? "0" : "1"}>
                <span className="dir-segment-pill" aria-hidden />
                <button type="button" role="radio" aria-checked={sort === "curated"} onClick={() => setSort("curated")}><span className="cap">Curated</span></button>
                <button type="button" role="radio" aria-checked={sort === "name"} onClick={() => setSort("name")}><span className="cap">A–Z</span></button>
              </div>
              <div role="radiogroup" aria-label="Library layout" className="dir-segment dir-segment-icon" data-value={layout === "grid" ? "0" : "1"}>
                <span className="dir-segment-pill" aria-hidden />
                <button type="button" role="radio" aria-checked={layout === "grid"} aria-label="Grid view" title="Grid" onClick={() => setLayout("grid")}><Icons.allLibraries className="dir-view-icon" /></button>
                <button type="button" role="radio" aria-checked={layout === "line"} aria-label="List view" title="List" onClick={() => setLayout("line")}><Icons.list className="dir-view-icon" /></button>
              </div>
              <button type="button" className="dir-control dir-saved" onClick={() => setShowSaved((current) => !current)} aria-pressed={showSaved} aria-label={`Saved libraries, ${saved.size}`}>
                <Heart fill={showSaved ? "currentColor" : "none"} aria-hidden />
                <span className="cap">{saved.size}</span>
              </button>
            </div>
          </div>
          {query.trim() && <p className="theme-muted mt-3 text-xs leading-5">Component coverage is partial. Links below are verified matches, not a complete inventory.</p>}

          {visibleResults.length ? (
            <div ref={galleryRef} className={`directory-gallery mt-5 grid grid-cols-1 ${layout === "grid" ? "gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "gap-3"}`}>
              {visibleResults.map(({ library, components }) => (
                <div key={library.slug} data-slug={library.slug} className="directory-gallery-item">
                  <LibraryCard layout={layout} library={library} matches={components} saved={saved.has(library.slug)} onToggleSaved={() => toggleSaved(library.slug)} />
                </div>
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
