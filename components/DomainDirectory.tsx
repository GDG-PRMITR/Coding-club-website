"use client";

import { useMemo, useState } from "react";
import { domains } from "@/data/teams";

export default function DomainDirectory() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const overview = useMemo(() => {
    return domains.reduce(
      (acc, domain) => {
        acc.domains += 1;
        acc.executives += domain.executives?.length ?? 0;
        acc.members += domain.members?.length ?? 0;
        acc.roles += domain.roles?.length ?? 0;
        return acc;
      },
      { domains: 0, executives: 0, members: 0, roles: 0 },
    );
  }, []);

  const filtered = useMemo(() => {
    return domains.filter((domain) => {
      const people = [
        ...(domain.executives ?? []).map((member) => member.name),
        ...(domain.members ?? []).map((member) => member.name),
        ...(domain.roles ?? []).map((member) => member.name),
      ].join(" ");

      return `${domain.name} ${domain.description} ${people}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Team Directory
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Find domains and members quickly</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Explore each domain, check executives, and discover member roles in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-center dark:border-white/10 dark:bg-slate-800/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">Domains</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{overview.domains}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-center dark:border-white/10 dark:bg-slate-800/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">Executives</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{overview.executives}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-center dark:border-white/10 dark:bg-slate-800/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">Members</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{overview.members}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-center dark:border-white/10 dark:bg-slate-800/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">Special Roles</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{overview.roles}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70">
          <label htmlFor="team-search" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Search team directory
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="team-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by domain, description, or member name..."
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              disabled={!query}
              className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              Clear
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {filtered.length} domain{filtered.length === 1 ? "" : "s"} found
            {normalizedQuery ? ` for "${query.trim()}"` : ""}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/20 bg-white p-8 text-center dark:border-white/20 dark:bg-slate-900">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">No matching domain found</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword like Web, AI, or a member name.</p>
          </div>
        ) : (
          filtered.map((domain, index) => (
            <details
              key={domain.id}
              open={Boolean(normalizedQuery) && index === 0}
              className="group rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{domain.name}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{domain.description}</p>
                </div>
                <div className="flex shrink-0 gap-2 text-xs">
                  {domain.executives?.length ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      {domain.executives.length} Exec
                    </span>
                  ) : null}
                  {domain.members?.length ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {domain.members.length} Members
                    </span>
                  ) : null}
                  {domain.roles?.length ? (
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                      {domain.roles.length} Roles
                    </span>
                  ) : null}
                </div>
              </summary>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {domain.executives?.length ? (
                  <div className="rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Executives</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                      {domain.executives.map((member) => (
                        <li key={`${domain.id}-exec-${member.name}`} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                          {member.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {domain.roles?.length ? (
                  <div className="rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Special Roles</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                      {domain.roles.map((member) => (
                        <li key={`${domain.id}-role-${member.name}`} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                          {member.name}
                          {member.position ? ` · ${member.position}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {domain.members?.length ? (
                  <div className="rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70 md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Members</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {domain.members.map((member) => (
                        <span
                          key={`${domain.id}-member-${member.name}`}
                          className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </details>
          ))
        )}
      </div>
    </section>
  );
}
