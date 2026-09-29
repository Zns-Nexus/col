import type { Metadata } from "next";
import { DocsButton, DocsHeader, DocsSection, DocsText } from "@/components/DocsUI";

export const metadata: Metadata = { title: "Report issues — Col" };

export default function ReportIssuesPage() {
  return (
    <article>
      <DocsHeader
        section="Contribute"
        title="Report issues"
        lead="Found something broken or have an idea for Col? Open a focused issue so it can be reproduced and discussed."
      >
        Search existing issues first. Keep one problem or requested outcome per issue.
      </DocsHeader>

      <DocsSection title="Report a bug">
        <DocsText>Include the page or action that failed, steps to reproduce it, what you expected, and what happened instead. Browser details, screenshots, or console errors help when the problem is visual or intermittent.</DocsText>
        <DocsButton href="https://github.com/screen-gd/Col/issues/new?template=bug-report.yml">Report a bug</DocsButton>
      </DocsSection>

      <DocsSection title="Request a feature">
        <DocsText>Lead with the problem you are trying to solve and the result you expect. A short example of how you would use it is more helpful than a long list of possible settings.</DocsText>
        <DocsButton href="https://github.com/screen-gd/Col/issues/new?template=feature-request.yml">Request a feature</DocsButton>
      </DocsSection>
    </article>
  );
}
