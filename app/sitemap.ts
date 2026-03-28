import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getEventsForSitemap } from "@/lib/events-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const events = await getEventsForSitemap();

  const staticRoutes = [
    "",
    "/about",
    "/gdg",
    "/gsa",
    "/gallery",
    "/events",
    "/sc2026-help",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.id}`,
    lastModified: new Date(event.date),
    changeFrequency: "monthly",
    priority: 0.8,
  })) as MetadataRoute.Sitemap;

  return [...staticRoutes, ...eventRoutes];
}
