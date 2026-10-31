import { DoorOpen, GraduationCap, LayoutDashboard, MapPin } from "lucide-react";
import { portfolioData, type SystemProject } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ClientSitesGrid } from "./ClientSitesGrid";

const systemIcons: Record<SystemProject["icon"], typeof GraduationCap> = {
  school: GraduationCap,
  admin: LayoutDashboard,
  gate: DoorOpen,
};

export function ClientWorkSection() {
  const { clientSites, systems } = portfolioData;

  return (
    <section id="client-work" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="02  /  In the field"
            title="Websites and systems that are live"
            description="US business sites delivered with Vertex Reviews, and school and gate systems running through Ascendra."
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <h3 className="display text-2xl text-[var(--text)] md:text-3xl">Business websites</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Restaurants, markets, and local services across New York, New Jersey, and Massachusetts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-right">
              <span className="display block text-4xl text-[var(--text)]">{clientSites.length}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
                Live sites
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-8">
          <ClientSitesGrid sites={clientSites} />
        </div>

        <Reveal>
          <div className="mt-16 rounded-[2rem] bg-[var(--inverse)] px-6 py-10 text-[var(--inverse-fg)] md:px-10 md:py-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-inverse)]">
              Systems in production
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h3 className="display max-w-xl text-3xl md:text-4xl text-balance">
                School and gate systems, running now
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--inverse-muted)]">
                Built at Ascendra and in use by 2 schools and 1 gated community.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {systems.map((system, index) => {
                const Icon = systemIcons[system.icon];
                return (
                  <article
                    key={system.id}
                    className="flex h-full flex-col border-t border-[color-mix(in_oklab,var(--inverse-fg)_16%,transparent)] pt-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--inverse-fg)_8%,transparent)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-xs text-[var(--accent-inverse)]">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-inverse)]">
                      {system.kind}
                    </p>
                    <h4 className="display mt-2 text-2xl">{system.name}</h4>
                    {system.location ? (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--inverse-muted)]">
                        <MapPin className="h-3 w-3" />
                        {system.location}
                      </p>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-[var(--inverse-muted)]">
                      {system.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {system.features.map((feature) => (
                        <li key={feature} className="text-sm leading-relaxed">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {system.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[color-mix(in_oklab,var(--inverse-fg)_18%,transparent)] px-2.5 py-1 text-[11px] text-[var(--inverse-muted)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
