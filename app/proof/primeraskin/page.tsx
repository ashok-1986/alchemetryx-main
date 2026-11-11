
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { PRIMERASKIN } from "@/content/case-studies";

export default function ProofPRIMERASKINPage() {
  if (!PRIMERASKIN.published) notFound();
  return <CaseStudyDetail study={PRIMERASKIN} />;
}
