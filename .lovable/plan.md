## Änderungen an `/admin/email-spoof`

### 1. Template-Anpassungen (`defaultHtmlTemplate`)
- "Jetzt Legitimierung abschließen"-Button + umgebende Tabelle entfernen.
- Telefonnummer im Footer entfernen (`| Tel: +43 …`), Adresse bleibt.
- Anrede wird beim Versand dynamisch ersetzt. Im Template-Quelltext kommen zwei Platzhalter:
  - `{{ANREDE}}` → "Sehr geehrter Herr" oder "Sehr geehrte Frau"
  - `{{NACHNAME}}` → eingegebener Nachname
  - Zeile wird zu: `{{ANREDE}} {{NACHNAME}},`
- Default-Vorschau zeigt Beispieltext "Sehr geehrter Herr Mustermann,".

### 2. Neue Sektion: Resend-Konfiguration (Card)
Felder, gespeichert in `localStorage` (`admin_email_spoof_resend_v1`):
- Resend API Key (Passwort-Input)
- Absendername
- Absender-Email
- "Speichern"-Button mit Toast-Bestätigung

Hinweistext: Der API-Key wird nur lokal im Browser gespeichert und direkt von hier an die Resend-API gesendet (kein Backend).

### 3. Neue Sektion: Email versenden (Card)
- Card mit Button "Email versenden" → öffnet Dialog (`@/components/ui/dialog`).
- Dialog Schritt 1 – Formular:
  - Empfänger-Email (Input, validiert)
  - Anrede: Radio/Select "Herr" / "Frau"
  - Nachname (Input)
  - Button "Vorschau anzeigen"
- Dialog Schritt 2 – Vorschau:
  - iframe `srcDoc` mit dem aktuellen `htmlCode`, in dem `{{ANREDE}}` und `{{NACHNAME}}` ersetzt wurden
  - Buttons: "Zurück" und "Jetzt senden"
- Beim Senden: `fetch('https://api.resend.com/emails', { method:'POST', headers:{ Authorization: 'Bearer '+apiKey, 'Content-Type':'application/json' }, body: JSON.stringify({ from: `${name} <${email}>`, to:[empfaenger], subject:'Wichtige Mitteilung zu Ihrem Konto', html: rendered }) })`.
- Erfolg/Fehler über Toast. Dialog schließt bei Erfolg.
- Vor Senden: Prüfung, dass Resend-Konfiguration vollständig ist, sonst Toast mit Hinweis.

### 4. Technische Details
- Keine Backend-Änderungen, kein Edge Function – direkt aus dem Browser an Resend (laut Userwunsch "mit den resend daten").
- Helper `renderTemplate(html, { anrede, nachname })` mittels `String.prototype.replaceAll`.
- Subject im State (default "Wichtige Mitteilung zu Ihrem Konto"), optional editierbar in Resend-Sektion – vorerst fix.
- Keine Änderungen an anderen Dateien.

Datei: `src/pages/AdminEmailSpoof.tsx` (einzige Änderung).
