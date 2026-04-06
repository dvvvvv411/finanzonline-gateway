

## Bilder bei Aktuelles abrunden und mehr Höhe

### Problem
Die Bilder haben `overflow-hidden` auf dem Bild-Container, aber die Abrundung (`rounded-lg`) ist nur auf dem äußeren `<a>`-Tag. Dadurch sieht man die abgerundeten Ecken nicht am Bild selbst. Außerdem ist `aspect-[16/10]` zu flach — Bilder werden abgeschnitten.

### Änderungen in `src/pages/Index.tsx`

1. **Zeile 293**: Bild-Container `rounded-lg` hinzufügen, damit alle 4 Ecken des Bildes sichtbar abgerundet sind:
   `<div className="aspect-[4/3] w-full overflow-hidden rounded-lg">`

2. **Aspect Ratio**: Von `aspect-[16/10]` auf `aspect-[4/3]` ändern — gibt mehr Höhe, sodass Bilder weniger abgeschnitten werden

### Datei
- `src/pages/Index.tsx` — eine Zeile ändern

