"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabItem = { id: string; label: string; content: ReactNode };

/** Tabs whose panel can also be opened by a matching URL hash (e.g. /#education). */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const baseId = useId();

  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.slice(1);
      if (items.some((item) => item.id === hash)) setActive(hash);
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [items]);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Experience and education"
        className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg)] p-1"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition",
                selected
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className="mt-10"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
