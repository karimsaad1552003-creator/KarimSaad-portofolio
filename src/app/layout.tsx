import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const { seo, personal } = portfolioData;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${personal.fullName}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: personal.fullName }],
  creator: personal.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seo.siteUrl,
    title: seo.title,
    description: seo.description,
    siteName: personal.fullName,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: personal.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: seo.siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.fullName,
    jobTitle: personal.title,
    email: personal.email,
    telephone: personal.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alexandria",
      addressCountry: "EG",
    },
    url: seo.siteUrl,
    image: `${seo.siteUrl}${personal.photo}`,
    sameAs: portfolioData.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-fg)]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
