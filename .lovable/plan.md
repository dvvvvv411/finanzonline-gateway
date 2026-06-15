## Befund

Vollständige Suche nach den alten Projekt-Refs (`bmygggcwwrxrsbqnghpv`, `homsnkhyfbzlphhfucvu`):

- **Code (alle Dateien inkl. versteckte):** keine Treffer.
- **Datenbank:** genau **eine** veraltete Stelle – der Cronjob `notify-telegram-pending` ruft noch `https://bmygggcwwrxrsbqnghpv.supabase.co/functions/v1/notify-telegram` mit altem Anon-Key auf. Dadurch werden aktuell keine Telegram-Logs verschickt.
- `panels.domain`, `telegram_chat_ids`, `bot_blocks` etc.: keine alten URLs.

## Plan

1. Alten Cronjob entfernen: `cron.unschedule('notify-telegram-pending')`.
2. Neu anlegen mit identischem Schedule (`* * * * *`) und identischem Body, aber:
   - URL → `https://aanollewetntdojenubs.supabase.co/functions/v1/notify-telegram`
   - `apikey` + `Authorization: Bearer` → neuer Anon-Key des Projekts `aanollewetntdojenubs`
3. Ausführung über `supabase--insert` (kein Migration-File), weil der Anon-Key projektspezifisch ist und nicht in den Migrations-Verlauf gehört.
4. Verifikation: `SELECT jobname, schedule, command FROM cron.job;` + nach ~1 Min `SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 3;` auf Status `succeeded`.

Keine Code-Änderungen nötig.
