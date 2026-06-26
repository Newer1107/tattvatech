"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { impact } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/*  Metric card with gradient glow behind number                       */
/* ------------------------------------------------------------------ */
function GlowMetricCard({
  metric,
  index,
}: {
  metric: (typeof impact.metrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {/* Gradient glow behind number */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,24,0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative glass rounded-2xl p-4 md:p-6 text-center border border-black/[0.06] group-hover:border-orange/20 transition-colors duration-500">
        <Counter
          value={metric.value}
          suffix={metric.suffix}
          duration={2.5}
          label={metric.label}
          description={metric.description}
          className="[&_.text-4xl]:text-text-primary [&_.text-4xl]:font-heading [&_.text-sm]:text-text-secondary [&_.text-xs]:text-text-tertiary"
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function ImpactPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden mesh-bg"
    >
      {/* Ambient glow that scales with scroll */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          scale: glowScale,
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
            {impact.heading}
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {impact.description}
          </p>
        </motion.div>

        {/* Top 3 metrics with glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {impact.metrics.slice(0, 3).map((metric, i) => (
            <GlowMetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button href="/impact" variant="primary" size="lg">
            View Full Impact
            <Icon name="cross" className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
