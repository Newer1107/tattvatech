import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main";
  children: ReactNode;
};

export function PageContainer({
  as = "div",
  children,
  className,
  ...props
}: PageContainerProps) {
  const Component = as;

  return (
    <Component
      {...props}
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10 xl:px-16", className)}
    >
      {children}
    </Component>
  );
}
