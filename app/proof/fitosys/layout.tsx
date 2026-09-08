import type { Metadata } from "next";
import { FITOSYS } from "@/content/case-studies";

export const metadata: Metadata = {
  title: `${FITOSYS.title.split(".")[0]} · Alchemetryx`,
  description: FITOSYS.standfirst,
  alternates: {
    canonical: "/proof/fitosys",
  },
};

export default function FitosysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
