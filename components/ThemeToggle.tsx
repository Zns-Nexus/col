"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitioning = useRef(false);

  useEffect(() => {
    // Mirror the document's theme so every toggle on the page shows the right icon.
    const root = document.documentElement;
    const sync = () => setLight(root.classList.contains("light"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    if (transitioning.current) return;

    const nextLight = !light;
    const root = document.documentElement;
    const applyTheme = () => {
      root.classList.toggle("light", nextLight);
      root.classList.toggle("dark", !nextLight);
      localStorage.setItem("col:theme", nextLight ? "light" : "dark");
      setLight(nextLight);
    };
    const startViewTransition = (document as DocumentWithViewTransitions).startViewTransition;

    if (!startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      return;
    }

    const button = buttonRef.current;
    if (!button) {
      applyTheme();
      return;
    }

    const { left, top, width, height } = button.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );
    const point = `${(x / viewportWidth) * 100}% ${(y / viewportHeight) * 100}%`;
    const radius = (maxRadius / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100;

    transitioning.current = true;
    const transition = startViewTransition.call(document, () => flushSync(applyTheme));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0% at ${point})`, `circle(${radius}% at ${point})`] },
          { duration: 400, easing: "ease-in-out", fill: "forwards", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => {
      transitioning.current = false;
    }).catch(() => {});
  };

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label={`Use ${light ? "dark" : "light"} mode`}
      title={light ? "Dark mode" : "Light mode"}
      className="theme-toggle grid size-9 place-items-center rounded-lg border"
    >
      {light ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
    </Button>
  );
}
