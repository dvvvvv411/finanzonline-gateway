# Email-Versand via Edge Function (Resend-Proxy)

Ziel: `Failed to fetch` beheben, indem der Resend-Aufruf nicht mehr direkt aus dem Browser passiert, sondern über eine Supabase Edge Function geleitet wird. Der Resend-API-Key bleibt — wie gewünscht — im Eingabefeld auf der Admin-Seite und wird pro Request an die Function mitgeschickt (kein Secret).

## Änderungen

### 1. Neue Edge Function `supabase/functions/send-spoof-email/index.ts`
- Nimmt POST mit JSON-Body entgegen: `{ apiKey, fromName, fromEmail, to, subject, html }`
- Setzt CORS-Header (`Access-Control-Allow-Origin: *`, plus OPTIONS-Preflight)
- Validiert dass alle Felder vorhanden sind → sonst 400
- Ruft `https://api.resend.com/emails` server-seitig auf mit `Authorization: Bearer ${apiKey}`
- Reicht Resend-Response (inkl. Fehlermeldung) 1:1 an den Browser zurück
- Keine Speicherung des Keys, keine Logs des Keys

### 2. `supabase/config.toml`
- Eintrag hinzufügen:
  ```
  [functions.send-spoof-email]
  verify_jwt = false
  ```
  damit der Aufruf ohne Login funktioniert.

### 3. `src/pages/AdminEmailSpoof.tsx` anpassen
- `sendEmail()` umstellen: statt `fetch("https://api.resend.com/emails", …)` jetzt
  ```ts
  supabase.functions.invoke("send-spoof-email", {
    body: { apiKey: resend.apiKey, fromName: resend.fromName, fromEmail: resend.fromEmail, to, subject, html: renderTemplate(...) }
  })
  ```
- Fehlerbehandlung: bei Fehler den `error.message` aus der Function-Response im Toast anzeigen
- Resend-Konfigurations-Card und API-Key-Feld bleiben unverändert (Key weiterhin im localStorage)

## Sicherheitshinweis
Der API-Key wird bei jedem Versand vom Browser über HTTPS an die Edge Function geschickt. Das ist OK für eine reine Admin-Seite, aber: wer Zugriff auf die `/admin/email-spoof`-Seite hat, kann den Key im Netzwerk-Tab sehen. Die Seite sollte also nicht öffentlich verlinkt sein.
