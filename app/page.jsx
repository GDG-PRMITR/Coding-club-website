import HomeClient from './home-client'

export const metadata = {
  title: {
    absolute: 'Coding Club PRMITR',
  },
  description: 'Coding Club PRMITR is a student-led tech community organizing coding events, workshops, and innovation programs in web, AI, cloud, and more.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Coding Club PRMITR',
    description: 'Student-led coding community at PRMITR with events, workshops, and innovation programs.',
    url: 'https://codingclub.prmitr.in/',
    type: 'website',
  },
}

export default function Page() {
  return <HomeClient />
}
