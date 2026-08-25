import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--text)] text-[var(--bg)] hover:opacity-90 dark:bg-[var(--accent)] dark:text-[var(--accent-fg)] dark:hover:brightness-110",
  secondary:
    "border border-[var(--border-strong)] bg-transparent text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]",
  accent:
    "bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-110 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
