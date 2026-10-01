import { ArrowUpRight, Check } from "lucide-react";
import { getRoadmap, type Milestone } from "@/lib/github-roadmap";
import styles from "./HomePage.module.css";

const ISSUES_URL = "https://github.com/screen-gd/Col/issues";

const shippedDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" });

const statusText = { "in-progress": "In progress", planned: "Planned" } satisfies Record<Exclude<Milestone["status"], "shipped">, string>;

const when = (milestone: Milestone) =>
  milestone.status === "shipped"
    ? milestone.closedAt && <time dateTime={milestone.closedAt}>{shippedDate.format(new Date(milestone.closedAt))}</time>
    : statusText[milestone.status];

/**
 * Homepage roadmap: a timeline of major GitHub issues, refreshed every five
 * minutes. Shipped milestones sit on a solid line, then a "Now" marker, then
 * upcoming work on a dashed line. Issues labelled "roadmap" are used when any
 * exist; otherwise feature requests are (see lib/github-roadmap.ts).
 */
export async function RoadmapSection() {
  const roadmap = await getRoadmap();
  const milestones = roadmap ? [...roadmap.shipped, ...roadmap.upcoming] : [];
  const lastShipped = (roadmap?.shipped.length ?? 0) - 1;
  const hasUpcoming = (roadmap?.upcoming.length ?? 0) > 0;

  return (
    <section id="roadmap" className={styles.section} aria-labelledby="roadmap-title">
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="roadmap-title">Roadmap</h2>
          <p>Major milestones, straight from GitHub issues.</p>
        </div>
        <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="ld-button">
          <span className="cap">View all issues</span>
          <ArrowUpRight aria-hidden />
        </a>
      </div>
      {milestones.length > 0 ? (
        <ol className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <li key={milestone.number} data-status={milestone.status}>
              <a href={milestone.url} target="_blank" rel="noopener noreferrer" className={styles.milestone}>
                <span className={styles.node} aria-hidden>{milestone.status === "shipped" && <Check />}</span>
                <span className={styles.when}>{when(milestone)}</span>
                <span className={styles.milestoneTitle}>{milestone.title}</span>
                <span className={styles.issue}>#{milestone.number}</span>
              </a>
              {index === lastShipped && hasUpcoming && <span className={styles.now}>Now</span>}
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.timelineEmpty}>
          {roadmap ? "No milestones yet." : "The roadmap could not be loaded right now."} Follow along in the GitHub issues.
        </p>
      )}
    </section>
  );
}
