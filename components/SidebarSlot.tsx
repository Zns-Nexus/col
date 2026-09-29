"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export const SIDEBAR_SLOT_ID = "app-sidebar-slot";

/**
 * Renders page-specific sidebar content (filters, docs navigation) inside the
 * app frame's sidebar on desktop. Below the desktop breakpoint the frame has no
 * sidebar, so the content renders inline instead, or not at all.
 */
export function SidebarSlot({ children, mobile = "inline" }: { children: ReactNode; mobile?: "inline" | "hidden" }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    setTarget(document.getElementById(SIDEBAR_SLOT_ID));
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (desktop && target) return createPortal(children, target);
  return <div className="sidebar-slot-inline" data-mobile={mobile}>{children}</div>;
}
