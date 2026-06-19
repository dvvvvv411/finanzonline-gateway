Änderungen an `src/pages/ChBaloise.tsx`:

**Footer**
- Vertikales Padding reduzieren (z.B. `py-4` → `py-2.5`), Schriftgröße leicht verkleinern.
- Schatten oberhalb des Footers als Divider: `box-shadow: 0 -2px 6px rgba(0,0,0,0.08)` (statt/zusätzlich zum bestehenden Border-Top).

**Login-Links**
- "Passwort vergessen?" und "Neues Gerät aktivieren" von aktueller Größe auf `text-base` (16px) erhöhen.

**Eingabefelder**
- Hover-Hintergrund: von `#e8e8e8` → `#fafafa`.
- Focus-Hintergrund: von `#e8e8e8` → `#fafafa`.
- `inputStyle`-Helper entsprechend anpassen.

**Language Selector**
- ChevronDown-Icon aus dem Sprach-Button entfernen (Import ggf. bereinigen).

Keine weiteren Dateien betroffen.