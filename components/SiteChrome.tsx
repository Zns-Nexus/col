"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Search, Star } from "lucide-react";
import { libraries } from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { integrations, integrationTypes } from "@/data/integrations";
import { createDirectorySearch } from "@/lib/directory";
import { createIntegrationSearch } from "@/lib/integration-directory";
import { integrationPath, libraryPath } from "@/lib/site";
import { repo } from "@/lib/repo";
import { directoryQuery, useDirectoryQuery } from "@/lib/directory-query";
import styles from "./SiteSearch.module.css";

const compactNumber = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const searchDirectory = createDirectorySearch(libraries, componentIndex);
const searchIntegrations = createIntegrationSearch(integrations);

/** Directories whose sidebar field filters the results in place instead of opening a dropdown. */
const IN_PLACE_SEARCH: Partial<Record<string, { placeholder: string; label: string }>> = {
  "/libraries": { placeholder: "Search libraries", label: "Search libraries or components" },
  "/integrations": { placeholder: "Search integrations", label: "Search MCP servers and connectors" },
};

let starsRequest: Promise<number | null> | null = null;

/** git.cafe star count for the repo, fetched once per page load through `/api/stars` and shared by every caller. */
export function useRepoStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    starsRequest ??= fetch("/api/stars")
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { stars?: unknown } | null) => (typeof body?.stars === "number" ? body.stars : null))
      .catch(() => null);
    starsRequest.then((count) => { if (active) setStars(count); });
    return () => { active = false; };
  }, []);
  return stars;
}

export function BrandLink({ className = "" }: { className?: string }) {
  return (
    <a href="/" aria-label="Col, Collection of Libraries" className={`site-brand ${className}`}>
      <Image src="/brand/col-mark.svg" alt="" width={20} height={20} className="site-brand-mark" priority />
      <span className="site-brand-name cap">Col</span>
    </a>
  );
}

/** Link to the repo on git.cafe with its star count. */
export function RepoStars({ stars, className = "" }: { stars: number | null; className?: string }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`site-repo ${className}`}
      aria-label={`Col on git.cafe${stars === null ? "" : `, ${stars} stars`}`}
      title="Col on git.cafe"
    >
      <Coffee width={15} height={15} aria-hidden="true" />
      <span className="site-repo-count">
        <Star className="site-repo-star" aria-hidden="true" />
        <span className="cap">{stars === null ? "–" : compactNumber.format(stars)}</span>
      </span>
    </a>
  );
}

/**
 * Site search with a quick-results dropdown covering libraries and
 * integrations. On a directory it filters that directory in place instead.
 * `collapsed` renders only an icon that opens the library directory with its
 * search focused (used by the docs rail).
 */
export function SiteSearch({ className = "", collapsed = false }: { className?: string; collapsed?: boolean }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  const directoryValue = useDirectoryQuery();
  const inPlace = collapsed ? undefined : IN_PLACE_SEARCH[pathname];

  if (inPlace) {
    return (
      <form role="search" className={`site-search ${className}`} onSubmit={(event) => event.preventDefault()}>
        <Search aria-hidden="true" />
        <input
          data-directory-search=""
          type="search"
          value={directoryValue}
          onChange={(event) => directoryQuery.set(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              if (directoryValue) directoryQuery.set("");
              else event.currentTarget.blur();
            }
          }}
          placeholder={inPlace.placeholder}
          aria-label={inPlace.label}
          aria-description="Press slash to focus search"
          aria-keyshortcuts="/"
        />
        <span className={styles.shortcut} title="Press / to search" aria-hidden="true">Press <kbd>/</kbd></span>
      </form>
    );
  }

  if (collapsed) {
    return (
      <Link href="/libraries#library-search" className={`site-search-icon ${className}`} aria-label="Search libraries" title="Search libraries">
        <Search aria-hidden="true" />
      </Link>
    );
  }

  const trimmed = query.trim();
  const results = trimmed
    ? searchDirectory({ query, category: null, stacks: [], useCases: [], sort: "curated" }).slice(0, 5)
    : [];
  const integrationResults = trimmed
    ? searchIntegrations({ query, type: null, client: null, publisher: null }).slice(0, 2)
    : [];
  // "View all" opens the directory that has matches, preferring libraries.
  const allResultsPath = results.length === 0 && integrationResults.length > 0 ? "/integrations" : "/libraries";

  return (
    <form
      role="search"
      className={`site-search ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        if (trimmed) window.location.assign(`${allResultsPath}?q=${encodeURIComponent(trimmed)}`);
      }}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Search aria-hidden="true" />
      <input
        ref={inputRef}
        data-site-search=""
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            event.currentTarget.blur();
          }
        }}
        placeholder="Search"
        aria-label="Search libraries, components, and integrations"
        aria-description="Press slash to focus search"
        aria-keyshortcuts="/"
      />
      <span className={styles.shortcut} title="Press / to search" aria-hidden="true">Press <kbd>/</kbd></span>
      {open && trimmed && (
        <div className="site-search-results" aria-label="Search results">
          {results.length || integrationResults.length ? (
            <ul>
              {results.map(({ library, components }) => (
                <li key={library.slug}>
                  <Link href={libraryPath(library.slug)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <span>{library.name}</span>
                    <small>{components[0]?.name ?? library.category}</small>
                  </Link>
                </li>
              ))}
              {integrationResults.map((integration) => (
                <li key={integration.slug}>
                  <Link href={integrationPath(integration.slug)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <span>{integration.name}</span>
                    <small>{integrationTypes(integration).join(" · ")}</small>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>No matches</p>}
          <button type="submit">View all results</button>
        </div>
      )}
    </form>
  );
}
