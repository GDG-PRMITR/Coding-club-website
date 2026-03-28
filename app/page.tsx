import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedClubs from "@/components/FeaturedClubs";
import EventCard from "@/components/EventCard";
import StatsSection from "@/components/StatsSection";
import SpotlightSection from "@/components/SpotlightSection";
import FacultySection from "@/components/FacultySection";
import Link from "next/link";
import { getEvents } from "@/lib/events-store";
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Coding Club PRMITR | Developer Community",
  description:
    "Join Coding Club PRMITR for workshops, hackathons, events, and student-led tech communities including GDG and GSA.",
  keywords: [
    "Coding Club PRMITR",
    "PRMITR Coding Club",
    "GDG On Campus PRMITR",
    "Google Developer Group PRMITR",
    "Google Student Developer Club PRMITR",
    "GDSC PRMITR",
    "GSA PRMITR",
    "Cisco Club PRMITR",
    "E-Cell PRMITR",
    "Prof Ram Meghe Institute of Technology and Research",
    "PRMITR",
    "MITRA",
    "mitra.ac.in",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coding Club PRMITR | Developer Community",
    description:
      "Join Coding Club PRMITR for workshops, hackathons, events, and student-led tech communities including GDG and GSA.",
    url: "/",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

export default async function Home() {
  const events = await getEvents();
  const latestEvents = [...events]
    .sort((first, second) => +new Date(second.date) - +new Date(first.date))
    .slice(0, 3);

  return (
    <div className="space-y-14 pb-6">
      <Hero />

      <FeaturedClubs />

      <StatsSection />

      <SpotlightSection />

      <FacultySection />

      <section className="section-shell">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">Latest Updates</h2>
          <Link href="/events" className="text-sm font-semibold text-primary">
            View All Events →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {latestEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <h2 className="font-display text-3xl font-bold">Join the Community</h2>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
          Stay connected with workshops, projects, and campus updates through official Coding Club channels.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://gdg.community.dev/gdg-on-campus-prof-ram-meghe-institute-of-technology-and-research-amravati-india/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Join GDG Community
          </a>

        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://chat.whatsapp.com/BcYDw0mLQWWBcg4vdaKQjD"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp Groups
          </a>
          <a
            href="https://www.instagram.com/gdg_on_campus_prmitr?igsh=aWZldDNvbmJnOHEz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram (GDG)
          </a>
          <a
            href="https://www.linkedin.com/company/gdsc-prmitr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://x.com/gdsc_prmitr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <XIcon className="h-4 w-4" /> X (Twitter)
          </a>
          <a
            href="https://instagram.com/gsac_prmitr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram (GSA)
          </a>
          <a
            href="https://github.com/GDG-PRMITR/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub (GDG PRMITR)
          </a>
        </div>
      </section>
    </div>
  );
}
