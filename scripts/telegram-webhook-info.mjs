const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  console.error("Missing TELEGRAM_BOT_TOKEN");
  process.exit(1);
}

const endpoint = `https://api.telegram.org/bot${botToken}/getWebhookInfo`;

const response = await fetch(endpoint);
const json = await response.json().catch(() => ({}));

if (!response.ok || !json.ok) {
  console.error("Failed to fetch webhook info", json);
  process.exit(1);
}

console.log(JSON.stringify(json, null, 2));
