import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy · Alchemetryx",
  description:
    "How Alchemetryx Ltd collects, uses, stores, and protects personal data under UK GDPR and the Data Protection Act 2018.",
};

export default function PrivacyPage() {
  return (
    <SectionFullBleed tone="light" className="pt-32 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[78ch] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[var(--color-pearl-line)] pb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
            Legal & Compliance
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.035em] text-[var(--color-ink)]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-slate)]">
            Effective Date: 6 September 2026
          </p>
        </div>

        {/* Section 1: Who We Are */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            1. Who We Are
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              This Privacy Policy applies to {COMPANY.legalName} ("Alchemetryx", "we", "us", or "our").
            </p>
            <p>
              We are a private limited company registered in England and Wales under company number {COMPANY.companyNumber}. Our registered office address is {COMPANY.registeredOffice}.
            </p>
            <p>
              For the purposes of the UK General Data Protection Regulation ("UK GDPR") and the Data Protection Act 2018, Alchemetryx Ltd acts as a data controller for personal data collected through this website and through our direct client and business relationships.
            </p>
            <p>
              Data Protection Officer / Privacy Contact: Ashok Verma. Email:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[var(--color-gold-deep)] underline underline-offset-4">
                {COMPANY.email}
              </a>
              .
            </p>

          </div>
        </section>

        {/* Section 2: Scope */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            2. Scope
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              This policy explains how we collect, hold, process, and transfer personal data when you:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Visit our website at alchemetryx.com.</li>
              <li>Schedule or attend a consultation call with us.</li>
              <li>Enquire about our consulting, software engineering, or system rebuild services.</li>
              <li>Engage us to rebuild, maintain, or support your internal business workflows and tools.</li>
            </ul>
            <p>
              When we process business data on behalf of our clients as part of a technical build engagement, we act as a data processor. Such processing is governed by our client agreements and a separate Data Processing Addendum (DPA).
            </p>
          </div>
        </section>

        {/* Section 3: What Data We Collect */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            3. What Data We Collect
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>We collect only the minimum personal data needed to communicate with you and perform our work:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-[var(--color-pearl-line)]">
                <thead>
                  <tr className="bg-[var(--color-pearl)] border-b border-[var(--color-pearl-line)]">
                    <th className="p-3 font-medium text-[var(--color-ink)]">Category</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Examples of Data Collected</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Collection Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-pearl-line)]">
                  <tr>
                    <td className="p-3 font-medium">Contact Details</td>
                    <td className="p-3">Full name, business email address, phone number, company name, job title.</td>
                    <td className="p-3">Call booking form, email, or direct correspondence.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Consultation Details</td>
                    <td className="p-3">Notes on your existing operational bottlenecks, current software, spreadsheets, and processes.</td>
                    <td className="p-3">Shared directly by you during intro or discovery calls.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Commercial Data</td>
                    <td className="p-3">Invoices, billing contacts, payment confirmations, and contract records.</td>
                    <td className="p-3">Client agreements and accounting transactions.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Technical & Usage Data</td>
                    <td className="p-3">IP address, browser type, device details, and basic anonymous page visit timestamps.</td>
                    <td className="p-3">Server access logs and hosting infrastructure.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>We do not collect any special category personal data (such as health, political, or biometric data) through this website.</p>
          </div>
        </section>

        {/* Section 4: Lawful Basis for Processing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            4. Lawful Basis for Processing
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>Under Article 6 of the UK GDPR, we rely on the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contract:</strong> Processing necessary to enter into or perform our service agreement with you (e.g. delivering software builds, communicating on active work, billing).
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing necessary for our legitimate commercial interests, provided your interests and fundamental rights do not override them (e.g. responding to inquiries, maintaining system security, preventing fraud).
              </li>
              <li>
                <strong>Legal Obligation:</strong> Processing required to comply with UK company law, tax reporting, and statutory record-keeping rules (e.g. HMRC records).
              </li>
              <li>
                <strong>Consent:</strong> Where you have granted explicit consent for a specific activity (e.g. opt-in communications). You can withdraw consent at any time.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: How We Use Data */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            5. How We Use Data
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>We use the data we collect solely for the following business purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Scheduling, confirming, and conducting discovery or diagnostic calls.</li>
              <li>Evaluating your business requirements to prepare scopes of work and project quotes.</li>
              <li>Building, delivering, and maintaining custom software systems under agreed terms.</li>
              <li>Managing client invoicing, bookkeeping, and accounting compliance.</li>
              <li>Protecting the security, integrity, and operational availability of our website and services.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </div>
        </section>

        {/* Section 6: Who We Share Data With */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            6. Who We Share Data With
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              We share data only with selected third-party service providers (data processors) who assist us in operating our business. Each provider is vetted and bound by strict confidentiality and data protection obligations:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-[var(--color-pearl-line)]">
                <thead>
                  <tr className="bg-[var(--color-pearl)] border-b border-[var(--color-pearl-line)]">
                    <th className="p-3 font-medium text-[var(--color-ink)]">Processor</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Purpose</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-pearl-line)]">
                  <tr>
                    <td className="p-3 font-medium">Cal.com</td>
                    <td className="p-3">Appointment scheduling and calendar booking embed.</td>
                    <td className="p-3">EU / US (Standard Contractual Clauses)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Vercel Inc.</td>
                    <td className="p-3">Website hosting, edge delivery, and deployment infrastructure.</td>
                    <td className="p-3">US / Global (Data Privacy Framework / SCCs)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Google Workspace</td>
                    <td className="p-3">Business email, document storage, and direct correspondence.</td>
                    <td className="p-3">EU / US (Standard Contractual Clauses)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Professional Advisers</td>
                    <td className="p-3">Accountants, legal counsel, and banking partners.</td>
                    <td className="p-3">United Kingdom</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We may also disclose information where required by law, court order, or regulatory authority (such as HMRC or law enforcement agencies).
            </p>
          </div>
        </section>

        {/* Section 7: International Transfers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            7. International Transfers
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Alchemetryx operates across the United Kingdom and maintains development resources in India.
            </p>
            <p>
              Where personal data is accessed or transferred outside the UK, we ensure appropriate safeguards are implemented in accordance with Chapter V of the UK GDPR.
            </p>
            <p>
              For personnel access between the UK and India, Alchemetryx is currently implementing a formal UK International Data Transfer Agreement (IDTA) and standard contractual safeguards to ensure an equivalent standard of protection for all client and business data.
            </p>
            <p>
              For cloud vendors based in the United States or other jurisdictions, we rely on the UK extension to the EU-US Data Privacy Framework or the UK International Data Transfer Addendum to the European Commission standard contractual clauses.
            </p>
          </div>
        </section>

        {/* Section 8: Data Retention */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            8. Data Retention
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              We keep personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or regulatory requirements:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-[var(--color-pearl-line)]">
                <thead>
                  <tr className="bg-[var(--color-pearl)] border-b border-[var(--color-pearl-line)]">
                    <th className="p-3 font-medium text-[var(--color-ink)]">Data Type</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Retention Period</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-pearl-line)]">
                  <tr>
                    <td className="p-3 font-medium">Prospective client inquiries</td>
                    <td className="p-3">12 months from last interaction</td>
                    <td className="p-3">To respond to follow-ups and assess past requirements.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Active client engagement records</td>
                    <td className="p-3">Duration of contract plus 6 years</td>
                    <td className="p-3">Limitation Act 1980 (contract claim limitation period).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Financial and accounting records</td>
                    <td className="p-3">6 full financial years plus current year</td>
                    <td className="p-3">HMRC and Companies Act statutory obligations.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Server access logs</td>
                    <td className="p-3">90 days</td>
                    <td className="p-3">Security monitoring, incident investigation, and error analysis.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>When the retention period ends, data is securely erased or permanently anonymised.</p>
          </div>
        </section>

        {/* Section 9: Your Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            9. Your Rights
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>Under the UK GDPR, you have the following rights regarding your personal data:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-[var(--color-pearl-line)]">
                <thead>
                  <tr className="bg-[var(--color-pearl)] border-b border-[var(--color-pearl-line)]">
                    <th className="p-3 font-medium text-[var(--color-ink)]">Right</th>
                    <th className="p-3 font-medium text-[var(--color-ink)]">What It Means</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-pearl-line)]">
                  <tr>
                    <td className="p-3 font-medium">Right to Access</td>
                    <td className="p-3">You can request confirmation of whether we process your personal data and obtain a copy of it.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Rectification</td>
                    <td className="p-3">You can ask us to correct inaccurate or incomplete personal data.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Erasure</td>
                    <td className="p-3">You can ask us to delete your personal data where there is no ongoing lawful reason to hold it.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Restriction</td>
                    <td className="p-3">You can ask us to suspend the processing of your data in specific circumstances.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Data Portability</td>
                    <td className="p-3">Where the lawful basis for processing is consent or contract, and the data was provided by you and processed by automated means, you can request your personal data in a structured, commonly used, machine-readable format.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Object</td>
                    <td className="p-3">You can object to processing based on legitimate interests or direct communications.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Right to Withdraw Consent</td>
                    <td className="p-3">Where processing relies on consent, you may withdraw that consent at any time without penalty.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              To exercise any of these rights, please write to{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[var(--color-gold-deep)] underline underline-offset-4">
                {COMPANY.email}
              </a>
              . We respond to all verified requests within one calendar month.
            </p>
            <p>
              You also have the right to lodge a complaint with the UK supervisory authority, the Information Commissioner's Office (ICO): Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF | Website:{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold-deep)] underline underline-offset-4">
                ico.org.uk
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 10: Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            10. Cookies and Tracking
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Our website does not use tracking cookies, advertising pixels, or invasive behavioral profiling tools.
            </p>
            <p>
              We use strictly necessary functional mechanisms required to deliver the website securely and preserve basic session choices. If you use the embedded booking widget, third-party functional cookies may be set by Cal.com to manage the appointment scheduling sequence.
            </p>
            <p>
              You can instruct your web browser to refuse all cookies or notify you when a cookie is sent.
            </p>
          </div>
        </section>

        {/* Section 11: Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            11. Security
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss, misuse, or alteration.
            </p>
            <p>
              Measures include TLS encryption in transit for all web traffic, role-based access controls, multi-factor authentication on administrative accounts, and encrypted cloud storage repositories.
            </p>
          </div>
        </section>

        {/* Section 12: Changes to This Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            12. Changes to This Policy
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our legal duties, business practices, or service offerings.
            </p>
            <p>
              Any changes will be posted directly on this page with an updated effective date. We encourage you to review this page periodically.
            </p>
          </div>
        </section>

        {/* Section 13: Contact */}
        <section className="space-y-4 border-t border-[var(--color-pearl-line)] pt-8">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            13. Contact
          </h2>
          <div className="space-y-2 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <p className="font-medium text-[var(--color-ink)]">{COMPANY.legalName}</p>
            <p>Registered Office: {COMPANY.registeredOffice}</p>
            <p>
              Email:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[var(--color-gold-deep)] underline underline-offset-4">
                {COMPANY.email}
              </a>
            </p>
            <p>Company Number: {COMPANY.companyNumber}</p>
          </div>
        </section>
      </div>
    </SectionFullBleed>
  );
}
