import { ArrowUpRight, Heart } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Library } from "@/data/libraries";
import type { LibraryComponent } from "@/data/components";
import { MinimalCardImage } from "@/components/ui/minimal-card";
import { categoryIcons } from "./MaskIcon";
import { LibraryLogo } from "./LibraryLogo";
import { hostname } from "@/lib/utils";
import { libraryPath } from "@/lib/site";
import { libraryPreviews } from "@/data/library-previews";
import { NewAdditionLabel } from "./NewAdditionLabel";

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
    const preview = libraryPreviews[library.slug];
    const previewRatio = preview ? preview.width / preview.height : 0;
    const CategoryIcon = categoryIcons[library.category];

    return (
      <article className="lib-card">
        <MinimalCardImage
          src={preview?.src}
          alt={`${library.name} website preview`}
          imageStyle={{
            objectFit: previewRatio >= 1.4 ? "cover" : "contain",
            padding: previewRatio >= 1.4 ? 0 : "1.5rem",
          }}
          fallback={
            <span role="img" aria-label={`Preview unavailable for ${library.name}`} className="lib-card-fallback">
              <LibraryLogo url={library.url} name={library.name} size={28} />
              <span className="lib-card-fallback-host">{hostname(library.url)}</span>
            </span>
          }
          className="lib-card-media"
        />
        <NewAdditionLabel addedAt={library.addedAt} />
        <button type="button" onClick={handleToggleSaved} aria-label={saved ? `Remove ${library.name} from saved` : `Save ${library.name}`} aria-pressed={saved} className="library-save lib-card-save">
          <Heart fill={saved ? "currentColor" : "none"} aria-hidden />
        </button>
        <div className="lib-card-body">
          <div className="lib-card-title">
            <Link href={libraryPath(library.slug)} className="lib-card-name">{library.name}</Link>
            <span className="lib-card-category" aria-label={`Category: ${library.category}`}>
              <CategoryIcon className="lib-card-category-icon" />
              <span className="cap">{library.category}</span>
            </span>
          </div>
          <p className="lib-card-desc">{library.description}</p>
          {matches.length > 0 && <div className="lib-card-meta">
            {matches.slice(0, 2).map((component) => (
              <a key={component.url} href={component.url} target="_blank" rel="noopener noreferrer" className="lib-tag lib-tag-link">
                <span className="cap">{component.name}</span>
                <ArrowUpRight aria-hidden />
              </a>
            ))}
            {matches.length > 2 && <span className="lib-tag lib-tag-more"><span className="cap">+{matches.length - 2}</span></span>}
          </div>}
        </div>
      </article>
    );
  }

  const tags = matches.length > 0 ? null : library.stacks;
  return (
    <article className="lib-row group">
      <span className="lib-row-logo" aria-hidden>
        <LibraryLogo url={library.url} name={library.name} size={20} />
      </span>
      <div className="lib-row-id">
        <Link href={libraryPath(library.slug)} className="lib-row-name">{library.name}</Link>
        <span className="lib-row-host">{hostname(library.url)}</span>
      </div>
      <p className="lib-row-desc">{library.description}</p>
      <div className="lib-row-tags">
        {matches.length > 0 ? (
          <>
            {matches.slice(0, 3).map((component) => (
              <a key={component.url} href={component.url} target="_blank" rel="noopener noreferrer" className="lib-tag lib-tag-link">
                <span className="cap">{component.name}</span>
                <ArrowUpRight aria-hidden />
              </a>
            ))}
            {matches.length > 3 && <span className="lib-tag lib-tag-more"><span className="cap">+{matches.length - 3}</span></span>}
          </>
        ) : (
          <>
            {tags!.slice(0, 3).map((stack) => <span key={stack} className="lib-tag"><span className="cap">{stack}</span></span>)}
            {tags!.length > 3 && <span className="lib-tag lib-tag-more"><span className="cap">+{tags!.length - 3}</span></span>}
          </>
        )}
      </div>
      <div className="lib-row-actions">
        <NewAdditionLabel addedAt={library.addedAt} />
        <button type="button" onClick={handleToggleSaved} aria-label={saved ? `Remove ${library.name} from saved` : `Save ${library.name}`} aria-pressed={saved} className="library-save lib-row-action">
          <Heart fill={saved ? "currentColor" : "none"} aria-hidden />
        </button>
        <a href={library.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${library.name} website`} className="lib-row-action">
          <ArrowUpRight aria-hidden />
        </a>
      </div>
    </article>
  );
}
