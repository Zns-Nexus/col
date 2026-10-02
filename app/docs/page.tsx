import { pageMetadata } from "@/lib/site";
import { DocsHeader, DocsLinks, DocsList, DocsSection, DocsText } from "@/components/DocsUI";

export const metadata = pageMetadata(
  "/docs",
  "Docs | Col",
  "Learn how to find UI libraries, search documented components, save a shortlist, and contribute to Col.",
);

export default function DocsPage() {
  return (
    <article>
      <DocsHeader
        section="Get started"
        title="Introduction"
        lead="Col is an open-source directory for discovering UI libraries by category, stack, and use case."
      >
        Find a library, narrow the results, then visit its official project page. You can save useful entries locally and request anything missing.
      </DocsHeader>

      <DocsSection title="Start here">
        <DocsLinks
          items={[
            { href: "/libraries", title: "Browse the directory", text: "Search by name, keyword, category, or use case." },
            { href: "/docs/find-a-library", title: "Find a library", text: "Filter by stack and compare the options that fit." },
            { href: "/docs/agents", title: "Agents and LLMs", text: "Use the catalog with your agent and verify recommendations." },
            { href: "/docs/request-a-library", title: "Request a library", text: "Missing something useful? Ask for it on GitHub." },
          ]}
        />
      </DocsSection>

      <DocsSection title="What Col does">
        <DocsText>
          Col catalogs libraries, and for many of them a verified list of the components they document. Each listing has a category, supported stacks, and use cases so you can decide where to look next without opening dozens of tabs.
        </DocsText>
        <DocsList
          items={[
            "Explore libraries across the directory’s categories.",
            "Search by component name and jump to that component’s official docs.",
            "Save entries in your browser for later.",
            "Request a library or contribute an improvement on GitHub.",
          ]}
        />
      </DocsSection>
    </article>
  );
}
