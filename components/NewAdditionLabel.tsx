"use client";

import { useEffect, useState } from "react";
import { isNewAddition, NEW_ADDITION_DURATION_MS } from "@/lib/new-additions";

/** Check in the browser so cached static pages never keep an expired label. */
export function NewAdditionLabel({ addedAt }: { addedAt?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const active = isNewAddition(addedAt, now);
    setVisible(active);
    if (!active || !addedAt) return;

    const timer = window.setTimeout(
      () => setVisible(false),
      Date.parse(addedAt) + NEW_ADDITION_DURATION_MS - now,
    );
    return () => window.clearTimeout(timer);
  }, [addedAt]);

  return visible ? <span className="new-addition-label">New additions</span> : null;
}
