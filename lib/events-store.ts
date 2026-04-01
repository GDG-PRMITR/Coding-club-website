import { ObjectId } from "mongodb";
import { revalidateTag, unstable_cache } from "next/cache";
import { events as fallbackEvents, eventTypes, type Event, type EventType } from "@/data/events";
import { getMongoDb, hasMongoConfig } from "@/lib/mongodb";

type EventDocument = Event & {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

type VisibilityScope = "event" | "club" | "domain" | "eventType";

type EventVisibilityDocument = {
  _id?: ObjectId;
  key: "global";
  hiddenEventIds: string[];
  hiddenClubs: string[];
  hiddenDomains: string[];
  hiddenEventTypes: EventType[];
  updatedAt?: Date;
};

export type EventVisibilityConfig = {
  hiddenEventIds: string[];
  hiddenClubs: string[];
  hiddenDomains: string[];
  hiddenEventTypes: EventType[];
};

const COLLECTION_NAME = "events";
const VISIBILITY_COLLECTION_NAME = "event_visibility";
const EVENTS_CACHE_TAG = "events";
const EVENTS_SITEMAP_CACHE_TAG = "events-sitemap";
const EVENTS_VISIBILITY_CACHE_TAG = "events-visibility";

const DEFAULT_EVENT_VISIBILITY: EventVisibilityConfig = {
  hiddenEventIds: [],
  hiddenClubs: ["cisco"],
  hiddenDomains: [],
  hiddenEventTypes: [],
};

function toEvent(document: EventDocument): Event {
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    tags: document.tags,
    date: document.date,
    endDate: document.endDate,
    time: document.time,
    location: document.location,
    organizers: document.organizers,
    domain: document.domain,
    club: document.club,
    eventType: document.eventType,
    registrationLink: document.registrationLink,
  };
}

function normalizeStringSet(values: string[]) {
  return Array.from(new Set(values.map((item) => item.trim().toLowerCase()).filter(Boolean)));
}

function normalizeEventTypeSet(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((item) => item.trim())
        .filter((item): item is EventType => eventTypes.includes(item as EventType)),
    ),
  );
}

function normalizeVisibilityConfig(input: Partial<EventVisibilityConfig> | undefined): EventVisibilityConfig {
  return {
    hiddenEventIds: normalizeStringSet(input?.hiddenEventIds ?? []),
    hiddenClubs: normalizeStringSet(input?.hiddenClubs ?? []),
    hiddenDomains: normalizeStringSet(input?.hiddenDomains ?? []),
    hiddenEventTypes: normalizeEventTypeSet(input?.hiddenEventTypes ?? []),
  };
}

function applyVisibility(events: Event[], config: EventVisibilityConfig) {
  const hiddenEventIds = new Set(config.hiddenEventIds);
  const hiddenClubs = new Set(config.hiddenClubs);
  const hiddenDomains = new Set(config.hiddenDomains);
  const hiddenEventTypes = new Set(config.hiddenEventTypes);

  return events.filter((event) => {
    const eventId = event.id.trim().toLowerCase();
    const club = event.club.trim().toLowerCase();
    const domain = event.domain.trim().toLowerCase();

    if (hiddenEventIds.has(eventId)) {
      return false;
    }
    if (hiddenClubs.has(club)) {
      return false;
    }
    if (hiddenDomains.has(domain)) {
      return false;
    }
    if (hiddenEventTypes.has(event.eventType)) {
      return false;
    }

    return true;
  });
}

function ensureString(value: unknown, field: string, required = true) {
  if (typeof value !== "string") {
    if (!required && (value === undefined || value === null)) {
      return "";
    }
    throw new Error(`Invalid ${field}`);
  }
  const normalized = value.trim();
  if (required && !normalized) {
    throw new Error(`Missing ${field}`);
  }
  return normalized;
}

