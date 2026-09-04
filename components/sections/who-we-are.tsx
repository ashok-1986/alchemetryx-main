import { SectionFullBleed } from "./section-full-bleed";
import { COMPANY_INFO } from "@/lib/constants";

const TEAM = [
  {
    name: "Ashok",
    role: "Commercial & Solutions Architecture",
    location: "London / Pune",
    bio: "Focuses on commercial structuring, regulatory compliance alignment, and client solution design across UK and India markets.",
  },
  {
    name: "Nimish",
    role: "Systems & Technical Delivery",
    location: "London, UK",
    bio: "Leads systems engineering, custom API integrations, deterministic workflow automation, and infrastructure resilience.",
  },
  {
    name: "Pravin",
    role: "Process Engineering & Architecture",
    location: "Pune, India",
    bio: "Specialises in workflow decomposition, business process automation, testing telemetry, and long-term systems maintenance.",
  },
];

export function WhoWeAre() {
  return (
    <SectionFullBleed tone="dark" id="who-we-are">
      <div className="space-y-12">
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold)]">
            Leadership & Accountability
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-pearl)]">
            Who we are
          </h2>
          <p className="text-base text-[var(--color-slate)] max-w-[65ch]">
            Engineers and solution architects working directly with business owners. You talk to the people who build your systems, not an account team.
          </p>
        </div>

        {/* Three Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="p-8 rounded-[9px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] space-y-4"
            >
              {/* Monogram placeholder for photography until studio portraits are completed */}
              <div className="w-14 h-14 rounded-full bg-[var(--color-sapphire)] border border-[var(--color-sapphire-line)] flex items-center justify-center text-lg font-light text-[var(--color-gold)]">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-pearl)]">
                  {member.name}
                </h3>
                <p className="text-xs text-[var(--color-gold)] font-mono mt-0.5">
                  {member.role}
                </p>
                <p className="text-xs text-[var(--color-slate)]">
                  {member.location}
                </p>
              </div>
              <p className="text-sm text-[var(--color-slate)] leading-relaxed pt-2 border-t border-[var(--color-sapphire-line)]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Registration and Locations Trust Footer */}
        <div className="p-6 sm:p-8 rounded-[9px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm text-[var(--color-slate)]">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[var(--color-pearl)] block font-normal">
              Corporate Registration
            </span>
            <p className="text-base font-light text-[var(--color-pearl)]">
              {COMPANY_INFO.companyNumberLabel}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-pearl)] block font-normal">
                United Kingdom
              </span>
              <p>{COMPANY_INFO.ukAddress}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-pearl)] block font-normal">
                India
              </span>
              <p>{COMPANY_INFO.indiaAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionFullBleed>
  );
}
