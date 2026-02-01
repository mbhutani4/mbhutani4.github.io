import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "helpers/cn";

type TagProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "m-1 cursor-pointer rounded-full border border-(--color-border) bg-transparent px-4 py-2 text-base text-(--color-text-disabled) transition-all duration-300",
        "hover:bg-(--color-background-secondary) hover:text-accent hover:border-accent",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "data-[active=true]:bg-accent data-[active=true]:text-white data-[active=true]:border-accent",
        className,
      )}
      {...props}
    />
  ),
);

Tag.displayName = "Tag";
