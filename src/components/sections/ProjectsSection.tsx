import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsSection() {
  const projects = portfolioData.projects
    .filter((project) => !project.featured)
    .sort((a, b) => a.priority - b.priority);

  if (!projects.length) return null;

  return (
    <section id="projects" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="06  /  Also built"
            title="Analysis, models, and system design"
            description="Dashboards, machine-learning workflows, data modeling, and project planning. Open any row for the full write-up."
          />
        </Reveal>

        <ol className="mt-10 border-t border-[var(--border)]">
          {projects.map((project, index) => (
            <li key={project.id} className="border-b border-[var(--border)]">
              <Reveal delay={Math.min(index * 40, 160)}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid gap-3 py-6 md:grid-cols-[3.5rem_11rem_1fr_auto] md:items-center md:gap-6"
                >
                  <span className="font-mono text-xs text-[var(--text-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                    {project.category}
                  </span>
                  <span>
                    <span className="display block text-2xl text-[var(--text)] transition group-hover:text-[var(--accent)]">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--text-muted)]">
                      {project.summary}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </span>
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 text-[var(--text-subtle)] transition group-hover:text-[var(--accent)] md:block" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
