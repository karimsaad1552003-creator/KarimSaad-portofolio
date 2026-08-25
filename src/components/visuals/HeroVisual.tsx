"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const NODES = [
  { id: "data", label: "Data", x: 18, y: 28 },
  { id: "ml", label: "ML/AI", x: 42, y: 18 },
  { id: "api", label: "APIs", x: 68, y: 26 },
  { id: "web", label: "Web", x: 82, y: 52 },
  { id: "bi", label: "BI", x: 58, y: 68 },
  { id: "sys", label: "Systems", x: 28, y: 72 },
  { id: "iot", label: "IoT", x: 12, y: 52 },
];

const EDGES: Array<[string, string]> = [
  ["data", "ml"],
  ["ml", "api"],
  ["api", "web"],
  ["data", "bi"],
  ["bi", "web"],
  ["sys", "api"],
  ["iot", "sys"],
  ["data", "sys"],
  ["ml", "bi"],
];

export function HeroVisual() {
  const [active, setActive] = useState("ml");
  const [reduceMotion, setReduceMotion] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const ids = NODES.map((n) => n.id);
    const timer = window.setInterval(() => {
      frame.current = (frame.current + 1) % ids.length;
      setActive(ids[frame.current]);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const nodeMap = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    [],
  );

  return (
    <div
      className="relative aspect-square w-full max-w-lg overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[0_30px_80px_-40px_var(--glow)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-bg opacity-80" />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--glow)] blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-[var(--glow)] blur-3xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-4">
        {EDGES.map(([a, b]) => {
          const from = nodeMap[a];
          const to = nodeMap[b];
          const lit = active === a || active === b;
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              className={lit ? "text-[var(--accent)]" : "text-[var(--border-strong)]"}
              strokeWidth={lit ? 0.55 : 0.28}
              strokeOpacity={lit ? 0.9 : 0.45}
            />
          );
        })}
        {NODES.map((node) => {
          const lit = active === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={lit ? 4.2 : 3.2}
                className={lit ? "fill-[var(--accent)]" : "fill-[var(--surface)]"}
                stroke="currentColor"
                strokeWidth={0.4}
              />
              <text
                x={node.x}
                y={node.y + 8.5}
                textAnchor="middle"
                className="fill-[var(--text-muted)]"
                style={{ fontSize: "3.2px", fontFamily: "var(--font-mono)" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] p-4 backdrop-blur-md">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
          Technical identity
        </p>
        <p className="mt-1 text-sm text-[var(--text)]">
          Software · Data · AI · Systems — connected end to end
        </p>
      </div>
    </div>
  );
}
