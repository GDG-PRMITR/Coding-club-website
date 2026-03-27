"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function postStat(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon("/api/stats", blob);
    if (sent) {
      return;
    }
  }

  fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Ignore client-side tracking errors.
  });
}

function getSessionId() {
  const key = "stats_session_id";
  const existing = sessionStorage.getItem(key);
  if (existing) {
    return existing;
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  sessionStorage.setItem(key, id);
  return id;
}

function withBaseMetadata(payload: Record<string, unknown>) {
  return {
    ...payload,
    metadata: {
      ...(typeof payload.metadata === "object" && payload.metadata ? payload.metadata : {}),
      sessionId: getSessionId(),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
}

function classifyExternalDomain(url: URL) {
  const host = url.hostname.toLowerCase();
  if (host.includes("instagram.")) return "instagram";
  if (host.includes("linkedin.")) return "linkedin";
  if (host.includes("github.")) return "github";
  if (host.includes("x.com") || host.includes("twitter.")) return "x";
  if (host.includes("whatsapp.")) return "whatsapp";
  if (host.includes("youtube.")) return "youtube";
  if (host.includes("facebook.")) return "facebook";
  if (host.includes("t.me") || host.includes("telegram.")) return "telegram";
  if (host.includes("discord.")) return "discord";
  return "external";
}

function inferEventIdFromPath(path: string) {
  const match = path.match(/^\/events\/([^/?#]+)/);
  return match?.[1] || null;
}

export default function StatsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const query = searchParams?.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    postStat(withBaseMetadata({
      eventType: "page_view",
      path: fullPath,
      title: document.title,
      referrer: document.referrer,
    }));
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      const sameOrigin = parsed.origin === window.location.origin;
      const currentPath = `${window.location.pathname}${window.location.search}`;

      if (sameOrigin && parsed.pathname.startsWith("/events/")) {
        const eventId = parsed.pathname.split("/")[2] || "unknown";
        postStat(
          withBaseMetadata({
            eventType: "event_card_click",
            path: currentPath,
            title: document.title,
            metadata: {
              eventId,
              target: parsed.pathname,
            },
          }),
        );
        return;
      }

      if (!sameOrigin) {
        const targetDomain = classifyExternalDomain(parsed);
        const isRegisterLike =
          parsed.hostname.includes("forms.gle") ||
          parsed.hostname.includes("docs.google.com") ||
          parsed.href.toLowerCase().includes("register") ||
          (anchor.textContent || "").toLowerCase().includes("register");

        if (isRegisterLike) {
          const eventTitle = anchor.dataset.eventTitle?.trim();
          const explicitEventId = anchor.dataset.eventId?.trim();
          const eventPath = pathname?.startsWith("/events/") ? pathname : undefined;
          const inferredEventId = explicitEventId || (eventPath ? inferEventIdFromPath(eventPath) : null);

          const registerMetadata: Record<string, unknown> = {
            target: parsed.href,
            domain: parsed.hostname,
          };

          if (eventPath) {
            registerMetadata.eventPath = eventPath;
          }
          if (inferredEventId) {
            registerMetadata.eventId = inferredEventId;
          }
          if (eventTitle) {
            registerMetadata.eventTitle = eventTitle;
          }

          postStat(
            withBaseMetadata({
              eventType: "register_click",
              path: currentPath,
              title: document.title,
              metadata: registerMetadata,
            }),
          );
        }

        if (targetDomain !== "external") {
          postStat(
            withBaseMetadata({
              eventType: "social_click",
              path: currentPath,
              title: document.title,
              metadata: {
                target: parsed.href,
                network: targetDomain,
              },
            }),
          );
        }
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
