import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white px-6 py-12 shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">PRMITR Coding Club</p>
          <h1 className="font-display text-4xl font-black text-slate-900 dark:text-slate-50 sm:text-5xl">
            Code. Create. Collaborate.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            The official technical community at PRMITR focused on practical skills, collaborative projects,
            and industry-ready development across modern technology domains.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90">
              Join Us
            </Link>
            <Link
              href="/about#sub-clubs"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Explore Clubs
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
          <div className="relative h-60 w-full overflow-hidden rounded-xl">
            <Image src="/gallery/installation-ceremony-main.jpeg" alt="PRMITR Coding Club event" fill className="object-cover" priority />
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Building a culture of technical excellence through events, mentorship, and community learning.</p>
        </div>
      </div>
      <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 dark:bg-slate-950 dark:text-slate-300">Hands-on workshops and technical bootcamps</p>
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 dark:bg-slate-950 dark:text-slate-300">Cross-domain mentorship from senior members</p>
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 dark:bg-slate-950 dark:text-slate-300">Industry-aligned learning with active communities</p>
      </div>
    </section>
  );
}
