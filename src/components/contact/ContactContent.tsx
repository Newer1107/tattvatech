"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Button from "@/components/ui/Button";
import { contact, siteConfig } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/*  Premium form field with bottom border animation                    */
/* ------------------------------------------------------------------ */
function FormField({
  label,
  type = "text",
  isTextarea = false,
  delay = 0,
}: {
  label: string;
  type?: string;
  isTextarea?: boolean;
  delay?: number;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const Tag = isTextarea ? "textarea" : "input";

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        type={isTextarea ? undefined : type}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={isTextarea ? 4 : undefined}
        className={`
          w-full bg-transparent border rounded-xl px-4 pt-6 pb-3 text-sm text-text-primary
          outline-none transition-all duration-500
          ${
            active
              ? "border-orange/30"
              : "border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
          }
          ${isTextarea ? "resize-none" : ""}
        `}
      />

      {/* Label - slides up on focus */}
      <label
        className={`
          absolute left-4 transition-all duration-500 pointer-events-none select-none
          ${
            active
              ? "top-2 text-[10px] uppercase tracking-[0.2em] text-orange/60"
              : "top-1/2 -translate-y-1/2 text-sm text-text-tertiary"
          }
        `}
      >
        {label}
      </label>

      {/* Bottom border that expands from center */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden rounded-b-xl">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-orange/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            active
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Subtle glow on active */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={
          active
            ? { boxShadow: "inset 0 0 20px rgba(255,122,24,0.04)" }
            : { boxShadow: "inset 0 0 0px rgba(255,122,24,0)" }
        }
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function ContactContent() {
  const [submitting, setSubmitting] = useState(false);
  const { description, collaborationAreas, brandKeywords, closingLine, company, email, website, commitment } =
    contact;
  const closingRef = useRef<HTMLDivElement>(null);
  const closingInView = useInView(closingRef, { once: true, margin: "-80px" });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 2000);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      {/* Ambient orbs */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 rounded-full bg-orange/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-48 w-96 h-96 rounded-full bg-amber/5 blur-[120px] pointer-events-none" />

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-orange/60 mb-6 font-medium">
              Let&apos;s Connect
            </span>
          </motion.div>

          <AnimatedHeading
            as="h1"
            gradient
            split
            className="heading-xl mb-6"
          >
            Contact Us
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* ---------- Form + Info ---------- */}
      <section className="relative z-10 pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* ---- Form ---- */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-text-primary mb-8">
                  Send a Message
                </h2>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Name" delay={0.1} />
                  <FormField label="Email" type="email" delay={0.15} />
                </div>
                <FormField label="Company" delay={0.2} />
                <FormField label="Message" isTextarea delay={0.25} />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full sm:w-auto relative overflow-hidden"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <motion.span
                          className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Icon name="cross" className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* ---- Info sidebar ---- */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company info card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-strong rounded-2xl p-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 block">
                      Company
                    </span>
                    <p className="text-lg font-heading font-bold text-text-primary">
                      {company}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 block">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-text-secondary hover:text-orange transition-colors duration-300"
                    >
                      {email}
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 block">
                      Website
                    </span>
                    <a
                      href={`https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary hover:text-orange transition-colors duration-300"
                    >
                      {website}
                    </a>
                  </motion.div>

                  <motion.div
                    className="pt-4 border-t border-[var(--border-subtle)]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 block">
                      Brand
                    </span>
                    <p className="text-xs font-medium text-text-secondary">
                      {brandKeywords}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Collaboration areas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="glass rounded-2xl p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4 block">
                    Collaboration Areas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {collaborationAreas.map((area, i) => (
                      <motion.span
                        key={area}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "rgba(255,122,24,0.3)",
                          color: "rgba(255,122,24,0.8)",
                        }}
                        className="inline-block text-xs px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-text-tertiary bg-black/[0.03] transition-colors duration-300 cursor-default"
                      >
                        {area}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Social / Connect */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="glass rounded-2xl p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4 block">
                    Connect With Us
                  </span>
                  <div className="flex gap-3">
                    {["LinkedIn", "Twitter", "YouTube", "GitHub"].map(
                      (social, i) => (
                        <motion.span
                          key={social}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          whileHover={{
                            y: -2,
                            borderColor: "rgba(255,122,24,0.3)",
                          }}
                          className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-black/[0.03] flex items-center justify-center text-xs text-text-tertiary hover:text-orange/60 hover:border-orange/20 transition-all duration-300 cursor-default"
                        >
                          {social[0]}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="relative z-10 pb-32 md:pb-48">
        <div className="section-container text-center max-w-3xl mx-auto">
          <motion.div
            ref={closingRef}
            className="relative"
            initial={{ opacity: 0 }}
            animate={closingInView ? { opacity: 1 } : {}}
          >
            {/* Pulsing glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-64 h-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,122,24,0.05) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative">
              {/* Animated gradient text */}
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  closingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-gradient">{closingLine}</span>
              </motion.h2>

              <motion.p
                className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                animate={closingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {commitment}
              </motion.p>

              <motion.p
                className="mt-10 text-[10px] uppercase tracking-[0.3em] text-text-tertiary"
                initial={{ opacity: 0 }}
                animate={closingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {brandKeywords}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
