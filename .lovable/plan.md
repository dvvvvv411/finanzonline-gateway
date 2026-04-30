## Änderungen

### 1. Migration: Neue Spalte `telegram_sent`

```sql
ALTER TABLE submissions ADD COLUMN telegram_sent boolean NOT NULL DEFAULT false;
```

### 2. Edge Function `notify-telegram/index.ts`

In `processNotification`:
- Statt `notified_at` wird jetzt `telegram_sent` geprüft.
- Vor dem Senden: `SELECT telegram_sent FROM submissions WHERE id = submission_id` — wenn `true`, sofort abbrechen.
- Nach erfolgreichem Senden: `UPDATE submissions SET telegram_sent = true WHERE id = submission_id`.
- Die alte `notified_at`-Claim-Logik wird durch die einfache `telegram_sent`-Prüfung ersetzt.

### 3. Confirmation.tsx

Keine Änderung nötig — die Edge Function selbst verhindert jetzt doppeltes Senden.

### Betroffene Dateien

- Neue Migration (Spalte `telegram_sent`)
- `supabase/functions/notify-telegram/index.ts`
