### Ziel
Den Email Sorter so erweitern, dass nach dem Hochladen eine Provider-Auswahl erscheint und nur die gewählten Provider in das ZIP exportiert werden.

### Was sich ändert
- `src/pages/AdminSplitter.tsx`

### Schritte

1. **State erweitern**
   - `selectedDomains`: `Set<string>` – speichert die gewählten Provider.

2. **UI: Provider-Auswahl**
   - Nach Upload und Erkennung zeigt die linke Spalte eine Checkbox-Liste aller Provider an (z. B. `gmx.at (42)`, `outlook.com (15)` …).
   - Ein „Alle auswählen / Alle abwählen“ Toggle über der Liste.
   - Standard: alle Provider sind vorausgewählt.

3. **ZIP-Export anpassen**
   - `handleZip` filtert `groups` auf `selectedDomains.has(g.domain)` bevor Dateien in JSZip gepackt werden.
   - Toast zeigt die tatsächlich exportierte Anzahl (Provider + Emails).

### Unverändert
- Regex, Upload, Duplikats-/Kleinbuchstaben-Optionen, Reset-Button, Datei-Download-Helper.

### Technisch
- Reines Frontend-Update, keine neuen Dependencies.