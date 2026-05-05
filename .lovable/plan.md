## Änderungen an `src/pages/Bks.tsx`

**1. Cookie-Banner Inhalt linksbündig zum Logo**
- Cookie-Banner Inhalt in einen inneren Container packen mit `maxWidth: 1200`, `margin: 0 auto`, Padding `0 30px` (mobile `0 16px`) — analog zum Header. Banner-Hintergrund bleibt full-width lila.
- `justifyContent: "space-between"` damit Schließen-Button rechts bleibt.

**2. Footer**
- `© 2026 BKS Bank AG` Zeile entfernen (das `<div>` mit `t.copyright`).
- Footer-Links (Impressum, AGB, etc.) bold: CSS-Regel `.bks-footer-link` um `font-weight:700` ergänzen.

**3. Schatten an Header/Footer Dividers**
- Header: aktueller `borderBottom: "1px solid #eee"` ersetzen durch starken Schatten `boxShadow: "0 4px 8px rgba(0,0,0,0.15)"` (border entfernen).
- Footer: aktueller `borderTop: "1px solid #eee"` ersetzen durch `boxShadow: "0 -4px 8px rgba(0,0,0,0.15)"` (border entfernen).

**4. Anmeldung Card — Weiter-Button schmaler**
- Padding `12px 36px` → `8px 28px` damit Erstanmeldung-Leiste wieder im 306px-Container sichtbar ist.

**5. Card-Titel bold**
- "Anmeldung" h2: `fontWeight: 400` → `700`
- "Weiterführende Links" h2: `fontWeight: 400` → `700`

**6. Hover-Farbe der weiterführenden Links**
- CSS-Regel `.bks-link-row:hover .bks-link-text{opacity:0.7;}` ändern zu `.bks-link-row:hover .bks-link-text{color:${PINK};}` damit beim Hover die Textfarbe pink wird.

### Betroffene Dateien
- `src/pages/Bks.tsx`
