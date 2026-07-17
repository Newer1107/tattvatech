import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const buttonClasses =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-[image:var(--brand-gradient)] text-white shadow-[0_18px_40px_var(--orange-shadow)]"
      : "border border-border-strong bg-white text-text-primary shadow-[0_12px_24px_rgba(16,24,40,0.05)]";

  return (
    <button className={cn(buttonClasses, variantClasses, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonClasses,
        variant === "primary"
          ? "bg-[image:var(--brand-gradient)] text-white shadow-[0_18px_40px_var(--orange-shadow)]"
          : "border border-border-strong bg-white text-text-primary shadow-[0_12px_24px_rgba(16,24,40,0.05)]",
      )}
    >
      {children}
    </Link>
  );
}
