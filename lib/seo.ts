import { siteConfig } from "@/data/config";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl = envUrl && envUrl.length > 0 ? envUrl : siteConfig.url;
  return baseUrl.replace(/\/$/, "");
}
