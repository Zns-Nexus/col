import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <p className="docs-accent text-sm font-semibold">404</p>
        <h1 className="theme-text mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="theme-muted mt-4">The page you requested does not exist.</p>
        <Link href="/" className="hero-cta hero-cta-primary mt-8 min-h-11">Back to home</Link>
      </div>
      <SiteFooter />
    </>
  );
}
