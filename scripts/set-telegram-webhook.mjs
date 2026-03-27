const botToken = process.env.TELEGRAM_BOT_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!botToken) {
  console.error("Missing TELEGRAM_BOT_TOKEN");
  process.exit(1);
}

if (!baseUrl) {
  console.error("Missing NEXT_PUBLIC_SITE_URL");
  process.exit(1);
}

const webhookUrl = `${baseUrl.replace(/\/$/, "")}/api/telegram/webhook`;
const host = new URL(webhookUrl).hostname;

if (host === "localhost" || host === "127.0.0.1") {
  console.error("Invalid webhook URL for Telegram:", webhookUrl);
  console.error("Telegram cannot reach localhost.");
  console.error("Use a public HTTPS URL (Vercel domain or ngrok tunnel) in NEXT_PUBLIC_SITE_URL.");
  process.exit(1);
}

if (!webhookUrl.startsWith("https://")) {
  console.error("Webhook URL must be HTTPS:", webhookUrl);
  process.exit(1);
}

const endpoint = `https://api.telegram.org/bot${botToken}/setWebhook`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: webhookUrl,
    allowed_updates: ["message"],
    drop_pending_updates: false,
  }),
});

const json = await response.json().catch(() => ({}));

if (!response.ok || !json.ok) {
  console.error("Failed to set webhook", json);
  process.exit(1);
}

console.log("Webhook set successfully:", webhookUrl);
