import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialBlock() {
  return (
    <SectionFullBleed id="testimonial" tone="light" className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
      <Reveal>
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
          <blockquote className="text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-snug tracking-[-0.02em] text-[var(--color-ink)]">
            &quot;Alchemetryx completely changed how we ran the festival. The application system saved us hours of confusing emails, and they really understood what we needed as a community event. Highly recommend!&quot;
          </blockquote>
          <cite className="block mt-8 text-base md:text-lg font-normal text-[var(--color-ink)]/70 not-italic">
            — Martine Eni, Founder, Diversity Festival
          </cite>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
