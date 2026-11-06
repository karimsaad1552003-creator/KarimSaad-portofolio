import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function SkillsSection() {
  const categories = portfolioData.skills;
  const spoken = portfolioData.personal.languages;

  return (
    <section id="skills" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="03  /  Capabilities"
            title="A stack you can scan in one pass"
            description="Full-stack web, integrations, data, machine learning, and IoT — plus the languages I work and communicate in."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={Math.min(index * 50, 200)}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {category.label}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--text)]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          {spoken.length ? (
            <Reveal delay={200}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  Languages I speak
                </p>
                <dl className="mt-4 divide-y divide-[var(--border)]">
                  {spoken.map((lang) => (
                    <div key={lang.name} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                      <dt className="text-sm text-[var(--text)]">{lang.name}</dt>
                      <dd className="text-xs text-[var(--text-subtle)]">{lang.level}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
