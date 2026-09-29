"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Star } from "lucide-react";
import { libraries } from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { createDirectorySearch } from "@/lib/directory";
import { libraryPath } from "@/lib/site";
import { directoryQuery, useDirectoryQuery } from "@/lib/directory-query";

const compactNumber = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const searchDirectory = createDirectorySearch(libraries, componentIndex);

let starsRequest: Promise<number | null> | null = null;

/** Star count for the repo, fetched once per page load and shared by every caller. */
export function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    starsRequest ??= fetch("https://api.github.com/repos/screen-gd/Col")
      .then((response) => (response.ok ? response.json() : null))
      .then((repository: { stargazers_count?: number } | null) => (typeof repository?.stargazers_count === "number" ? repository.stargazers_count : null))
      .catch(() => null);
    starsRequest.then((count) => { if (active) setStars(count); });
    return () => { active = false; };
  }, []);
  return stars;
}

export function BrandLink({ className = "" }: { className?: string }) {
  return (
    <a href="/" aria-label="Col, Collection of Libraries" className={`site-brand ${className}`}>
      <Image src="/brand/col-mark.png" alt="" width={20} height={20} className="site-brand-mark" priority />
      <span className="site-brand-name cap">Col</span>
    </a>
  );
}

export function GitHubStars({ stars, className = "" }: { stars: number | null; className?: string }) {
  return (
    <a
      href="https://github.com/screen-gd/Col"
      target="_blank"
      rel="noopener noreferrer"
      className={`site-github ${className}`}
      aria-label={`Col on GitHub${stars === null ? "" : `, ${stars} stars`}`}
      title="Col on GitHub"
    >
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
      <span className="site-github-count">
        <Star className="site-github-star" aria-hidden="true" />
        <span className="cap">{stars === null ? "–" : compactNumber.format(stars)}</span>
      </span>
    </a>
  );
}

/**
 * Library search with a quick-results dropdown. `collapsed` renders only an icon
 * that opens the directory with its search focused (used by the docs rail).
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

  // On the directory the field filters the results in place instead of opening a dropdown.
  if (pathname === "/libraries" && !collapsed) {
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
          placeholder="Search libraries"
          aria-label="Search libraries or components"
        />
        <kbd aria-hidden="true">/</kbd>
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

  const results = query.trim()
    ? searchDirectory({ query, category: null, stacks: [], useCases: [], sort: "curated" }).slice(0, 5)
    : [];

  return (
    <form
      role="search"
      className={`site-search ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (trimmed) window.location.assign(`/libraries?q=${encodeURIComponent(trimmed)}`);
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
        aria-label="Search libraries or components"
      />
      <kbd aria-hidden="true">/</kbd>
      {open && query.trim() && (
        <div className="site-search-results" aria-label="Library search results">
          {results.length ? (
            <ul>
              {results.map(({ library, components }) => (
                <li key={library.slug}>
                  <Link href={libraryPath(library.slug)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <span>{library.name}</span>
                    <small>{components[0]?.name ?? library.category}</small>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>No matching libraries</p>}
          <button type="submit">View all results</button>
        </div>
      )}
    </form>
  );
}
