"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabItem = { id: string; label: string; content: ReactNode };

/** Tabs whose panel can also be opened by a matching URL hash (e.g. /#education). */
export function Tabs({
  items,
  className,
  label = "Experience and education",
}: {
  items: TabItem[];
  className?: string;
  label?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const baseId = useId();
  const tabIds = items.map((item) => item.id).join("|");

  useEffect(() => {
    const ids = tabIds.split("|");
    const syncWithHash = () => {
      const hash = window.location.hash.slice(1);
      if (ids.includes(hash)) setActive(hash);
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [tabIds]);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="flex rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-1"
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
              onClick={() => {
                setActive(item.id);
                const url = new URL(window.location.href);
                url.hash = item.id;
                window.history.replaceState(null, "", url);
              }}
              className={cn(
                "flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition",
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
