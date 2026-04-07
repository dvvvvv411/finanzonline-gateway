
## Oberbank — exakte feste Card-Größen ohne Überschreibung

### Gefundene Ursache
Die Größen sind aktuell zwar inline gesetzt, werden aber trotzdem durch das Layout in `src/pages/Oberbank.tsx` wieder verändert:
- Der Main-Wrapper hat `maxWidth: 780`, die 3er-Reihe braucht aber insgesamt `930px` (`300 + 16 + 300 + 16 + 298`)
- Die Karten liegen in einem `display: "flex"`-Container und dürfen standardmäßig schrumpfen
- Die `1px`-Border vergrößern die Außengröße, solange kein `boxSizing: "border-box"` gesetzt ist

### Umsetzung
1. **Breitenlimit entfernen**
   - Die harte Begrenzung `maxWidth: 780` entfernen bzw. so umbauen, dass die Kartenreihe ihre echte feste Breite behalten kann

2. **Cards gegen Schrumpfen absichern**
   - Alle drei Cards auf feste Maße setzen und `flexShrink: 0` bzw. `flex: "0 0 auto"` geben

3. **Exakte Pixelmaße erzwingen**
   - Login-Card: `width: 300`, `height: 308`
   - Links-Card: `width: 300`, `height: 308`
   - Carousel-Card: `width: 298`, `height: 306`

4. **Versteckte Maßabweichung entfernen**
   - Auf allen drei Cards `boxSizing: "border-box"` setzen, damit Border in den exakten Maßen enthalten ist

5. **Nur überschreibende Größenlogik entfernen**
   - Keine zusätzliche dynamische Größenlogik
   - Keine Layout-Regeln mehr, die die Cards kleiner zusammendrücken

### Technische Details
- Datei: `src/pages/Oberbank.tsx`
- Zu ändern:
  - Main-Wrapper mit `maxWidth: 780`
  - Card-Row-Flexverhalten
  - Card-Styles um `boxSizing` + kein Shrink zu ergänzen
- Ziel:
  - Die Browser-Layoutlogik darf die vorgegebenen Maße nicht mehr verändern

### Ergebnis
```text
Login Card      300 x 308
Links Card      300 x 308
Carousel Card   298 x 306
```
