"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { strategicPillars } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";

const pillarIcons = ["graduation", "handshake", "bulb", "zap"];

/* ------------------------------------------------------------------ */
/*  Pillar card                                                        */
/* ------------------------------------------------------------------ */
function PillarCard({
  pillar,
  icon,
  index,
}: {
  pillar: (typeof strategicPillars.pillars)[number];
  icon: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 md:p-6 h-full transition-all duration-300 group-hover:shadow-md group-hover:border-orange/20 group-hover:-translate-y-0.5">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors duration-300">
          <Icon name={icon} className="w-6 h-6 text-orange" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
          {pillar.title}
        </h3>

        {/* Purpose */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {pillar.purpose}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function StrategicPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden mesh-bg"
    >
      <div className="section-container">
        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedHeading
            as="h2"
            split
            gradient
            className="heading-lg mb-4"
          >
            Strategic Pillars
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {strategicPillars.description}
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {strategicPillars.pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              pillar={pillar}
              icon={pillarIcons[i]}
              index={i}
            />
          ))}
        </div>

        {/* Foundations */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-text-tertiary tracking-widest uppercase mb-4">
            Built on Strong Foundations
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {strategicPillars.foundations.map((foundation, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block px-5 py-2.5 rounded-xl bg-white border border-black/[0.06] text-sm text-text-secondary font-medium hover:shadow-sm hover:text-text-primary transition-all"
              >
                {foundation}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-text-tertiary font-heading tracking-wider">
            {strategicPillars.closing}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
