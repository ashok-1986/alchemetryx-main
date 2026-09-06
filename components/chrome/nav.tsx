"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { COMPANY } from "@/lib/constants";
import { NAV_ITEMS } from "@/components/chrome/nav-items";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus management when menu opens/closes
  useEffect(() => {
    if (!menuOpen) return;

    // Move focus to close button on open
    closeButtonRef.current?.focus();

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const getFocusableElements = (): HTMLElement[] => {
    const elements: HTMLElement[] = [];
    if (closeButtonRef.current) elements.push(closeButtonRef.current);
    navLinksRef.current.forEach((link) => {
      if (link) elements.push(link);
    });
    return elements;
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // Restore focus to menu trigger after closing
    menuTriggerRef.current?.focus();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-[10px] h-16 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 cursor-pointer transition-opacity duration-150 hover:opacity-90"
          >
            <Image
              src="/brand/main-logo.png"
              alt=""
              width={120}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)]">
              {COMPANY.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <CircleExpandButton
              href={COMPANY.primaryCtaHref}
              variant="primary"
              size="sm"
            >
              {COMPANY.primaryCtaLabel}
            </CircleExpandButton>
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="xl:hidden grid place-items-center w-10 h-10 rounded-full border border-[var(--color-sapphire-line)] text-[var(--color-pearl)] cursor-pointer transition-colors duration-150 hover:bg-[var(--color-sapphire-raised)] focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 active:scale-[0.97]"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="xl:hidden fixed inset-0 z-[60] bg-[var(--color-sapphire)]"
        >
          <div className="w-full max-w-[1440px] mx-auto px-[10px] h-16 flex items-center justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid place-items-center w-10 h-10 rounded-full border border-[var(--color-sapphire-line)] text-[var(--color-pearl)] cursor-pointer transition-colors duration-150 hover:bg-[var(--color-sapphire-raised)] focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 active:scale-[0.97]"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            aria-label="Main Navigation"
            className="w-full max-w-[1440px] mx-auto px-[10px] mt-8 flex flex-col"
          >
            {NAV_ITEMS.filter((i) => i.href !== "/").map((item, index) => (
              <Link
                ref={(el) => {
                  if (el) navLinksRef.current[index] = el;
                }}
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="group flex items-center gap-4 py-5 border-b border-[var(--color-sapphire-line)]/60 text-2xl font-light text-[var(--color-pearl)] cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[var(--color-gold)]/50 transition-all duration-300 ease-out group-hover:w-12 group-hover:bg-[var(--color-gold)]"
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
