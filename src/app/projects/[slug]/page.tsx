import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, portfolioData } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

const caseStudyOrder = [
  { key: "problem", label: "Problem" },
  { key: "research", label: "Research" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
  { key: "implementation", label: "Implementation" },
  { key: "challenges", label: "Challenges" },
  { key: "results", label: "Results" },
  { key: "lessons", label: "Lessons" },
] as const;

function domain(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const study = project.caseStudy;
  const technologies = study?.technologies?.length ? study.technologies : project.technologies;
  const backHref = project.featured ? "/#client-work" : "/#projects";
  const backLabel = project.featured ? "In the field" : "Projects";

  return (
    <article className="pt-28 md:pt-32">
      <header className="container-page pb-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          {project.category}
          {project.role ? ` · ${project.role}` : ""}
        </p>
        <h1 className="display mt-3 max-w-4xl text-4xl text-[var(--text)] md:text-6xl text-balance">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">{project.subtitle}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <LinkButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="primary">
              {domain(project.liveUrl)}
              <ExternalLink className="h-4 w-4" />
            </LinkButton>
          ) : null}
          {project.githubUrl ? (
            <LinkButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </LinkButton>
          ) : null}
        </div>
      </header>

      {project.image ? (
        <div className="container-page mb-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <span className="font-mono text-[11px] text-[var(--text-subtle)]">
                {domain(project.liveUrl) || project.title}
              </span>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]"
                >
                  Open
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : null}
            </div>
            <div className="relative aspect-[16/9]">
              <Image
                src={project.image}
                alt={`${project.title} homepage`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1200px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="container-page grid gap-10 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <aside className="h-fit lg:sticky lg:top-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
            Technologies
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          {project.highlights.length ? (
            <>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                Highlights
              </p>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>

        <div className="space-y-4">
          {caseStudyOrder.map((section) => {
            const value = study?.[section.key];
            if (!value) return null;
            return (
              <section
                key={section.key}
                className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8"
              >
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {section.label}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--text)]">{value}</p>
              </section>
            );
          })}

          {!study ? (
            <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                Overview
              </h2>
              {project.problem ? (
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text)]">Problem. </span>
                  {project.problem}
                </p>
              ) : null}
              {project.solution ? (
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text)]">Solution. </span>
                  {project.solution}
                </p>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
