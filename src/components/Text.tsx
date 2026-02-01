import type { ComponentPropsWithoutRef } from "react";
import { cn } from "helpers/cn";

type TextProps<T extends "h1" | "p"> = Omit<
  ComponentPropsWithoutRef<T>,
  "as"
> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" };

export function Heading({
  as: Component = "h1",
  className,
  ...props
}: TextProps<"h1">) {
  return (
    <Component
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function SubHeading({
  as: Component = "h2",
  className,
  ...props
}: TextProps<"h1">) {
  return (
    <Component
      className={cn(
        "inline-block text-base md:text-lg uppercase tracking-[0.15em] font-semibold letter-spacing-wide",
        className,
      )}
      {...props}
    />
  );
}

export function Paragraph({
  as: Component = "p",
  className,
  ...props
}: TextProps<"p">) {
  return (
    <Component
      className={cn(
        "my-4 max-w-[40em] text-text-secondary leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}
