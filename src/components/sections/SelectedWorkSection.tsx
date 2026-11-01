import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { featuredProjects, type Project } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

function domain(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
      {project.category}
    </p>
  );
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <li key={tech} className="chip">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
      >
        Read the case
        <ArrowUpRight className="h-4 w-4" />
      </Link>
      {project.liveUrl ? (
        <LinkButton
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
        >
          {domain(project.liveUrl)}
          <ExternalLink className="h-3.5 w-3.5" />
        </LinkButton>
      ) : null}
    </div>
  );
}

function Shot({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (!project.image) return null;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden bg-[var(--surface)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-[var(--text-subtle)]">
          {domain(project.liveUrl) || project.title}
        </span>
        {project.liveUrl ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
            Live
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={project.image}
          alt={`${project.title} homepage`}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}

export function SelectedWorkSection() {
  const [lead, ...rest] = featuredProjects;
  if (!lead) return null;

  return (
    <section id="work" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="02  /  Selected work"
            title="Production products, shipped"
            description="Platforms, a technology studio, and applied AI — the work a hiring manager should see first."
          />
        </Reveal>

        <Reveal delay={80}>
          <article className="mt-12 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg)] lg:grid lg:grid-cols-2">
            <Shot project={lead} priority />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <Meta project={lead} />
              <h3 className="display mt-3 text-3xl text-[var(--text)] md:text-4xl text-balance">
                <Link href={`/projects/${lead.slug}`} className="transition hover:text-[var(--accent)]">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-[var(--text-subtle)]">{lead.subtitle}</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">{lead.summary}</p>
              <ul className="mt-5 space-y-2">
                {lead.highlights.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--text)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <TechList items={lead.technologies} />
              </div>
              <Actions project={lead} />
            </div>
          </article>
        </Reveal>

        {rest.length ? (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {rest.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg)]">
                  <Shot project={project} />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <Meta project={project} />
                    <h3 className="display mt-3 text-2xl text-[var(--text)] md:text-3xl text-balance">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition hover:text-[var(--accent)]"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                      {project.summary}
                    </p>
                    {project.highlights[0] ? (
                      <blockquote className="display mt-5 border-l-2 border-[var(--accent)] pl-4 text-lg italic leading-snug text-[var(--text)]">
                        {project.highlights[0]}
                      </blockquote>
                    ) : null}
                    <div className="mt-5">
                      <TechList items={project.technologies} />
                    </div>
                    <div className="mt-auto">
                      <Actions project={project} />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
