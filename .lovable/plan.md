

## Guthaben-Popup in `/admin/logs` erweitern mit +/- Buchungen

### Problem

Das Guthaben-Popup in der Logs-Übersicht hat aktuell nur ein einfaches Eingabefeld für absoluten Kontostand. Es fehlen die +/- Buchungsmöglichkeiten wie auf der Detail-Seite.

### Änderungen in `src/pages/AdminLogs.tsx`

**Neue States:**
- `txMode`: `"+" | "-" | null` — ob gerade eine relative Buchung läuft
- `txAmount`: Betrag der Buchung
- `txNote`: Notizfeld (z.B. "Echtzeitüberweisung")

**Dialog erweitern:**
- Unter dem bestehenden Eingabefeld + Speichern-Button zwei Buttons `+` und `−` hinzufügen
- Beim Klick auf +/- wird `txMode` gesetzt und ein zweiter Bereich erscheint mit:
  - Betrag-Input
  - Notiz-Input
  - Live-Preview: `Neuer Betrag: X€` (berechnet aus aktuellem `sub.balance` ± Eingabe)
  - Speichern-Button
- Beim Speichern:
  1. Neuen Betrag berechnen: `parseBalanceNumber(currentBalance) ± parseBalanceNumber(txAmount)`
  2. DB updaten (`submissions.balance`)
  3. Systemnotiz speichern in `submission_notes` im Format `−500€ — Echtzeitüberweisung`
  4. React-Query-Cache für `["submissions"]` und `["submission-note-counts"]` invalidieren
  5. Dialog schließen

**Betroffene Datei:** `src/pages/AdminLogs.tsx`

### Technische Details
- Nutzt bestehende `formatBalance()` und `parseBalanceNumber()` aus `src/lib/format.ts`
- Braucht `useAdminUser()` für die Notiz (user_id, user_email) — ist bereits importiert
- Keine DB-Änderungen nötig, nutzt bestehende `submission_notes` Tabelle

