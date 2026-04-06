

## BAWAG Seite: Mobile/Tablet Skalierung Fix

### Problem
`transform-origin: top center` positioniert den Ankerpunkt bei 485px (Mitte von 970px), was bei einem 390px Viewport den Content nach rechts verschiebt und abschneidet.

### Lösung
- `transformOrigin` auf `'top left'` ändern
- `margin: '0 auto'` entfernen
- Stattdessen bei `scale < 1`: kein Margin nötig, da `970 * scale = viewportWidth` — der Content füllt exakt die Breite
- Bei `scale === 1`: Content zentrieren via Wrapper mit `display: flex; justify-content: center`

### Umsetzung in `src/pages/Bawag.tsx`

**Äußerer Container (Zeile 91-97):**
- Wird zu einem Flex-Container mit `justify-content: center`

**Innerer Container (Zeile 98-106):**
- `transformOrigin: 'top left'` statt `'top center'`
- `margin: '0 auto'` entfernen

```text
VORHER (mobile 390px):
  970px Box mit origin=center → rechts verschoben, abgeschnitten

NACHHER (mobile 390px):
  970px Box mit origin=top left → scale(0.4) → 388px breit → passt links bündig
  Bei Desktop >= 970px → scale(1), flex-center zentriert den Block
```

### Datei
- `src/pages/Bawag.tsx` — 2 Zeilen ändern

