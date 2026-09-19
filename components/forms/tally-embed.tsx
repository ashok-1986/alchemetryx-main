"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TallyEmbedContent() {
  const searchParams = useSearchParams();
  const [srcParam, setSrcParam] = useState<string | null>(null);

  useEffect(() => {
    // Capture the ?src= query parameter if it exists
    setSrcParam(searchParams.get("src"));
  }, [searchParams]);

  // Once the user provides the embed script, it can be injected here.
  // We provide a placeholder container for now.
  return (
    <div className="w-full max-w-3xl mx-auto min-h-[600px] border border-dashed border-[var(--color-slate)]/20 rounded-xl flex items-center justify-center p-8 bg-black/5 dark:bg-white/5">
      <div className="text-center">
        <p className="text-[var(--color-slate)] mb-4">
          [Tally Embed Placeholder]
        </p>
        <p className="text-sm text-[var(--color-slate)]/70">
          Target form: jajPEJ<br />
          {srcParam ? `Captured src param: ${srcParam}` : "No src parameter provided"}
        </p>
      </div>
    </div>
  );
}

export function TallyEmbed() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-3xl mx-auto min-h-[600px] border border-dashed border-[var(--color-slate)]/20 rounded-xl flex items-center justify-center p-8 bg-black/5 dark:bg-white/5">
        <p className="text-[var(--color-slate)] mb-4">Loading form...</p>
      </div>
    }>
      <TallyEmbedContent />
    </Suspense>
  );
}
