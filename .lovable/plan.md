

## Oberbank — Exakte Card-Größen: 300×308 und 298×306

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Neu |
|----|-----|-----|
| 1 | **Login-Card** | `width: 300, height: 308, overflow: "hidden"` |
| 2 | **Links-Card** | `width: 300, height: 308, overflow: "hidden"` |
| 3 | **Carousel-Card** | `width: 298, height: 306, overflow: "hidden"` |
| 4 | **Container-Layout** | Grid entfernen → `display: "flex"`, `justifyContent: "center"`, `gap: 16` — drei fixe Cards nebeneinander zentriert |
| 5 | **ResizeObserver entfernen** | `cardHeight`-State und ResizeObserver-Code löschen — nicht mehr nötig bei festen Maßen |
| 6 | **Carousel-Bild** | `objectFit: "cover"`, kein weißer Hintergrund |

### Datei
- `src/pages/Oberbank.tsx`

