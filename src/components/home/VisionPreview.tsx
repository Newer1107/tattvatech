"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { vision2035 } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/*  Metric card                                                        */
/* ------------------------------------------------------------------ */
function MetricCard({
  metric,
  index,
}: {
  metric: (typeof vision2035.aspirationalMetrics)[number];
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
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8 text-center flex flex-col items-center"
    >
      {/* Orange glow behind number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-orange/5 blur-3xl" />

      <div className="relative text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gradient mb-2">
        {metric.value}
        {metric.suffix}
      </div>
      <div className="relative text-xs md:text-sm text-gray-500 font-medium leading-snug">
        {metric.label}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function VisionPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden bg-bg-base"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,24,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10 max-w-6xl">
        {/* Heading */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedHeading
            as="h2"
            split
            gradient
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-6"
          >
            Vision 2035
          </AnimatedHeading>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            {vision2035.description}
          </p>
        </motion.div>

        {/* Metrics Row */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {vision2035.aspirationalMetrics.slice(0, 5).map((metric, i) => (
              <MetricCard key={metric.label} metric={metric} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Aspiration Quote */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="border-l-4 border-orange bg-orange/[0.03] p-8 md:p-10 rounded-r-2xl">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
              &ldquo;{vision2035.aspiration}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Button href="/vision-2035" variant="primary" size="lg">
            Explore Vision 2035
            <Icon name="cross" className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
