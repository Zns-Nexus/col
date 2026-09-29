import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsSection } from "@/components/SponsorsSection";

export const metadata: Metadata = {
  title: "Sponsors — Col",
  description: "Support Col and help keep the library directory free and maintained.",
};

export default function SponsorsPage() {
  return (
    <>
      <div className="contributors-page">
        <SponsorsSection />
      </div>
      <SiteFooter />
    </>
  );
}
