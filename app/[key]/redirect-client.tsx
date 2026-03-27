'use client'

import { useEffect } from 'react'

type OutboundRedirectClientProps = {
  url: string
  label: string
}

export function OutboundRedirectClient({ url, label }: OutboundRedirectClientProps) {
  useEffect(() => {
    window.location.replace(url)
  }, [url])

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm">
        <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">Redirecting...</h1>
        <p className="mt-3 text-sm text-slate-700 md:text-base">
          You are leaving Coding Club and opening <strong>{label}</strong>.
        </p>
        <a
          href={url}
          rel="noreferrer"
          className="mt-5 inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Continue now
        </a>
      </section>
    </main>
  )
}
