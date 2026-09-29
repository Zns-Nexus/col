import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, GitBranch } from "lucide-react";
import type { Library } from "@/data/libraries";
import type { LibraryDetails } from "@/data/library-details";
import { libraryPreviews } from "@/data/library-previews";
import { hostname } from "@/lib/utils";
import { AgentPrompt, InstallTabs } from "./LibraryDetailParts";
import { LibraryLogo } from "./LibraryLogo";
import { categoryIcons } from "./MaskIcon";

interface LibraryDetailProps {
  library: Library;
  details: LibraryDetails;
}

const URL_PATTERN = /(https?:\/\/[^\s)"'<>]+[^\s).,;"'<>])/g;

/** Turns bare URLs in a getting-started step into links. */
function linkify(text: string): ReactNode[] {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, index) => {
    // Odd parts are URLs; leave templates such as https://site/r/{name}.json or /r/<slug> as plain text.
    const isLink = index % 2 === 1 && !part.includes("{") && !/^[{<]/.test(parts[index + 1] ?? "");
    return isLink
      ? <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https?:\/\//, "")}</a>
      : part;
  });
}

/** Staggered entrance order for each block of the page. */
const reveal = (index: number) => ({ "--i": index }) as CSSProperties;

/** Shared detail-page layout for a single library; all content comes from props. */
export function LibraryDetail({ library, details }: LibraryDetailProps) {
  const install = details.install ?? [];
  const preview = libraryPreviews[library.slug] ?? (details.preview ? { src: details.preview.src, width: 1200, height: 630 } : undefined);
  const previewAlt = details.preview?.alt ?? `${library.name} website preview`;
  const CategoryIcon = categoryIcons[library.category];

  return (
    <article className="ld">
      <Link href="/libraries" className="ld-back ld-reveal" style={reveal(0)}>
        <ArrowLeft aria-hidden />
        <span className="cap">Libraries</span>
      </Link>

      <div className="ld-layout">
        <div className="ld-main">
          <header className="ld-head ld-reveal" style={reveal(1)}>
            <div className="ld-identity">
              <span className="ld-logo">
                <LibraryLogo url={library.url} name={library.name} size={26} />
              </span>
              <div className="ld-identity-text">
                <h1>{library.name}</h1>
                <a href={library.url} target="_blank" rel="noopener noreferrer" className="ld-host">
                  <span className="cap">{hostname(library.url)}</span>
                  <ArrowUpRight aria-hidden />
                </a>
              </div>
            </div>
            <p className="ld-description">{library.description}</p>
          </header>

          {install.length > 0 && (
            <section className="ld-section ld-reveal" style={reveal(3)} aria-labelledby="ld-install">
              <h2 id="ld-install">Install</h2>
              <InstallTabs steps={install} />
            </section>
          )}

          {details.gettingStarted.length > 0 && (
            <section className="ld-section ld-reveal" style={reveal(4)} aria-labelledby="ld-start">
              <h2 id="ld-start">Getting started</h2>
              <ol className="ld-timeline">
                {details.gettingStarted.map((step, index) => (
                  <li key={index}>
                    <span className="ld-timeline-dot" aria-hidden>{index + 1}</span>
                    <p>{linkify(step)}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="ld-section ld-reveal" style={reveal(5)} aria-labelledby="ld-agent">
            <h2 id="ld-agent">Agent setup prompt</h2>
            <p className="ld-section-note">Paste this into a coding agent to set {library.name} up in an existing project.</p>
            <AgentPrompt prompt={details.agentPrompt} />
          </section>
        </div>

        <aside className="ld-side ld-reveal" style={reveal(2)} aria-label={`About ${library.name}`}>
          <div className="ld-side-card">
            {preview && (
              <figure className="ld-side-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview.src} alt={previewAlt} width={preview.width} height={preview.height} />
              </figure>
            )}
            <div className="ld-side-body">
              <div className="ld-actions">
                <a href={library.url} target="_blank" rel="noopener noreferrer" className="ld-button ld-button-primary">
                  <span className="cap">Visit website</span>
                  <ArrowUpRight aria-hidden />
                </a>
                <div className="ld-actions-row">
                  <a href={details.docsUrl} target="_blank" rel="noopener noreferrer" className="ld-button">
                    <BookOpen aria-hidden />
                    <span className="cap">Docs</span>
                  </a>
                  {details.repoUrl && (
                    <a href={details.repoUrl} target="_blank" rel="noopener noreferrer" className="ld-button">
                      <GitBranch aria-hidden />
                      <span className="cap">Source</span>
                    </a>
                  )}
                </div>
              </div>

              <dl className="ld-facts">
                <div>
                  <dt>Category</dt>
                  <dd>
                    <span className="ld-chip">
                      <CategoryIcon className="ld-chip-icon" />
                      <span className="cap">{library.category}</span>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Stacks</dt>
                  <dd>{library.stacks.map((stack) => <span key={stack} className="ld-chip"><span className="cap">{stack}</span></span>)}</dd>
                </div>
                <div>
                  <dt>Use cases</dt>
                  <dd>{library.useCases.map((useCase) => <span key={useCase} className="ld-chip"><span className="cap">{useCase}</span></span>)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
