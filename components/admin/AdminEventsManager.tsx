"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Event, EventType } from "@/data/events";
import AdminGovernancePanel from "@/components/admin/AdminGovernancePanel";
import { domains } from "@/data/teams";

type AdminEventsResponse = {
  ok: boolean;
  events?: Event[];
  eventTypes?: EventType[];
  visibility?: {
    hiddenEventIds: string[];
    hiddenClubs: string[];
    hiddenDomains: string[];
    hiddenEventTypes: EventType[];
  };
  mongoConfigured?: boolean;
  admin?: {
    email: string;
    permissions: {
      canManageAdmins: boolean;
      canManageAccessRequests: boolean;
      canCreateEvents: boolean;
      canEditEvents: boolean;
      canDeleteEvents: boolean;
      allowedClubs: string[];
      allowedDomains: string[];
    };
  } | null;
  error?: string;
};

type EventVisibilityConfig = {
  hiddenEventIds: string[];
  hiddenClubs: string[];
  hiddenDomains: string[];
  hiddenEventTypes: EventType[];
};

type AdminEventsManagerProps = {
  initialAdmin: NonNullable<AdminEventsResponse["admin"]>;
};

type FormState = {
  id: string;
  title: string;
  description: string;
  tags: string;
  date: string;
  endDate: string;
  time: string;
  location: string;
  organizers: string;
  domain: string;
  club: string;
  eventType: EventType;
  registrationLink: string;
};

type AdminView = "events" | "governance";
type EventsToolMode = "manual" | "import" | "visibility";

type ImportedEventInput = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  time?: unknown;
  location?: unknown;
  organizers?: unknown;
  eventType?: unknown;
  registrationLink?: unknown;
  tags?: unknown;
  domain?: unknown;
};

type DateRange = {
  date: string;
  endDate?: string;
};

const defaultForm: FormState = {
  id: "",
  title: "",
  description: "",
  tags: "",
  date: "",
  endDate: "",
  time: "",
  location: "",
  organizers: "",
  domain: "",
  club: "",
  eventType: "Workshop",
  registrationLink: "",
};

const defaultVisibility: EventVisibilityConfig = {
  hiddenEventIds: [],
  hiddenClubs: ["cisco"],
  hiddenDomains: [],
  hiddenEventTypes: [],
};

const BASE_CLUB_OPTIONS = ["gdg", "gsa", "nvidia", "cisco", "codingclub"];
const INVALID_DOMAIN_KEYS = new Set(["community", "cisco"]);

const CLUB_DOMAIN_MAP: Record<string, string[]> = {
  gdg: ["web-dev", "ai-ml", "app-dev", "cloud", "data-science", "dsa", "iot", "placement", "social-media"],
  gsa: ["genai", "webtech", "public-relations", "social-media", "graphics-editing"],
  cisco: ["management", "web-dev", "ai-data-science", "cybersecurity", "networking", "creative", "dsa", "cloud"],
  codingclub: domains.map((domain) => domain.id).filter((id) => id !== "community" && id !== "cisco"),
};

const CLUB_LABELS: Record<string, string> = {
  gdg: "GDG",
  gsa: "GSA",
  nvidia: "NVIDIA",
  cisco: "Cisco",
  codingclub: "Coding Club",
};

