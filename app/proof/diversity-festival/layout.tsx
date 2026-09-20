import type { Metadata } from "next";
import { DIVERSITY_FESTIVAL } from "@/content/case-studies";

export const metadata: Metadata = {
  title: `${DIVERSITY_FESTIVAL.title.split(".")[0]} · Alchemetryx`,
  description: DIVERSITY_FESTIVAL.standfirst,
  alternates: {
    canonical: "/proof/diversity-festival",
  },
};

export default function DiversityFestivalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
