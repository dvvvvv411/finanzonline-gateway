

## Oberbank — Erstanmeldung Divider + PIN-Icons + Text-Styling

### Datei: `src/pages/Oberbank.tsx`

#### 1. Erstanmeldung: Vertikale Divider links und rechts
Der Erstanmeldung-Footer-Bereich (Zeilen 222-243) wird umgebaut: Das Layout bekommt links und rechts vom Text "Erstanmeldung" jeweils einen vertikalen Divider (`border-left` / `border-right` in Farbe `#e0e0e0`), die vom oberen Divider (borderTop) bis zum unteren Card-Rand reichen. Umsetzung: "Erstanmeldung" in ein Element mit `borderLeft: "1px solid #e0e0e0"` und `borderRight: "1px solid #e0e0e0"` wrappen, `height: "100%"`, `padding: "0 20px"`, zentriert. Der äußere Container behält `justifyContent: "flex-end"` und bekommt eine feste Höhe damit die Divider sichtbar sind.

#### 2. PIN-Icons: Custom SVG statt Eye/EyeOff
Die `Eye`/`EyeOff`-Icons (Zeile 176) werden durch custom inline SVGs ersetzt:
- **Anzeigen**: Ein Kreis mit einem kurzen Strich oben (wie ein Lollipop/Pin-Symbol)
- **Ausblenden**: Dasselbe Symbol mit einem diagonalen Strich von oben-links nach unten-rechts

Die Icons werden als inline `<svg>` Elemente gerendert (16×16), Farbe `#495c62`.

#### 3. Erstanmeldung Text: kleiner + bold
- `fontSize: 14` → `fontSize: 12`
- `fontWeight` hinzufügen: `700`

### Datei
- `src/pages/Oberbank.tsx`

