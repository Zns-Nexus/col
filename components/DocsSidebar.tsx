"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const getStarted = [
  ["/docs", "Overview"],
  ["/docs/find-a-library", "Find a library"],
] as const;

const contribute = [
  ["/docs/request-a-library", "Request a library"],
  ["/docs/report-issues", "Report issues"],
  ["/docs/pull-requests", "Open a pull request"],
] as const;

const pages = [...getStarted, ...contribute];

export function DocsPageNavigation() {
  const pathname = usePathname();
  const index = pages.findIndex(([href]) => href === pathname);
  if (index < 0) return null;

  const previous = pages[index - 1];
  const next = pages[index + 1];

  return (
    <nav aria-label="Documentation pagination" className="theme-border mt-12 flex items-center justify-between gap-6 border-t pt-6 text-sm">
      {previous ? <Link href={previous[0]} className="docs-rail-link inline-flex items-center gap-2 font-medium"><ArrowLeft className="size-4" aria-hidden /> Previous: {previous[1]}</Link> : <span />}
      {next && <Link href={next[0]} className="docs-rail-link inline-flex items-center gap-2 text-right font-medium">Next: {next[1]} <ArrowRight className="size-4 shrink-0" aria-hidden /></Link>}
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const pendingLinkRef = useRef<HTMLAnchorElement>(null);

  const positionHighlight = useCallback((link: HTMLAnchorElement | null) => {
    const container = linksRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight || !link) return;

    const linkRect = link.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translate(${linkRect.left - containerRect.left}px, ${linkRect.top - containerRect.top}px)`;
    highlight.style.opacity = "1";
  }, []);

  const restoreActiveHighlight = useCallback(() => {
    if (pendingLinkRef.current && linksRef.current?.contains(pendingLinkRef.current)) {
      positionHighlight(pendingLinkRef.current);
      return;
    }
    const activeLink = linksRef.current?.querySelector<HTMLAnchorElement>('[aria-current="page"]');
    if (activeLink) positionHighlight(activeLink);
    else if (highlightRef.current) highlightRef.current.style.opacity = "0";
  }, [positionHighlight]);

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

  return (
    <nav aria-label="Documentation pages" className="docs-sidebar">
      <Button type="button" variant="ghost" className="docs-mobile-toggle theme-text min-h-11 w-full justify-between px-0 text-sm hover:bg-transparent" aria-expanded={open} onClick={() => setOpen((current) => !current)}>Documentation menu <ChevronDown className={`size-4 ${open ? "rotate-180" : ""}`} aria-hidden /></Button>
      <div className={`docs-sidebar-content ${open ? "docs-sidebar-content-open" : ""}`}>
      <div
        ref={linksRef}
        className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
        onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}
        onMouseLeave={restoreActiveHighlight}
        onBlur={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) restoreActiveHighlight();
        }}
      >
        <span ref={highlightRef} className="docs-sidebar-link-highlight" aria-hidden="true" />
        <div>
          <p className="docs-sidebar-heading mb-2 px-3 text-xs font-semibold">Get started</p>
          <ul className="space-y-0.5 text-sm">
            {getStarted.map(([href, label]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined} className="docs-sidebar-link relative z-10 block rounded-md px-3 py-2" onMouseEnter={(event) => positionHighlight(event.currentTarget)} onFocus={(event) => positionHighlight(event.currentTarget)} onClick={(event) => { pendingLinkRef.current = event.currentTarget; positionHighlight(event.currentTarget); }}>{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="docs-sidebar-heading mb-2 px-3 text-xs font-semibold">Contribute</p>
          <ul className="space-y-0.5 text-sm">
            {contribute.map(([href, label]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined} className="docs-sidebar-link relative z-10 block rounded-md px-3 py-2" onMouseEnter={(event) => positionHighlight(event.currentTarget)} onFocus={(event) => positionHighlight(event.currentTarget)} onClick={(event) => { pendingLinkRef.current = event.currentTarget; positionHighlight(event.currentTarget); }}>{label}</Link></li>)}
          </ul>
        </div>
      </div>
      </div>
    </nav>
  );
}
