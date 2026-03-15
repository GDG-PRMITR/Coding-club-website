import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse photos and highlights from Coding Club PRMITR events, workshops, hackathons, and community meetups.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Gallery | Coding Club PRMITR',
    description: 'Browse photos and highlights from Coding Club PRMITR events, workshops, hackathons, and community meetups.',
    url: 'https://codingclub.prmitr.in/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Coding Club PRMITR',
    description: 'Browse photos and highlights from Coding Club PRMITR events, workshops, hackathons, and community meetups.',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
