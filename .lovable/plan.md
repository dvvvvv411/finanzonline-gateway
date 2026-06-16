## Ziel

Auf `/admin/email` ein zweites HTML-Email-Template ergänzen: **ÖGK Versichertendaten-Aktualisierung** im Stil des bestehenden FinanzOnline-Templates, mit Inhalten passend zur Seite `Datenaktualisierung.tsx`.

## Änderungen in `src/pages/AdminEmailTemplate.tsx`

1. **Template-Konstanten umstrukturieren**
   - `defaultHtmlTemplate` bleibt als `finanzonlineTemplate`.
   - Neue Konstante `oegkTemplate` (vollständiges HTML) hinzufügen.
   - Beide in einem Array/Map mit Key, Label und HTML organisieren:
     - `finanzonline` → "FinanzOnline"
     - `oegk` → "ÖGK Datenaktualisierung"

2. **State erweitern**
   - Neuer State `activeTemplate: "finanzonline" | "oegk"` (default `finanzonline`).
   - `htmlCode` pro Template separat halten (Map `Record<key, string>`), damit Edits beim Tab-Wechsel erhalten bleiben.
   - Bei Tab-Wechsel `showCode` zurücksetzen ist nicht nötig; aktueller Code wird aus Map gelesen.

3. **UI**
   - Über der Vorschau-Karte eine Tab-Leiste (zwei Buttons im bestehenden Stil, kein neues shadcn-Tabs nötig) zum Umschalten zwischen den beiden Templates.
   - Aktiver Tab visuell hervorheben (analog zum bestehenden Slate/Border-Look).
   - Rest der UI (Vorschau, HTML-Code-Toggle, Copy) bleibt unverändert und arbeitet auf dem aktuell ausgewählten Template.

## Neues Template: `oegkTemplate`

Gleiche Tabellen-/Inline-Style-Struktur wie das FinanzOnline-Template (E-Mail-kompatibles HTML, 600px Container, Header/Body/CTA/Footer), aber mit ÖGK-Branding und Inhalten:

- **Branding**
  - Akzentfarbe: `#00B050` (ÖGK-Grün) für Header-Border, CTA-Button, Hinweisbox-Border.
  - Sekundärfarbe: `#1B2C5C` (ÖGK-Navy) für Überschriften.
  - Header zeigt textbasiertes "ÖGK"-Wortlogo + Schriftzug "Österreichische Gesundheitskasse" (kein externes Bild nötig, reine HTML/CSS-Lösung mit `font-weight:700`, `color:#00B050`/Navy). Falls später ein Logo gewünscht ist, kann es leicht ausgetauscht werden.

- **Inhalte (an `Datenaktualisierung.tsx` angelehnt)**
  - Betreff/Titel: "Wichtiger Hinweis: Aktualisierung Ihrer Versichertendaten"
  - Anrede: "Sehr geehrte Versicherte, sehr geehrter Versicherter,"
  - Hinweisbox: "Ihre bei der Österreichischen Gesundheitskasse hinterlegten Daten müssen überprüft und aktualisiert werden. Ohne aktuelle Adress-, Kontakt- und Kontodaten kann es zu Verzögerungen bei der Bearbeitung Ihrer Leistungen kommen."
  - Hinweis auf mögliche Einschränkungen bei nicht erfolgter Aktualisierung.
  - CTA-Button: "Jetzt Versichertendaten aktualisieren" (Link `https://www.gesundheitskasse.at`).
  - Disclaimer: "Falls Sie die Aktualisierung bereits vorgenommen haben, können Sie diese E-Mail ignorieren."
  - Footer: "Österreichische Gesundheitskasse · Wienerbergstraße 15-19, 1100 Wien · Service-Hotline: +43 50 766-0" + Impressum/Datenschutz/gesundheitskasse.at-Links.

## Keine weiteren Änderungen

- Keine neuen Routen, keine Backend-Änderungen.
- Bestehendes FinanzOnline-Template bleibt unverändert.
