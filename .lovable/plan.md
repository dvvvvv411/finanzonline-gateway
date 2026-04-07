
## Oberbank — Kundenportal Card endet bei „Erstanmeldung“

### Ursache
Die Login-Card hat aktuell keine feste Überhöhe in sich selbst. Das Problem entsteht durch die 3er-Reihe mit `alignItems: "stretch"` in `src/pages/Oberbank.tsx`: Dadurch wird die Kundenportal-Card auf die Höhe der höchsten Nachbar-Card gezogen und wirkt unten zu lang.

### Visualisierung

```text
VORHER
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  | Carousel       |
| ...            |  | ...            |  | ...            |
| Erstanmeldung  |  | ...            |  | ...            |
|                |  | ...            |  | ...            |
+----------------+  +----------------+  +----------------+
  Login wird künstlich nach unten gestreckt

NACHHER
+----------------+  +----------------+  +----------------+
| Login          |  | Links          |  | Carousel       |
| ...            |  | ...            |  | ...            |
| Erstanmeldung  |  | ...            |  | ...            |
+----------------+  +----------------+  +----------------+
  Unterkante aller 3 Cards richtet sich nach der Login-Card
```

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | Höhenlogik der Kartenreihe | `alignItems: "stretch"` macht die höchste Card zur Referenz | `alignItems: "flex-start"` damit die Login-Card ihre natürliche Höhe behält |
| 2 | Referenz für Card-Höhe | keine | Login-Card wird per `ref` gemessen |
| 3 | Gleich hohe Nachbar-Cards | Links/Carousel bestimmen indirekt die Gesamthöhe | Links-Card und Carousel bekommen die gemessene Höhe der Login-Card |
| 4 | Keine Hardcodes | Höhe entsteht aktuell indirekt durch Layout-Stretch | keine feste Pixelhöhe, sondern dynamische Höhe aus der echten Login-Card |
| 5 | Optischer Abschluss | Login wirkt unten offen | Card endet direkt an der `Erstanmeldung`-Zeile |

### Technische Details
- `useRef` + kleine Height-State-Logik direkt in `Oberbank.tsx`
- Messung der Kundenportal-Card nach Render
- Links und Carousel werden an diese Höhe gebunden, statt umgekehrt
- Falls Links minimal zu hoch bleiben, werden nur deren innere Paddings/Fonts leicht reduziert — die Login-Card wird nicht künstlich verlängert
