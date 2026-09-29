"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

type DocsPage = readonly [href: string, label: string];

const sections: readonly { title: string; pages: readonly DocsPage[] }[] = [
  {
    title: "Get started",
    pages: [
      ["/docs", "Overview"],
      ["/docs/find-a-library", "Find a library"],
    ],
  },
  {
    title: "Contribute",
    pages: [
      ["/docs/request-a-library", "Request a library"],
      ["/docs/report-issues", "Report issues"],
      ["/docs/pull-requests", "Open a pull request"],
    ],
  },
];

const pages: readonly DocsPage[] = sections.flatMap(({ pages: sectionPages }) => sectionPages);

/**
 * Keeps an absolutely positioned pill on the item matching `selector` inside
 * `container`, so the pill slides from item to item as the selection changes.
 */
function useSlidingPill(container: RefObject<HTMLElement | null>, selector: string, deps: unknown[]) {
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const box = container.current;
    const target = box?.querySelector<HTMLElement>(selector);
    // Measure against the container itself: nested lists are positioned, so offsetTop would be list-relative.
    const top = target && box ? target.getBoundingClientRect().top - box.getBoundingClientRect().top : 0;
    setStyle(target ? { transform: `translateY(${top}px)`, height: target.offsetHeight, opacity: 1 } : { opacity: 0 });
    // Place the pill without animating on first paint; slide on every change after that.
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { style, ready };
}

/** Section navigation for the docs, with the same sliding pill as the main sidebar. */
export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groupsRef = useRef<HTMLDivElement>(null);
  const current = pages.find(([href]) => href === pathname);
  const pill = useSlidingPill(groupsRef, '[aria-current="page"]', [pathname, open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav aria-label="Documentation pages" className="docs-nav">
      <button type="button" className="docs-nav-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span className="cap">{current?.[1] ?? "Documentation"}</span>
        <ChevronDown aria-hidden />
      </button>
      <div ref={groupsRef} className="docs-nav-groups" data-open={open}>
        <span className="docs-nav-pill" data-ready={pill.ready} style={pill.style} aria-hidden />
        {sections.map(({ title, pages: sectionPages }) => (
          <div key={title} className="docs-nav-group">
            <p className="docs-nav-heading">{title}</p>
            <ul>
              {sectionPages.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} aria-current={pathname === href ? "page" : undefined} className="docs-nav-link">
                    <span className="cap">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

/**
 * Wraps the docs page body and replays an entrance on every page change: the
 * new page slides in from the side you are moving towards.
 */
export function DocsTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const index = pages.findIndex(([href]) => href === pathname);
  const previousIndex = useRef<number | null>(null);
  const direction = previousIndex.current === null ? "initial" : index >= previousIndex.current ? "forward" : "back";

  useEffect(() => {
    previousIndex.current = index;
  }, [index]);

  return (
    <div key={pathname} className="docs-page" data-direction={direction}>
      {children}
    </div>
  );
}

/** Previous and next page links at the end of each docs page. */
export function DocsPageNavigation() {
  const pathname = usePathname();
  const index = pages.findIndex(([href]) => href === pathname);
  if (index < 0) return null;

  const previous = pages[index - 1];
  const next = pages[index + 1];

  return (
    <nav aria-label="Documentation pagination" className="docs-pager">
      {previous ? (
        <Link href={previous[0]} aria-label={`Previous: ${previous[1]}`} className="docs-pager-link">
          <ArrowLeft className="docs-pager-arrow" aria-hidden />
          <span className="docs-pager-copy">
            <span className="docs-pager-label">Previous</span>
            <span className="docs-pager-title">{previous[1]}</span>
          </span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next[0]} aria-label={`Next: ${next[1]}`} className="docs-pager-link docs-pager-next">
          <span className="docs-pager-copy">
            <span className="docs-pager-label">Next</span>
            <span className="docs-pager-title">{next[1]}</span>
          </span>
          <ArrowRight className="docs-pager-arrow" aria-hidden />
        </Link>
      ) : <span />}
    </nav>
  );
}

/** "On this page": the page's section headings, with a pill that follows the one being read. */
export function DocsToc() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [items, setItems] = useState<{ id: string; title: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const pill = useSlidingPill(listRef, '[aria-current="location"]', [active, items]);

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLElement>(".docs-layout-main h2[id]")];
    setItems(headings.map((heading) => ({ id: heading.id, title: heading.dataset.title ?? heading.textContent ?? "" })));
    setActive(headings[0]?.id ?? null);
    const root = document.querySelector(".app-frame-panel");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { root, rootMargin: "0px 0px -65% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [pathname]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="docs-toc">
      <p className="docs-nav-heading">On this page</p>
      <ul ref={listRef}>
        <li className="docs-toc-pill" data-ready={pill.ready} style={pill.style} aria-hidden role="presentation" />
        {items.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className="docs-toc-link"
              onClick={(event) => {
                const target = document.getElementById(id);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
                history.replaceState(null, "", `#${id}`);
                setActive(id);
              }}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
