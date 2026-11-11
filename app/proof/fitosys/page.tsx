
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { FITOSYS } from "@/content/case-studies";

export default function ProofFitosysPage() {
  if (!FITOSYS.published) notFound();
  return <CaseStudyDetail study={FITOSYS} />;
}
