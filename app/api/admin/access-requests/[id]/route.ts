import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  canManageAccessRequests,
  deleteAccessRequest,
  getAdminContext,
  resolveAccessRequest,
  type PermissionSet,
  updateAccessRequest,
} from "@/lib/admin-access";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: RouteProps) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAccessRequests(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const payload = (await request.json().catch(() => ({}))) as {
      decision?: "approved" | "rejected";
      permissions?: {
        canManageAdmins?: boolean;
        canManageAccessRequests?: boolean;
        canCreateEvents?: boolean;
        canEditEvents?: boolean;
        canDeleteEvents?: boolean;
        allowedClubs?: string[];
        allowedDomains?: string[];
      };
      resolutionNote?: string;
    };

    if (!payload.decision) {
      return NextResponse.json({ ok: false, error: "Missing decision" }, { status: 400 });
    }

    await resolveAccessRequest(id, payload.decision, adminUser, {
      permissions: payload.permissions,
      resolutionNote: payload.resolutionNote,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to update request" },
      { status: 400 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAccessRequests(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const payload = (await request.json().catch(() => ({}))) as {
      message?: string;
      requestedPermissions?: Partial<PermissionSet>;
    };

    await updateAccessRequest(id, adminUser, {
      message: payload.message,
      requestedPermissions: payload.requestedPermissions,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to edit request" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: RouteProps) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAccessRequests(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    await deleteAccessRequest(id, adminUser);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to remove request" },
      { status: 400 },
    );
  }
}
