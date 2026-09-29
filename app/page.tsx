import { LibraryExplorer } from "@/components/LibraryExplorer";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";

export const revalidate = 300;

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <LibraryExplorer />
      <WhatsInsideSection />
      <RoadmapSection />
      <SiteFooter />
    </div>
  );
}
