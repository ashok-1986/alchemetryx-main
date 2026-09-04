import Link from "next/link";
import { SectionFullBleed } from "./section-full-bleed";
import { ProofCard } from "./proof-card";
import { getPublishedCaseStudies } from "@/content/case-studies-data";
import { Button } from "@/components/ui/button";

export function ProofSection() {
  const publishedStudies = getPublishedCaseStudies();

  return (
    <SectionFullBleed tone="light" id="proof">
      <div className="space-y-12">
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
            Verified Proof
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
            What we have actually built
          </h2>
          <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
            Every metric below comes from a delivered system. We measure the hours and the cost before, and stay to measure them after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedStudies.map((study) => (
            <ProofCard key={study.slug} study={study} />
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between">
          <p className="text-xs text-[var(--color-slate)]">
            Showing {publishedStudies.length} cleared case studies. Additional client reviews in progress.
          </p>
          <Button asChild variant="outline-light" size="sm">
            <Link href="/proof">View all proof</Link>
          </Button>
        </div>
      </div>
    </SectionFullBleed>
  );
}
