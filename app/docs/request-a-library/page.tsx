import type { Metadata } from "next";
import { DocsButton, DocsHeader, DocsList, DocsSection, DocsText } from "@/components/DocsUI";

export const metadata: Metadata = { title: "Request a library — Col" };

export default function RequestLibraryPage() {
  return (
    <article>
      <DocsHeader section="Contribute" title="Request a library" lead="If a useful UI library is missing, send a request with enough detail for it to be reviewed." />

      <DocsSection title="Before you request">
        <DocsText>Search the directory, existing issues, and open pull requests to avoid duplicates.</DocsText>
      </DocsSection>

      <DocsSection title="What to include">
        <DocsList
          items={[
            "The library’s name and official URL.",
            "Supported stacks, category, and common use cases.",
            "A short explanation of who it helps.",
          ]}
        />
        <DocsButton href="https://github.com/screen-gd/Col/issues/new?template=library-request.yml">Open a library request</DocsButton>
      </DocsSection>
    </article>
  );
}
