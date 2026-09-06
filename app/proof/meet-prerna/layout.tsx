import type { Metadata } from "next";
import { MEET_PRERNA } from "@/content/case-studies";

export const metadata: Metadata = {
  title: `${MEET_PRERNA.title.split(".")[0]} · Alchemetryx`,
  description: MEET_PRERNA.standfirst,
};

export default function MEETPRERNALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
