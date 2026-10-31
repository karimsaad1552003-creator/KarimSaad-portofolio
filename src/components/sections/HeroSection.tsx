import { ArrowDownRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function HeroSection() {
  const { personal, cv, stats } = portfolioData;
  const degree = portfolioData.education[0];

  return (
    <section id="home" className="relative overflow-x-clip pt-28 md:pt-32">
      <div className="container-page pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="mb-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-xs text-[var(--text-muted)]">Open to new roles</span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:block" aria-hidden />
              <span className="text-xs text-[var(--text-subtle)]">{personal.location}</span>
            </div>

            <p className="max-w-md text-balance font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
              {personal.title}
            </p>

            <h1 className="display mt-4 max-w-xl text-5xl text-[var(--text)] sm:text-6xl lg:text-[4.4rem] lg:leading-[0.98] text-balance">
              {personal.fullName}
            </h1>

            <p className="display mt-6 max-w-lg text-2xl italic leading-snug text-[var(--text)] md:text-[1.7rem] text-balance">
              {personal.positioning}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              {personal.shortBio}
            </p>

            {degree ? (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
                {degree.degree}
                {degree.end ? ` · ${degree.end}` : ""}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/#work" variant="primary" size="lg">
                View selected work
                <ArrowDownRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href={cv.downloadUrl} download={cv.fileName} variant="secondary" size="lg">
                <Download className="h-4 w-4" />
                Download CV
              </LinkButton>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-3xl text-[var(--text)] md:text-4xl">{stat.value}</dd>
                  <dt className="mt-1 text-xs leading-snug text-[var(--text-muted)]">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <SocialLinks className="mt-8" />
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
