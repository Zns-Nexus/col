import { pageMetadata } from "@/lib/site";
import { SponsorsSection } from "@/components/SponsorsSection";

export const metadata = pageMetadata(
  "/sponsors",
  "Sponsors | Col",
  "Support Col and help keep the UI library directory free and maintained.",
);

export default function SponsorsPage() {
  return <SponsorsSection />;
}
