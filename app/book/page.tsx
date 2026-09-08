import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { BookingEmbed } from "@/components/sections/booking-embed";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Half an hour with Ashok Verma. Tell us which job you would hand over first.",
  alternates: {
    canonical: "/book",
  },
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

      {/* Fallback & crawler-accessible direct booking link */}
      <div className="mt-6 text-sm text-[var(--color-slate)]">
        <p>
          Having trouble viewing the calendar or prefer a direct link?{" "}
          <a
            href="https://cal.id/ashok-verma/quick-call"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Open scheduling page directly on cal.id ↗
          </a>{" "}
          or email us at{" "}
          <a
            href="mailto:support@alchemetryx.com"
            className="text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold-deep)] transition-colors"
          >
            support@alchemetryx.com
          </a>.
        </p>
        <noscript>
          <p className="mt-2 text-red-600">
            JavaScript is required to display the interactive calendar. Please{" "}
            <a href="https://cal.id/ashok-verma/quick-call" className="underline">
              click here to book directly on cal.id
            </a>.
          </p>
        </noscript>
      </div>
    </SectionFullBleed>
  );
}
