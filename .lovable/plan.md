

## Oberbank — Cards kürzer + Dots/Pfeile oben im Bild

### Visualisierung VORHER → NACHHER

```text
VORHER:
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  |                |
|                |  |                |  |   [  img  ]    |
|                |  |                |  |                |
|                |  |                |  |                |
| Erstanmeldung  |  | Support-Tool > |  |   ◄ ●●● ►    |  ← Dots UNTEN
+================+  +================+  +================+
  alle stretch → so hoch wie die höchste Card (Links)

NACHHER:
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  |   ◄ ●●● ►    |  ← Dots OBEN
|                |  |                |  |   [  img  ]    |
|                |  |                |  |                |
| Erstanmeldung  |  | Support-Tool > |  |                |
+================+  +================+  +================+
  alignItems: "stretch" bleibt, aber Cards werden kürzer
  durch kleinere Fonts/Paddings bei Links
```

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **Cards Höhe reduzieren** | Links haben `padding: "10px 20px"` und 7 Links → Card wird hoch | Padding auf `8px 20px`, Link-Fontsize auf `12px` |
| 2 | **Login Card h2** | `fontSize: 16, margin: "0 0 20px"` | `margin: "0 0 14px"` |
| 3 | **Links Card h2** | `fontSize: 16, margin: "0 0 16px"` | `margin: "0 0 10px"` |
| 4 | **Carousel Dots+Pfeile** | `position: absolute; bottom: 12` (unten im Bild) | `top: 12` statt `bottom: 12` (oben im Bild) |
| 5 | **Login Inputs** | `marginBottom: 12` auf Banking-Nr Input | `marginBottom: 10` |
| 6 | **SSL Text** | `margin: "0 0 16px"` | `margin: "0 0 12px"` |
| 7 | **Weiter Button** | `padding: "8px 32px"` | `padding: "6px 24px"` |

### Datei
- `src/pages/Oberbank.tsx`

