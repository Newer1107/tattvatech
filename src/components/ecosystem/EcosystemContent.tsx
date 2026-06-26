"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AnimatedSection,
  AnimatedHeading,
  StaggerChildren,
  StaggerItem,
  FadeIn,
} from "@/components/ui";
import { businessEcosystem, siteConfig } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

const componentIcons = ["square", "desktop", "book", "flask"];

/* ------------------------------------------------------------------ */
/*  Hero — floating connected nodes                                   */
/* ------------------------------------------------------------------ */
function NetworkHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = businessEcosystem.components;
  const positions = [
    { top: "8%", left: "14%" },
    { top: "8%", right: "14%", left: "auto" },
    { bottom: "8%", left: "14%" },
    { bottom: "8%", right: "14%", left: "auto" },
  ];

  /* Center → node lines: viewBox 0 0 1000 562 */
  const lines = [
    "M500,281 L210,95",
    "M500,281 L790,95",
    "M500,281 L210,467",
    "M500,281 L790,467",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
      <div className="noise" />
      <div className="absolute inset-0 mesh-animated opacity-40" />

      <div
        ref={ref}
        className="section-container relative z-10 w-full py-28 md:py-32"
      >
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="heading-xl mb-4">
            <span className="text-gradient">Our Ecosystem</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {businessEcosystem.description}
          </p>
        </motion.div>

        {/* ── Desktop network ── */}
        <div className="hidden lg:block relative mx-auto" style={{ maxWidth: "1000px", aspectRatio: "1000/562" }}>
          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 562"
            style={{ overflow: "visible" }}
          >
            {lines.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="rgba(255,122,24,0.15)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4 + i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Dots on lines */}
            {lines.map((d, i) => {
              const parts = d.replace("M", "").split(" L");
              const [x1, y1] = parts[0].split(",").map(Number);
              const [x2, y2] = parts[1].split(",").map(Number);
              const cx = (x1 + x2) / 2;
              const cy = (y1 + y2) / 2;
              return (
                <motion.circle
                  key={`dot-${i}`}
                  cx={cx}
                  cy={cy}
                  r={3}
                  fill="#ff7a18"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
                />
              );
            })}
          </svg>

          {/* Center node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="glass-strong rounded-2xl p-6 md:p-8 text-center glow-orange w-56 md:w-64"
              animate={{ boxShadow: ["0 0 30px rgba(255,122,24,0.25)", "0 0 60px rgba(255,122,24,0.4)", "0 0 30px rgba(255,122,24,0.25)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange/20 to-orange-light/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
              <h3 className="heading-md text-orange">Tattva Tech</h3>
              <p className="text-text-tertiary text-sm mt-2 leading-relaxed">
                {siteConfig.taglineAlt}
              </p>
            </motion.div>
          </motion.div>

          {/* Orbiting cards */}
          {cards.map((comp, i) => (
            <motion.div
              key={comp.id}
              className="absolute z-20"
              style={positions[i] as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="glass p-5 rounded-xl w-44 text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,122,24,0.3)" }}
              >
                <Icon
                  name={componentIcons[i]}
                  className="w-5 h-5 text-orange mx-auto mb-2"
                />
                <h4 className="text-text-primary text-sm font-heading font-semibold">
                  {comp.title}
                </h4>
                <p className="text-text-tertiary text-xs mt-1 leading-relaxed">
                  {comp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile layout ── */}
        <div className="lg:hidden">
          {/* Center card */}
          <motion.div
            className="glass-strong rounded-2xl p-6 text-center glow-orange max-w-xs mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange/20 to-orange-light/10 flex items-center justify-center mx-auto mb-3">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-orange"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="8" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-bold text-orange">
              Tattva Tech
            </h3>
            <p className="text-text-tertiary text-xs mt-1">
              {siteConfig.taglineAlt}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-3">
            {cards.map((comp, i) => (
              <motion.div
                key={comp.id}
                className="glass p-4 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                }}
              >
                <Icon
                  name={componentIcons[i]}
                  className="w-5 h-5 text-orange mx-auto mb-2"
                />
                <h4 className="text-text-primary text-xs font-heading font-semibold">
                  {comp.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tagline below network */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-text-tertiary text-xs uppercase tracking-[0.2em] font-medium">
            {businessEcosystem.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail cards — 2×2 grid                                           */
/* ------------------------------------------------------------------ */
function DetailCards() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-bg-base">
      <div className="section-container max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="heading-lg text-center mb-4">
            <span className="text-gradient">Ecosystem Components</span>
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
            Four interconnected capabilities that form the foundation of our
            integrated business ecosystem.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {businessEcosystem.components.map((comp, i) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="glass rounded-2xl p-6 md:p-8 h-full group"
                whileHover={{
                  y: -6,
                  borderColor: "rgba(255,122,24,0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange/15 to-orange-light/10 flex items-center justify-center">
                    <Icon
                      name={componentIcons[i]}
                      className="w-6 h-6 text-orange"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-text-primary group-hover:text-orange transition-colors duration-300">
                    {comp.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                  {comp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy quote                                                  */
/* ------------------------------------------------------------------ */
function PhilosophySection() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-elevated overflow-hidden">
      <div className="section-container max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="heading-lg text-center mb-4">
            <span className="text-gradient">A Unified Ecosystem</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="glass-strong rounded-2xl p-8 md:p-12 lg:p-16 text-center relative border-glow mt-8">
            <div className="light-blob w-64 h-64 bg-orange/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <svg
                className="w-8 h-8 text-orange/20 mx-auto mb-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.756 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.756 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
              <p className="text-lg md:text-xl lg:text-2xl text-text-primary leading-relaxed italic">
                &ldquo;{businessEcosystem.philosophy}&rdquo;
              </p>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent mx-auto my-6" />
              <p className="text-text-tertiary text-sm max-w-2xl mx-auto">
                {businessEcosystem.purpose}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {businessEcosystem.integrates.map((item) => (
              <span
                key={item}
                className="inline-flex px-4 py-2 text-sm font-medium text-orange bg-orange/5 rounded-full border border-orange/10"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                          */
/* ------------------------------------------------------------------ */
function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-base">
      <div className="section-container max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="heading-lg text-center mb-16">
            <span className="text-gradient">Ecosystem Benefits</span>
          </h2>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {businessEcosystem.benefits.map((benefit, i) => (
            <StaggerItem key={benefit}>
              <motion.div
                className="glass rounded-2xl p-6 md:p-8 text-center h-full group"
                whileHover={{
                  y: -4,
                  borderColor: "rgba(255,122,24,0.25)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange/15 to-orange-light/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-6 h-6 text-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        i === 0
                          ? "M13 10V3L4 14h7v7l9-11h-7z"
                          : i === 1
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      }
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
                  {benefit}
                </h3>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing                                                           */
/* ------------------------------------------------------------------ */
function ClosingSection() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-elevated overflow-hidden">
      <div className="section-container text-center max-w-3xl mx-auto">
        <FadeIn>
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="light-blob w-48 h-48 bg-orange/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed italic">
                &ldquo;{businessEcosystem.philosophy}&rdquo;
              </p>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent mx-auto my-6" />
              <p className="text-xs text-text-tertiary tracking-widest uppercase">
                {businessEcosystem.tagline}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */
export default function EcosystemContent() {
  return (
    <div className="relative">
      <NetworkHero />
      <DetailCards />
      <PhilosophySection />
      <BenefitsSection />
      <ClosingSection />
    </div>
  );
}
