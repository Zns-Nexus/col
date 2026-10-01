import type { Metadata } from "next";
import { Geist_Mono, Inter, Nunito } from "next/font/google";
import { siteUrl, socialImage } from "@/lib/site";
import { AppFrame } from "@/components/AppFrame";
import { SiteNotice } from "@/components/SiteNotice";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Web-safe stand-in for SF Pro Rounded, which Apple does not license for web embedding.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Col — Collection of Libraries",
  description: "We curate all the best libraries, so you don't have to.",
  icons: { icon: "/brand/col-mark.png" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Col",
    images: [{ url: socialImage, width: 1200, height: 630, type: "image/jpeg", alt: "Col: UI libraries. All in one place." }],
  },
  twitter: { card: "summary_large_image", site: "@Screeendev", images: [socialImage] },
  keywords: [
    "ui libraries",
    "component library",
    "react components",
    "tailwind",
    "design system",
    "frontend",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${nunito.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('col:theme');const l=t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.classList.toggle('light',l);document.documentElement.classList.toggle('dark',!l)}catch{}` }} />
      </head>
      <body
        className="min-h-screen font-sans"
      >
        <AppFrame>{children}</AppFrame>
        <SiteNotice />
      </body>
    </html>
  );
}
