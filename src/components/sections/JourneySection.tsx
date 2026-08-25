import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function JourneySection() {
  const steps = portfolioData.journey;
  if (!steps.length) return null;

  return (
    <section id="journey" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Professional journey"
            title="From foundation to production"
            description="A concise progression: education → learning → projects → experience → current focus → future direction."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 50}>
              <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                <p className="font-mono text-xs text-[var(--accent)]">{step.label}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
