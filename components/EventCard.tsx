import Link from "next/link";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{event.eventType}</span>
        <span className="text-xs text-slate-500">{formattedDate}</span>
      </div>
      <h3 className="font-display text-xl font-bold">{event.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
      <p className="mt-2 text-sm">{event.location}</p>
      <p className="text-xs text-slate-500">By {event.organizers.join(", ")}</p>
      <Link href={`/events/${event.id}`} className="mt-4 inline-block text-sm font-semibold text-primary">
        View details →
      </Link>
    </article>
  );
}
