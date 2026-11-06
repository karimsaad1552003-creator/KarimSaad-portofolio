import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { ExperienceList } from "./ExperienceSection";
import { EducationList } from "./EducationSection";
import { CertificationGrid } from "./CertificationsSection";

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function AboutSection() {
  const { personal, education } = portfolioData;
  const degree = education[0];
  const [lead, ...rest] = personal.about;

  return (
    <section id="about" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="01  /  Profile" title="About me" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={personal.photo}
                  alt={`${personal.fullName} at the College of Computing and Information Technology`}
                  width={720}
                  height={900}
                  className="aspect-[4/5] w-full object-cover object-[center_22%]"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                  {personal.location}
                </p>
                <p className="mt-2 text-sm text-[var(--text)]">
                  {degree?.degree}
                  {degree?.end ? ` · ${degree.end}` : ""}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{degree?.institution}</p>
              </div>
            </div>
          </Reveal>

          <div>
            {lead ? (
              <Reveal>
                <p className="text-lg leading-relaxed text-[var(--text)] md:text-xl">{lead}</p>
              </Reveal>
            ) : null}

            <div className="mt-5 space-y-4">
              {rest.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 32)}>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <ul className="mt-8 space-y-2">
                <li>
                  <p className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text)]">
                    <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                    {personal.location}
                  </p>
                </li>
                <li>
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text)] transition hover:border-[var(--border-strong)]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                    {personal.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${personal.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text)] transition hover:border-[var(--border-strong)]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                    {formatPhone(personal.phone)}
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal>
              <ul className="mt-6 flex flex-wrap gap-2">
                {personal.focusAreas.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                {personal.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-16">
          <div id="experience" className="absolute -top-28" />
          <div id="education" className="absolute -top-28" />
          <div id="certifications" className="absolute -top-28" />
          <Reveal>
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 md:p-8">
              <h3 className="display text-3xl text-[var(--text)] md:text-4xl">Experience & education</h3>
              <Tabs
                className="mt-6"
                label="Experience, education, and certifications"
                items={[
                  { id: "experience", label: "Experience", content: <ExperienceList /> },
                  { id: "education", label: "Education", content: <EducationList /> },
                  { id: "certifications", label: "Certifications", content: <CertificationGrid /> },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
