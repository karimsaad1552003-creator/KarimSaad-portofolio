import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-start justify-center py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">404</p>
      <h1 className="display mt-4 text-4xl text-[var(--text)] md:text-6xl">This page isn’t here.</h1>
      <p className="mt-4 max-w-md text-[var(--text-muted)]">
        The address doesn’t match a page in this portfolio. The work is still on the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/">Back home</LinkButton>
        <LinkButton href="/#client-work" variant="secondary">
          View live work
        </LinkButton>
      </div>
    </div>
  );
}
