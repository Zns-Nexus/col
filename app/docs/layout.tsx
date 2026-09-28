import { DocsPageNavigation, DocsSidebar } from "@/components/DocsSidebar";
import { Header } from "@/components/Header";
import styles from "./docs.module.css";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="docs-page-shell grid min-h-screen gap-10 px-5 pt-24 pb-20 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
        <aside className={`${styles.sidebarColumn} min-w-0`}>
          <div className={styles.sidebarFixed}>
            <DocsSidebar />
          </div>
        </aside>
        <div className="docs-copy mx-auto w-full min-w-0 max-w-[76ch]">{children}<DocsPageNavigation /></div>
      </main>
    </>
  );
}
