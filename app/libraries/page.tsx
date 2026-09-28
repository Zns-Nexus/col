import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { Header } from "@/components/Header";

export default async function LibrariesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return (
    <div className="library-page-shell">
      <Header variant="library" />
      <main className="library-page-main w-full max-w-full overflow-x-clip">
        <DirectoryExplorer initialQuery={q} />
      </main>
    </div>
  );
}
