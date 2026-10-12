import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { repo } from "@/lib/repo";
import { Icons } from "./MaskIcon";
import styles from "./SponsorsSection.module.css";

const inquiryUrl = repo.newIssue;
const reveal = (index: number) => ({ "--i": index }) as CSSProperties;

/** Things maintainers spend their time on, which sponsorship pays for. */
const supports = [
  ["Reviewing submissions", "Checking every new library and component against its official source."],
  ["Keeping listings current", "Updating links, component records, and details as projects change."],
  ["Improving the directory", "Better search, filters, and pages for everyone who uses Col."],
] as const;

export function SponsorsSection() {
  return (
    <div className="pg">
      <header className="pg-head ld-reveal" style={reveal(0)}>
        <div>
          <h1>Sponsors</h1>
          <p className="pg-lead">Sponsorship helps keep Col free, open source, and maintained.</p>
        </div>
        <a href={inquiryUrl} target="_blank" rel="noopener noreferrer" className="ld-button ld-button-primary">
          <span className="cap">Become a sponsor</span>
          <ArrowUpRight aria-hidden />
        </a>
      </header>

      {sponsors.length > 0 ? (
        <ul className={styles.grid}>
          {sponsors.map(({ name, url, tier, logo, tagline }, index) => (
            <li key={name} data-tier={tier} className="ld-reveal" style={reveal(index + 1)}>
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <span className={styles.media}>
                  <Image src={logo} alt="" width={128} height={128} className={styles.mark} />
                  <span className={styles.copy}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.tagline}>{tagline}</span>
                  </span>
                </span>
                <span className={styles.band}>
                  <span>{tier}</span>
                  <ArrowUpRight className={styles.arrow} aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <section className="pg-empty pg-empty-center ld-reveal" style={reveal(1)} aria-labelledby="sponsors-empty">
          <span className="pg-empty-icon" aria-hidden><Icons.sponsors className="pg-empty-mask" /></span>
          <p id="sponsors-empty" className="pg-empty-title">No sponsors yet</p>
          <p>Col is built and maintained by volunteers. If it saves your team time, sponsoring is the most direct way to keep it going.</p>
        </section>
      )}

      <section className="pg-section ld-reveal" style={reveal(2)} aria-labelledby="sponsors-supports">
        <h2 id="sponsors-supports">What sponsorship supports</h2>
        <ul className="pg-list">
          {supports.map(([title, text]) => (
            <li key={title} className="pg-row pg-row-static">
              <span className="pg-row-stack">
                <span className="pg-row-title">{title}</span>
                <span className="pg-row-text">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="pg-foot ld-reveal" style={reveal(3)}>
        Inquiries are public GitHub issues, so leave billing and private contact details out.
      </p>
    </div>
  );
}
