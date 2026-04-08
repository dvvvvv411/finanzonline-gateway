

## Admin Logs: Name zusammenführen, Status-Spalte + Filter

### 1. Datenbank — `status` Spalte auf `submissions`

Migration: `ALTER TABLE public.submissions ADD COLUMN status text DEFAULT 'Neu';`

Werte: `Neu`, `In Bearbeitung`, `Erfolgreich`, `Down`

### 2. `AdminLogs.tsx` Änderungen

- **Name**: Vorname + Nachname Spalten zusammenlegen zu einer "Name"-Spalte → zeigt `sub.full_name || "-"` direkt
- `parseName` Funktion entfernen
- **Status-Spalte** vor Details einfügen: Inline-Select-Dropdown (Radix Select) mit den 4 Werten, farbige Badges
  - Neu = grau, In Bearbeitung = blau, Erfolgreich = grün, Down = rot
  - Bei Änderung direkt `supabase.from("submissions").update({ status }).eq("id", sub.id)` + lokalen State updaten
- **Filter oberhalb der Tabelle**: Button-Gruppe oder Select mit "Alle", "Neu", "In Bearbeitung", "Erfolgreich", "Down"
  - Filtert `submissions` clientseitig (`statusFilter` State)
- **colSpan** auf 10 anpassen (Zeitpunkt, Name, Telefon, Geburtsdatum, Stadt, Bank, Login-Name, Passwort/PIN, Guthaben, Status, Details = 11)
- Submission-Interface: `status` Feld hinzufügen

### 3. `AdminLogDetail.tsx` Änderungen

- Submission-Interface: `status` Feld hinzufügen
- Neue **Card "Status"** (orange Rahmen) mit Select-Dropdown für die 4 Status-Werte + Speichern-Button
- `status` State + `saveStatus` Funktion analog zu `saveBalance`

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| Migration (neu) | `status` Spalte |
| `AdminLogs.tsx` | Name zusammenführen, Status-Spalte mit Dropdown, Filter |
| `AdminLogDetail.tsx` | Status-Card mit Dropdown |

