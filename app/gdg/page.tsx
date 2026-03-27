import type { Metadata } from "next";
import { gdgCoreTeam, gdgDomains, gdgLeads } from "@/data/gdg";
import MemberProfileCard from "@/components/MemberProfileCard";

export const metadata: Metadata = {
  title: "GDG On Campus PRMITR Team",
  description: "Explore GDG On Campus PRMITR leads, core committee, domain executives, and members.",
  keywords: [
    "GDG On Campus PRMITR",
    "GDGoC PRMITR",
    "Google Developer Group PRMITR",
    "Google Student Developer Club PRMITR",
    "GDSC PRMITR",
    "GDG team PRMITR",
  ],
  alternates: {
    canonical: "/gdg",
  },
  openGraph: {
    title: "GDG On Campus PRMITR Team",
    description: "Explore GDG On Campus PRMITR leads, core committee, domain executives, and members.",
    url: "/gdg",
  },
  icons: {
    icon: [{ url: "/logo/logo-gdg.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-gdg.png", type: "image/png" }],
  },
};

export default function GdgPage() {
  const domainMembersCount = gdgDomains.reduce(
    (total, domain) => total + domain.executives.length + domain.members.length,
    0,
  );

  return (
    <div className="space-y-9">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">GDG On Campus</p>
        <h1 className="mt-2 font-display text-4xl font-bold">GDG PRMITR Team Directory</h1>
   
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Leads + Core</p>
            <p className="font-semibold">{gdgLeads.length + gdgCoreTeam.length} Members</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Domains</p>
            <p className="font-semibold">{gdgDomains.length} Active Domains</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Domain Team</p>
            <p className="font-semibold">{domainMembersCount} Members</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-center font-display text-3xl font-bold">Leads</h2>
        <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-4">
          {gdgLeads.map((member) => (
            <MemberProfileCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-center font-display text-3xl font-bold">Core Team</h2>
        <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-4">
          {gdgCoreTeam.map((member) => (
            <MemberProfileCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-center font-display text-3xl font-bold">Domains</h2>
        {gdgDomains.map((domain) => (
          <article
            key={domain.name}
            className="space-y-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
          >
            <h3 className="text-center font-display text-2xl font-bold">{domain.name}</h3>

            {domain.executives.length > 0 && (
              <div className="mt-4">
                <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary">Domain Executives</p>
                <div className="mx-auto mt-3 flex max-w-5xl flex-wrap justify-center gap-4">
                  {domain.executives.map((member) => (
                    <MemberProfileCard key={`${domain.name}-${member.name}`} name={member.name} role={member.role} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary">Domain Members</p>
              <div className="mx-auto mt-3 flex max-w-5xl flex-wrap justify-center gap-4">
                {domain.members.map((member) => (
                  <MemberProfileCard key={`${domain.name}-${member.name}`} name={member.name} role={member.role} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
