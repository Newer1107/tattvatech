"use client";

import { expertise } from "@/lib/data";
import AnimatedSection, {
  StaggerChildren,
  StaggerItem,
  FadeIn,
} from "@/components/ui/AnimatedSection";
import AnimatedHeading, { RevealText } from "@/components/ui/AnimatedHeading";
import Card from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const iconMap: Record<string, string> = {
  brain: "hexagon",
  chart: "bars",
  factory: "square",
  robot: "diamond",
  wifi: "target",
  drone: "cross",
  chip: "hexagon",
  cloud: "circle",
  shield: "hexagon",
  code: "brackets",
  digital: "cycle",
  lightbulb: "bulb",
};

export default function ExpertiseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <FadeIn>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-text-secondary mb-6">
              Our Capabilities
            </span>
          </FadeIn>
          <AnimatedHeading
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight mb-6"
            gradient
            split
          >
            Our Expertise
          </AnimatedHeading>
          <RevealText
            className="max-w-xl mx-auto text-lg text-text-secondary leading-relaxed"
            delay={0.3}
          >
            Across 12 technology domains — from AI to cybersecurity — we deliver
            applied expertise for real-world impact.
          </RevealText>
        </div>
      </section>

      {/* Expertise Grid */}
      <AnimatedSection className="section-container pb-32 md:pb-40">
        <StaggerChildren
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {expertise.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="h-full group">
                {/* Icon */}
                <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <Icon name={iconMap[item.icon]} className="w-12 h-12 text-orange" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-semibold mb-4 leading-tight">
                  {item.title}
                </h3>

                {/* Focus tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.focus.map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/[0.06] bg-black/[0.02] text-text-tertiary"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Purpose */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.purpose}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </AnimatedSection>
    </>
  );
}
