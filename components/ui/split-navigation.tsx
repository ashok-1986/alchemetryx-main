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
              const isActive = pathname === item.href;
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
        className={`fixed top-0 right-0 bottom-0 z-50 w-full md:w-[45vw] max-w-[600px] bg-[var(--color-sapphire)] border-l border-[var(--color-pearl-line)]/10 shadow-2xl flex flex-col justify-between overflow-y-auto px-6 md:px-12 py-8 md:py-12 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top bar with Close Button */}
        <div className="flex justify-end items-center w-full shrink-0">
          <button 
            onClick={() => {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--color-pearl)] text-[var(--color-sapphire)] hover:bg-white focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Center content: Navigation + Action buttons */}
        <div className="my-auto py-6">
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
                        className={`text-[32px] md:text-5xl font-normal uppercase tracking-tighter transition-colors block whitespace-nowrap flex items-center h-[44px] md:h-[56px] ${
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
          <div className="overflow-hidden mt-8 md:mt-10 w-full max-w-[400px]">
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
        </div>

        {/* Bottom Info / Socials */}
        <div 
          className={`shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-normal text-[var(--color-pearl)]/70 border-t border-[var(--color-pearl-line)]/10 pt-6 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: menuOpen ? "0.6s" : "0s" }}
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href={COMPANY.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors py-1"
              aria-label="Follow Alchemetryx on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a 
              href={COMPANY.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors py-1"
              aria-label="Follow Alchemetryx on Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a 
              href={COMPANY.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors py-1"
              aria-label="Follow Alchemetryx on Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
          <div className="text-[11px] text-[var(--color-pearl)]/40 tracking-wider">
            © {new Date().getFullYear()} Alchemetryx Ltd
          </div>
        </div>
      </div>
    </>
  );
}
