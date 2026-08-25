"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { personal, cv } = portfolioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[4.25rem]">
        <Link
          href="/#home"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]"
        >
          {personal.firstName}
          <span className="text-[var(--accent)]">.</span>
          {personal.lastName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton
            href={cv.downloadUrl}
            download={cv.fileName}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            Download CV
          </LinkButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-[var(--border)] bg-[var(--bg-elevated)] lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-[var(--text)] hover:bg-[var(--surface)]"
            >
              {item.label}
            </a>
          ))}
          <LinkButton
            href={cv.downloadUrl}
            download={cv.fileName}
            variant="primary"
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            <Download className="h-4 w-4" />
            Download CV
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
