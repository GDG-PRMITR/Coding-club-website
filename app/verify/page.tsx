import type { Metadata } from "next";
import CertificateVerifyClient from "./verify";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description:
    "Official Certificate Verification portal for Prof. Ram Meghe Institute of Technology and Research (PRMITR). Verify credentials from Coding Club, Cisco Networking Academy, GDG, GSA, E-Cell, Esperanza, Mitra, and Aashayein events.",
  keywords: [
    "PRMITR",
    "Prof. Ram Meghe Institute of Technology and Research",
    "PRMITR Amravati",
    "Badnera Engineering College",
    "mitra.ac.in",
    "Certificate Verification",
    "Coding Club PRMITR",
    "Cisco Networking Academy",
    "GDG PRMITR",
    "Google Developer Group",
    "GSA",
    "Google Student Ambassador",
    "E-Cell PRMITR",
    "Esperanza",
    "Mitra",
    "Aashayein",
    "Student Certificates",
    "Academic Credentials",
    "Engineering College Amravati",
  ],
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Certificate Verification | Coding Club PRMITR",
    description:
      "Official credential verification for students of PRMITR Amravati. Verify certificates from Coding Club, Cisco, GDG, GSA, E-Cell, and more.",
    url: "/verify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificate Verification | PRMITR Amravati",
    description:
      "Official verification portal for credentials issued by PRMITR Coding Club and partner communities.",
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

  // JSON-LD Structured Data for "Strong" SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Certificate Verification - Prof. Ram Meghe Institute of Technology and Research",
    alternateName: ["PRMITR Amravati", "PRMITR Badnera", "mitra.ac.in"],
    description:
      "Official verification portal for certificates issued by Prof. Ram Meghe Institute of Technology and Research (PRMITR) Coding Club, Cisco Networking Academy, GDG, GSA, E-Cell, Esperanza, and Aashayein.",
    publisher: {
      "@type": "CollegeOrUniversity",
      name: "Prof. Ram Meghe Institute of Technology and Research",
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Badnera",
          addressRegion: "Amravati, Maharashtra",
          addressCountry: "India",
        },
      },
      logo: {
        "@type": "ImageObject",
        url: "https://codingclub.prmitr.in/logo/logo-coding-club.png",
      },
    },
    mainEntity: {
      "@type": "Service",
      name: "Certificate Verification Service",
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Prof. Ram Meghe Institute of Technology and Research",
        url: "https://mitra.ac.in",
      },
      areaServed: "Amravati, Maharashtra, India",
      serviceType: "Certification Verification",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="jsonld-verify"
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <CertificateVerifyClient initialVerifyId={initialVerifyId} />

        {/* SEO Anchor - Visible but subtle institutional context */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-slate-500 dark:border-slate-800">
          <p className="text-sm">
            This verification portal is maintained by the <strong>Coding Club</strong> of{" "}
            <strong>Prof. Ram Meghe Institute of Technology and Research (PRMITR)</strong>, Badnera,
            Amravati. It serves as the central hub for authenticating achievements across various
            departmental and community initiatives, including Cisco Networking Academy, GDG On
            Campus, Google Student Ambassador program, and E-Cell PRMITR.
          </p>
        </div>
      </div>
    </>
  );
}