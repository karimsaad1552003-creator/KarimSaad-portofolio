"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Screen = { src: string; label: string };

export function DeviceShowcase({
  name,
  screens,
  mobile,
}: {
  name: string;
  screens: Screen[];
  mobile?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = screens.length;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] px-4 pb-10 pt-6 sm:px-8">
      <div className="mx-auto w-[88%] rounded-xl border border-white/10 bg-[#0b0f14] p-1.5 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-1.5 px-2 pb-1.5 pt-0.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate text-[10px] text-white/50">{screens[index]?.label}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black">
          {screens.map((screen, i) => (
            <Image
              key={screen.src}
              src={screen.src}
              alt={`${name}: ${screen.label} page on desktop`}
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className={cn(
                "object-cover object-top transition duration-700 group-hover:scale-[1.03]",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      {mobile ? (
        <div className="absolute bottom-4 right-3 w-[22%] max-w-[120px] rounded-[1.1rem] border-[3px] border-[#0b0f14] bg-[#0b0f14] shadow-2xl shadow-black/50 sm:right-6">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[0.85rem]">
            <Image
              src={mobile}
              alt={`${name} home page on a phone`}
              fill
              sizes="120px"
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : null}

      {count > 1 ? (
        <div className="absolute bottom-3 left-4 flex items-center gap-2 sm:left-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous ${name} screen`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-1.5">
            {screens.map((screen, i) => (
              <button
                key={screen.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${screen.label}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-[var(--border-strong)]",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next ${name} screen`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
