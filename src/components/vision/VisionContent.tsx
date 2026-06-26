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
import { vision2035 } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/*  Floating orb                                                      */
/* ------------------------------------------------------------------ */
function Orb({
  size,
  position,
  delay = 0,
  duration = 8,
  color = "rgba(255,122,24,0.08)",
}: {
  size: string;
  position: string;
  delay?: number;
  duration?: number;
  color?: string;
}) {
  return (
    <motion.div
      className="light-blob"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        ...parsePosition(position),
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 20, -20, 10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function parsePosition(pos: string): React.CSSProperties {
  const parts = pos.split(" ");
  const style: React.CSSProperties = {};
  if (parts.length === 4) {
    style.top = parts[0];
    style.left = parts[1];
  } else if (parts.length === 2) {
    style.top = parts[0];
    style.left = parts[1];
  }
  return style;
}

/* ------------------------------------------------------------------ */
/*  Hero — Full viewport with giant 2035                              */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
      <div className="noise" />
      <div className="absolute inset-0 mesh-animated opacity-60" />

      {/* Floating orbs */}
      <Orb size="40vw" position="10% -10%" delay={0} duration={10} />
      <Orb
        size="30vw"
        position="70% 20%"
        delay={2}
        duration={12}
        color="rgba(255,148,77,0.06)"
      />
      <Orb
        size="35vw"
        position="20% 60%"
        delay={4}
        duration={9}
        color="rgba(255,122,24,0.05)"
      />

      {/* Giant 2035 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span
          className="font-heading font-bold text-transparent"
          style={{
            fontSize: "clamp(10rem, 30vw, 30rem)",
            lineHeight: 1,
            WebkitTextStroke: "1px rgba(255,122,24,0.08)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          2035
        </motion.span>
      </div>

      {/* Content */}
      <div className="section-container text-center relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-orange/50 mb-6 font-mono">
            Tattva Tech · Vision 2035
          </span>
        </motion.div>

        <motion.h1
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gradient glow-text">Future Vision 2035</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {vision2035.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {vision2035.seeksTo.map((s) => (
            <span
              key={s}
              className="text-xs text-text-tertiary px-4 py-2 border border-border-subtle rounded-full glass"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-orange/40 to-transparent mx-auto"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Vision Pyramid — 5 ascending levels                                */
/* ------------------------------------------------------------------ */
function VisionPyramid() {
  return (
    <section className="relative py-28 md:py-36 bg-bg-elevated overflow-hidden">
      <div className="section-container max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="heading-lg text-center mb-4">
            <span className="text-gradient">Vision Pyramid</span>
          </h2>
          <p className="text-text-secondary text-center text-sm max-w-xl mx-auto mb-16">
            Five ascending levels that define our journey from accessible
            education to global leadership.
          </p>
        </FadeIn>

        <div className="flex flex-col items-center gap-0">
          {vision2035.pyramid.map((level, i) => {
            const isTop = i === vision2035.pyramid.length - 1;
            const width = 40 + i * 15; /* pyramid width increases downward */

            return (
              <motion.div
                key={level.level}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className={`relative rounded-xl p-5 md:p-6 ${
                    isTop
                      ? "glass-strong glow-orange border-orange/30"
                      : "glass border-border-subtle"
                  }`}
                  style={{ width: `${width}%` }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(255,122,24,0.3)",
                  }}
                >
                  {isTop && (
                    <motion.div
                      className="absolute -inset-px rounded-xl opacity-50 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 40%, rgba(255,122,24,0.2) 50%, transparent 60%)",
                        backgroundSize: "200% 200%",
                      }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    {/* Level number */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold font-heading flex-shrink-0 ${
                        isTop
                          ? "bg-orange text-black"
                          : "bg-black/[0.04] text-text-secondary"
                      }`}
                    >
                      {level.level}
                    </div>

                    <div>
                      <h3
                        className={`text-base md:text-lg font-heading font-semibold ${
                          isTop
                            ? "text-orange"
                            : "text-text-primary"
                        }`}
                      >
                        {level.title}
                      </h3>
                      <p className="text-sm text-text-tertiary mt-0.5">
                        {level.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Connector */}
                {i < vision2035.pyramid.length - 1 && (
                  <motion.div
                    className="flex flex-col items-center py-2"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="w-px h-6 bg-gradient-to-b from-orange/30 to-transparent" />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-orange/40"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Six Pillars                                                        */
/* ------------------------------------------------------------------ */
const pillarIcons: Record<string, string> = {
  "Global Presence": "globe",
  "Lifelong Impact": "eye",
  "Innovation Driven": "zap",
  "Technology Leadership": "cpu",
  "Partnership Power": "link",
  "Sustainable Future": "cycle",
};

function SixPillars() {
  return (
    <section className="relative py-28 md:py-36 bg-bg-base">
      <div className="section-container">
        <FadeIn>
          <h2 className="heading-lg text-center mb-4">
            <span className="text-gradient">Six Pillars</span>
          </h2>
          <p className="text-text-secondary text-center text-sm max-w-xl mx-auto mb-16">
            The foundational pillars that guide our vision toward 2035.
          </p>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          staggerDelay={0.08}
        >
          {vision2035.pillars.map((pillar) => (
            <StaggerItem key={pillar}>
              <motion.div
                className="glass rounded-xl p-6 md:p-7 h-full group relative overflow-hidden"
                whileHover={{
                  y: -4,
                  borderColor: "rgba(255,122,24,0.25)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange/15 to-orange-light/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={pillarIcons[pillar] || "hexagon"}
                    className="w-5 h-5 text-orange"
                  />
                </div>
                <h3 className="text-sm md:text-base font-heading font-semibold text-text-primary group-hover:text-orange transition-colors duration-300">
                  {pillar}
                </h3>

                {/* Hover glow */}
                <motion.div
                  className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,122,24,0.08) 0%, transparent 70%)",
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Aspirational Metrics                                               */
/* ------------------------------------------------------------------ */
function AspirationalMetrics() {
  return (
    <section className="relative py-28 md:py-36 bg-bg-elevated overflow-hidden">
      <div className="section-container">
        <FadeIn>
          <h2 className="heading-lg text-center mb-4">
            <span className="text-gradient">Aspirational Metrics</span>
          </h2>
          <p className="text-text-secondary text-center text-sm max-w-xl mx-auto mb-16">
            Our ambitious goals for the impact we aim to create by 2035.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {vision2035.aspirationalMetrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  index,
}: {
  label: string;
  value: string;
  suffix: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative glass rounded-xl p-5 md:p-6 text-center group overflow-hidden">
        {/* Glow behind */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,122,24,0.06) 0%, transparent 70%)",
            opacity: 0,
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-orange/30 to-transparent" />
          <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-orange/30 to-transparent" />
        </div>

        <div className="relative z-10">
          {isNumeric ? (
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-orange mb-2 glow-text">
              <Counter
                value={numericValue}
                suffix={suffix}
                duration={2.5}
                label=""
                className=""
              />
            </div>
          ) : (
            <motion.div
              className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-orange mb-2 glow-text"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {value}
              {suffix}
            </motion.div>
          )}
          <p className="text-xs md:text-sm text-text-secondary">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing — dramatic aspiration                                      */
/* ------------------------------------------------------------------ */
function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-44 bg-bg-base overflow-hidden"
    >
      {/* Massive glow */}
      <motion.div
        className="light-blob w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,24,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="section-container text-center max-w-4xl mx-auto relative z-10">
        {/* Opening decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent mx-auto mb-10"
        />

        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg
            className="w-12 h-12 text-orange/20 mx-auto mb-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.756 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.756 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </motion.div>

        {/* Main aspiration */}
        <motion.h2
          className="heading-lg mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="text-gradient glow-text">
            {vision2035.aspiration}
          </span>
        </motion.h2>

        {/* Closing line */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary font-heading font-medium mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {vision2035.closing}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent mx-auto my-8"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        />

        {/* Final banner */}
        <motion.p
          className="text-xs text-text-muted uppercase tracking-[0.25em] font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {vision2035.finalBanner}
        </motion.p>

        {/* Bottom decoration */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent mx-auto mt-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */
export default function VisionContent() {
  return (
    <div className="relative bg-bg-base">
      <HeroSection />
      <VisionPyramid />
      <SixPillars />
      <AspirationalMetrics />
      <ClosingSection />
    </div>
  );
}
