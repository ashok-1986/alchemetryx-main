import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full section-dark bg-[var(--color-sapphire)] text-[var(--color-pearl)] border-t border-[var(--color-sapphire-line)] pt-14 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <Link
              href="/"
              className="text-2xl font-light tracking-[-0.04em] text-[var(--color-pearl)] inline-block cursor-pointer"
            >
              {COMPANY.name}
            </Link>
            <p className="text-sm text-[var(--color-slate)] max-w-[45ch] leading-relaxed">
              We rebuild the one job that runs on you, so it runs without you.
            </p>
          </div>
          <Link
            href={COMPANY.primaryCtaHref}
            className="text-sm text-[var(--color-gold)] underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {COMPANY.primaryCtaLabel}
          </Link>
        </div>

        <Separator className="bg-[var(--color-sapphire-line)]" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[var(--color-slate)]">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <a
            href={COMPANY.companiesHouseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-pearl)]/90 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
          >
            {COMPANY.companyNumberLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
