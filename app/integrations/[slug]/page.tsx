import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetail } from "@/components/IntegrationDetail";
import { integrations } from "@/data/integrations";
import { libraryBySlug } from "@/data/libraries";
import { integrationPath, pageMetadata } from "@/lib/site";

interface IntegrationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return integrations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: IntegrationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = integrations.find((entry) => entry.slug === slug);
  if (!integration) return {};

  return pageMetadata(integrationPath(integration.slug), `${integration.name} | Col`, integration.description);
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
  const { slug } = await params;
  const integration = integrations.find((entry) => entry.slug === slug);
  if (!integration) notFound();

  // libraryBySlug throws on a stale slug, so a broken link fails the build.
  const library = integration.library ? libraryBySlug(integration.library) : undefined;
  return <IntegrationDetail integration={integration} library={library} />;
}
