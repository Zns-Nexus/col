import { LibraryExplorer } from "@/components/LibraryExplorer";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";
import styles from "@/components/HomePage.module.css";

export const revalidate = 300;

export default function Home() {
  return (
    <div className={styles.page}>
      <LibraryExplorer />
      <WhatsInsideSection />
      <RoadmapSection />
      <SiteFooter />
    </div>
  );
}
