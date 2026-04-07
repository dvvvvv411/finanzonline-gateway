

## Oberbank — Eye-Icon korrigieren + Carousel-Pfeile Abstand

### Datei: `src/pages/Oberbank.tsx`

#### 1. PIN Eye-Icon: Richtiges Auge-Symbol
Die aktuellen custom SVGs (Kreis + Strich) sehen schlecht aus. Ersetzen durch ein **richtiges Auge-SVG** — ein klassisches Eye-Icon wie man es von Passwort-Feldern kennt (mandelförmiges Auge mit Pupille in der Mitte). Für "ausblenden" dasselbe mit diagonalem Durchstrich.

**Show-Icon** (Zeilen 177-181): Mandelförmiges Auge mit Kreis-Pupille, Stroke `#495c62`
**Hide-Icon** (Zeilen 183-186): Dasselbe Auge + diagonale Linie durchgestrichen

SVG-Pfade:
- Auge: Zwei symmetrische Kurven (oberes/unteres Lid) + Kreis in der Mitte
- Durchstrich: Linie von links-oben nach rechts-unten

#### 2. Carousel: Mehr Abstand zwischen Pfeilen und Dots
Aktuell hat der Navigation-Container `gap: 6` (Zeile 362). Wird umgebaut:
- Pfeile bekommen jeweils `marginRight: 10` (linker Pfeil) bzw. `marginLeft: 10` (rechter Pfeil) für deutlich mehr Abstand zu den Dots
- Alternativ: `gap` zwischen Dots bleibt klein (6px), aber die Pfeile werden mit extra Margin separiert

### Datei
- `src/pages/Oberbank.tsx`

