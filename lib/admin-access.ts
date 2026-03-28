import { ObjectId } from "mongodb";
import type { Session } from "next-auth";
import type { Event } from "@/data/events";
import { getMongoDb, hasMongoConfig } from "@/lib/mongodb";

export type AdminRole = "main_admin" | "operator";

export type PermissionSet = {
  canManageAdmins: boolean;
  canManageAccessRequests: boolean;
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  allowedClubs: string[];
  allowedDomains: string[];
};

export type AdminUser = {
  _id?: ObjectId;
  email: string;
  name: string;
  image?: string;
  role: AdminRole;
  permissions: PermissionSet;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

export type AccessRequestStatus = "pending" | "approved" | "rejected";

export type AccessRequest = {
  _id?: ObjectId;
  email: string;
  name: string;
  image?: string;
  message: string;
  requestedPermissions: PermissionSet;
  status: AccessRequestStatus;
  requestedAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolutionNote?: string;
};

const ADMIN_USERS_COLLECTION = "admin_users";
const ACCESS_REQUESTS_COLLECTION = "admin_access_requests";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function parseEmailList(raw: string | undefined) {
  return (raw || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function getMainAdminCandidates() {
  const candidates = new Set<string>();

  const primary = process.env.MAIN_ADMIN_EMAIL?.trim().toLowerCase();
  if (primary) {
    candidates.add(primary);
  }

  for (const email of parseEmailList(process.env.ADMIN_ALLOWED_EMAILS)) {
    candidates.add(email);
  }

  return Array.from(candidates);
}

function hasWildcard(values: string[]) {
  return values.includes("*");
}

function normalizeStringList(values: string[]) {
  const normalized = values
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const unique = Array.from(new Set(normalized));
  if (unique.length === 0) {
    return ["*"];
  }

  return unique;
}

export function defaultPermissions(role: AdminRole): PermissionSet {
  if (role === "main_admin") {
    return {
      canManageAdmins: true,
      canManageAccessRequests: true,
      canCreateEvents: true,
      canEditEvents: true,
      canDeleteEvents: true,
      allowedClubs: ["*"],
      allowedDomains: ["*"],
    };
  }

  return {
    canManageAdmins: false,
    canManageAccessRequests: false,
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: false,
    allowedClubs: ["*"],
    allowedDomains: ["*"],
  };
}

function sanitizePermissions(input: Partial<PermissionSet> | undefined, role: AdminRole) {
  const base = defaultPermissions(role);
  const allowedClubs = normalizeStringList(input?.allowedClubs ?? base.allowedClubs);
  const allowedDomains = allowedClubs.includes("*")
    ? ["*"]
    : normalizeStringList(input?.allowedDomains ?? base.allowedDomains);

  return {
    ...base,
    ...input,
    allowedClubs,
    allowedDomains,
  } satisfies PermissionSet;
}

function assertDelegablePermissions(actor: AdminUser, target: PermissionSet) {
  if (actor.role === "main_admin") {
    return;
  }

  const actorPermissions = actor.permissions;

  const booleanKeys: Array<keyof Omit<PermissionSet, "allowedClubs" | "allowedDomains">> = [
    "canManageAdmins",
    "canManageAccessRequests",
    "canCreateEvents",
    "canEditEvents",
    "canDeleteEvents",
  ];

  for (const key of booleanKeys) {
    if (target[key] && !actorPermissions[key]) {
      throw new Error(`You cannot grant ${String(key)} permission`);
    }
  }

  if (!hasWildcard(actorPermissions.allowedClubs)) {
    if (hasWildcard(target.allowedClubs)) {
      throw new Error("You cannot grant all-club scope");
    }

    const actorClubs = new Set(actorPermissions.allowedClubs);
    for (const club of target.allowedClubs) {
      if (!actorClubs.has(club)) {
        throw new Error(`You cannot grant club scope: ${club}`);
      }
    }
  }

  if (!hasWildcard(actorPermissions.allowedDomains)) {
    if (hasWildcard(target.allowedDomains)) {
      throw new Error("You cannot grant all-domain scope");
    }

    const actorDomains = new Set(actorPermissions.allowedDomains);
    for (const domain of target.allowedDomains) {
      if (!actorDomains.has(domain)) {
        throw new Error(`You cannot grant domain scope: ${domain}`);
      }
    }
  }
}

function canDelegatePermissions(actor: AdminUser, target: PermissionSet) {
  try {
    assertDelegablePermissions(actor, target);
    return true;
  } catch {
    return false;
  }
}

function canHandleAccessRequest(actor: AdminUser, request: AccessRequest) {
  // Prevent self-approval/self-management of requests
  if (request.email === actor.email) {
    return false;
  }

  if (actor.role === "main_admin") {
    return true;
  }

  const requestedPermissions = sanitizePermissions(request.requestedPermissions, "operator");
  if (request.status === "pending") {
    return canDelegatePermissions(actor, requestedPermissions);
  }

  return request.resolvedBy === actor.email;
}

function isMainAdminEmail(email: string) {
  return getMainAdminCandidates().includes(normalizeEmail(email));
}

async function ensureCollections() {
  const db = await getMongoDb();
  const users = db.collection<AdminUser>(ADMIN_USERS_COLLECTION);
  const requests = db.collection<AccessRequest>(ACCESS_REQUESTS_COLLECTION);

  await users.createIndex({ email: 1 }, { unique: true });
  await requests.createIndex({ email: 1, status: 1 });

  return { users, requests };
}

export async function ensureMainAdminFromSession(session: Session | null) {
  if (!session?.user?.email || !hasMongoConfig()) {
    return;
  }

  const email = normalizeEmail(session.user.email);
  if (!isMainAdminEmail(email)) {
    return;
  }

  const { users } = await ensureCollections();

  const existing = await users.findOne({ email });
  if (existing) {
    await users.updateOne(
      { email },
      {
        $set: {
          role: "main_admin",
          permissions: defaultPermissions("main_admin"),
          name: session.user.name || existing.name,
          image: session.user.image || existing.image,
          updatedAt: new Date(),
          lastLoginAt: new Date(),
        },
      },
    );
    return;
  }

  const now = new Date();
  await users.insertOne({
    email,
    name: session.user.name || email,
    image: session.user.image || "",
    role: "main_admin",
    permissions: defaultPermissions("main_admin"),
    createdBy: "bootstrap",
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  });
}

export async function getAdminUserByEmail(email: string) {
  if (!hasMongoConfig()) {
    return null;
  }

  const { users } = await ensureCollections();
  return users.findOne({ email: normalizeEmail(email) });
}

export async function getAdminContext(session: Session | null) {
  if (!session?.user?.email) {
    return { session, adminUser: null };
  }

  await ensureMainAdminFromSession(session);
  const adminUser = await getAdminUserByEmail(session.user.email);

  if (adminUser) {
    const { users } = await ensureCollections();
    await users.updateOne({ email: adminUser.email }, { $set: { lastLoginAt: new Date(), updatedAt: new Date() } });
  }

  return { session, adminUser };
}

export function canManageAdmins(adminUser: AdminUser | null) {
  return Boolean(adminUser?.permissions.canManageAdmins);
}

export function canManageAccessRequests(adminUser: AdminUser | null) {
  return Boolean(adminUser?.permissions.canManageAccessRequests);
}

function hasClubDomainAccess(adminUser: AdminUser, club: string, domain: string) {
  const normalizedClub = club.trim().toLowerCase();
  const normalizedDomain = domain.trim().toLowerCase();

  const clubAllowed = hasWildcard(adminUser.permissions.allowedClubs) || adminUser.permissions.allowedClubs.includes(normalizedClub);
  const domainAllowed = hasWildcard(adminUser.permissions.allowedDomains) || adminUser.permissions.allowedDomains.includes(normalizedDomain);

  return clubAllowed && domainAllowed;
}

export function canCreateEvent(adminUser: AdminUser | null, event: Event) {
  if (!adminUser?.permissions.canCreateEvents) {
    return false;
  }
  return hasClubDomainAccess(adminUser, event.club, event.domain);
}

export function canEditEvent(adminUser: AdminUser | null, originalEvent: Event, nextEvent: Event) {
  if (!adminUser?.permissions.canEditEvents) {
    return false;
  }
  return hasClubDomainAccess(adminUser, originalEvent.club, originalEvent.domain) && hasClubDomainAccess(adminUser, nextEvent.club, nextEvent.domain);
}

export function canDeleteEvent(adminUser: AdminUser | null, event: Event) {
  if (!adminUser?.permissions.canDeleteEvents) {
    return false;
  }
  return hasClubDomainAccess(adminUser, event.club, event.domain);
}

export async function createAccessRequest(session: Session, message: string, requestedPermissions?: Partial<PermissionSet>) {
  if (!hasMongoConfig()) {
    throw new Error("MongoDB is not configured");
  }

  if (!session.user?.email) {
    throw new Error("Unauthorized");
  }

  const email = normalizeEmail(session.user.email);
  const { requests } = await ensureCollections();

  const pending = await requests.findOne({ email, status: "pending" });
  if (pending) {
    throw new Error("You already have a pending request");
  }

  const normalizedRequestedPermissions = sanitizePermissions(requestedPermissions, "operator");

  await requests.insertOne({
    email,
    name: session.user.name || email,
    image: session.user.image || "",
    message: message.trim() || "Requesting admin access",
    requestedPermissions: normalizedRequestedPermissions,
    status: "pending",
    requestedAt: new Date(),
  });
}

export async function getMyPendingAccessRequest(email: string) {
  if (!hasMongoConfig()) {
    return null;
  }

  const { requests } = await ensureCollections();
  return requests.findOne({ email: normalizeEmail(email), status: "pending" });
}

export async function listAccessRequests() {
  const { requests } = await ensureCollections();
  return requests.find({}, { sort: { requestedAt: -1 } }).toArray();
}

export async function listManageableAccessRequests(actor: AdminUser) {
  const requests = await listAccessRequests();
  return requests.filter((request) => canHandleAccessRequest(actor, request));
}

export async function updateAccessRequest(
  requestId: string,
  actor: AdminUser,
  update: {
    message?: string;
    requestedPermissions?: Partial<PermissionSet>;
  },
) {
  const { requests } = await ensureCollections();
  const objectId = new ObjectId(requestId);
  const request = await requests.findOne({ _id: objectId });

  if (!request) {
    throw new Error("Request not found");
  }

  if (request.email === actor.email) {
    throw new Error("You cannot edit your own access request. Please submit a new request if changes are needed.");
  }

  if (!canHandleAccessRequest(actor, request)) {
    throw new Error("You cannot edit this access request");
  }

  const patch: Partial<AccessRequest> = {};

  if (typeof update.message === "string") {
    patch.message = update.message.trim() || request.message;
  }

  if (update.requestedPermissions) {
    const normalized = sanitizePermissions(update.requestedPermissions, "operator");
    if (!canDelegatePermissions(actor, normalized)) {
      throw new Error("You cannot set requested permissions above your scope");
    }
    patch.requestedPermissions = normalized;
  }

  if (Object.keys(patch).length === 0) {
    return;
  }

  await requests.updateOne({ _id: objectId }, { $set: patch });
}

export async function deleteAccessRequest(requestId: string, actor: AdminUser) {
  const { requests } = await ensureCollections();
  const objectId = new ObjectId(requestId);
  const request = await requests.findOne({ _id: objectId });

  if (!request) {
    throw new Error("Request not found");
  }

  if (request.email === actor.email) {
    throw new Error("You cannot delete your own access request.");
  }

  if (!canHandleAccessRequest(actor, request)) {
    throw new Error("You cannot remove this access request");
  }

  await requests.deleteOne({ _id: objectId });
}

export async function resolveAccessRequest(
  requestId: string,
  decision: "approved" | "rejected",
  actor: AdminUser,
  config?: {
    permissions?: Partial<PermissionSet>;
    resolutionNote?: string;
  },
) {
  const { requests, users } = await ensureCollections();
  const objectId = new ObjectId(requestId);
  const request = await requests.findOne({ _id: objectId });

  if (!request) {
    throw new Error("Request not found");
  }

  if (request.email === actor.email) {
    throw new Error("You cannot approve or reject your own access request");
  }

  const requestedPermissions = sanitizePermissions(request.requestedPermissions, "operator");

  if (!canDelegatePermissions(actor, requestedPermissions)) {
    throw new Error("You cannot handle this access request due to permission/scope limits");
  }

  const now = new Date();

  if (decision === "approved") {
    if (!actor.permissions.canManageAdmins) {
      throw new Error("You cannot grant admin access");
    }

    const role: AdminRole = "operator";
    const permissions = sanitizePermissions(config?.permissions ?? requestedPermissions, role);
    assertDelegablePermissions(actor, permissions);

    await users.updateOne(
      { email: request.email },
      {
        $set: {
          email: request.email,
          name: request.name,
          image: request.image || "",
          role,
          permissions,
          updatedAt: now,
          createdBy: actor.email,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }

  await requests.updateOne(
    { _id: objectId },
    {
      $set: {
        status: decision,
        resolvedAt: now,
        resolvedBy: actor.email,
        resolutionNote: config?.resolutionNote || "",
      },
    },
  );
}

export async function listAdminUsers() {
  const { users } = await ensureCollections();
  return users.find({}, { sort: { createdAt: 1 } }).toArray();
}

export async function updateAdminUser(
  email: string,
  actor: AdminUser,
  update: {
    permissions?: Partial<PermissionSet>;
    revoke?: boolean;
  },
) {
  const normalizedEmail = normalizeEmail(email);

  if (actor.email === normalizedEmail && !update.revoke) {
    throw new Error("You cannot edit your own permissions");
  }

  if (actor.email === normalizedEmail && update.revoke) {
    throw new Error("You cannot revoke yourself");
  }

  const { users } = await ensureCollections();
  const existing = await users.findOne({ email: normalizedEmail });

  if (!actor.permissions.canManageAdmins) {
    throw new Error("You do not have permission to manage admin users");
  }

  if (!existing) {
    if (update.revoke) {
      throw new Error("Admin user not found");
    }

    const roleForNewUser: AdminRole = "operator";
    const permissionsForNewUser = sanitizePermissions(update.permissions, roleForNewUser);
    assertDelegablePermissions(actor, permissionsForNewUser);
    const now = new Date();

    await users.insertOne({
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0] || normalizedEmail,
      image: "",
      role: roleForNewUser,
      permissions: permissionsForNewUser,
      createdBy: actor.email,
      createdAt: now,
      updatedAt: now,
    });

    return;
  }

  if (existing.role === "main_admin" && actor.role !== "main_admin") {
    throw new Error("Only main admin can update another main admin");
  }

  if (update.revoke) {
    if (existing.role === "main_admin") {
      throw new Error("Cannot revoke main admin");
    }
    await users.deleteOne({ email: normalizedEmail });
    return;
  }

  const role: AdminRole = existing.role === "main_admin" ? "main_admin" : "operator";
  const permissions = sanitizePermissions(update.permissions ?? existing.permissions, role);
  assertDelegablePermissions(actor, permissions);

  await users.updateOne(
    { email: normalizedEmail },
    {
      $set: {
        role,
        permissions,
        updatedAt: new Date(),
      },
    },
  );
}

export function getPermissionSummary(adminUser: AdminUser | null) {
  if (!adminUser) {
    return null;
  }

  return {
    email: adminUser.email,
    permissions: adminUser.permissions,
  };
}
