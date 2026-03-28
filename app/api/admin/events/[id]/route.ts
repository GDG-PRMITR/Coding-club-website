import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import type { Event } from "@/data/events";
import { canDeleteEvent, canEditEvent, getAdminContext } from "@/lib/admin-access";
import { deleteEvent, getEventById, invalidateEventsCache, updateEvent } from "@/lib/events-store";

type EventRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: EventRouteProps) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const current = await getEventById(id, { includeHidden: true });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Event not found" }, { status: 404 });
    }

    const payload = (await request.json().catch(() => ({}))) as Partial<Event>;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    if (!canEditEvent(adminUser, current, payload as Event)) {
      return NextResponse.json({ ok: false, error: "Insufficient permission for selected club/domain" }, { status: 403 });
    }

    const updated = await updateEvent(id, payload);
    invalidateEventsCache();

    return NextResponse.json({ ok: true, event: updated });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to update event",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: EventRouteProps) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const current = await getEventById(id, { includeHidden: true });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Event not found" }, { status: 404 });
    }

    if (!canDeleteEvent(adminUser, current)) {
      return NextResponse.json({ ok: false, error: "Insufficient permission for selected club/domain" }, { status: 403 });
    }

    await deleteEvent(id);
    invalidateEventsCache();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to delete event",
      },
      { status: 400 },
    );
  }
}
