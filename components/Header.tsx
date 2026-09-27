"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { libraries } from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { createDirectorySearch } from "@/lib/directory";
import { libraryPath } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

const compactNumber = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const searchDirectory = createDirectorySearch(libraries, componentIndex);
const links = [
  ["Libraries", "/libraries"],
  ["Docs", "/docs"],
  ["Contributors", "/contributors"],
  ["Sponsors", "/sponsors"],
] as const;

// Adapted from reactbits.dev/animations/gradual-blur, fitted to the header.
const headerBlurLayers = Array.from({ length: 5 }, (_, index): CSSProperties => {
  const start = index * 20;
  const stops = [`transparent ${start}%`, `black ${start + 20}%`];
  if (start + 40 <= 100) stops.push(`black ${start + 40}%`);
  if (start + 60 <= 100) stops.push(`transparent ${start + 60}%`);
  const mask = `linear-gradient(to top, ${stops.join(", ")})`;
  const blur = `blur(${0.25 + index * 0.125}rem)`;
  return { maskImage: mask, WebkitMaskImage: mask, backdropFilter: blur, WebkitBackdropFilter: blur };
});

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const pendingLinkRef = useRef<HTMLAnchorElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      const isEditableTarget = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (isEditableTarget) return;
      const slashShortcut = event.key === "/" && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
      const commandShortcut = (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k";
      if (!slashShortcut && !commandShortcut) return;

      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/repos/screen-gd/Col", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((repository: { stargazers_count?: number }) => {
        if (typeof repository.stargazers_count === "number") setStars(repository.stargazers_count);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const positionHighlight = useCallback((link: HTMLAnchorElement | null) => {
    const container = linksRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight || !link) return;

    const linkRect = link.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
    highlight.style.opacity = "1";
  }, []);

  const getActiveLink = useCallback(
    () => linksRef.current?.querySelector<HTMLAnchorElement>('[aria-current="page"]') ?? null,
    [],
  );

  const restoreActiveHighlight = useCallback(() => {
    if (pendingLinkRef.current && linksRef.current?.contains(pendingLinkRef.current)) {
      positionHighlight(pendingLinkRef.current);
      return;
    }
    const activeLink = getActiveLink();
    if (activeLink) positionHighlight(activeLink);
    else if (highlightRef.current) highlightRef.current.style.opacity = "0";
  }, [getActiveLink, positionHighlight]);

  useEffect(() => {
    pendingLinkRef.current = null;
    let readyFrame = 0;
    const frame = requestAnimationFrame(() => {
      restoreActiveHighlight();
      readyFrame = requestAnimationFrame(() => {
        if (highlightRef.current) highlightRef.current.dataset.ready = "true";
      });
    });
    window.addEventListener("resize", restoreActiveHighlight);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(readyFrame);
      window.removeEventListener("resize", restoreActiveHighlight);
    };
  }, [pathname, restoreActiveHighlight]);

  const headerClass = "site-header";
  const searchResults = searchQuery.trim()
    ? searchDirectory({ query: searchQuery, category: null, stacks: [], useCases: [], sort: "curated" }).slice(0, 5)
    : [];

  return (
    <header className={headerClass}>
      <div className="site-header-blur" aria-hidden="true">
        {headerBlurLayers.map((style, index) => <span key={index} style={style} />)}
      </div>
      <div className="site-header-inner">
        <div className="site-header-left">
          <a href="/" aria-label="Col, Collection of Libraries" className="site-header-brand">
            <Image src="/brand/col-mark.png" alt="" width={24} height={24} className="brand-mark" priority />
            <span>Col</span>
          </a>
          <span className="site-header-divider" aria-hidden="true">/</span>
          <nav
            ref={linksRef}
            aria-label="Primary"
            className="site-header-links"
            onMouseLeave={restoreActiveHighlight}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
                restoreActiveHighlight();
              }
            }}
          >
            <span ref={highlightRef} className="site-header-link-highlight" aria-hidden="true" />
            {links.map(([label, href]) => {
              const active = !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="site-header-link"
                  onMouseEnter={(event) => positionHighlight(event.currentTarget)}
                  onFocus={(event) => positionHighlight(event.currentTarget)}
                  onClick={(event) => {
                    if (!href.includes("#")) pendingLinkRef.current = event.currentTarget;
                    positionHighlight(event.currentTarget);
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="site-header-actions">
          <form
            role="search"
            className="site-header-search"
            onSubmit={(event) => {
              event.preventDefault();
              const query = searchQuery.trim();
              if (query) window.location.assign(`/libraries?q=${encodeURIComponent(query)}`);
            }}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false);
            }}
          >
            <Search size={14} aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                  event.currentTarget.blur();
                }
              }}
              placeholder="Search libraries"
              aria-label="Search libraries or components"
            />
            <kbd>/</kbd>
            {searchOpen && searchQuery.trim() && (
              <div className="site-header-search-results" aria-label="Library search results">
                {searchResults.length ? (
                  <ul>
                    {searchResults.map(({ library, components }) => (
                      <li key={library.slug}>
                        <Link href={libraryPath(library.slug)} onClick={() => setSearchOpen(false)}>
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
          <ThemeToggle />
          <a href="https://github.com/screen-gd/Col" target="_blank" rel="noopener noreferrer" className="site-header-github" aria-label={`Col on GitHub${stars === null ? "" : `, ${stars} stars`}`}>
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
            <span>{stars === null ? "..." : compactNumber.format(stars)}</span>
          </a>
          <Button
            type="button"
            variant="ghost"
            className="site-header-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-header-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </Button>
        </div>

        {menuOpen && (
          <nav id="site-header-mobile-menu" aria-label="Mobile primary" className="site-header-mobile-menu">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={!href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`)) ? "page" : undefined}>{label}</a>)}
          </nav>
        )}
      </div>
    </header>
  );
}
