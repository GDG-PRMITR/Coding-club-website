import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAdminContext, getMyPendingAccessRequest, getPermissionSummary } from "@/lib/admin-access";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const { adminUser } = await getAdminContext(session);
  const pendingRequest = await getMyPendingAccessRequest(session.user.email);

  return NextResponse.json({
    ok: true,
    authenticated: true,
    email: session.user.email,
    admin: getPermissionSummary(adminUser),
    pendingRequest,
  });
}
