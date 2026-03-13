import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Sc2026HelpPage } from '@/app/sc2026-help/sc2026-help-page'
import './sc2026-help.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Solution Challenge 2026 Onboarding',
  description:
    'Step-by-step guide to register for Solution Challenge 2026 and represent GDG On Campus PRMIT&R.',
  alternates: {
    canonical: '/sc2026-help',
  },
  openGraph: {
    title: 'Solution Challenge 2026 Onboarding',
    description:
      'Step-by-step guide to register for Solution Challenge 2026 and represent GDG On Campus PRMIT&R.',
    url: 'https://codingclub.prmitr.in/sc2026-help',
    images: [
      {
        url: '/assets/logos/gdg-on-campus-dark.png',
        alt: 'GDG On Campus PRMIT&R',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solution Challenge 2026 Onboarding',
    description:
      'Step-by-step guide to register for Solution Challenge 2026 and represent GDG On Campus PRMIT&R.',
    images: ['/assets/logos/gdg-on-campus-dark.png'],
  },
}

export default function Sc2026HelpRoute() {
  return <Sc2026HelpPage fontClassName={outfit.className} />
}
