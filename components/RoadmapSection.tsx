import { ArrowUpRight } from "lucide-react";
import styles from "./RoadmapSection.module.css";

const items = [
  { title: "Dedicated pages for each library", status: "In progress", issue: 1 },
  { title: "Better library page experience", status: "Planned", issue: 2 },
  { title: "MCP servers and connectors", status: "Planned", issue: 4 },
] as const;

export function RoadmapSection() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className={`theme-border border-b ${styles.section}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Tracked work / GitHub issues</p>
            <h2 id="roadmap-title" className="theme-text">Roadmap</h2>
            <p className={`theme-muted ${styles.description}`}>
              Upcoming features and changes are tracked as tickets in the GitHub repository.
            </p>
          </div>
          <a href="https://github.com/screen-gd/Col/issues" target="_blank" rel="noopener noreferrer" className={`theme-text ${styles.allIssues}`}>
            View all issues <ArrowUpRight className={styles.headerIcon} aria-hidden />
          </a>
        </div>
        <ol className={styles.timeline}>
          {items.map(({ title, status, issue }, index) => (
            <li key={issue} className={styles.item}>
              <div className={styles.rail} aria-hidden="true">
                <span className={`${styles.marker} ${status === "In progress" ? styles.markerActive : ""}`} />
              </div>
              <article className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.issue}>Issue #{issue}</span>
                  <span className={`${styles.status} ${status === "In progress" ? styles.statusActive : styles.statusPlanned}`}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {status}
                  </span>
                </div>
                <a href={`https://github.com/screen-gd/Col/issues/${issue}`} target="_blank" rel="noopener noreferrer" className={`theme-text ${styles.itemLink}`}>
                  <span>{title}</span>
                  <span className={styles.openIssue}>Open issue <ArrowUpRight className={styles.linkIcon} aria-hidden /></span>
                </a>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
