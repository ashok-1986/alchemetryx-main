import type { Metadata } from "next";
import { parseWeekAnswers, InvalidSubmission } from "@/lib/parseWeekAnswers";
import { computeResult } from "@/lib/score";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Your Systems Efficiency Score — Alchemetryx",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function WeekResultPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  
  // Create URLSearchParams from the Next.js searchParams object
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      urlSearchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => urlSearchParams.append(key, v));
    }
  }

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
      <main className="min-h-screen bg-sapphire text-pearl flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="font-urbanist font-light text-3xl mb-4">Cannot calculate score</h1>
          <p className="text-body text-slate">{errorMsg}</p>
        </div>
      </main>
    );
  }

  const LABELS: Record<string, string> = {
    leakage: "Rework",
    visibility: "Slow answers",
    fragmentation: "Manual handoffs",
  };

  const BAND_LABELS: Record<number, string> = {
    1: "Running on people, not systems",
    2: "You have the tools. They do not talk to each other.",
    3: "Connected, but you cannot see it",
    4: "You can see it, but it still takes effort",
    5: "Systems-led. You probably do not need us",
  };

  const costingMostLabel = LABELS[result.costingMost];
  const strongestLabel = LABELS[result.strongest];
  const bandLabel = BAND_LABELS[result.band];

  // Placeholder form B link - to be replaced when Form B is built
  const formBUrlObj = new URL(process.env.NEXT_PUBLIC_FORM_B_URL || "https://tally.so/r/xxx");
  formBUrlObj.searchParams.set("score", result.score.toString());
  formBUrlObj.searchParams.set("leakage", result.leakage.toString());
  formBUrlObj.searchParams.set("visibility", result.visibility.toString());
  formBUrlObj.searchParams.set("fragmentation", result.fragmentation.toString());
  formBUrlObj.searchParams.set("band", result.band.toString());
  formBUrlObj.searchParams.set("costingMost", result.costingMost);
  if (result.aiReturn !== null) {
    formBUrlObj.searchParams.set("aiReturn", result.aiReturn.toString());
  }
  const formBUrl = formBUrlObj.toString();

  return (
    <main className="min-h-screen bg-sapphire text-pearl flex flex-col px-6 py-20 md:py-[120px]">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        
        <Reveal>
          <h1 className="text-pearl/60 text-sm tracking-widest uppercase">
            Your Systems Efficiency Score
          </h1>
        </Reveal>

        <div className="flex flex-col gap-4">
          <div className="font-urbanist font-light text-[120px] md:text-[160px] leading-none text-gold">
            {result.score}
          </div>
          <Reveal delay={0.1}>
            <p className="font-urbanist font-light text-2xl md:text-3xl uppercase tracking-tight text-pearl">
              {bandLabel}
            </p>
          </Reveal>
        </div>

        {/* Categories */}
        <div className="flex flex-col border-t border-sapphire-line">
          {[
            { key: "leakage", val: result.leakage },
            { key: "visibility", val: result.visibility },
            { key: "fragmentation", val: result.fragmentation },
          ].map((cat, i) => (
            <Reveal key={cat.key} delay={0.2 + i * 0.05}>
              <div className="flex justify-between items-center py-4 border-b border-sapphire-line">
                <span className="text-body text-pearl">{LABELS[cat.key]}</span>
                <span className="text-body text-gold">{Math.round(cat.val)}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Costing most / Strongest */}
        <div className="flex flex-col gap-2">
          <Reveal delay={0.4}>
            <div className="flex justify-between items-center py-2">
              <span className="text-pearl/60 text-sm tracking-widest uppercase">Costing you most</span>
              <span className="font-urbanist font-light text-xl text-gold">{costingMostLabel}</span>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex justify-between items-center py-2">
              <span className="text-pearl/60 text-sm tracking-widest uppercase">Strongest</span>
              <span className="font-urbanist font-light text-xl text-pearl">{strongestLabel}</span>
            </div>
          </Reveal>
        </div>

        {/* AI Return */}
        {result.aiReturn !== null && (
          <Reveal delay={0.5}>
            <div className="flex flex-col gap-4 border-t border-sapphire-line pt-8 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-pearl/60 text-sm tracking-widest uppercase">AI Return</span>
                <span className="font-urbanist font-light text-xl text-gold">{Math.round(result.aiReturn)}</span>
              </div>
              {result.aiReturn <= 40 && (
                <p className="text-body-sm text-slate">
                  You have paid for AI but it is not built into any recurring process, and there is no measurable return yet.
                </p>
              )}
            </div>
          </Reveal>
        )}
        
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
              className="inline-flex items-center justify-center bg-gold text-ink font-medium px-8 py-4 rounded-[6px] active:scale-97 transition-transform duration-160 ease-out"
            >
              Continue
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
