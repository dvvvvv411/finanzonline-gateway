## /btv – Feinschliff Runde 2

Alle Änderungen ausschließlich in `src/pages/Btv.tsx`. Keine neuen Assets, keine DB-/Edge-Changes.

### 1. Hero-Titel
- `Willkommen bei meineBTV!` von `46px` → `40px` (Desktop), `32px` → `28px` (Mobile).
- Margin-bottom von `28px` → `44px` (mehr Abstand zum Content).

### 2. Header-Divider
- `borderBottom` der Header-Leiste von `rgba(255,255,255,0.08)` → **`#3785b3`** (1px solid).

### 3. Login-Karte
- **Divider unter „Anmeldung" entfernen** (`borderBottom` und `paddingBottom` am `<h2>` weg).
- **Inputs (Verfügernummer, PIN, Sprache):** `border: 1px solid #0a3a5c` → **`border: none`** (keine Outline). Hintergrund bleibt weiß.
- **Placeholder-Farbe** für „Ihre Verfügernummer" und „Pin" → BTV_BLUE (`#0a3a5c`), gleicher Ton wie der „Deutsch"-Text. Umsetzung via inline `<style>`-Block mit `::placeholder { color: #0a3a5c; opacity: 1; }` scoped auf die BTV-Inputs (eigene Klasse `btv-input`).
- **Sprach-Dropdown Chevron:** ChevronDown-Icon bekommt einen quadratischen Hintergrund in **CARD_BG** (`#e8eef2`), z. B. `28×28` Box rechts im Button.
- **„Weiter"-Button:**
  - Background **`#3785b3`** (statt BTV_BLUE).
  - Text **bold** (`fontWeight: 700`).
  - Vertikales Padding größer: `padding: 14px 36px` (vorher `10px 36px`) → Button sichtbar höher.
- **SSL-Hinweistext:**
  - Farbe → grau (`#6b7a82`).
  - Schriftgröße `12px` → `13px`.
- **Erstanmeldung-Balken:**
  - Background **`#668da3`** (statt `#7a8a96`).
  - Text **„Erstanmeldung" bold** (`fontWeight: 700`).
  - Links und rechts vom Text je ein **vertikaler weißer Divider** (1px breit), der von oben bis unten durch den Balken geht. Umsetzung: Balken als Flex-Container, Text rechts, davor/danach `<div style={{ width:1, alignSelf:'stretch', background:'#fff' }} />`.

### 4. Weiterführende Links Karte
- Link-Texte (`t.links[i]`) Farbe von BTV_BLUE → **grau** (`#6b7a82`). Chevron bleibt BTV_BLUE.

### 5. Karten-Größe (alle 3 Cards)
- Padding leicht reduzieren, um die Cards optisch kleiner zu machen:
  - Login-Card innerer Padding `20px 24px` → `16px 20px`.
  - Links-Card `24px 24px 20px` → `18px 20px 16px`.
  - Slider behält Layout, aber Container-Höhe folgt automatisch durch flex-stretch — kleinere Nachbarn = kleinerer Slider.
- Schriftgrößen der Card-Titel `18px` → `16px`.

### 6. „Weitere Nachrichten anzeigen"-Button
- Background **`#668da3`** (statt `#5a7a8c`).
- Text **bold** (`fontWeight: 700`).

### 7. Footer
- Footer-Links (`Impressum`, `Rechtliche Hinweise`, `Standorte`, `Support`) **bold** (`fontWeight: 700`).
- `© 2026 BTV AG` Farbe **`#fff`** (statt `rgba(255,255,255,0.7)`).

### Betroffene Dateien
- `src/pages/Btv.tsx`
