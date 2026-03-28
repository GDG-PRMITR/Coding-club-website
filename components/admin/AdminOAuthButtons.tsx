"use client";

import { signIn } from "next-auth/react";

type ProviderItem = {
  id: string;
  label: string;
};

type AdminOAuthButtonsProps = {
  providers: ProviderItem[];
};

export default function AdminOAuthButtons({ providers }: AdminOAuthButtonsProps) {
  async function handleSignIn(providerId: string) {
    await signIn(providerId, { callbackUrl: "/admin" });
  }

  return (
    <div className="mt-4 space-y-3">
      {providers.length === 0 ? (
        <p className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-800">
          No OAuth providers are configured. Add provider env vars in .env.
        </p>
      ) : null}

      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => {
            handleSignIn(provider.id).catch(() => {
              // Sign-in failures are handled by Auth.js error route.
            });
          }}
          className="block w-full rounded-md border border-black/10 px-4 py-2 text-center text-sm font-semibold transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
        >
          {provider.label}
        </button>
      ))}
    </div>
  );
}
