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
      partial: { basis: "Some routine work is written down and repeatable. A few important tasks still need a person to remember and do them.", improvement: "Take the recurring task that eats the most time and make it run on its own." },
      strong: { basis: "Recurring work is mostly documented and runs with little manual effort. Firefighting is rare.", improvement: "Hold the line. Add each new routine to the same setup before it becomes another manual habit." }
    },
    visibility: {
      weak: { basis: "Seeing a basic number takes real effort. You wait for someone to pull it, and by then it is already old.", improvement: "Pick the one number you check most, revenue or cash, and get it somewhere you can see any day without asking." },
      partial: { basis: "You can see some numbers quickly, but not all of them, and some are only current near month-end.", improvement: "Close the gap on the numbers that lag. Aim to see the key ones during the month, not after it." },
      strong: { basis: "You can see the numbers that matter quickly, and they are current enough to act on.", improvement: "Keep it current. As you add numbers to track, hold the same speed so nothing slips back to month-end." }
    },
    fragmentation: {
      weak: { basis: "The same detail gets typed into more than one place. Your tools do not pass information to each other, so people bridge the gap by hand.", improvement: "Find the detail you re-type most, customer or order info, and connect the two tools so it moves once." },
      partial: { basis: "Some tools are connected, but a few handoffs are still manual and details do not always sit in one place.", improvement: "Take the one handoff people still do by hand and let the tools pass it across." },
      strong: { basis: "Your tools pass information across without much re-typing, and key details sit in one place.", improvement: "Keep new tools to the same rule. Anything you add should read from the same source, not start a new island." }
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

  if (!process.env.NEXT_PUBLIC_FORM_B_URL) {
    throw new Error("NEXT_PUBLIC_FORM_B_URL is not configured.");
  }
  const formBUrlObj = new URL(process.env.NEXT_PUBLIC_FORM_B_URL);
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
              className="inline-flex items-center justify-center bg-gold text-ink font-normal px-8 py-4 rounded-[6px] active:scale-97 transition-transform duration-160 ease-out"
            >
              Continue
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
