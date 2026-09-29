import { DocsPageNavigation, DocsSidebar, DocsToc, DocsTransition } from "@/components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <aside className="docs-layout-nav">
        <DocsSidebar />
      </aside>
      <div className="docs-layout-main">
        <DocsTransition>
          {children}
          <DocsPageNavigation />
        </DocsTransition>
      </div>
      <aside className="docs-layout-toc">
        <DocsToc />
      </aside>
    </div>
  );
}
