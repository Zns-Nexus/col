"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, SearchX } from "lucide-react";
import { libraries } from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { createComponentSearch } from "@/lib/component-directory";
import { Button } from "@/components/ui/button";
import { LibraryLogo } from "./LibraryLogo";
import { SearchField } from "./SiteChrome";
import styles from "./ComponentsExplorer.module.css";

const searchComponents = createComponentSearch(libraries, componentIndex);
const PAGE_SIZE = 60;

/**
 * The component browser: a list of documented components beside the selected
 * component's own page in an embedded panel.
 *
 * The column owns its search, so typing here never drives the frame's global
 * search; the column opens with the shared toolbar heading, rows carry the
 * library's logo next to its name, and the selected row uses the same pill
 * treatment as the site's active navigation.
 */
export function ComponentsExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const results = useMemo(() => searchComponents(query), [query]);
  const selected = results.find(({ component }) => component.url === selectedUrl) ?? results[0];

  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);
  useEffect(() => { setLimit(PAGE_SIZE); }, [query]);

  return (
    <section className={styles.browser} aria-label="Component browser">
      <div className={styles.results}>
        <div className={styles.head}>
          <div className="dir-toolbar">
            <div className="dir-toolbar-title">
              <h1>Components</h1>
              <p role="status" className="dir-count">{results.length}<span className="sr-only"> components found</span></p>
            </div>
          </div>
          <div className={styles.search}>
            <SearchField value={query} onChange={setQuery} placeholder="Search components" label="Search components by name or alias" />
          </div>
          <p className="theme-muted text-xs leading-5">Component coverage is partial. Results are verified matches, not a complete inventory.</p>
        </div>
        <div className={styles.list}>
          {results.length ? (
            <>
              <ul aria-label="Component results">
                {results.slice(0, limit).map(({ library, component }) => (
                  <li key={`${library.slug}/${component.name}`}>
                    <button
                      type="button"
                      className={styles.result}
                      aria-pressed={selected?.component.url === component.url}
                      onClick={() => setSelectedUrl(component.url)}
                    >
                      <span className={styles.logo} aria-hidden><LibraryLogo url={library.url} name={library.name} size={20} /></span>
                      <span className={styles.copy}>
                        <span className={styles.rowHead}>
                          <span className={styles.name}>{component.name}</span>
                          <span className={styles.library}>{library.name}</span>
                        </span>
                        {component.summary && <span className={styles.summary}>{component.summary}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {results.length > limit && <Button variant="outline" className="mt-6 w-full" onClick={() => setLimit((current) => current + PAGE_SIZE)}>Show more components</Button>}
            </>
          ) : (
            <div className={styles.empty}>
              <SearchX className="theme-muted size-7" aria-hidden />
              <p className="theme-text mt-5 font-medium">Nothing matches that search</p>
              <p className="theme-muted mt-1.5 text-sm">Try another component name or alias. A missing result is not recorded yet, which is not the same as the library lacking it.</p>
              <Button variant="outline" className="mt-5" onClick={() => setQuery("")}>Clear search</Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.preview}>
        {selected ? (
          <>
            <header className={styles.previewHeader}>
              <div className={styles.previewId}>
                <h2>{selected.component.name}</h2>
                <p className={styles.previewLibrary}>{selected.library.name}</p>
              </div>
              <a href={selected.component.url} target="_blank" rel="noopener noreferrer" className="ld-button">
                <span className="cap">Open docs</span>
                <ArrowUpRight aria-hidden />
              </a>
            </header>
            <iframe
              key={selected.component.url}
              src={selected.component.url}
              title={`${selected.library.name} ${selected.component.name} official demo and documentation`}
              className={styles.frame}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <p className={styles.frameNote}>If this site blocks the embedded view, use Open docs.</p>
          </>
        ) : <p className={styles.emptyPreview}>Select a component to read its official page here.</p>}
      </div>
    </section>
  );
}
