"use client";

import { useState } from "react";

type AdminAccessRequestFormProps = {
  hasPendingRequest: boolean;
};

type PermissionSet = {
  canManageAdmins: boolean;
  canManageAccessRequests: boolean;
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  allowedClubs: string[];
  allowedDomains: string[];
};

const CLUB_OPTIONS = ["gdg", "gsa", "nvidia", "cisco", "codingclub"];
const CLUB_DOMAIN_MAP: Record<string, string[]> = {
  gdg: ["web-dev", "ai-ml", "app-dev", "cloud", "data-science", "dsa", "iot", "placement", "social-media"],
  gsa: ["genai", "webtech", "public-relations", "social-media", "graphics-editing"],
  cisco: ["management", "web-dev", "ai-data-science", "cybersecurity", "networking", "creative", "dsa", "cloud"],
  nvidia: ["ai-ml", "cloud", "dsa"],
  codingclub: ["web-dev", "ai-ml", "app-dev", "cloud", "data-science", "dsa", "iot", "placement", "social-media"],
};

const defaultRequestedPermissions: PermissionSet = {
  canManageAdmins: false,
  canManageAccessRequests: false,
  canCreateEvents: false,
  canEditEvents: false,
  canDeleteEvents: false,
  allowedClubs: ["*"],
  allowedDomains: ["*"],
};

const PERMISSION_PRESETS: Array<{ key: string; label: string; apply: PermissionSet }> = [
  {
    key: "event-editor",
    label: "Event Editor",
    apply: { ...defaultRequestedPermissions, canCreateEvents: true, canEditEvents: true },
  },
  {
    key: "event-manager",
    label: "Event Manager",
    apply: { ...defaultRequestedPermissions, canCreateEvents: true, canEditEvents: true, canDeleteEvents: true },
  },
  {
    key: "access-manager",
    label: "Access Manager",
    apply: {
      ...defaultRequestedPermissions,
      canManageAdmins: true,
      canManageAccessRequests: true,
      canCreateEvents: false,
      canEditEvents: false,
      canDeleteEvents: false,
    },
  },
  {
    key: "full-control",
    label: "Full Control",
    apply: {
      canManageAdmins: true,
      canManageAccessRequests: true,
      canCreateEvents: true,
      canEditEvents: true,
      canDeleteEvents: true,
      allowedClubs: ["*"],
      allowedDomains: ["*"],
    },
  },
];

