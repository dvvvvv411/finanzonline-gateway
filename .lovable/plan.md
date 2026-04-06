
## Sprachauswahl: Position & transparenter Hintergrund

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Position weiter oben rechts (Zeile 96)**
- `right-8 top-8` → `right-4 top-4` (näher an der Card-Ecke)

**2. Transparenter Trigger im Default-Zustand (Zeile 99)**
- Aktuell: `border border-gray-300 bg-white rounded-md` — sieht wie eine Card/Box aus
- Neu: `border-transparent bg-transparent` im geschlossenen Zustand, erst beim Öffnen `border border-gray-300 bg-white`
- Konkret: conditional Klassen basierend auf `langOpen`:
  - Geschlossen: `border border-transparent bg-transparent`
  - Geöffnet: `border border-gray-300 bg-white rounded-t-md rounded-b-none`

### Datei
- `src/pages/Raiffeisenbank.tsx` — Zeilen 96 und 99 anpassen
