

## Volksbank-Seite Anpassungen

### Änderungen in `src/pages/Volksbank.tsx`

**1. Warning-Box entfernen (Zeilen 39-56):** Komplette orange Warnhinweis-Box löschen, `AlertTriangle` Import entfernen.

**2. Blau ändern auf `#196bc1`:**
- Header-Balken (Zeile 32): `#00579B` → `#196bc1`
- Weiter-Button (Zeile 110): `#00579B` → `#196bc1`

**3. Info-Text schwarz (Zeile 59):** `color: "#666"` → `color: "#333"`

**4. Nutzungsbedingungen-Text (Zeilen 94-105):**
- Farbe schwarz (`#333`), Font grösser (`text-sm` statt `text-xs`)
- Link entfernen — "Nutzungsbedingungen" als normaler Text ohne `<a>`

**5. Vergessen-Links (Zeilen 117-132):**
- `underline` entfernen, `hover:underline` hinzufügen

**6. "Anmeldung mit Benutzername" (Zeile 66):**
- `color: "#333"` → `color: "#999"` (gräulicher)

**7. Eingabefeld (Zeilen 81-91):**
- Dunkleres Grau: `backgroundColor: "#f5f5f5"` → `#e8e8e8`
- Dunklerer Border: `borderColor: "#ccc"` → `#999`
- Focus: bläulicher Hintergrund + blaue Outline → `focus:ring-[#196bc1]` + `focus:border-[#196bc1]` + `focus:bg-[#f0f5ff]`

### Datei
- `src/pages/Volksbank.tsx`

