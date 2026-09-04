"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/build", label: "Build" },
  { href: "/retainer", label: "Retainer" },
  { href: "/proof", label: "Proof" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-sapphire)]/80 backdrop-blur-[20px] saturate-[180%] border-b border-[var(--color-sapphire-line)]/70 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.15)] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)] hover:text-white"
        >
          Alchemetryx
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-[6px] text-sm font-normal text-[var(--color-pearl)]/80 hover:text-[var(--color-pearl)] hover:bg-[var(--color-sapphire-raised)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button asChild variant="primary" size="sm">
            <Link href="/book">Book a 30-minute call</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline-dark"
                size="icon"
                aria-label="Toggle navigation menu"
                className="h-9 w-9 text-[var(--color-pearl)]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[var(--color-sapphire)] border-l border-[var(--color-sapphire-line)] text-[var(--color-pearl)] flex flex-col justify-between"
            >
              <div className="space-y-6 pt-6">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)]">
                    Alchemetryx
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 rounded-[6px] text-base font-normal text-[var(--color-pearl)] hover:bg-[var(--color-sapphire-raised)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="pb-8">
                <Button
                  asChild
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/book">Book a 30-minute call</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
