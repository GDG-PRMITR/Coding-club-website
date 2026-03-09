import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent-purple to-accent-green px-6 py-16 text-white shadow-lg">
      <div className="absolute -top-8 -right-6 h-28 w-28 rounded-full bg-white/15 blur-2xl" aria-hidden />
      <div className="absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-accent-orange/30 blur-2xl" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm tracking-wide text-white/80">PRMITR Coding Club</p>
        <h1 className="font-display text-4xl font-black sm:text-6xl">Code. Create. Collaborate.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-white/90">
          Join a community of builders, learners, and innovators shaping the future of technology at PRMITR.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/about" className="rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:scale-[1.02]">
            Join Us
          </Link>
          <Link
            href="/about#sub-clubs"
            className="rounded-full border border-white/80 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Clubs
          </Link>
        </div>
      </div>
    </section>
  );
}
