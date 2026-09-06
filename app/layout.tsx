import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/chrome/nav";
import { NavRail } from "@/components/chrome/nav-rail";
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
    default: "Alchemetryx — good work shouldn't depend on who knows how",
    template: "%s | Alchemetryx",
  },
  description:
    "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run. UK registered company 17199377.",
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
      "en-IN": "/india",
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
    <html lang="en" className={urbanist.variable}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen bg-[var(--color-pearl)] text-[var(--color-ink)] antialiased flex flex-col">
        <SmoothScroll>
          <Nav />
          <NavRail />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
