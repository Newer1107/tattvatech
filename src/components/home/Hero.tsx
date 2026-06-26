"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { siteConfig } from "@/lib/data";
import Button from "@/components/ui/Button";

const ease = [0.4, 0, 0.2, 1] as const;

type WordAnim = {
  text: string;
  anim: {
    initial: Record<string, number | string>;
    transition: { duration: number; delay: number; ease: readonly [number, number, number, number] };
  };
};

const headlineWords: WordAnim[] = [
  {
    text: "Technology",
    anim: {
      initial: { y: 80, opacity: 0 },
      transition: { duration: 0.8, delay: 0.2, ease },
    },
  },
  {
    text: "That",
    anim: {
      initial: { opacity: 0 },
      transition: { duration: 0.6, delay: 0.3, ease },
    },
  },
  {
    text: "Transforms",
    anim: {
      initial: { scale: 0.7, opacity: 0 },
      transition: { duration: 0.7, delay: 0.35, ease },
    },
  },
  {
    text: "The",
    anim: {
      initial: { filter: "blur(8px)", opacity: 0 },
      transition: { duration: 0.6, delay: 0.4, ease },
    },
  },
  {
    text: "Future",
    anim: {
      initial: { x: 60, opacity: 0 },
      transition: { duration: 0.8, delay: 0.45, ease },
    },
  },
];

function MagneticBtn({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2;
      const dy = e.clientY - r.top - r.height / 2;
      const d = Math.hypot(dx, dy);
      const s = Math.max(0, 1 - d / 80);
      x.set(dx * s * 0.2);
      y.set(dy * s * 0.2);
    },
    [x, y]
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
    >
      <Button href={href} variant={variant} size="lg">
        {children}
      </Button>
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springMX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const onMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
      {/* Ambient light-blobs */}
      <motion.div
        className="light-blob w-[600px] h-[600px] bg-orange/5 top-[-10%] left-[-5%]"
        animate={{ x: [0, 40, -20, 30, 0], y: [0, -50, 30, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="light-blob w-[400px] h-[400px] bg-amber/5 bottom-[10%] right-[-5%]"
        animate={{ x: [0, -30, 50, -20, 0], y: [0, 40, -40, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", repeatDelay: 0 }}
      />
      <motion.div
        className="light-blob w-[350px] h-[350px] bg-orange-light/4 top-[40%] left-[60%]"
        animate={{ x: [0, -40, 30, -50, 0], y: [0, 30, -30, -20, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cursor-reactive ambient glow */}
      {mounted && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: springMX,
            top: springMY,
            width: "800px",
            height: "800px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,122,24,0.06) 0%, rgba(255,148,77,0.03) 30%, transparent 60%)",
          }}
        />
      )}

      {/* Noise overlay */}
      <div className="noise" />

      {/* Content */}
      <div className="relative z-10 section-container text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-orange/80 border border-orange/20 rounded-full">
            {siteConfig.name}
          </span>
        </motion.div>

        {/* Headline - each word animates differently */}
        <h1 className="text-[clamp(2.2rem,7vw,5.5rem)] font-bold font-heading leading-[1.05] tracking-tight max-w-6xl mx-auto mb-5">
          {headlineWords.map((word, i) => {
            const isGlow = word.text === "Transforms" || word.text === "Future";
            return (
              <span key={i} className="inline-block overflow-hidden mr-[0.15em]">
                <motion.span
                  className={`inline-block ${isGlow ? "text-gradient glow-text" : "text-text-primary"}`}
                  initial={word.anim.initial}
                  animate={{ y: 0, x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={word.anim.transition}
                >
                  {word.text}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticBtn href="/about" variant="primary">
            Explore Our Vision
          </MagneticBtn>
          <MagneticBtn href="/contact" variant="secondary">
            Get in Touch
          </MagneticBtn>
        </motion.div>

        {/* Brand keywords */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
          className="mt-12 text-[11px] text-text-tertiary tracking-[0.2em] uppercase"
        >
          {siteConfig.brandKeywords.join("  •  ")}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-text-tertiary">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-orange/60 to-transparent"
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
        }}
        aria-hidden
      />
    </section>
  );
}
