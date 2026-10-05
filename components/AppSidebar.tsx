"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons, type IconComponent } from "./MaskIcon";

const items: readonly (readonly [string, string, IconComponent])[] = [
  ["Home", "/", Icons.home],
  ["Libraries", "/libraries", Icons.libraries],
  ["Integrations", "/integrations", Icons.integrations],
  ["MCP", "/mcp", Icons.integrations],
  ["Docs", "/docs", Icons.docs],
  ["Contributors", "/contributors", Icons.contributors],
  ["Sponsors", "/sponsors", Icons.sponsors],
];

export function AppSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Site" className="app-nav" data-collapsed={collapsed || undefined}>
      {items.map(([label, href, Icon]) => {
        const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? label : undefined}
            title={collapsed ? label : undefined}
            className="app-nav-link"
          >
            <Icon className="nav-icon" />
            <span className="app-nav-label cap">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
