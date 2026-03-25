"use client";

import { useMemo, useState } from "react";
import ClubCard from "@/components/ClubCard";
import { ClubModal } from "@/components/ClubModal";
import { clubs, SubClub } from "@/data/clubs";

export default function FeaturedClubs() {
  const [selectedClub, setSelectedClub] = useState<SubClub | null>(null);

  const nvidiaClub = useMemo(
    () => clubs.subClubs.find((club) => club.id === "nvidia") ?? null,
    []
  );

  const handleOpenDetails = (club: SubClub) => {
    if (club.id !== "nvidia") return;
    setSelectedClub(club);
  };

  const handleCloseModal = () => setSelectedClub(null);

  return (
    <section className="section-shell">
      <div>
        <h2 className="font-display text-3xl font-bold">Featured Clubs</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Explore the four flagship clubs under Coding Club.</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {clubs.subClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onOpenDetails={club.id === "nvidia" ? handleOpenDetails : undefined}
          />
        ))}
      </div>

      <ClubModal
        club={selectedClub ?? nvidiaClub}
        isOpen={selectedClub?.id === "nvidia"}
        onClose={handleCloseModal}
      />
    </section>
  );
}