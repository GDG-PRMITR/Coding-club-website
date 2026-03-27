import { getMongoDb } from "@/lib/mongodb";

export type SiteStatsSummary = {
  total: number;
  last24h: number;
  metrics: {
    pageViews: number;
    visitors: number;
    eventPageVisits: number;
    eventDetailVisits: number;
    eventCardClicks: number;
    registerClicks: number;
    socialClicks: number;
    certificateChecks: number;
  };
  topPaths: Array<{ _id: string; views: number }>;
  topSocialTargets: Array<{ _id: string; clicks: number }>;
  topRegisteredEvents: Array<{ _id: string; clicks: number }>;
};

type StoredStat = {
  eventType: string;
  path: string;
  title: string;
  referrer: string;
  metadata: Record<string, unknown>;
  ip: string;
  userAgent: string;
  host: string;
  createdAt: Date;
};

export async function getSiteStatsSummary(): Promise<SiteStatsSummary> {
  const db = await getMongoDb();
  const col = db.collection<StoredStat>("site_stats");

  const total = await col.countDocuments();
  const last24h = await col.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  const pageViews = await col.countDocuments({ eventType: "page_view" });
  const eventPageVisits = await col.countDocuments({
    eventType: "page_view",
    path: { $regex: "^/events(?:$|\\?)" },
  });
  const eventDetailVisits = await col.countDocuments({
    eventType: "page_view",
    path: { $regex: "^/events/" },
  });
  const eventCardClicks = await col.countDocuments({ eventType: "event_card_click" });
  const registerClicks = await col.countDocuments({ eventType: "register_click" });
  const socialClicks = await col.countDocuments({ eventType: "social_click" });
  const certificateChecks = await col.countDocuments({ eventType: "certificate_check" });

  const visitorAgg = await col
    .aggregate([
      {
        $match: {
          eventType: { $in: ["page_view", "event_card_click", "register_click", "social_click"] },
          "metadata.sessionId": { $exists: true, $ne: "" },
        },
      },
      { $group: { _id: "$metadata.sessionId" } },
      { $count: "count" },
    ])
    .toArray();
  const visitors = visitorAgg[0]?.count ?? 0;

  const topPaths = await col
    .aggregate([
      { $match: { eventType: "page_view" } },
      { $group: { _id: "$path", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ])
    .toArray();

  const topSocialTargets = await col
    .aggregate([
      { $match: { eventType: "social_click" } },
      { $group: { _id: "$metadata.target", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
      { $limit: 10 },
    ])
    .toArray();

  const topRegisteredEvents = await col
    .aggregate([
      { $match: { eventType: "register_click" } },
      {
        $project: {
          registerKey: {
            $ifNull: [
              "$metadata.eventId",
              { $ifNull: ["$metadata.eventTitle", { $ifNull: ["$metadata.eventPath", "$metadata.target"] }] },
            ],
          },
        },
      },
      { $group: { _id: "$registerKey", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
      { $limit: 10 },
    ])
    .toArray();

  return {
    total,
    last24h,
    metrics: {
      pageViews,
      visitors,
      eventPageVisits,
      eventDetailVisits,
      eventCardClicks,
      registerClicks,
      socialClicks,
      certificateChecks,
    },
    topPaths: topPaths as Array<{ _id: string; views: number }>,
    topSocialTargets: topSocialTargets as Array<{ _id: string; clicks: number }>,
    topRegisteredEvents: topRegisteredEvents as Array<{ _id: string; clicks: number }>,
  };
}
