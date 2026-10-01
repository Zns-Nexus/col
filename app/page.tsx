import { HeroBackdrop, HeroCopy } from "@/components/HomeHero";
import { HomeStory } from "@/components/HomeStory";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";
import styles from "@/components/HomePage.module.css";

export const revalidate = 300;

/** The homepage plays as one pinned screen: hero, then details, then the roadmap with the footer (see HomeStory). */
export default function Home() {
  return (
    <div className={styles.page}>
      <HomeStory
        backdrop={<HeroBackdrop />}
        scenes={[
          { id: "hero", content: <HeroCopy /> },
          { id: "details", content: <WhatsInsideSection /> },
          { id: "roadmap", content: <><RoadmapSection /><SiteFooter /></> },
        ]}
      />
    </div>
  );
}
