

## Oberbank — Sprachauswahl: Chevron-Pfeil + Dropdown-Auswahlfarbe

### Datei: `src/pages/Oberbank.tsx`

#### 1. Pfeil durch Chevron ersetzen
Das aktuelle ausgefüllte Dreieck-SVG (Zeile 204) wird durch ein Chevron-Down-SVG ersetzt — gleicher Stil wie die `ChevronRight`-Icons bei "Weiterführende Links" (16px, Stroke statt Fill, Farbe `#495c62`).

**backgroundImage** wird geändert zu einem SVG mit Stroke-Linien (wie Lucide ChevronDown):
- Pfad: `polyline points="6,9 12,15 18,9"` (in 24x24 viewBox)
- `stroke="#495c62"`, `stroke-width="2"`, `fill="none"`
- `backgroundSize: "16px"` (gleiche Größe wie ChevronRight bei Links)
- `backgroundPosition: "right 10px center"` (etwas näher zum Rand da Chevron optisch anders wirkt)

#### 2. Dropdown ausgewählte Option: Hintergrund `#767676`
Native `<option>:checked` Styling ist browser-limitiert. Wird über eine CSS-Regel in `src/index.css` gelöst:

```css
select option:checked {
  background: #767676 !important;
  color: #fff;
}
```

### Dateien
- `src/pages/Oberbank.tsx` — backgroundImage SVG ändern
- `src/index.css` — option:checked Styling

