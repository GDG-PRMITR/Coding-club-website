import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse all PRMITR Coding Club events with search and filters.",
};

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-4xl font-bold">Events</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Discover workshops, meetups, competitions, and community gatherings.
        </p>
      </section>
      <EventsExplorer />
    </div>
  );
}
