"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { navigationActions, navigationGroups } from "@/constants/navigation";
import { cn } from "@/lib/utils";

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
          className="absolute inset-x-0 top-full border-b border-[rgba(16,24,40,0.06)] bg-background px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-6">
            {navigationGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-text-primary">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-2.5 w-2.5",
                      group.marker === "circle" && "rounded-full bg-orange-primary",
                      group.marker === "triangle" && "h-0 w-0 border-r-[6px] border-b-[10px] border-l-[6px] border-r-transparent border-b-orange-accent border-l-transparent bg-transparent",
                      group.marker === "square" && "bg-amber-primary",
                      group.marker === "diamond" && "rotate-45 bg-orange-accent",
                    )}
                  />
                  {group.title}
                </p>

                <div className="flex flex-col gap-2 pl-4">
                  {group.links.map((item) => (
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="inline-block w-fit border-b border-[rgba(16,24,40,0.2)] pb-1 text-base text-text-secondary transition-colors hover:border-orange-primary hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        key={item.label}
                        aria-disabled="true"
                        className="inline-block w-fit border-b border-[rgba(16,24,40,0.1)] pb-1 text-base text-text-muted"
                      >
                        {item.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 border-t border-border-default/70 pt-4">
              {navigationActions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href ?? "#contact"}
                  onClick={onClose}
                  className="inline-block w-fit border-b border-[rgba(16,24,40,0.35)] pb-1 text-base font-medium text-text-primary transition-colors hover:border-orange-primary hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  {item.label}
                </Link>
              ))}

              <div onClick={onClose}>
                <ButtonLink href="#contact">Start a Project</ButtonLink>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
