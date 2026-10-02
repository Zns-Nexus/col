import { pageMetadata } from "@/lib/site";
import { DirectoryExplorer } from "@/components/DirectoryExplorer";

export const metadata = pageMetadata(
  "/libraries",
  "UI Libraries for React, Tailwind CSS and More | Col",
  "Browse UI libraries by stack, category, and use case. Find documented components, save a shortlist locally, and open official documentation.",
);

export default async function LibrariesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return <DirectoryExplorer initialQuery={q} />;
}
