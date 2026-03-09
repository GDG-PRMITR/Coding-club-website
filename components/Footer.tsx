import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/config";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-slate-100 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-2">
            <Image src={siteConfig.logo} alt="Coding Club logo" width={32} height={32} className="rounded-md object-contain" />
            <p className="font-display text-xl font-bold text-primary">{siteConfig.name}</p>
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">Connect</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 transition hover:border-primary hover:text-primary dark:border-slate-700"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 transition hover:border-primary hover:text-primary dark:border-slate-700"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 transition hover:border-primary hover:text-primary dark:border-slate-700"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-4 text-center text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
