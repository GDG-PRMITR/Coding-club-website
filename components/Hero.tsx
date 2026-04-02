import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/config";

export default function Hero() {
  return (
    <section className="section-shell relative overflow-hidden">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <Image src={siteConfig.logo} alt="Coding Club logo" width={350} height={214} style={{ width: "30px", height: "auto" }} className="object-contain" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Coding Club</p>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Learn. Code. Create.
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            Collaborate • Develop • Share • Repeat
          </p>
          <p className="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            The official technical community at PRMITR focused on practical skills, collaborative projects,
            and industry-ready development across modern technology domains.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="w-full rounded-full bg-primary px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:w-auto">
              Join Us
            </Link>
            <Link
              href="/about#clubs"
              className="w-full rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 sm:w-auto"
            >
              Explore Clubs
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl sm:h-64">
            <Image src="/gallery/installation-ceremony-main.jpeg" alt="PRMITR Coding Club event" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Building a culture of technical excellence through events, mentorship, and community learning.</p>
        </div>
      </div>
      <div className="relative mt-8 grid gap-3 text-sm md:grid-cols-3">
        <p className="rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">Hands-on workshops and technical bootcamps</p>
        <p className="rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">Cross-domain mentorship from senior members</p>
        <p className="rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">Industry-aligned learning with active communities</p>
      </div>
    </section>
  );
}
