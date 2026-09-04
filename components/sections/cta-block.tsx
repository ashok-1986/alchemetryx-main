import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import { SectionFullBleed } from "./section-full-bleed";

interface CtaBlockProps {
  headline?: string;
  subhead?: string;
}

export function CtaBlock({
  headline = "Ready to make your highest-friction process run on its own?",
  subhead = "We start with a 30-minute diagnostic call to review your current workflow, identify the primary bottleneck, and assess whether automation makes commercial sense.",
}: CtaBlockProps) {
  return (
    <SectionFullBleed tone="dark" className="text-center py-20 sm:py-28">
      <div className="max-w-[720px] mx-auto space-y-6">
        <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-tight">
          {headline}
        </h2>
        <p className="text-base sm:text-lg font-normal text-[var(--color-slate)] leading-relaxed max-w-[55ch] mx-auto">
          {subhead}
        </p>
        <div className="pt-4">
          <Button asChild variant="primary" size="lg">
            <Link href={COMPANY_INFO.primaryCtaHref}>
              {COMPANY_INFO.primaryCtaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </SectionFullBleed>
  );
}
