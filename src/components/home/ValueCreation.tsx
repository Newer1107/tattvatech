"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import { valueCreationModel } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";

const stageIcons = ["graduation", "flask", "zap", "globe"];

/* ------------------------------------------------------------------ */
/*  Process card in a grid layout                                      */
/* ------------------------------------------------------------------ */
function ProcessCard({
  stage,
  index,
  inView,
}: {
  stage: (typeof valueCreationModel.process)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex-1 min-w-0"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="glass rounded-2xl p-4 md:p-6 h-full flex flex-col group hover:bg-bg-card transition-colors duration-300"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon + Stage number header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center shrink-0">
            <Icon
              name={stageIcons[index]}
              className="w-5 h-5 text-orange"
            />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-orange uppercase">
            {String(index + 1).padStart(2, "0")} — {stage.title}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold font-heading text-text-primary mb-4 group-hover:text-orange transition-colors duration-300">
          {stage.title}
        </h3>

        {/* Activities */}
        <ul className="space-y-2.5 mt-auto">
          {stage.activities.slice(0, 3).map((activity, j) => (
            <li
              key={j}
              className="text-sm text-text-secondary flex items-start gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange/60 mt-1.5 shrink-0" />
              {activity}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function ValueCreation() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden mesh-bg-alt"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
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
            Value Creation Model
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {valueCreationModel.description}
          </p>
        </motion.div>

        {/* Process cards in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {valueCreationModel.process.map((stage, i) => (
            <ProcessCard key={stage.stage} stage={stage} index={i} inView={inView} />
          ))}
        </div>

        {/* Process tagline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl font-bold font-heading tracking-wider text-orange mb-4">
            {valueCreationModel.overallProcess}
          </p>
          <p className="text-text-tertiary text-sm max-w-2xl mx-auto leading-relaxed">
            {valueCreationModel.promise}
          </p>
        </motion.div>

        {/* Enablers */}
        <motion.div
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h4 className="text-center text-sm font-semibold text-text-tertiary tracking-widest uppercase mb-6">
            Powered By
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {valueCreationModel.enablers.map((enabler, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block px-4 py-2 rounded-full glass text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors duration-300"
              >
                {enabler}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
