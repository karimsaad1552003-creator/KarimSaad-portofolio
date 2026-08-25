import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Award, FileText } from "lucide-react";

export function CertificationsSection() {
  const items = portfolioData.certifications;
  if (!items.length) return null;

  return (
    <section id="certifications" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials & continuous learning"
            description="Verified learning milestones — no invented awards."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <Award className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="mt-4 text-base font-semibold text-[var(--text)]">{cert.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
                <div className="mt-auto pt-4 text-xs text-[var(--text-subtle)]">
                  {[cert.date, cert.note].filter(Boolean).join(" · ")}
                </div>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
