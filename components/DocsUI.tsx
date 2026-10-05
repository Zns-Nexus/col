import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { CopyButton } from "./CopyButton";

/** Building blocks for docs pages, so every page shares one quiet, typographic look. */

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function DocsHeader({ section, title, lead, children }: { section?: string; title: string; lead: ReactNode; children?: ReactNode }) {
  return (
    <header className="dx-header">
      {section && <p className="dx-eyebrow">{section}</p>}
      <h1>{title}</h1>
      <p className="dx-lead">{lead}</p>
      {children && <p className="dx-text">{children}</p>}
    </header>
  );
}

export function DocsSection({ title, children }: { title: string; children: ReactNode }) {
  const id = slug(title);
  return (
    <section className="dx-section" aria-labelledby={id}>
      <h2 id={id} data-title={title}>
        <a href={`#${id}`} className="dx-anchor" aria-hidden tabIndex={-1}>#</a>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DocsText({ children }: { children: ReactNode }) {
  return <p className="dx-text">{children}</p>;
}

export function DocsList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="dx-list">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

export function DocsNote({ children }: { children: ReactNode }) {
  return (
    <div className="dx-note">
      <Info aria-hidden />
      <p>{children}</p>
    </div>
  );
}

export function DocsCode({ code, label = "Terminal" }: { code: string; label?: string }) {
  return (
    <figure className="ld-card dx-code">
      <div className="ld-screen">
        <pre><code>{code}</code></pre>
      </div>
      <figcaption className="ld-card-foot">
        <span className="ld-card-foot-label cap">{label}</span>
        <CopyButton text={code} ariaLabel={`Copy ${label.toLowerCase()} commands`} className="ld-copy" />
      </figcaption>
    </figure>
  );
}

/** A short list of next steps: one row per destination, separated by hairlines. */
export function DocsLinks({ items }: { items: { href: string; title: string; text: string }[] }) {
  return (
    <ul className="dx-links">
      {items.map(({ href, title, text }) => {
        const external = href.startsWith("http");
        return (
          <li key={href}>
            <a href={href} className="dx-link-row" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className="dx-link-copy">
                <span className="dx-link-title">{title}</span>
                <span className="dx-link-text">{text}</span>
              </span>
              {external ? <ArrowUpRight aria-hidden /> : <ArrowRight aria-hidden />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** A single call to action at the end of a page or section. */
export function DocsButton({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} className="dx-button" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="cap">{children}</span>
      {external ? <ArrowUpRight aria-hidden /> : <ArrowRight aria-hidden />}
    </a>
  );
}
