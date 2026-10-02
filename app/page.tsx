import { pageMetadata, siteUrl } from "@/lib/site";
import { HeroBackdrop, HeroCopy } from "@/components/HomeHero";
import { HomeStory } from "@/components/HomeStory";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";
import styles from "@/components/HomePage.module.css";

export const metadata = pageMetadata(
  "/",
  "Col | UI Library Directory",
  "Discover UI libraries by framework, category, and use case. Search documented components, compare setup options, and visit official project sources.",
);

export const revalidate = 300;

/** The homepage plays as one pinned screen: hero, then details, then the roadmap with the footer (see HomeStory). */
export default function Home() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Col",
        url: `${siteUrl}/`,
        description: "A community-maintained directory for discovering UI libraries by category, stack, and use case.",
      }).replace(/</g, "\\u003c") }} />
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
