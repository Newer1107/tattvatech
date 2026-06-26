"use client";

import Link from "next/link";
import {
  businessVerticals,
  verticalBenefits,
  businessVerticalStatement,
} from "@/lib/data";
import AnimatedSection, {
  StaggerChildren,
  StaggerItem,
  FadeIn,
} from "@/components/ui/AnimatedSection";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const iconMap: Record<string, string> = {
  consulting: "square",
  software: "brackets",
  learning: "book",
  innovation: "bulb",
  training: "diamond",
  partnership: "handshake",
};

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <FadeIn>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-text-secondary mb-6">
              What We Do
            </span>
          </FadeIn>
          <AnimatedHeading
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight mb-6"
            gradient
            split
          >
            Our Services
          </AnimatedHeading>
          <FadeIn delay={0.3}>
            <p className="max-w-xl mx-auto text-lg text-text-secondary leading-relaxed">
              {businessVerticalStatement}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Verticals Grid */}
      <AnimatedSection className="section-container pb-24 md:pb-32">
        <StaggerChildren
          className="grid md:grid-cols-2 gap-6"
          staggerDelay={0.08}
        >
          {businessVerticals.map((v) => (
            <StaggerItem key={v.id}>
              <Card className="h-full group flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 shrink-0">
                    <Icon name={iconMap[v.icon] ?? "circle"} className="w-10 h-10 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold leading-tight">
                      {v.title}
                    </h3>
                    <p className="text-sm text-text-tertiary mt-1">
                      {v.description}
                    </p>
                  </div>
                </div>

                {/* Services list */}
                <div className="space-y-2 mb-8 flex-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary block mb-3">
                    Services
                  </span>
                  {v.services.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      {/* Workflow dot */}
                      <span className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        <span className="absolute w-2 h-2 rounded-full bg-orange/60 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-orange relative z-10" />
                      </span>
                      {s}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <Button
                    href="/contact"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Learn More →
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </AnimatedSection>

      {/* Benefits */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="section-container">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-secondary mb-4 block">
                Why Work With Us
              </span>
            </FadeIn>
            <AnimatedHeading
              as="h2"
              className="text-3xl md:text-5xl font-heading font-bold tracking-tight"
              gradient
            >
              Key Benefits
            </AnimatedHeading>
          </div>
          <StaggerChildren
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
            staggerDelay={0.06}
          >
            {verticalBenefits.map((benefit, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-black/[0.06] bg-black/[0.02] h-full">
                  <span className="text-orange text-lg shrink-0">✓</span>
                  <span className="text-sm text-text-secondary font-medium">
                    {benefit}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
