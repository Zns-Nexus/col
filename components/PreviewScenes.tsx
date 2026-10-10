import type { ReactNode } from "react";
import type { UseCase } from "@/data/libraries";

/**
 * Use-case scene templates — the chrome that places a story in a real page
 * context. One template per use case the shipped stories need; the page fails
 * loudly when a story names a scene with no template.
 */
export type SceneTemplate = (props: { children: ReactNode }) => React.ReactElement;

function LandingPagesScene({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Build your next page from parts that already fit</h1>
      <p className="text-muted-foreground">One promise about the product, right above the buttons.</p>
      {children}
    </section>
  );
}

function DashboardsScene({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </div>
      {children}
    </section>
  );
}

function MarketingSitesScene({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-semibold">Questions, answered</h2>
      {children}
    </section>
  );
}

function RapidPrototypingScene({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6">
      {children}
    </section>
  );
}

export const sceneTemplates: Partial<Record<UseCase, SceneTemplate>> = {
  "Landing Pages": LandingPagesScene,
  Dashboards: DashboardsScene,
  "Marketing Sites": MarketingSitesScene,
  "Rapid Prototyping": RapidPrototypingScene,
};
