"use client";

import { useMemo, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const categories = portfolioData.skills;
  const [active, setActive] = useState<string>("all");

  const skills = useMemo(() => {
    if (active === "all") {
      return categories.flatMap((c) =>
        c.skills.map((skill) => ({ skill, category: c.label, id: c.id })),
      );
    }
    const cat = categories.find((c) => c.id === active);
    return (cat?.skills ?? []).map((skill) => ({
      skill,
      category: cat?.label ?? "",
      id: cat?.id ?? "",
    }));
  }, [active, categories]);

  return (
    <section id="skills" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Technology stack"
            title="Technical depth, organized for clarity"
            description="Only technologies from my real background — filter by category to explore the stack."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
            <button
              type="button"
              role="tab"
              aria-selected={active === "all"}
              onClick={() => setActive("all")}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active === "all"
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  active === cat.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((item, index) => (
            <Reveal key={`${item.id}-${item.skill}`} delay={Math.min(index * 30, 240)}>
              <div className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 transition hover:border-[var(--accent)] hover:bg-[var(--surface)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
                  {item.category}
                </p>
                <p className="mt-2 text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)]">
                  {item.skill}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
