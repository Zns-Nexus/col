"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import styles from "./HomePage.module.css";

/**
 * When the homepage plays as one pinned screen. Must match the
 * `@media` block marked "Pinned story" in HomePage.module.css. Smaller or
 * shorter screens, and reduced motion, get the ordinary stacked page.
 */
const PINNED_QUERY = "(min-width: 1280px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";

export type Scene = { id: string; content: ReactNode };

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

const position = (index: number, active: number) => (index < active ? "past" : index === active ? "current" : "next");

/**
 * The homepage as one pinned screen. The stage (the hero's
 * `backdrop`, and every scene) sticks to the top of a tall scroll track; an
 * invisible marker per scene tells an IntersectionObserver which scene is
 * reached, and CSS crossfades between them. Nothing runs per scroll frame.
 *
 * Keyboard focus moving into another scene scrolls to that scene.
 * Outside PINNED_QUERY the same markup renders as an ordinary stacked page.
 */
export function HomeStory({ backdrop, scenes }: { backdrop: ReactNode; scenes: readonly Scene[] }) {
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const pinned = useMediaQuery(PINNED_QUERY);

  useEffect(() => {
    if (!pinned) return;
    // A thin band across the middle of the viewport: whichever marker covers it is the current scene.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.scene));
      }
    }, { rootMargin: "-49.5% 0px -49.5% 0px" });
    for (const marker of markers.current) if (marker) observer.observe(marker);
    return () => observer.disconnect();
  }, [pinned]);

  const showSceneOf = (event: FocusEvent<HTMLDivElement>) => {
    if (!pinned) return;
    const owner = (event.target as HTMLElement).closest<HTMLElement>("[data-scene-index]");
    const index = Number(owner?.dataset.sceneIndex ?? active);
    if (index !== active) markers.current[index]?.scrollIntoView({ block: "start" });
  };

  return (
    <div className={styles.story} style={{ "--scenes": scenes.length } as CSSProperties}>
      <div className={styles.stage} data-scene={active} onFocus={showSceneOf}>
        <div className={styles.backdrop} data-scene-index={0}>{backdrop}</div>
        {scenes.map(({ id, content }, index) => (
          <div key={id} className={styles.scene} data-scene-index={index} data-position={position(index, active)}>
            {content}
          </div>
        ))}
      </div>
      {scenes.map(({ id }, index) => (
        <div
          key={id}
          ref={(node) => { markers.current[index] = node; }}
          className={styles.marker}
          data-scene={index}
          style={{ "--index": index } as CSSProperties}
          aria-hidden
        />
      ))}
    </div>
  );
}
