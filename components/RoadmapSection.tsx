import { ArrowUpRight } from "lucide-react";

const items = [
  { title: "Dedicated pages for each library", status: "In progress", issue: 1 },
  { title: "Better library page experience", status: "Planned", issue: 2 },
  { title: "MCP servers and connectors", status: "Planned", issue: 4 },
] as const;

export function RoadmapSection() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="theme-border border-b bg-[#f7f7f5] px-5 py-24 dark:bg-[#10181a] sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="roadmap-title" className="theme-text text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Roadmap</h2>
            <p className="theme-muted mt-4 max-w-xl text-base leading-7">
              Upcoming features and changes are tracked as tickets in the GitHub repository.
            </p>
          </div>
          <a href="https://github.com/screen-gd/Col/issues" target="_blank" rel="noopener noreferrer" className="theme-text inline-flex min-h-11 w-fit items-center gap-2 border-b border-current text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2">
            View all issues <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
        <ul className="theme-border mt-12 border-t">
          {items.map(({ title, status, issue }) => (
            <li key={issue} className="theme-border border-b">
              <a href={`https://github.com/screen-gd/Col/issues/${issue}`} target="_blank" rel="noopener noreferrer" className="theme-text flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 focus-visible:outline-2 focus-visible:outline-offset-2">
                <span className="text-base font-medium sm:text-lg">{title}</span>
                <span className="flex items-center gap-4 text-sm">
                  <span className={status === "In progress" ? "text-[#1d4ed8] dark:text-[#69a9ff]" : "theme-muted"}>{status}</span>
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
