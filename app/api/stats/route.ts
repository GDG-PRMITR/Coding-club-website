import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { getSiteStatsSummary } from "@/lib/site-stats";

type StatsPayload = {
  eventType?: string;
  path?: string;
  title?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
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

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function normalizePayload(value: unknown): StatsPayload {
  if (!value || typeof value !== "object") {
    return {};
  }
  return value as StatsPayload;
}

export async function POST(request: Request) {
  try {
    const body = normalizePayload(await request.json().catch(() => ({})));
    const db = await getMongoDb();

    const eventType = body.eventType?.trim() || "page_view";
    const path = body.path?.trim() || "unknown";

    const stat: StoredStat = {
      eventType,
      path,
      title: body.title?.trim() || "",
      referrer: body.referrer?.trim() || request.headers.get("referer") || "",
      metadata: body.metadata ?? {},
      ip: getClientIp(request),
      userAgent: request.headers.get("user-agent") || "",
      host: request.headers.get("host") || "",
      createdAt: new Date(),
    };

    await db.collection<StoredStat>("site_stats").insertOne(stat);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Stats ingest failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const summary = await getSiteStatsSummary();

    return NextResponse.json({
      ok: true,
      ...summary,
    });
  } catch (error) {
    console.error("Stats query failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
