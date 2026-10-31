import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  const { personal, education } = portfolioData;
  const degree = education[0];
  const [lead, ...rest] = personal.about;

  return (
    <section id="about" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="05  /  Profile"
            title="The short version"
            description="Information Systems graduate shipping full-stack products, with a background in data, AI, and client work."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={personal.photo}
                  alt={`${personal.fullName} at the College of Computing and Information Technology`}
                  width={720}
                  height={900}
                  className="aspect-[4/5] w-full object-cover object-[center_22%]"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                  {personal.location}
                </p>
                <p className="mt-2 text-sm text-[var(--text)]">
                  {degree?.degree}
                  {degree?.end ? ` · ${degree.end}` : ""}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{degree?.institution}</p>
              </div>
            </div>
          </Reveal>

          <div>
            {lead ? (
              <Reveal>
                <p className="text-lg leading-relaxed text-[var(--text)] md:text-xl">{lead}</p>
              </Reveal>
            ) : null}

            <div className="mt-6 space-y-4">
              {rest.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 32)} delay={60 + index * 40}>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={180}>
              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  Focus
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {personal.focusAreas.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
                {personal.languages.map((lang) => (
                  <div key={lang.name} className="bg-[var(--bg)] px-4 py-4">
                    <dt className="text-sm text-[var(--text)]">{lang.name}</dt>
                    <dd className="mt-1 text-xs text-[var(--text-subtle)]">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text)]">Currently working toward </span>
                {personal.currentlyToward}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
