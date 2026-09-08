import type { Metadata } from "next";
import { CARE_ROTA } from "@/content/case-studies";

export const metadata: Metadata = {
  title: `${CARE_ROTA.title.split(".")[0]} · Alchemetryx`,
  description: CARE_ROTA.standfirst,
  alternates: {
    canonical: "/proof/care-rota",
  },
};

export default function CareRotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
