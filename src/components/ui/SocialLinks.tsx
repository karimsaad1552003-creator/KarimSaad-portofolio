import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  phone: Mail,
  website: Globe,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {portfolioData.socials.map((social) => {
        const Icon = iconMap[social.icon] ?? Globe;
        const external = social.href.startsWith("http");
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--accent)]"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {social.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
