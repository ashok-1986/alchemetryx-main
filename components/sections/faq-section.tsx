import { SectionFullBleed } from "./section-full-bleed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd, FaqItem } from "@/components/seo/structured-data";

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Do you publish your prices?",
    answer:
      "No. We scope engagements to the exact workflow complexity and technical requirements of your business rather than offering generic rate cards. Fixed costs and delivery timelines are agreed upfront during the Diagnostic before any build work commences.",
  },
  {
    question: "What is the difference between the Diagnostic and the Build?",
    answer:
      "The Diagnostic is a 2-week investigation that measures the hours and financial loss in your current workflow and produces a technical blueprint. The Build is a 4-to-8-week engineering engagement that writes deterministic code, connects your software, and puts the automated system into live production.",
  },
  {
    question: "We already bought an AI tool. Why would we need this?",
    answer:
      "Buying standalone software subscriptions rarely eliminates manual work. Staff often still copy and paste data across spreadsheets and fix errors by hand. We connect disconnected tools into a unified system that operates reliably without requiring constant human babysitting.",
  },
  {
    question: "How long does a typical build take to complete?",
    answer:
      "A standard build takes between 4 and 8 weeks. We work directly inside your cloud or database environment, run shadow validation concurrently with your manual process to confirm accuracy, and hand over a verified system with zero business disruption.",
  },
  {
    question: "Do you work with businesses outside the United Kingdom?",
    answer:
      "Yes. In addition to our London office, we operate an engineering and solutions office in Pune, India, specifically delivering compliance automation and financial workflow integrations for high-growth Indian enterprises.",
  },
];

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

export function FaqSection({
  title = "Frequently answered questions",
  subtitle = "Direct answers to common questions about our delivery model, pricing approach, and systems engineering.",
  items = DEFAULT_FAQS,
}: FaqSectionProps) {
  return (
    <SectionFullBleed tone="light" id="faq">
      {/* Synchronized JSON-LD schema for AEO & rich search snippet matching */}
      <FaqJsonLd items={items} />

      <div className="space-y-12">
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
            Questions & Answers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
            {title}
          </h2>
          <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-[9px] border border-[var(--color-pearl-line)] px-6 sm:px-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-[var(--color-pearl-line)] last:border-b-0 py-2"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-light text-lg sm:text-xl text-[var(--color-ink)]">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-[var(--color-ink)]/75 leading-relaxed pb-4 max-w-[65ch]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionFullBleed>
  );
}
