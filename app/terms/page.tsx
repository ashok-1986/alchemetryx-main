import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service · Alchemetryx",
  description:
    "Standard terms of service governing software development, system rebuild, and consulting engagements by Alchemetryx Ltd.",
};

export default function TermsPage() {
  return (
    <SectionFullBleed tone="light" className="pt-32 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[78ch] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[var(--color-pearl-line)] pb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
            Legal & Compliance
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.035em] text-[var(--color-ink)]">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-slate)]">
            Effective Date: 6 September 2026
          </p>
        </div>

        {/* Section 1: Definitions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            1. Definitions
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>In these Terms of Service ("Terms"):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>"Alchemetryx", "we", "us", or "our"</strong> means {COMPANY.legalName}, a company registered in England and Wales under company number {COMPANY.companyNumber}, with registered office at {COMPANY.registeredOffice}.
              </li>
              <li>
                <strong>"Client", "you", or "your"</strong> means the business, entity, or individual purchasing or receiving Services from Alchemetryx.
              </li>
              <li>
                <strong>"Services"</strong> means the software engineering, technical rebuild, workflow automation, and consultancy services provided by Alchemetryx under an agreed Statement of Work or commercial quote.
              </li>
              <li>
                <strong>"Statement of Work" or "SOW"</strong> means the document, written proposal, or quote agreed between the parties setting out the deliverables, timelines, and fees for a specific engagement.
              </li>
              <li>
                <strong>"Deliverables"</strong> means the software code, configurations, data models, workflows, and documentation created specifically for the Client as specified in an SOW.
              </li>
              <li>
                <strong>"Client Materials"</strong> means any data, software, spreadsheets, documents, APIs, credentials, or other assets provided by the Client to Alchemetryx for the purpose of carrying out the Services.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: The Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            2. The Services
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Alchemetryx will provide the Services set out in the relevant Statement of Work with reasonable care and skill, in accordance with recognized industry standards.
            </p>
            <p>
              Each SOW forms a separate contract incorporating these Terms. In the event of any conflict between an SOW and these Terms, the SOW will prevail for that specific engagement.
            </p>
            <p>
              Timelines and milestone dates agreed in an SOW are good-faith estimates unless explicitly stated in writing as a fixed binding deadline. We will inform you promptly if unexpected technical blockers or dependencies affect projected delivery dates.
            </p>
          </div>
        </section>

        {/* Section 3: Client Obligations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            3. Client Obligations
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>To enable Alchemetryx to perform the Services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Provide accurate, complete, and timely information regarding your business processes, existing files, and tools.</li>
              <li>Supply necessary access credentials, API keys, repository permissions, and technical access required for the build.</li>
              <li>Appoint a primary point of contact with authority to make decisions, approve deliverables, and answer technical questions.</li>
              <li>Review deliverables and provide constructive feedback or written acceptance within the timeframe specified in the SOW (or within 7 business days if unspecified).</li>
            </ul>
            <p>
              Alchemetryx is not responsible for delays or failure to perform caused by your delay in providing required access, information, or sign-offs.
            </p>
          </div>
        </section>

        {/* Section 4: Acceptable Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            4. Acceptable Use
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              You must not use our website, services, or deliverables for any unlawful, fraudulent, or malicious purpose.
            </p>
            <p>
              You agree not to upload, store, or transmit through our systems any material that is defamatory, infringing, or containing harmful malicious code. You must not attempt to compromise or reverse-engineer systems provided outside your licensed scope.
            </p>
          </div>
        </section>

        {/* Section 5: Fees and Payment */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            5. Fees and Payment
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Fees for Services will be agreed in each Statement of Work, either on a fixed-fee milestone basis or on an agreed periodic retainer.
            </p>
            <p>
              Unless otherwise stated in the SOW, invoices are payable within 14 calendar days of the invoice date.
            </p>
            <p>
              Alchemetryx Ltd is not currently registered for VAT. If we become VAT-registered, applicable VAT will be added to invoices at the prevailing statutory rate from the date of registration.
            </p>
            <p>
              We reserve the right to charge statutory interest on late payments under the Late Payment of Commercial Debts (Interest) Act 1998 at the rate of 8% above the Bank of England base rate, alongside statutory debt recovery costs.
            </p>
            <p>
              If an invoice remains unpaid after 14 days following written reminder, Alchemetryx may suspend further delivery of Services until all outstanding balances are cleared.
            </p>
          </div>
        </section>

        {/* Section 6: Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            6. Intellectual Property
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              <strong>Client Materials:</strong> You retain all right, title, and interest (including all intellectual property rights) in your Client Materials. You grant Alchemetryx a non-exclusive, royalty-free license to use your Client Materials solely to deliver the Services.
            </p>
            <p>
              <strong>Deliverables:</strong> Subject to full and final payment of all agreed fees for the applicable SOW, Alchemetryx assigns to you all intellectual property rights in the bespoke Deliverables created specifically for you.
            </p>
            <p>
              <strong>Pre-Existing Tools & Frameworks:</strong> Alchemetryx retains ownership of all pre-existing software tools, boilerplate templates, utility libraries, software patterns, and know-how developed prior to or independently of the engagement. Where such pre-existing assets are embedded in a Deliverable, we grant you a perpetual, worldwide, non-exclusive, royalty-free license to use, run, and modify them as part of your internal business operations.
            </p>
            <p>
              <strong>Third-Party & Open Source:</strong> Any third-party software, open-source libraries, or SaaS platforms incorporated into Deliverables remain subject to their respective licenses.
            </p>
          </div>
        </section>

        {/* Section 7: Confidentiality */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            7. Confidentiality
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              "Confidential Information" means any proprietary or non-public technical, commercial, financial, or organizational information disclosed by one party to the other in connection with the Services.
            </p>
            <p>Both parties agree to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Keep all Confidential Information strictly confidential using the same standard of care used to protect their own sensitive information (and never less than reasonable care).</li>
              <li>Disclose Confidential Information only to employees, contractors, or advisers who need to know it to perform the contract and who are bound by equivalent confidentiality obligations.</li>
              <li>Not disclose Confidential Information to any third party without prior written consent, except where required by law, regulation, or court order.</li>
            </ul>
            <p>
              These confidentiality obligations survive termination of the contract for a period of 3 years.
            </p>
          </div>
        </section>

        {/* Section 8: Data Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            8. Data Protection
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Both parties will comply with their applicable obligations under the UK Data Protection Act 2018 and the UK GDPR.
            </p>
            <p>
              Where Alchemetryx processes personal data on your behalf as a data processor during a software development or system rebuild engagement, the terms of our Data Processing Addendum (DPA) will apply to that processing.
            </p>
            <p>
              You warrant that you have all necessary rights, legal bases, and consents to provide personal data to Alchemetryx for the purpose of the Services.
            </p>
          </div>
        </section>

        {/* Section 9: Warranties and Disclaimers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            9. Warranties and Disclaimers
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>Alchemetryx warrants that:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>It has the full authority and legal capacity to enter into and perform these Terms.</li>
              <li>Services will be performed with reasonable skill, diligence, and professional care.</li>
              <li>Deliverables will materially conform to the specifications set out in the applicable SOW for a warranty period of 30 days following delivery.</li>
            </ul>
            <p>
              Alchemetryx intends to hold professional indemnity insurance of an appropriate level and will confirm cover details to Client before commencing any engagement.
            </p>
            <p>
              Except as expressly stated in these Terms, all warranties, conditions, or representations (express, implied, statutory, or otherwise) including fitness for a particular purpose, non-infringement, or uninterrupted availability are excluded to the fullest extent permitted by law.
            </p>
            <p>
              We build custom software systems and internal tools. We do not provide financial, accounting, legal, or statutory regulatory advice. The Client remains solely responsible for ensuring its own regulatory, statutory, and tax compliance.
            </p>
          </div>
        </section>

        {/* Section 10: Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            10. Limitation of Liability
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Nothing in these Terms limits or excludes either party's liability for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Death or personal injury caused by negligence.</li>
              <li>Fraud or fraudulent misrepresentation.</li>
              <li>Any other liability that cannot be limited or excluded under English law.</li>
            </ul>
            <p>Subject to the above:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Neither party will be liable to the other, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, for any indirect, special, incidental, or consequential loss, or for loss of profits, loss of business revenue, loss of goodwill, or loss of anticipated savings.
              </li>
              <li>
                The total aggregate liability of Alchemetryx arising out of or in connection with an engagement (whether in contract, tort, negligence, or otherwise) will be capped at the total amount of fees actually paid by the Client to Alchemetryx under the specific Statement of Work giving rise to the claim in the 12 months preceding the event.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 11: Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            11. Termination
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Either party may terminate an engagement or SOW by written notice if the other party:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Commits a material breach of these Terms that is incapable of remedy, or fails to remedy a remediable breach within 30 days of written notice.</li>
              <li>Becomes insolvent, enters administration, liquidation, or bankruptcy, or ceases trading.</li>
            </ul>
            <p>
              Unless specified otherwise in an SOW, either party may terminate an ongoing advisory retainer by providing 30 days' written notice to the other party.
            </p>
            <p>
              Upon termination, the Client will immediately pay Alchemetryx for all Services performed, work in progress, and expenses incurred up to the date of termination.
            </p>
          </div>
        </section>

        {/* Section 12: Force Majeure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            12. Force Majeure
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              Neither party will be in breach of these Terms or liable for delay in performing obligations if such delay results from events, circumstances, or causes beyond its reasonable control (including acts of God, war, civil commotion, power failures, national telecom or internet outages, strikes, or government actions).
            </p>
            <p>
              If a force majeure event continues for more than 60 consecutive days, either party may terminate the affected SOW upon written notice.
            </p>
          </div>
        </section>

        {/* Section 13: Governing Law and Dispute Resolution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            13. Governing Law and Dispute Resolution
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              These Terms, each Statement of Work, and any dispute or claim arising out of them (including non-contractual disputes) are governed by and construed in accordance with the laws of England and Wales.
            </p>
            <p>
              Before initiating formal legal proceedings, the parties agree to seek in good faith to resolve any dispute or claim through direct executive negotiation within 30 days of written notice of dispute.
            </p>
            <p>
              If the dispute cannot be resolved through negotiation, the courts of England and Wales will have exclusive jurisdiction to settle any dispute or claim.
            </p>
          </div>
        </section>

        {/* Section 14: General Provisions */}
        <section className="space-y-4 border-t border-[var(--color-pearl-line)] pt-8">
          <h2 className="text-2xl font-light tracking-tight text-[var(--color-ink)]">
            14. General Provisions
          </h2>
          <div className="space-y-3 text-base text-[var(--color-ink)]/85 leading-relaxed">
            <p>
              <strong>Entire Agreement:</strong> These Terms together with any active SOW constitute the entire agreement between the parties regarding the subject matter and supersede all prior understandings or statements.
            </p>
            <p>
              <strong>Amendments:</strong> Any amendment or variation to these Terms must be in writing and agreed by authorized representatives of both parties.
            </p>
            <p>
              <strong>Severability:</strong> If any provision of these Terms is found invalid or unenforceable by a court, the remaining provisions will continue in full force and effect.
            </p>
            <p>
              <strong>Third-Party Rights:</strong> A person who is not a party to these Terms has no right under the Contracts (Rights of Third Parties) Act 1999 to enforce any of its provisions.
            </p>
            <p>
              <strong>Notices:</strong> All formal notices under these Terms must be in writing and sent by email to{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[var(--color-gold-deep)] underline underline-offset-4">
                {COMPANY.email}
              </a>{" "}
              or by postal delivery to {COMPANY.registeredOffice}. Each Statement of Work must specify the Client's designated notice email address and postal address for formal communications. Termination notices and dispute notices under Sections 11 and 13 must be sent to the addresses identified in this clause or the applicable SOW.
            </p>
          </div>
        </section>
      </div>
    </SectionFullBleed>
  );
}
