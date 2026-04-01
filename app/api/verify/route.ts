import { NextResponse } from "next/server";

type CertificateRecord = {
  id: number;
  issued_on: string;
  name: string;
  issued_by: string;
  verify_id: string;
  type: string;
  event: string;
  email?: string;
};

const supabaseUrl =
  process.env.SUPABASE_URL ?? "https://cdlkwjyzokfjtkawroyu.supabase.co";
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbGt3anl6b2tmanRrYXdyb3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MzU4OTAsImV4cCI6MjA3NDAxMTg5MH0.DB3OcVzBYdSsp8X4Lws2y41ikG9qeLPpbJ-F-4TBwq0";

type CacheEntry =
  | {
      status: "ok";
      certificate: CertificateRecord;
      expiresAt: number;
    }
  | {
      status: "not_found";
      expiresAt: number;
    };

const verifyCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<CacheEntry>>();

const SUCCESS_CACHE_MS = 30_000;
const NOT_FOUND_CACHE_MS = 10_000;

function isValidVerifyId(value: string): boolean {
  return /^[a-zA-Z0-9_-]{4,40}$/.test(value);
}

function pruneExpiredMaps(now: number) {
  if (verifyCache.size > 2000) {
    for (const [key, value] of verifyCache) {
      if (value.expiresAt <= now) {
        verifyCache.delete(key);
      }
    }
  }
}

async function fetchCertificateFromSupabase(verifyId: string, now: number): Promise<CacheEntry> {
  const endpoint = `${supabaseUrl}/rest/v1/certificate?select=*&verify_id=eq.${encodeURIComponent(verifyId)}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        apikey: supabaseAnonKey,
        authorization: `Bearer ${supabaseAnonKey}`,
        accept: "application/vnd.pgrst.object+json",
      },
    });

    clearTimeout(timeoutId);

    if (response.status === 406 || response.status === 404) {
      return {
        status: "not_found",
        expiresAt: now + NOT_FOUND_CACHE_MS,
      };
    }

    if (!response.ok) {
      throw new Error("Verification service unavailable");
    }

    const certificate = (await response.json()) as CertificateRecord;

    return {
      status: "ok",
      certificate,
      expiresAt: now + SUCCESS_CACHE_MS,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET(request: Request) {
  const now = Date.now();
  pruneExpiredMaps(now);

  const { searchParams } = new URL(request.url);
  // Support both 'id' and 'verifyId' for backward compatibility during transition, but 'id' is preferred
  const verifyId = (searchParams.get("id") || searchParams.get("verifyId"))?.trim().toLowerCase();

  if (!verifyId) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  if (!isValidVerifyId(verifyId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const cached = verifyCache.get(verifyId);
  if (cached && cached.expiresAt > now) {
    if (cached.status === "not_found") {
      return NextResponse.json(
        { error: "Certificate not found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      { certificate: cached.certificate },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  try {
    let pending = inFlightRequests.get(verifyId);
    if (!pending) {
      pending = fetchCertificateFromSupabase(verifyId, now)
        .finally(() => {
          inFlightRequests.delete(verifyId);
        });
      inFlightRequests.set(verifyId, pending);
    }

    const result = await pending;
    verifyCache.set(verifyId, result);

    if (result.status === "not_found") {
      return NextResponse.json(
        { error: "Certificate not found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      { certificate: result.certificate },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to verify certificate right now" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
