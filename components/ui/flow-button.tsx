"use client";

// Col-specific CTA introduced in c09f13d; no upstream component source is recorded.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowButtonProps = {
  text?: string;
  href?: string;
  className?: string;
};

export function FlowButton({ text = "Modern Button", href, className }: FlowButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] transition-colors duration-150 hover:border-[#333333]/60 hover:bg-[#111111]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2",
    className,
  );
  const content = (
    <>
      <span>{text}</span>
      <ArrowRight aria-hidden className="size-4" />
    </>
  );

  return href ? <Link href={href} className={classes}>{content}</Link> : <button type="button" className={classes}>{content}</button>;
}
