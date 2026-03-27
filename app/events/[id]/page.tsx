import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, type Event } from "@/data/events";

type EventDetailProps = {
  params: Promise<{ id: string }>;
};

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

function getEventStatus(date: string, time: string, endDate?: string): EventStatus {
  const now = new Date();
  const effectiveEndDate = endDate ?? date;

  // Multi-day events are treated as live for the full date range.
  if (endDate && endDate !== date) {
    const startOfRange = new Date(`${date}T00:00:00`);
    const endOfRange = new Date(`${effectiveEndDate}T23:59:59`);

    if (now < startOfRange) {
      return "UPCOMING";
    }
    if (now <= endOfRange) {
      return "LIVE";
    }
    return "PAST";
  }

  const parts = splitTimeRange(time);
  const startPart = parseTimePart(parts[0] ?? "");
  const endPart = parseTimePart(parts[1] ?? "");

  if (!startPart) {
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${effectiveEndDate}T23:59:59`);
    if (now < startOfDay) {
      return "UPCOMING";
    }
    if (now <= endOfDay) {
      return "LIVE";
    }
    return "PAST";
  }

  const start = new Date(`${date}T00:00:00`);
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

function getRelatedEvents(currentEvent: Event, allEvents: Event[], limit = 2) {
  const currentDate = new Date(`${currentEvent.date}T00:00:00`);

  const scored = allEvents
    .filter((item) => item.id !== currentEvent.id)
    .map((item) => {
      let score = 0;

      if (item.domain === currentEvent.domain) {
        score += 4;
      }
      if (item.club === currentEvent.club) {
        score += 3;
      }
      if (item.eventType === currentEvent.eventType) {
        score += 1;
      }

      const sharedTags = item.tags.filter((tag) => currentEvent.tags.includes(tag)).length;
      score += Math.min(sharedTags * 2, 6);

      const daysDiff = Math.abs(
        (new Date(`${item.date}T00:00:00`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysDiff <= 30) {
        score += 2;
      } else if (daysDiff <= 90) {
        score += 1;
      }

      const status = getEventStatus(item.date, item.time, item.endDate);
      if (status === "LIVE") {
        score += 2;
      } else if (status === "UPCOMING") {
        score += 1;
      }

      return { item, score };
    });

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return (
      new Date(`${a.item.date}T00:00:00`).getTime() - new Date(`${b.item.date}T00:00:00`).getTime()
    );
  });

  return scored.slice(0, limit).map((entry) => entry.item);
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((item) => item.id === id);
  if (!event) {
    return {
      title: "Event Not Found",
      robots: {
        index: false,
        follow: false,
      },
      icons: {
        icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
        apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
      },
    };
  }

  const iconByClub: Record<string, string> = {
    gsa: "/logo/logo-gsac.png",
    gdg: "/logo/logo-gdg.png",
    cisco: "/logo/logo-cisco.jpg",
    nvidia: "/logo/logo-nvidia.jpg",
  };

  const pageIcon = iconByClub[event.club] ?? "/logo/logo-coding-club.png";
  const pageIconType = pageIcon.endsWith(".jpg") ? "image/jpeg" : "image/png";
  const keywords = Array.from(
    new Set([
      event.title,
      event.eventType,
      event.club,
      event.domain,
      event.location,
      ...event.tags,
      ...event.organizers,
      "PRMITR",
      "Cisco Networking Academy",
      "student workshop",
    ]),
  );

  return {
    title: event.title,
    description: event.description,
    keywords,
    alternates: {
      canonical: `/events/${event.id}`,
    },
    openGraph: {
      title: event.title,
      description: event.description,
      url: `/events/${event.id}`,
      type: "article",
    },
    icons: {
      icon: [{ url: pageIcon, type: pageIconType }],
      apple: [{ url: pageIcon, type: pageIconType }],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const related = getRelatedEvents(event, events, 2);
  const status = getEventStatus(event.date, event.time, event.endDate);
  const isRegistrationOpen = status !== "PAST" && Boolean(event.registrationLink);

  return (
    <div className="space-y-8">
      <Link href="/events" className="text-sm font-semibold text-primary">
        ← Back to Events
      </Link>

      <section className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{event.eventType}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}>{status}</span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
            {event.club}
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold">{event.title}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{event.description}</p>
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-IN")}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Organizers:</strong> {event.organizers.join(", ")}
          </p>
        </div>
        {isRegistrationOpen ? (
          <a
            href={event.registrationLink!}
            target="_blank"
            rel="noreferrer"
            data-event-id={event.id}
            data-event-title={event.title}
            className="mt-6 inline-block rounded-md bg-primary px-5 py-2 font-semibold text-white"
          >
            Register Now
          </a>
        ) : (
          <p className="mt-6 text-sm text-slate-500">Registration is currently closed.</p>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Related Events</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/events/${item.id}`}
              className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
