import Hero from "@/components/Hero";
import ClubCard from "@/components/ClubCard";
import EventCard from "@/components/EventCard";
import NewsletterForm from "@/components/NewsletterForm";
import StatsSection from "@/components/StatsSection";
import SpotlightSection from "@/components/SpotlightSection";
import FacultySection from "@/components/FacultySection";
import Link from "next/link";
import { clubs } from "@/data/clubs";
import { siteConfig } from "@/data/config";
import { events } from "@/data/events";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";

export default function Home() {
  const latestEvents = [...events]
    .sort((first, second) => +new Date(second.date) - +new Date(first.date))
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-6">
      <Hero />

      <section className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured Clubs</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Explore the four flagship clubs under Coding Club.</p>
          </div>
          <Link href="/about#sub-clubs" className="text-sm font-semibold text-primary">
            View All Clubs →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.subClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      <StatsSection />

      <SpotlightSection />

      <FacultySection />

      <section className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
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

      <section className="rounded-3xl bg-gradient-to-r from-primary to-accent-purple px-6 py-10 text-white shadow-lg">
        <h2 className="font-display text-3xl font-bold">Build With Us at {siteConfig.institution}</h2>
        <p className="mt-2 max-w-2xl text-white/90">
          Join our newsletter for upcoming workshops, coding challenges, and club announcements.
        </p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <NewsletterForm />
          <div className="flex items-center gap-3 text-sm">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
