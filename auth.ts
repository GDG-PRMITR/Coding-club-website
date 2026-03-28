import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export type AdminLoginProvider = {
  id: string;
  label: string;
};

function getConfiguredProviders() {
  const providers = [];

  const googleId = process.env.AUTH_GOOGLE_ID;
  const googleSecret = process.env.AUTH_GOOGLE_SECRET;
  if (googleId && googleSecret) {
    providers.push(
      Google({
        clientId: googleId,
        clientSecret: googleSecret,
      }),
    );
  }

  const githubId = process.env.AUTH_GITHUB_ID;
  const githubSecret = process.env.AUTH_GITHUB_SECRET;
  if (githubId && githubSecret) {
    providers.push(
      GitHub({
        clientId: githubId,
        clientSecret: githubSecret,
      }),
    );
  }

  const msId = process.env.AUTH_MICROSOFT_ENTRA_ID_ID;
  const msSecret = process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET;
  const msIssuer = process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER;
  if (msId && msSecret && msIssuer) {
    providers.push(
      MicrosoftEntraID({
        clientId: msId,
        clientSecret: msSecret,
        issuer: msIssuer,
      }),
    );
  }

  return providers;
}

export function getEnabledAdminLoginProviders(): AdminLoginProvider[] {
  const result: AdminLoginProvider[] = [];

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    result.push({ id: "google", label: "Continue with Google" });
  }

  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    result.push({ id: "github", label: "Continue with GitHub" });
  }

  if (
    process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
    process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
    process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER
  ) {
    result.push({ id: "microsoft-entra-id", label: "Continue with Microsoft" });
  }

  return result;
}

export const { handlers, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: getConfiguredProviders(),
  callbacks: {
    async signIn({ user }) {
      return Boolean(user.email);
    },
  },
});
