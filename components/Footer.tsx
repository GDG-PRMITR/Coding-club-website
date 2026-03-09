import Link from "next/link";
import { siteConfig } from "@/data/config";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-slate-50 py-8 dark:border-white/10 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 px-4 text-sm text-slate-600 dark:text-slate-300 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
            Instagram
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
