import { pageMetadata } from "@/lib/site";
import { DocsButton, DocsHeader, DocsNote, DocsSection, DocsText } from "@/components/DocsUI";

export const metadata = pageMetadata(
  "/docs/find-a-library",
  "Find a UI Library | Col",
  "Search UI libraries by component, framework, category, and use case. Filter results and save useful libraries locally.",
);

export default function FindLibraryPage() {
  return (
    <article>
      <DocsHeader section="Get started" title="Find a library" lead="Use the directory to move from a broad idea to a short list of relevant UI libraries." />

      <DocsSection title="Search">
        <DocsText>Search by name, keyword, category, stack, or use case. A homepage search opens the directory with your query already applied.</DocsText>
      </DocsSection>

      <DocsSection title="Search by component">
        <DocsText>Search for a component such as “date picker” or “cmdk” to find the libraries that document it. Each match links straight to that component’s official documentation, so you can confirm it is really there.</DocsText>
        <DocsNote>Component coverage is partial and grows by contribution. A component missing from Col is not necessarily missing from the library, and Col never lists a component just because a library’s tags are broad.</DocsNote>
      </DocsSection>

      <DocsSection title="Filter and compare">
        <DocsText>Narrow results by category, supported stack, and use case. Open a listing for setup steps and links to the project’s official documentation.</DocsText>
      </DocsSection>

      <DocsSection title="Save for later">
        <DocsText>Save useful entries locally in your browser and return to them from the directory.</DocsText>
        <DocsButton href="/libraries">Browse all libraries</DocsButton>
      </DocsSection>
    </article>
  );
}
