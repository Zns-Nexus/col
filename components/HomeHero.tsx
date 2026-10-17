import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { repo } from "@/lib/repo";
import { RollText } from "./RollText";
import styles from "./HomePage.module.css";

/** Headline lines, split into words so each one can blur in on its own (after React Bits' Blur Text). `order` staggers them. */
const headlineLines = [
  ["The", "libraries", "that", "developers", "love,"],
  ["all", "in", "one", "place"],
];
const headline = headlineLines.map((line, lineIndex) => {
  const start = headlineLines.slice(0, lineIndex).flat().length;
  return line.map((word, wordIndex) => ({ word, order: start + wordIndex }));
});

/** A still frame is the default; CSS enables the GIF when motion is allowed. */
export function HeroBackdrop() {
  return (
    <>
      <label className={styles.motionControl}>
        <input type="checkbox" />
        Pause background
      </label>
      <div className={styles.heroImage} aria-hidden />
    </>
  );
}

/** The hero's copy: headline (words blur in one by one), subtitle, the two calls to action, and the sponsors line. */
export function HeroCopy() {
  return (
    <section className={styles.heroCopy} aria-labelledby="home-title">
      <h1 id="home-title">
        {headline.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.map(({ word, order }, wordIndex) => (
              <Fragment key={order}>
                {wordIndex > 0 && " "}
                <span className={styles.word} style={{ "--word": order } as CSSProperties}>{word}</span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </h1>
      <p>Discover UI libraries, components, and tools by stack and use case.</p>
      <div className={styles.actions}>
        <Link href="/libraries" className={styles.button}>
          <RollText>Browse libraries</RollText>
          <span className={styles.arrowSwap} aria-hidden><ArrowRight /><ArrowRight /></span>
        </Link>
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.starLink}>
          <Star aria-hidden />
          <RollText>Star on GitHub</RollText>
        </a>
      </div>
      {sponsors.length > 0 && (
        <p className={styles.sponsors}>
          <span>Sponsored by</span>
          {sponsors.map(({ name, url, tier, logo }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer">
              <Image src={logo} alt="" width={128} height={128} className={styles.sponsorMark} />
              <span className={styles.sponsorName}>{name}</span>
              <span className={styles.sponsorTier}>· {tier}</span>
            </a>
          ))}
        </p>
      )}
    </section>
  );
}
