
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { MEET_PRERNA } from "@/content/case-studies";

export default function ProofMEETPRERNAPage() {
  if (!MEET_PRERNA.published) notFound();
  return <CaseStudyDetail study={MEET_PRERNA} />;
}
