import type { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "./result-client";

export const metadata: Metadata = {
  title: "Your Systems Efficiency Score — Alchemetryx",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WeekResultPage() {
  return (
    <main className="min-h-screen bg-sapphire text-pearl flex flex-col px-6 py-20 md:py-[120px]">
      <Suspense 
        fallback={
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-12 md:gap-16">
            <div>
              <h1 className="text-pearl/60 text-sm tracking-widest uppercase">
                Your Systems Efficiency Score
              </h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
              <p className="text-body text-slate max-w-sm">
                Working out your score...
              </p>
            </div>
          </div>
        }
      >
        <ResultClient />
      </Suspense>
    </main>
  );
}
