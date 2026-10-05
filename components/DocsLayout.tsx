import type { ReactNode } from "react";
import { DocsPageNavigation, DocsSidebar, DocsToc, DocsTransition } from "./DocsSidebar";

/** Shared reading layout for the general docs and MCP guides. */
export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-layout">
      <aside className="docs-layout-nav"><DocsSidebar /></aside>
      <div className="docs-layout-main">
        <DocsTransition>
          {children}
          <DocsPageNavigation />
        </DocsTransition>
      </div>
      <aside className="docs-layout-toc"><DocsToc /></aside>
    </div>
  );
}
