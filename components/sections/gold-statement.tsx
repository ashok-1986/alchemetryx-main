import { SectionFullBleed } from "./section-full-bleed";

interface GoldStatementProps {
  statement?: string;
}

export function GoldStatement({
  statement = "Your tools are not a system.",
}: GoldStatementProps) {
  return (
    <SectionFullBleed
      tone="gold"
      className="py-24 sm:py-32 md:py-40 text-center"
      containerClassName="flex items-center justify-center"
    >
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-ink)] leading-[1.05] max-w-[850px] mx-auto">
        {statement}
      </h2>
    </SectionFullBleed>
  );
}
