import Link from "next/link";
import Image from "next/image";
import { Calendar, Mail } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden section-dark bg-[var(--color-sapphire)] text-[var(--color-pearl)] border-t border-[var(--color-sapphire-line)]/50 pt-20 pb-12">
      {/* Subtle ambient lighting for atmospheric studio mood */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.06),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        {/* Main Grid: Brand, Nav Columns & Let's Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left: Brand Mark (70px) & Mission */}
          <div className="lg:col-span-3 space-y-5">
            <Link
              href="/"
              className="inline-block hover:opacity-90 transition-opacity"
              aria-label="Alchemetryx Home"
            >
              <Image
                src="/brand/alchemetryx-mark.png"
                alt="Alchemetryx"
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-contain"
              />
            </Link>
            <p className="text-sm font-normal text-[var(--color-slate)] max-w-[32ch] leading-relaxed">
              We rebuild the job that lives in one person's head, so the process is clear, repeatable, and easy for anyone to run.
            </p>
          </div>

          {/* Middle: Navigation Columns (Product, Company, Social, Legal) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Explore / Product */}
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-slate)]/70">
                Product
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--color-pearl)]/85">
                <li>
                  <Link href="/#problem" className="hover:text-[var(--color-gold)] transition-colors">
                    The Problem
                  </Link>
                </li>
                <li>
                  <Link href="/#how-we-work" className="hover:text-[var(--color-gold)] transition-colors">
                    How We Work
                  </Link>
                </li>
                <li>
                  <Link href="/proof" className="hover:text-[var(--color-gold)] transition-colors">
                    Proof & Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:text-[var(--color-gold)] transition-colors">
                    Book Call
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-slate)]/70">
                Company
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--color-pearl)]/85">
                <li>
                  <Link href="/about" className="hover:text-[var(--color-gold)] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/proof/care-rota" className="hover:text-[var(--color-gold)] transition-colors">
                    CareRota
                  </Link>
                </li>
                <li>
                  <Link href="/proof/fitosys" className="hover:text-[var(--color-gold)] transition-colors">
                    Fitosys
                  </Link>
                </li>
                <li>
                  <a
                    href={COMPANY.companiesHouseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-gold)] transition-colors"
                  >
                    Companies House
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social */}
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-slate)]/70">
                Social
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--color-pearl)]/85">
                <li>
                  <a
                    href="https://www.linkedin.com/company/alchemetryx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/thealchemetryx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/alchemalytic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-slate)]/70">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--color-pearl)]/85">
                <li>
                  <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <a
                    href={COMPANY.companiesHouseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-gold)] transition-colors"
                  >
                    Registry Data
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Let's chat & Action Capsule Buttons */}
          <div className="lg:col-span-3 space-y-4 lg:pl-4">
            <p className="text-2xl md:text-3xl font-light tracking-tight text-[var(--color-pearl)]">
              Let&apos;s chat
            </p>
            <div className="flex flex-col gap-3">
              {/* Button 1: Solid White Pill with Calendar icon */}
              <Link
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white text-black text-sm font-medium transition-all duration-200 hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] shadow-sm"
              >
                <span>Book a call</span>
                <Calendar className="w-4 h-4 text-black" strokeWidth={1.75} />
              </Link>

              {/* Button 2: Dark Outline Glass Pill with Mail icon */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:scale-[1.01] active:scale-[0.99] backdrop-blur-sm"
              >
                <span>Write an email</span>
                <Mail className="w-4 h-4 text-white" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>

        {/* Thin Divider Line with subtle golden highlight */}
        <div className="relative w-full py-2">
          <div className="w-full h-px bg-white/10" />
          <div className="absolute top-2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
        </div>

        {/* Large Cinematic Typography: Alchemetryx. */}
        <div className="w-full overflow-hidden select-none pointer-events-none py-2 -my-4">
          <p className="text-[clamp(3.5rem,14.5vw,14rem)] font-light tracking-[-0.04em] leading-[0.85] text-[var(--color-pearl)] whitespace-nowrap">
            Alchemetryx<span className="text-[var(--color-gold)]">.</span>
          </p>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 border-t border-[var(--color-sapphire-line)]/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--color-slate)]/80 leading-relaxed">
          <p>{COMPANY.legalName || COMPANY.name} © {currentYear}. All rights reserved.</p>
          <p className="max-w-[70ch]">
            Alchemetryx Ltd | Registered in England and Wales |{" "}
            <a
              href={COMPANY.companiesHouseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold)] transition-colors underline underline-offset-2"
            >
              {COMPANY.companyNumberLabel}
            </a>{" "}
            | Registered Office: {COMPANY.registeredOffice}
          </p>
        </div>
      </div>
    </footer>
  );
}
