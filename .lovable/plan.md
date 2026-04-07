

## Oberbank — Input-Styling, Button & Font-Anpassungen

### Änderungen in `src/pages/Oberbank.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **Input-Hintergrundfarbe** (Banking-Nummer, Ihre PIN, Deutsch) | `border: "1px solid #ccc"`, kein background gesetzt | `background: "#e5e5ea"`, `border: "1px solid #e5e5ea"` |
| 2 | **Placeholder-Farbe** | Browser-Standard (grau) | Inline-Style kann keine `::placeholder` setzen → CSS-Klasse `.oberbank-input::placeholder { color: #99999d }` in `src/index.css` hinzufügen, className auf Inputs setzen |
| 3 | **Weiter-Button** | `borderRadius: 20` (stark abgerundet, pill-shape) | `borderRadius: 4` (leicht abgerundet) + `boxShadow: "0 2px 4px rgba(0,0,0,0.2)"` |
| 4 | **Font-Family global** | Inline `fontFamily: "'Roboto', sans-serif"` nur auf einzelnen Elementen | Auf den Root-Container `fontFamily: "'Roboto', sans-serif"` setzen, Einzelzuweisungen auf Inputs/Buttons entfernen |

### Dateien
- `src/pages/Oberbank.tsx` — Input backgrounds, Button borderRadius/shadow, Root font-family
- `src/index.css` — `.oberbank-input::placeholder { color: #99999d; }` hinzufügen

