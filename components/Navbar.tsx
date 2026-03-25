"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/config";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-black/10 dark:bg-slate-900 dark:ring-white/10">
            <Image src={siteConfig.logo} alt="Coding Club logo" width={30} height={30} className="object-contain" priority />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {siteConfig.name}
          </span>
        </Link>
        <ul className="flex items-center gap-1 overflow-x-auto rounded-full bg-slate-100/90 p-1 text-sm font-medium dark:bg-slate-800/90">
          {siteConfig.navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 transition sm:px-4 ${
                    active
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/10 dark:bg-slate-700 dark:text-white dark:ring-white/10"
                      : "text-slate-700 hover:bg-white/90 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
