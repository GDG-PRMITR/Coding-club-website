import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  canManageAdmins,
  getAdminContext,
  listAdminUsers,
  updateAdminUser,
} from "@/lib/admin-access";

export async function GET() {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAdmins(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const users = await listAdminUsers();
  return NextResponse.json({ ok: true, users });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAdmins(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as {
      email?: string;
      revoke?: boolean;
      permissions?: {
        canManageAdmins?: boolean;
        canManageAccessRequests?: boolean;
        canCreateEvents?: boolean;
        canEditEvents?: boolean;
        canDeleteEvents?: boolean;
        allowedClubs?: string[];
        allowedDomains?: string[];
      };
    };

    if (!payload.email) {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    await updateAdminUser(payload.email, adminUser, {
      revoke: payload.revoke,
      permissions: payload.permissions,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to update admin user" },
      { status: 400 },
    );
  }
}
