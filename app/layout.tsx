import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/config";
import RootLayoutClient from "@/components/RootLayoutClient";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: [
    "Coding Club PRMITR",
    "PRMITR Coding Club",
    "GDG On Campus PRMITR",
    "GDGoC PRMITR",
    "Google Developer Group PRMITR",
    "Google Student Developer Club PRMITR",
    "GDSC PRMITR",
    "GSA PRMITR",
    "Cisco Club PRMITR",
    "E-Cell PRMITR",
    "Prof Ram Meghe Institute of Technology and Research",
    "PRMITR Amravati",
    "MITRA",
    "mitra.ac.in",
  ],
  url: siteUrl,
  logo: `${siteUrl}${siteConfig.logo}`,
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.github],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteUrl,
  description: siteConfig.description,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Coding Club",
    "Coding Club PRMITR",
    "PRMITR Coding Club",
    "PRMITR",
    "Prof Ram Meghe Institute of Technology and Research",
    "PRMITR Amravati",
    "MITRA",
    "MITRS",
    "mitra.ac.in",
    "GDG On Campus PRMITR",
    "GDGoC",
    "GDGOC PRMITR",
    "Google Developer Group",
    "Google Student Developer Club",
    "GDSC",
    "Google Student Ambassador",
    "GSA",
    "Cisco Club",
    "E-Cell",
    "developer community",
    "coding events",
    "workshops",
    "hackathons",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/Coding-Club.png",
        width: 1200,
        height: 630,
        alt: "Coding Club PRMITR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/Coding-Club.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
