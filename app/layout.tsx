import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SiteShell } from '@/components/site-shell'
import HeaderComponent from '@/components/header.component'

import LenisProvider from '@/providers/lenis.provider'
import './globals.css'

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
  title: 'Coding club',
  description: 'A coding club for everyone, by everyone. where you can learn, share and collaborate on projects.',
  keywords: ['coding', 'club', 'programming', 'development', 'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'html', 'css', 'web development', 'mobile development', 'game development', 'data science', 'machine learning', 'artificial intelligence', 'cloud computing', 'devops', 'cybersecurity'],
  creator: 'Coding club web team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` ${GoogleSansCode.variable} ${GoogleSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <LenisProvider >
        <HeaderComponent />
        <SiteShell>
          {children}
        </SiteShell>
          <FooterComponent />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
