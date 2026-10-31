import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function EducationList() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {portfolioData.education.map((edu, index) => (
        <Reveal key={edu.id} delay={index * 60}>
          <article className="h-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
              {[edu.start, edu.end].filter(Boolean).join(" — ") || "Education"}
            </p>
            <h3 className="display mt-3 text-2xl text-[var(--text)]">{edu.degree}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{edu.field}</p>
            <p className="mt-4 text-sm font-medium text-[var(--text)]">
              {edu.institution}
              {edu.location ? ` · ${edu.location}` : ""}
            </p>
            {edu.showGpa && edu.gpa ? (
              <p className="mt-2 text-sm text-[var(--text-subtle)]">GPA: {edu.gpa}</p>
            ) : null}
            {edu.highlights?.length ? (
              <ul className="mt-4 space-y-2">
                {edu.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm text-[var(--text-muted)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
