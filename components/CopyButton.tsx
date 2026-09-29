"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyStatus = "idle" | "copied" | "failed";

interface CopyButtonProps {
  text: string;
  /** Button label shown while idle. */
  label?: string;
  /** Accessible name, when the visible label alone does not identify the control. */
  ariaLabel?: string;
  /** Replaces the default button styling. */
  className?: string;
}

/**
 * One-click clipboard copy with polite screen-reader feedback.
 * The button stays usable when the clipboard is unavailable so the text can
 * still be selected and copied manually.
 */
export function CopyButton({ text, label = "Copy", ariaLabel, className }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);
  const [labelWidth, setLabelWidth] = useState<number | undefined>(undefined);

  // Size the label to whichever text is showing, so "Copied" does not keep the
  // width of a longer idle label. The width animates between the two.
  useLayoutEffect(() => {
    const shown = status === "copied" ? doneRef.current : idleRef.current;
    if (shown) setLabelWidth(shown.scrollWidth);
  }, [status, label]);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        data-status={status}
        className={className ?? "library-chip theme-border inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 text-xs font-semibold whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"}
      >
        <span className="copy-swap copy-swap-icon" aria-hidden>
          <Copy className="copy-swap-idle size-3.5" />
          <Check className="copy-swap-done size-3.5" />
        </span>
        <span className="copy-swap copy-swap-label" style={labelWidth === undefined ? undefined : { width: labelWidth }}>
          <span ref={idleRef} className="copy-swap-idle">{status === "failed" ? "Copy failed" : label}</span>
          <span ref={doneRef} className="copy-swap-done" aria-hidden>Copied</span>
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? "Copied to clipboard" : status === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}
