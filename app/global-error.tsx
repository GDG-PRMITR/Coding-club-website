"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <section className="max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-slate-900">
          <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            An unexpected error occurred. Please try again.
          </p>
          <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2 font-semibold text-white">
            Return Home
          </Link>
        </section>
      </body>
    </html>
  );
}