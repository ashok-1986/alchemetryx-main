"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/constants";
import { NAV_ITEMS } from "@/components/chrome/nav-items";
import { Button } from "@/components/ui/button";

export function SplitNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll state for any potential sticky styling (like a subtle shadow if needed later)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll, handle Escape key, and return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-[1em] lg:px-[2em] py-[0.5em] animate-in fade-in slide-in-from-top-5 duration-700 ease-out fill-mode-both"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 w-full pointer-events-auto items-start">
          
          {/* LEFT: Vertical Stack of Links (Hidden on mobile & tablet) */}
          <div className="hidden lg:flex flex-col gap-1.5 self-start justify-self-start w-fit p-3 bg-[var(--color-sapphire)]/20 backdrop-blur-md border border-white/10 rounded-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (pathname === "/" && item.href === "/#problem" && false); // Basic active check
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center text-[11px] font-normal uppercase tracking-[0.2em] transition-colors w-fit leading-none py-1 px-1 ${
                    isActive ? "text-[var(--color-gold)]" : "text-[var(--color-pearl)] hover:text-[var(--color-gold)]"
                  }`}
                >
                  <span className={`inline-block overflow-hidden transition-all duration-300 ${
                    isActive ? "max-w-[20px] opacity-100 mr-1" : "max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:mr-1"
                  }`}>·</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CENTER: Logo (Negative margin pulls the transparent PNG padding up so the 'a' aligns with HOME) */}
          <div className="flex justify-start lg:justify-center self-start pt-2 -mt-5 lg:-mt-9 lg:col-start-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center shrink-0 transition-opacity hover:opacity-80"
              aria-label="Alchemetryx Home"
            >
              <Image
                src="/brand/main-logo.png"
                alt="Alchemetryx"
                width={400}
                height={200}
                className="hidden min-[380px]:block h-[70px] md:h-[100px] w-auto object-contain"
                priority
              />
              <Image
                src="/brand/alchemetryx-mark.png"
                alt="Alchemetryx"
                width={68}
                height={68}
                className="block min-[380px]:hidden h-[40px] w-auto object-contain mt-[26px]"
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex justify-end items-center gap-3 md:gap-4 self-start pt-2 lg:col-start-3">
            
            {/* Desktop (lg+): Both buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild size="sm" className="rounded-full bg-[var(--color-gold)] text-[var(--color-sapphire)] hover:bg-[#E5C253] border-transparent">
                <Link href="/week">Check your score</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-transparent text-[var(--color-pearl)] border border-[var(--color-pearl)] hover:bg-[var(--color-pearl)] hover:text-[var(--color-sapphire)]">
                <Link href={COMPANY.primaryCtaHref}>Book a 30-minute call</Link>
              </Button>
            </div>

            {/* Tablet (md to lg): Check your score only */}
            <div className="hidden md:flex lg:hidden items-center">
              <Button asChild size="sm" className="rounded-full bg-[var(--color-gold)] text-[var(--color-sapphire)] hover:bg-[#E5C253] border-transparent">
                <Link href="/week">Check your score</Link>
              </Button>
            </div>

            {/* Mobile (<md): Check your score (compact pill) */}
            <div className="flex md:hidden items-center mt-3 min-[380px]:mt-0">
              <Button asChild className="h-8 px-4 text-[10px] rounded-full bg-[var(--color-gold)] text-[var(--color-sapphire)] border-transparent hover:bg-[#E5C253]">
                <Link href="/week">Check your score</Link>
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[60] flex items-center justify-center px-4 md:px-6 py-2 md:py-2.5 mt-3 min-[380px]:mt-0 bg-[var(--color-pearl)] text-[var(--color-ink)] border border-[var(--color-pearl)] mix-blend-difference text-[10px] md:text-[11px] font-normal uppercase tracking-[0.2em] transition-colors rounded-full hover:bg-transparent hover:text-[var(--color-gold)] focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2"
              style={{ mixBlendMode: menuOpen ? "normal" : "difference", borderColor: menuOpen ? "transparent" : "", backgroundColor: menuOpen ? "transparent" : "", color: menuOpen ? "var(--color-pearl)" : "" }}
              aria-expanded={menuOpen}
              aria-controls="mega-menu-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* RIGHT SIDEBAR MEGA MENU */}
      {/* Backdrop for the rest of the screen */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer transition-opacity duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-out Panel */}
      <div
        id="mega-menu-panel"
        inert={!menuOpen ? true : undefined}
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full md:w-[45vw] max-w-[600px] bg-[var(--color-sapphire)] border-l border-[var(--color-pearl-line)]/10 shadow-2xl flex flex-col justify-center px-6 md:px-12 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button 
          onClick={() => {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-[var(--color-pearl)] text-[var(--color-sapphire)] hover:bg-white focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2"
          aria-label="Close menu"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <nav aria-label="Main navigation" role="navigation">
          <h2 className="sr-only">Main navigation</h2>
          <ul className="flex flex-col gap-4 md:gap-6 list-none p-0 m-0">
            {NAV_ITEMS.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label} className="overflow-hidden">
                  <div
                    className={`transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${menuOpen ? "translate-y-0" : "translate-y-full"}`}
                    style={{ transitionDelay: menuOpen ? `${0.2 + (i * 0.05)}s` : "0s" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-[32px] md:text-5xl font-normal uppercase tracking-tighter transition-colors block font-display whitespace-nowrap flex items-center h-[44px] md:h-[56px] ${
                        isActive ? "text-[var(--color-gold)] underline underline-offset-8" : "text-[var(--color-pearl)] hover:text-[var(--color-gold)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons inside menu (All sizes) */}
        <div className="overflow-hidden mt-10 md:mt-12 w-full max-w-[400px]">
          <div
            className={`flex flex-col gap-4 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${menuOpen ? "translate-y-0" : "translate-y-full"}`}
            style={{ transitionDelay: menuOpen ? `${0.2 + (NAV_ITEMS.length * 0.05)}s` : "0s" }}
          >
            <Button asChild size="lg" className="w-full rounded-full bg-[var(--color-gold)] text-[var(--color-sapphire)] hover:bg-[#E5C253] border-transparent font-normal text-base px-8 h-[52px]">
              <Link href="/week" onClick={() => setMenuOpen(false)}>Check your score</Link>
            </Button>
            <Button asChild size="lg" className="w-full rounded-full bg-transparent text-[var(--color-pearl)] border border-[var(--color-pearl)] hover:bg-[var(--color-pearl)] hover:text-[var(--color-sapphire)] font-normal text-base px-8 h-[52px]">
              <Link href={COMPANY.primaryCtaHref} onClick={() => setMenuOpen(false)}>Book a 30-minute call</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Info / Socials */}
        <div 
          className={`absolute bottom-12 left-10 right-10 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-[0.2em] font-normal text-[var(--color-pearl)]/50 border-t border-[var(--color-pearl-line)]/10 pt-8 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: menuOpen ? "0.6s" : "0s" }}
        >
          <div className="flex flex-wrap gap-4">
            <a href="https://www.linkedin.com/company/alchemetryx" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/thealchemetryx/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">Instagram</a>
            <a href="https://www.facebook.com/alchemalytic" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">Facebook</a>
          </div>
          <div>
            © {new Date().getFullYear()} Alchemetryx
          </div>
        </div>
      </div>
    </>
  );
}
