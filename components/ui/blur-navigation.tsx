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
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center w-full transition-all duration-300 ease-out px-4 py-2 pointer-events-none bg-transparent">
        {/* Full width container, Grid layout for 3 equal sections */}
        <div className="pointer-events-auto relative grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center w-full max-w-[1440px] mx-auto px-2 transition-all duration-300">
          
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center shrink-0 transition-opacity hover:opacity-80"
              aria-label="Alchemetryx Home"
            >
              <Image
                src="/brand/main-logo.png"
                alt="Alchemetryx"
                width={400}
                height={100}
                className="h-[100px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Menu Items */}
          <div className="hidden lg:flex justify-center">
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`flex items-center gap-1 xl:gap-2 px-3 py-2 transition-all duration-300 rounded-full ${
                scrolled
                  ? "bg-transparent backdrop-blur-md border border-[var(--color-pearl)]/10 shadow-lg shadow-black/10"
                  : "bg-transparent border border-transparent"
              }`}
            >
              {NAV_ITEMS.map((item, i) => {
                const isAnchor = item.href.includes("#");
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : !isAnchor && pathname?.startsWith(item.href.split("#")[0]);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-normal transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-pearl)]"
                        : "text-[var(--color-pearl)]/70 hover:text-[var(--color-pearl)]"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Hover Pill Background */}
                    {hoveredIndex === i && (
                      <motion.div
                        layoutId="hover-pill"
                        className="absolute inset-0 bg-[var(--color-pearl)]/10 rounded-full -z-10"
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
            </motion.nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3">
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
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-sapphire-raised)] text-[var(--color-pearl)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
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
        className="fixed inset-0 z-40 bg-[var(--color-sapphire)]/90 lg:hidden flex flex-col pt-28 px-6 pb-10"
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
                className="text-2xl font-semibold uppercase tracking-[0.15em] text-[var(--color-pearl)] block py-3 border-b border-[var(--color-pearl)]/10"
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
              className="flex items-center justify-center w-full py-4 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-bold text-lg uppercase tracking-wide"
            >
              {COMPANY.primaryCtaLabel}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
