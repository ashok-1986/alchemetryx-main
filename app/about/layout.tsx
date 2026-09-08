import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The thinking behind Alchemetryx. We rebuild one critical process into a system that runs itself.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Alchemetryx",
    description: "The thinking behind Alchemetryx. We rebuild one critical process into a system that runs itself.",
    url: "https://alchemetryx.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
