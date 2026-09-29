import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, GitBranch } from "lucide-react";
import type { Library } from "@/data/libraries";
import type { LibraryDetails } from "@/data/library-details";
import { Badge } from "@/components/ui/badge";
import { hostname } from "@/lib/utils";
import { CopyButton } from "./CopyButton";
import { LibraryLogo } from "./LibraryLogo";

interface LibraryDetailProps {
  library: Library;
  details: LibraryDetails;
}

/** Shared detail-page layout for a single library; all content comes from props. */
export function LibraryDetail({ library, details }: LibraryDetailProps) {
  const install = details.install ?? [];
  const gettingStarted = details.gettingStarted;

  return (
    <article className={`relative isolate mx-auto w-full px-5 pt-6 pb-20 sm:px-8 ${details.preview ? "max-w-6xl" : "max-w-4xl"}`}>
      <Link
        href="/libraries"
        className="docs-text-link theme-muted inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All libraries
      </Link>

      <div className="theme-border mt-4 border-b pb-10">
        <header className={details.preview ? "max-w-xl" : ""}>
          <div className="flex items-center gap-4">
            <span className="theme-border grid size-12 shrink-0 place-items-center rounded-xl border bg-white/[0.035]">
              <LibraryLogo url={library.url} name={library.name} size={30} />
            </span>
            <div className="min-w-0">
              <h1 className="theme-text truncate text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{library.name}</h1>
              <p className="library-subtle mt-1 truncate text-sm">{hostname(library.url)}</p>
            </div>
          </div>

          <p className="theme-muted mt-6 max-w-[65ch] text-base leading-7">{library.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="library-chip px-2.5 py-1 text-xs">{library.category}</Badge>
          </div>

          <dl className="mt-4 space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <dt className="library-subtle shrink-0 text-xs sm:w-24">Stacks</dt>
              <dd className="flex flex-wrap gap-1.5">
                {library.stacks.map((stack) => (
                  <Badge key={stack} variant="outline" className="library-chip px-2 py-0.5 text-[11px]">{stack}</Badge>
                ))}
              </dd>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <dt className="library-subtle shrink-0 text-xs sm:w-24">Use cases</dt>
              <dd className="flex flex-wrap gap-1.5">
                {library.useCases.map((useCase) => (
                  <Badge key={useCase} variant="outline" className="library-chip px-2 py-0.5 text-[11px]">{useCase}</Badge>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={library.url} className="hero-cta hero-cta-primary">
              Visit website <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href={details.docsUrl} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-secondary">
              Documentation <BookOpen className="size-4" aria-hidden />
            </a>
            {details.repoUrl && (
              <a href={details.repoUrl} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-secondary">
                Repository <GitBranch className="size-4" aria-hidden />
              </a>
            )}
          </div>
        </header>
      </div>

      {install.length > 0 && (
        <section className="mt-10">
          <h2 className="theme-text text-2xl font-semibold tracking-[-0.025em]">Installation</h2>
          <div className="mt-4 space-y-4">
            {install.map((step) => (
              <figure key={step.command} className="library-chip overflow-hidden rounded-xl border">
                <figcaption className="theme-border flex items-center justify-between gap-3 border-b px-4 py-2">
                  <span className="truncate text-xs font-medium">{step.label}</span>
                  <CopyButton text={step.command} ariaLabel={`Copy command: ${step.label}`} />
                </figcaption>
                <pre className="theme-text overflow-x-auto px-4 py-3.5 text-sm"><code className="font-mono">{step.command}</code></pre>
              </figure>
            ))}
          </div>
        </section>
      )}

      {gettingStarted.length > 0 && (
        <section className="mt-10">
          <h2 className="theme-text text-2xl font-semibold tracking-[-0.025em]">Getting started</h2>
          <ol className="theme-muted mt-4 list-decimal space-y-3 pl-5 leading-7 marker:font-semibold marker:text-cyan-400">
            {gettingStarted.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="theme-text text-2xl font-semibold tracking-[-0.025em]">Agent setup prompt</h2>
          <CopyButton text={details.agentPrompt} label="Copy prompt" ariaLabel="Copy agent setup prompt" />
        </div>
        <p className="theme-muted mt-2 text-sm leading-6">
          Paste this into a coding agent to set {library.name} up in an existing project.
        </p>
        <div className="library-chip mt-4 overflow-hidden rounded-xl border">
          <pre className="theme-text whitespace-pre-wrap break-words px-4 py-4 font-mono text-sm leading-6">{details.agentPrompt}</pre>
        </div>
      </section>
    </article>
  );
}
