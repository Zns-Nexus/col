import { DirectoryExplorer } from "@/components/DirectoryExplorer";

export default async function LibrariesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return <DirectoryExplorer initialQuery={q} />;
}
