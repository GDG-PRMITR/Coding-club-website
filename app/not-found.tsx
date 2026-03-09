import Link from "next/link";

export default function NotFound() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-10 text-center dark:border-white/10 dark:bg-slate-900">
      <h1 className="font-display text-4xl font-bold">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2 font-semibold text-white">
        Go Home
      </Link>
    </section>
  );
}
