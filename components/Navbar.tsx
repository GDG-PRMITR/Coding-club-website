"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/data/config";

import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <nav className="mx-auto w-full max-w-6xl px-3 py-3.5 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-black/10 dark:bg-slate-900 dark:ring-white/10">
              <Image src={siteConfig.logo} alt="Coding Club logo" width={350} height={214} style={{ width: "30px", height: "auto" }} className="object-contain" priority />
            </span>
            <span className="max-w-[62vw] truncate font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:max-w-none sm:text-lg">
              {siteConfig.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:hidden"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-nav"
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>

            <ul className="hidden items-center gap-1 rounded-full bg-slate-100/90 p-1 text-sm font-medium dark:bg-slate-800/90 sm:flex">
              {siteConfig.navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`inline-flex whitespace-nowrap rounded-full px-4 py-1.5 transition ${
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
          </div>
        </div>

        {mobileMenuOpen ? (
          <ul
            id="mobile-site-nav"
            className="mt-3 grid gap-1 rounded-2xl border border-black/10 bg-white p-2 text-sm font-medium dark:border-white/10 dark:bg-slate-900 sm:hidden"
          >
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 transition ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
