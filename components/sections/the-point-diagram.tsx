import React from "react";

interface ThePointDiagramProps {
  className?: string;
}

/**
 * Visual diagram for "THE POINT" section.
 * Recreates the comparison card mockup using Alchemetryx brand tokens
 * (Sapphire #1A2642, Gold #D4AF37, Pearl #F8F6F0, Slate, Ink)
 * with zero text and zero brand names.
 */
export function ThePointDiagram({ className = "" }: ThePointDiagramProps) {
  return (
    <div
      className={`relative w-full max-w-[540px] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer Browser Window */}
      <div className="rounded-2xl border border-[var(--color-sapphire)]/15 bg-[#FCFAF6] p-4 md:p-6 shadow-xl shadow-black/5">
        {/* Browser Top Bar with 3 dots */}
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[var(--color-sapphire)]/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sapphire)]/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sapphire)]/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sapphire)]/25" />
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
          {/* Left Card: Before / Disconnected Tools (Muted Neutrals) */}
          <div className="rounded-xl border border-black/5 bg-white/80 p-3.5 md:p-4 flex flex-col justify-between h-[150px] md:h-[175px]">
            <div>
              {/* Category placeholder */}
              <div className="w-14 md:w-16 h-2.5 rounded-full bg-black/15 mb-3 md:mb-4" />
              {/* Skeleton lines */}
              <div className="w-full h-2 rounded-full bg-black/10 mb-2" />
              <div className="w-3/4 h-2 rounded-full bg-black/10" />
            </div>
            {/* Muted Button Shape */}
            <div className="w-16 md:w-20 h-7 md:h-8 rounded-lg bg-black/10" />
          </div>

          {/* Right Card: After / Cohesive System (Alchemetryx Sapphire & Gold) */}
          <div className="rounded-xl border border-[var(--color-sapphire)]/20 bg-white p-3.5 md:p-4 flex flex-col justify-between h-[150px] md:h-[175px] shadow-sm relative overflow-hidden">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-sapphire)]" />
            <div>
              {/* Active category placeholder (Sapphire) */}
              <div className="w-14 md:w-16 h-2.5 rounded-full bg-[var(--color-sapphire)] mb-3 md:mb-4" />
              {/* Prominent accent skeleton line (Gold) */}
              <div className="w-full h-2.5 rounded-full bg-[var(--color-gold)] mb-2" />
              {/* Secondary skeleton line */}
              <div className="w-4/5 h-2 rounded-full bg-[var(--color-sapphire)]/25" />
            </div>
            {/* Active Pill Button Shape (Sapphire) */}
            <div className="w-20 md:w-24 h-7 md:h-8 rounded-lg bg-[var(--color-sapphire)] shadow-sm" />
          </div>
        </div>

        {/* Bottom Spec Pill Badge (Floating at bottom center/left) */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-sapphire)]/15 bg-white px-3 py-1.5 shadow-sm">
          {/* Minimal Document Icon */}
          <svg
            className="w-4 h-4 text-[var(--color-sapphire)]/70 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          {/* Skeleton file name line */}
          <span className="w-20 md:w-24 h-2 rounded-full bg-[var(--color-sapphire)]/30" />
        </div>
      </div>
    </div>
  );
}
