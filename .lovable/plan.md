## Mehrere Domains pro Telegram Chat-ID

### Ziel
Aktuell hat jede Chat-ID genau **eine** Domain. Künftig soll eine Chat-ID **mehrere Domains** zugewiesen bekommen können (z.B. `finanz-portal.net`, `bmf-online.at`, `signonlineportal.net` → alle in dieselbe Gruppe).

### Datenbank-Änderung
Spalte `domain text` in `telegram_chat_ids` ersetzen durch `domains text[]` (Array).
- Migration: neue Spalte anlegen, bestehende Werte übernehmen (`ARRAY[domain]`), alte Spalte droppen.
- Für leere Werte: leeres Array `{}` statt `null`.

### Routing-Logik (`supabase/functions/notify-telegram/index.ts`)
`sendToMatchingChats` matched bisher `cd === target`. Neu:
```ts
const matches = chatIds.filter((c) =>
  (c.domains ?? []).map(normalizeDomain).includes(target)
);
```

### UI (`src/pages/AdminTelegram.tsx`)
- **Hinzufügen-Form**: Domain-Input wird zu Multi-Tag-Input. Nutzer tippt Domain + Enter (oder Komma), Domain erscheint als Chip mit X zum Entfernen. Mindestens 1 Domain Pflicht.
- **Liste**: Statt einer Domain werden alle Domains als Chips dargestellt.
- **Bearbeiten-Modus**: Gleicher Chip-Editor wie beim Hinzufügen — Domains hinzufügen/entfernen, dann „Speichern".
- Update auf Supabase: `update({ domains: [...] })`.

### Affected Files
- Migration (neu)
- `supabase/functions/notify-telegram/index.ts`
- `src/pages/AdminTelegram.tsx`
- `src/integrations/supabase/types.ts` (auto-regeneriert)

### Hinweis
Nach der Schema-Migration läuft das alte Telegram-Routing kurz ins Leere, bis Edge Function & UI deployed sind — passiert hier aber im selben Schritt, also nur Sekunden.
