import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getOutboundLink } from '@/lib/outbound-links'

export const metadata: Metadata = {
  title: 'Redirecting',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function OutboundRedirectPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const link = getOutboundLink(key)

  if (!link) {
    notFound()
  }

  redirect(link.url)
}