import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { LibraryDetail } from "@/components/LibraryDetail";
import { libraries } from "@/data/libraries";
import { libraryDetails } from "@/data/library-details";
import { socialImage, libraryPath } from "@/lib/site";

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

  const title = `${library.name} — Col`;
  const path = libraryPath(library.slug);
  return {
    title,
    description: library.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: library.description,
      url: path,
      siteName: "Col",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, type: "image/jpeg", alt: "Col: UI libraries. All in one place." }],
    },
  };
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { slug } = await params;
  const library = libraries.find((entry) => entry.slug === slug);
  const details = libraryDetails[slug];
  if (!library || !details) notFound();

  return (
    <>
      <LibraryDetail library={library} details={details} />
      <SiteFooter />
    </>
  );
}
