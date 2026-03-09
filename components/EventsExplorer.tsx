"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import { events, eventTypes } from "@/data/events";

type ViewMode = "grid" | "list";

export default function EventsExplorer() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [club, setClub] = useState("all");
  const [type, setType] = useState("all");
  const [scope, setScope] = useState<"all" | "upcoming" | "past">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const domains = Array.from(new Set(events.map((event) => event.domain)));
  const clubs = Array.from(new Set(events.map((event) => event.club)));

  const filtered = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      const queryMatch =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase());
      const domainMatch = domain === "all" || event.domain === domain;
      const clubMatch = club === "all" || event.club === club;
      const typeMatch = type === "all" || event.eventType === type;
      const date = new Date(event.date);
      const scopeMatch =
        scope === "all" || (scope === "upcoming" ? date >= now : date < now);
      return queryMatch && domainMatch && clubMatch && typeMatch && scopeMatch;
    });
  }, [query, domain, club, type, scope]);

  return (
    <section>
      <div className="mb-6 grid gap-3 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900 md:grid-cols-3">
        <input
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="all">All domains</option>
          {domains.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
          value={club}
          onChange={(e) => setClub(e.target.value)}
        >
          <option value="all">All clubs</option>
          {clubs.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All types</option>
          {eventTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
          value={scope}
          onChange={(e) => setScope(e.target.value as "all" | "upcoming" | "past")}
        >
          <option value="all">All dates</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <div className="flex items-center gap-2">
          <button
            className={`rounded-md px-4 py-2 text-sm ${viewMode === "grid" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm ${viewMode === "list" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-6 text-sm text-slate-500">No events found.</p> : null}
    </section>
  );
}
