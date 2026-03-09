import Image from "next/image";
import Link from "next/link";
import type { SubClub } from "@/data/clubs";

interface ClubCardProps {
  club: SubClub;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <Image
          src={club.logo}
          alt={`${club.name} logo`}
          width={48}
          height={48}
          className="rounded-md bg-slate-100 object-contain p-1"
        />
        <div>
          <h3 className="font-display text-lg font-bold">{club.shortName ?? club.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{club.description}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        {club.lead?.name || club.organizer?.name || club.instructor?.name || "PRMITR Team"}
      </p>
      {club.website ? (
        <Link href={club.website} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">
          Visit Club →
        </Link>
      ) : (
        <Link href="/about#clubs" className="mt-4 inline-block text-sm font-semibold text-primary">
          View Details →
        </Link>
      )}
    </article>
  );
}
