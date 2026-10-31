"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import type { ClientSite } from "@/data/portfolio";
import { DeviceShowcase } from "@/components/ui/DeviceShowcase";
import { LinkButton, Button } from "@/components/ui/Button";

const INITIAL_COUNT = 4;

function host(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ClientSitesGrid({ sites }: { sites: ClientSite[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? sites : sites.slice(0, INITIAL_COUNT);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((site) => (
          <article
            key={site.id}
            className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
          >
            <DeviceShowcase name={site.name} screens={site.screens} mobile={site.mobile} />

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-start gap-3">
                {site.logo ? (
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-[var(--border)]">
                    <Image
                      src={site.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <h4 className="display text-2xl text-[var(--text)]">{site.name}</h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-[var(--text-subtle)]">
                    <span>{site.kind}</span>
                    <span aria-hidden>·</span>
                    <MapPin className="h-3 w-3" aria-hidden />
                    <span>{site.location}</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{site.summary}</p>

              <ul className="mt-4 space-y-1.5">
                {site.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm text-[var(--text)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {site.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <LinkButton
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  {host(site.url)}
                  <ExternalLink className="h-3.5 w-3.5" />
                </LinkButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {sites.length > INITIAL_COUNT ? (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
            {showAll ? "Show fewer websites" : `Show all ${sites.length} websites`}
            <ChevronDown className={`h-4 w-4 transition ${showAll ? "rotate-180" : ""}`} />
          </Button>
        </div>
      ) : null}
    </>
  );
}
