
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { CARE_ROTA } from "@/content/case-studies";

export default function ProofCareRotaPage() {
  if (!CARE_ROTA.published) notFound();
  return <CaseStudyDetail study={CARE_ROTA} />;
}
