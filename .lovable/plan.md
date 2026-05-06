## Ziel
Neuer Admin-Reiter "Splitter" unter `/admin/splitter` zum Aufteilen großer Nummernlisten in mehrere `.txt`-Dateien mit konfigurierbarer Stückelung, plus ZIP-Download.

## UI / UX
- Neuer Sidebar-Eintrag "Splitter" (Icon: `Scissors` aus lucide-react) in `src/components/AdminLayout.tsx`.
- Neue Seite `src/pages/AdminSplitter.tsx`, Route `/admin/splitter` in `src/App.tsx`.

Layout (zweispaltig auf Desktop, gestapelt auf Mobile):
- Links: Großes `<Textarea>` (~600px Höhe) für Nummern, eine pro Zeile. Live-Anzeige: "X Nummern erkannt".
- Rechts (Card):
  - Input "Stückelung" (number, default `1500`, min `1`)
  - Checkbox "Duplikate entfernen" (default an)
  - Checkbox "Leere Zeilen ignorieren" (default an)
  - Button "Split & ZIP herunterladen" (Primary)
  - Button "Einzeln herunterladen" (Secondary)
- Nach dem Split: kleine Übersicht mit Liste der erzeugten Dateien (Name + Anzahl Nummern).

## Logik
- Eingabe parsen: nach Zeilen splitten, trimmen, leere entfernen, optional Duplikate entfernen.
- In Chunks zu je `N` aufteilen.
- Dateibenennung nach tatsächlicher Nummern-Anzahl im Chunk:
  - Erste Datei mit voller Stückelung: `1500.txt`
  - Folgende mit gleicher Größe: `1500 2.txt`, `1500 3.txt`, `1500 4.txt`, ...
  - Letzter Rest-Chunk mit abweichender Größe: `1000.txt` (kein Suffix, da einmalig)
  - Falls ein Größenwert mehrfach vorkommt → fortlaufender Zähler ab dem 2. Vorkommen mit Leerzeichen (`" 2"`, `" 3"`, ...).
- Inhalt: Nummern mit `\n` verbunden.
- ZIP-Erstellung mit `jszip` (`bun add jszip`), Download via Blob + `URL.createObjectURL`. ZIP-Name: `nummern-split-{timestamp}.zip`.
- Einzeldownload-Button: triggert pro Datei einen Browser-Download.

## Beispiel
Eingabe 10.000 Nummern, Stückelung 1500 → 7 Dateien:
`1500.txt`, `1500 2.txt`, `1500 3.txt`, `1500 4.txt`, `1500 5.txt`, `1500 6.txt`, `1000.txt`.

## Technische Änderungen
- `src/pages/AdminSplitter.tsx` (neu) — komplett client-seitig, keine DB, keine Edge Function.
- `src/App.tsx` — Route registrieren.
- `src/components/AdminLayout.tsx` — Sidebar-Eintrag.
- `package.json` — `jszip` hinzufügen.
