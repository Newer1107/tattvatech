"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { roadmap } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const PHASES = roadmap.phases.slice(0, 3);

/* ------------------------------------------------------------------ */
/*  Phase card with timeline                                           */
/* ------------------------------------------------------------------ */
function PhaseCard({
  phase,
  index,
  isLast,
  lineProgress,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  isLast: boolean;
  lineProgress: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const progressStart = index / 3;
  const progressEnd = (index + 1) / 3;
  const cardProgress = Math.max(
    0,
    Math.min(1, (lineProgress - progressStart) / (progressEnd - progressStart))
  );

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-8">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          className="w-4 h-4 rounded-full border-2 relative z-10"
          animate={{
            borderColor:
              cardProgress >= 1
                ? "rgb(255, 122, 24)"
                : "rgba(0, 0, 0, 0.06)",
            backgroundColor:
              cardProgress >= 1
                ? "rgba(255, 122, 24, 0.2)"
                : "rgba(0, 0, 0, 0.03)",
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0.5 rounded-full bg-orange"
            animate={{
              scale: cardProgress >= 1 ? 1 : 0,
              opacity: cardProgress >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </motion.div>

        {!isLast && (
          <motion.div
            className="w-[2px] flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(255,122,24,0.4) 0%, 
                rgba(255,122,24,0.4) ${
                  Math.min(1, Math.max(0, (cardProgress - 0.5) * 2)) * 100
                }%, 
                rgba(0,0,0,0.06) ${
                  Math.min(1, Math.max(0, (cardProgress - 0.5) * 2)) * 100
                }%, 
                rgba(0,0,0,0.06) 100%)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex-1 group"
      >
        <motion.div
          className="glass rounded-2xl p-4 md:p-6 border border-black/[0.06] overflow-hidden relative"
          animate={
            hovered
              ? {
                  borderColor: "rgba(255, 122, 24, 0.25)",
                  y: -3,
                }
              : { borderColor: "rgba(0,0,0,0.06)", y: 0 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute -inset-20 pointer-events-none"
            animate={
              hovered
                ? {
                    opacity: 1,
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(255,122,24,0.05) 0%, transparent 70%)",
                  }
                : { opacity: 0 }
            }
            transition={{ duration: 0.4 }}
          />

          <div className="relative z-10">
            {/* Step number */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-orange font-bold tracking-wider">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-orange/30 to-transparent" />
            </div>

            {/* Period badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-[10px] font-bold tracking-widest text-orange mb-4">
              {phase.period}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold font-heading text-text-primary mb-4 group-hover:text-orange transition-colors duration-300">
              {phase.title}
            </h3>

            {/* Objectives */}
            <ul className="space-y-2">
              {phase.objectives.slice(0, 3).map((obj, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="w-1 h-1 rounded-full bg-orange/50 mt-1.5 shrink-0" />
                  {obj}
                </li>
              ))}
              {phase.objectives.length > 3 && (
                <li className="text-xs text-text-tertiary pt-1">
                  +{phase.objectives.length - 3} more
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function RoadmapPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowX = useTransform(scrollYProgress, [0, 1], ["30%", "70%"]);

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing mesh-bg-alt overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange/5 blur-[120px] pointer-events-none"
        style={{ left: glowX }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedHeading
            as="h2"
            split
            gradient
            className="heading-lg mb-4"
          >
            Our Roadmap
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {roadmap.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          {PHASES.map((phase, i) => (
            <PhaseCard
              key={phase.period}
              phase={phase}
              index={i}
              isLast={i === PHASES.length - 1}
              lineProgress={scrollYProgress.get()}
            />
          ))}
        </div>

        {/* Enablers */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-text-tertiary tracking-widest uppercase mb-4">
            Enabled By
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {roadmap.enablers.map((enabler, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block px-4 py-2 rounded-xl glass text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
              >
                {enabler}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button href="/roadmap" variant="primary" size="lg">
            View Full Roadmap
            <Icon name="cross" className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
