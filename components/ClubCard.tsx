"use client";

import Image from "next/image";
import Link from "next/link";
import type { SubClub } from "@/data/clubs";

interface ClubCardProps {
  club: SubClub;
  onOpenDetails?: (club: SubClub) => void;
}

export default function ClubCard({ club, onOpenDetails }: ClubCardProps) {
  const isNvidiaCard = club.id === "nvidia";
  const internalClubRoute = club.id === "gdg" || club.id === "gsa" ? `/${club.id}` : null;

  return (
    <article
      className={`rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900 ${
        isNvidiaCard ? "cursor-pointer" : ""
      }`}
      onClick={isNvidiaCard && onOpenDetails ? () => onOpenDetails(club) : undefined}
    >
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
      {internalClubRoute ? (
        <Link href={internalClubRoute} className="mt-4 inline-block text-sm font-semibold text-primary">
          {club.website ? "Visit Club →" : "View Details →"}
        </Link>
      ) : club.website ? (
        <Link href={club.website} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">
          Visit Club →
        </Link>
      ) : isNvidiaCard && onOpenDetails ? (
        <button
          type="button"
          className="mt-4 inline-block text-sm font-semibold text-primary"
          onClick={(event) => {
            event.stopPropagation();
            onOpenDetails(club);
          }}
        >
          View Details →
        </button>
      ) : (
        <Link href="/about#clubs" className="mt-4 inline-block text-sm font-semibold text-primary">
          View Details →
        </Link>
      )}
    </article>
  );
}