function ensureStringArray(value: unknown, field: string) {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${field}`);
  }

  const normalized = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  if (normalized.length === 0) {
    throw new Error(`Missing ${field}`);
  }

  return normalized;
}

function normalizeId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function ensureEventType(value: unknown): EventType {
  const normalized = ensureString(value, "eventType");
  if (!eventTypes.includes(normalized as EventType)) {
    throw new Error("Invalid eventType");
  }
  return normalized as EventType;
}

function validateEventPayload(
  payload: unknown,
  options?: {
    allowGeneratedId?: boolean;
    fixedId?: string;
  },
): Event {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload");
  }

  const candidate = payload as Record<string, unknown>;

  const rawId = typeof candidate.id === "string" ? candidate.id : "";
  const title = ensureString(candidate.title, "title");

  const sourceId = options?.fixedId ?? (rawId || (options?.allowGeneratedId ? title : ""));
  const id = normalizeId(sourceId);
  if (!id) {
    throw new Error("Invalid id");
  }

  const event: Event = {
    id,
    title,
    description: ensureString(candidate.description, "description"),
    tags: ensureStringArray(candidate.tags, "tags"),
    date: ensureString(candidate.date, "date"),
    time: ensureString(candidate.time, "time"),
    location: ensureString(candidate.location, "location"),
    organizers: ensureStringArray(candidate.organizers, "organizers"),
    domain: ensureString(candidate.domain, "domain"),
    club: ensureString(candidate.club, "club"),
    eventType: ensureEventType(candidate.eventType),
  };

  const endDate = ensureString(candidate.endDate, "endDate", false);
  const registrationLink = ensureString(candidate.registrationLink, "registrationLink", false);

  if (endDate) {
    event.endDate = endDate;
  }

  if (registrationLink) {
    event.registrationLink = registrationLink;
  }

  return event;
}

async function seedIfNeeded() {
  const db = await getMongoDb();
  const collection = db.collection<EventDocument>(COLLECTION_NAME);

  const count = await collection.estimatedDocumentCount();
  if (count > 0) {
    return;
  }

  const now = new Date();
  const seeded = fallbackEvents.map((event) => ({
    ...event,
    createdAt: now,
    updatedAt: now,
  }));

  if (seeded.length > 0) {
    await collection.insertMany(seeded, { ordered: false });
  }
}

async function getCollection() {
  await seedIfNeeded();
  const db = await getMongoDb();
  return db.collection<EventDocument>(COLLECTION_NAME);
}

async function getVisibilityCollection() {
  const db = await getMongoDb();
  const collection = db.collection<EventVisibilityDocument>(VISIBILITY_COLLECTION_NAME);
  await collection.createIndex({ key: 1 }, { unique: true });
  return collection;
}

function dedupeByEventId(documents: EventDocument[]) {
  const byId = new Map<string, EventDocument>();

  for (const item of documents) {
    const existing = byId.get(item.id);
    if (!existing) {
      byId.set(item.id, item);
      continue;
    }

    const existingTime = existing.updatedAt?.getTime() ?? existing.createdAt?.getTime() ?? 0;
    const incomingTime = item.updatedAt?.getTime() ?? item.createdAt?.getTime() ?? 0;

    if (incomingTime >= existingTime) {
      byId.set(item.id, item);
    }
  }

  return Array.from(byId.values()).sort((first, second) => +new Date(second.date) - +new Date(first.date));
}

async function loadEventsFromStore(): Promise<Event[]> {
  if (!hasMongoConfig()) {
    return fallbackEvents;
  }

  try {
    const collection = await getCollection();
    const documents = await collection.find({}, { sort: { date: -1 } }).toArray();
    const uniqueDocuments = dedupeByEventId(documents);
    return uniqueDocuments.map(toEvent);
  } catch {
    return fallbackEvents;
  }
}

async function loadVisibilityFromStore(): Promise<EventVisibilityConfig> {
  if (!hasMongoConfig()) {
    return DEFAULT_EVENT_VISIBILITY;
  }

  try {
    const collection = await getVisibilityCollection();
    const existing = await collection.findOne({ key: "global" });

    if (!existing) {
      const seeded: EventVisibilityDocument = {
        key: "global",
        ...DEFAULT_EVENT_VISIBILITY,
        updatedAt: new Date(),
      };
      await collection.updateOne(
        { key: "global" },
        { $set: seeded },
        { upsert: true },
      );
      return DEFAULT_EVENT_VISIBILITY;
    }

    return normalizeVisibilityConfig(existing);
  } catch {
    return DEFAULT_EVENT_VISIBILITY;
  }
}

const getCachedEvents = unstable_cache(
  async () => loadEventsFromStore(),
  ["events-cache-v1"],
  {
    revalidate: 60,
    tags: [EVENTS_CACHE_TAG],
  },
);

const getCachedSitemapEvents = unstable_cache(
  async () => loadEventsFromStore(),
  ["events-sitemap-cache-v1"],
  {
    revalidate: 60 * 60,
    tags: [EVENTS_SITEMAP_CACHE_TAG],
  },
);

const getCachedVisibilityConfig = unstable_cache(
  async () => loadVisibilityFromStore(),
  ["events-visibility-cache-v1"],
  {
    revalidate: 60,
    tags: [EVENTS_VISIBILITY_CACHE_TAG],
  },
);

export async function getEvents(options?: { includeHidden?: boolean }): Promise<Event[]> {
  const events = await getCachedEvents();
  if (options?.includeHidden) {
    return events;
  }

  const visibility = await getCachedVisibilityConfig();
  return applyVisibility(events, visibility);
}

export async function getEventsForSitemap(): Promise<Event[]> {
  const events = await getCachedSitemapEvents();
  const visibility = await getCachedVisibilityConfig();
  return applyVisibility(events, visibility);
}

export async function getEventById(id: string, options?: { includeHidden?: boolean }): Promise<Event | null> {
  const events = await getEvents(options);
  return events.find((item) => item.id === id) ?? null;
}

export async function createEvent(payload: unknown): Promise<Event> {
  if (!hasMongoConfig()) {
    throw new Error("MongoDB is not configured");
  }

  const event = validateEventPayload(payload, { allowGeneratedId: true });
  const collection = await getCollection();

  const existing = await collection.findOne({ id: event.id });
  if (existing) {
    throw new Error("Event ID already exists");
  }

  const now = new Date();
  await collection.insertOne({ ...event, createdAt: now, updatedAt: now });

  return event;
}

export async function updateEvent(id: string, payload: unknown): Promise<Event> {
  if (!hasMongoConfig()) {
    throw new Error("MongoDB is not configured");
  }

  const event = validateEventPayload(payload, { fixedId: id });
  if (event.id !== id) {
    throw new Error("Event ID cannot be changed");
  }

  const collection = await getCollection();
  const result = await collection.updateOne(
    { id },
    {
      $set: {
        ...event,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    throw new Error("Event not found");
  }

  return event;
}

export async function deleteEvent(id: string): Promise<void> {
  if (!hasMongoConfig()) {
    throw new Error("MongoDB is not configured");
  }

  const collection = await getCollection();
  const result = await collection.deleteOne({ id });

  if (result.deletedCount === 0) {
    throw new Error("Event not found");
  }
}

export async function getEventVisibilityConfig(): Promise<EventVisibilityConfig> {
  return getCachedVisibilityConfig();
}

export async function setEventVisibilityEntries(input: {
  scope: VisibilityScope;
  values: string[];
  hidden: boolean;
}): Promise<EventVisibilityConfig> {
  if (!hasMongoConfig()) {
    throw new Error("MongoDB is not configured");
  }

  const collection = await getVisibilityCollection();
  const current = await loadVisibilityFromStore();

  const normalizedValues = input.scope === "eventType"
    ? normalizeEventTypeSet(input.values)
    : normalizeStringSet(input.values);

  if (normalizedValues.length === 0) {
    return current;
  }

  const next: EventVisibilityConfig = {
    hiddenEventIds: [...current.hiddenEventIds],
    hiddenClubs: [...current.hiddenClubs],
    hiddenDomains: [...current.hiddenDomains],
    hiddenEventTypes: [...current.hiddenEventTypes],
  };

  const map: Record<VisibilityScope, keyof EventVisibilityConfig> = {
    event: "hiddenEventIds",
    club: "hiddenClubs",
    domain: "hiddenDomains",
    eventType: "hiddenEventTypes",
  };

  const key = map[input.scope];
  const currentSet = new Set(next[key] as string[]);
  for (const value of normalizedValues) {
    if (input.hidden) {
      currentSet.add(value);
    } else {
      currentSet.delete(value);
    }
  }

  if (key === "hiddenEventTypes") {
    next.hiddenEventTypes = normalizeEventTypeSet(Array.from(currentSet));
  } else {
    next[key] = normalizeStringSet(Array.from(currentSet)) as never;
  }

  await collection.updateOne(
    { key: "global" },
    {
      $set: {
        key: "global",
        ...next,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  return next;
}

export function invalidateEventsCache() {
  revalidateTag(EVENTS_CACHE_TAG, "max");
  revalidateTag(EVENTS_SITEMAP_CACHE_TAG, "max");
  revalidateTag(EVENTS_VISIBILITY_CACHE_TAG, "max");
}

export function listEventTypes() {
  return eventTypes;
}

export { hasMongoConfig };
