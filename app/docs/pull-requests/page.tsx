import type { Metadata } from "next";
import { DocsButton, DocsCode, DocsHeader, DocsSection, DocsText } from "@/components/DocsUI";

export const metadata: Metadata = { title: "Open a pull request — Col" };

export default function PullRequestsPage() {
  return (
    <article>
      <DocsHeader section="Contribute" title="Open a pull request" lead="Contributions to the directory are reviewed on GitHub." />

      <DocsSection title="Prepare your change">
        <DocsText>
          Fork the repository, create a focused branch, and keep unrelated changes out. Library additions belong in <code>data/libraries.ts</code> with a unique kebab-case slug, canonical URL, factual description, and existing taxonomy values where possible.
        </DocsText>
      </DocsSection>

      <DocsSection title="Check your changes">
        <DocsText>Run these from the repository root before you open the pull request.</DocsText>
        <DocsCode code={"npm install\nnpm run dev\nnpm run build"} />
      </DocsSection>

      <DocsSection title="Describe it">
        <DocsText>Explain what changed, why it changed, and how you verified it. Include screenshots for visible interface changes.</DocsText>
        <DocsButton href="https://github.com/screen-gd/Col/blob/main/CONTRIBUTING.md">Read the contribution guide</DocsButton>
      </DocsSection>
    </article>
  );
}
