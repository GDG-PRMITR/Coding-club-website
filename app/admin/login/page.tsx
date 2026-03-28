import { redirect } from "next/navigation";
import { auth, getEnabledAdminLoginProviders } from "@/auth";
import AdminOAuthButtons from "@/components/admin/AdminOAuthButtons";
import AdminAccessRequestForm from "@/components/admin/AdminAccessRequestForm";
import { getAdminContext, getMyPendingAccessRequest } from "@/lib/admin-access";

type AdminLoginPageProps = {
  searchParams: Promise<{ access?: string; callbackUrl?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const session = await auth();
  const providers = getEnabledAdminLoginProviders();
  const params = await searchParams;

  if (session?.user?.email) {
    const { adminUser } = await getAdminContext(session);
    if (adminUser) {
      redirect("/admin");
    }

    const pending = await getMyPendingAccessRequest(session.user.email);

    return (
      <div className="mx-auto max-w-md rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <h1 className="font-display text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          You are signed in as <strong>{session.user.email}</strong> but do not have admin permissions yet.
        </p>
        {params.access === "denied" ? (
          <p className="mt-2 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-800">
            Request access below. Main admin can approve and assign permissions.
          </p>
        ) : null}

        <AdminAccessRequestForm hasPendingRequest={Boolean(pending)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h1 className="font-display text-2xl font-bold">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sign in with an approved admin email using Google, GitHub, or Microsoft.
      </p>

      <AdminOAuthButtons providers={providers} />
    </div>
  );
}
