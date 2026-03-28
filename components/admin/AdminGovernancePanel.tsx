"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type PermissionSet = {
  canManageAdmins: boolean;
  canManageAccessRequests: boolean;
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  allowedClubs: string[];
  allowedDomains: string[];
};

type AdminUser = {
  email: string;
  name: string;
  role: "main_admin" | "operator";
  permissions: PermissionSet;
};

type AccessRequest = {
  _id: string;
  email: string;
  name: string;
  message: string;
  requestedPermissions?: PermissionSet;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
};

type GovernancePanelProps = {
  canManageAdmins: boolean;
  canManageAccessRequests: boolean;
  currentAdminEmail: string;
  clubOptions: string[];
  domainOptions: string[];
  clubDomainMap: Record<string, string[]>;
};

const defaultPermissions: PermissionSet = {
  canManageAdmins: false,
  canManageAccessRequests: false,
  canCreateEvents: true,
  canEditEvents: true,
  canDeleteEvents: false,
  allowedClubs: ["*"],
  allowedDomains: ["*"],
};

const PERMISSION_PRESETS: Array<{ key: string; label: string; apply: PermissionSet }> = [
  {
    key: "event-editor",
    label: "Event Editor",
    apply: { ...defaultPermissions, canCreateEvents: true, canEditEvents: true, allowedClubs: ["*"], allowedDomains: ["*"] },
  },
  {
    key: "event-manager",
    label: "Event Manager",
    apply: { ...defaultPermissions, canCreateEvents: true, canEditEvents: true, canDeleteEvents: true, allowedClubs: ["*"], allowedDomains: ["*"] },
  },
  {
    key: "access-manager",
    label: "Access Manager",
    apply: {
      ...defaultPermissions,
      canManageAdmins: true,
      canManageAccessRequests: true,
      canCreateEvents: false,
      canEditEvents: false,
      canDeleteEvents: false,
      allowedClubs: ["*"],
      allowedDomains: ["*"],
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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const INVALID_DOMAIN_KEYS = new Set(["community", "cisco"]);

function chipClass(active: boolean) {
  return active
    ? "rounded-full border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-100"
    : "rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800";
}

export default function AdminGovernancePanel({
  canManageAdmins,
  canManageAccessRequests,
  currentAdminEmail,
  clubOptions,
  domainOptions,
  clubDomainMap,
}: GovernancePanelProps) {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [permissions, setPermissions] = useState<PermissionSet>(defaultPermissions);
  const [requestStatusFilter, setRequestStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);
  const [editingRequestMessage, setEditingRequestMessage] = useState("");
  const [editingRequestPermissions, setEditingRequestPermissions] = useState<PermissionSet>(defaultPermissions);

  const normalizedNewEmail = newEmail.trim().toLowerCase();
  const canAddByEmail = isValidEmail(normalizedNewEmail);
  const clubsAllSelected = permissions.allowedClubs.includes("*");
  const domainsAllSelected = permissions.allowedDomains.includes("*");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (canManageAccessRequests) {
        const requestResponse = await fetch("/api/admin/access-requests", { cache: "no-store" });
        const requestPayload = (await requestResponse.json().catch(() => ({}))) as { ok?: boolean; requests?: AccessRequest[]; error?: string };
        if (requestResponse.ok && requestPayload.ok) {
          setRequests(requestPayload.requests || []);
        }
      }

      if (canManageAdmins) {
        const usersResponse = await fetch("/api/admin/users", { cache: "no-store" });
        const usersPayload = (await usersResponse.json().catch(() => ({}))) as { ok?: boolean; users?: AdminUser[]; error?: string };
        if (usersResponse.ok && usersPayload.ok) {
          setUsers(usersPayload.users || []);
        }
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load governance data");
    } finally {
      setLoading(false);
    }
  }, [canManageAccessRequests, canManageAdmins]);

  useEffect(() => {
    loadData().catch(() => {
      // handled
    });
  }, [loadData]);

  useEffect(() => {
    if (!selectedEmail) {
      return;
    }

    const selectedUser = users.find((user) => user.email === selectedEmail);
    if (!selectedUser) {
      return;
    }

    if (selectedUser.role === "main_admin") {
      return;
    }

    setPermissions(selectedUser.permissions);
  }, [selectedEmail, users]);

  async function resolveRequest(id: string, decision: "approved" | "rejected", overridePermissions?: PermissionSet) {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/access-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, permissions: overridePermissions || permissions }),
      });

      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to update request");
      }

      setMessage(`Request ${decision}.`);
      await loadData();
    } catch (resolveError) {
      setError(resolveError instanceof Error ? resolveError.message : "Unable to update request");
    }
  }

  async function updateUser(targetEmail: string, revoke = false) {
    if (!targetEmail) {
      setError("Email is required");
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          permissions,
          revoke,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to update admin user");
      }

      setMessage(revoke ? "Admin revoked." : "Admin saved.");
      if (!revoke) {
        setNewEmail("");
      }
      await loadData();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update admin user");
    }
  }

  async function addUserFromInput() {
    if (!canAddByEmail) {
      setError("Enter a valid email address");
      return;
    }

    await updateUser(normalizedNewEmail, false);
  }

  function setAllClubs() {
    setPermissions((current) => ({
      ...current,
      allowedClubs: ["*"],
      allowedDomains: ["*"],
    }));
  }

  function setAllDomains() {
    setPermissions((current) => ({ ...current, allowedDomains: ["*"] }));
  }

  function toggleClubScope(club: string) {
    setPermissions((current) => {
      if (current.allowedClubs.includes("*")) {
        return {
          ...current,
          allowedClubs: [club],
          allowedDomains: current.allowedDomains.includes("*") ? ["*"] : current.allowedDomains,
        };
      }

      const exists = current.allowedClubs.includes(club);
      const nextClubs = exists
        ? current.allowedClubs.filter((item) => item !== club)
        : [...current.allowedClubs, club];

      if (nextClubs.length === 0) {
        return { ...current, allowedClubs: ["*"], allowedDomains: ["*"] };
      }

      return { ...current, allowedClubs: nextClubs };
    });
  }

  function toggleDomainScope(domain: string) {
    setPermissions((current) => {
      if (current.allowedClubs.includes("*")) {
        return { ...current, allowedDomains: ["*"] };
      }

      if (current.allowedDomains.includes("*")) {
        return { ...current, allowedDomains: [domain] };
      }

      const exists = current.allowedDomains.includes(domain);
      const nextDomains = exists
        ? current.allowedDomains.filter((item) => item !== domain)
        : [...current.allowedDomains, domain];

      if (nextDomains.length === 0) {
        return { ...current, allowedDomains: ["*"] };
      }

      return { ...current, allowedDomains: nextDomains };
    });
  }

  const availableDomainOptions = useMemo(() => {
    const selectedClubs = permissions.allowedClubs.map((item) => item.trim().toLowerCase()).filter(Boolean);
    const allDomains = new Set(domainOptions.filter((domain) => !INVALID_DOMAIN_KEYS.has(domain)));

    Object.values(clubDomainMap).forEach((items) => {
      items.forEach((item) => {
        if (!INVALID_DOMAIN_KEYS.has(item)) {
          allDomains.add(item);
        }
      });
    });

    if (selectedClubs.length === 0 || selectedClubs.includes("*")) {
      return Array.from(allDomains).sort();
    }

    const scoped = new Set<string>();
    selectedClubs.forEach((club) => {
      (clubDomainMap[club] || []).forEach((domain) => {
        if (!INVALID_DOMAIN_KEYS.has(domain)) {
          scoped.add(domain);
        }
      });
    });

    if (scoped.size === 0) {
      return Array.from(allDomains).sort();
    }

    return Array.from(scoped).sort();
  }, [permissions.allowedClubs, domainOptions, clubDomainMap]);

  const requestStatusCounts = useMemo(
    () => ({
      pending: requests.filter((item) => item.status === "pending").length,
      approved: requests.filter((item) => item.status === "approved").length,
      rejected: requests.filter((item) => item.status === "rejected").length,
    }),
    [requests],
  );

  const filteredRequests = useMemo(() => {
    if (requestStatusFilter === "all") {
      return requests;
    }
    return requests.filter((item) => item.status === requestStatusFilter);
  }, [requests, requestStatusFilter]);

  useEffect(() => {
    if (permissions.allowedClubs.includes("*") && !permissions.allowedDomains.includes("*")) {
      setPermissions((current) => ({ ...current, allowedDomains: ["*"] }));
      return;
    }

    if (permissions.allowedDomains.includes("*")) {
      return;
    }

    const validDomains = new Set(availableDomainOptions);
    const nextDomains = permissions.allowedDomains.filter((domain) => validDomains.has(domain));

    if (nextDomains.length !== permissions.allowedDomains.length) {
      setPermissions((current) => ({
        ...current,
        allowedDomains: nextDomains.length > 0 ? nextDomains : ["*"],
      }));
    }
  }, [availableDomainOptions, permissions.allowedClubs, permissions.allowedDomains]);

  function togglePermission<K extends keyof PermissionSet>(key: K) {
    if (key === "allowedClubs" || key === "allowedDomains") {
      return;
    }

    setPermissions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function toggleEditingRequestPermission<K extends keyof PermissionSet>(key: K) {
    if (key === "allowedClubs" || key === "allowedDomains") {
      return;
    }

    setEditingRequestPermissions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function startRequestEdit(request: AccessRequest) {
    setEditingRequestId(request._id);
    setEditingRequestMessage(request.message || "");
    setEditingRequestPermissions(request.requestedPermissions || defaultPermissions);
  }

  async function saveRequestEdits() {
    if (!editingRequestId) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/access-requests/${editingRequestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: editingRequestMessage,
          requestedPermissions: editingRequestPermissions,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to edit request");
      }

      setMessage("Request updated.");
      setEditingRequestId(null);
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to edit request");
    }
  }

  async function removeRequest(id: string) {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/access-requests/${id}`, { method: "DELETE" });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to remove request");
      }

      if (editingRequestId === id) {
        setEditingRequestId(null);
      }

      setMessage("Request removed.");
      await loadData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to remove request");
    }
  }

  if (!canManageAccessRequests && !canManageAdmins) {
    return null;
  }

  return (
    <section className="space-y-5 rounded-3xl border border-black/10 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm dark:border-white/10 dark:from-slate-900 dark:to-slate-950">
      <h2 className="font-display text-xl font-bold">Governance</h2>
      <p className="text-xs text-slate-500">Manage access requests, roles, and scoped permissions for club/domain operations.</p>
      {loading ? <p className="text-sm">Loading governance data...</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

      {canManageAccessRequests ? (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Access Requests</h3>
            <div className="flex items-center gap-2 text-xs">
              <button type="button" onClick={() => setRequestStatusFilter("all")} className={chipClass(requestStatusFilter === "all")}>All ({requests.length})</button>
              <button type="button" onClick={() => setRequestStatusFilter("pending")} className={chipClass(requestStatusFilter === "pending")}>Pending ({requestStatusCounts.pending})</button>
              <button type="button" onClick={() => setRequestStatusFilter("approved")} className={chipClass(requestStatusFilter === "approved")}>Approved ({requestStatusCounts.approved})</button>
              <button type="button" onClick={() => setRequestStatusFilter("rejected")} className={chipClass(requestStatusFilter === "rejected")}>Rejected ({requestStatusCounts.rejected})</button>
            </div>
          </div>

          {editingRequestId ? (
            <div className="mt-3 space-y-2 rounded-xl border border-black/10 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Edit Request</p>
              <textarea
                value={editingRequestMessage}
                onChange={(event) => setEditingRequestMessage(event.target.value)}
                rows={3}
                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900"
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label><input type="checkbox" checked={editingRequestPermissions.canManageAdmins} onChange={() => toggleEditingRequestPermission("canManageAdmins")} /> Manage Admins</label>
                <label><input type="checkbox" checked={editingRequestPermissions.canManageAccessRequests} onChange={() => toggleEditingRequestPermission("canManageAccessRequests")} /> Manage Access Requests</label>
                <label><input type="checkbox" checked={editingRequestPermissions.canCreateEvents} onChange={() => toggleEditingRequestPermission("canCreateEvents")} /> Create Events</label>
                <label><input type="checkbox" checked={editingRequestPermissions.canEditEvents} onChange={() => toggleEditingRequestPermission("canEditEvents")} /> Edit Events</label>
                <label><input type="checkbox" checked={editingRequestPermissions.canDeleteEvents} onChange={() => toggleEditingRequestPermission("canDeleteEvents")} /> Delete Events</label>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => { saveRequestEdits().catch(() => {}); }} className="rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white">Save</button>
                <button type="button" onClick={() => setEditingRequestId(null)} className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold dark:border-white/10">Cancel</button>
              </div>
            </div>
          ) : null}

          <div className="mt-2 space-y-2">
            {filteredRequests.map((request) => (
              (() => {
                const requested = request.requestedPermissions || defaultPermissions;
                return (
              <div key={request._id} className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{request.name} ({request.email})</p>
                    <p className="text-xs text-slate-500">{new Date(request.requestedAt).toLocaleString()}</p>
                  </div>
                  <span className={chipClass(request.status === "pending")}>{request.status}</span>
                </div>
                <p className="mt-1 text-slate-700 dark:text-slate-300">{request.message}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Requested: {requested.canManageAdmins ? "Manage Admins, " : ""}
                  {requested.canManageAccessRequests ? "Manage Access Requests, " : ""}
                  {requested.canCreateEvents ? "Create, " : ""}
                  {requested.canEditEvents ? "Edit, " : ""}
                  {requested.canDeleteEvents ? "Delete" : ""}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {request.email !== currentAdminEmail && (
                    <>
                      <button
                        type="button"
                        onClick={() => startRequestEdit(request)}
                        className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold dark:border-white/10"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => { removeRequest(request._id).catch(() => {}); }}
                        className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white"
                      >
                        Remove
                      </button>
                    </>
                  )}
                  {request.email === currentAdminEmail && request.status === "pending" && (
                    <p className="text-xs text-slate-500 italic">You can edit your own pending request via the request form.</p>
                  )}
                  {request.status === "pending" ? (
                    <>
                    <button
                      type="button"
                      onClick={() => {
                        setPermissions(requested);
                        setMessage("Requested permissions loaded. You can edit and then approve with current settings.");
                      }}
                      className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold dark:border-white/10"
                    >
                      Load Requested
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resolveRequest(request._id, "approved", requested).catch(() => {});
                      }}
                      className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Approve Requested
                    </button>
                    <button
                      type="button"
                      onClick={() => resolveRequest(request._id, "approved").catch(() => {})}
                      className="rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Approve Current
                    </button>
                    <button type="button" onClick={() => resolveRequest(request._id, "rejected")} className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white">Reject</button>
                    </>
                  ) : null}
                </div>
              </div>
                );
              })()
            ))}
            {!loading && filteredRequests.length === 0 ? <p className="text-sm text-slate-500">No access requests for this filter.</p> : null}
          </div>
        </div>
      ) : null}

      {canManageAdmins ? (
        <div>
          <h3 className="font-semibold">Admin Users</h3>
          <div className="mt-2 space-y-2">
            {users.map((user) => (
              <div key={user.email} className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                <p className="font-semibold">{user.name} ({user.email})</p>
                <p className="text-xs text-slate-500">Access: {user.permissions.canManageAdmins ? "Manager" : "Operator"}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2 rounded-xl border border-black/10 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-900/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Add User By Email</p>
            <div className="flex gap-2">
              <input
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addUserFromInput().catch(() => {});
                  }
                }}
                placeholder="Email to add"
                className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
              />
              <button
                type="button"
                disabled={!canAddByEmail}
                onClick={() => { addUserFromInput().catch(() => {}); }}
                className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                Add User
              </button>
            </div>
            <p className="text-xs text-slate-500">Selected permissions and scope below will be applied when adding this user.</p>
            {!canAddByEmail ? <p className="text-xs text-slate-500">Enter a valid email address to enable add action.</p> : null}
          </div>

          <div className="mt-3 grid gap-3 rounded-xl border border-black/10 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-900/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Update Existing User</p>
            <div className="space-y-2">
              <p className="text-xs font-semibold">Permission presets</p>
              <div className="flex flex-wrap gap-2">
                {PERMISSION_PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setPermissions(preset.apply)}
                    className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <select value={selectedEmail} onChange={(event) => setSelectedEmail(event.target.value)} className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950">
              <option value="">Select user email</option>
              {users.map((user) => (
                user.email !== currentAdminEmail && (
                  <option key={user.email} value={user.email}>{user.email}</option>
                )
              ))}
            </select>
            {selectedEmail === currentAdminEmail && (
              <p className="rounded-md bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                ⚠️ You cannot modify your own permissions.
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label><input type="checkbox" checked={permissions.canManageAdmins} onChange={() => togglePermission("canManageAdmins")} /> Manage Admins</label>
              <label><input type="checkbox" checked={permissions.canManageAccessRequests} onChange={() => togglePermission("canManageAccessRequests")} /> Manage Access Requests</label>
              <label><input type="checkbox" checked={permissions.canCreateEvents} onChange={() => togglePermission("canCreateEvents")} /> Create Events</label>
              <label><input type="checkbox" checked={permissions.canEditEvents} onChange={() => togglePermission("canEditEvents")} /> Edit Events</label>
              <label><input type="checkbox" checked={permissions.canDeleteEvents} onChange={() => togglePermission("canDeleteEvents")} /> Delete Events</label>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold">Allowed clubs</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={setAllClubs} className={chipClass(clubsAllSelected)}>All clubs</button>
                {clubOptions.map((club) => (
                  <button
                    key={club}
                    type="button"
                    onClick={() => toggleClubScope(club)}
                    className={chipClass(!clubsAllSelected && permissions.allowedClubs.includes(club))}
                  >
                    {humanizeToken(club)}
                  </button>
                ))}
              </div>
            </div>
            {!clubsAllSelected ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold">Allowed domains</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={setAllDomains} className={chipClass(domainsAllSelected)}>All domains</button>
                  {availableDomainOptions.map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => toggleDomainScope(domain)}
                      className={chipClass(!domainsAllSelected && permissions.allowedDomains.includes(domain))}
                    >
                      {humanizeToken(domain)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                All clubs selected. Domain scope is automatically set to all domains.
              </p>
            )}
            <p className="text-xs text-slate-500">
              Scope preview: {permissions.allowedClubs.includes("*") ? "All clubs" : `${permissions.allowedClubs.length} club(s)`} / {permissions.allowedDomains.includes("*") ? "All domains" : `${permissions.allowedDomains.length} domain(s)`}
            </p>
            <div className="flex gap-2">
              <button type="button" disabled={!selectedEmail} onClick={() => { updateUser(selectedEmail, false).catch(() => {}); }} className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">Update User</button>
              <button type="button" disabled={!selectedEmail} onClick={() => { updateUser(selectedEmail, true).catch(() => {}); }} className="rounded-md bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">Revoke User</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
