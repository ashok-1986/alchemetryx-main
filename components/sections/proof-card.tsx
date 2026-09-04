import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CaseStudyData {
  slug: string;
  title: string;
  client: string;
  category: string;
  type: "Client" | "Own-build";
  beforeMetric: { value: string; label: string };
  afterMetric: { value: string; label: string };
  summary: string;
  published: boolean;
}

export function ProofCard({ study }: { study: CaseStudyData }) {
  return (
    <article className="group rounded-[9px] bg-white border border-[var(--color-pearl-line)] p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-200 ease-out hover:border-[var(--color-gold)]/50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(26,38,66,0.08)]">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[var(--color-slate)] uppercase">
            {study.type}
          </span>
          <span className="px-2 py-0.5 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] border border-[var(--color-pearl-line)]">
            {study.category}
          </span>
        </div>

        <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] group-hover:text-[var(--color-sapphire)] transition-colors duration-200">
          {study.title}
        </h3>

        <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
          {study.summary}
        </p>

        {/* Real Numbers Before / After */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-pearl-line)]">
          <div className="space-y-1">
            <p className="text-xs text-[var(--color-slate)] uppercase tracking-wider">
              Before
            </p>
            <p className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
              {study.beforeMetric.value}
            </p>
            <p className="text-xs text-[var(--color-ink)]/70">
              {study.beforeMetric.label}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-[var(--color-slate)] uppercase tracking-wider">
              After
            </p>
            <p className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[var(--color-gold-deep)]">
              {study.afterMetric.value}
            </p>
            <p className="text-xs text-[var(--color-ink)]/70">
              {study.afterMetric.label}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href={`/proof/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink)] group-hover:text-[var(--color-gold-deep)] font-normal transition-colors duration-200"
        >
          <span>Read case study</span>
          <span className="inline-flex transition-transform duration-200 ease-out group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}
