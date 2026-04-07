
## Oberbank — Cards gleich breit/quadratischer + Carousel ohne weiße Ränder

### Ursache
Aktuell gibt es zwei getrennte Probleme in `src/pages/Oberbank.tsx`:
1. Die 3er-Reihe ist zwar auf `flex: 1` gestellt, aber die Gesamtbreite ist noch zu groß. Dadurch wirken die Cards rechteckig statt annähernd quadratisch.
2. Das Carousel-Bild nutzt `objectFit: "contain"` + weißen Hintergrund. Dadurch entstehen die weißen Ränder oben/unten in der Card.

### Umsetzung

| Nr | Änderung | Ziel |
|---|---|---|
| 1 | **3er-Reihe auf fixes 3-Spalten-Grid umstellen** statt freiem Flex-Verhalten | Alle drei Cards werden garantiert exakt gleich breit |
| 2 | **Gesamtbreite der Kartenreihe weiter reduzieren** (deutlich schmaler als die aktuellen `900px`) | Die Cards werden optisch kompakter und näher an quadratisch |
| 3 | **Login-Card bleibt die Referenzhöhe** | Die Kundenportal-Card endet weiterhin genau bei „Erstanmeldung“ |
| 4 | **Links-Card und Carousel exakt auf `cardHeight` der Login-Card binden** | Alle drei Cards enden auf derselben Höhe |
| 5 | **Innenabstände / Textgrößen der Links-Card leicht reduzieren** | Alle 7 Links passen in die kürzere, schmalere Card ohne Überhöhe |
| 6 | **Carousel-Bild von `contain` auf `cover` umstellen** und weißen Hintergrund entfernen | Keine weißen Ränder oben/unten mehr in der Card |
| 7 | **Navigation im Carousel oben im Bild belassen** | Pfeile + Punkte bleiben innerhalb des Bildbereichs |

### Konkrete technische Anpassungen
- In der Kartenreihe:
  - `display: "flex"` ersetzen durch `display: "grid"`
  - `gridTemplateColumns: "repeat(3, minmax(0, 1fr))"`
  - `gap` beibehalten oder leicht reduzieren
  - Wrapper-`maxWidth` weiter verkleinern, damit die Cards wirklich schmaler werden
- Die bestehende `ResizeObserver`-Logik bleibt erhalten:
  - `loginCardRef` misst die echte Höhe bis einschließlich „Erstanmeldung“
  - Links-Card und Carousel bekommen genau diese Höhe
- In der Links-Card:
  - Heading-Margin, Link-Padding und Link-Font minimal reduzieren
  - optional Icon-Größe leicht kleiner, falls nötig
- Im Carousel:
  - `objectFit: "cover"`
  - `background: "#fff"` entfernen
  - `width`/`height` weiter auf volle Card-Fläche
  - ggf. `objectPosition: "center"` setzen, damit der Bildausschnitt sauber bleibt

### Ergebnis
```text
NACHHER:
+--------------+  +--------------+  +--------------+
| Login        |  | Links        |  | ◄ ●●● ►      |
| ...          |  | ...          |  | [ Bild füllt ]|
| Erstanmeldung|  | letzte Zeile |  | kein Weißrand |
+--------------+  +--------------+  +--------------+
```

### Datei
- `src/pages/Oberbank.tsx`
