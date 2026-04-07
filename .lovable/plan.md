

## Volksbank Card vertikal zentrieren & Text-Zeilenabstand anpassen

### Änderungen in `src/pages/Volksbank.tsx`

**1. Vertikale Zentrierung (Zeile 21):**
- `items-start` → `items-center` und `py-10` entfernen
- Damit wird die Card sowohl horizontal als auch vertikal zentriert

**2. Info-Text Zeilenabstand enger (Zeile 41):**
- `leading-relaxed` oder Standard-Line-Height → `leading-snug` hinzufügen auf dem `<p>`-Element
- Das bringt die Zeilen des Info-Textes näher zusammen

### Datei
- `src/pages/Volksbank.tsx`

