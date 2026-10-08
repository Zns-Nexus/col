"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { BrandLink, RepoStars, SiteSearch, useRepoStars } from "./SiteChrome";
import { SIDEBAR_SLOT_ID } from "./SidebarSlot";
import { ThemeToggle } from "./ThemeToggle";

type SidebarMode = "narrow" | "wide";

/** Directories with a filter panel in the sidebar. */
const DIRECTORY_PATHS = new Set(["/libraries", "/integrations"]);

function sidebarModeFor(pathname: string): SidebarMode {
  return DIRECTORY_PATHS.has(pathname) ? "wide" : "narrow";
}

/**
 * The one layout every route shares: a sidebar (brand, search, navigation,
 * page-specific content, repo links) and the content card. The sidebar is
 * narrow by default and widens on the directories to fit their filters. Small
 * screens get a compact top bar instead.
 */
export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mode = sidebarModeFor(pathname);
  const stars = useRepoStars();
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
      // Focus whichever search field is on screen: the directory search on a directory, the site search elsewhere.
      const field = [...document.querySelectorAll<HTMLInputElement>("[data-directory-search], [data-site-search]")].find((input) => input.offsetParent !== null);
      if (!field) return;
      event.preventDefault();
      field.focus();
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="app-frame library-page-shell" data-sidebar={mode}>
      <Header />
      <aside className="app-frame-sidebar" aria-label="Sidebar">
        <div className="app-frame-brand"><BrandLink /></div>
        <div className="app-frame-search"><SiteSearch /></div>
        <div className="app-frame-nav"><AppSidebar /></div>
        <div id={SIDEBAR_SLOT_ID} className="app-frame-slot" />
        <div className="app-frame-footer">
          <RepoStars stars={stars} />
          <ThemeToggle />
        </div>
      </aside>
      <main ref={panelRef} className="app-frame-panel">
        {children}
      </main>
    </div>
  );
}
