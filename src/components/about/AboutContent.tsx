"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  companyOverview,
  vision,
  mission,
  coreValues,
  founders,
} from "@/lib/data";
import AnimatedHeading, { RevealText } from "@/components/ui/AnimatedHeading";
import Card from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const values = coreValues.values;

const iconMap: Record<string, string> = {
  Innovation: "bulb",
  Integrity: "handshake",
  Excellence: "star",
  Collaboration: "link",
  Impact: "globe",
};

const valueColors = [
  { bg: "rgba(255,122,24,0.08)", border: "rgba(255,122,24,0.2)", accent: "#ff7a18" },
  { bg: "rgba(255,122,24,0.08)", border: "rgba(255,122,24,0.2)", accent: "#ff944d" },
  { bg: "rgba(255,148,77,0.08)", border: "rgba(255,148,77,0.2)", accent: "#ff944d" },
  { bg: "rgba(255,122,24,0.06)", border: "rgba(255,122,24,0.15)", accent: "#ff7a18" },
  { bg: "rgba(204,85,0,0.08)", border: "rgba(204,85,0,0.2)", accent: "#cc5500" },
];

/* ------------------------------------------------------------------ */
/*  Animated value card with unique color                              */
/* ------------------------------------------------------------------ */
function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const colors = valueColors[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl p-6 md:p-8 h-full border overflow-hidden group cursor-default"
        animate={{
          backgroundColor: hovered ? colors.bg : "rgba(0,0,0,0.04)",
          borderColor: hovered ? colors.border : "rgba(0,0,0,0.06)",
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}15 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
            {/* Icon with colored background */}
          <div
            className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{
              backgroundColor: hovered ? colors.bg : "rgba(0,0,0,0.04)",
              border: `1px solid ${hovered ? colors.border : "rgba(0,0,0,0.06)"}`,
              color: colors.accent,
            }}
          >
            <Icon
              name={iconMap[value.title] ?? "circle"}
              className="w-6 h-6"
            />
          </div>

          {/* Title */}
          <h3
            className="text-lg font-heading font-semibold mb-3 transition-colors duration-300 text-text-primary"
            style={hovered ? { color: colors.accent } : {}}
          >
            {value.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {value.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline section                                                   */
/* ------------------------------------------------------------------ */
function PurposeTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const milestones = [
    {
      year: "Foundation",
      title: "Identifying the Gap",
      desc: "The widening disconnect between education and industry.",
    },
    {
      year: "Purpose",
      title: "Bridging Three Gaps",
      desc: "Learning → Application, Innovation → Execution, Talent → Opportunity.",
    },
    {
      year: "Mission",
      title: "Creating Impact",
      desc: "Empowering individuals and organizations through knowledge, innovation, and technology.",
    },
    {
      year: "Vision 2035",
      title: "Global Recognition",
      desc: "A globally trusted technology and innovation partner.",
    },
  ];

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto">
      {/* Vertical line */}
      <motion.div
        className="absolute left-6 top-0 bottom-0 w-[2px] origin-top"
        style={{
          scaleY: lineScale,
          background:
            "linear-gradient(to bottom, rgba(255,122,24,0.4), rgba(255,148,77,0.1))",
        }}
      />

      <div className="space-y-12">
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-6"
          >
            {/* Dot */}
            <div className="shrink-0 relative">
              <motion.div
                className="w-3 h-3 rounded-full border-2 border-orange bg-bg-card mt-1.5 relative z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.15 }}
              />
            </div>

            {/* Content */}
            <div className="glass rounded-xl p-5 flex-1 group hover:bg-bg-card transition-colors">
              <span className="text-[10px] font-bold tracking-widest text-orange uppercase">
                {m.year}
              </span>
              <h4 className="text-base font-semibold font-heading text-text-primary mt-1 mb-1 group-hover:text-orange transition-colors">
                {m.title}
              </h4>
              <p className="text-sm text-text-secondary">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function AboutContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary mb-6">
              About Us
            </span>
          </motion.div>
          <AnimatedHeading
            as="h1"
            className="heading-xl mb-6"
            gradient
            split
          >
            About Tattva Tech
          </AnimatedHeading>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {companyOverview.description}
          </motion.p>
        </div>
      </section>

      {/* ── Company Overview ── */}
      <section className="py-24 md:py-32 mesh-bg-alt">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-orange mb-4 block">
                Who We Are
              </span>
              <h2 className="heading-md mb-8">
                Technology That{" "}
                <span className="text-gradient">Transforms</span>
              </h2>
              <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-8">
                {companyOverview.approach.description}
              </p>
              <div className="space-y-4">
                {companyOverview.approach.elements.map((el, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                    {el}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-orange/[0.05] to-transparent rounded-3xl blur-3xl pointer-events-none" />
              <div className="relative glass rounded-2xl p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Icon name="target" className="w-8 h-8 text-orange" />
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Our Focus
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {companyOverview.focus.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-black/[0.03] text-text-secondary"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-sm text-text-tertiary">
                    <span className="text-orange font-medium">Positioning:</span>{" "}
                    {companyOverview.positioning}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="relative py-24 md:py-32 mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary mb-4 block">
              Our Direction
            </span>
            <AnimatedHeading
              as="h2"
              className="heading-md"
              gradient
            >
              Mission &amp; Vision
            </AnimatedHeading>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="hexagon" className="w-8 h-8 text-orange" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    Our Mission
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {mission.statement}
                </p>
                <div className="space-y-3">
                  {mission.strategicPriorities.map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0 mt-2" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {p.title}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="diamond" className="w-8 h-8 text-orange" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    Our Vision
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {vision.statement}
                </p>
                <div className="space-y-3">
                  {vision.expanded.principles.map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-light shrink-0 mt-2" />
                      <p className="text-sm text-text-secondary">{p}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 md:py-32 mesh-bg-alt">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary mb-4 block">
              What We Stand For
            </span>
            <AnimatedHeading
              as="h2"
              className="heading-md"
              gradient
            >
              Core Values
            </AnimatedHeading>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {values.map((val, i) => (
              <ValueCard key={i} value={val} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-text-tertiary text-sm italic max-w-2xl mx-auto">
              &ldquo;{coreValues.closing}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Founder's Message ── */}
      <section className="relative py-24 md:py-32 mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange/[0.02] to-transparent pointer-events-none" />
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary mb-4 block">
              Why We Exist
            </span>
            <AnimatedHeading
              as="h2"
              className="heading-md"
              gradient
            >
              {founders.title}
            </AnimatedHeading>
          </motion.div>

          {/* Purpose gaps */}
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
                {founders.purpose.title}
              </h3>
              <p className="text-text-secondary">{founders.purpose.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {founders.purpose.gaps.map((gap, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="glass rounded-xl p-5 group hover:bg-bg-card transition-colors">
                    <div className="text-xs font-medium tracking-wider uppercase text-text-tertiary mb-2">
                      {gap.from}
                    </div>
                    <div className="text-2xl font-heading font-bold text-gradient">
                      →
                    </div>
                    <div className="text-xs font-medium tracking-wider uppercase text-orange mt-2">
                      {gap.to}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guiding principles */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-heading font-bold text-text-primary">
                Guiding Principles
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {founders.guidingPrinciples.map((gp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card>
                    <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      {gp.title}
                    </h4>
                    <ul className="space-y-2">
                      {gp.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision outcomes */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-text-secondary leading-relaxed mb-8 text-center">
              {founders.vision.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {founders.vision.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass"
                >
                  <Icon name="check" className="w-4 h-4 text-orange shrink-0" />
                  <span className="text-sm text-text-secondary">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 md:py-32 mesh-bg-alt">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary mb-4 block">
              Our Journey
            </span>
            <AnimatedHeading
              as="h2"
              className="heading-md"
              gradient
            >
              Purpose Timeline
            </AnimatedHeading>
          </motion.div>

          <PurposeTimeline />
        </div>
      </section>
    </>
  );
}
