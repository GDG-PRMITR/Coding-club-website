import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";
import { getEvents } from "@/lib/events-store";

export const metadata: Metadata = {
  title: "Events, Workshops & Hackathons",
  description:
    "Discover upcoming events, workshops, and competitions at Prof. Ram Meghe Institute of Technology and Research (PRMITR). Explore activities from Coding Club, GDG, GSA.",
  keywords: [
    "PRMITR Events",
    "Coding Club PRMITR",
    "Technical Workshops Amravati",
    "Hackathons Maharashtra",
    "Engineering Events Badnera",
    "Cisco Networking Academy PRMITR",
    "GDG On Campus",
    "GSA Events",
    "E-Cell PRMITR workshops",
    "Student Competitions Amravati",
  ],
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Upcoming Events | Coding Club PRMITR",
    description:
      "Join workshops, hackathons, and community meetups at PRMITR. Stay updated with the latest in tech and innovation.",
    url: "/events",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

export default async function EventsPage() {
  const events = await getEvents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming Events at PRMITR Coding Club",
    description: "A list of workshops, hackathons, and technical events at Prof. Ram Meghe Institute of Technology and Research.",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://codingclub.prmitr.in/events/${event.id}`,
      name: event.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <section>
          <h1 className="font-display text-4xl font-bold">Events</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Discover workshops, meetups, competitions, and community gatherings at PRMITR.
          </p>
        </section>
        <EventsExplorer events={events} />

        {/* SEO Anchor - Institutional context */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-slate-500 dark:border-slate-800">
          <p className="mx-auto max-w-4xl text-sm italic">
            All events listed are officially recognized and organized by the <strong>Coding Club</strong> and its partner communities at 
            <strong> Prof. Ram Meghe Institute of Technology and Research (PRMITR)</strong>, Badnera. We host technical deep-dives,
            industry-standard workshops, and competitive hackathons to foster innovation and skill-building in Amravati.
          </p>
        </div>
      </div>
    </>
  );
}
