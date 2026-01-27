import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "helpers/cn";

type TagProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "m-1 cursor-pointer rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 text-base text-[var(--color-text-disabled)] transition-colors duration-500",
        "hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-accent)]",
        "data-[active=true]:bg-[var(--color-accent)] data-[active=true]:text-white",
        className,
      )}
      {...props}
    />
  ),
);

Tag.displayName = "Tag";
