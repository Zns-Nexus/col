import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getContributors } from "@/lib/github-contributors";

export const metadata: Metadata = {
  title: "Contributors — Col",
  description: "Meet the people contributing to Col.",
};

const GRAPH_URL = "https://github.com/screen-gd/Col/graphs/contributors";
const number = new Intl.NumberFormat("en");

/** Staggered entrance order, capped so long lists do not trail on. */
const reveal = (index: number) => ({ "--i": Math.min(index, 12) }) as CSSProperties;

export default async function ContributorsPage() {
  const contributors = await getContributors();
  const total = contributors.reduce((sum, { contributions }) => sum + contributions, 0);
  const largest = Math.max(...contributors.map(({ contributions }) => contributions), 1);

  return (
    <div className="cb">
      <header className="cb-head ld-reveal" style={reveal(0)}>
        <div>
          <h1>Contributors</h1>
          <p className="cb-lead">The people keeping Col useful, accurate, and open.</p>
        </div>
        <div className="cb-head-side">
          {contributors.length > 0 && (
            <p className="cb-totals">
              <span><strong>{number.format(contributors.length)}</strong> {contributors.length === 1 ? "contributor" : "contributors"}</span>
              <span aria-hidden>·</span>
              <span><strong>{number.format(total)}</strong> {total === 1 ? "contribution" : "contributions"}</span>
            </p>
          )}
          <a href={GRAPH_URL} target="_blank" rel="noopener noreferrer" className="ld-button">
            <span className="cap">View on GitHub</span>
            <ArrowUpRight aria-hidden />
          </a>
        </div>
      </header>

      {contributors.length ? (
        <ul className="cb-grid">
          {contributors.map((contributor, index) => {
            const share = contributor.contributions / largest;
            return (
              <li key={contributor.id} className="ld-reveal" style={reveal(index + 1)}>
                <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="cb-card" aria-label={`${contributor.login}, ${contributor.contributions} contributions, on GitHub`}>
                  <span className="cb-media">
                    <span className="cb-rank">#{index + 1}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={contributor.avatar_url} alt="" width={72} height={72} loading={index < 12 ? "eager" : "lazy"} className="cb-avatar" />
                    <ArrowUpRight className="cb-open" aria-hidden />
                  </span>
                  <span className="cb-body">
                    <span className="cb-name">{contributor.login}</span>
                    <span className="cb-count">
                      {number.format(contributor.contributions)} {contributor.contributions === 1 ? "contribution" : "contributions"}
                    </span>
                    <span className="cb-bar" aria-hidden>
                      <span style={{ width: `${Math.max(share * 100, 4)}%` }} />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="cb-empty ld-reveal" style={reveal(1)}>
          <p className="cb-empty-title">Contributors could not be loaded right now.</p>
          <p>GitHub did not answer. The full list is always on the contributor graph.</p>
          <a href={GRAPH_URL} target="_blank" rel="noopener noreferrer" className="ld-button">
            <span className="cap">Open the contributor graph</span>
            <ArrowUpRight aria-hidden />
          </a>
        </div>
      )}

      <section className="cb-join ld-reveal" style={reveal(3)} aria-labelledby="cb-join-title">
        <div>
          <h2 id="cb-join-title">Want to see your name here?</h2>
          <p>Add a library, verify components, or fix something that bugs you. Every merged pull request counts.</p>
        </div>
        <div className="cb-join-actions">
          <a href="/docs/pull-requests" className="ld-button ld-button-primary">
            <span className="cap">How to contribute</span>
            <ArrowRight aria-hidden />
          </a>
          <a href="https://github.com/screen-gd/Col/issues" target="_blank" rel="noopener noreferrer" className="ld-button">
            <span className="cap">Open issues</span>
            <ArrowUpRight aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}
