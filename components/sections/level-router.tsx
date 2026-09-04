"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionFullBleed } from "./section-full-bleed";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Level = "not-yet" | "yes-we-have";

export function LevelRouter() {
  const [activeLevel, setActiveLevel] = useState<Level>("not-yet");

  return (
    <SectionFullBleed tone="light" id="level-router">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
            The Two Paths
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
            Have you bought AI yet?
          </h2>
          <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
            Your current situation dictates where we start. Choose your path below to see how we approach it.
          </p>
        </div>

        {/* The Two-Question Fork Selector */}
        <div
          role="tablist"
          aria-label="Have you bought AI yet"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Panel 1: Not yet */}
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === "not-yet"}
            aria-controls="panel-not-yet"
            id="tab-not-yet"
            onClick={() => setActiveLevel("not-yet")}
            className={cn(
              "text-left p-6 sm:p-8 rounded-[9px] border transition-all cursor-pointer",
              activeLevel === "not-yet"
                ? "bg-white border-[var(--color-ink)] text-[var(--color-ink)]"
                : "bg-white/50 border-[var(--color-pearl-line)] text-[var(--color-ink)]/70 hover:bg-white hover:border-[var(--color-pearl-line)]"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-normal uppercase tracking-wider text-[var(--color-slate)]">
                Level 1 · Adoption
              </span>
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  activeLevel === "not-yet"
                    ? "bg-[var(--color-gold-deep)]"
                    : "bg-transparent border border-[var(--color-pearl-line)]"
                )}
              />
            </div>
            <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
              Not yet
            </h3>
            <p className="mt-2 text-sm text-[var(--color-ink)]/80 leading-relaxed">
              Start with one process. AI is what makes it run without you.
            </p>
          </button>

          {/* Panel 2: Yes, we have */}
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === "yes-we-have"}
            aria-controls="panel-yes-we-have"
            id="tab-yes-we-have"
            onClick={() => setActiveLevel("yes-we-have")}
            className={cn(
              "text-left p-6 sm:p-8 rounded-[9px] border transition-all cursor-pointer",
              activeLevel === "yes-we-have"
                ? "bg-white border-[var(--color-ink)] text-[var(--color-ink)]"
                : "bg-white/50 border-[var(--color-pearl-line)] text-[var(--color-ink)]/70 hover:bg-white hover:border-[var(--color-pearl-line)]"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-normal uppercase tracking-wider text-[var(--color-slate)]">
                Level 2 · Usage
              </span>
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  activeLevel === "yes-we-have"
                    ? "bg-[var(--color-gold-deep)]"
                    : "bg-transparent border border-[var(--color-pearl-line)]"
                )}
              />
            </div>
            <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
              Yes, we have
            </h3>
            <p className="mt-2 text-sm text-[var(--color-ink)]/80 leading-relaxed">
              You bought the AI. Did anything change?
            </p>
          </button>
        </div>

        {/* Content Swapper (No page navigation) */}
        <div className="rounded-[9px] bg-white border border-[var(--color-pearl-line)] p-8 sm:p-12 min-h-[360px]">
          {activeLevel === "not-yet" ? (
            <div
              key="not-yet"
              role="tabpanel"
              id="panel-not-yet"
              aria-labelledby="tab-not-yet"
              className="space-y-6 max-w-[720px] animate-fade-in"
            >
              <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-normal">
                Adoption Track
              </div>
              <h4 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                Start with the single process costing you the most hours
              </h4>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                You do not need to buy software in search of a problem. You have an actual recurring process — rota management, invoice reconciliation, client onboarding, or claims — that currently demands constant management attention.
              </p>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                We identify that exact bottleneck, rebuild it so it runs deterministically on its own, and introduce AI only where it replaces manual entry and verification.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Button asChild variant="outline-light">
                  <Link href="/diagnostic">See how The Diagnostic works</Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/book">Book a 30-minute call</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div
              key="yes-we-have"
              role="tabpanel"
              id="panel-yes-we-have"
              aria-labelledby="tab-yes-we-have"
              className="space-y-6 max-w-[720px] animate-fade-in"
            >
              <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-normal">
                Usage Track
              </div>
              <h4 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                Audit your spend and turn separate tools into a working system
              </h4>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                You already bought subscriptions, user seats, or generative tools. But staff still copy and paste text across spreadsheets, second-guess outputs, or revert to manual methods because the tools are not tied together.
              </p>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                We audit what your spend actually returned, rebuild disconnected tools into a unified, accountable workflow, and put monitoring in place so you can verify that it actually runs.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Button asChild variant="outline-light">
                  <Link href="/diagnostic">Audit your AI usage</Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/book">Book a 30-minute call</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionFullBleed>
  );
}
