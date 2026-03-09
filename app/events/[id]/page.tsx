import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((item) => item.id === id);
  if (!event) {
    return { title: "Event Not Found" };
  }
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const related = events.filter((item) => item.domain === event.domain && item.id !== event.id).slice(0, 2);

  return (
    <div className="space-y-8">
      <Link href="/events" className="text-sm font-semibold text-primary">
        ← Back to Events
      </Link>

      <section className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{event.eventType}</span>
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
        {event.registrationOpen && event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
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
