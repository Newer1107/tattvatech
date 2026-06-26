"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig, contact, closing } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise" },
  { href: "/services", label: "Services" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/impact", label: "Impact" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/vision-2035", label: "Vision 2035" },
  { href: "/contact", label: "Contact" },
];

const values = closing.finalStatements;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Footer() {
  return (
    <footer className="relative bg-bg-elevated">
      {/* Orange gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="section-container"
      >
        {/* Main grid: 5 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 py-16 lg:py-20 items-start">
          {/* ── Brand — 2 cols ── */}
          <motion.div variants={item} className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <span className="text-lg font-bold font-heading text-gradient">TT</span>
              </div>
              <span className="text-sm font-semibold tracking-tight font-heading text-text-primary">
                TATTVA<span className="text-orange">TECH</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {siteConfig.brandKeywords.map((word) => (
                <span
                  key={word}
                  className="inline-block px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full border border-border-subtle text-text-tertiary bg-orange-ghost"
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div variants={item}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm text-text-secondary hover:text-orange transition-colors duration-200 inline-block group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Values ── */}
          <motion.div variants={item}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-5">
              Our Commitment
            </h4>
            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div variants={item}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-text-secondary hover:text-orange transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-orange transition-colors duration-200"
                >
                  {contact.website}
                </a>
              </li>
              <li className="pt-3 text-xs uppercase tracking-widest text-text-tertiary">
                {siteConfig.brandKeywords.join(" • ")}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={item}
          className="pt-8 pb-10 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary font-heading">
            {siteConfig.tagline}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
