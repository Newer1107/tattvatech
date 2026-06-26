"use client";

import { motion } from "framer-motion";
import { businessEcosystem } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";

const componentIcons = ["square", "desktop", "book", "flask"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function BusinessEcosystem() {
  return (
    <section className="relative section-spacing overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <AnimatedHeading as="h2" split gradient className="heading-lg mb-4">
            Business Ecosystem
          </AnimatedHeading>
          <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            {businessEcosystem.description}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-orange font-medium text-sm mb-10"
        >
          {businessEcosystem.tagline}
        </motion.p>

        {/* Connected grid */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8 shadow-sm">
            {/* Cross connector lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ zIndex: 0 }}
            >
              <line x1="0" y1="50" x2="100" y2="50" stroke="#ff7a18" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#ff7a18" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
            </svg>

            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange flex items-center justify-center z-10 shadow-lg shadow-orange/20">
              <span className="text-white text-xs font-bold">TT</span>
            </div>

            {/* 2x2 Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {businessEcosystem.components.map((comp, i) => (
                <motion.div
                  key={comp.id}
                  variants={cardVariants}
                  className="relative z-10 flex flex-col bg-white rounded-xl border border-black/[0.05] p-5 md:p-6 hover:border-orange/25 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-ghost flex items-center justify-center">
                      <Icon name={componentIcons[i]} className="w-4 h-4 text-orange" />
                    </div>
                    <h3 className="text-sm font-heading font-semibold text-text-primary">{comp.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed flex-1">
                    {comp.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Purpose + Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <p className="text-text-secondary text-base leading-relaxed mb-6">
            {businessEcosystem.purpose}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {businessEcosystem.integrates.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-white rounded-full border border-black/[0.06]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="relative rounded-2xl border border-black/[0.06] bg-white p-8 md:p-10">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed italic">
              &ldquo;{businessEcosystem.philosophy}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
