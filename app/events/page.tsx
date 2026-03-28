import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";
import { getEvents } from "@/lib/events-store";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse all PRMITR Coding Club events with search and filters.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Coding Club PRMITR Events",
    description: "Browse all PRMITR Coding Club events with search and filters.",
    url: "/events",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-4xl font-bold">Events</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Discover workshops, meetups, competitions, and community gatherings.
        </p>
      </section>
      <EventsExplorer events={events} />
    </div>
  );
}
