# Domain Status Monitor für Telegram Chats

Stündlicher Job, der alle in `telegram_chat_ids` hinterlegten Domains via DNS prüft und an die jeweilige Chat-ID eine Übersicht schickt.

## API-Wahl (kostenlos, kein Key, keine Registrierung)

**Google DNS-over-HTTPS**: `https://dns.google/resolve?name=<domain>&type=A`
- Kostenlos, kein API-Key, kein Rate-Limit für normale Nutzung
- Antwortet mit JSON: `Status: 0` + `Answer[]` = Domain hat IPs (aktiv)
- Kein `Answer` oder `Status != 0` = Domain down/ohne DNS-Eintrag
- Zuverlässiger als check-host.net (das ist eher für HTTP-Pings gedacht und hat Rate-Limits)

Fallback: Cloudflare DoH (`https://cloudflare-dns.com/dns-query?name=...&type=A` mit `accept: application/dns-json`), falls Google mal nicht antwortet.

## Neue Edge Function: `domain-status-check`

`supabase/functions/domain-status-check/index.ts`
- Lädt alle Einträge aus `telegram_chat_ids`
- Sammelt alle unique Domains, prüft jede parallel via Google DoH (mit 5s Timeout)
- Status pro Domain: `up` (≥1 A-Record) oder `down` (kein Answer / Fehler / Timeout)
- Pro Chat-ID wird **eine** Nachricht zusammengebaut:
  ```
  🔔 Domain Status (16.06.2026 14:00)
  ✅ finanz-portal.net
  ✅ bank-login.at
  ❌ alte-domain.com
  ```
- Sendet via `TELEGRAM_BOT_TOKEN` an `https://api.telegram.org/bot<TOKEN>/sendMessage`
- `verify_jwt = false` in `supabase/config.toml`, damit pg_cron sie aufrufen kann
- Akzeptiert optional `{ chat_id }` im Body → dann nur dieser eine Chat (für manuellen Test-Button)

## Cron Job (pg_cron + pg_net)

Per `supabase--insert`:
- `pg_cron` + `pg_net` Extensions aktivieren (falls noch nicht)
- `cron.schedule('domain-status-hourly', '0 * * * *', ...)` → ruft die Edge Function jede volle Stunde mit Anon-Key auf

## UI-Erweiterung in `src/pages/AdminTelegram.tsx`

Eine neue Card "Domain Status Monitor" oberhalb der Chat-ID-Liste:
- Kurze Erklärung (stündlich, DNS-basiert)
- Button **"Jetzt prüfen & senden"** → ruft `domain-status-check` ohne Body auf
- Optional pro Chat-Eintrag ein kleiner Status-Button (testet nur dessen Domains)

Keine Datenbank-Schema-Änderungen, kein Persistieren von History (kann später nachgereicht werden).

## Technische Details

- Parallele DNS-Lookups via `Promise.all` mit `AbortController` (5s Timeout pro Domain)
- Domains werden normalisiert (lowercase, kein `www.`, kein Protokoll) — bereits durch `normalizeDomain` in der DB sichergestellt
- Telegram-Nachricht mit `parse_mode: HTML`, Domains in `<code>` für Monospace
- Bei Telegram-Fehler pro Chat: weitermachen mit den nächsten, Fehler loggen
- Return: `{ ok, checked: N, sent: M, results: [...] }`
