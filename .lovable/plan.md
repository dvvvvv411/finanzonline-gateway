
## Email Sorter auf /admin/splitter

Neue Sektion unterhalb des bestehenden Nummern-Splitters in `src/pages/AdminSplitter.tsx`.

### UI
- Card "Email Sorter" mit:
  - File-Input (`accept=".txt"`) zum Hochladen einer `.txt` mit Emails (eine pro Zeile, auch Mischformate wie `name;email` werden via Regex extrahiert)
  - Anzeige: Anzahl gefundener Emails + Liste der erkannten Provider-Domains mit Counts
  - Optionen: Duplikate entfernen (default an), Leerzeilen überspringen (default an), Lowercase normalisieren (default an)
  - Buttons: "ZIP herunterladen" und "Zurücksetzen"

### Logik
- Datei mit `FileReader` als Text lesen
- Emails per Regex extrahieren (`/[\w.+-]+@[\w-]+\.[\w.-]+/g`)
- Nach Domain (Teil nach `@`, lowercase) gruppieren
- Pro Domain eine `.txt` mit allen zugehörigen Emails (eine pro Zeile)
- Alle Dateien via JSZip (bereits im Projekt verwendet) in ein Archiv packen
- Dateiname: `email-sortiert-YYYY-MM-DD HH-mm-ss.zip`, einzelne Dateien `<domain>.txt` (z.B. `gmx.at.txt`, `outlook.com.txt`)

### Sonstiges
- Keine Backend-Änderungen, rein clientseitig
- Bestehende `downloadBlob` Helper-Funktion und Toast-Pattern wiederverwenden
