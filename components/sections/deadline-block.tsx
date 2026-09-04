import { MANDATES } from "@/content/mandates";
import { SectionFullBleed } from "./section-full-bleed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function DeadlineBlock() {
  const publishedMandates = MANDATES.filter((m) => m.published);
  
  // Sort published mandates by ascending date
  const sorted = [...publishedMandates].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const nearestMandate = sorted[0];

  return (
    <SectionFullBleed tone="light" id="deadlines">
      <div className="space-y-12">
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
            Regulatory Drivers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
            Upcoming statutory deadlines
          </h2>
          <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
            Regulatory requirements make manual administration unsustainable. We ensure your reporting, scheduling, and invoicing run reliably before statutory enforcement dates arrive.
          </p>
        </div>

        {/* Nearest Mandate Highlight Card */}
        {nearestMandate && (
          <div className="p-6 sm:p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[var(--color-gold-deep)] text-[var(--color-gold-deep)] font-normal text-xs">
                  Nearest Mandate · {nearestMandate.region}
                </Badge>
                <span className="text-xs text-[var(--color-slate)]">
                  Effective: {nearestMandate.date}
                </span>
              </div>
              <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                {nearestMandate.title}
              </h3>
              <p className="text-sm text-[var(--color-ink)]/75 max-w-[60ch]">
                {nearestMandate.description}
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <span className="text-xs text-[var(--color-slate)] block">
                Target Readiness
              </span>
              <span className="text-xl font-light text-[var(--color-ink)] font-mono">
                {nearestMandate.date}
              </span>
            </div>
          </div>
        )}

        {/* Accordion of All Active Mandates */}
        <div className="space-y-2">
          <p className="text-sm font-normal text-[var(--color-ink)]">
            Active regulatory mandates being monitored:
          </p>
          <Accordion type="single" collapsible className="w-full bg-white rounded-[9px] border border-[var(--color-pearl-line)] px-6">
            {sorted.map((mandate) => (
              <AccordionItem key={mandate.id} value={mandate.id} className="border-b border-[var(--color-pearl-line)] last:border-b-0">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-light text-lg text-[var(--color-ink)]">
                      {mandate.title}
                    </span>
                    <Badge variant="default" className="w-fit text-xs font-mono">
                      {mandate.region} · {mandate.date}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--color-ink)]/75 leading-relaxed pb-4">
                  {mandate.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionFullBleed>
  );
}
