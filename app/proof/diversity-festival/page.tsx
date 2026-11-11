import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { DIVERSITY_FESTIVAL } from "@/content/case-studies";

export default function ProofDiversityFestivalPage() {
  if (!DIVERSITY_FESTIVAL.published) notFound();
  return <CaseStudyDetail study={DIVERSITY_FESTIVAL} />;
}
