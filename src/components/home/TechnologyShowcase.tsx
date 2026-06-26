"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { expertise } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";

const iconMap: Record<string, string> = {
  brain: "hexagon",
  chart: "bars",
  factory: "square",
  robot: "diamond",
  wifi: "target",
  drone: "cross",
  chip: "hexagon",
  cloud: "circle",
  shield: "hexagon",
  code: "brackets",
  digital: "cycle",
  lightbulb: "bulb",
};

/* ------------------------------------------------------------------ */
/*  3D Tilt Card                                                      */
/* ------------------------------------------------------------------ */
function TiltCard({
  item,
  index,
}: {
  item: (typeof expertise)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 250, damping: 25 });
  const springY = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );
  const onMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
        rotateX: index % 2 === 0 ? 8 : -8,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 40, rotateX: index % 2 === 0 ? 8 : -8 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl bg-bg-card border border-black/[0.06] p-4 md:p-5 transition-colors duration-300 h-full group"
    >
      {/* Top orange border glow */}
      <motion.div
        className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ filter: "blur(1px)" }}
      />

      {/* Icon */}
      <div className="mb-4">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon
            name={iconMap[item.icon] ?? "circle"}
            className="w-7 h-7 text-orange"
          />
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold font-heading text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
        {item.title}
      </h3>

      {/* Focus tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.focus.map((f, i) => (
          <span
            key={i}
            className="inline-block px-2 py-0.5 text-[10px] font-medium text-text-tertiary bg-black/[0.03] rounded-md border border-black/[0.06]"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Purpose */}
      <p className="text-xs text-text-tertiary leading-relaxed">
        {item.purpose}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function TechnologyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative section-spacing mesh-bg-alt">
      {/* Content */}
      <div className="section-container">
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
            Our Areas of Expertise
          </AnimatedHeading>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {expertise.length} technology domains empowering the future of
            business and society.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {expertise.map((item, index) => (
            <TiltCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
