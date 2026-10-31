import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function SkillsSection() {
  const categories = portfolioData.skills;

  return (
    <section id="skills" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="04  /  Capabilities"
            title="A stack you can scan in one pass"
            description="Languages, data, machine learning, analysis, security, and the client-facing skills I use alongside them."
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
        </div>
      </div>
    </section>
  );
}
