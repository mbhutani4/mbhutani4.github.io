import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "helpers/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const baseButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-background-primary)] text-base text-[var(--color-text-secondary)] transition-colors duration-200";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        baseButtonClasses,
        "px-4 py-2",
        "hover:bg-[var(--color-background-disabled)] hover:text-[var(--color-text-primary)]",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} className={cn("h-8 w-8 p-1", className)} {...props} />
  ),
);

IconButton.displayName = "IconButton";

export const ButtonOutline = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        baseButtonClasses,
        "px-4 py-2",
        "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-background-inverse)] hover:text-[var(--color-text-inverse)] focus:bg-[var(--color-background-disabled)] active:bg-[var(--color-background-primary)]",
        className,
      )}
      {...props}
    />
  ),
);

ButtonOutline.displayName = "ButtonOutline";

export default Button;
