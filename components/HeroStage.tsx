"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { LightRays } from "./LightRays";
import styles from "./HomePage.module.css";

type HeroTheme = "dark" | "light";

/**
 * The document theme on wide screens, or null on narrow ones, where the hero
 * keeps its static gradient instead of spending battery on light rays.
 */
function useDesktopTheme(): HeroTheme | null {
  const [theme, setTheme] = useState<HeroTheme | null>(null);

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
 * Client shell for the homepage hero. Lights it with React Bits' Light Rays
 * from the top-left, and publishes the pointer position as `--px`/`--py`
 * (-0.5 to 0.5) so the tiles can drift with a little parallax. Parallax is
 * limited to fine pointers without reduced motion.
 */
export function HeroStage({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const stage = useRef<HTMLElement>(null);
  const theme = useDesktopTheme();

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const parallax = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--px", ((x - rect.left) / rect.width - 0.5).toFixed(3));
      element.style.setProperty("--py", ((y - rect.top) / rect.height - 0.5).toFixed(3));
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
  }, []);

  return (
    <section ref={stage} {...props}>
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
        />
      )}
      {children}
    </section>
  );
}
