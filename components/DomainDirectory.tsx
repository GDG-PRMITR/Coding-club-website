"use client";

import { useMemo, useState } from "react";
import { domains } from "@/data/teams";

export default function DomainDirectory() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return domains.filter((domain) => {
      const people = [
        ...(domain.executives ?? []).map((member) => member.name),
        ...(domain.members ?? []).map((member) => member.name),
        ...(domain.roles ?? []).map((member) => member.name),
      ].join(" ");

      return `${domain.name} ${domain.description} ${people}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <section>
      <div className="mb-4">
        <label htmlFor="team-search" className="mb-2 block text-sm font-medium">
          Search team directory
        </label>
        <input
          id="team-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by domain or member name..."
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
        />
      </div>
      <div className="space-y-4">
        {filtered.map((domain) => (
          <details key={domain.id} className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
            <summary className="cursor-pointer font-semibold">{domain.name}</summary>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{domain.description}</p>
            {domain.executives?.length ? (
              <p className="mt-2 text-sm">
                <strong>Executives:</strong> {domain.executives.map((member) => member.name).join(", ")}
              </p>
            ) : null}
            {domain.roles?.length ? (
              <p className="mt-2 text-sm">
                <strong>Roles:</strong> {domain.roles.map((member) => `${member.name} (${member.position})`).join(", ")}
              </p>
            ) : null}
            {domain.members?.length ? (
              <p className="mt-2 text-sm">
                <strong>Members:</strong> {domain.members.map((member) => member.name).join(", ")}
              </p>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}
