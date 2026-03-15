import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GSA Team',
  description: 'Meet the Google Student Ambassadors (GSA) team at PRMITR, bridging students with Google technologies and opportunities.',
  alternates: {
    canonical: '/gsa',
  },
  openGraph: {
    title: 'GSA Team | Coding Club PRMITR',
    description: 'Meet the Google Student Ambassadors (GSA) team at PRMITR, bridging students with Google technologies and opportunities.',
    url: 'https://codingclub.prmitr.in/gsa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GSA Team | Coding Club PRMITR',
    description: 'Meet the Google Student Ambassadors (GSA) team at PRMITR, bridging students with Google technologies and opportunities.',
  },
}

export default function GsaLayout({ children }: { children: React.ReactNode }) {
  return children
}
