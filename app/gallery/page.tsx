import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore events, team moments, and achievements from PRMITR Coding Club.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Coding Club PRMITR Gallery",
    description: "Explore events, team moments, and achievements from PRMITR Coding Club.",
    url: "/gallery",
  },
  icons: {
    icon: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
    apple: [{ url: "/logo/logo-coding-club.png", type: "image/png" }],
  },
};

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-4xl font-bold">Gallery</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          A visual journey of workshops, events, team milestones, and achievements.
        </p>
      </section>
      <GalleryGrid />
    </div>
  );
}
