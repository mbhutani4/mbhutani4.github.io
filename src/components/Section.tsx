import type { HTMLAttributes } from "react";
import { cn } from "helpers/cn";

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative bg-cover bg-center text-[--color-text-primary] px-6 sm:px-12 py-20 sm:py-24",
        className,
      )}
      {...props}
    />
  );
}

export function HeroSection({ className, ...props }: SectionProps) {
  return (
    <Section
      className={cn(
        "bg-(--color-background-secondary) px-6 sm:px-12 md:px-50 py-32 sm:py-40 md:py-48 min-h-screen flex items-center",
        className,
      )}
      {...props}
    />
  );
}
