"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { CopyButton } from "./CopyButton";

/** Per-character delay for the swap wave, capped so long commands still finish quickly. */
const waveStep = (length: number) => Math.min(9, 420 / Math.max(length, 1));

function waveChars(text: string, direction: "in" | "out" | "rest") {
  const step = waveStep(text.length);
  return [...text].map((char, index) => (
    <span key={index} className={`ld-wave-char ld-wave-${direction}`} style={direction === "rest" ? undefined : { animationDelay: `${index * step + (direction === "in" ? 70 : 0)}ms` }}>
      {char}
    </span>
  ));
}

/**
 * Install commands in a card shaped like the library cards: the command sits
 * in an inset "screen" on top, the method tabs and copy action below. The
 * active pill slides between tabs; switching sends a blur wave from the start
 * of the command to the end, replacing the old command character by character.
 */
export function InstallTabs({ steps }: { steps: { label: string; command: string }[] }) {
  const [active, setActive] = useState(0);
  const [swap, setSwap] = useState<{ from: number; id: number } | null>(null);
  // Once a swap has happened the command stays split into characters, so the
  // layout is identical before and after each wave and nothing shifts when it ends.
  const [split, setSplit] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);
  const previousHeight = useRef(0);
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });
  const tabbed = steps.length > 1;
  const command = steps[active].command;

  // The outgoing command is taken out of layout, so the box would jump to the new
  // height at once; animate from the old height to the new one instead.
  useLayoutEffect(() => {
    const box = cmdRef.current;
    if (!swap || !box) return;
    const next = box.offsetHeight;
    if (next === previousHeight.current) return;
    box.style.height = `${previousHeight.current}px`;
    void box.offsetHeight;
    box.style.height = `${next}px`;
    const done = () => { box.style.height = ""; };
    box.addEventListener("transitionend", done, { once: true });
    return () => box.removeEventListener("transitionend", done);
  }, [swap]);

  useLayoutEffect(() => {
    if (!tabbed) return;
    const tab = listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
    if (!tab) return;
    setPill({ width: tab.offsetWidth, transform: `translateX(${tab.offsetLeft}px)`, opacity: 1 });
  }, [active, tabbed]);

  // Drop the per-character spans once the wave has passed.
  useEffect(() => {
    if (!swap) return;
    const longest = Math.max(command.length, steps[swap.from].command.length);
    const timer = setTimeout(() => setSwap(null), longest * waveStep(longest) + 600);
    return () => clearTimeout(timer);
  }, [swap, command, steps]);

  const select = (index: number) => {
    if (index === active) return;
    previousHeight.current = cmdRef.current?.offsetHeight ?? 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSwap(reduced ? null : { from: active, id: Date.now() });
    if (!reduced) setSplit(true);
    setActive(index);
  };

  return (
    <div className="ld-card">
      <div
        role={tabbed ? "tabpanel" : undefined}
        id={tabbed ? "install-panel" : undefined}
        aria-labelledby={tabbed ? `install-tab-${active}` : undefined}
        className="ld-screen ld-screen-command"
      >
        <pre>
          <span className="ld-prompt-sign" aria-hidden>$</span>
          <span ref={cmdRef} className="ld-cmd">
            <span className="sr-only">{command}</span>
            {swap && <span key={`out-${swap.id}`} className="ld-cmd-layer ld-cmd-leaving" aria-hidden>{waveChars(steps[swap.from].command, "out")}</span>}
            <span key={swap ? `in-${swap.id}` : `rest-${active}`} className="ld-cmd-layer" aria-hidden>
              {swap ? waveChars(command, "in") : split ? waveChars(command, "rest") : command}
            </span>
          </span>
        </pre>
      </div>
      <div className="ld-card-foot">
        {tabbed ? (
          <div ref={listRef} role="tablist" aria-label="Install method" className="ld-tabs">
            <span className="ld-tabs-pill" style={pill} aria-hidden />
            {steps.map((step, index) => (
              <button
                key={step.command}
                type="button"
                role="tab"
                id={`install-tab-${index}`}
                aria-selected={index === active}
                aria-controls="install-panel"
                tabIndex={index === active ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const next = (active + (event.key === "ArrowRight" ? 1 : steps.length - 1)) % steps.length;
                  select(next);
                  listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
                }}
              >
                <span className="cap">{step.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <span className="ld-card-foot-label cap">{steps[0].label}</span>
        )}
        <CopyButton text={command} ariaLabel={`Copy command: ${steps[active].label}`} className="ld-copy" />
      </div>
    </div>
  );
}

/** The agent prompt in the same card shape, clipped until expanded. The full text is always in the markup. */
export function AgentPrompt({ prompt }: { prompt: string }) {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const measure = () => setFullHeight(body.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body.firstElementChild ?? body);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ld-card ld-prompt" data-expanded={expanded}>
      <div ref={bodyRef} className="ld-screen ld-prompt-body" style={expanded && fullHeight ? { maxHeight: fullHeight } : undefined}>
        <pre>{prompt}</pre>
      </div>
      <div className="ld-card-foot">
        <button type="button" className="ld-prompt-toggle" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}>
          <span className="cap">{expanded ? "Show less" : "Show full prompt"}</span>
          <ChevronDown aria-hidden />
        </button>
        <CopyButton text={prompt} label="Copy prompt" ariaLabel="Copy agent setup prompt" className="ld-copy" />
      </div>
    </div>
  );
}
