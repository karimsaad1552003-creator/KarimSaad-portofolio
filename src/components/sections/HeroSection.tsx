import Image from "next/image";
import { ArrowDownRight, Download, Mail, Github, Linkedin, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  phone: Mail,
  website: Globe,
};

export function HeroSection() {
  const { personal, socials, cv } = portfolioData;

  return (
    <section id="home" className="relative overflow-hidden grid-bg pt-28 md:pt-32">
      <div className="container-page section-pad !pt-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-xs text-[var(--text-muted)]">{personal.location}</span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:block" />
              <span className="hidden text-xs text-[var(--text-subtle)] sm:inline">
                Open to opportunities
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              {personal.title}
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl text-balance">
              {personal.fullName}
            </h1>

            <p className="mt-5 max-w-xl text-xl font-medium leading-snug text-[var(--text)] md:text-2xl text-balance">
              {personal.positioning}
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              {personal.shortBio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/#projects" variant="primary" size="lg">
                View My Work
                <ArrowDownRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton
                href={cv.downloadUrl}
                download={cv.fileName}
                variant="secondary"
                size="lg"
              >
                <Download className="h-4 w-4" />
                Download CV
              </LinkButton>
              <LinkButton href={`mailto:${personal.email}`} variant="ghost" size="lg">
                <Mail className="h-4 w-4" />
                Contact
              </LinkButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon] ?? Globe;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                  >
                    <Icon className="h-4 w-4" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <HeroVisual />
            <div className="pointer-events-none absolute -bottom-6 -left-4 hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2 shadow-xl sm:block">
              <Image
                src={personal.photo}
                alt={`${personal.fullName} professional portrait`}
                width={112}
                height={140}
                className="h-28 w-[5.5rem] rounded-xl object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
