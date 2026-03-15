import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDG Team',
  description: 'Meet the GDG x Coding Club team at PRMITR, including leads, core members, and domain teams.',
  alternates: {
    canonical: '/gdg',
  },
  openGraph: {
    title: 'GDG Team | Coding Club PRMITR',
    description: 'Explore the GDG and Coding Club leadership, core committee, and domain members at PRMITR.',
    url: 'https://codingclub.prmitr.in/gdg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG Team | Coding Club PRMITR',
    description: 'Explore the GDG and Coding Club leadership, core committee, and domain members at PRMITR.',
  },
}

export default function GdgLayout({ children }: { children: React.ReactNode }) {
  return children
}
