import { ArrowUpRight, Heart, Layers3, Target } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Library } from "@/data/libraries";
import type { LibraryComponent } from "@/data/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MinimalCard, MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from "@/components/ui/minimal-card";
import { LibraryLogo } from "./LibraryLogo";
import { hostname } from "@/lib/utils";
import { libraryPath } from "@/lib/site";

interface LibraryCardProps {
  library: Library;
  layout: "grid" | "line";
  /** Components the query matched, ordered by relevance. */
  matches: LibraryComponent[];
  saved: boolean;
  onToggleSaved: () => void;
}

export function LibraryCard({ library, layout, matches, saved, onToggleSaved }: LibraryCardProps) {
  const handleToggleSaved = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.dataset.clicked = "true";
    onToggleSaved();
  };

  if (layout === "grid") {
    return (
      <MinimalCard className="library-grid-card group relative flex min-w-0 flex-col">
        <MinimalCardImage
          src={`https://www.google.com/s2/favicons?domain=${hostname(library.url)}&sz=128`}
          alt=""
          fallback={
            <span aria-hidden className="absolute inset-0 grid place-items-center rounded-xl bg-neutral-200 text-5xl font-semibold text-neutral-500 dark:bg-neutral-700 dark:text-neutral-300">
              {library.name.slice(0, 1).toUpperCase()}
            </span>
          }
          className="library-card-image mb-3 h-40 2xl:h-48"
        />
        <Button type="button" size="icon-sm" variant="ghost" onClick={handleToggleSaved} aria-label={saved ? `Remove ${library.name} from saved` : `Save ${library.name}`} aria-pressed={saved} className="library-save library-grid-save absolute right-4 top-4 z-10 size-8 min-h-8 min-w-8 p-0">
          <Heart className="size-3.5" fill={saved ? "currentColor" : "none"} aria-hidden />
        </Button>
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          <Link href={libraryPath(library.slug)} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2">
            <MinimalCardTitle className="mt-0 px-0">{library.name}</MinimalCardTitle>
          </Link>
          {matches.slice(0, 2).map((component) => (
            <a key={component.url} href={component.url} target="_blank" rel="noopener noreferrer" className="library-chip relative z-10 max-w-full rounded-md border px-1.5 py-0.5 text-[10px] break-words hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2">
              {component.name}
            </a>
          ))}
          {matches.length > 2 && <span className="library-subtle text-[10px]">+{matches.length - 2}</span>}
        </div>
        <MinimalCardDescription className="library-grid-description mt-1 leading-5">
          {library.description}
        </MinimalCardDescription>
      </MinimalCard>
    );
  }

  return (
    <Card className="library-card group relative grid min-h-0 grid-cols-1 gap-x-5 gap-y-3 rounded-xl p-4 shadow-none transition-colors lg:grid-cols-[minmax(12rem,0.85fr)_minmax(0,2fr)_auto] lg:items-center">
      <div className="min-w-0">
        <Link href={libraryPath(library.slug)} className="flex min-w-0 items-center gap-3 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2">
          <span className="theme-border grid size-9 shrink-0 place-items-center rounded-lg border bg-white/[0.035]">
            <LibraryLogo url={library.url} name={library.name} size={24} />
          </span>
          <span className="truncate text-[15px] tracking-[-0.01em]">{library.name}</span>
        </Link>
        <p className="library-subtle mt-1.5 truncate pl-12 text-[11px]">{hostname(library.url)}</p>
        <div className="library-subtle mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px]">
          {library.stacks.length > 0 && <span className="flex items-center gap-1.5"><Layers3 className="size-3" aria-hidden />{library.stacks.length} {library.stacks.length === 1 ? "stack" : "stacks"}</span>}
          <span className="flex items-center gap-1.5"><Target className="size-3" aria-hidden />{library.useCases.length} {library.useCases.length === 1 ? "use" : "uses"}</span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="library-muted line-clamp-2 text-[13px] leading-5">{library.description}</p>
        {matches.length > 0 ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {matches.slice(0, 3).map((component) => (
              <a
                key={component.url}
                href={component.url}
                target="_blank"
                rel="noopener noreferrer"
                className="library-chip focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 relative z-10 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:opacity-80"
              >
                {component.name}
                <ArrowUpRight className="size-2.5" aria-hidden />
              </a>
            ))}
            {matches.length > 3 && (
              <details className="relative z-10">
                <summary className="library-subtle w-fit cursor-pointer rounded py-2 text-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2">{matches.length - 3} more matches</summary>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matches.slice(3).map((component) => (
                    <a key={component.url} href={component.url} target="_blank" rel="noopener noreferrer" className="library-chip inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:opacity-80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2">
                      {component.name}<ArrowUpRight className="size-2.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </details>
            )}
          </div>
        ) : library.stacks.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {library.stacks.slice(0, 3).map((stack) => (
              <Badge key={stack} variant="outline" className="library-chip px-2 py-0.5 text-[10px]">{stack}</Badge>
            ))}
            {library.stacks.length > 3 && <Badge variant="outline" className="library-chip px-2 py-0.5 text-[10px]">+{library.stacks.length - 3}</Badge>}
          </div>
        ) : null}
      </div>

      <div className="relative z-10 flex items-center justify-end gap-1 lg:justify-self-end">
        <Button type="button" size="icon-sm" variant="ghost" onClick={handleToggleSaved} aria-label={saved ? `Remove ${library.name} from saved` : `Save ${library.name}`} aria-pressed={saved} className="library-save size-9 min-h-9 min-w-9 rounded-lg p-0 hover:opacity-80">
          <Heart className="size-4" fill={saved ? "currentColor" : "none"} aria-hidden />
        </Button>
        <Button asChild size="icon-sm" variant="ghost" className="library-subtle min-h-11 min-w-11 rounded-lg hover:opacity-80">
          <a href={library.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${library.name} website`}><ArrowUpRight aria-hidden /></a>
        </Button>
      </div>
    </Card>
  );
}
