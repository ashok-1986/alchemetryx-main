import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-sapphire)]/85 backdrop-blur-[20px] border-b border-[var(--color-sapphire-line)]/70">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)] hover:opacity-90 transition-opacity cursor-pointer"
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