function humanizeToken(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function clubLabel(value: string) {
  return CLUB_LABELS[value] || humanizeToken(value);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function monthToNumber(month: string) {
  const value = month.trim().toLowerCase();
  const lookup: Record<string, number> = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5,
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    sept: 9,
    september: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12,
  };
  return lookup[value] ?? null;
}

function toIsoDate(dateValue: string) {
  const normalized = dateValue.trim();
  if (!normalized) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }

  const dayMonthYear = normalized.match(/^(\d{1,2})\s+([A-Za-z]{3,10})\s+(\d{4})$/);
  if (dayMonthYear) {
    const day = Number(dayMonthYear[1]);
    const month = monthToNumber(dayMonthYear[2]);
    const year = Number(dayMonthYear[3]);
    if (!month || day < 1 || day > 31) {
      return null;
    }
    return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const monthYear = normalized.match(/^([A-Za-z]{3,10})\s+(\d{4})$/);
  if (monthYear) {
    const month = monthToNumber(monthYear[1]);
    const year = Number(monthYear[2]);
    if (!month) {
      return null;
    }
    return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-01`;
  }

  return null;
}

function normalizeDateRange(value: unknown): DateRange | null {
  if (typeof value !== "string") {
    return null;
  }

  const raw = value.trim();
  if (!raw) {
    return null;
  }

  const parts = raw.split(/\s+[\u2013\u2014-]\s+/).map((item) => item.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const start = toIsoDate(parts[0]);
    const end = toIsoDate(parts[1]);
    if (!start || !end) {
      return null;
    }
    return {
      date: start,
      endDate: end,
    };
  }

  const single = toIsoDate(raw);
  if (!single) {
    return null;
  }

  return { date: single };
}

function normalizeTimeToken(value: string) {
  const normalized = value.trim().toUpperCase().replace(/\./g, "");
  if (!normalized) {
    return null;
  }

  const amPm = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
  if (amPm) {
    let hour = Number(amPm[1]);
    const minute = Number(amPm[2] ?? "0");
    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
      return null;
    }
    if (amPm[3] === "AM") {
      if (hour === 12) {
        hour = 0;
      }
    } else if (hour !== 12) {
      hour += 12;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  const twentyFour = normalized.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFour) {
    const hour = Number(twentyFour[1]);
    const minute = Number(twentyFour[2]);
    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return null;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  return null;
}

function normalizeTimeRange(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    return "00:00-23:59";
  }

  const parts = value.split(/[\u2013\u2014-]/).map((item) => item.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const start = normalizeTimeToken(parts[0]);
    const end = normalizeTimeToken(parts[1]);
    if (start && end) {
      return `${start}-${end}`;
    }
  }

  const single = normalizeTimeToken(value);
  if (single) {
    return single;
  }

  return value.trim();
}

function toStringList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [] as string[];
}

function mapImportedEventType(value: unknown): EventType {
  if (typeof value !== "string") {
    return "Workshop";
  }

  const normalized = value.trim();
  if (!normalized) {
    return "Workshop";
  }

  const valueMap: Record<string, EventType> = {
    workshop: "Workshop",
    hackathon: "Hackathon",
    meetup: "Meetup",
    webinar: "Webinar",
    competition: "Competition",
    social: "Social",
    ceremony: "Social",
    "study jam": "Workshop",
    campaign: "Social",
    "quiz competition": "Competition",
  };

  const byKey = valueMap[normalized.toLowerCase()];
  if (byKey) {
    return byKey;
  }

  const lowered = normalized.toLowerCase();
  if (lowered.includes("hack")) {
    return "Hackathon";
  }
  if (lowered.includes("webinar")) {
    return "Webinar";
  }
  if (lowered.includes("quiz") || lowered.includes("competition") || lowered.includes("contest")) {
    return "Competition";
  }
  if (lowered.includes("meetup") || lowered.includes("session")) {
    return "Meetup";
  }
  if (lowered.includes("campaign") || lowered.includes("ceremony")) {
    return "Social";
  }
  return "Workshop";
}

function normalizeImportedDomain(value: string) {
  const normalized = slugify(value);
  const aliasMap: Record<string, string> = {
    aiml: "ai-ml",
    "ai-ml": "ai-ml",
    "ai-ml-": "ai-ml",
    "web-dev": "web-dev",
    webdev: "web-dev",
    "app-dev": "app-dev",
    appdev: "app-dev",
    ds: "data-science",
    datascience: "data-science",
    "data-science": "data-science",
    "social-media": "social-media",
    socialmedia: "social-media",
  };

  return aliasMap[normalized] ?? normalized;
}

function isEventHiddenByConfig(event: Event, visibility: EventVisibilityConfig) {
  const eventId = event.id.trim().toLowerCase();
  const club = event.club.trim().toLowerCase();
  const domain = event.domain.trim().toLowerCase();

  if (visibility.hiddenEventIds.includes(eventId)) {
    return true;
  }
  if (visibility.hiddenClubs.includes(club)) {
    return true;
  }
  if (visibility.hiddenDomains.includes(domain)) {
    return true;
  }
  if (visibility.hiddenEventTypes.includes(event.eventType)) {
    return true;
  }

  return false;
}

function normalizeImportedEvent(
  input: ImportedEventInput,
  club: string,
  defaultDomain: string,
  allowedDomains: Set<string>,
  index: number,
): Event {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  if (!title) {
    throw new Error(`Item ${index + 1}: missing title`);
  }

  const description = typeof input.description === "string" ? input.description.trim() : "";
  if (!description) {
    throw new Error(`Item ${index + 1}: missing description`);
  }

  const dateRange = normalizeDateRange(input.date);
  if (!dateRange) {
    throw new Error(`Item ${index + 1}: unsupported date format`);
  }

  const location = typeof input.location === "string" && input.location.trim() ? input.location.trim() : "TBD";
  const organizers = toStringList(input.organizers);
  if (organizers.length === 0) {
    throw new Error(`Item ${index + 1}: at least one organizer is required`);
  }

  const eventType = mapImportedEventType(input.eventType);
  const inputDomain = typeof input.domain === "string" && input.domain.trim() ? normalizeImportedDomain(input.domain) : "";
  const fallbackDomain = defaultDomain ? normalizeImportedDomain(defaultDomain) : "";
  const effectiveDomain = inputDomain || fallbackDomain;

  if (!effectiveDomain) {
    throw new Error(`Item ${index + 1}: missing domain in JSON and no default domain selected`);
  }

  if (allowedDomains.size > 0 && !allowedDomains.has(effectiveDomain)) {
    throw new Error(`Item ${index + 1}: domain \"${effectiveDomain}\" is outside selected club scope`);
  }

  const inferredTags = toStringList(input.tags);
  const tags = inferredTags.length > 0 ? inferredTags : [eventType, humanizeToken(effectiveDomain), clubLabel(club)].filter(Boolean);

  const event: Event = {
    id: slugify(`${title}-${dateRange.date}`),
    title,
    description,
    tags,
    date: dateRange.date,
    time: normalizeTimeRange(input.time),
    location,
    organizers,
    domain: effectiveDomain,
    club,
    eventType,
  };

  if (dateRange.endDate) {
    event.endDate = dateRange.endDate;
  }

  if (typeof input.registrationLink === "string" && input.registrationLink.trim()) {
    event.registrationLink = input.registrationLink.trim();
  }

  return event;
}

function eventToForm(event: Event): FormState {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    tags: event.tags.join(", "),
    date: event.date,
    endDate: event.endDate || "",
    time: event.time,
    location: event.location,
    organizers: event.organizers.join(", "),
    domain: event.domain,
    club: event.club,
    eventType: event.eventType,
    registrationLink: event.registrationLink || "",
  };
}

