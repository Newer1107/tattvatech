"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const SPLASH_DURATION = 2600;

interface SplashScreenProps {
  onFinish?: () => void;
}

function buildTTPattern(
  w: number,
  h: number,
  particleCount: number,
): { x: number; y: number }[] {
  // Build a "TT" monogram target pattern
  const targets: { x: number; y: number }[] = [];
  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h) * 0.12;
  const gap = scale * 1.6;

  // Left T
  const leftX = cx - gap / 2;
  for (let i = 0; i < Math.floor(particleCount / 2); i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const xOff = col < 4 ? col * (scale / 4) : 0;
    const yOff =
      col < 4 ? row * (scale / 4) : (row % 3) * (scale / 4);
    targets.push({
      x: leftX - scale / 2 + xOff + (Math.random() - 0.5) * 2,
      y: cy - scale + yOff + (Math.random() - 0.5) * 2,
    });
  }

  // Right T
  const rightX = cx + gap / 2;
  const offset = Math.floor(particleCount / 2);
  for (let i = 0; i < particleCount - Math.floor(particleCount / 2); i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const xOff = col < 4 ? col * (scale / 4) : 0;
    const yOff =
      col < 4 ? row * (scale / 4) : (row % 3) * (scale / 4);
    targets.push({
      x: rightX - scale / 2 + xOff + (Math.random() - 0.5) * 2,
      y: cy - scale + yOff + (Math.random() - 0.5) * 2,
    });
  }

  return targets;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [show, setShow] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const w = canvas.width;
      const h = canvas.height;
      const count = reducedMotion ? 20 : 80;
      const targets = buildTTPattern(w, h, count);

      particlesRef.current = targets.map((t) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        targetX: t.x,
        targetY: t.y,
        vx: 0,
        vy: 0,
        size: reducedMotion ? 2 : 1 + Math.random() * 2.5,
        alpha: 0,
      }));
    },
    [reducedMotion],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles(canvas);
    };
    resize();
    window.addEventListener("resize", resize);

    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / SPLASH_DURATION, 1);

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        // Spring toward target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.04;
        p.vy += dy * 0.04;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.min(1, progress * 3);

        if (reducedMotion) {
          ctx.fillStyle = `rgba(255, 122, 24, ${p.alpha})`;
          ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
        } else {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(255, 179, 71, ${p.alpha})`);
          grad.addColorStop(0.5, `rgba(255, 122, 24, ${p.alpha * 0.6})`);
          grad.addColorStop(1, `rgba(255, 122, 24, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, reducedMotion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-elevated overflow-hidden"
        >
          {/* Particle canvas background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* TATTVA TECH text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight">
                <span className="text-text-primary">TATTVA</span>{" "}
                <span className="text-gradient">TECH</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="text-sm md:text-base text-text-secondary tracking-wide"
            >
              Technology That Transforms
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-48 md:w-64"
            >
              <div className="h-[2px] bg-black/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: SPLASH_DURATION / 1000 - 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full bg-gradient-to-r from-orange to-orange-light rounded-full origin-left"
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
