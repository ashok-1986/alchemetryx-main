"use client";

/**
 * components/chrome/nav-rail.tsx
 *
 * The vertical menu. Built here, on our own stack — no Framer, no third-party
 * component. Collapsed it is a stack of hairlines on the right edge. Hover or
 * focus anywhere in it and it opens into a panel with the labels.
 *
 * Why a panel and not bare text: the rail floats over Sapphire sections and
 * Pearl sections both, and no single text colour passes contrast on both. The
 * panel gives the labels a known background, so Pearl on Sapphire every time.
 *
 * Desktop only. Below xl the mobile sheet in nav.tsx carries the same list.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, type NavItem } from "@/components/chrome/nav-items";
import { cn } from "@/lib/utils";

export function NavRail() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Scroll spy. Only the home page has the anchored sections.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const ids = NAV_ITEMS.map((i) => i.sectionId).filter(
      (id): id is string => id !== null
    );
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        } else {
          setActiveSection(null);
        }
      },
      // a band across the middle of the viewport, so "active" means
      // "the thing you are actually reading"
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (item: NavItem) => {
    if (item.sectionId) return pathname === "/" && activeSection === item.sectionId;
    if (item.href === "/") return pathname === "/" && activeSection === null;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <nav
      aria-label="Section navigation"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 z-40"
    >
      <div
        className={cn(
          "flex flex-col items-end gap-1 py-4 pr-[10px] pl-5 rounded-l-xl",
          "transition-[background-color,box-shadow,backdrop-filter] duration-200 ease-out",
          open
            ? "bg-[var(--color-sapphire)]/95 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)]"
            : "bg-transparent"
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "true" : undefined}
              className="group flex items-center justify-end gap-3 py-2 pl-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 rounded-sm"
            >
              <span
                className={cn(
                  "text-sm font-light whitespace-nowrap transition-[opacity,transform] duration-200 ease-out",
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 pointer-events-none",
                  active
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-slate)] group-hover:text-[var(--color-pearl)]"
                )}
              >
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "h-px shrink-0 transition-[width,background-color] duration-300 ease-out",
                  active
                    ? "w-9 bg-[var(--color-gold)]"
                    : "w-5 bg-[var(--color-gold)]/45 group-hover:w-9 group-hover:bg-[var(--color-gold)]/80"
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
