import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAdminContext } from "@/lib/admin-access";
import { getEventVisibilityConfig, getEvents, invalidateEventsCache, listEventTypes, setEventVisibilityEntries } from "@/lib/events-store";

type VisibilityScope = "event" | "club" | "domain" | "eventType";

function normalizeList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim().toLowerCase() : "")).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
  }

  return [] as string[];
}

function normalizeTypeList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [] as string[];
}

function hasWildcard(values: string[]) {
  return values.includes("*");
}

export async function GET() {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const visibility = await getEventVisibilityConfig();
  return NextResponse.json({ ok: true, visibility });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!adminUser.permissions.canEditEvents) {
    return NextResponse.json({ ok: false, error: "You do not have permission to manage visibility" }, { status: 403 });
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as {
      scope?: VisibilityScope;
      values?: unknown;
      hidden?: boolean;
    };

    const scope = payload.scope;
    if (!scope || !["event", "club", "domain", "eventType"].includes(scope)) {
      return NextResponse.json({ ok: false, error: "Invalid scope" }, { status: 400 });
    }

    const values = scope === "eventType" ? normalizeTypeList(payload.values) : normalizeList(payload.values);
    if (values.length === 0) {
      return NextResponse.json({ ok: false, error: "No values provided" }, { status: 400 });
    }

    const hidden = Boolean(payload.hidden);

    if (scope === "event") {
      const events = await getEvents({ includeHidden: true });
      const byId = new Map(events.map((event) => [event.id.trim().toLowerCase(), event]));

      for (const id of values) {
        const event = byId.get(id);
        if (!event) {
          return NextResponse.json({ ok: false, error: `Event not found: ${id}` }, { status: 404 });
        }

        const hasClubAccess = hasWildcard(adminUser.permissions.allowedClubs) || adminUser.permissions.allowedClubs.includes(event.club);
        const hasDomainAccess = hasWildcard(adminUser.permissions.allowedDomains) || adminUser.permissions.allowedDomains.includes(event.domain);

        if (!hasClubAccess || !hasDomainAccess) {
          return NextResponse.json({ ok: false, error: "One or more events are outside your scope" }, { status: 403 });
        }
      }
    }

    if (scope === "club" && !hasWildcard(adminUser.permissions.allowedClubs)) {
      for (const club of values) {
        if (!adminUser.permissions.allowedClubs.includes(club)) {
          return NextResponse.json({ ok: false, error: `Club outside your scope: ${club}` }, { status: 403 });
        }
      }
    }

    if (scope === "domain" && !hasWildcard(adminUser.permissions.allowedDomains)) {
      for (const domain of values) {
        if (!adminUser.permissions.allowedDomains.includes(domain)) {
          return NextResponse.json({ ok: false, error: `Domain outside your scope: ${domain}` }, { status: 403 });
        }
      }
    }

    if (scope === "eventType") {
      const allTypes = listEventTypes();
      const validTypes = new Set(allTypes.map((item) => item.toLowerCase()));
      const canonicalMap = new Map(allTypes.map((item) => [item.toLowerCase(), item]));
      for (const type of values) {
        if (!validTypes.has(type.toLowerCase())) {
          return NextResponse.json({ ok: false, error: `Invalid event type: ${type}` }, { status: 400 });
        }
      }

      for (let index = 0; index < values.length; index += 1) {
        const canonical = canonicalMap.get(values[index].toLowerCase());
        if (canonical) {
          values[index] = canonical;
        }
      }

      if (!hasWildcard(adminUser.permissions.allowedClubs) || !hasWildcard(adminUser.permissions.allowedDomains)) {
        return NextResponse.json({ ok: false, error: "Event type visibility requires full club/domain scope" }, { status: 403 });
      }
    }

    const visibility = await setEventVisibilityEntries({
      scope,
      values,
      hidden,
    });

    invalidateEventsCache();

    return NextResponse.json({ ok: true, visibility });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to update visibility",
      },
      { status: 400 },
    );
  }
}
