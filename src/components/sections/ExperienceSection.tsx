import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ExternalLink } from "lucide-react";

function formatTenure(start: string, end: string, type: string) {
  const typeLabel = type
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
  let tenure = "";
  if (start && end && start === end) tenure = start;
  else if (!start && end) tenure = end;
  else if (start && !end) tenure = start;
  else if (start && end) tenure = `${start} — ${end}`;
  else tenure = typeLabel;

  if (tenure.toLowerCase() === typeLabel.toLowerCase()) return typeLabel;
  return `${typeLabel} · ${tenure}`;
}

export function ExperienceSection() {
  const items = portfolioData.experience;

  return (
    <section id="experience" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="What I did, how I did it, and why it mattered"
            description="Roles framed around problems solved and systems shipped — not a pasted CV timeline."
          />
        </Reveal>

        <ol className="relative mt-12 space-y-0 border-l border-[var(--border-strong)] pl-6 md:pl-8">
          {items.map((item, index) => (
            <li key={item.id} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[1.91rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-elevated)] md:-left-[2.16rem]" />
              <Reveal delay={index * 60}>
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      {item.logo ? <BrandLogo src={item.logo} alt={`${item.company} logo`} /> : null}
                      <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                        {formatTenure(item.start, item.end, item.type)}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {item.company}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                      </div>
                    </div>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
                      >
                        Visit
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                    {item.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.responsibilities.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2 text-sm text-[var(--text)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  {item.technologies?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-subtle)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
