"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const sizes = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-sm",
};

const variantStyles = {
  primary:
    "bg-orange text-white hover:bg-orange/90 hover:shadow-lg hover:shadow-orange/20",
  secondary:
    "bg-white border border-black/10 text-text-primary hover:border-orange/30",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-black/5",
  outline:
    "border-2 border-orange text-orange hover:bg-orange hover:text-white",
};

function RippleEffect({ x, y, show }: { x: number; y: number; show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      className="absolute rounded-full bg-black/10 pointer-events-none"
      initial={{ left: x, top: y, width: 0, height: 0, opacity: 0.5 }}
      animate={{ width: 300, height: 300, opacity: 0, left: x - 150, top: y - 150 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ translateX: "-50%", translateY: "-50%" }}
    />
  );
}

function MagneticWrapper({
  children,
  className,
  onClick,
  type,
  disabled,
  href,
}: {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const [glow, setGlow] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      // ponytail: max 6px offset
      x.set(dx * 0.08);
      y.set(dy * 0.08);
    },
    [x, y]
  );

  const onMouseEnter = useCallback(() => setGlow(true), []);
  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setGlow(false);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setRipple({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          show: true,
        });
        setTimeout(() => setRipple((p) => ({ ...p, show: false })), 600);
      }
      onClick?.();
    },
    [onClick]
  );

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex"
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {/* Glow behind */}
      {glow && (
        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,122,24,0.3) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Ripple */}
      <RippleEffect x={ripple.x} y={ripple.y} show={ripple.show} />

      {href ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={className}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg px-5 py-2.5 text-sm transition-all duration-200 no-select relative overflow-hidden active:scale-[0.97] cursor-pointer";

  const classes = `${base} ${sizes[size]} ${variantStyles[variant]} ${className}`;

  return (
    <MagneticWrapper
      href={href}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classes}
    >
      {children}
    </MagneticWrapper>
  );
}
