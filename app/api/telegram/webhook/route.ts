import { NextResponse } from "next/server";
import { getSiteStatsSummary } from "@/lib/site-stats";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

type TelegramUpdate = {
  update_id?: number;
  message?: {
    chat?: { id?: number | string };
    text?: string;
    from?: { id?: number | string; username?: string };
  };
};

function formatStatsMessage(summary: Awaited<ReturnType<typeof getSiteStatsSummary>>) {
  const topPaths =
    summary.topPaths.length > 0
      ? summary.topPaths.slice(0, 5).map((item) => `- ${item._id || "(unknown)"}: ${item.views}`).join("\n")
      : "- No data";

  const topSocial =
    summary.topSocialTargets.length > 0
      ? summary.topSocialTargets
          .slice(0, 5)
          .map((item) => `- ${item._id || "(unknown)"}: ${item.clicks}`)
          .join("\n")
      : "- No data";

  const topRegistered =
    summary.topRegisteredEvents.length > 0
      ? summary.topRegisteredEvents
          .slice(0, 5)
          .map((item) => `- ${item._id || "(unknown)"}: ${item.clicks}`)
          .join("\n")
      : "- No data";

  return [
    "SITE STATS SUMMARY",
    "",
    `Total Events Logged: ${summary.total}`,
    `Last 24h Events: ${summary.last24h}`,
    "",
    `Page Views: ${summary.metrics.pageViews}`,
    `Unique Visitors: ${summary.metrics.visitors}`,
    `Events List Visits: ${summary.metrics.eventPageVisits}`,
    `Event Detail Visits: ${summary.metrics.eventDetailVisits}`,
    `Event Card Clicks: ${summary.metrics.eventCardClicks}`,
    `Register Clicks: ${summary.metrics.registerClicks}`,
    `Social Clicks: ${summary.metrics.socialClicks}`,
    `Certificate Checks: ${summary.metrics.certificateChecks}`,
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

async function sendTelegramMessage(botToken: string, chatId: number | string, text: string) {
  const endpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(endpoint, {
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
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

async function recordTelegramStatsRequest(chatId: string, username: string | undefined) {
  try {
    const db = await getMongoDb();
    await db.collection("site_stats").insertOne({
      eventType: "telegram_stats_command",
      path: "/api/telegram/webhook",
      title: "Telegram /stats",
      referrer: "",
      metadata: { chatId, username: username || "" },
      ip: "server",
      userAgent: "telegram-webhook",
      host: "",
      createdAt: new Date(),
    });
  } catch {
    // Ignore analytics write failures here.
  }
}

export async function POST(request: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
    }

    const allowedChatId = process.env.TELEGRAM_ALLOWED_CHAT_ID;
    const update = (await request.json().catch(() => ({}))) as TelegramUpdate;
    const message = update.message;

    if (!message?.text || message.chat?.id === undefined) {
      return NextResponse.json({ ok: true });
    }

    const text = message.text.trim();
    const isStatsCommand = /^\/stats(?:@[A-Za-z0-9_]+)?\b/i.test(text);

    if (!isStatsCommand) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    if (allowedChatId && String(chatId) !== String(allowedChatId)) {
      return NextResponse.json({ ok: true });
    }

    await recordTelegramStatsRequest(String(chatId), message.from?.username);

    const summary = await getSiteStatsSummary();
    const reply = formatStatsMessage(summary);

    await sendTelegramMessage(botToken, chatId, reply);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Telegram webhook is active" });
}
