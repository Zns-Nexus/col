"use client";

import { BookOpen, GitFork, Layers3, LayoutGrid, Star } from "lucide-react";
import { CATEGORIES, STACKS, libraries } from "@/data/libraries";
import { Button } from "@/components/ui/button";
import { FlowButton } from "@/components/ui/flow-button";

export function LibraryExplorer() {
  const openLibrary = (search: string) => {
    const queryString = search.trim();
    window.location.assign(queryString ? `/libraries?q=${encodeURIComponent(queryString)}` : "/libraries");
  };

  const stats = [
    { value: `${libraries.length}`, label: "Curated libraries", Icon: BookOpen },
    { value: `${CATEGORIES.length}`, label: "Categories", Icon: LayoutGrid },
    { value: `${STACKS.length}`, label: "Tech stacks", Icon: Layers3 },
    { value: "100%", label: "Open source", Icon: GitFork },
  ];

  return (
    <section className="hero-wash relative h-svh min-h-[760px] overflow-hidden">
      <div className="relative z-10 mx-auto grid h-full w-full items-center px-6 pt-24 pb-36 sm:px-8 xl:px-[clamp(2rem,8vw,9rem)] 2xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:pt-24 xl:pb-36">
        <div data-trail-safe className="hero-copy animate-fade-up mx-auto w-full max-w-[720px] xl:mx-0 2xl:-translate-y-12">
          <h1 className="font-display hero-headline max-w-[660px] text-[clamp(3rem,4vw,4.5rem)] leading-[1.01] font-bold tracking-[-0.025em]">
            The libraries that developers love,
            <span className="hero-pixel-line mt-1 block font-pixel-square text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.1] font-bold tracking-normal">
              all in one place
            </span>
          </h1>
          <p className="hero-description mt-5 max-w-[560px] text-base leading-[1.55] font-medium sm:text-[17px]">
            Discover UI libraries, components, and tools by stack and use case.
          </p>
          <div className="animate-fade-up delay-1 hero-actions mt-8 flex w-full flex-wrap justify-start gap-3">
            <FlowButton href="/libraries" text="Browse Libraries" className="hero-flow-button min-h-[52px] px-8" />
            <Button asChild variant="outline" size="lg" className="hero-liquid-github h-[52px] px-7">
              <a href="https://github.com/screen-gd/Col" target="_blank" rel="noopener noreferrer">
                <Star className="size-4" aria-hidden />
                Star on GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-[52px] rounded-xl px-7 text-sm">
              <a href="https://github.com/screen-gd/Col/issues/new" target="_blank" rel="noopener noreferrer">Submit</a>
            </Button>
          </div>
          <div className="animate-fade-up delay-2 mt-5 flex max-w-3xl flex-wrap items-center justify-start gap-2 text-sm">
            <span className="hero-popular mr-2 font-pixel text-xs tracking-[0.08em] uppercase">Popular</span>
            {(["React", "Animation", "Tailwind", "Components", "Icons", "3D"] as const).map((filter) => (
              <Button
                key={filter}
                type="button"
                variant="outline"
                onClick={() => openLibrary(filter)}
                className="popular-filter-button h-8 rounded-full px-4 py-0 text-xs font-medium shadow-none"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div data-trail-safe className="hero-stats absolute bottom-10 left-1/2 z-10 hidden w-[min(1408px,calc(100%-3rem))] -translate-x-1/2 grid-cols-2 md:grid md:grid-cols-4">
        {stats.map(({ value, label, Icon }, index) => (
          <div key={label} className={`hero-stat flex items-center gap-4 px-5 py-2 ${index > 0 ? "border-l" : ""}`}>
            <span className="hero-stat-icon grid size-12 shrink-0 place-items-center rounded-xl border">
              <Icon className="size-5" aria-hidden />
            </span>
            <span>
              <strong className="hero-stat-value block text-2xl font-semibold tracking-[-0.03em] tabular-nums">{value}</strong>
              <span className="hero-stat-label mt-0.5 block text-[10px] leading-4 font-semibold tracking-[0.08em] uppercase">{label}</span>
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
