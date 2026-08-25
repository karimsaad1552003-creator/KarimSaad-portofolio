import { Download, Eye } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export function ResumeSection() {
  const { cv, personal } = portfolioData;

  return (
    <section id="resume" className="section-pad border-y border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Resume"
              title="ATS-ready CV for recruiters"
              description="Download or view the same curriculum vitae file provided for applications — clean, printable, and ready to share."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {personal.fullName}
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{cv.fileName}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <LinkButton href={cv.viewUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <Eye className="h-4 w-4" />
                  View CV
                </LinkButton>
                <LinkButton href={cv.downloadUrl} download={cv.fileName} variant="primary">
                  <Download className="h-4 w-4" />
                  Download CV
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
