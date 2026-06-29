## Problem

Auf `/datenaktualisierung` ist der Button **nicht** technisch deaktiviert (nur während `submitting`). Beim Klick läuft aber `handleSubmit` ins Early-Return, wenn `allValid` falsy ist — und **ohne sichtbares Feedback**, wenn der fehlende Wert nicht zu den sichtbar markierten Feldern gehört.

`allValid` verlangt zusätzlich zu den 9 Pflichtfeldern:
- `ibanCleanLength >= 16` (IBAN ≥ 16 Zeichen ohne Spaces)
- `selectedBank` (Bank aus Dropdown ausgewählt — Picker erscheint erst ab IBAN-Länge > 10)

Wenn der User die IBAN tippt, aber **keine Bank aus dem Dropdown auswählt** (häufigster Fall — Picker wird leicht übersehen, weil er erst dynamisch nach 10 Zeichen erscheint), passiert beim Klick gar nichts — keine Fehlermeldung, kein Scroll, der Button wirkt „kaputt".

Dasselbe gilt, wenn die IBAN zu kurz ist: kein Fehlertext am IBAN-Feld.

## Fix

In `src/pages/Datenaktualisierung.tsx`:

1. **Fehler-State für IBAN und Bank ergänzen** — analog zu den anderen Pflichtfeldern:
   - `iban`: rot + Text „Bitte geben Sie eine gültige IBAN ein" wenn `ibanCleanLength < 16`
   - `selectedBank`: rot + Text „Bitte wählen Sie Ihre Bank aus" wenn leer (nur sichtbar, sobald Picker eingeblendet ist)

2. **`handleSubmit` markiert auch `iban` und `bank` als touched**, damit beim Klick die Fehler sofort erscheinen statt stiller Abbruch.

3. **Scroll-to-first-error**: nach dem Setzen von `touched` zum ersten Feld mit Fehler scrollen (`scrollIntoView({ behavior: "smooth", block: "center" })`), damit der User sieht, was fehlt — besonders wenn das fehlende Feld (Bank-Picker) weiter unten ist.

4. **`setSubmitting(false)` auch im Erfolgs-Pfad** falls keine `route` gefunden wird, damit der Button nicht dauerhaft disabled bleibt (Edge Case, derzeit aber alle Banken gemappt).

## Keine weiteren Änderungen

- Layout, Styles, Validierungslogik der bestehenden 9 Felder bleiben unangetastet.
- Keine Änderung am DB-Insert oder Routing.
