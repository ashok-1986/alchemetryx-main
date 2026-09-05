import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/chrome/nav";
import { Footer } from "@/components/chrome/footer";
import { OrganizationJsonLd } from "@/components/seo/structured-data";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alchemetryx.com"),
  title: {
    default: "Alchemetryx — the job that runs on you, rebuilt",
    template: "%s | Alchemetryx",
  },
  description:
    "We rebuild the one job that runs on you, so it runs without you. UK registered company 17199377.",
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
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
