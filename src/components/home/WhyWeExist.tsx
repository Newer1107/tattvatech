"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import { whyWeExist } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const stageData = whyWeExist.stages;

/* ------------------------------------------------------------------ */
/*  Stage card that fades+slides up once                               */
/* ------------------------------------------------------------------ */
function StageCard({
  stage,
  index,
  inView,
}: {
  stage: (typeof stageData)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass rounded-2xl p-4 md:p-6 relative overflow-hidden group flex flex-col h-full"
    >
      {/* Stage number */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-orange font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <span className="text-[10px] font-bold tracking-widest text-orange uppercase">
          {stage.title}
        </span>
      </div>

      {/* Heading */}
      <h3 className="text-xl md:text-2xl font-bold font-heading text-text-primary mb-4 group-hover:text-orange transition-colors duration-300">
        {stage.heading}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-text-secondary leading-relaxed mt-auto">
        {stage.description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static progress indicators                                         */
/* ------------------------------------------------------------------ */
function ProgressDots({ inView }: { inView: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {stageData.map((_, i) => (
        <div key={i} className="flex items-center gap-0">
          <motion.div
            className="w-3 h-3 rounded-full border-2 border-orange bg-orange/20"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
          />
          {i < stageData.length - 1 && (
            <motion.div
              className="h-[2px] w-16 md:w-24"
              style={{
                background:
                  "linear-gradient(90deg, #ff7a18, #ff944d)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function WhyWeExist() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden mesh-bg"
    >
      {/* Static ambient glow */}
      <div className="light-blob w-[500px] h-[500px] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,24,0.06) 0%, transparent 70%)",
        }}
      />

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
            Why We Exist
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {whyWeExist.problemStatement}
          </p>
        </motion.div>

        {/* Progress dots */}
        <div className="max-w-3xl mx-auto mb-8">
          <ProgressDots inView={inView} />
        </div>

        {/* All stage cards in a row */}
        <div className="max-w-5xl mx-auto mb-16 grid md:grid-cols-3 gap-4 md:gap-6">
          {stageData.map((stage, i) => (
            <StageCard
              key={stage.stage}
              stage={stage}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Outcomes */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4 className="text-center text-sm font-semibold text-text-tertiary tracking-widest uppercase mb-6">
            What We Deliver
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {whyWeExist.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass rounded-xl px-4 py-3 text-center group hover:bg-bg-card transition-colors duration-300"
              >
                <span className="text-sm text-text-secondary font-medium group-hover:text-orange transition-colors duration-300">
                  {outcome}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-text-tertiary font-heading tracking-wider">
            {whyWeExist.closing}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
