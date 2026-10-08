"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLink, RepoStars, SiteSearch, useRepoStars } from "./SiteChrome";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Libraries", "/libraries"],
  ["Integrations", "/integrations"],
  ["MCP", "/mcp"],
  ["Docs", "/docs"],
  ["Contributors", "/contributors"],
  ["Sponsors", "/sponsors"],
] as const;

/** Compact top bar for small screens. On desktop the sidebar carries all of this. */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const stars = useRepoStars();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerClass = "site-header site-header-solid site-header-app";

  return (
    <header className={headerClass}>
      <div className="site-header-inner">
        <div className="site-header-left">
          <BrandLink />
        </div>

        <div className="site-header-actions">
          <SiteSearch className="site-header-search" />
          <ThemeToggle />
          <RepoStars stars={stars} className="site-header-repo" />
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
            {links.map(([label, href]) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={active ? "page" : undefined}>{label}</a>;
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
