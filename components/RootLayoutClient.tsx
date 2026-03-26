'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSc2026 = pathname.startsWith('/sc2026-help');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!isSc2026 && <Navbar />}
      <main className={!isSc2026 ? "mx-auto w-full max-w-6xl flex-1 px-4 py-8" : "flex-1"}>{children}</main>
      {!isSc2026 && <Footer />}
    </div>
  );
}
