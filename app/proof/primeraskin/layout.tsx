import type { Metadata } from "next";
import { PRIMERASKIN } from "@/content/case-studies";

export const metadata: Metadata = {
  title: `${PRIMERASKIN.title.split(".")[0]} · Alchemetryx`,
  description: PRIMERASKIN.standfirst,
  alternates: {
    canonical: "/proof/primeraskin",
  },
};

export default function PRIMERASKINLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
