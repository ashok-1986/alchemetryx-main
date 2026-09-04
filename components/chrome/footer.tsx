import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full section-dark bg-[var(--color-sapphire)] text-[var(--color-pearl)] border-t border-[var(--color-sapphire-line)] pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand & Positioning statement */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-2xl font-light tracking-[-0.04em] text-[var(--color-pearl)] inline-block"
            >
              {COMPANY_INFO.name}
            </Link>
            <p className="text-sm text-[var(--color-slate)] max-w-[45ch] leading-relaxed">
              We find the process costing you most, rebuild it so it runs on its own, and stay to prove it worked.
            </p>
            <div className="pt-2">
              <Button asChild variant="primary" size="sm">
                <Link href={COMPANY_INFO.primaryCtaHref}>
                  {COMPANY_INFO.primaryCtaLabel}
                </Link>
              </Button>
            </div>
          </div>

          {/* Services Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-slate)]">
              Services
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/diagnostic"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  The Diagnostic (2 weeks)
                </Link>
              </li>
              <li>
                <Link
                  href="/build"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  The Build (4 to 8 weeks)
                </Link>
              </li>
              <li>
                <Link
                  href="/retainer"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  The Retainer (Monthly)
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links & Locations */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-slate)]">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/proof"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  Proof & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/india"
                  className="text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] transition-colors"
                >
                  Alchemetryx India
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-[var(--color-slate)] space-y-1">
              <p>{COMPANY_INFO.ukAddress}</p>
              <p>{COMPANY_INFO.indiaAddress}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--color-sapphire-line)]" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--color-slate)]">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="font-normal text-[var(--color-pearl)]/90">
            {COMPANY_INFO.companyNumberLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
