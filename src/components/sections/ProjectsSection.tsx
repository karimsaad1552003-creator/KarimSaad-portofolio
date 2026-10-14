import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { featuredProjects, portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

function ProjectCover({
  title,
  image,
  category,
  logo,
}: {
  title: string;
  image?: string;
  category: string;
  logo?: string;
}) {
  const mark = logo ? (
    <BrandLogo src={logo} alt={`${title} logo`} size="lg" />
  ) : null;

  if (image) {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[var(--surface)]">
        <Image
          src={image}
          alt={`${title} homepage`}
          fill
          className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur">
          {category}
        </span>
        {mark ? <div className="relative">{mark}</div> : null}
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,var(--surface),var(--bg-elevated))] p-6">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <span className="absolute left-4 top-4 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-muted)]">
        {category}
      </span>
      {mark ? (
        <div className="relative">{mark}</div>
      ) : (
        <p className="relative font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
          {title}
        </p>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const secondary = portfolioData.projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.priority - b.priority);

  return (
    <section id="projects" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Featured work"
            title="Projects that prove what I can build"
            description="Prioritized case studies — problem, solution, role, and technologies. Open a project for the full engineering narrative."
          />
        </Reveal>

        <div className="mt-12 space-y-10">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <article className="group overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div
                  className={`grid lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ProjectCover
                    title={project.title}
                    image={project.image}
                    category={project.category}
                    logo={project.logo}
                  />
                  <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")} · {project.role}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-subtle)]">{project.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                      {project.summary}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {project.problem ? (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-subtle)]">
                            Problem
                          </p>
                          <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-3">
                            {project.problem}
                          </p>
                        </div>
                      ) : null}
                      {project.solution ? (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-subtle)]">
                            Solution
                          </p>
                          <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-3">
                            {project.solution}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {project.highlights.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[var(--text)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <LinkButton href={`/projects/${project.slug}`} variant="primary" size="sm">
                        Case study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </LinkButton>
                      {project.liveUrl ? (
                        <LinkButton
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="sm"
                        >
                          Live site
                          <ExternalLink className="h-3.5 w-3.5" />
                        </LinkButton>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 ? (
          <div className="mt-14">
            <Reveal>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Additional projects
              </h3>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {secondary.map((project, index) => (
                <Reveal key={project.id} delay={index * 50}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition hover:border-[var(--accent)]"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                      {project.category}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-[var(--text)]">
                      {project.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                      {project.summary}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
