"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/constants";
import { NAV_ITEMS } from "@/components/chrome/nav-items";
import { Menu, X } from "lucide-react";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

export function BlurNavigation() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 flex justify-center w-full transition-all duration-300 ease-out px-4 py-4 md:py-6 pointer-events-none`}
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between w-full max-w-[1440px] mx-auto rounded-full px-4 md:px-6 py-3 md:py-4 transition-all duration-300 ${
            scrolled
              ? "bg-[var(--color-pearl)]/70 backdrop-blur-lg border border-[var(--color-ink)]/5 shadow-sm shadow-[var(--color-ink)]/5"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center shrink-0 transition-opacity hover:opacity-80"
            aria-label="Alchemetryx Home"
          >
            <Image
              src="/brand/main-logo.png"
              alt="Alchemetryx"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item, i) => {
              // Ensure we check pathname correctly for active states
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href.split("#")[0]);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active Indicator (optional, could use if needed) */}
                  {/* {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--color-gold)] z-0 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )} */}

                  {/* Hover Pill Background */}
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 bg-[var(--color-ink)]/5 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <CircleExpandButton
                href={COMPANY.primaryCtaHref}
                variant="primary"
                size="sm"
              >
                {COMPANY.primaryCtaLabel}
              </CircleExpandButton>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-sapphire)] text-[var(--color-pearl)] hover:bg-[var(--color-sapphire-raised)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Full Screen Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto", backdropFilter: "blur(12px)" },
          closed: { opacity: 0, pointerEvents: "none", backdropFilter: "blur(0px)" },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-[var(--color-pearl)]/80 lg:hidden flex flex-col pt-28 px-6 pb-10"
      >
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                open: { opacity: 1, y: 0, transition: { delay: i * 0.05 + 0.1 } },
                closed: { opacity: 0, y: 20 },
              }}
            >
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-light tracking-tight text-[var(--color-ink)] block py-2 border-b border-[var(--color-ink)]/10"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.div
            variants={{
              open: { opacity: 1, y: 0, transition: { delay: NAV_ITEMS.length * 0.05 + 0.1 } },
              closed: { opacity: 0, y: 20 },
            }}
            className="mt-8 pt-4 sm:hidden"
          >
            <Link
              href={COMPANY.primaryCtaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-4 rounded-full bg-[var(--color-sapphire)] text-[var(--color-pearl)] font-medium text-lg"
            >
              {COMPANY.primaryCtaLabel}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
