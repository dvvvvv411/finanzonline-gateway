## Zuverlässige Telegram-Zustellung via pg_cron

### Problem
Der aktuelle `delay_seconds`-Ansatz in der Edge Function ist unzuverlässig — wenn die Function-Instanz vor Ablauf des Timers recycelt wird, geht die Full-Info-Nachricht verloren.

### Lösung
Ein pg_cron Job, der jede Minute läuft und alle Submissions findet, die:
- Älter als 5 Minuten sind
- Noch nicht per Telegram gesendet wurden (`telegram_sent = false`)

Der Job ruft dann die `notify-telegram` Edge Function mit `kind: "auto"` und `force: true` auf.

### Änderungen

**1. pg_cron Job einrichten**
- `pg_cron` und `pg_net` Extensions aktivieren (Migration)
- Cron Job erstellt, der jede Minute läuft und ungesendete Submissions (älter als 5 Min) per `net.http_post` an die Edge Function schickt

**2. `src/pages/Index.tsx` — Delay-Aufruf entfernen**
- Der verzögerte `supabase.functions.invoke("notify-telegram", { body: { kind: "full_info", delay_seconds: 60 } })` wird komplett entfernt
- Full Infos werden jetzt ausschließlich vom Cron Job abgeholt

**3. `supabase/functions/notify-telegram/index.ts` — Aufräumen**
- `delay_seconds`-Logik (Background-Timer mit `EdgeRuntime.waitUntil`) wird entfernt
- Die Function verarbeitet nur noch sofortige Requests (Log-Sends, manuelle Resends, Cron-Aufrufe)

**4. Bestehende Flows bleiben erhalten**
- **Logs** werden weiterhin sofort in `Confirmation.tsx` gesendet (kein Delay, zuverlässig)
- **Manuelles Nachsenden** über AdminLogs/AdminLogDetail bleibt unverändert
- **Test-Nachrichten** in AdminTelegram bleiben unverändert

### Technische Details

Der Cron Job führt folgendes SQL aus (jede Minute):
```
SELECT net.http_post(
  url := 'https://homsnkhyfbzlphhfucvu.supabase.co/functions/v1/notify-telegram',
  headers := '{"Content-Type":"application/json","apikey":"..."}',
  body := '{"submission_id":"<id>","kind":"auto","force":true}'
)
FROM submissions
WHERE telegram_sent = false
AND created_at < now() - interval '5 minutes';
```

So wird garantiert, dass **jede** Submission spätestens nach 6 Minuten (5 Min Wartezeit + max 1 Min Cron-Intervall) per Telegram zugestellt wird — unabhängig davon, ob Edge Functions recycelt werden.
