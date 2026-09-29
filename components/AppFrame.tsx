"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { BrandLink, GitHubStars, SiteSearch, useGitHubStars } from "./SiteChrome";
import { SIDEBAR_SLOT_ID } from "./SidebarSlot";
import { ThemeToggle } from "./ThemeToggle";

type SidebarMode = "narrow" | "wide" | "rail";

function sidebarModeFor(pathname: string): SidebarMode {
  if (pathname === "/docs" || pathname.startsWith("/docs/")) return "rail";
  if (pathname === "/libraries") return "wide";
  return "narrow";
}

/**
 * The one layout every route shares: a sidebar (brand, search, navigation,
 * page-specific content, repo links) and the content card. The sidebar is
 * narrow by default, widens on the directory to fit its filters, and on docs
 * collapses the navigation to an icon rail with the docs navigation beside it.
 * Small screens get a compact top bar instead.
 */
export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mode = sidebarModeFor(pathname);
  const rail = mode === "rail";
  const stars = useGitHubStars();
  const panelRef = useRef<HTMLElement>(null);

  // The content card is the scroll container, so reset it on navigation the way
  // the browser would reset the window.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      const slash = event.key === "/" && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
      const command = (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k";
      if (!slash && !command) return;
      // The directory owns its search; elsewhere focus whichever site search is on screen.
      const visibleSearch = [...document.querySelectorAll<HTMLInputElement>("[data-site-search]")].find((input) => input.offsetParent !== null);
      const field = document.getElementById("library-search") ?? visibleSearch;
      if (!field) return;
      event.preventDefault();
      field.focus();
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="app-frame library-page-shell" data-sidebar={mode} data-rail={rail ? "" : undefined}>
      <Header />
      <aside className="app-frame-sidebar" aria-label="Sidebar">
        <div className="app-frame-brand"><BrandLink /></div>
        <div className="app-frame-search"><SiteSearch collapsed={rail} /></div>
        <div className="app-frame-nav"><AppSidebar collapsed={rail} /></div>
        <div id={SIDEBAR_SLOT_ID} className="app-frame-slot" />
        <div className="app-frame-footer">
          <GitHubStars stars={stars} />
          <ThemeToggle />
        </div>
      </aside>
      <main ref={panelRef} className="app-frame-panel">
        {children}
      </main>
    </div>
  );
}
