"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ease = [0.4, 0, 0.2, 1] as const;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise" },
  { href: "/services", label: "Services" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/impact", label: "Impact" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/vision-2035", label: "Vision 2035" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  children,
  href,
  isActive,
}: {
  children: string;
  href: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      x.set(dx * 0.1);
      y.set(dy * 0.1);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 block cursor-pointer rounded-md ${
          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-black/5"
        }`}
      >
        {children}
        {/* Orange underline from center */}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-orange transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
        {/* Active orange dot */}
        {isActive && (
          <motion.span
            layoutId="active-dot"
            className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bg-elevated/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <span className="text-lg font-bold text-gradient font-heading">
                TT
              </span>
              <motion.div
                className="absolute inset-0 rounded-full bg-orange/10 blur-sm"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-sm font-semibold tracking-tight font-heading hidden sm:block text-text-primary">
              TATTVA<span className="text-orange">TECH</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <span key={link.href} className="group">
                <NavLink href={link.href} isActive={pathname === link.href}>
                  {link.label}
                </NavLink>
              </span>
            ))}
            {/* CTA */}
            <Link
              href="/contact"
              className="relative ml-3 px-5 py-2.5 text-sm font-medium rounded-xl bg-orange text-white hover:shadow-lg hover:shadow-orange/20 active:scale-[0.97] transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.span
                className="absolute inset-0 bg-black/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] bg-text-primary origin-center"
                transition={{ ease }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block w-5 h-[1.5px] bg-text-primary"
                transition={{ ease }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] bg-text-primary origin-center"
                transition={{ ease }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu - fullscreen glass overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 bg-bg-base/90 backdrop-blur-2xl pt-24"
          >
            <div className="section-container flex flex-col gap-3 py-8">
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.5,
                      ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3.5 px-5 rounded-xl text-lg font-medium transition-all duration-300 cursor-pointer ${
                        active
                          ? "text-orange bg-black/[0.04] border border-black/[0.08]"
                          : "text-text-secondary hover:text-text-primary hover:bg-black/[0.02] hover:pl-7"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {active && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="w-1.5 h-1.5 rounded-full bg-orange shrink-0"
                          />
                        )}
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease }}
                className="mt-6"
              >
                  <Link
                    href="/contact"
                    className="block w-full text-center py-4 rounded-xl bg-orange text-white font-medium hover:shadow-lg hover:shadow-orange/20 transition-all duration-300 cursor-pointer"
                  >
                    Get in Touch
                  </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
