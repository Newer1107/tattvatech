"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AnimatedSection,
  AnimatedHeading,
  StaggerChildren,
  StaggerItem,
  FadeIn,
  Counter,
} from "@/components/ui";
import { impact } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/*  Scan line CSS effect                                               */
/* ------------------------------------------------------------------ */
function ScanLines({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.015)_2px,rgba(0,0,0,0.015)_4px)]" />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric panel — holographic system display                         */
/* ------------------------------------------------------------------ */
function MetricPanel({
  metric,
  index,
}: {
  metric: (typeof impact.metrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const systemLabels = ["SYS::TRAIN", "SYS::PARTNER", "SYS::CLIENT", "SYS::INNOVATE", "SYS::STARTUP", "SYS::GLOBAL"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative glass rounded-xl p-5 md:p-6 h-full group overflow-hidden hover:border-orange/20 transition-colors duration-500">
        <ScanLines />

        {/* System label */}
        <div className="relative z-10 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange/70 animate-pulse" />
            <span className="text-[10px] font-mono text-orange/60 tracking-wider">
              {systemLabels[index]}
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="relative z-10">
          <Counter
            value={metric.value}
            suffix={metric.suffix}
            label=""
            duration={2 + index * 0.3}
            className=""
          />
          <p className="text-text-secondary text-xs font-medium mt-2">
            {metric.label}
          </p>
          <p className="text-text-tertiary text-[11px] mt-1 leading-relaxed">
            {metric.description}
          </p>
        </div>

        {/* Bottom status bar */}
        <div className="relative z-10 mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="text-[10px] text-text-muted font-mono">
            STATUS::ONLINE
          </span>
          <motion.span
            className="text-[10px] text-orange/50 font-mono"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● LIVE
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Outcome card — "Systems Online"                                    */
/* ------------------------------------------------------------------ */
function OutcomeCard({
  outcome,
  index,
}: {
  outcome: (typeof impact.outcomes)[number];
  index: number;
}) {
  const glowColors = [
    "rgba(255,122,24,0.15)",
    "rgba(255,148,77,0.12)",
    "rgba(255,122,24,0.08)",
    "rgba(255,122,24,0.08)",
  ];

  return (
    <StaggerItem>
      <motion.div className="relative glass rounded-xl p-6 h-full group overflow-hidden">
        {/* Glowing indicator */}
        <div className="flex items-center gap-2 mb-4">
          <motion.span
            className="w-2 h-2 rounded-full block"
            style={{ backgroundColor: "rgb(255,122,24)" }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-orange/40 tracking-wider">
            MODULE::{outcome.title.toUpperCase().replace(/\s+/g, "_")}
          </span>
        </div>

        <h3 className="text-base font-heading font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
          {outcome.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {outcome.description}
        </p>

        {/* Hover glow */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColors[index]} 0%, transparent 70%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                      */
/* ------------------------------------------------------------------ */
function ProgressBar({
  area,
  index,
}: {
  area: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  /* ponytail: static percentages for visual consistency */
  const widths = [88, 82, 76, 70, 65];

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary font-medium">{area}</span>
        <span className="text-xs font-mono text-orange">
          {widths[index]}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange to-orange-light"
          initial={{ width: 0 }}
          animate={inView ? { width: `${widths[index]}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated grid background                                          */
/* ------------------------------------------------------------------ */
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,122,24,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,24,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function ImpactContent() {
  return (
    <div className="relative min-h-screen bg-bg-base overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mesh-bg-alt">
        <GridBackground />
        <div className="noise" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-orange/60 mb-4 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              DASHBOARD::MAIN
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            </span>
          </motion.div>

          <AnimatedHeading
            as="h1"
            className="heading-xl mb-6"
            gradient
            split
          >
            {impact.heading}
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            {impact.description}
          </motion.p>
        </div>
      </section>

      {/* ── Metrics Dashboard ── */}
      <section className="relative py-24 md:py-32 bg-bg-base">
        <div className="section-container">
          <FadeIn>
            <h2 className="heading-lg text-center mb-4">
              <span className="text-gradient">Systems Overview</span>
            </h2>
            <p className="text-text-secondary text-center max-w-xl mx-auto text-sm mb-16">
              Real-time impact metrics across all operational domains.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {impact.metrics.map((metric, i) => (
              <MetricPanel key={metric.label} metric={metric} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems Online (Outcomes) ── */}
      <section className="relative py-24 md:py-32 bg-bg-elevated">
        <div className="section-container max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 justify-center mb-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-orange"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono text-orange/50 tracking-widest uppercase">
                Systems Online
              </span>
              <motion.span
                className="w-2 h-2 rounded-full bg-orange"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              />
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="heading-lg text-center mb-4">
              <span className="text-gradient">Key Outcomes</span>
            </h2>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-12"
            staggerDelay={0.1}
          >
            {impact.outcomes.map((outcome, i) => (
              <OutcomeCard key={outcome.title} outcome={outcome} index={i} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Contribution Areas ── */}
      <section className="relative py-24 md:py-32 bg-bg-base">
        <div className="section-container max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="heading-lg text-center mb-4">
              <span className="text-gradient">Areas of Contribution</span>
            </h2>
            <p className="text-text-secondary text-center max-w-xl mx-auto text-sm mb-16">
              Resource allocation and progress across key impact areas.
            </p>
          </FadeIn>

          <div className="max-w-2xl mx-auto space-y-5 mb-16">
            {impact.areas.map((area, i) => (
              <ProgressBar key={area} area={area} index={i} />
            ))}
          </div>

          {/* Principles as tag pills */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {impact.principles.map((principle) => (
                <span
                  key={principle}
                  className="inline-flex px-4 py-2 text-xs font-medium text-orange bg-orange/5 rounded-full border border-orange/10"
                >
                  {principle}
                </span>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            staggerDelay={0.08}
          >
            {impact.contributions.map((c) => (
              <StaggerItem key={c.area}>
                <div className="glass rounded-xl p-5 h-full group hover:border-orange/20 transition-all duration-300">
                  <span className="text-xs font-mono text-orange/50 mb-2 block">
                    AREA::{c.area.toUpperCase()}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="relative py-28 md:py-36 bg-bg-elevated overflow-hidden">
        <div className="light-blob w-96 h-96 bg-orange/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container text-center max-w-4xl mx-auto relative z-10">
          <FadeIn>
            {/* System-style termination */}
            <div className="flex items-center gap-2 justify-center mb-6">
              <span className="text-[10px] font-mono text-orange/40 tracking-wider">
                // END_OF_STREAM
              </span>
            </div>

            <h2 className="heading-lg mb-6">
              <span className="text-gradient glow-text">{impact.closing}</span>
            </h2>
            <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {impact.commitment}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {impact.objectives.map((obj) => (
                <span
                  key={obj}
                  className="text-xs text-text-tertiary font-mono border border-border-subtle rounded-full px-3 py-1.5"
                >
                  {obj}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
