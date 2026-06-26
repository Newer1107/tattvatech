"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
import { roadmap } from "@/lib/data";
import { AnimatedHeading, AnimatedSection, FadeIn } from "@/components/ui";

const PHASES = roadmap.phases;

/* ------------------------------------------------------------------ */
/*  Phase indicator (active phase label)                              */
/* ------------------------------------------------------------------ */
function PhaseNumber({ current }: { current: number }) {
  return (
    <div className="absolute top-8 left-8 flex items-center gap-3">
      <span className="text-[10px] font-mono text-orange/50 tracking-wider uppercase">
        Phase
      </span>
      <span className="text-5xl md:text-7xl font-heading font-bold text-orange/20">
        {String(current + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single milestone card                                              */
/* ------------------------------------------------------------------ */
function MilestoneCard({
  phase,
  index,
  active,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      className={`relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[65vw] max-w-3xl rounded-2xl p-8 md:p-10 lg:p-12 transition-all duration-700 ${
        active
          ? "glass-strong glow-orange"
          : "glass opacity-40 scale-[0.97]"
      }`}
      animate={
        active
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.35, scale: 0.97 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Period badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-mono mb-6">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-orange"
          animate={active ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {phase.period}
      </div>

      {/* Title */}
      <h3
        className={`heading-md mb-6 ${
          active ? "text-text-primary" : "text-text-secondary"
        }`}
      >
        {phase.title}
      </h3>

      {/* Objectives */}
      <ul className="space-y-3">
        {phase.objectives.map((obj, oi) => (
          <motion.li
            key={obj}
            className="flex items-start gap-3 text-sm md:text-base text-text-secondary"
            initial={{ opacity: 0, x: -10 }}
            animate={
              active ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }
            }
            transition={{ duration: 0.4, delay: oi * 0.08 }}
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange/50 flex-shrink-0" />
            {obj}
          </motion.li>
        ))}
      </ul>

      {/* Decorative corner gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange/5 to-transparent rounded-tr-2xl pointer-events-none" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connecting gradient line                                           */
/* ------------------------------------------------------------------ */
function ConnectingLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
      <svg
        className="w-full h-1"
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1"
        />
        <motion.line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="url(#roadmapGrad)"
          strokeWidth="2"
          style={{ pathLength: progress }}
        />
        <defs>
          <linearGradient id="roadmapGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff7a18" />
            <stop offset="50%" stopColor="#ff944d" />
            <stop offset="100%" stopColor="#ff944d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop: horizontal scroll with sticky pinning                     */
/* ------------------------------------------------------------------ */
function HorizontalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `-${(PHASES.length - 1) * 70}vw`]
  );

  /* Map scroll to 0..1 progress across all phases */
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:block"
      style={{ height: `${PHASES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-bg-base flex items-center">
        <ConnectingLine progress={progress} />

        <motion.div
          className="flex items-center gap-8 lg:gap-12 pl-[10vw]"
          style={{ x }}
        >
          {PHASES.map((phase, i) => {
            /* ponytail: active region uses two static threshold values per card */
            const scrollEntry = i / PHASES.length;
            const scrollExit = (i + 0.55) / PHASES.length;

            return (
              <div key={phase.period} className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[65vw] max-w-3xl relative">
                {/* Wrap in an animated div that fades based on scroll progress */}
                <motion.div
                  style={{
                    opacity: useTransform(
                      progress,
                      [scrollEntry, scrollExit],
                      [0.3, 1]
                    ),
                  }}
                >
                  <MilestoneCard phase={phase} index={i} active={true} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Phase dots indicator */}
        <div className="absolute bottom-10 right-10 flex items-center gap-2">
          {PHASES.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: useTransform(
                  progress,
                  [
                    (i - 0.3) / PHASES.length,
                    i / PHASES.length,
                    (i + 0.7) / PHASES.length,
                  ],
                  [
                    "rgba(0,0,0,0.1)",
                    "#ff7a18",
                    "rgba(0,0,0,0.1)",
                  ]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: vertical timeline                                          */
/* ------------------------------------------------------------------ */
function VerticalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="lg:hidden section-container max-w-lg mx-auto py-16">
      <h2 className="heading-md text-center mb-10">
        <span className="text-gradient">Journey Phases</span>
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border-subtle" />
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange via-orange-light to-orange/30"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-10">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.period}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pl-10"
            >
              {/* Dot */}
              <motion.div
                className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-orange border-2 border-bg-base z-10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="glass rounded-2xl p-5 md:p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-xs font-mono text-orange mb-3">
                  <span className="w-1 h-1 rounded-full bg-orange" />
                  {phase.period}
                </div>
                <h3 className="text-base font-heading font-bold text-text-primary mb-3">
                  {phase.title}
                </h3>
                <ul className="space-y-1.5">
                  {phase.objectives.map((obj) => (
                    <li
                      key={obj}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-orange/50 mt-1.5 flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function RoadmapContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mesh-bg pt-24 pb-16">
        <div className="noise" />
        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-orange/50 mb-4 font-mono">
              Strategic Roadmap · 2026 – 2035
            </span>
          </motion.div>

          <AnimatedHeading
            as="h1"
            className="heading-xl mb-6"
            gradient
            split
          >
            Our Roadmap
          </AnimatedHeading>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {roadmap.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Priorities tag cloud ── */}
      <section className="py-16 md:py-20 bg-bg-elevated border-t border-border-subtle">
        <div className="section-container max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="heading-md text-center mb-8">
              <span className="text-gradient">Strategic Priorities</span>
            </h2>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {roadmap.priorities.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="glass rounded-full px-5 py-2.5 text-sm text-text-secondary hover:text-orange hover:border-orange/20 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-mono text-orange/50 mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline — desktop horizontal, mobile vertical ── */}
      <HorizontalTimeline />
      <VerticalTimeline />

      {/* ── Enablers & Closing ── */}
      <section className="py-20 md:py-28 bg-bg-elevated border-t border-border-subtle">
        <div className="section-container max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="heading-md text-center mb-8">
              <span className="text-gradient">Key Enablers</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {roadmap.enablers.map((enabler, i) => (
              <motion.div
                key={enabler}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="glass rounded-xl p-5 text-center h-full group"
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(255,122,24,0.2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <span className="text-[10px] font-mono text-orange/40 block mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-heading font-semibold text-text-secondary group-hover:text-orange transition-colors duration-300">
                    {enabler}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center relative">
              <div className="light-blob w-64 h-64 bg-orange/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-heading font-bold text-gradient mb-3">
                  {roadmap.closing}
                </p>
                <p className="text-sm text-text-tertiary max-w-2xl mx-auto">
                  {roadmap.finalBanner}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
