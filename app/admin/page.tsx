import { redirect } from "next/navigation";
import AdminEventsManager from "@/components/admin/AdminEventsManager";
import { auth } from "@/auth";
import { getAdminContext, getPermissionSummary } from "@/lib/admin-access";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const { adminUser } = await getAdminContext(session);
  const summary = getPermissionSummary(adminUser);

  if (!summary) {
    redirect("/admin/login?access=denied");
  }

  return <AdminEventsManager initialAdmin={summary} />;
}
