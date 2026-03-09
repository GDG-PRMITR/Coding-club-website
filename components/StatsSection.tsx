"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/data/config";

function parseValue(raw: string) {
  const numeric = Number(raw.replace(/[^\d]/g, ""));
  return {
    numeric: Number.isNaN(numeric) ? 0 : numeric,
    hasPlus: raw.includes("+"),
  };
}

export default function StatsSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((previous) => Math.min(previous + 1, 30));
    }, 35);

    return () => window.clearInterval(interval);
  }, []);

  const mapped = useMemo(() => {
    return siteConfig.stats.map((item) => {
      const parsed = parseValue(item.value);
      const display = Math.floor((parsed.numeric * count) / 30);
      return {
        ...item,
        display: `${display}${parsed.hasPlus ? "+" : ""}`,
      };
    });
  }, [count]);

  return (
    <section className="grid gap-4 rounded-3xl bg-slate-100 p-6 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4">
      {mapped.map((item) => (
        <article key={item.label} className="rounded-2xl bg-white p-5 text-center dark:bg-slate-950">
          <p className="font-display text-3xl font-bold text-primary">{item.display}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
        </article>
      ))}
    </section>
  );
}
