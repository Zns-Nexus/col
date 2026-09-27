import { LibraryExplorer } from "@/components/LibraryExplorer";
import { Header } from "@/components/Header";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full max-w-full overflow-x-hidden">
        <LibraryExplorer />
        <WhatsInsideSection />
        <RoadmapSection />
      </main>
      <SiteFooter />
    </>
  );
}
