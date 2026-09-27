import { DocsPageNavigation, DocsSidebar } from "@/components/DocsSidebar";
import { Header } from "@/components/Header";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, libraries } from "@/data/libraries";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="docs-page-shell grid min-h-screen gap-10 px-5 pt-24 pb-20 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[14rem_minmax(0,1fr)_18rem] xl:gap-14">
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <DocsSidebar />
        </aside>
        <div className="docs-copy mx-auto w-full min-w-0 max-w-[76ch]">{children}<DocsPageNavigation /></div>
        <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start" aria-label="Explore Col">
          <div className="docs-rail-panel overflow-hidden rounded-xl border">
            <div className="docs-rail-art flex h-36 items-end px-5 pb-4">
              <span className="text-2xl font-semibold tracking-tight text-white">Col</span>
            </div>
            <div className="p-5">
              <h2 className="theme-text text-lg font-semibold">Find your next UI library</h2>
              <p className="theme-muted mt-2 text-sm leading-6">Browse {libraries.length} libraries across {CATEGORIES.length} categories, then visit each project at its official source.</p>
              <a className="docs-rail-cta mt-5 flex items-center justify-between rounded-md px-4 py-2.5 text-sm font-semibold" href="/libraries">
                Browse libraries <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
          <div className="docs-rail-panel mt-4 rounded-xl border p-5">
            <h2 className="theme-text text-sm font-semibold">Help improve Col</h2>
            <p className="theme-muted mt-2 text-sm leading-6">Missing a library or found an issue?</p>
            <a className="docs-rail-link mt-4 inline-flex items-center gap-2 text-sm font-medium" href="/docs/request-a-library">Contribute to the directory <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </aside>
      </main>
    </>
  );
}
