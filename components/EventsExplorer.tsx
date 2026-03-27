"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import { events, eventTypes, type Event } from "@/data/events";

type EventStatus = "LIVE" | "UPCOMING" | "PAST";

function parseTimePart(value: string) {
  const [hours, minutes] = value.trim().split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }
  return { hours, minutes };
}

function splitTimeRange(value: string) {
  return value.split(/[\u2013-]/);
}

function getEventStatus(event: Event): EventStatus {
  const now = new Date();
  const endDate = event.endDate ?? event.date;

  // Multi-day events are treated as live for the full date range.
  if (event.endDate && event.endDate !== event.date) {
    const startOfRange = new Date(`${event.date}T00:00:00`);
    const endOfRange = new Date(`${endDate}T23:59:59`);

    if (now < startOfRange) {
      return "UPCOMING";
    }
    if (now <= endOfRange) {
      return "LIVE";
    }
    return "PAST";
  }

  const parts = splitTimeRange(event.time);
  const startPart = parseTimePart(parts[0] ?? "");
  const endPart = parseTimePart(parts[1] ?? "");

  if (!startPart) {
    const startOfDay = new Date(`${event.date}T00:00:00`);
    const endOfDay = new Date(`${endDate}T23:59:59`);
    if (now < startOfDay) {
      return "UPCOMING";
    }
    if (now <= endOfDay) {
      return "LIVE";
    }
    return "PAST";
  }

  const start = new Date(`${event.date}T00:00:00`);
  start.setHours(startPart.hours, startPart.minutes, 0, 0);

  const end = new Date(start);
  if (endPart) {
    end.setHours(endPart.hours, endPart.minutes, 0, 0);
  } else {
    end.setHours(start.getHours() + 2, start.getMinutes(), 0, 0);
  }

  if (now < start) {
    return "UPCOMING";
  }
  if (now <= end) {
    return "LIVE";
  }
  return "PAST";
}

function getStartDateTime(event: Event) {
  const startPart = parseTimePart(splitTimeRange(event.time)[0] ?? "");
  const start = new Date(`${event.date}T00:00:00`);
  if (startPart) {
    start.setHours(startPart.hours, startPart.minutes, 0, 0);
  }
  return start;
}

export default function EventsExplorer() {
  const [query, setQuery] = useState("");
  const [club, setClub] = useState("all");
  const [type, setType] = useState("all");
  const [scope, setScope] = useState<"all" | "live" | "upcoming" | "past">("all");

  const clubs = Array.from(new Set(events.map((event) => event.club)));
  const scopeOptions: Array<{ key: "all" | "live" | "upcoming" | "past"; label: string }> = [
    { key: "all", label: "All" },
    { key: "live", label: "Live" },
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
  ];

  const filtered = useMemo(() => {
    const results = events.filter((event) => {
      const queryMatch =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase());
      const clubMatch = club === "all" || event.club === club;
      const typeMatch = type === "all" || event.eventType === type;
      const status = getEventStatus(event);
      const scopeMatch =
        scope === "all" ||
        (scope === "live" && status === "LIVE") ||
        (scope === "upcoming" && status === "UPCOMING") ||
        (scope === "past" && status === "PAST");
      return queryMatch && clubMatch && typeMatch && scopeMatch;
    });

    const statusPriority: Record<EventStatus, number> = {
      LIVE: 0,
      UPCOMING: 1,
      PAST: 2,
    };

    return results.sort((a, b) => {
      const aStatus = getEventStatus(a);
      const bStatus = getEventStatus(b);

      if (statusPriority[aStatus] !== statusPriority[bStatus]) {
        return statusPriority[aStatus] - statusPriority[bStatus];
      }

      const aStart = getStartDateTime(a).getTime();
      const bStart = getStartDateTime(b).getTime();

      if (aStatus === "PAST") {
        return bStart - aStart;
      }

      return aStart - bStart;
    });
  }, [query, club, type, scope]);

  return (
    <section>
      <div className="mb-6 grid gap-3 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900 md:grid-cols-2 lg:grid-cols-3">
        <input
          className="h-11 rounded-lg border border-black/10 px-3 text-sm dark:border-white/10 dark:bg-slate-950"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="h-11 rounded-lg border border-black/10 px-3 text-sm dark:border-white/10 dark:bg-slate-950"
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
          className="h-11 rounded-lg border border-black/10 px-3 text-sm dark:border-white/10 dark:bg-slate-950"
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
        <div className="flex items-center gap-2 overflow-x-auto md:col-span-2 lg:col-span-3">
          {scopeOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setScope(option.key)}
              className={`h-8 shrink-0 rounded-full border px-3 text-xs font-semibold transition ${
                scope === option.key
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-6 text-sm text-slate-500">No events found.</p> : null}
    </section>
  );
}
