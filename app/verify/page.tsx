import type { Metadata } from "next";
import CertificateVerifyClient from "@/app/certificate-verify/certificate-verify-client";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description: "Verify student certificates issued by PRMITR Coding Club and partner communities.",
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Certificate Verification | Coding Club PRMITR",
    description: "Verify student certificates issued by PRMITR Coding Club and partner communities.",
    url: "/verify",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

type VerifyPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const idParam = params.id;
  const certParam = params.cert;
  const verifyIdParam = params.verifyId;
  const verifyIdAltParam = params.verify_id;

  const initialVerifyId =
    (typeof idParam === "string" && idParam) ||
    (typeof certParam === "string" && certParam) ||
    (typeof verifyIdParam === "string" && verifyIdParam) ||
    (typeof verifyIdAltParam === "string" && verifyIdAltParam) ||
    "";

  return <CertificateVerifyClient initialVerifyId={initialVerifyId} />;
}