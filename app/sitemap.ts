import type { MetadataRoute } from 'next'

const siteUrl = 'https://codingclub.prmitr.in'

type StaticRoute = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: StaticRoute[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/events', changeFrequency: 'daily', priority: 0.9 },
    { path: '/gallery', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/gdg', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/gsa', changeFrequency: 'weekly', priority: 0.8 },
  ]

  return routes
    .filter((route) => route.path && route.path.trim().length > 0)
    .map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
}
