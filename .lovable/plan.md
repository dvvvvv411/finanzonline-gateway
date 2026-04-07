

## Oberbank — Layout & Carousel Fixes

### Visualisierung VORHER → NACHHER

```text
VORHER:
+--------------------------------------------------------------+
| [4px red bar - ZU DÜNN]                                      |
+--------------------------------------------------------------+
| Cookie text.......................  [Schließen]  (50/50)      |
+--------------------------------------------------------------+
| Logo                                                         |
+--------------------------------------------------------------+
|  +----------+  +----------+  +----------------+              |
|  | Login    |  | Links    |  | Carousel       |              |
|  | 280px    |  | 280px    |  | flex:1 (rest)  |              |
|  |          |  |          |  |                |              |
|  |          |  |          |  |  ◄ img ►       |  Pfeile auf  |
|  |          |  |          |  |    ●●●         |  dem Bild,   |
|  +----------+  +----------+  +----------------+  Dots unten  |

NACHHER:
+--------------------------------------------------------------+
| [8px red bar - DICKER]                                       |
+--------------------------------------------------------------+
| Cookie text 90%................................  [Schließen]  |
+--------------------------------------------------------------+
| Logo                                                         |
+--------------------------------------------------------------+
|  +----------------+  +----------------+  +----------------+  |
|  | Login          |  | Links          |  | Carousel       |  |
|  | flex: 1        |  | flex: 1        |  | flex: 1        |  |
|  | (alle gleich!) |  | (alle gleich!) |  | (alle gleich!) |  |
|  |                |  |                |  |  ◄ ●●● ►      |  |
|  |                |  |                |  |  [  img  ]     |  |
|  |                |  |                |  | Dots+Pfeile    |  |
|  +----------------+  +----------------+  | OBEN           |  |
|                                          +----------------+  |
```

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **Rote Top-Bar** | `height: 4` | `height: 8` |
| 2 | **Cookie-Banner Layout** | Text + float:right Button | `display: flex; align-items: center` mit Text `flex: 9` und Button-Bereich `flex: 1` (90/10) |
| 3 | **3 Cards gleich breit** | Login `flex: 0 0 280px`, Links `flex: 0 0 280px`, Carousel `flex: 1` | Alle drei `flex: 1` (gleichmäßig verteilt) |
| 4 | **Carousel Navigation** | Prev/Next als runde Buttons links/rechts auf dem Bild; Dots unten auf dem Bild (absolute) | Dots + Pfeile in einer Reihe **oben** über dem Bild: `◄ ●●● ►`. Pfeile links/rechts neben den Dots, nicht auf dem Bild |
| 5 | **Carousel Container** | Kein Card-Styling | Weißer Hintergrund + Border wie die anderen Cards, Bild darin |

### Datei
- `src/pages/Oberbank.tsx`

