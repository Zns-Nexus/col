import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./HomePage.module.css";

const REPO_URL = "https://github.com/screen-gd/Col";

const links = [
  ["Libraries", "/libraries"],
  ["Docs", "/docs"],
  ["Contributors", "/contributors"],
  ["Sponsors", "/sponsors"],
  ["GitHub", REPO_URL],
  ["Contribute", `${REPO_URL}/issues/new/choose`],
] as const;

/** Slim one-row site footer: brand, links, and the legal line. Wraps on narrow screens. Also used on the 404 page. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.brand} aria-label="Col home">
        <Image src="/brand/col-mark.png" alt="" width={18} height={18} />Col
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
      <p className={styles.footerLegal}>
        © {new Date().getFullYear()} Screen · <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">MIT license</a>
      </p>
    </footer>
  );
}
