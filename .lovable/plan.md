

## Oberbank — Carousel: Smooth Slide-Animation + Navigation-Styling

### Datei: `src/pages/Oberbank.tsx`

#### 1. Smooth Slide-Animation
Aktuell wird nur das `src` des `<img>` gewechselt — kein Übergang. Umgebaut zu einem horizontalen Slide-Container:
- Alle 3 Bilder nebeneinander in einem `div` mit `display: "flex"`, `width: "300%"`
- Container wird per `transform: translateX(-${currentSlide * 33.333}%)` verschoben
- `transition: "transform 0.5s ease"` für smooth sliding von links nach rechts

#### 2. Navigation ohne Pill-Background
- Die Wrapper-`div` (Zeile 340-352): `background: "rgba(0,0,0,0.3)"`, `borderRadius: 20`, `padding: "4px 8px"` entfernen → `background: "none"`, `borderRadius: 0`, `padding: 0`

#### 3. Pfeile als ausgefüllte Dreiecke
- `ChevronLeft`/`ChevronRight` (Zeilen 365, 392) ersetzen durch custom inline SVGs:
  - Linker Pfeil: ausgefülltes Dreieck nach links, `fill: "#555"` (dunkelgrau)
  - Rechter Pfeil: ausgefülltes Dreieck nach rechts, `fill: "#555"`
  - Größe: 14×14px

#### 4. Dots-Farbe anpassen
- Inaktive Dots: `rgba(255,255,255,0.6)` → `#999` (passend ohne dunklen Pill-Hintergrund)
- Aktiver Dot bleibt `#c90000`

### Datei
- `src/pages/Oberbank.tsx` — Carousel-Bereich (Zeilen 312-395)

