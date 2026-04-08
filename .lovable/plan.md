

## Fix: Telegram Notification bei neuem Log

### Problem

Die Telegram-Benachrichtigung wird aktuell nur über die Realtime-Subscription im Admin-Panel ausgelöst (`use-submissions.ts`). Das funktioniert nur, wenn ein Admin gerade eingeloggt ist und das Panel offen hat. Wenn kein Admin online ist, wird keine Notification gesendet.

### Lösung

Die Edge Function `notify-telegram` direkt nach dem Submission-Insert in `Index.tsx` aufrufen. Der Realtime-Trigger im Admin-Panel bleibt als Fallback bestehen, aber der primäre Auslöser wird die direkte Invocation nach dem Insert.

### Änderung: `src/pages/Index.tsx`

Nach dem `supabase.from("submissions").insert(...)` den Insert-Response abfangen (mit `.select().single()`), und dann sofort `supabase.functions.invoke("notify-telegram", { body: { submission_id } })` aufrufen. Der Aufruf wird mit `.catch(() => {})` gefeuert (fire-and-forget), damit der User-Flow nicht blockiert wird.

### Änderung: `src/hooks/use-submissions.ts`

Den doppelten Aufruf im Realtime-Listener entfernen oder beibehalten als Fallback — aber ein Deduplizierungs-Check ist nicht nötig, da doppelte Telegram-Nachrichten akzeptabel sind vs. gar keine.

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/Index.tsx` | notify-telegram nach Insert aufrufen |

