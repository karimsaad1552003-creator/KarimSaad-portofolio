import { portfolioData } from "@/data/portfolio";
import { footerNav } from "@/lib/nav";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const { personal, cv } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-12">
          <div>
            <p className="display text-3xl text-[var(--text)]">{personal.fullName}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
              {personal.positioning}
            </p>
            <p className="mt-4 text-sm text-[var(--text-subtle)]">
              {personal.title}
              <span aria-hidden> · </span>
              {personal.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
              On this page
            </p>
            <ul className="mt-4 space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={cv.downloadUrl}
                  download={cv.fileName}
                  className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
              Connect
            </p>
            <SocialLinks className="mt-4 flex-col items-start gap-3" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personal.fullName}. All rights reserved.
          </p>
          <p>Full stack · Data · AI</p>
        </div>
      </div>
    </footer>
  );
}
