"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send, Download, CheckCircle2, Linkedin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button, LinkButton } from "@/components/ui/Button";

const field =
  "w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]";

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function ContactSection() {
  const { personal, cv, socials } = portfolioData;
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const linkedin = socials.find((social) => social.icon === "linkedin");
  const tel = personal.phone.startsWith("0")
    ? `+20${personal.phone.slice(1)}`
    : personal.phone;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      company ? `Portfolio inquiry from ${name} (${company})` : `Portfolio inquiry from ${name}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
    );

    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <section id="contact" className="section-pad border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="07  /  Contact"
            title="If the work fits, let's talk."
            description="Hiring managers and recruiters — write directly about software, data, or AI roles."
          />
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-[var(--border)] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col bg-[var(--inverse)] p-7 text-[var(--inverse-fg)] md:p-10">
              <p className="display text-4xl leading-tight md:text-5xl text-balance">
                Tell me about the role.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--inverse-muted)]">
                {personal.currentlyToward}
              </p>

              <div className="mt-8 space-y-1">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-start gap-3 rounded-xl px-2 py-3 transition hover:bg-[color-mix(in_oklab,var(--inverse-fg)_6%,transparent)]"
                >
                  <Mail className="mt-0.5 h-4 w-4 text-[var(--accent-inverse)]" />
                  <span>
                    <span className="block text-xs text-[var(--inverse-muted)]">Email</span>
                    <span className="mt-0.5 block break-all text-sm">{personal.email}</span>
                  </span>
                </a>
                <a
                  href={`tel:${tel}`}
                  className="flex items-start gap-3 rounded-xl px-2 py-3 transition hover:bg-[color-mix(in_oklab,var(--inverse-fg)_6%,transparent)]"
                >
                  <Phone className="mt-0.5 h-4 w-4 text-[var(--accent-inverse)]" />
                  <span>
                    <span className="block text-xs text-[var(--inverse-muted)]">Phone</span>
                    <span className="mt-0.5 block text-sm">{formatPhone(personal.phone)}</span>
                  </span>
                </a>
                <div className="flex items-start gap-3 rounded-xl px-2 py-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[var(--accent-inverse)]" />
                  <span>
                    <span className="block text-xs text-[var(--inverse-muted)]">Location</span>
                    <span className="mt-0.5 block text-sm">{personal.location}</span>
                  </span>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {linkedin ? (
                  <LinkButton
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </LinkButton>
                ) : null}
                <LinkButton href={cv.downloadUrl} download={cv.fileName} variant="secondary" size="sm">
                  <Download className="h-3.5 w-3.5" />
                  Download CV
                </LinkButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form onSubmit={onSubmit} className="bg-[var(--bg-elevated)] p-7 md:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-[var(--text-muted)]">Name</span>
                  <input required name="name" autoComplete="name" className={`${field} h-11`} />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-[var(--text-muted)]">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={`${field} h-11`}
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[var(--text-muted)]">Company</span>
                <input name="company" autoComplete="organization" className={`${field} h-11`} />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[var(--text-muted)]">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className={`${field} py-3`}
                  placeholder="Role, team, or what you're hiring for"
                />
              </label>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit" variant="primary">
                  <Send className="h-4 w-4" />
                  Send message
                </Button>
                {status === "sent" ? (
                  <p className="inline-flex items-center gap-2 text-sm text-[var(--accent)]">
                    <CheckCircle2 className="h-4 w-4" />
                    Opening your email client…
                  </p>
                ) : (
                  <p className="text-xs text-[var(--text-subtle)]">
                    Opens an email to {personal.email}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
