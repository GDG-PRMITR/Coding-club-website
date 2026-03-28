import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { canManageAccessRequests, createAccessRequest, getAdminContext, listManageableAccessRequests, type PermissionSet } from "@/lib/admin-access";

export async function GET() {
  const session = await auth();
  const { adminUser } = await getAdminContext(session);

  if (!adminUser || !canManageAccessRequests(adminUser)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const requests = await listManageableAccessRequests(adminUser);
  return NextResponse.json({ ok: true, requests });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { message?: string; requestedPermissions?: Partial<PermissionSet> };
    await createAccessRequest(session, body.message || "", body.requestedPermissions);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to submit request" },
      { status: 400 },
    );
  }
}
