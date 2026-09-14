"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";

interface FeatureVelocityProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}

export const FeatureVelocity = ({ title, description, features, className }: FeatureVelocityProps) => {
  return (
    <SectionFullBleed tone="light" fullHeight={false} className={cn("py-24 md:py-[140px]", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: 40% Visual Weight (Sticky Header) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 space-y-8">
            <h2 className="font-urbanist font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-[1.05]">
              {title}
            </h2>
            {description && (
              <p className="max-w-[40ch] text-[var(--color-slate)] font-normal text-lg md:text-xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {/* Right Side: 60% Text/Feature Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map((card, i) => (
              <div
                key={i}
                className="group relative bg-[var(--color-pearl)] border border-[var(--color-pearl-line)] rounded-lg p-8 lg:p-10 overflow-hidden hover:border-[var(--color-gold-deep)] hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Magnetic Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-deep)]/0 to-[var(--color-gold-deep)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center text-[var(--color-sapphire)] transform group-hover:scale-110 transition-transform duration-500">
                      {card.icon}
                    </div>
                    <h3 className="font-normal text-xl lg:text-2xl text-[var(--color-ink)]">
                      {card.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-base lg:text-lg text-[var(--color-ink)]/85 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFullBleed>
  );
};
