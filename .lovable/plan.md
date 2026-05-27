Ich habe geprüft: Der aktuelle Supabase-Link ist im Client, in `supabase/config.toml` und im aktiven Cron-Job bereits auf `bmygggcwwrxrsbqnghpv` gesetzt. Der alte Link taucht nur noch in einer alten Migration und in der Anleitung auf der Admin-Seite als Dashboard-Link auf. Der direkte Test der Edge Function mit `-5294444783` gibt weiterhin von Telegram selbst `Bad Request: chat not found` zurück.

Plan:

1. `notify-telegram` diagnostischer machen
- Vor dem Senden `getMe` aufrufen, damit klar ist, welcher Bot-Token wirklich aktiv ist.
- Vor `sendMessage` zusätzlich `getChat(chat_id)` aufrufen.
- Die Antwort strukturiert zurückgeben: verwendeter Bot, geprüfte Chat-ID, Ergebnis von `getChat`, Ergebnis von `sendMessage`.
- Fehlende `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` sauber als Server-Konfigurationsfehler melden, ohne Secrets zu loggen.

2. Admin-Telegram-Seite korrigieren
- Den falschen alten Supabase-Dashboard-Link `kpbcgkrizrpwfjrpynig` auf den aktuellen Projekt-Link `bmygggcwwrxrsbqnghpv` ändern.
- Die Test-Fehlermeldung so anzeigen, dass du direkt siehst, ob der aktive Bot die Gruppe nicht kennt oder ob ein anderer Bot-Token verwendet wird.

3. Edge Function deployen und testen
- `notify-telegram` nach der Änderung deployen.
- Den Test erneut gegen `-5294444783` ausführen.
- Ergebnis auswerten: Wenn `getMe` den richtigen Bot zeigt und `getChat` mit `chat not found` fehlschlägt, ist die Ursache nicht Supabase, sondern Telegram: exakt dieser Bot hat keinen Zugriff auf diese Gruppe oder die ID stammt aus einem anderen Bot-Kontext.