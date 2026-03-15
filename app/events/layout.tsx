import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming and past events by Coding Club PRMITR, including workshops, sessions, and community programs.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events | Coding Club PRMITR',
    description: 'Browse event schedules, highlights, and registrations from Coding Club PRMITR.',
    url: 'https://codingclub.prmitr.in/events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Coding Club PRMITR',
    description: 'Browse event schedules, highlights, and registrations from Coding Club PRMITR.',
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
