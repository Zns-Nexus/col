"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { repo } from "@/lib/repo";

const noticeKey = "col:mcp-library-rework-notice-dismissed";

export function SiteNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(sessionStorage.getItem(noticeKey) !== "true");
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(noticeKey, "true");
    } catch {
      // The notice still closes when storage is unavailable.
    }
  };

  if (!open) return null;

  return (
    <aside aria-labelledby="site-notice-title" className="site-notice fixed inset-x-0 bottom-0 z-[60] border-t border-zinc-200 bg-white px-5 py-5 text-black dark:border-white/20 dark:bg-black dark:text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="site-notice-title" className="text-base font-semibold">MCP and library page updates</h2>
          <p className="mt-1 text-sm leading-6">We’ll be reworking Col’s MCP and dedicated library pages.</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <Button asChild className="site-notice-cta min-h-11 rounded-none bg-[#0800ff] px-4 text-sm font-semibold text-white hover:bg-[#241eff]">
            <a href={repo.newIssue} target="_blank" rel="noopener noreferrer">
              Open an issue
            </a>
          </Button>
          <Button type="button" variant="link" onClick={close} className="site-notice-close min-h-11 px-0 text-sm text-inherit underline underline-offset-4">
            Close notice
          </Button>
        </div>
      </div>
    </aside>
  );
}
