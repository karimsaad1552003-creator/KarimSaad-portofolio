import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  phone: Mail,
  website: Globe,
};

export function Footer() {
  const { personal, socials } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {personal.fullName}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {personal.title} · {personal.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {socials.map((social) => {
            const Icon = iconMap[social.icon] ?? Globe;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon className="h-3.5 w-3.5" />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-[var(--text-subtle)] sm:flex-row sm:justify-between">
          <p>
            © {year} {personal.fullName}. All rights reserved.
          </p>
          <p>Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
