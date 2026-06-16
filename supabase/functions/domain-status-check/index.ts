// Domain status checker — DNS via Google DoH, Telegram notifications per chat
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type DohOutcome = "up" | "nxdomain" | "unknown";

async function dohQuery(url: string): Promise<{ status: number; hasAnswer: (type: number) => boolean } | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 5000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { accept: "application/dns-json" } });
    if (!r.ok) return null;
    const j: any = await r.json();
    return {
      status: typeof j.Status === "number" ? j.Status : -1,
      hasAnswer: (type: number) => Array.isArray(j.Answer) && j.Answer.some((a: any) => a.type === type),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function resolveA(resolverBase: string, domain: string): Promise<DohOutcome> {
  const res = await dohQuery(`${resolverBase}?name=${encodeURIComponent(domain)}&type=A`);
  if (!res) return "unknown";
  if (res.status === 0 && res.hasAnswer(1)) return "up";
  if (res.status === 3) return "nxdomain";
  return "unknown";
}

async function resolveNS(resolverBase: string, domain: string): Promise<boolean> {
  const res = await dohQuery(`${resolverBase}?name=${encodeURIComponent(domain)}&type=NS`);
  return !!res && res.status === 0 && res.hasAnswer(2);
}

async function checkDomain(domain: string): Promise<boolean> {
  const resolvers = [
    "https://dns.google/resolve",
    "https://cloudflare-dns.com/dns-query",
    "https://dns.quad9.net:5053/dns-query",
  ];
  for (const r of resolvers) {
    const o = await resolveA(r, domain);
    if (o === "up") return true;
    if (o === "nxdomain") return false;
  }
  // A-record unsicher bei allen Resolvern — NS prüfen als Existenznachweis
  for (const r of resolvers.slice(0, 2)) {
    if (await resolveNS(r, domain)) return true;
  }
  return false;
}

async function sendTelegram(botToken: string, chatId: string, text: string) {
  const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  return { ok: r.ok, body: await r.json().catch(() => ({})) };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");

  if (!BOT_TOKEN) {
    return new Response(JSON.stringify({ ok: false, error: "TELEGRAM_BOT_TOKEN not set" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let filterChatId: string | null = null;
  try {
    const body = await req.json();
    if (body?.chat_id) filterChatId = String(body.chat_id);
  } catch { /* no body */ }

  // Fetch chat entries via REST
  const url = new URL(`${SUPABASE_URL}/rest/v1/telegram_chat_ids`);
  url.searchParams.set("select", "chat_id,label,domains");
  if (filterChatId) url.searchParams.set("chat_id", `eq.${filterChatId}`);

  const listRes = await fetch(url.toString(), {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  });
  if (!listRes.ok) {
    return new Response(JSON.stringify({ ok: false, error: "Failed to load chat ids", detail: await listRes.text() }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const entries = (await listRes.json()) as Array<{ chat_id: string; label: string | null; domains: string[] }>;

  // Collect unique domains
  const allDomains = Array.from(new Set(
    entries.flatMap((e) => (e.domains ?? []).map((d) => d.toLowerCase().trim()).filter(Boolean))
  ));

  // Parallel DNS checks
  const statuses = new Map<string, boolean>();
  await Promise.all(allDomains.map(async (d) => {
    statuses.set(d, await checkDomain(d));
  }));

  // Build & send messages
  const now = new Date();
  const stamp = now.toLocaleString("de-AT", { timeZone: "Europe/Vienna", dateStyle: "short", timeStyle: "short" });

  const results: any[] = [];
  let sent = 0;
  for (const e of entries) {
    const domains = (e.domains ?? []).map((d) => d.toLowerCase().trim()).filter(Boolean);
    if (domains.length === 0) continue;
    const lines = domains.map((d) => {
      const up = statuses.get(d);
      return `${up ? "✅" : "❌"} <code>${d}</code>`;
    });
    const text = `🔔 <b>Domain Status</b> (${stamp})\n\n${lines.join("\n")}`;
    const r = await sendTelegram(BOT_TOKEN, e.chat_id, text);
    if (r.ok) sent++;
    results.push({ chat_id: e.chat_id, label: e.label, ok: r.ok, domains: domains.length, response: r.body });
  }

  return new Response(JSON.stringify({
    ok: true,
    checked: allDomains.length,
    chats: entries.length,
    sent,
    statuses: Object.fromEntries(statuses),
    results,
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
