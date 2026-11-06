import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ExternalLink, FileText } from "lucide-react";

function typeLabel(type: string) {
  return type
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

export function ExperienceList() {
  const items = portfolioData.experience;

  return (
    <ol className="space-y-5">
      {items.map((item, index) => (
        <li key={item.id}>
          <Reveal delay={Math.min(index * 40, 160)}>
            <article className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)] p-5 md:grid-cols-[11rem_1fr] md:gap-8 md:p-7">
              <div className="md:pt-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  {item.start} — {item.end}
                </p>
                <p className="mt-2 text-xs text-[var(--text-subtle)]">{typeLabel(item.type)}</p>
                {item.end === "Present" ? (
                  <p className="mt-3 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                    Current
                  </p>
                ) : null}
              </div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {item.logo ? <BrandLogo src={item.logo} alt={`${item.company} logo`} /> : null}
                    <div>
                      <h3 className="display text-2xl text-[var(--text)] md:text-[1.7rem]">{item.role}</h3>
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
                      className="flex gap-2.5 text-sm leading-relaxed text-[var(--text)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                {item.technologies?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.certificateUrl ? (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View certificate
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
