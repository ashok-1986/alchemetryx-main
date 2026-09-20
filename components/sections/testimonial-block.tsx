import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialBlock() {
  return (
    <SectionFullBleed id="testimonial" tone="light" className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
      <Reveal>
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
          <blockquote className="text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-snug tracking-[-0.02em] text-[var(--color-ink)]">
            &quot;Before, stallholder applications came through calls, emails and messages, and I was constantly checking conversations to see who had applied and who still needed a reply. Now they apply through the website, everything lands in one place, and they get an instant acknowledgement. It has saved me hours and I can see every enquiry at a glance.&quot;
          </blockquote>
          <cite className="block mt-8 text-base md:text-lg font-normal text-[var(--color-ink)]/70 not-italic">
            — Martine Eni, Diversity Festival
          </cite>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
