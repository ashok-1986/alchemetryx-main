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
    <SectionFullBleed tone="light" fullHeight={false} className={cn("py-20 md:py-[120px]", className)}>
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-[var(--color-pearl-line)] pb-12">
          <div className="space-y-6">
            <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.25rem)] tracking-tight max-w-[25ch]">
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-[45ch] text-[var(--color-slate)] font-normal text-base md:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((card, i) => (
            <div
              key={i}
              className="group relative bg-[var(--color-pearl)] border border-[var(--color-pearl-line)] rounded-lg p-8 md:p-10 overflow-hidden hover:border-[var(--color-gold-deep)] transition-all duration-500"
            >
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center text-[var(--color-ink)]">
                    {card.icon}
                  </div>
                  <h3 className="font-normal text-xl text-[var(--color-ink)]">
                    {card.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-base text-[var(--color-ink)]/85 max-w-[45ch]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFullBleed>
  );
};
