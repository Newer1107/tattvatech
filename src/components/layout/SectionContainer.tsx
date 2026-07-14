import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  function SectionContainer({ id, children, className }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "mx-auto w-full max-w-[var(--content-max)] py-16 md:py-20 lg:py-28 xl:py-36",
          className,
        )}
      >
        {children}
      </section>
    );
  },
);
