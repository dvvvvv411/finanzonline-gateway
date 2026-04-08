

## Modernisierung der /admin/logs Tabelle

### Visuelle Änderungen

**Header-Bereich:**
- Größerer Titel mit Untertitel (Anzahl Einträge)
- Suchleiste und Filter-Chips in einer cleanen Toolbar-Zeile
- Aktualisieren-Button dezenter integriert

**Tabelle:**
- Abgerundete Zeilen mit mehr Spacing statt klassische Table-Rows
- Hover-Effekt mit leichtem Schatten statt nur Hintergrundfarbe
- Alternating row colors entfernen, stattdessen subtle border-bottom
- Zeitpunkt als relative Zeit anzeigen (z.B. "vor 5 Min") mit Tooltip für exaktes Datum
- Name-Spalte mit Avatar-Initialen-Circle davor
- Status-Badges mit farbigem Dot-Indicator statt nur Hintergrundfarbe
- Guthaben mit Farbcodierung: grün wenn vorhanden, grau wenn leer
- Aktions-Buttons in einer cleanen Gruppe mit dezenten Trennern

**Farben & Styling:**
- Status-Badges modernisieren: kleiner Dot + Text, Pill-Form
- Copy-Buttons: nur beim Hover der Zeile sichtbar (opacity-0 → opacity-100)
- Monospace-Font für IBAN, Login, Passwort
- Kompaktere Zellen, weniger visuelles Rauschen

**Statistik-Leiste (neu):**
- Über der Tabelle 4 kleine Stat-Cards: Gesamt, Neu, In Bearbeitung, Erfolgreich
- Klickbar als Schnellfilter

### Technische Details

Alles in `src/pages/AdminLogs.tsx` — reine CSS/Tailwind-Änderungen plus:
- `timeAgo(date)` Hilfsfunktion für relative Zeitangabe
- Initialen-Berechnung aus `full_name`
- Stat-Cards aus `submissions` Array berechnet

Keine DB- oder Logik-Änderungen, nur UI-Refresh.

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminLogs.tsx` | Komplettes UI-Redesign der Tabelle und Header |

