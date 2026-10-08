import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { repo, repoFile } from "@/lib/repo";
import styles from "./HomePage.module.css";

const links = [
  ["Libraries", "/libraries"],
  ["MCP", "/mcp"],
  ["Docs", "/docs"],
  ["Contributors", "/contributors"],
  ["Sponsors", "/sponsors"],
  ["git.cafe", repo.url],
  ["Contribute", repo.newIssue],
] as const;

/** Site footer with brand, links, product badge, and legal line. Also used on the 404 page. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.brand} aria-label="Col home">
        <Image src="/brand/col-mark.svg" alt="" width={20} height={20} />Col
      </Link>
      <nav className={styles.footerNav} aria-label="Footer">
        {links.map(([label, href]) => {
          const external = href.startsWith("https://");
          return (
            <Link key={href} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {label}{external && <ArrowUpRight aria-hidden />}
            </Link>
          );
        })}
      </nav>
      <a href="https://www.dotstore.io/launches/2026-w41/col" target="_blank" rel="noopener noreferrer" className={styles.productBadge}>
        <Image src="https://www.dotstore.io/launches/2026-w41/col/badge/award-dark.svg" alt="Col on dotstore" width={250} height={56} unoptimized className={styles.badgeDark} />
        <Image src="https://www.dotstore.io/launches/2026-w41/col/badge/award-light.svg" alt="Col on dotstore" width={250} height={56} unoptimized className={styles.badgeLight} />
      </a>
      <p className={styles.footerLegal}>
        © {new Date().getFullYear()} Screen · <a href={repoFile("LICENSE")} target="_blank" rel="noopener noreferrer">MIT license</a>
      </p>
    </footer>
  );
}
