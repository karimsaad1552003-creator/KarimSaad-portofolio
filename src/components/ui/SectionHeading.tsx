import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "display text-balance text-[var(--text)]",
          size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
