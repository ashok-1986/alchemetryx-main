"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/constants";
import { NAV_ITEMS } from "@/components/chrome/nav-items";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

export function SplitNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Main navigational links for the left stack (filtering out anchor links for a cleaner look)
  const leftLinks = NAV_ITEMS.filter((item) => !item.href.includes("#"));

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 py-6 md:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 max-w-[1920px] mx-auto pointer-events-auto">
          
          {/* LEFT: Vertical Stack of Links (Hidden on mobile) */}
          <div className="hidden md:flex flex-col gap-1.5 self-start pt-2">
            {leftLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-pearl)] hover:text-[var(--color-gold)] transition-colors w-fit mix-blend-difference leading-none py-1"
              >
                <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:mr-1">·</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* CENTER: Logo (Negative margin pulls the transparent PNG padding up so the 'a' aligns with HOME) */}
          <div className="flex justify-start md:justify-center self-start pt-2 -mt-5 md:-mt-9">
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
                className="h-[70px] md:h-[100px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Actions (Pill CTA + Outline Menu Button) */}
          <div className="flex justify-end items-start gap-4 self-start pt-2">
            <div className="hidden sm:block">
              {/* As requested: Pill button consistent across the site */}
              <CircleExpandButton
                href={COMPANY.primaryCtaHref}
                variant="primary"
                size="sm"
              >
                {COMPANY.primaryCtaLabel}
              </CircleExpandButton>
            </div>

            {/* Menu Toggle Button: Outline style as per reference image */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[60] flex items-center justify-center px-4 py-2 border border-[var(--color-pearl)] mix-blend-difference text-[var(--color-pearl)] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-pearl)] hover:text-[var(--color-ink)] transition-colors rounded-sm"
              style={{ mixBlendMode: menuOpen ? "normal" : "difference", borderColor: menuOpen ? "var(--color-pearl)" : "", color: menuOpen ? "var(--color-pearl)" : "" }}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* RIGHT SIDEBAR MEGA MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop for the rest of the screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.7 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[45vw] max-w-[600px] bg-[var(--color-sapphire)] border-l border-[var(--color-pearl-line)]/10 shadow-2xl flex flex-col justify-center px-10 md:px-20"
            >
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.label} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ 
                        delay: 0.3 + (i * 0.05),
                        duration: 0.5,
                        ease: [0.33, 1, 0.68, 1]
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-[clamp(3rem,6vw,5rem)] font-bold uppercase tracking-tighter text-[var(--color-pearl)] hover:text-[var(--color-gold)] transition-colors leading-[0.9] block font-display"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}

                {/* Mobile CTA inside menu */}
                <div className="overflow-hidden sm:hidden mt-8">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.3 + (NAV_ITEMS.length * 0.05), duration: 0.5 }}
                  >
                    <Link
                      href={COMPANY.primaryCtaHref}
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-8 py-4 text-base font-semibold tracking-wide text-white transition-all hover:bg-[var(--color-gold-deep)] w-full"
                    >
                      {COMPANY.primaryCtaLabel}
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Info / Socials */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-12 left-10 right-10 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-pearl)]/50 border-t border-[var(--color-pearl-line)]/10 pt-8"
              >
                <div className="flex gap-4">
                  <a href="#" className="hover:text-[var(--color-gold)] transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-[var(--color-gold)] transition-colors">X (Twitter)</a>
                </div>
                <div>
                  © {new Date().getFullYear()} Alchemetryx
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
