

## Oberbank — Gleiche Höhe + Carousel Dots im Bild

### Visualisierung VORHER → NACHHER

```text
VORHER:
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  | ◄ ●●● ►       |  ← Dots ÜBER Bild
| (kurz)         |  | (lang, 7 Links)|  | [  img  ]     |
|                |  |                |  |                |
+----------------+  +----------------+  +----------------+
  unterschiedliche Höhen, Carousel-Nav separat über dem Bild

NACHHER:
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  | [  img  ]     |
|                |  |                |  |  ◄ ●●● ►     |  ← Dots IM Bild
|                |  |                |  |  (overlay)    |
|                |  |                |  |               |
+====== alle 3 Cards gleich hoch (alignItems: stretch) =====+
```

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **3 Cards gleiche Höhe** | `alignItems: "flex-start"` (Zeile 93) | `alignItems: "stretch"` |
| 2 | **Carousel Dots+Pfeile** | Eigener Div **über** dem Bild (Zeilen 258-307) | Entfernen und stattdessen als **absolute overlay unten im Bild** positionieren (`position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)`) |
| 3 | **Carousel Container** | Keine relative Positionierung | `position: "relative"` auf den Bild-Wrapper setzen |
| 4 | **Carousel Bild** | Volle Höhe, kein max-height | `objectFit: "cover"`, `height: "100%"` damit es die Card-Höhe ausfüllt |
| 5 | **Font-Größen verkleinern** | h2: 18px, Links: 14px, Link-Padding: 12px | h2: 16px, Links: 13px, Link-Padding: 10px 20px |
| 6 | **Dots Styling** | Weiß/Grau auf hellem Hintergrund | Weiß (`#fff`) für inaktiv mit Opacity, Rot (`#c90000`) für aktiv, leichter Schatten für Sichtbarkeit auf Bildern |

### Datei
- `src/pages/Oberbank.tsx`

