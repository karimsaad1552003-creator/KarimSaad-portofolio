"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send, Download, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button, LinkButton } from "@/components/ui/Button";

export function ContactSection() {
  const { personal, cv } = portfolioData;
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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
    <section id="contact" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Hire me"
            title="Let’s build something meaningful."
            description="Recruiters and hiring managers — reach out directly. I respond professionally and quickly."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[var(--surface)]"
              >
                <Mail className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Email</p>
                  <p className="text-sm text-[var(--text-muted)]">{personal.email}</p>
                </div>
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[var(--surface)]"
              >
                <Phone className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Phone</p>
                  <p className="text-sm text-[var(--text-muted)]">{personal.phone}</p>
                </div>
              </a>
              <div className="flex items-start gap-3 rounded-xl p-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Location</p>
                  <p className="text-sm text-[var(--text-muted)]">{personal.location}</p>
                </div>
              </div>
              <LinkButton href={cv.downloadUrl} download={cv.fileName} variant="secondary" className="w-full">
                <Download className="h-4 w-4" />
                Download CV
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form
              onSubmit={onSubmit}
              className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-[var(--text-muted)]">Name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-[var(--text-muted)]">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[var(--text-muted)]">Company / Organization</span>
                <input
                  name="company"
                  autoComplete="organization"
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[var(--text-muted)]">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  placeholder="Role, team, timeline, or anything relevant…"
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
                    Opens your email client with a pre-filled message to {personal.email}
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
