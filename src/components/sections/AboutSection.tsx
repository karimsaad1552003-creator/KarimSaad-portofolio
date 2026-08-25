import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Professional profile"
            title="Who I am — and what I build toward"
            description="A recruiter-friendly snapshot of my academic foundation, technical focus, and professional direction."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)]">
              <Image
                src={personal.photo}
                alt={`${personal.fullName} at the College of Computing`}
                width={720}
                height={900}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {personal.fullName}
                </p>
                <p className="text-sm text-white/80">{personal.title}</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {personal.about.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={100 + index * 60}>
                <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={320}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    Focus areas
                  </p>
                  <ul className="mt-3 space-y-2">
                    {personal.focusAreas.map((item) => (
                      <li key={item} className="text-sm text-[var(--text)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    Languages
                  </p>
                  <ul className="mt-3 space-y-2">
                    {personal.languages.map((lang) => (
                      <li
                        key={lang.name}
                        className="flex items-center justify-between gap-3 text-sm text-[var(--text)]"
                      >
                        <span>{lang.name}</span>
                        <span className="text-[var(--text-subtle)]">{lang.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <p className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text)]">Currently working toward: </span>
                {personal.currentlyToward}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
