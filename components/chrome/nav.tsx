import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-sapphire)]/80 backdrop-blur-[24px] supports-[backdrop-filter]:bg-[var(--color-sapphire)]/75 border-b border-[var(--color-sapphire-line)]/60 transition-colors duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-[10px] h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)] hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          {COMPANY.name}
        </Link>
        <Button asChild variant="primary" size="sm">
          <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
        </Button>
      </div>
    </header>
  );
}
