"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import { businessVerticals, businessVerticalStatement } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";

const verticalIcons: Record<string, string> = {
  consulting: "square",
  software: "desktop",
  learning: "book",
  innovation: "flask",
  training: "graduation",
  partnership: "handshake",
};

/* ------------------------------------------------------------------ */
/*  Vertical card                                                      */
/* ------------------------------------------------------------------ */
function VerticalCard({
  vertical,
  index,
}: {
  vertical: (typeof businessVerticals)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="bg-white rounded-2xl p-4 md:p-6 h-full border border-black/[0.06] transition-all duration-300 group-hover:shadow-md group-hover:border-orange/20 group-hover:-translate-y-0.5">
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
              <Icon
                name={verticalIcons[vertical.icon] ?? "circle"}
                className="w-5 h-5 text-orange"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-semibold font-heading text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
            {vertical.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {vertical.description}
          </p>

          {/* Services */}
          <div className="space-y-1.5">
            {vertical.services.map((service, j) => (
              <div
                key={j}
                className="flex items-start gap-2 text-xs text-text-tertiary"
              >
                <span className="w-1 h-1 rounded-full bg-orange/50 mt-1.5 shrink-0" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function BusinessVerticals() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing overflow-hidden mesh-bg-alt"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />

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
            Business Verticals
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {businessVerticalStatement}
          </p>
        </motion.div>

        {/* 3x2 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {businessVerticals.map((vertical, index) => (
            <VerticalCard
              key={vertical.id}
              vertical={vertical}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
