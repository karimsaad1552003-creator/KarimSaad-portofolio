import { ArrowDownRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function HeroSection() {
  const { personal, cv, stats } = portfolioData;
  const degree = portfolioData.education[0];
  const country = personal.location.split(",").pop()?.trim() ?? personal.location;

  return (
    <section id="home" className="relative overflow-x-clip pt-28 md:pt-32">
      <div className="container-page pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-xs text-[var(--text-muted)]">Open to new roles</span>
            <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden />
            <span className="text-xs text-[var(--text-subtle)]">{country}</span>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
            {personal.title}
          </p>

          <h1 className="display mt-4 text-5xl text-[var(--text)] sm:text-7xl lg:text-[5.5rem] lg:leading-[0.95] text-balance">
            {personal.fullName}
          </h1>

          <p className="display mt-7 max-w-3xl text-2xl italic leading-snug text-[var(--text)] md:text-[2rem] text-balance">
            {personal.positioning}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            {personal.shortBio}
          </p>

          {degree ? (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
              {degree.degree}
              {degree.end ? ` · ${degree.end}` : ""}
            </p>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LinkButton href="/#client-work" variant="primary" size="lg">
              View live work
              <ArrowDownRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={cv.downloadUrl} download={cv.fileName} variant="secondary" size="lg">
              <Download className="h-4 w-4" />
              Download CV
            </LinkButton>
          </div>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-3 gap-6 border-t border-[var(--border)] pt-7">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="display text-4xl text-[var(--text)] md:text-5xl">{stat.value}</dd>
              <dt className="mt-1 text-xs leading-snug text-[var(--text-muted)] md:text-sm">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <SocialLinks className="mt-8" exclude={["website"]} variant="pill" />
      </div>
    </section>
  );
}