function humanizeToken(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function chipClass(active: boolean) {
  return active
    ? "rounded-full border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-100"
    : "rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";
}

export default function AdminAccessRequestForm({ hasPendingRequest }: AdminAccessRequestFormProps) {
  const [message, setMessage] = useState("");
  const [requestedPermissions, setRequestedPermissions] = useState<PermissionSet>(defaultRequestedPermissions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(hasPendingRequest ? "Your access request is already pending." : "");

  const clubsAllSelected = requestedPermissions.allowedClubs.includes("*");
  const domainsAllSelected = requestedPermissions.allowedDomains.includes("*");
  const selectedClubs = clubsAllSelected ? CLUB_OPTIONS : requestedPermissions.allowedClubs;
  const availableDomains = Array.from(
    new Set(selectedClubs.flatMap((club) => CLUB_DOMAIN_MAP[club] || [])),
  ).sort();
  const hasAnyActionPermission =
    requestedPermissions.canManageAdmins ||
    requestedPermissions.canManageAccessRequests ||
    requestedPermissions.canCreateEvents ||
    requestedPermissions.canEditEvents ||
    requestedPermissions.canDeleteEvents;

  async function submitRequest() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, requestedPermissions }),
      });

      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to submit request");
      }

      setSuccess("Access request submitted. Main admin will review it.");
      setMessage("");
      setRequestedPermissions(defaultRequestedPermissions);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950">
      <h3 className="font-semibold">Request Access</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Explain why you need admin access and select the exact permissions you are requesting.
      </p>
      <div className="space-y-2">
        <p className="text-xs font-semibold">Permission presets</p>
        <div className="flex flex-wrap gap-2">
          {PERMISSION_PRESETS.map((preset) => (
            <button
              key={preset.key}
              type="button"
              onClick={() => setRequestedPermissions(preset.apply)}
              className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <label><input type="checkbox" checked={requestedPermissions.canManageAdmins} onChange={() => setRequestedPermissions((current) => ({ ...current, canManageAdmins: !current.canManageAdmins }))} /> Manage Admins</label>
        <label><input type="checkbox" checked={requestedPermissions.canManageAccessRequests} onChange={() => setRequestedPermissions((current) => ({ ...current, canManageAccessRequests: !current.canManageAccessRequests }))} /> Manage Access Requests</label>
        <label><input type="checkbox" checked={requestedPermissions.canCreateEvents} onChange={() => setRequestedPermissions((current) => ({ ...current, canCreateEvents: !current.canCreateEvents }))} /> Create Events</label>
        <label><input type="checkbox" checked={requestedPermissions.canEditEvents} onChange={() => setRequestedPermissions((current) => ({ ...current, canEditEvents: !current.canEditEvents }))} /> Edit Events</label>
        <label><input type="checkbox" checked={requestedPermissions.canDeleteEvents} onChange={() => setRequestedPermissions((current) => ({ ...current, canDeleteEvents: !current.canDeleteEvents }))} /> Delete Events</label>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold">Requested clubs</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRequestedPermissions((current) => ({ ...current, allowedClubs: ["*"], allowedDomains: ["*"] }))}
            className={chipClass(clubsAllSelected)}
          >
            All clubs
          </button>
          {CLUB_OPTIONS.map((club) => {
            const active = !clubsAllSelected && requestedPermissions.allowedClubs.includes(club);
            return (
              <button
                key={club}
                type="button"
                onClick={() => {
                  setRequestedPermissions((current) => {
                    if (current.allowedClubs.includes("*")) {
                      return { ...current, allowedClubs: [club], allowedDomains: ["*"] };
                    }

                    const nextClubs = current.allowedClubs.includes(club)
                      ? current.allowedClubs.filter((item) => item !== club)
                      : [...current.allowedClubs, club];

                    if (nextClubs.length === 0) {
                      return { ...current, allowedClubs: ["*"], allowedDomains: ["*"] };
                    }

                    return { ...current, allowedClubs: nextClubs };
                  });
                }}
                className={chipClass(active)}
              >
                {humanizeToken(club)}
              </button>
            );
          })}
        </div>
      </div>
      {!clubsAllSelected ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold">Requested domains</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRequestedPermissions((current) => ({ ...current, allowedDomains: ["*"] }))}
              className={chipClass(domainsAllSelected)}
            >
              All domains
            </button>
            {availableDomains.map((domain) => {
              const active = !domainsAllSelected && requestedPermissions.allowedDomains.includes(domain);
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    setRequestedPermissions((current) => {
                      if (current.allowedDomains.includes("*")) {
                        return { ...current, allowedDomains: [domain] };
                      }

                      const nextDomains = current.allowedDomains.includes(domain)
                        ? current.allowedDomains.filter((item) => item !== domain)
                        : [...current.allowedDomains, domain];

                      return {
                        ...current,
                        allowedDomains: nextDomains.length > 0 ? nextDomains : ["*"],
                      };
                    });
                  }}
                  className={chipClass(active)}
                >
                  {humanizeToken(domain)}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          All clubs selected, so domain scope will automatically be all domains.
        </p>
      )}
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={4}
        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900"
        placeholder="Example: Need moderator access for GDG and web-dev events to publish workshop updates."
      />
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
      {!hasAnyActionPermission ? <p className="text-xs text-rose-600">Select at least one permission before submitting.</p> : null}
      <button
        type="button"
        onClick={() => {
          submitRequest().catch(() => {
            // handled in submitRequest
          });
        }}
        disabled={loading || hasPendingRequest || !hasAnyActionPermission}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Submitting..." : hasPendingRequest ? "Request Pending" : "Submit Request"}
      </button>
    </div>
  );
}