function formToPayload(form: FormState): Event {
  const inferredId = slugify(form.id.trim() || form.title.trim());

  return {
    id: inferredId,
    title: form.title.trim(),
    description: form.description.trim(),
    tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
    date: form.date,
    endDate: form.endDate.trim() || undefined,
    time: form.time.trim(),
    location: form.location.trim(),
    organizers: form.organizers.split(",").map((item) => item.trim()).filter(Boolean),
    domain: form.domain.trim(),
    club: form.club.trim(),
    eventType: form.eventType,
    registrationLink: form.registrationLink.trim() || undefined,
  };
}

export default function AdminEventsManager({ initialAdmin }: AdminEventsManagerProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>(["Workshop", "Hackathon", "Meetup", "Webinar", "Competition", "Social"]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mongoConfigured, setMongoConfigured] = useState(true);
  const [admin, setAdmin] = useState(initialAdmin);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyMyScope, setShowOnlyMyScope] = useState(true);
  const [activeView, setActiveView] = useState<AdminView>("events");
  const [importing, setImporting] = useState(false);
  const [importClub, setImportClub] = useState("");
  const [importDomain, setImportDomain] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<EventVisibilityConfig>(defaultVisibility);
  const [visibilityLoading, setVisibilityLoading] = useState(false);
  const [visibilityClub, setVisibilityClub] = useState("");
  const [visibilityDomain, setVisibilityDomain] = useState("");
  const [visibilityType, setVisibilityType] = useState<EventType | "">("");
  const [eventsToolMode, setEventsToolMode] = useState<EventsToolMode>("manual");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");

  const isEditing = Boolean(editingId);

  const normalizedAllowedClubs = useMemo(
    () => Array.from(new Set(admin.permissions.allowedClubs.map((item) => item.trim().toLowerCase()).filter(Boolean))),
    [admin.permissions.allowedClubs],
  );

  const normalizedAllowedDomains = useMemo(
    () => Array.from(new Set(admin.permissions.allowedDomains.map((item) => item.trim().toLowerCase()).filter(Boolean))),
    [admin.permissions.allowedDomains],
  );

  const hasAllClubsAccess = normalizedAllowedClubs.includes("*");
  const hasAllDomainsAccess = hasAllClubsAccess || normalizedAllowedDomains.includes("*");

  const domainOptions = useMemo(() => {
    const values = new Set<string>();
    Object.values(CLUB_DOMAIN_MAP).forEach((items) => {
      items.forEach((item) => {
        if (!INVALID_DOMAIN_KEYS.has(item)) {
          values.add(item);
        }
      });
    });
    events
      .map((event) => event.domain.trim().toLowerCase())
      .filter((domain) => Boolean(domain) && !INVALID_DOMAIN_KEYS.has(domain))
      .forEach((domain) => values.add(domain));
    if (form.domain.trim()) {
      const currentDomain = form.domain.trim().toLowerCase();
      if (!INVALID_DOMAIN_KEYS.has(currentDomain)) {
        values.add(currentDomain);
      }
    }
    return Array.from(values).sort();
  }, [events, form.domain]);

  const clubOptions = useMemo(() => {
    const values = new Set(BASE_CLUB_OPTIONS);
    events.map((event) => event.club.trim().toLowerCase()).filter(Boolean).forEach((club) => values.add(club));
    if (form.club.trim()) {
      values.add(form.club.trim().toLowerCase());
    }
    return Array.from(values).sort();
  }, [events, form.club]);

  const allowedClubOptions = useMemo(() => {
    if (hasAllClubsAccess) {
      return clubOptions;
    }

    const values = new Set(normalizedAllowedClubs.filter((item) => item !== "*"));
    if (values.size === 0) {
      return [] as string[];
    }

    return Array.from(values).sort();
  }, [clubOptions, hasAllClubsAccess, normalizedAllowedClubs]);

  const scopedDomainOptions = useMemo(() => {
    const selectedClub = form.club.trim().toLowerCase();
    if (!selectedClub) {
      return [] as string[];
    }

    const base = CLUB_DOMAIN_MAP[selectedClub] || [];
    const values = new Set(base);
    events
      .filter((event) => event.club.trim().toLowerCase() === selectedClub)
      .map((event) => event.domain.trim().toLowerCase())
      .filter((domain) => Boolean(domain) && !INVALID_DOMAIN_KEYS.has(domain))
      .forEach((domain) => values.add(domain));

    if (form.domain.trim()) {
      const currentDomain = form.domain.trim().toLowerCase();
      if (!INVALID_DOMAIN_KEYS.has(currentDomain)) {
        values.add(currentDomain);
      }
    }

    return Array.from(values).sort();
  }, [events, form.club, form.domain]);

  const allowedScopedDomainOptions = useMemo(() => {
    if (hasAllDomainsAccess) {
      return scopedDomainOptions;
    }

    const allowed = new Set(normalizedAllowedDomains.filter((item) => item !== "*"));
    if (allowed.size === 0) {
      return [] as string[];
    }

    return scopedDomainOptions.filter((domain) => allowed.has(domain));
  }, [scopedDomainOptions, hasAllDomainsAccess, normalizedAllowedDomains]);

  const importDomainOptions = useMemo(() => {
    const selectedClub = importClub.trim().toLowerCase();
    if (!selectedClub) {
      return [] as string[];
    }

    const base = CLUB_DOMAIN_MAP[selectedClub] || [];
    const values = new Set(base);
    events
      .filter((event) => event.club.trim().toLowerCase() === selectedClub)
      .map((event) => event.domain.trim().toLowerCase())
      .filter((domain) => Boolean(domain) && !INVALID_DOMAIN_KEYS.has(domain))
      .forEach((domain) => values.add(domain));

    const scopedOptions = Array.from(values).sort();

    if (hasAllDomainsAccess) {
      return scopedOptions;
    }

    const allowed = new Set(normalizedAllowedDomains.filter((item) => item !== "*"));
    return scopedOptions.filter((domain) => allowed.has(domain));
  }, [importClub, events, hasAllDomainsAccess, normalizedAllowedDomains]);

  const hasScopeAccess = useCallback((club: string, domain: string) => {
    const normalizedClub = club.trim().toLowerCase();
    const normalizedDomain = domain.trim().toLowerCase();

    const clubAllowed = hasAllClubsAccess || normalizedAllowedClubs.includes(normalizedClub);
    const domainAllowed = hasAllDomainsAccess || normalizedAllowedDomains.includes(normalizedDomain);
    return clubAllowed && domainAllowed;
  }, [hasAllClubsAccess, hasAllDomainsAccess, normalizedAllowedClubs, normalizedAllowedDomains]);

  const sortedEvents = useMemo(() => {
    return [...events].sort((first, second) => +new Date(second.date) - +new Date(first.date));
  }, [events]);

  const manageableEventsCount = useMemo(
    () => events.filter((event) => hasScopeAccess(event.club, event.domain)).length,
    [events, hasScopeAccess],
  );

  const visibleEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sortedEvents.filter((event) => {
      if (showOnlyMyScope && !hasScopeAccess(event.club, event.domain)) {
        return false;
      }

      const isHidden = isEventHiddenByConfig(event, visibility);
      if (visibilityFilter === "hidden" && !isHidden) {
        return false;
      }

      if (visibilityFilter === "visible" && isHidden) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [event.title, event.description, event.club, event.domain, event.id, event.eventType].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [sortedEvents, showOnlyMyScope, searchQuery, visibilityFilter, visibility, hasScopeAccess]);

  useEffect(() => {
    if (!form.club || !form.domain) {
      return;
    }

    const normalizedDomain = form.domain.trim().toLowerCase();
    if (!allowedScopedDomainOptions.includes(normalizedDomain)) {
      updateFormField("domain", "");
    }
  }, [form.club, form.domain, allowedScopedDomainOptions]);

  useEffect(() => {
    if (isEditing) {
      return;
    }

    if (allowedClubOptions.length === 1 && !form.club) {
      updateFormField("club", allowedClubOptions[0]);
    }
  }, [allowedClubOptions, form.club, isEditing]);

  useEffect(() => {
    if (isEditing) {
      return;
    }

    if (!form.club) {
      return;
    }

    if (allowedScopedDomainOptions.length === 1 && !form.domain) {
      updateFormField("domain", allowedScopedDomainOptions[0]);
    }
  }, [allowedScopedDomainOptions, form.club, form.domain, isEditing]);

  useEffect(() => {
    if (allowedClubOptions.length === 1 && !importClub) {
      setImportClub(allowedClubOptions[0]);
    }
  }, [allowedClubOptions, importClub]);

  useEffect(() => {
    if (allowedClubOptions.length === 1 && !visibilityClub) {
      setVisibilityClub(allowedClubOptions[0]);
    }
  }, [allowedClubOptions, visibilityClub]);

  useEffect(() => {
    if (!importClub || importDomainOptions.length === 0) {
      if (importDomain) {
        setImportDomain("");
      }
      return;
    }

    if (!importDomainOptions.includes(importDomain)) {
      if (importDomainOptions.length === 1) {
        setImportDomain(importDomainOptions[0]);
      } else {
        setImportDomain("");
      }
    }
  }, [importClub, importDomain, importDomainOptions]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/events?includeHidden=1", { cache: "no-store" });
      const payload = (await response.json()) as AdminEventsResponse;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to load events");
      }

      setEvents(payload.events || []);
      setEventTypes((current) => payload.eventTypes || current);
      setVisibility(payload.visibility || defaultVisibility);
      setMongoConfigured(Boolean(payload.mongoConfigured));
      if (payload.admin) {
        setAdmin(payload.admin);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents().catch(() => {
      // handled in loadEvents
    });
  }, [loadEvents]);

  function updateFormField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setEventsToolMode("manual");
    setForm({
      ...defaultForm,
      club: allowedClubOptions.length === 1 ? allowedClubOptions[0] : "",
      domain: "",
    });
    setMessage("");
    setError("");
  }

  function startEdit(event: Event) {
    if (!hasScopeAccess(event.club, event.domain)) {
      setError("You do not have access to this event's club/domain");
      return;
    }

    setEditingId(event.id);
    setEventsToolMode("manual");
    setForm(eventToForm(event));
    setMessage("");
    setError("");
  }

  async function submitForm() {
    const canFallbackToImport =
      Boolean(importFile) &&
      !isEditing &&
      !form.title.trim() &&
      !form.description.trim() &&
      !form.date.trim() &&
      !form.time.trim();

    if (canFallbackToImport && importFile) {
      await importEventsFromJson(importFile);
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (isEditing && !admin.permissions.canEditEvents) {
        throw new Error("You do not have permission to edit events");
      }

      if (!isEditing && !admin.permissions.canCreateEvents) {
        throw new Error("You do not have permission to create events");
      }

      if (!form.title.trim()) {
        throw new Error("Title is required");
      }
      if (!form.description.trim()) {
        throw new Error("Description is required");
      }
      if (!form.date.trim()) {
        throw new Error("Date is required");
      }
      if (!form.time.trim()) {
        throw new Error("Time is required");
      }
      if (!form.location.trim()) {
        throw new Error("Location is required");
      }
      if (!form.organizers.trim()) {
        throw new Error("At least one organizer is required");
      }
      if (!form.tags.trim()) {
        throw new Error("At least one tag is required");
      }
      if (!form.domain.trim()) {
        throw new Error("Domain is required");
      }
      if (!form.club.trim()) {
        throw new Error("Club is required");
      }

      if (!hasScopeAccess(form.club, form.domain)) {
        throw new Error("Selected club/domain is outside your access scope");
      }

      const payload = formToPayload(form);
      const endpoint = isEditing ? `/api/admin/events/${editingId}` : "/api/admin/events";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Save failed");
      }

      setMessage(isEditing ? "Event updated" : "Event created");
      setEditingId(null);
      setForm(defaultForm);
      await loadEvents();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent(id: string) {
    const event = events.find((item) => item.id === id);
    if (!event) {
      setError("Event not found");
      return;
    }

    if (!admin.permissions.canDeleteEvents || !hasScopeAccess(event.club, event.domain)) {
      setError("You do not have permission to delete events");
      return;
    }

    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) {
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Delete failed");
      }

      setMessage("Event deleted");
      if (editingId === id) {
        startCreate();
      }
      await loadEvents();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  async function importEventsFromJson(file: File) {
    if (!admin.permissions.canCreateEvents) {
      setError("You do not have permission to create events");
      return;
    }

    if (!importClub) {
      setError("Select default club before uploading JSON");
      return;
    }

    if (importDomain && !hasScopeAccess(importClub, importDomain)) {
      setError("Selected import club/domain is outside your access scope");
      return;
    }

    if (importDomainOptions.length === 0) {
      setError("No import domains available for selected club in your scope");
      return;
    }

    setImporting(true);
    setMessage("");
    setError("");

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array of event objects");
      }

      if (parsed.length === 0) {
        throw new Error("JSON file is empty");
      }

      const allowedDomainSet = new Set(importDomainOptions.map((item) => item.trim().toLowerCase()));
      const normalized = parsed.map((item, index) =>
        normalizeImportedEvent(
          item as ImportedEventInput,
          importClub,
          importDomain,
          allowedDomainSet,
          index,
        ),
      );

      const seenIds = new Map<string, number>();
      normalized.forEach((event) => {
        const current = seenIds.get(event.id) ?? 0;
        seenIds.set(event.id, current + 1);
      });

      const idIndex = new Map<string, number>();
      normalized.forEach((event) => {
        const occurrences = seenIds.get(event.id) ?? 0;
        if (occurrences <= 1) {
          return;
        }
        const count = (idIndex.get(event.id) ?? 0) + 1;
        idIndex.set(event.id, count);
        event.id = `${event.id}-${count}`;
      });

      let successCount = 0;
      const failures: string[] = [];

      for (const event of normalized) {
        const response = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });

        const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (response.ok && result.ok) {
          successCount += 1;
        } else {
          failures.push(`${event.title}: ${result.error || "Import failed"}`);
        }
      }

      if (successCount > 0) {
        await loadEvents();
      }

      if (failures.length === 0) {
        setMessage(`Imported ${successCount} event(s) successfully.`);
        setImportFile(null);
        return;
      }

      setMessage(`Imported ${successCount} of ${normalized.length} event(s).`);
      setError(failures.slice(0, 3).join(" | "));
      if (successCount > 0) {
        setImportFile(null);
      }
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : "Unable to import JSON");
    } finally {
      setImporting(false);
    }
  }

  async function updateVisibility(scope: "event" | "club" | "domain" | "eventType", values: string[], hidden: boolean) {
    setVisibilityLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/events/visibility", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, values, hidden }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        visibility?: EventVisibilityConfig;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to update visibility");
      }

      if (result.visibility) {
        setVisibility(result.visibility);
      }

      await loadEvents();
      setMessage(hidden ? "Events hidden successfully" : "Events unhidden successfully");
    } catch (visibilityError) {
      setError(visibilityError instanceof Error ? visibilityError.message : "Unable to update visibility");
    } finally {
      setVisibilityLoading(false);
    }
  }

  async function logout() {
    window.location.href = "/api/auth/signout?callbackUrl=/admin/login";
  }

  const canSeeGovernance = admin.permissions.canManageAdmins || admin.permissions.canManageAccessRequests;

  const activeViewLabel = activeView === "events" ? "Events Workspace" : "Access Governance";

  return (
    <div className="space-y-6 rounded-3xl border border-black/10 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 p-4 shadow-sm dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <section className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Events Admin</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Create, update, and delete events stored in MongoDB.</p>
            <p className="mt-1 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {activeViewLabel}
            </p>
            {!hasAllClubsAccess || !hasAllDomainsAccess ? (
              <p className="mt-1 text-xs text-slate-500">
                Restricted scope active. Club and domain fields are limited to your assigned permissions.
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startCreate}
              disabled={!admin.permissions.canCreateEvents || allowedClubOptions.length === 0}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:hover:bg-slate-800"
            >
              New Event
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Role</p>
            <p className="font-semibold uppercase">{admin.permissions.canManageAdmins ? "Access Manager" : "Scoped Editor"}</p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Visible Scope</p>
            <p className="font-semibold">{manageableEventsCount} / {events.length} events</p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-300">Create Access</p>
            <p className="font-semibold">{allowedClubOptions.length === 0 ? "No allowed clubs" : `${allowedClubOptions.length} club(s)`}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("events")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              activeView === "events"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "border border-black/10 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            Events Workspace
          </button>
          {canSeeGovernance ? (
            <button
              type="button"
              onClick={() => setActiveView("governance")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                activeView === "governance"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-black/10 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Access Governance
            </button>
          ) : null}
        </div>
        {!mongoConfigured ? (
          <p className="mt-3 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-800">
            MongoDB is not configured. Set MONGODB_URI and MONGODB_DB to enable write operations.
          </p>
        ) : null}
        {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      </section>

      {activeView === "events" ? (
        <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold">{isEditing ? `Edit ${editingId}` : "Create Event"}</h2>
              {isEditing ? (
                <button
                  type="button"
                  onClick={startCreate}
                  className="rounded-lg border border-black/10 px-2.5 py-1 text-xs font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800"
                >
                  Clear editor
                </button>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-black/10 bg-slate-50 p-2 dark:border-white/10 dark:bg-slate-950/40">
              <button
                type="button"
                onClick={() => setEventsToolMode("manual")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  eventsToolMode === "manual"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                Manual Create
              </button>
              <button
                type="button"
                onClick={() => setEventsToolMode("import")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  eventsToolMode === "import"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                JSON Import
              </button>
              <button
                type="button"
                onClick={() => setEventsToolMode("visibility")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  eventsToolMode === "visibility"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                Visibility Rules
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {eventsToolMode === "visibility" ? (
                <div className="rounded-xl border border-black/15 bg-slate-50/80 p-3 dark:border-white/20 dark:bg-slate-900/60">
                <p className="text-sm font-semibold">Visibility Controls</p>
                <p className="mt-1 text-[11px] text-slate-500">Hidden events are removed from public pages but remain manageable here.</p>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <select
                    className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
                    value={visibilityClub}
                    onChange={(event) => setVisibilityClub(event.target.value)}
                    disabled={visibilityLoading || allowedClubOptions.length <= 1}
                  >
                    <option value="">Select club</option>
                    {allowedClubOptions.map((item) => (
                      <option key={item} value={item}>{clubLabel(item)}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!visibilityClub || visibilityLoading}
                      onClick={async () => updateVisibility("club", [visibilityClub], true)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Hide Club
                    </button>
                    <button
                      type="button"
                      disabled={!visibilityClub || visibilityLoading}
                      onClick={async () => updateVisibility("club", [visibilityClub], false)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Unhide Club
                    </button>
                  </div>

                  <select
                    className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
                    value={visibilityDomain}
                    onChange={(event) => setVisibilityDomain(event.target.value)}
                    disabled={visibilityLoading}
                  >
                    <option value="">Select domain</option>
                    {domainOptions.map((item) => (
                      <option key={item} value={item}>{humanizeToken(item)}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!visibilityDomain || visibilityLoading}
                      onClick={async () => updateVisibility("domain", [visibilityDomain], true)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Hide Domain
                    </button>
                    <button
                      type="button"
                      disabled={!visibilityDomain || visibilityLoading}
                      onClick={async () => updateVisibility("domain", [visibilityDomain], false)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Unhide Domain
                    </button>
                  </div>

                  <select
                    className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
                    value={visibilityType}
                    onChange={(event) => setVisibilityType(event.target.value as EventType)}
                    disabled={visibilityLoading}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!visibilityType || visibilityLoading}
                      onClick={async () => updateVisibility("eventType", [visibilityType], true)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Hide Type
                    </button>
                    <button
                      type="button"
                      disabled={!visibilityType || visibilityLoading}
                      onClick={async () => updateVisibility("eventType", [visibilityType], false)}
                      className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Unhide Type
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">Hidden clubs: {visibility.hiddenClubs.length}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">Hidden domains: {visibility.hiddenDomains.length}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">Hidden types: {visibility.hiddenEventTypes.length}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">Hidden events: {visibility.hiddenEventIds.length}</span>
                </div>
                </div>
              ) : null}

              {eventsToolMode === "import" ? (
                <div className="rounded-xl border border-dashed border-black/15 bg-slate-50/70 p-3 dark:border-white/20 dark:bg-slate-900/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Bulk Import JSON</p>
                  <p className="text-[11px] text-slate-500">Uploads array format like your GDG/GSA files</p>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <select
                    className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
                    value={importClub}
                    onChange={(event) => setImportClub(event.target.value)}
                    disabled={allowedClubOptions.length <= 1 || importing}
                  >
                    <option value="">Default club for imported events</option>
                    {allowedClubOptions.map((item) => (
                      <option key={item} value={item}>{clubLabel(item)}</option>
                    ))}
                  </select>
                  <select
                    className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
                    value={importDomain}
                    onChange={(event) => setImportDomain(event.target.value)}
                    disabled={!importClub || importDomainOptions.length <= 1 || importing}
                  >
                    <option value="">Fallback domain (optional)</option>
                    {importDomainOptions.map((item) => (
                      <option key={item} value={item}>{humanizeToken(item)}</option>
                    ))}
                  </select>
                </div>
                <label className="mt-2 block rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950">
                  <span className="block text-xs text-slate-500">Choose JSON file</span>
                  <input
                    type="file"
                    accept="application/json,.json"
                    disabled={importing || !admin.permissions.canCreateEvents}
                    className="mt-1 block w-full cursor-pointer text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-300 dark:file:bg-slate-700 dark:file:text-slate-200 dark:hover:file:bg-slate-600"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) {
                        setImportFile(null);
                        return;
                      }
                      setImportFile(file);
                    }}
                  />
                </label>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-500">
                    {importFile ? `Selected: ${importFile.name}` : "No JSON file selected"}
                  </p>
                  <button
                    type="button"
                    disabled={
                      importing ||
                      !admin.permissions.canCreateEvents ||
                      !importFile ||
                      !importClub
                    }
                    onClick={async () => {
                      if (!importFile) {
                        return;
                      }
                      await importEventsFromJson(importFile);
                    }}
                    className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
                  >
                    {importing ? "Importing..." : "Import JSON"}
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Import maps custom event types and date ranges automatically; domain is read from each JSON item and fallback domain is used only when missing.
                </p>
                </div>
              ) : null}
              {eventsToolMode === "manual" ? (
                <>
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="id (slug, optional on create)" value={form.id} onChange={(event) => updateFormField("id", event.target.value)} disabled={isEditing} />
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="title" value={form.title} onChange={(event) => updateFormField("title", event.target.value)} />
              <textarea className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="description" value={form.description} onChange={(event) => updateFormField("description", event.target.value)} rows={3} />
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="tags (comma separated)" value={form.tags} onChange={(event) => updateFormField("tags", event.target.value)} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" type="date" value={form.date} onChange={(event) => updateFormField("date", event.target.value)} />
                <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" type="date" value={form.endDate} onChange={(event) => updateFormField("endDate", event.target.value)} />
              </div>
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="time (e.g. 09:00-11:00)" value={form.time} onChange={(event) => updateFormField("time", event.target.value)} />
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="location" value={form.location} onChange={(event) => updateFormField("location", event.target.value)} />
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="organizers (comma separated)" value={form.organizers} onChange={(event) => updateFormField("organizers", event.target.value)} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <select className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" value={form.club} onChange={(event) => updateFormField("club", event.target.value)} disabled={allowedClubOptions.length <= 1}>
                  <option value="">Select club</option>
                  {allowedClubOptions.map((item) => (
                    <option key={item} value={item}>{clubLabel(item)}</option>
                  ))}
                </select>
                <select className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" value={form.domain} onChange={(event) => updateFormField("domain", event.target.value)} disabled={!form.club || allowedScopedDomainOptions.length <= 1}>
                  <option value="">{form.club ? "Select domain" : "Select club first"}</option>
                  {allowedScopedDomainOptions.map((item) => (
                    <option key={item} value={item}>{humanizeToken(item)}</option>
                  ))}
                </select>
              </div>
              {form.club ? (
                <p className="text-xs text-slate-500">
                  Showing {allowedScopedDomainOptions.length} domain option(s) for {clubLabel(form.club)}.
                </p>
              ) : null}
              <select className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" value={form.eventType} onChange={(event) => updateFormField("eventType", event.target.value as EventType)}>
                {eventTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <input className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950" placeholder="registrationLink (optional)" value={form.registrationLink} onChange={(event) => updateFormField("registrationLink", event.target.value)} />
              <button
                type="button"
                onClick={submitForm}
                disabled={saving || (isEditing ? !admin.permissions.canEditEvents : !admin.permissions.canCreateEvents)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
              </button>
                </>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold">All Events</h2>
              <p className="text-xs text-slate-500">Showing {visibleEvents.length} of {sortedEvents.length}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setVisibilityFilter("all")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${visibilityFilter === "all" ? "bg-black text-white dark:bg-white dark:text-black" : "border border-black/10 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setVisibilityFilter("visible")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${visibilityFilter === "visible" ? "bg-black text-white dark:bg-white dark:text-black" : "border border-black/10 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                Visible only
              </button>
              <button
                type="button"
                onClick={() => setVisibilityFilter("hidden")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${visibilityFilter === "hidden" ? "bg-black text-white dark:bg-white dark:text-black" : "border border-black/10 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                Hidden only
              </button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, domain, club, type..."
                className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
              />
              <label className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs shadow-sm dark:border-white/10 dark:bg-slate-900">
                <input type="checkbox" checked={showOnlyMyScope} onChange={(event) => setShowOnlyMyScope(event.target.checked)} />
                Only my scope
              </label>
            </div>
            {loading ? <p className="mt-3 text-sm">Loading events...</p> : null}
            <div className="mt-3 space-y-2 max-h-[680px] overflow-auto pr-1">
              {visibleEvents.map((event) => (
                <div key={`${event.id}-${event.date}-${event.title}`} className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold leading-snug">{event.title}</p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold dark:bg-slate-800">{event.eventType}</span>
                  </div>
                  <p className="text-xs text-slate-500">{event.id} • {event.date}</p>
                  <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{clubLabel(event.club)}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{humanizeToken(event.domain)}</span>
                    {isEventHiddenByConfig(event, visibility) ? (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">Hidden</span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Visible</span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button type="button" onClick={() => startEdit(event)} disabled={!admin.permissions.canEditEvents || !hasScopeAccess(event.club, event.domain)} className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold disabled:opacity-60 dark:border-white/10">Edit</button>
                    <button type="button" onClick={() => removeEvent(event.id)} disabled={!admin.permissions.canDeleteEvents || !hasScopeAccess(event.club, event.domain)} className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white disabled:opacity-60">Delete</button>
                    <button
                      type="button"
                      disabled={!admin.permissions.canEditEvents || !hasScopeAccess(event.club, event.domain) || visibilityLoading}
                      onClick={async () => updateVisibility("event", [event.id], !isEventHiddenByConfig(event, visibility))}
                      className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      {isEventHiddenByConfig(event, visibility) ? "Unhide" : "Hide"}
                    </button>
                  </div>
                </div>
              ))}
              {!loading && visibleEvents.length === 0 ? <p className="text-sm text-slate-500">No events found for current filters.</p> : null}
            </div>
          </div>
        </section>
      ) : canSeeGovernance ? (
        <section className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          <p className="mb-3 text-xs text-slate-500">Manage admins and access requests in a dedicated workspace.</p>
          <AdminGovernancePanel
            canManageAdmins={admin.permissions.canManageAdmins}
            canManageAccessRequests={admin.permissions.canManageAccessRequests}
            currentAdminEmail={admin.email}
            clubOptions={clubOptions}
            domainOptions={domainOptions}
            clubDomainMap={CLUB_DOMAIN_MAP}
          />
        </section>
      ) : null}
    </div>
  );
}
