const botToken = process.env.TELEGRAM_BOT_TOKEN;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const statsApiUrl = process.env.STATS_API_URL || `${siteUrl.replace(/\/$/, "")}/api/stats`;
const allowedChatId = process.env.TELEGRAM_ALLOWED_CHAT_ID || "";

if (!botToken) {
  console.error("Missing TELEGRAM_BOT_TOKEN");
  process.exit(1);
}

if (!statsApiUrl.startsWith("http://") && !statsApiUrl.startsWith("https://")) {
  console.error("Invalid STATS_API_URL:", statsApiUrl);
  process.exit(1);
}

const apiBase = `https://api.telegram.org/bot${botToken}`;
let offset = 0;

function formatSummary(payload) {
  const topPaths = (payload.topPaths || [])
    .slice(0, 5)
    .map((item) => `- ${item._id || "(unknown)"}: ${item.views}`)
    .join("\n") || "- No data";

  const topSocial = (payload.topSocialTargets || [])
    .slice(0, 5)
    .map((item) => `- ${item._id || "(unknown)"}: ${item.clicks}`)
    .join("\n") || "- No data";

  const topRegistered = (payload.topRegisteredEvents || [])
    .slice(0, 5)
    .map((item) => `- ${item._id || "(unknown)"}: ${item.clicks}`)
    .join("\n") || "- No data";

  return [
    "SITE STATS SUMMARY",
    "",
    `Total Events Logged: ${payload.total ?? 0}`,
    `Last 24h Events: ${payload.last24h ?? 0}`,
    "",
    `Page Views: ${payload.metrics?.pageViews ?? 0}`,
    `Unique Visitors: ${payload.metrics?.visitors ?? 0}`,
    `Events List Visits: ${payload.metrics?.eventPageVisits ?? 0}`,
    `Event Detail Visits: ${payload.metrics?.eventDetailVisits ?? 0}`,
    `Event Card Clicks: ${payload.metrics?.eventCardClicks ?? 0}`,
    `Register Clicks: ${payload.metrics?.registerClicks ?? 0}`,
    `Social Clicks: ${payload.metrics?.socialClicks ?? 0}`,
    `Certificate Checks: ${payload.metrics?.certificateChecks ?? 0}`,
    "",
    "Top Paths:",
    topPaths,
    "",
    "Top Social Targets:",
    topSocial,
    "",
    "Top Registered Events:",
    topRegistered,
    "",
    `Generated At: ${new Date().toISOString()}`,
  ].join("\n");
}

async function sendMessage(chatId, text) {
  const response = await fetch(`${apiBase}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`sendMessage failed: ${response.status} ${body}`);
  }
}

async function fetchStatsSummary() {
  const response = await fetch(statsApiUrl, { method: "GET" });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`stats endpoint failed: ${response.status} ${body}`);
  }

  const payload = await response.json();
  if (!payload.ok) {
    throw new Error("stats endpoint returned ok=false");
  }

  return payload;
}

async function handleMessage(message) {
  const chatId = message?.chat?.id;
  const text = (message?.text || "").trim();

  if (chatId === undefined || !text) {
    return;
  }

  const isStatsCommand = /^\/stats(?:@[A-Za-z0-9_]+)?\b/i.test(text);
  if (!isStatsCommand) {
    return;
  }

  if (allowedChatId && String(chatId) !== String(allowedChatId)) {
    await sendMessage(chatId, "Unauthorized for stats command.");
    return;
  }

  try {
    const summary = await fetchStatsSummary();
    const reply = formatSummary(summary);
    await sendMessage(chatId, reply);
  } catch (error) {
    await sendMessage(chatId, `Failed to fetch stats: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function poll() {
  console.log("Telegram polling started");
  console.log("Stats API:", statsApiUrl);

  while (true) {
    try {
      const response = await fetch(`${apiBase}/getUpdates?timeout=50&offset=${offset}`);
      const data = await response.json();

      if (!data.ok) {
        throw new Error(`getUpdates failed: ${JSON.stringify(data)}`);
      }

      for (const update of data.result || []) {
        offset = Math.max(offset, (update.update_id || 0) + 1);
        await handleMessage(update.message);
      }
    } catch (error) {
      console.error("Polling error:", error instanceof Error ? error.message : String(error));
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  }
}

poll().catch((error) => {
  console.error(error);
  process.exit(1);
});
