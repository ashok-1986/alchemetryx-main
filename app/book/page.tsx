import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { BookingEmbed } from "@/components/sections/booking-embed";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Half an hour with Ashok Verma. Tell us which job you would hand over first.",
};

export default function BookPage() {
  return (
    <SectionFullBleed tone="light" className="pt-16 pb-24 md:pt-24">
      <div className="max-w-[52ch]">
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em]">
          Book a 30-minute call
        </h1>
        <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-[var(--color-ink)]/75">
          Pick a time that suits you. No deck, no pitch. Come with the job that eats your week and we will talk through whether it is worth rebuilding.
        </p>
      </div>
      <div className="mt-12 min-h-[70vh] rounded-md border border-[var(--color-pearl-line)] overflow-hidden">
        <BookingEmbed />
      </div>
    </SectionFullBleed>
  );
}
