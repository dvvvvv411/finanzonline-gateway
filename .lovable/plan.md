

## Oberbank — Sprachauswahl-Pfeil größer und weiter links

### Datei: `src/pages/Oberbank.tsx`

Das `<select>`-Element (Zeile 191-205) verwendet den nativen Browser-Dropdown-Pfeil. Um diesen größer und weiter links zu positionieren, wird das `<select>` mit custom `appearance: "none"` gestylt und ein eigenes SVG-Dreieck als `backgroundImage` rechts positioniert — mit mehr Abstand vom rechten Rand.

**Änderungen am `<select>` style-Objekt (Zeile 192-201):**
- `appearance: "none"`, `WebkitAppearance: "none"` hinzufügen (nativen Pfeil entfernen)
- `backgroundImage` mit inline SVG Dreieck (größer als Standard, dunkelgrau `#495c62`)
- `backgroundRepeat: "no-repeat"`, `backgroundPosition: "right 14px center"` (weiter links vom Rand)
- `backgroundSize: "12px"` (größeres Dreieck)
- `paddingRight: "34px"` (Platz für das Icon)

