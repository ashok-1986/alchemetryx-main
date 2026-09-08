"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    __scrollcraftCleanup?: () => void;
  }
}

export default function AboutPage() {
  const apiRef = useRef<{ destroy?: () => void } | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // @ts-expect-error ScrollCraft is a global from the engine
    if (window.ScrollCraft) {
      // @ts-expect-error ScrollCraft is a global from the engine
      apiRef.current = window.ScrollCraft.mount(document.body);
    }

    return () => {
      // Clean up page-level scroll listeners from scrollcraft-init
      if (typeof window.__scrollcraftCleanup === 'function') {
        window.__scrollcraftCleanup();
      }
      if (apiRef.current?.destroy) {
        apiRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Script
        src="/scrollcraft/builds/about/scrollcraft.js"
        strategy="beforeInteractive"
        onError={() => {
          console.error("ScrollCraft failed to load");
        }}
      />
      <Script src="/scrollcraft/builds/about/scrollcraft.css" strategy="beforeInteractive" />

      <style>{`
        :root {
          --sc-canvas:     #F8F6F0;
          --sc-surface:    #F0EDE6;
          --sc-ink:        #11192B;
          --sc-ink-soft:   #5D6476;
          --sc-accent:     #D4AF37;
          --sc-accent-ink: #11192B;
          --sc-font-display: var(--font-urbanist), system-ui, sans-serif;
          --sc-font-text:    var(--font-urbanist), system-ui, sans-serif;
        }
        .chapter {
          padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .chapter--dark { background: #1A2642; color: #F8F6F0; }
        .chapter--light { background: #F8F6F0; color: #11192B; }
        .chapter--gold { background: #D4AF37; color: #11192B; }
        .folio {
          position: fixed; top: clamp(1.5rem, 3vw, 2.5rem); right: clamp(1.5rem, 3vw, 2.5rem);
          font-family: var(--sc-font-text); font-size: 0.75rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--sc-ink); z-index: 100;
          /* mix-blend-mode: difference; disabled for Safari compatibility */
          /* Removed opacity: 0.7; use solid ink color with background for contrast */
          background: color-mix(in oklab, var(--sc-canvas) 85%, transparent);
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .folio__num { font-weight: 300; font-size: 0.625rem; display: block; margin-bottom: 0.25rem; }
        .title-page {
          min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
          padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem); background: #F8F6F0;
        }
        .title-page__eyebrow {
          font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #5D6476; margin-bottom: 1.5rem;
        }
        .title-page__heading {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(2.75rem, 7vw, 5.5rem); line-height: 0.95;
          letter-spacing: -0.04em; color: #11192B; max-width: 18ch; text-wrap: balance;
        }
        .title-page__sub {
          font-size: clamp(1rem, 1.5vw, 1.25rem); font-weight: 400; line-height: 1.6;
          color: #5D6476; max-width: 45ch; margin-top: 2rem;
        }
        .intertitle {
          padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem);
          min-height: 40vh; display: flex; flex-direction: column; justify-content: center;
        }
        .intertitle__num {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(3rem, 6vw, 5rem); letter-spacing: -0.04em;
          color: #D4AF37; line-height: 1; margin-bottom: 0.5rem;
        }
        .intertitle__heading {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(1.75rem, 3.5vw, 2.25rem); letter-spacing: -0.02em;
          line-height: 1.17; max-width: 20ch;
        }
        .chapter-body { padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem); }
        .chapter-body__inner { max-width: 52ch; }
        .chapter-body p {
          font-size: clamp(1rem, 1.25vw, 1.125rem); line-height: 1.6;
          letter-spacing: -0.01em; margin-bottom: 1.5rem;
        }
        .chapter-body p:last-child { margin-bottom: 0; }
        .pillars {
          display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 4vw, 4rem);
          padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem);
        }
        @media (min-width: 768px) { .pillars { grid-template-columns: repeat(3, 1fr); } }
        .pillar { border-top: 1px solid #D4AF37; padding-top: 1.5rem; }
        .pillar__label {
          font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #D4AF37; margin-bottom: 0.75rem;
        }
        .pillar__heading {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(1.25rem, 2vw, 1.5rem); letter-spacing: -0.02em;
          line-height: 1.2; margin-bottom: 0.75rem;
        }
        .pillar__body { font-size: 0.9375rem; line-height: 1.6; color: #5D6476; }
        .name-part { border-left: 2px solid #D4AF37; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .name-part:last-child { margin-bottom: 0; }
        .name-part__word {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(1.5rem, 2.5vw, 2rem); letter-spacing: -0.02em;
          color: #D4AF37; margin-bottom: 0.25rem;
        }
        .name-part__meaning { font-size: 0.9375rem; line-height: 1.6; color: #9FA3AA; }
        .values-list { list-style: none; padding: 0; margin: 0; }
        .values-list li {
          border-bottom: 1px solid #D4AF37; padding: 1.25rem 0;
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(1.125rem, 1.75vw, 1.375rem); letter-spacing: -0.01em; line-height: 1.3;
        }
        .values-list li span { font-weight: 400; font-size: 0.875rem; color: #5D6476; display: block; margin-top: 0.375rem; max-width: 45ch; }
        .transform-stage { min-height: 200vh; position: relative; }
        .transform-word {
          position: sticky; top: 50%; transform: translateY(-50%);
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(4rem, 10vw, 8rem); letter-spacing: -0.04em;
          text-align: center; color: #F8F6F0;
        }
        .colophon {
          min-height: 60vh; display: flex; flex-direction: column; justify-content: center;
          padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem);
          background: #1A2642; color: #F8F6F0;
        }
        .colophon__text {
          font-family: var(--sc-font-display); font-weight: 300;
          font-size: clamp(1.5rem, 3vw, 2rem); letter-spacing: -0.02em;
          line-height: 1.3; max-width: 30ch; margin-bottom: 2rem;
        }
        .colophon__cta {
          display: inline-block; font-family: var(--sc-font-text); font-size: 0.9375rem;
          font-weight: 400; letter-spacing: -0.01em; color: #11192B; background: #D4AF37;
          padding: 0.875rem 2rem; border-radius: 6px; text-decoration: none;
          transition: filter 0.3s; width: fit-content;
        }
        .colophon__cta:hover { filter: brightness(1.08); }
        .colophon__small { margin-top: 3rem; font-size: 0.75rem; line-height: 1.6; color: #9FA3AA; max-width: 45ch; }
      `}</style>

      <span data-sc-progress />
      <div className="folio" data-sc-folio>
        <span className="folio__num" data-sc-folio-num />
        <span data-sc-folio-title />
      </div>

      <main id="top">
        {/* TITLE PAGE */}
        <section className="title-page" data-sc-act="flow" data-sc-drift="#F8F6F0">
          <p className="title-page__eyebrow" data-sc-cue="0.06 0.5">Alchemetryx</p>
          <h1 className="title-page__heading" data-sc-cue="0 0.6 0">Clarity before you commit.</h1>
          <p className="title-page__sub" data-sc-cue="0.12 0.7">Business systems, decision and growth intelligence partner for owner-led businesses.</p>
        </section>

        {/* 01 · THE PATTERN */}
        <section className="intertitle chapter--light" data-sc-act="flow" data-sc-drift="#F8F6F0" data-sc-chapter="01 · The Pattern">
          <div className="intertitle__num">01</div>
          <h2 className="intertitle__heading">Every growing business hits the same wall.</h2>
        </section>
        <section className="chapter-body chapter--light" data-sc-act="flow" data-sc-in data-sc-stagger="70" data-sc-drift="#F8F6F0">
          <div className="chapter-body__inner">
            <p>They invest in software that doesn&apos;t work together. A CRM here. A spreadsheet there. A tool for this, a tool for that. Each one solves one problem. None of them talk to each other.</p>
            <p>The result: decision-making slows down. Tools don&apos;t connect. Too much manual work. Everything depends on the owner. The business grows, but the systems don&apos;t grow with it.</p>
            <p>This is not a technology problem. It is a systems thinking problem.</p>
          </div>
        </section>

        {/* 02 · THE INSIGHT */}
        <section className="intertitle chapter--dark" data-sc-act="flow" data-sc-drift="#1A2642" data-sc-chapter="02 · The Insight">
          <div className="intertitle__num">02</div>
          <h2 className="intertitle__heading">What decision are you trying to make?</h2>
        </section>
        <section className="chapter-body chapter--dark" data-sc-act="flow" data-sc-in data-sc-stagger="70" data-sc-drift="#1A2642">
          <div className="chapter-body__inner">
            <p>That single question changed everything. When we started asking it, the conversations shifted. Instead of talking about software, we started talking about decisions. Instead of talking about tools, we started talking about systems.</p>
            <p>The companies that succeeded didn&apos;t have more technology. They had clearer systems. They knew what decision each tool was supposed to support, and they built the workflow around that decision, not around the tool.</p>
          </div>
        </section>

        {/* 03 · THE FIX */}
        <section className="intertitle chapter--light" data-sc-act="flow" data-sc-drift="#F8F6F0" data-sc-chapter="03 · The Fix">
          <div className="intertitle__num">03</div>
          <h2 className="intertitle__heading">Four things we fix.</h2>
        </section>
        <section className="chapter-body chapter--light" data-sc-act="flow" data-sc-in data-sc-stagger="70" data-sc-drift="#F8F6F0">
          <div className="chapter-body__inner">
            <p><strong>Decision-making is slow.</strong> Information is scattered across tools. By the time you gather it, the moment has passed.</p>
            <p><strong>Tools don&apos;t work together.</strong> Each system operates in isolation. Data enters twice, exits nowhere, and nobody trusts the numbers.</p>
            <p><strong>Too much manual work.</strong> People do what software should do. The cost is invisible until you count the hours.</p>
            <p><strong>Everything depends on the owner.</strong> The business cannot run without you. That is not a sign of importance. It is a sign of fragility.</p>
          </div>
        </section>

        {/* 04 · HAMMER vs WORKSHOP */}
        <section className="chapter--dark" data-sc-act="flow" data-sc-drift="#1A2642" data-sc-chapter="04 · Hammer vs Workshop">
          <div className="intertitle" style={{ minHeight: "auto" }}>
            <div className="intertitle__num">04</div>
            <h2 className="intertitle__heading">Hammer vs Workshop.</h2>
          </div>
          <div className="transform-stage" data-sc-transform>
            <div className="transform-word" data-sc-transform-word>
              <span data-sc-transform-from>HAMMER</span>
              <span data-sc-transform-to style={{ display: "none" }}>WORKSHOP</span>
            </div>
          </div>
          <div className="chapter-body chapter--dark" style={{ paddingTop: 0 }}>
            <div className="chapter-body__inner">
              <p>Most businesses buy a hammer when they need a workshop. A hammer is a tool. A workshop is a system. The hammer does one thing. The workshop does everything, because every tool in it has a place, a purpose, and a connection to every other tool.</p>
              <p>We build workshops. Systems where every piece connects. Where the output of one process is the input of the next. Where decisions happen because the information is there, not because someone spent three hours pulling it together.</p>
            </div>
          </div>
        </section>

        {/* 05 · THREE PILLARS */}
        <section className="intertitle chapter--light" data-sc-act="flow" data-sc-drift="#F8F6F0" data-sc-chapter="05 · What We Do">
          <div className="intertitle__num">05</div>
          <h2 className="intertitle__heading">Three ways we help.</h2>
        </section>
        <section className="chapter-body chapter--light" data-sc-act="flow" data-sc-drift="#F8F6F0">
          <div className="pillars">
            <div className="pillar" data-sc-cue="0.1 0.6">
              <p className="pillar__label">Decision Intelligence</p>
              <h3 className="pillar__heading">See clearly. Decide confidently.</h3>
              <p className="pillar__body">Dashboards that show what matters. Reports that answer the question you actually asked. Not more data. The right data.</p>
            </div>
            <div className="pillar" data-sc-cue="0.25 0.7">
              <p className="pillar__label">Digital Platforms</p>
              <h3 className="pillar__heading">Tools that work together.</h3>
              <p className="pillar__body">CRM, operations, finance; connected. One source of truth. No duplicate entry. No arguing about which number is right.</p>
            </div>
            <div className="pillar" data-sc-cue="0.4 0.85">
              <p className="pillar__label">Intelligent Automation</p>
              <h3 className="pillar__heading">Less manual work. More focus.</h3>
              <p className="pillar__body">The repetitive tasks that consume your team; automated. Not replacing people. Freeing them to do the work that matters.</p>
            </div>
          </div>
        </section>

        {/* 06 · THE NAME */}
        <section className="intertitle chapter--dark" data-sc-act="flow" data-sc-drift="#1A2642" data-sc-chapter="06 · The Name">
          <div className="intertitle__num">06</div>
          <h2 className="intertitle__heading">Alchemy + Metryx.</h2>
        </section>
        <section className="chapter-body chapter--dark" data-sc-act="flow" data-sc-in data-sc-stagger="70" data-sc-drift="#1A2642">
          <div className="chapter-body__inner">
            <div className="name-breakdown">
              <div>
                <div className="name-part">
                  <p className="name-part__word">Alchemy</p>
                  <p className="name-part__meaning">Transformation. Turning raw material into something valuable.</p>
                </div>
                <div className="name-part">
                  <p className="name-part__word">Metryx</p>
                  <p className="name-part__meaning">Measurement. Intelligence. Precision.</p>
                </div>
              </div>
              <div>
                <p>Not a random tech name. A statement of intent. We transform businesses by measuring what matters and building systems around those measurements.</p>
                <p>The name is the method.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 07 · THE VALUES */}
        <section className="intertitle chapter--light" data-sc-act="flow" data-sc-drift="#F8F6F0" data-sc-chapter="07 · How We Work">
          <div className="intertitle__num">07</div>
          <h2 className="intertitle__heading">Five rules.</h2>
        </section>
        <section className="chapter-body chapter--light" data-sc-act="flow" data-sc-in data-sc-stagger="70" data-sc-drift="#F8F6F0">
          <div className="chapter-body__inner">
            <ul className="values-list">
              <li data-sc-cue="0.08 0.4">Clarity Over Cleverness<span>If it cannot be explained simply, it is not understood yet.</span></li>
              <li data-sc-cue="0.18 0.5">Systems Before Scale<span>Build the system first. Growth follows.</span></li>
              <li data-sc-cue="0.28 0.6">Outcomes Over Output<span>We measure what changed, not what we shipped.</span></li>
              <li data-sc-cue="0.38 0.7">Restraint Over Hype<span>Say less. Mean more.</span></li>
              <li data-sc-cue="0.48 0.8">Long-Term Trust Over Short-Term Wins<span>We stay while the system settles.</span></li>
            </ul>
          </div>
        </section>

        {/* COLOPHON */}
        <section className="colophon" data-sc-act="pin" data-sc-span="1.15" data-sc-drift="#1A2642">
          <div data-sc-stage>
            <p className="colophon__text" data-sc-cue="0.06" data-sc-kinetic="lines">If we do not think there is a problem worth paying to solve, we will tell you that instead.</p>
            <a className="colophon__cta" href="/book" data-sc-cue="0.12">Book a 30-minute call</a>
            <p className="colophon__small">Alchemetryx Ltd · Registered in England and Wales · Company No. 17199377</p>
          </div>
        </section>
      </main>

      <Script id="scrollcraft-init" strategy="afterInteractive">{`
        (function() {
          // Store handlers for cleanup
          var transformHandler = null;
          var folioHandler = null;

          // Hammer vs Workshop transformation
          var transformStage = document.querySelector('[data-sc-transform]');
          var wordFrom = document.querySelector('[data-sc-transform-from]');
          var wordTo = document.querySelector('[data-sc-transform-to]');

          if (transformStage && wordFrom && wordTo) {
            var updateTransform = function() {
              var rect = transformStage.getBoundingClientRect();
              var viewH = window.innerHeight;
              var p = Math.max(0, Math.min(1, 1 - (rect.bottom / (rect.height + viewH))));
              if (p > 0.4) {
                wordFrom.style.display = 'none';
                wordTo.style.display = 'inline';
                wordTo.style.opacity = Math.min(1, (p - 0.4) / 0.2);
              } else {
                wordFrom.style.display = 'inline';
                wordTo.style.display = 'none';
                wordFrom.style.opacity = 1;
              }
            };
            transformHandler = updateTransform;
            window.addEventListener('scroll', transformHandler, { passive: true });
            updateTransform();
          }

          // Folio updates
          var folioNum = document.querySelector('[data-sc-folio-num]');
          var folioTitle = document.querySelector('[data-sc-folio-title]');
          var chapters = document.querySelectorAll('[data-sc-chapter]');
          if (folioNum && folioTitle && chapters.length) {
            var updateFolio = function() {
              var current = '';
              chapters.forEach(function(ch) {
                var rect = ch.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.5) {
                  current = ch.getAttribute('data-sc-chapter');
                }
              });
              if (current) {
                var parts = current.split(' · ');
                folioNum.textContent = parts[0];
                folioTitle.textContent = parts.slice(1).join(' · ');
              }
            };
            folioHandler = updateFolio;
            window.addEventListener('scroll', folioHandler, { passive: true });
            updateFolio();
          }

          // Expose cleanup
          window.__scrollcraftCleanup = function() {
            if (transformHandler) window.removeEventListener('scroll', transformHandler);
            if (folioHandler) window.removeEventListener('scroll', folioHandler);
            window.__scrollcraftCleanup = null;
          };
        })();
      `}</Script>
    </>
  );
}
