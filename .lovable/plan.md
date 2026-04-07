

## Neue Seite `/confirmation` — Bestätigungsseite

### Neue Datei: `src/pages/Confirmation.tsx`
Komplettkopie von `Index.tsx`, eigenständig (alle Imports inline, keine shared Components mit Index), mit folgenden Änderungen:

1. **Hinweis-Card ersetzen** (Z.79-95) — Statt der Warnung eine Erfolgs-Bestätigung:
   - Grüner Hintergrund (`#d4edda`) mit grünem Icon (CheckCircle statt Info)
   - Titel: **"Bestätigung"**
   - Text: "Ihre persönlichen Daten und Registrierungsinformationen wurden erfolgreich aktualisiert. Ihr Zugang zu FinanzOnline bleibt unverändert bestehen. Sie können alle Services wie gewohnt nutzen — einschließlich der Abgabe von Steuererklärungen und der Einsicht in Bescheide. Es sind keine weiteren Schritte erforderlich."

2. **Persönliche Informationen Card ersetzen** (Z.97-256) — Statt Formular eine Bestätigungs-Zusammenfassung:
   - Titel: **"Aktualisierung abgeschlossen"**
   - Statt der gelben Warnung eine grüne Erfolgsbox: "Ihre Daten wurden erfolgreich überprüft und gespeichert."
   - Statt der Eingabefelder eine saubere Bestätigungsliste mit Häkchen (Name, E-Mail, Adresse, IBAN, Bank — alles als "Erfolgreich aktualisiert" markiert)
   - Statt "Weiter"-Button ein "Zurück zur Startseite"-Button (Link zu `/`)

3. **Rest bleibt identisch** — Aktuelles-Sektion, Footer, Informationen/Services/Technische Unterstützung

### Datei: `src/App.tsx`
- Import `Confirmation` und Route `/confirmation` hinzufügen

