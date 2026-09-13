"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
    <section className={cn("bg-pearl text-ink py-20 md:py-[120px] px-6 w-full", className)}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-pearl-line pb-12">
          <div className="space-y-6">
            <h2 className="font-urbanist font-light text-3xl md:text-5xl tracking-tight max-w-2xl">
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-md text-ink-light font-normal text-body leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((card, i) => (
            <div
              key={i}
              className="group relative bg-pearl border border-pearl-line rounded-lg p-8 md:p-10 overflow-hidden hover:border-gold transition-all duration-500"
            >
              {/* Subtle hover background using the brand token logic */}
              <div
                className={cn(
                  "absolute inset-0 bg-[var(--color-sapphire)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                )}
              />
              <div className="relative z-10 space-y-10">
                <div className="size-12 rounded-md bg-white border border-pearl-line flex items-center justify-center group-hover:bg-pearl-line transition-colors duration-500">
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-ink">
                    {card.title}
                  </h3>
                  <p className="text-body text-ink-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
