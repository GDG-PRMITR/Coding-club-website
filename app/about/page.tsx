import type { Metadata } from "next";
import ClubCard from "@/components/ClubCard";
import DomainDirectory from "@/components/DomainDirectory";
import TeamCard from "@/components/TeamCard";
import { clubs } from "@/data/clubs";
import { faculty } from "@/data/teams";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about PRMITR Coding Club, its leadership, domains, and sub-clubs.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <h1 className="font-display text-4xl font-bold">About PRMITR Coding Club</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{clubs.mainClub.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950">
            <h2 className="font-semibold">Mission</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{clubs.mainClub.mission}</p>
          </article>
          <article className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950">
            <h2 className="font-semibold">Vision</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{clubs.mainClub.vision}</p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold">Leadership</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <TeamCard name={clubs.mainClub.lead.name} role={clubs.mainClub.lead.role} photo={clubs.mainClub.lead.photo} />
          <TeamCard name={clubs.mainClub.coLead.name} role={clubs.mainClub.coLead.role} photo={clubs.mainClub.coLead.photo} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold">Club Structure</h2>
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 text-sm dark:border-white/10 dark:bg-slate-900">
          <p>Main Club → Sub-Clubs → Domains</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
            <li>Main Club: PRMITR Coding Club</li>
            <li>Sub-Clubs: GDG, GSA, Cisco, NVIDIA</li>
            <li>Domains: Web, AI/ML, App Dev, Cloud, Data Science, DSA, IoT, Placement, Social Media, Community</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold">Domains</h2>
        <div className="mt-6">
          <DomainDirectory />
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold">Faculty Members</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faculty.map((member) => (
            <article key={member.name} className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sub-clubs">
        <h2 className="font-display text-3xl font-bold">Sub-Clubs</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.subClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>
    </div>
  );
}
