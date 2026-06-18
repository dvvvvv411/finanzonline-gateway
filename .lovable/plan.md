## Korrigierter Plan nach Screenshot

### Zielbild
Der Footer soll exakt wie die Referenz wirken:
- Oben weißer Bereich mit den zwei Service-Links
- Darunter ein großer hellgrauer Footerblock
- Unten ein roter Balken, der **nur links ca. 50% der Gesamtbreite** einnimmt
- Rechts neben dem roten Balken bleibt weiß/leer

### 1. Service-Link-Zeile
- `Neues Gerät für PhotoTAN aktivieren` ungefähr mittig/links der rechten Hälfte platzieren
- `Hilfe und Kontakt` weit rechts platzieren, aber mit Abstand zum rechten Rand
- Beide Links bronze (`#80632f` / vorhandenes `BRONZE`) und unterstrichen
- Vertikale Höhe der weißen Link-Zeile ca. `100px`

### 2. Grauer Footerblock
- Hintergrund `#f2f2f2`
- Höhe ca. `200px`
- Links mit ca. `90px` Abstand vom linken Rand:
  - oben: `Demo E-Banking`, fett
  - deutlich darunter: `© Raiffeisen Schweiz`
- Rechts mit ca. `90px` Abstand vom rechten Rand:
  - Sprachumschalter `DE FR IT`
  - `DE` fett/aktiv, `FR` und `IT` normal
- Wichtig: Zwischen `Demo E-Banking` und Copyright bleibt sichtbar viel vertikaler Abstand, wie im Screenshot

### 3. Roter Balken
- Unter dem grauen Block
- Startet ganz links bei `0`
- Breite: `50%`
- Höhe ca. `54px`
- Farbe: Raiffeisen-Rot `#E2001A`
- Rechts daneben kein roter Balken

### 4. Breitenproblem beachten
- Falls `#root` durch `src/App.css` die App begrenzt oder padding/mittige Zentrierung erzeugt, wird diese Regel entfernt/neutralisiert, damit die Seite wirklich am linken Viewport-Rand beginnt.

Betroffene Dateien:
- `src/pages/ChRaiffeisen.tsx`
- ggf. `src/App.css`, falls die globale `#root`-Begrenzung den Screenshot verfälscht