import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { libraryBySlug } from "@/data/libraries";
import { repo } from "@/lib/repo";
import { RollText } from "./RollText";
import styles from "./HomePage.module.css";

/**
 * Glass tiles resting on the hero orbit. `x`/`y` place the tile's centre as a
 * percentage of the stage, `size` is a share of the stage width (capped on very
 * wide panels), and `tilt` is the rotation in degrees.
 */
const orbitTiles = [
  { slug: "21st-dev", src: "/hero-logos/21st-dev-glow.png", x: 16, y: 22, size: 13, tilt: -8 },
  { slug: "shadcn-ui", src: "/hero-logos/shadcn-glow.png", x: 80, y: 19, size: 14, tilt: 10 },
  { slug: "aceternity-ui", src: "/hero-logos/aceternity-glow.png", x: 88, y: 59, size: 17, tilt: 12 },
  { slug: "motion", src: "/hero-logos/background/motion.png", x: 74, y: 82, size: 12, tilt: -10 },
  { slug: "react-bits", src: "/hero-logos/react-bits-glow.png", x: 15, y: 74, size: 21, tilt: 4 },
].map((tile) => ({ ...tile, library: libraryBySlug(tile.slug) }));

/** Out-of-focus tiles that give the orbit some depth. Decorative only. */
const distantTiles = [
  { slug: "gsap", x: 6, y: 44, size: 5, tilt: 14 },
  { slug: "radix-ui", x: 96, y: 36, size: 4, tilt: -12 },
  { slug: "base-ui", x: 42, y: 90, size: 5, tilt: 8 },
  { slug: "mantine", x: 58, y: 8, size: 3.5, tilt: -6 },
] as const;

/** Headline lines, split into words so each one can blur in on its own (after React Bits' Blur Text). `order` staggers them. */
const headlineLines = [
  ["The", "libraries", "that", "developers", "love,"],
  ["all", "in", "one", "place"],
];
const headline = headlineLines.map((line, lineIndex) => {
  const start = headlineLines.slice(0, lineIndex).flat().length;
  return line.map((word, wordIndex) => ({ word, order: start + wordIndex }));
});

type TilePlacement = { x: number; y: number; size: number; tilt: number };

/**
 * CSS variables for one tile. `order` staggers the entrance; `depth` is how far
 * (px) the tile follows the pointer, negative to drift the other way.
 */
function tileStyle({ x, y, size, tilt }: TilePlacement, order: number, depth: number) {
  return {
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--size": `min(${size}cqi, ${size * 15}px)`,
    "--tilt": `${tilt}deg`,
    "--order": order,
    "--depth": `${depth}px`,
  } as CSSProperties;
}

/** The hero's scenery: orbit line, out-of-focus tiles, and the library tiles (each opens its library page). Stays on screen behind every scene. */
export function HeroBackdrop() {
  return (
    <>
      <div className={styles.orbit} aria-hidden />
      {distantTiles.map((tile, index) => (
        <Image key={tile.slug} src={`/hero-logos/background/${tile.slug}.png`} alt="" width={96} height={96} className={styles.distantTile} style={tileStyle(tile, index, tile.size * -2)} aria-hidden />
      ))}
      {orbitTiles.map(({ library, src, ...placement }, index) => (
        <Link key={library.slug} href={`/libraries/${library.slug}`} target="_blank" rel="noopener noreferrer" aria-label={library.name} className={styles.tile} style={tileStyle(placement, index, placement.size * 2)}>
          <Image src={src} alt="" width={320} height={320} sizes="20vw" loading="eager" />
        </Link>
      ))}
    </>
  );
}

/** The hero's copy: headline (words blur in one by one), subtitle, and the two calls to action. */
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
          <RollText>Star on git.cafe</RollText>
        </a>
      </div>
    </section>
  );
}
