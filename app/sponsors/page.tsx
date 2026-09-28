import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsSection } from "@/components/SponsorsSection";

export const metadata: Metadata = {
  title: "Sponsors — Col",
  description: "Support Col and help keep the library directory free and maintained.",
};

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main className="contributors-page min-h-screen pt-(--site-header-height)">
        <SponsorsSection />
      </main>
      <SiteFooter />
    </>
  );
}
