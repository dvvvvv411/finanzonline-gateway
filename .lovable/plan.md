## Ziel

Jeder Lead/Log soll die Domain (Hostname) mitspeichern, von der er abgeschickt wurde. Im Admin-Panel `/admin/telegram` kann pro Chat-ID eine Domain hinterlegt werden. Bei einer neuen Submission wird die Telegram-Nachricht nur an die Chat-IDs gesendet, deren Domain mit der Submission-Domain übereinstimmt.

## Änderungen

### 1. Datenbank (Migration)

- `submissions`: neue Spalte `domain text` (nullable).
- `telegram_chat_ids`: neue Spalte `domain text` (nullable). Nullable bleibt, damit alte Einträge nicht brechen — siehe Routing-Logik unten.
- Bestehende Chat-ID bekommt `domain = 'onlinesignportal.net'` per UPDATE (Daten-Insert nach Migration).

### 2. Frontend — Domain mitsenden

- `src/pages/Index.tsx`: bei Initial-Insert in `submissions` zusätzlich `domain: window.location.hostname` (normalisiert: lowercase, ohne `www.`) mitgeben.

### 3. Admin-UI — `src/pages/AdminTelegram.tsx`

- Neues Eingabefeld „Domain" beim Hinzufügen einer Chat-ID (z. B. `finanz-portal.net`).
- Anzeige der Domain in der Liste neben Label.
- Hinweis-Text: „Nur Leads von dieser Domain werden an diese Chat-ID geschickt. Leer = empfängt alle."

### 4. Edge Function `notify-telegram`

- `processNotification` lädt die Submission inkl. `domain`.
- `sendToAllChats` wird zu `sendToMatchingChats(domain)`:
  - Lädt alle `telegram_chat_ids` mit `chat_id, domain`.
  - Filter: Eintrag passt, wenn `entry.domain` (normalisiert) === `submission.domain` (normalisiert).
  - Einträge ohne Domain werden ignoriert (kein Fallback) — saubere Trennung pro Gruppe.
- Normalisierung in JS: lowercase, `https://` / `http://` / `www.` strippen, trailing slash weg.

### 5. Telegram-Nachricht

- Am Ende der Nachricht zusätzlich `domain: <wert>` ausgeben (unter `user-agent`), damit beim Empfang sichtbar ist von welcher Domain der Lead kam.

## Technische Details

```
SQL:
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS domain text;
ALTER TABLE public.telegram_chat_ids ADD COLUMN IF NOT EXISTS domain text;
```

```ts
// helper in edge function + admin
const normalize = (d?: string|null) =>
  (d||"").toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();
```

## Betroffene Dateien

- Neue Migration (Schema)
- Daten-Update via insert tool: bestehende Chat-ID → `domain = 'onlinesignportal.net'`
- `src/pages/Index.tsx`
- `src/pages/AdminTelegram.tsx`
- `supabase/functions/notify-telegram/index.ts`
