"use client";

import { motion } from "framer-motion";
import { founders } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

function ConnectorArrow() {
  return (
    <div className="hidden md:flex items-center justify-center shrink-0">
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="overflow-visible">
        <motion.path
          d="M2 10h28M26 3l6 7-6 7"
          stroke="#ff7a18"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}

export default function FounderVision() {
  return (
    <section className="relative section-spacing overflow-hidden mesh-bg">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-orange/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <AnimatedHeading as="h2" split gradient className="heading-lg mb-4">
            {founders.title}
          </AnimatedHeading>
        </motion.div>

        {/* Founder message - clean fade in paragraphs */}
        <div className="max-w-4xl mx-auto space-y-4 mb-14">
          {founders.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-secondary text-base md:text-lg leading-relaxed"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Purpose: Three gaps as connected cards - HERO ELEMENT */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm font-semibold text-text-tertiary uppercase tracking-widest mb-8"
          >
            {founders.purpose.title}
          </motion.h3>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-3">
            {founders.purpose.gaps.map((gap, i) => (
              <div key={i} className="flex-1 flex items-stretch gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex-1 flex flex-col items-center bg-white rounded-xl border border-black/[0.06] p-5 md:p-6 text-center hover:border-orange/20 hover:shadow-sm transition-all duration-300 group"
                >
                  {/* FROM */}
                  <span className="text-[9px] font-bold tracking-[0.2em] text-text-tertiary uppercase mb-3">FROM</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-black/[0.06] flex items-center justify-center mb-3 group-hover:border-orange/20 transition-colors">
                    <span className="text-xs md:text-sm font-semibold text-text-primary text-center leading-tight px-1">{gap.from}</span>
                  </div>

                  {/* Arrow down (mobile) / arrow right handled by ConnectorArrow */}
                  <div className="md:hidden w-4 h-[1px] bg-orange/30 mb-3" />

                  {/* TO */}
                  <span className="text-[9px] font-bold tracking-[0.2em] text-orange uppercase mb-3">TO</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange/[0.06] border border-orange/15 flex items-center justify-center group-hover:bg-orange/[0.12] transition-colors">
                    <span className="text-xs md:text-sm font-semibold text-orange text-center leading-tight px-1">{gap.to}</span>
                  </div>
                </motion.div>
                {!founders.purpose.gaps[i + 1] ? null : <ConnectorArrow />}
              </div>
            ))}
          </div>
        </div>

        {/* Vision outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mb-14"
        >
          <p className="text-text-secondary text-center mb-6 leading-relaxed">
            {founders.vision.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {founders.vision.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/[0.04] hover:border-orange/15 transition-colors"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                <span className="text-sm md:text-base text-text-secondary leading-relaxed">{outcome}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guiding principles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm font-semibold text-text-tertiary uppercase tracking-widest mb-6"
          >
            Three Guiding Principles
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-4">
            {founders.guidingPrinciples.map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className="bg-white rounded-xl border border-black/[0.06] p-5 hover:border-orange/20 transition-all duration-300 hover:shadow-sm"
              >
                <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">{principle.title}</h4>
                <ul className="space-y-1.5">
                  {principle.items.map((item, j) => (
                    <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-orange shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 text-center text-xs text-text-tertiary font-heading tracking-wider"
        >
          {founders.signature}
        </motion.p>
      </div>
    </section>
  );
}
