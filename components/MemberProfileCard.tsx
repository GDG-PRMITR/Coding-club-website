import Image from "next/image";
import Link from "next/link";
import { getMemberProfile } from "@/data/memberProfiles";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">{initials}</div>
  );
}

export default function MemberProfileCard({ name, role }: { name: string; role: string }) {
  const profile = getMemberProfile(name);
  const socials = profile.socials;
  const hasSocials = Boolean(
    socials?.github || socials?.linkedin || socials?.instagram || socials?.portfolio,
  );

  return (
    <article className="group m-1 flex min-h-[15.75rem] w-full max-w-[17.75rem] flex-col items-center rounded-2xl border border-slate-200/90 bg-white/95 p-5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/95">
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 shadow-sm ring-2 ring-primary/30 dark:border-slate-800 dark:ring-primary/40">
        {profile.photo ? (
          <Image src={profile.photo} alt={name} fill sizes="96px" className="object-cover object-top" unoptimized />
        ) : (
          <Initials name={name} />
        )}
      </div>

      <div className="mt-3 w-full">
        <h4 className="line-clamp-2 font-display text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">{name}</h4>
        <p className="mt-2 text-lg font-medium text-slate-600 dark:text-slate-300">{role}</p>
      </div>

      {hasSocials ? (
        <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
          {socials?.github ? (
            <Link href={socials.github} target="_blank" rel="noreferrer" aria-label={`${name} GitHub`} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <GitHubIcon className="h-[18px] w-[18px]" />
            </Link>
          ) : null}
          {socials?.linkedin ? (
            <Link href={socials.linkedin} target="_blank" rel="noreferrer" aria-label={`${name} LinkedIn`} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </Link>
          ) : null}
          {socials?.instagram ? (
            <Link href={socials.instagram} target="_blank" rel="noreferrer" aria-label={`${name} Instagram`} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <InstagramIcon className="h-[18px] w-[18px]" />
            </Link>
          ) : null}
          {socials?.portfolio ? (
            <Link href={socials.portfolio} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              Portfolio
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
