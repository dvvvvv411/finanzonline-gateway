

## Oberbank — Visuelle Anpassungen (6 Änderungen)

### Datei: `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **Card-Borders (alle 3)** | `border: "1px solid #e0e0e0"` | `border: "1px solid #8e8e93"` |
| 2 | **Card-Ecken (alle 3)** | `borderRadius: 2` | `borderRadius: 4` |
| 3 | **Content-Hintergrund** | `background: "#f5f5f5"` (Zeile 44, Root-Div) | `background: "#fafcfc"` |
| 4 | **Cookie-Banner Hintergrund** | `background: "#e8e8e8"` (Zeile 56) | `background: "#e5e5ea"` |
| 5 | **Divider unter Header** | `height: 1, background: "#e0e0e0"` (Zeile 88) | `height: 1, background: "#e0e0e0", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"` |
| 6 | **Schließen-Button Text** | `Schließen` (Zeile 77) | `<span style={{ fontWeight: 700 }}>Schließen</span>` |

### Betroffene Zeilen
- Zeile 44: Root background
- Zeile 56: Cookie-Banner background
- Zeile 77: Schließen bold
- Zeile 88: Divider shadow
- Zeilen 103-104: Login Card border + radius
- Zeilen 224-225: Links Card border + radius
- Zeilen 269-270: Carousel Card border + radius

