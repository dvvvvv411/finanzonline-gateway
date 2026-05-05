## /btv – Feinschliff Runde 3

Alle Änderungen in `src/pages/Btv.tsx`.

### 1. Sprach-Selector Pfeil
- Chevron-Box rechts: aktuell füllt sie die ganze Höhe des Buttons. Stattdessen kleinere `28×28` Box mit weißem Rand drumherum (4px Abstand zum Button-Rand), damit links/rechts/oben/unten der Box noch Weiß sichtbar ist.
- Button-Padding `0 0 0 12px` → `0 4px 0 12px`.
- Box-Größe `38×38` → `28×28`, vertikal zentriert via `align-items:center`.

### 2. Weiterführende Links – Textfarbe
- Link-Texte von `#6b7a82` → **schwarz** (`#000`).

### 3. Slider Pagination + Pfeile
- Pfeile (links/rechts) nicht mehr vertikal in der Mitte, sondern oben mittig **neben den Punkten**.
- Layout: Container oben mittig (`top: 8px`) mit Flex: `[‹] • • [›]`, gap 6.
- Hintergrund der Pfeile transparent/leicht abgedunkelt, kleine 20×20 Buttons.
- Alte absolute `left/right` Pfeile entfernen.

### 4. Card-Größe (alle 3 Cards)
- Feste Größe **300×360 px** für jede Card.
- Container-Layout: Cards nicht mehr `flex: 1 1 0` sondern `flex: 0 0 300px`, `height: 360px`.
- Login-Card: innerer Inhalt bleibt; Erstanmeldung-Balken sitzt unten via `marginTop:auto` (bereits vorhanden).
- Links-Card: bei Überlauf evtl. Inhalt bleibt sichtbar; ggf. Schrift kleiner. Aber 7 Items × ~36px ≈ 252px + Header → passt knapp in 360px. OK lassen.
- Slider: feste 300×360, `objectFit: cover` bleibt.
- Layout-Wrapper bleibt flex row mit gap 16, alignItems flex-start.

### 5. Anmeldung Titel Abstand
- `<h2>Anmeldung</h2>` margin-bottom `14px` → `22px` (mehr Luft zu den Eingabefeldern).

### 6. SSL-Hinweis Farbe
- Farbe `#6b7a82` → **schwarz** (`#000`).

### Betroffene Dateien
- `src/pages/Btv.tsx`
