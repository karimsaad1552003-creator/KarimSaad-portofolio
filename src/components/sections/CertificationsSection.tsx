import { portfolioData } from "@/data/portfolio";
import { Award, FileText } from "lucide-react";

export function CertificationGrid() {
  const items = portfolioData.certifications;
  if (!items.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((cert) => (
        <article
          key={cert.id}
          className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)] p-5"
        >
          <Award className="h-5 w-5 text-[var(--accent)]" aria-hidden />
          <h3 className="mt-4 text-base font-medium text-[var(--text)]">{cert.title}</h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
          <p className="mt-auto pt-4 text-xs text-[var(--text-subtle)]">
            {[cert.date, cert.note].filter(Boolean).join(" · ")}
          </p>
          {cert.fileUrl ? (
            <a
              href={cert.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
            >
              <FileText className="h-3.5 w-3.5" />
              View certificate
            </a>
          ) : null}
          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm text-[var(--accent)] hover:underline"
            >
              Verify credential
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
