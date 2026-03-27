'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsTracker from "@/components/StatsTracker";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSc2026 = pathname.startsWith('/sc2026-help');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <StatsTracker />
      {!isSc2026 && <Navbar />}
      <main className={!isSc2026 ? "mx-auto w-full max-w-6xl flex-1 px-3 py-6 sm:px-4 sm:py-8 lg:px-6" : "flex-1"}>{children}</main>
      {!isSc2026 && <Footer />}
    </div>
  );
}
