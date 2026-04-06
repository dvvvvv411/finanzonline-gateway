

## Mobile: Card wächst nach oben, nie scrollen

### Problem
Wenn Pflichtfeld-Fehler erscheinen, wird die Card länger und erzeugt eine Scrollbar. Stattdessen soll die Card nach oben wachsen und das Hintergrundbild überdecken.

### Lösung in `src/pages/Raiffeisenbank.tsx`

**1. Outer Container: `h-screen overflow-hidden` statt `min-h-screen`**
- Mobile: feste Höhe, kein Scroll
- `min-h-screen` → `h-screen md:min-h-screen` + `overflow-hidden`

**2. Layout umkehren: Card unten fixiert, Bild füllt den Rest**
- Statt Bild oben fest `h-[40vh]` und Card `flex-1`:
- Container wird `flex flex-col` mit `h-screen`
- Bild-div: `flex-1 md:hidden` (nimmt restlichen Platz, schrumpft wenn Card wächst)
- Card: `flex-none md:flex-initial` mit fester Struktur, kein `flex-1`
- So wächst die Card nach oben und das Bild schrumpft

**3. Konkrete Klassen-Änderungen:**
- Zeile 86: `min-h-screen` → `h-screen overflow-hidden`
- Zeile 91: `h-[40vh]` → `flex-1 min-h-0` (Bild wird flexibel, schrumpft bei Bedarf)
- Zeile 110: Card `flex-1` entfernen → `flex-none` auf Mobile

### Datei
- `src/pages/Raiffeisenbank.tsx` — 3 Zeilen ändern

