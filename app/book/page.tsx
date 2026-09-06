import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { BookingEmbed } from "@/components/sections/booking-embed";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Half an hour with Ashok Verma. Tell us which job you would hand over first.",
};

export default function BookPage() {
  return (
    <SectionFullBleed tone="light" className="pt-32 pb-24 md:pt-36">
      <div className="max-w-[52ch]">
        <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] tracking-[-0.035em] text-[var(--color-ink)]">
          Book a 30-minute call
        </h1>
        <p className="mt-5 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          Pick a time that suits you. No deck, no pitch. Come with the job that eats your week and we will talk through whether it is worth rebuilding.
        </p>
      </div>
      <div className="mt-12 min-h-[70vh] rounded-md border border-[var(--color-pearl-line)] overflow-hidden">
        <BookingEmbed />
      </div>
    </SectionFullBleed>
  );
}
