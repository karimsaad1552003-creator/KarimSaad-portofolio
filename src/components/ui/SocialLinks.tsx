import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { portfolioData, type SocialLink } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  phone: Mail,
  website: Globe,
};

export function SocialLinks({
  className,
  exclude = [],
  variant = "text",
}: {
  className?: string;
  exclude?: SocialLink["icon"][];
  variant?: "text" | "pill";
}) {
  const links = portfolioData.socials.filter((social) => !exclude.includes(social.icon));
  const pill = variant === "pill";

  return (
    <ul className={cn("flex flex-wrap items-center", pill ? "gap-3" : "gap-x-5 gap-y-2", className)}>
      {links.map((social) => {
        const Icon = iconMap[social.icon] ?? Globe;
        const external = social.href.startsWith("http");
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={cn(
                "group inline-flex items-center gap-2 transition",
                pill
                  ? "rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] py-1.5 pl-1.5 pr-4 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  : "text-sm text-[var(--text-muted)] hover:text-[var(--accent)]",
              )}
            >
              {pill ? (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-fg)]">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              ) : (
                <Icon className="h-4 w-4" aria-hidden />
              )}
              {social.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
