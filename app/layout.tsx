import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { SplitNavigation } from "@/components/ui/split-navigation";
import { Footer } from "@/components/chrome/footer";
import { OrganizationJsonLd } from "@/components/seo/structured-data";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alchemetryx.com"),
  title: {
    default: "Alchemetryx · We rebuild the job in your head into a system that runs itself",
    template: "%s | Alchemetryx",
  },
  description:
    "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run. UK registered company 17199377.",
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Alchemetryx · We rebuild the job in your head into a system that runs itself",
    description:
      "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run.",
    url: "https://alchemetryx.com",
    siteName: "Alchemetryx",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Alchemetryx · Business Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alchemetryx · We rebuild the job in your head into a system that runs itself",
    description:
      "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run.",
    images: ["/og/default.png"],
  },
  icons: {
    icon: "/brand/alchemetryx-mark.png",
    shortcut: "/brand/alchemetryx-mark.png",
    apple: "/brand/alchemetryx-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable} suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen bg-[var(--color-pearl)] text-[var(--color-ink)] antialiased flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-[var(--color-gold)] px-4 py-2 rounded text-[var(--color-ink)] font-medium text-sm transition-colors hover:bg-[var(--color-gold-deep)] focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <SplitNavigation />
          <main id="main-content" className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
