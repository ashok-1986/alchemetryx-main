import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";

export const metadata: Metadata = {
  title: "Equality and Diversity Policy | Alchemetryx Consulting",
  description:
    "Alchemetryx Consulting's commitment to equality, fairness and diversity in how we work with our team, associates and clients.",
  alternates: {
    canonical: "/equality-and-diversity-policy",
  },
};

export default function EqualityAndDiversityPolicyPage() {
  return (
    <SectionFullBleed tone="light" className="pt-32 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[78ch] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[var(--color-pearl-line)] pb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
            Legal & Compliance
          </p>
          <h1 className="text-[length:var(--text-display-xl)] font-light leading-[1.1] tracking-[-0.035em] text-[var(--color-ink)]">
            Equality and Diversity Policy
          </h1>
          <p className="text-sm text-[var(--color-slate)]">
            Alchemetryx Consulting (OPC) Pvt. Ltd.<br />
            Last reviewed: September 2026
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            Our commitment
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Alchemetryx works with owner-led SMEs across the UK, and our own team is small and deliberately built on trust rather than hierarchy. That makes fairness a daily practice, not a policy document sitting unread in a drawer.
            </p>
            <p>
              We are committed to treating every person we work with, team members, associates, contractors, and client stakeholders, with respect, regardless of their background. We align our practices with the spirit of the UK Equality Act 2010, given the market we serve, and we hold ourselves to the same standard in how we hire, engage, and collaborate.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            What equality and diversity mean to us
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Equality means removing barriers so that everyone gets a fair shot, in how we bring people onto the team, how we assign work, and how we price and scope engagements.
            </p>
            <p>
              Diversity means recognising that different backgrounds and ways of thinking make our advice sharper. A consultancy that only hears one kind of perspective gives its clients narrower thinking. We treat these as connected, not as a checkbox exercise.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            Who this applies to
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              This policy applies to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Anyone working at or for Alchemetryx, whether as a founder, employee, freelance associate, or contractor</li>
              <li>Anyone we engage with on behalf of a client during a project</li>
              <li>Vendors and partners we choose to work with</li>
            </ul>
            <p>
              It applies to how we communicate, in meetings, in writing, and on any platform where the conversation is connected to our work.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            Characteristics we will not discriminate against
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              We will not tolerate discrimination or harassment based on:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Sex or gender</li>
              <li>Gender identity or reassignment</li>
              <li>Marital or civil partnership status</li>
              <li>Pregnancy or maternity</li>
              <li>Race, ethnicity, colour, nationality or national origin</li>
              <li>Disability</li>
              <li>Sexual orientation</li>
              <li>Religion or belief</li>
              <li>Age</li>
            </ul>
            <p>
              We also won't tolerate unfair treatment based on someone's employment pattern, part-time, freelance, or fixed-term.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            How this works in practice
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              <strong>Engaging people.</strong> Whether we're bringing on an associate or subcontracting specialist work, decisions are based on skill, reliability, and fit for the task. Nothing else.
            </p>
            <p>
              <strong>Working with clients.</strong> Our recommendations, scoping, and pricing are based on business need. We won't adjust our advice or our conduct based on who we're speaking to within a client organisation.
            </p>
            <p>
              <strong>Day to day conduct.</strong> No bullying, harassment, or intimidation, in any form, is acceptable in how we work internally or with clients.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            Raising a concern
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              If you believe you've experienced or witnessed a breach of this policy, in your dealings with Alchemetryx, raise it directly with Ashok Verma at support@alchemetryx.com. We'll treat it in confidence and take it seriously. Nobody raising a genuine concern will be treated less favourably as a result.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            A note on scope
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              This policy reflects our values and working standards. It is not a substitute for legal advice, and it does not create contractual rights. As our team grows, this policy will be reviewed and expanded, including formal reference to applicable Indian labour law where relevant to our own hiring.
            </p>
          </div>
        </section>
      </div>
    </SectionFullBleed>
  );
}
