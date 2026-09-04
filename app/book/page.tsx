"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, UserCheck } from "lucide-react";

type Region = "UK" | "IN";

function BookContent() {
  const searchParams = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Derive region state during render without an effect (rerender-derived-state-no-effect)
  const urlRegion = searchParams.get("region") === "IN" ? "IN" : "UK";
  const region: Region = selectedRegion ?? urlRegion;

  const consultant =
    region === "UK"
      ? {
          name: "Nimish",
          title: "Systems & Technical Delivery",
          focus: "UK SME processes (Rota, invoicing, compliance)",
          timezone: "London / GMT",
          calendarId: "alchemetryx-uk",
        }
      : {
          name: "Ashok",
          title: "Commercial & Solutions Architecture",
          focus: "India billing, e-invoicing & financial workflows",
          timezone: "IST / India",
          calendarId: "alchemetryx-in",
        };

  return (
    <div className="space-y-10">
      {/* Region Switcher */}
      <div className="space-y-3">
        <label className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)] block">
          Select Your Geographic Region
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedRegion("UK")}
            className={cn(
              "px-5 py-2.5 rounded-[6px] text-sm transition-colors border cursor-pointer flex items-center gap-2",
              region === "UK"
                ? "bg-[var(--color-sapphire)] text-[var(--color-pearl)] border-[var(--color-sapphire)]"
                : "bg-white text-[var(--color-ink)] border-[var(--color-pearl-line)] hover:bg-[var(--color-pearl)]"
            )}
          >
            <span className="font-mono text-xs">🇬🇧</span>
            <span>United Kingdom (Nimish)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRegion("IN")}
            className={cn(
              "px-5 py-2.5 rounded-[6px] text-sm transition-colors border cursor-pointer flex items-center gap-2",
              region === "IN"
                ? "bg-[var(--color-sapphire)] text-[var(--color-pearl)] border-[var(--color-sapphire)]"
                : "bg-white text-[var(--color-ink)] border-[var(--color-pearl-line)] hover:bg-[var(--color-pearl)]"
            )}
          >
            <span className="font-mono text-xs">🇮🇳</span>
            <span>India & International (Ashok)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Call Details Card */}
        <div key={`consultant-${region}`} className="lg:col-span-5 space-y-6 animate-fade-in">
          <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-6">
            <div className="space-y-2 border-b border-[var(--color-pearl-line)] pb-6">
              <span className="text-xs font-mono uppercase text-[var(--color-slate)]">
                Meeting Host
              </span>
              <h3 className="text-2xl font-light text-[var(--color-ink)]">
                {consultant.name}
              </h3>
              <p className="text-xs text-[var(--color-gold-deep)] font-mono">
                {consultant.title}
              </p>
              <p className="text-sm text-[var(--color-ink)]/75 pt-1">
                {consultant.focus}
              </p>
            </div>

            <div className="space-y-4 text-sm text-[var(--color-ink)]/80">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[var(--color-gold-deep)] shrink-0" />
                <span>30 minutes · Video conference</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--color-gold-deep)] shrink-0" />
                <span>Timezone: {consultant.timezone}</span>
              </div>
              <div className="flex items-center gap-3">
                <UserCheck className="h-4 w-4 text-[var(--color-gold-deep)] shrink-0" />
                <span>Direct discussion with engineering lead</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--color-gold-deep)] shrink-0" />
                <span>
                  {region === "UK" ? COMPANY_INFO.ukAddress : COMPANY_INFO.indiaAddress}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-pearl-line)] text-xs text-[var(--color-slate)] leading-relaxed space-y-2">
              <p>
                <strong>What we discuss:</strong> What your highest-cost manual process is, how many hours it takes, what tools you currently touch, and whether automating it is technically and commercially viable.
              </p>
              <p>
                No sales deck. You speak directly to the engineer or solutions architect who builds the system.
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Embed Surface */}
        <div key={`calendar-${region}`} className="lg:col-span-7 animate-fade-in">
          <div className="rounded-[9px] bg-white border border-[var(--color-pearl-line)] p-6 sm:p-8 min-h-[520px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--color-pearl-line)] pb-4">
                <span className="text-xs font-mono text-[var(--color-slate)] uppercase">
                  Shared Calendar · {region}
                </span>
                <span className="text-xs text-[var(--color-gold-deep)] font-normal">
                  Instant Confirmation
                </span>
              </div>

              <div className="w-full bg-[var(--color-pearl)]/50 rounded-[6px] border border-[var(--color-pearl-line)] p-6 sm:p-10 text-center space-y-6 my-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[var(--color-pearl-line)] mx-auto flex items-center justify-center text-[var(--color-gold-deep)]">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="space-y-2 max-w-[450px] mx-auto">
                  <h4 className="text-xl font-light text-[var(--color-ink)]">
                    Select a time with {consultant.name}
                  </h4>
                  <p className="text-xs text-[var(--color-ink)]/75 leading-relaxed">
                    Choose a convenient slot on our live calendar. A Google Meet link and calendar invitation will be dispatched instantly.
                  </p>
                </div>

                <div className="pt-2">
                  <iframe
                    src={`https://forms.fillout.com/t/${consultant.calendarId}?region=${region}`}
                    title={`Book a 30-minute call with ${consultant.name}`}
                    className="w-full min-h-[380px] rounded-[6px] border border-[var(--color-pearl-line)] bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-pearl-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-slate)]">
              <span>Need an alternative time?</span>
              <a
                href="mailto:team@alchemetryx.com"
                className="text-[var(--color-gold-deep)] hover:underline"
              >
                team@alchemetryx.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Header: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-[850px] space-y-6">
          <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
            Introductory Consultation
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
            Book a 30-minute call
          </h1>
          <p className="text-lg sm:text-xl font-light text-[var(--color-slate)] max-w-[65ch] leading-relaxed">
            We review your current business workflow, measure the friction and hours consumed, and assess whether building automation provides a clear commercial return.
          </p>
        </div>
      </SectionFullBleed>

      {/* 2. Content with Suspense Boundary for useSearchParams */}
      <SectionFullBleed tone="light">
        <Suspense fallback={<div className="py-12 text-center text-sm text-[var(--color-slate)]">Loading calendar...</div>}>
          <BookContent />
        </Suspense>
      </SectionFullBleed>
    </div>
  );
}
