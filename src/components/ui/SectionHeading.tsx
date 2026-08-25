import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl lg:text-[2.75rem] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
