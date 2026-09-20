"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseWeekAnswers } from "@/lib/parseWeekAnswers";
import { computeResult } from "@/lib/score";
import { Reveal } from "@/components/motion/reveal";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  // Build real URLSearchParams
  // Next.js useSearchParams might be empty before the router is ready on static exports,
  // so we fall back to window.location.search to ensure we don't prematurely throw "q1 missing".
  const queryStr = searchParams.toString() || window.location.search;
  const urlSearchParams = new URLSearchParams(queryStr);

  let result;
  let errorMsg = null;
  
  try {
    const parsed = parseWeekAnswers(urlSearchParams);
    result = computeResult(parsed.answers);
  } catch (err: any) {
    errorMsg = err.message || "Invalid submission";
  }

  if (errorMsg || !result) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="font-urbanist font-light text-3xl mb-4">Cannot calculate score</h1>
          <p className="text-body text-slate">{errorMsg}</p>
        </div>
      </div>
    );
  }

  const LABELS: Record<string, string> = {
    leakage: "Routine handled",
    visibility: "Numbers on demand",
    fragmentation: "Tools connected",
  };

  const BAND_LABELS: Record<number, string> = {
    1: "Run by you, not by systems",
    2: "Tools in place, not yet joined up",
    3: "Coming together, still hands-on",
    4: "Mostly runs itself, some effort left",
    5: "Runs without you. You likely do not need us.",
  };

  const getTier = (score: number) => {
    if (score <= 33) return "weak";
    if (score <= 66) return "partial";
    return "strong";
  };

  const COPY: Record<string, Record<string, { basis: string, improvement: string }>> = {
    leakage: {
      weak: { basis: "Most recurring work still runs by hand. Fires get put out often, and a lot of how-to lives in people's heads, not on paper.", improvement: "Pick the one task you repeat most each week and write the steps down. That is the first thing worth handing to a system." },
      partial: { basis: "Some routine work is documented and repeatable. A few important tasks still slip through the cracks.", improvement: "Document the next most frequent task and hand it to the same setup." },
      strong: { basis: "Routine work runs on its own. You do not remember how things get done because the system does it.", improvement: "Keep reviewing quarterly. If a new manual habit appears, capture it immediately." }
    },
    visibility: {
      weak: { basis: "Seeing a basic number takes real effort. You wait for someone to pull it, and by then it is already old.", improvement: "Pick the one number you check most, revenue or cash, and get it somewhere you can see any day without asking." },
      partial: { basis: "Most key numbers are visible during the month, but a few still only land at month-end.", improvement: "Bring the last lagging number forward so the full picture is current." },
      strong: { basis: "The numbers that matter are visible in real time. You act on them the same day they change.", improvement: "Audit quarterly: if a new metric matters, wire it to the same dashboard before it becomes a request." }
    },
    fragmentation: {
      weak: { basis: "The same detail gets typed into more than one place. Your tools do not pass information to each other, so people bridge the gap by hand.", improvement: "Find the detail you re-type most, customer or order info, and connect the two tools so it moves once." },
      partial: { basis: "Some tools are connected, but a few handoffs are still manual and details do not always sit in one place.", improvement: "Connect the next most frequent handoff. Keep the source of truth for each detail in one place." },
      strong: { basis: "Data flows across tools without re-entry. Every detail has one canonical home.", improvement: "When you adopt a new tool, enforce the same rule: read from the canonical source, never create a second one." }
    }
  };

  const bandLabel = BAND_LABELS[result.band];

  const PRECEDENCE = ["leakage", "visibility", "fragmentation"];
  const sortedAreas = [
    { key: "leakage", val: result.leakage },
    { key: "visibility", val: result.visibility },
    { key: "fragmentation", val: result.fragmentation },
  ].sort((a, b) => {
    if (a.val !== b.val) return a.val - b.val;
    return PRECEDENCE.indexOf(a.key) - PRECEDENCE.indexOf(b.key);
  });

  let formBUrl = "";
  try {
    // Defensive: NEXT_PUBLIC_FORM_B_URL is the source of truth, but if it is
    // ever absent at runtime, fall back to the live Form B URL rather than
    // blanking an otherwise valid score page.
    const formBBase = (process.env.NEXT_PUBLIC_FORM_B_URL ?? "").trim() || "https://tally.so/r/GxZOKe";
    const formBUrlObj = new URL(formBBase);
    formBUrlObj.searchParams.set("score", result.score.toString());
    formBUrlObj.searchParams.set("leakage", result.leakage.toString());
    formBUrlObj.searchParams.set("visibility", result.visibility.toString());
    formBUrlObj.searchParams.set("fragmentation", result.fragmentation.toString());
    formBUrlObj.searchParams.set("band", result.band.toString());
    formBUrlObj.searchParams.set("costingMost", result.costingMost);
    if (result.aiReturn !== null) {
      formBUrlObj.searchParams.set("aiReturn", result.aiReturn.toString());
    }
    formBUrl = formBUrlObj.toString();
  } catch (err: any) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="font-urbanist font-light text-3xl mb-4">Cannot calculate score</h1>
          <p className="text-body text-slate">{err.message || "Invalid form configuration"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-12 md:gap-16">
      
      <Reveal>
        <h1 className="text-pearl/60 text-sm tracking-widest uppercase">
          Your Systems Efficiency Score
        </h1>
      </Reveal>

      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
        <div className="font-urbanist font-light text-[80px] md:text-[100px] leading-none text-gold">
          {result.score}
          <span className="text-4xl md:text-5xl text-pearl/40 font-urbanist font-light">/100</span>
        </div>
        <Reveal delay={0.1}>
          <p className="text-body text-slate max-w-sm">
            Higher is better. This is the average of the three areas below.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <p className="text-xl md:text-2xl text-pearl">
          {bandLabel}
        </p>
      </Reveal>

      {/* Categories as weak-first cards */}
      <div className="flex flex-col gap-6 border-t border-sapphire-line pt-8">
        {sortedAreas.map((cat, i) => {
          const copy = COPY[cat.key][getTier(cat.val)];
          const isTop = i === 0;
          return (
            <Reveal key={cat.key} delay={0.2 + i * 0.1}>
              <div className="flex flex-col gap-4 p-6 border border-sapphire-line bg-sapphire/50 rounded-xl">
                <div className="flex justify-between items-start md:items-center border-b border-sapphire-line/50 pb-4 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-urbanist font-light text-2xl text-pearl">{LABELS[cat.key]}</h3>
                    {isTop && (
                      <span className="bg-gold text-ink text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded">Start here</span>
                    )}
                  </div>
                  <div className="font-urbanist font-light text-3xl text-gold mt-2 md:mt-0">
                    {Math.round(cat.val)}
                    <span className="text-xl text-pearl/40 font-urbanist font-light">/100</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-body text-pearl">{copy.basis}</p>
                  <p className="text-body-sm text-slate">{copy.improvement}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Where AI fits */}
      <Reveal delay={0.5}>
        <div className="flex flex-col gap-4 border-t border-sapphire-line pt-8 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-pearl/60 text-sm tracking-widest uppercase">Where AI fits</span>
            {result.aiReturn !== null && (
              <span className="font-urbanist font-light text-xl text-gold">{Math.round(result.aiReturn)}</span>
            )}
          </div>
          <p className="text-body-sm text-slate">
            {result.aiReturn === null 
              ? "You have not put AI to work in the business yet. That is fine. Get the systems underneath clean first, then AI has something solid to run on."
              : result.aiReturn <= 40
                ? "You are paying for AI but cannot yet point to a clear return. Common, and fixable once the process around it is right."
                : "AI is already contributing here. The next gain is running it on clean, connected data so the result holds."}
          </p>
        </div>
      </Reveal>
      
      {/* Next step to Form B */}
      <Reveal delay={0.6}>
        <div className="mt-12 flex flex-col items-start gap-6">
          <h2 className="font-urbanist font-light text-2xl md:text-3xl text-pearl">
            Four more, so the assessment is about your business
          </h2>
          <p className="text-body text-slate max-w-lg">
            Then it lands in your inbox inside two working days.
          </p>
          <a 
            href={formBUrl}
            className="inline-flex items-center justify-center bg-gold text-ink font-normal px-8 py-4 rounded-[6px] active:scale-97 transition-transform duration-160 ease-out"
          >
            Continue
          </a>
        </div>
      </Reveal>
    </div>
  );
}
