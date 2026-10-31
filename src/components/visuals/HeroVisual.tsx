import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

function VertexCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]">
      <div className="relative aspect-[16/10]">
        <Image
          src="/assets/projects/vertex/homepage.png"
          alt="Vertex Reviews homepage, live for a US reputation-management company"
          fill
          sizes="(max-width: 640px) 60vw, 280px"
          className="object-cover object-top"
        />
      </div>
      <p className="truncate px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
        Vertex Reviews · New Jersey
      </p>
    </div>
  );
}

function Portrait() {
  const { personal } = portfolioData;
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-[var(--shadow)]">
      <Image
        src={personal.photo}
        alt={`${personal.fullName} at the College of Computing`}
        width={280}
        height={360}
        className="aspect-[4/5] w-full rounded-xl object-cover object-[center_18%] sm:aspect-auto sm:h-36"
      />
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl sm:pb-16 lg:mx-0 lg:mt-16 lg:max-w-none">
      <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-[#e7b8a4]" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#e6d3a3]" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#b7c7b0]" aria-hidden />
          <span className="ml-2 truncate font-mono text-[11px] text-[var(--text-subtle)]">
            ascendrasol.com
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
            Live
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/assets/projects/ascendra/homepage.png"
            alt="Ascendra studio homepage, a product shipped as a full stack developer"
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1.4fr_0.85fr] gap-3 sm:hidden">
        <VertexCard />
        <Portrait />
      </div>

      <div className="absolute -bottom-2 -left-4 hidden w-[48%] sm:block lg:-left-2">
        <VertexCard />
      </div>
      <div className="absolute -right-1 bottom-20 hidden w-[4.75rem] sm:block lg:-right-2 lg:bottom-24 lg:w-24">
        <Portrait />
      </div>
    </div>
  );
}
