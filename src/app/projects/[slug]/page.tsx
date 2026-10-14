import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, portfolioData } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
  { key: "problem", label: "01 — Problem" },
  { key: "research", label: "02 — Research / Analysis" },
  { key: "solution", label: "03 — Solution" },
  { key: "architecture", label: "04 — Architecture" },
  { key: "implementation", label: "05 — Implementation" },
  { key: "challenges", label: "07 — Challenges" },
  { key: "results", label: "08 — Results" },
  { key: "lessons", label: "09 — Lessons Learned" },
] as const;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const study = project.caseStudy;

  return (
    <article className="pt-28 md:pt-32">
      <div className="container-page pb-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          {project.category}
          {project.role ? ` · ${project.role}` : ""}
        </p>
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-5xl text-balance">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)]">{project.subtitle}</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <LinkButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Live demo
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
      </div>

      {project.image ? (
        <div className="container-page mb-12">
          <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src={project.image}
              alt={`${project.title} homepage`}
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/45" />
            {project.logo ? (
              <div className="relative">
                <BrandLogo src={project.logo} alt={`${project.title} logo`} size="lg" />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="container-page mb-12">
          <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 grid-bg">
            {project.logo ? (
              <BrandLogo src={project.logo} alt={`${project.title} logo`} size="lg" />
            ) : (
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">
                {project.title}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container-page grid gap-10 pb-20 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 lg:sticky lg:top-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
            06 — Technologies
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.highlights.length ? (
            <>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                Key highlights
              </p>
              <ul className="mt-4 space-y-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-[var(--text-muted)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>

        <div className="space-y-8">
          {caseStudyOrder.map((section) => {
            const value = study?.[section.key];
            if (!value) return null;
            return (
              <section
                key={section.key}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8"
              >
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  {section.label}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">{value}</p>
              </section>
            );
          })}

          {!study ? (
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Overview
              </h2>
              {project.problem ? (
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text)]">Problem: </span>
                  {project.problem}
                </p>
              ) : null}
              {project.solution ? (
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text)]">Solution: </span>
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
