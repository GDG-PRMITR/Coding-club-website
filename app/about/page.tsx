import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Coding Club PRMITR",
  description: "Vision, mission, communities, and student tech initiatives at Coding Club PRMITR.",
  keywords: [
    "About Coding Club PRMITR",
    "PRMITR clubs",
    "GDG On Campus PRMITR",
    "GSA PRMITR",
    "Cisco Club PRMITR",
    "NVIDIA Club PRMITR",
    "E-Cell PRMITR",
    "Prof Ram Meghe Institute of Technology and Research",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Coding Club PRMITR",
    description: "Vision, mission, communities, and student tech initiatives at Coding Club PRMITR.",
    url: "/about",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

const communities = [
  {
    id: "gdg",
    name: "GDG",
    logo: "/logo/logo-gdg.png",
    description:
    "Google Developer Group: Building a collaborative environment for developers to learn and innovate.",
  },
  {
    id: "gsa",
    name: "GSA",
    logo: "/logo/logo-gsac.png",
    description:
      "Google Student Ambassadors: Connecting students with Google resources and opportunities for growth.",
    },
    {
    id: "nvidia",
    name: "NVIDIA",
    logo: "/logo/logo-nvidia.jpg",
    description:
      "NVIDIA Community: Fostering AI, ML, and GPU computing skills through events and projects.",
  },
  {
    id: "cisco",
    name: "Cisco",
    logo: "/logo/logo-cisco.jpg",
    description:
      "Cisco Networking Academy: Equipping students with networking and cybersecurity skills for the digital age.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Image src="/Coding-Club.png" alt="Coding Club Logo" width={44} height={44} className="object-contain" />
          <h1 className="font-display text-4xl font-bold">Coding Club</h1>
        </div>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          GDG Coding Club is dedicated to building a vibrant community for tech enthusiasts. We organize workshops,
          hackathons, and events to empower students and professionals to learn, collaborate, and innovate together.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Vision</p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            &ldquo;A thriving ecosystem of coders, united by Synergy, Trust, and Passion. Where ideas turn into
            innovation, collaboration fuels creativity, and technology serves humanity. Our vision is to inspire
            learners, empower leaders, and shape a digital future with pride for our nation.&rdquo;
          </p>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Mission</p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            &ldquo;To emerge as a Centre of Excellence in coding and technology, guided by Synergy, Trust, and Passion.
            We envision nurturing problem-solvers and innovators, empowering students with future-ready skills,
            fostering collaboration and creativity, building a community that inspires and uplifts, driving impactful
            projects for society, and contributing to national growth in the global arena.&rdquo;
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <h2 className="font-display text-3xl font-bold">Communities</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map((community) => (
            <article
              key={community.id}
              className="rounded-2xl border border-black/10 bg-slate-50 p-5 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-950"
            >
              <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-xl bg-white p-1 dark:bg-slate-900">
                <Image src={community.logo} alt={`${community.name} Logo`} fill className="object-contain" />
              </div>
              <h3 className="font-display text-xl font-bold">{community.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{community.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
