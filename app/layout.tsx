import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SiteShell } from '@/components/site-shell'
import LenisProvider from '@/providers/lenis.provider'
import './globals.css'

const siteUrl = 'https://codingclub.prmitr.in'
const defaultTitle = 'Coding Club PRMITR'
const defaultDescription = 'Coding Club PRMITR is a student-led tech community organizing coding events, workshops, and innovation programs in web, AI, cloud, and more.'

const GoogleSansCode = localFont({
  src: [
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/font/GoogleSansCode/static/GoogleSansCode-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-google-sans-code',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui']
})

const GoogleSans = localFont({
  src: [
    {
      path: '../public/font/ProductSans/Product Sans Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/ProductSans/Product Sans Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/font/ProductSans/Product Sans Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/font/ProductSans/Product Sans Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    }
  ],
  variable: '--font-google-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui']
})


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: '/',
  },
  keywords: ['coding', 'club', 'programming', 'development', 'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'html', 'css', 'web development', 'mobile development', 'game development', 'data science', 'machine learning', 'artificial intelligence', 'cloud computing', 'devops', 'cybersecurity'],
  creator: 'Coding club web team',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: defaultTitle,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/logo/logo-coding-club.png',
        width: 1200,
        height: 630,
        alt: 'Coding Club PRMITR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/logo/logo-coding-club.png'],
  },
  verification: {
    google: 'UfcNu_lP-vFHNt4pQtU4A9_2Qaezu_WbEZvzN30OKMM',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: defaultTitle,
        url: siteUrl,
        logo: `${siteUrl}/logo/logo-coding-club.png`,
      },
      {
        '@type': 'WebSite',
        name: defaultTitle,
        url: siteUrl,
        inLanguage: 'en-IN',
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={` ${GoogleSansCode.variable} ${GoogleSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <LenisProvider >
        <SiteShell>
          {children}
        </SiteShell>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
