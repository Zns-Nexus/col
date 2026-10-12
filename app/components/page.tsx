import { pageMetadata } from "@/lib/site";
import { ComponentsExplorer } from "@/components/ComponentsExplorer";

export const metadata = pageMetadata(
  "/components",
  "Search UI Components | Col",
  "Search UI components by name or alias across libraries, then select a match to view its official demo and documentation beside the results.",
);

export default async function ComponentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <ComponentsExplorer initialQuery={q} />;
}
