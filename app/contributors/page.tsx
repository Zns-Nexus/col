import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { getContributors } from "@/lib/github-contributors";
import styles from "./page.module.css";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Contributors — Col",
  description: "Meet the people contributing to Col.",
};

export default async function ContributorsPage() {
  const contributors = await getContributors();
  const largestContribution = Math.max(...contributors.map(({ contributions }) => contributions), 1);

  return (
    <>
      <div className={`contributors-page w-full max-w-full overflow-x-hidden ${styles.page}`}>
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>The people behind Col</p>
            <h1 className="theme-text mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Built by people.</h1>
            <p className="theme-muted mt-6 max-w-2xl text-lg leading-8">The contributors keeping Col useful, accurate, and open.</p>
          </div>
          <a href="https://github.com/screen-gd/Col/graphs/contributors" target="_blank" rel="noopener noreferrer" className={`${styles.githubLink} theme-text inline-flex items-center gap-2 text-sm font-medium`}>View on GitHub <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>

        {contributors.length ? (
          <ul className={styles.contributorGrid}>
            {contributors.map((contributor, index) => {
              const ratio = contributor.contributions / largestContribution;
              const portraitSize = Math.round(96 + Math.sqrt(ratio) * 88);
              return (
              <li key={contributor.id} className={styles.contributor} style={{ "--portrait-size": `${portraitSize}px` } as CSSProperties}>
                <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" className={styles.contributorLink} aria-label={`View ${contributor.login} on GitHub`}>
                  <span className={styles.portraitWrap}>
                    <img src={contributor.avatar_url} alt="" width={portraitSize} height={portraitSize} loading={index < 8 ? "eager" : "lazy"} className={styles.portrait} />
                    <span className={styles.rank} aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  </span>
                  <span className={styles.contributorMeta}>
                    <span className="theme-text font-medium">{contributor.login}</span>
                    <span className="theme-muted text-xs tabular-nums">{contributor.contributions} {contributor.contributions === 1 ? "contribution" : "contributions"}</span>
                  </span>
                  <ArrowUpRight className={`${styles.arrow} theme-muted size-4 shrink-0`} aria-hidden />
                </a>
              </li>
              );
            })}
          </ul>
        ) : (
          <div className="theme-border mt-20 border-y py-16">
            <p className="theme-text text-xl font-medium">Contributors could not be loaded right now.</p>
            <a href="https://github.com/screen-gd/Col/graphs/contributors" target="_blank" rel="noopener noreferrer" className="theme-muted mt-3 inline-flex items-center gap-2 text-sm">View the contributor graph on GitHub <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        )}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
