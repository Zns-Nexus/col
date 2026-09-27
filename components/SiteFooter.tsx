import Image from "next/image";

const links = [
  ["Libraries", "/libraries"],
  ["Docs", "/docs"],
  ["Contributors", "/contributors"],
  ["Sponsors", "/sponsors"],
  ["GitHub", "https://github.com/screen-gd/Col"],
  ["Contribute", "https://github.com/screen-gd/Col/issues/new/choose"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer-panel theme-border border-t px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-5">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold text-white" aria-label="Col home">
          <Image src="/brand/col-mark.png" alt="" width={22} height={22} className="size-[22px] object-contain" />
          Col
        </a>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="footer-link" {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {label}
            </a>
          ))}
        </nav>
        <p className="ml-auto text-xs text-white/55">
          © {new Date().getFullYear()} Screen · <a className="footer-link" href="https://github.com/screen-gd/Col/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT license</a>
        </p>
      </div>
    </footer>
  );
}
