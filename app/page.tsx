import Hero from "@/components/Hero";
import ClubCard from "@/components/ClubCard";
import EventCard from "@/components/EventCard";
import NewsletterForm from "@/components/NewsletterForm";
import StatsSection from "@/components/StatsSection";
import SpotlightSection from "@/components/SpotlightSection";
import FacultySection from "@/components/FacultySection";
import Link from "next/link";
import { clubs } from "@/data/clubs";
import { events } from "@/data/events";

export default function Home() {
  const latestEvents = [...events]
    .sort((first, second) => +new Date(second.date) - +new Date(first.date))
    .slice(0, 3);

  return (
    <div className="space-y-14">
      <Hero />

      <section>
        <h2 className="font-display text-3xl font-bold">Featured Clubs</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Explore the four flagship clubs under PRMITR Coding Club.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.subClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      <StatsSection />

      <SpotlightSection />

      <FacultySection />

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">Latest Updates</h2>
          <Link href="/events" className="text-sm font-semibold text-primary">
            View All Events →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-primary to-accent-purple px-6 py-10 text-white">
        <h2 className="font-display text-3xl font-bold">Be Part of Our Community</h2>
        <p className="mt-2 text-white/90">Join our newsletter and stay updated on workshops, hackathons, and opportunities.</p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <NewsletterForm />
          <div className="flex gap-4 text-sm">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
