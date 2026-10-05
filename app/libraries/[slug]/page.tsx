import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LibraryDetail } from "@/components/LibraryDetail";
import { integrationsForLibrary } from "@/data/integrations";
import { libraries } from "@/data/libraries";
import { libraryDetails } from "@/data/library-details";
import { relatedLibraries } from "@/lib/related-libraries";
import { pageMetadata, libraryPath } from "@/lib/site";

interface LibraryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return libraries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LibraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const library = libraries.find((entry) => entry.slug === slug);
  if (!library) return {};

  const title = `${library.name} | Col`;
  const path = libraryPath(library.slug);
  return pageMetadata(path, title, library.description);
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { slug } = await params;
  const library = libraries.find((entry) => entry.slug === slug);
  const details = libraryDetails[slug];
  if (!library || !details) notFound();

  return <LibraryDetail library={library} details={details} related={relatedLibraries(library, libraries)} integrations={integrationsForLibrary(slug)} />;
}
