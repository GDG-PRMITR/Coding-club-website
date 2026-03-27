import Link from "next/link";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

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

function getStatusClasses(status: EventStatus) {
  if (status === "LIVE") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  }
  if (status === "UPCOMING") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  }
  return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const status = getEventStatus(event);

  return (
    <Link
      href={`/events/${event.id}`}
      className="block rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/10 dark:bg-slate-900"
    >
      <article>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{event.eventType}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}>{status}</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              {event.club}
            </span>
          </div>
          <span className="text-xs text-slate-500">{formattedDate}</span>
        </div>
        <h3 className="font-display text-xl font-bold">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
        <p className="mt-2 text-sm">{event.location}</p>
        <p className="text-xs text-slate-500">{event.time}</p>
        <p className="text-xs text-slate-500">By {event.organizers.join(", ")}</p>
      </article>
    </Link>
  );
}
