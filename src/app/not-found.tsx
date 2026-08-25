import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-muted)]">
        The page you requested does not exist. Return home to continue exploring the portfolio.
      </p>
      <LinkButton href="/" className="mt-8">
        Back home
      </LinkButton>
      <Link href="/#projects" className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
        View projects
      </Link>
    </div>
  );
}
