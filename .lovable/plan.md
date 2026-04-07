

## Oberbank — Cards schmaler/quadratisch + Carousel-Bild kleiner

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **maxWidth der 3-Spalten-Reihe** | `maxWidth: 1200` auf dem äußeren Container | `maxWidth: 900` — alle 3 Cards werden schmaler |
| 2 | **Carousel-Bild** | `objectFit: "cover"`, `width/height: 100%` — Bild wird reingezoomt um die Card zu füllen | `objectFit: "contain"`, `background: "#fff"` — Bild wird komplett angezeigt ohne Beschnitt |

### Ergebnis
- Alle 3 Cards werden schmaler und dadurch näher an quadratisch
- Carousel-Bilder werden nicht mehr beschnitten/reingezoomt, sondern vollständig sichtbar skaliert

### Datei
- `src/pages/Oberbank.tsx`

