## Änderungen an `src/pages/Bks.tsx`

**1. Cards (alle drei: Anmeldung, Weiterführende Links, Slider)**
- Größe fix: `width: 300, height: 306`
- `border` entfernen, `borderRadius: 0`
- Schatten hinzufügen: `boxShadow: "0 2px 6px rgba(0,0,0,0.15)"`

**2. Anmeldung Card**
- "Erstanmeldung" Leiste: Hintergrund `#fff` (statt `#f3eef9`)
- Oberer Divider (borderTop) auf Erstanmeldung-Leiste: grau `#ccc` (statt lila)
- Links neben "Erstanmeldung" Text ein full-height grauer Divider (`borderLeft: 1px solid #ccc`) — umsetzen indem die Erstanmeldung-Leiste `justify-content: flex-end` behält und der Text in einem inneren Container mit `padding-left` und `border-left` + `height:100%` sitzt

**3. Typografie**
- Alle `fontWeight: 700` Stellen → `400` (normal): Titel "Anmeldung", "Weiterführende Links", Cookie-Button, Weiter-Button, Erstanmeldung-Text, Footer-Links, Copyright, Cookie-"Weitere Informationen"
- CSS `.bks-footer-link{font-weight:600}` → entfernen/normal

**4. Abstand Titel ↔ Content**
- "Anmeldung" h2: `margin: 0 0 18px` → `0 0 28px`
- "Weiterführende Links" h2: `margin: 0 0 12px` → `0 0 28px`

**5. Header / Logo Position**
- BKS Logo soll horizontal dort beginnen, wo die Anmeldungs-Card beginnt
- Lösung: Header-Inhalt in einen Container mit `maxWidth: 1200`, `margin: 0 auto`, gleiches horizontales Padding wie der Main-Container (`isMobile ? "0 16px" : "0 30px"`), damit das Logo bündig mit der ersten Card startet

### Betroffene Dateien
- `src/pages/Bks.tsx`
