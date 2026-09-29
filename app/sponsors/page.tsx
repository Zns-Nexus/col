import type { Metadata } from "next";
import { SponsorsSection } from "@/components/SponsorsSection";

export const metadata: Metadata = {
  title: "Sponsors — Col",
  description: "Support Col and help keep the library directory free and maintained.",
};

export default function SponsorsPage() {
  return <SponsorsSection />;
}
