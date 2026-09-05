import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "The Problem", href: "/#problem" },
  { label: "Diagnostic", href: "/#diagnostic" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Proof", href: "/#proof" },
  { label: "About", href: "/about" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-sapphire)]/80 backdrop-blur-[24px] supports-[backdrop-filter]:bg-[var(--color-sapphire)]/75 border-b border-[var(--color-sapphire-line)]/60 transition-colors duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-[10px] h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)] hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer shrink-0"
        >
          {COMPANY.name}
        </Link>

        {/* 5 Anchor nav items */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-light text-[var(--color-slate)] hover:text-[var(--color-pearl)] transition-colors duration-150 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Gold CTA button */}
        <div className="shrink-0">
          <Button asChild variant="primary" size="sm">
            <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
