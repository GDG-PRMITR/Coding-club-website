import type { Metadata } from "next";
import { gsaLead, gsaTeams } from "@/data/gsa";
import MemberProfileCard from "@/components/MemberProfileCard";

export const metadata: Metadata = {
  title: "GSA PRMITR Team",
  description: "Meet the Google Student Ambassador PRMITR lead and teams across GenAI, WebTech, PR, Social Media, and Graphics.",
  keywords: [
    "GSA PRMITR",
    "Google Student Ambassador PRMITR",
    "PRMITR ambassador team",
    "Google ambassador PRMITR",
  ],
  alternates: {
    canonical: "/gsa",
  },
  openGraph: {
    title: "GSA PRMITR Team",
    description: "Meet the Google Student Ambassador PRMITR lead and teams across GenAI, WebTech, PR, Social Media, and Graphics.",
    url: "/gsa",
  },
  icons: {
    icon: [{ url: "/logo/logo-gsac.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-gsac.png", type: "image/png" }],
  },
};

export default function GsaPage() {
  const totalTeamMembers = gsaTeams.reduce((total, team) => total + team.members.length, 0);

  return (
    <div className="space-y-9">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Google Student Ambassador</p>
        <h1 className="mt-2 font-display text-4xl font-bold">GSA PRMITR Team Directory</h1>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Lead</p>
            <p className="font-semibold">1 Member</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Teams</p>
            <p className="font-semibold">{gsaTeams.length} Teams</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Members</p>
            <p className="font-semibold">{totalTeamMembers} Members</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-center font-display text-3xl font-bold">GSA Lead</h2>
        <div className="mx-auto mt-4 max-w-[17.75rem]">
          <MemberProfileCard name={gsaLead.name} role={gsaLead.role} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-center font-display text-3xl font-bold">Teams</h2>
        {gsaTeams.map((team) => (
          <article key={team.name} className="space-y-5">
            <h3 className="text-center font-display text-2xl font-bold">{team.name}</h3>
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-4">
              {team.members.map((member) => (
                <MemberProfileCard key={`${team.name}-${member.name}`} name={member.name} role={member.role} />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
