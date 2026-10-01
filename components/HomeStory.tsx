"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode, type RefObject } from "react";
import { LightRays } from "./LightRays";
import styles from "./HomePage.module.css";

/**
 * When the homepage plays as one pinned screen. Must match the
 * `@media` block marked "Pinned story" in HomePage.module.css. Smaller or
 * shorter screens, and reduced motion, get the ordinary stacked page.
 */
const PINNED_QUERY = "(min-width: 1280px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";

export type Scene = { id: string; content: ReactNode };

type Theme = "dark" | "light";

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

/**
 * The document theme on wide screens, or null on narrow ones, where the hero
 * keeps its static gradient instead of spending battery on light rays.
 */
function useDesktopTheme(): Theme | null {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 900px)");
    const sync = () => setTheme(desktop.matches ? (root.classList.contains("light") ? "light" : "dark") : null);
    const observer = new MutationObserver(sync);
    sync();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    desktop.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", sync);
    };
  }, []);

  return theme;
}

/**
 * Publishes the pointer position on `target` as `--px`/`--py` (-0.5 to 0.5) so
 * the tiles can drift with a little parallax. Fine pointers only, and not under
 * reduced motion; writes at most once per frame.
 */
function usePointerParallax(target: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const parallax = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--px", ((x - rect.left) / rect.width - 0.5).toFixed(3));
      element.style.setProperty("--py", ((y - rect.top) / Math.min(rect.height, window.innerHeight) - 0.5).toFixed(3));
    };
    const move = (event: PointerEvent) => {
      if (!parallax.matches) return;
      x = event.clientX;
      y = event.clientY;
      frame ||= requestAnimationFrame(apply);
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--px");
      element.style.removeProperty("--py");
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, [target]);
}

const position = (index: number, active: number) => (index < active ? "past" : index === active ? "current" : "next");

/**
 * The homepage as one pinned screen. The stage (light rays, the hero's
 * `backdrop`, and every scene) sticks to the top of a tall scroll track; an
 * invisible marker per scene tells an IntersectionObserver which scene is
 * reached, and CSS crossfades between them. Nothing runs per scroll frame.
 *
 * Keyboard focus moving into another scene scrolls to that scene, and the rays
 * pause once the hero is left behind. Outside PINNED_QUERY the same markup
 * renders as an ordinary stacked page.
 */
export function HomeStory({ backdrop, scenes }: { backdrop: ReactNode; scenes: readonly Scene[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const pinned = useMediaQuery(PINNED_QUERY);
  const theme = useDesktopTheme();
  usePointerParallax(stage);

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
      <div ref={stage} className={styles.stage} data-scene={active} onFocus={showSceneOf}>
        {theme && (
          <LightRays
            className={styles.rays}
            raysOrigin="top-left"
            raysAngle={-38}
            raysColor="#ffffff"
            raysSpeed={0.8}
            lightSpread={0.7}
            rayLength={1.4}
            fadeDistance={1}
            saturation={0}
            followMouse
            mouseInfluence={0.08}
            noiseAmount={0.08}
            distortion={0.04}
            lightMode={theme === "light"}
            paused={pinned && active !== 0}
          />
        )}
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
