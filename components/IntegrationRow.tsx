import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { integrationTypes, type Integration } from "@/data/integrations";
import { publisherOf } from "@/lib/integration-directory";
import { integrationPath } from "@/lib/site";
import { LibraryLogo } from "./LibraryLogo";

/** One integration in the directory list, in the same row shape as the library list view. */
export function IntegrationRow({ integration }: { integration: Integration }) {
  const tags = [...integrationTypes(integration), publisherOf(integration)];
  return (
    <article className="lib-row group">
      <span className="lib-row-logo" aria-hidden>
        <LibraryLogo url={integration.provider.url} name={integration.provider.name} size={20} />
      </span>
      <div className="lib-row-id">
        <Link href={integrationPath(integration.slug)} className="lib-row-name">{integration.name}</Link>
        <span className="lib-row-host">{integration.provider.name}</span>
      </div>
      <p className="lib-row-desc">{integration.description}</p>
      <div className="lib-row-tags">
        {tags.map((tag) => <span key={tag} className="lib-tag"><span className="cap">{tag}</span></span>)}
      </div>
      <div className="lib-row-actions">
        <a href={integration.url} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${integration.name} setup guide`} className="lib-row-action">
          <ArrowUpRight aria-hidden />
        </a>
      </div>
    </article>
  );
}
