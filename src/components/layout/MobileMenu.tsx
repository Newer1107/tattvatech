"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { navigationItems } from "@/constants/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24 }}
          className="absolute inset-x-0 top-full mt-3 rounded-[24px] border border-white/15 bg-[#101828]/96 p-5 shadow-[var(--shadow-soft)] md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-md px-1 py-1 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="px-1 py-1 text-sm font-medium text-white/38"
                >
                  {item.label}
                </span>
              )
            ))}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
