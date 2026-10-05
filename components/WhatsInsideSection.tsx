import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Search } from "lucide-react";
import { CATEGORIES, STACKS, libraries, libraryBySlug } from "@/data/libraries";
import { libraryDetails } from "@/data/library-details";
import { LibraryLogo } from "./LibraryLogo";
import styles from "./HomePage.module.css";

const popularSearches = ["React", "Animation", "Tailwind", "Components", "Icons", "3D"] as const;

const featuredLibraries = ["21st-dev", "react-bits", "shadcn-ui"].map(libraryBySlug);

const stats = [
  { value: libraries.length, label: "libraries" },
  { value: CATEGORIES.length, label: "categories" },
  { value: STACKS.length, label: "stacks" },
] as const;

/** A real install command from the React Bits page, so the example never drifts from the data. */
const exampleInstall = (() => {
  const install = libraryDetails["react-bits"]?.install?.find(({ label }) => label === "shadcn (registry alias)");
  if (!install) throw new Error("React Bits install example is missing from data/library-details");
  return install.command;
})();

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The three jobs Col MCP supports for a coding agent, in order. */
const mcpSteps = [
  { title: "Find a fit", text: "Compare components across libraries for your stack." },
  { title: "Inspect it", text: "Check component docs, setup, and known gaps." },
  { title: "Implement it", text: "Your agent adds it to the project from the sources." },
] as const;

/**
 * Homepage "Details" bento: six tiles on a three-column grid. Search spans two
 * columns, Col MCP spans a full row, the rest take one. Each pairs
 * a short description with a real way in: search shortcuts, directory counts,
 * featured libraries, an install command, the saved list, and MCP setup.
 */
export function WhatsInsideSection() {
  return (
    <section className={styles.section} aria-labelledby="details-title">
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="details-title">Details</h2>
          <p>From finding a library to adding it to your project.</p>
        </div>
      </div>
      <div className={styles.bento}>
        <article className={`${styles.cell} ${styles.cellWide}`}>
          <h3><Link href="/libraries" className={styles.cellTitle}>Search and filter <ArrowRight aria-hidden /></Link></h3>
          <p>Find libraries by name, component, category, stack, or use case.</p>
          <div className={styles.cellFoot}>
            <Link href="/libraries" className={styles.searchField}>
              <Search aria-hidden />
              <span>Search libraries and components</span>
            </Link>
            <nav className={styles.chips} aria-label="Popular library searches">
              {popularSearches.map((query) => (
                <Link key={query} href={`/libraries?q=${encodeURIComponent(query)}`}>{query}</Link>
              ))}
            </nav>
          </div>
        </article>

        <article className={styles.cell}>
          <h3><Link href="/libraries" className={styles.cellTitle}>The directory <ArrowRight aria-hidden /></Link></h3>
          <dl className={styles.stats}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className={styles.cell}>
          <h3><Link href="/libraries/shadcn-ui" {...newTab} className={styles.cellTitle}>Official sources <ArrowUpRight aria-hidden /></Link></h3>
          <p>Go straight to each library&apos;s website, documentation, and repository.</p>
          <ul className={`${styles.cellFoot} ${styles.featured}`}>
            {featuredLibraries.map((library) => (
              <li key={library.slug}>
                <Link href={`/libraries/${library.slug}`} {...newTab} className={styles.libraryLink}>
                  <LibraryLogo url={library.url} name={library.name} size={28} />
                  <span><strong>{library.name}</strong><span>{library.category}</span></span>
                  <ArrowUpRight aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.cell}>
          <h3><Link href="/libraries/react-bits" {...newTab} className={styles.cellTitle}>Installation guides <ArrowUpRight aria-hidden /></Link></h3>
          <p>Set up registries, copy install commands, and get an agent setup prompt.</p>
          <code className={`${styles.cellFoot} ${styles.command}`}>{exampleInstall}</code>
        </article>

        <article className={styles.cell}>
          <h3><Link href="/libraries" className={styles.cellTitle}>Save for later <ArrowRight aria-hidden /></Link></h3>
          <p>Keep useful libraries saved in your browser while you compare options.</p>
          <span className={`${styles.cellFoot} ${styles.cellIcon}`} aria-hidden><Heart /></span>
        </article>

        <article className={`${styles.cell} ${styles.cellFull}`}>
          <div className={styles.mcpCopy}>
            <h3>
              <Link href="/mcp" className={styles.cellTitle}>Col MCP <ArrowRight aria-hidden /></Link>
            </h3>
            <p>Search UI libraries and verified components with your coding agent.</p>
          </div>
          <ol className={styles.flow}>
            {mcpSteps.map(({ title, text }, index) => (
              <li key={title}>
                <span className={styles.flowIndex}>{index + 1}</span>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
