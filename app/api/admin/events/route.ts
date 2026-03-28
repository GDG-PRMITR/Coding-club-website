import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import type { Event } from "@/data/events";
import {
  canCreateEvent,
  getAdminContext,
  getPermissionSummary,
} from "@/lib/admin-access";
import { createEvent, getEventVisibilityConfig, getEvents, hasMongoConfig, invalidateEventsCache, listEventTypes } from "@/lib/events-store";

export async function GET(request: NextRequest) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const includeHidden = request.nextUrl.searchParams.get("includeHidden") === "1";
  const [events, visibility] = await Promise.all([
    getEvents({ includeHidden }),
    getEventVisibilityConfig(),
  ]);

  return NextResponse.json({
    ok: true,
    mongoConfigured: hasMongoConfig(),
    eventTypes: listEventTypes(),
    admin: getPermissionSummary(adminUser),
    visibility,
    events,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as Partial<Event>;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    if (!canCreateEvent(adminUser, payload as Event)) {
      return NextResponse.json({ ok: false, error: "Insufficient permission for selected club/domain" }, { status: 403 });
    }

    const created = await createEvent(payload);
    invalidateEventsCache();
    return NextResponse.json({ ok: true, event: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to create event",
      },
      { status: 400 },
    );
  }
}
