import type { HTMLAttributes } from "react";
import { cn } from "helpers/cn";

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative bg-cover bg-center text-[--color-text-primary] px-12 py-20",
        className,
      )}
      {...props}
    />
  );
}

export function HeroSection({ className, ...props }: SectionProps) {
  return (
    <Section
      className={cn("bg-(--color-background-secondary) px-50 py-40", className)}
      {...props}
    />
  );
}
