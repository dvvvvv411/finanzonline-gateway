

## Sidebar: Farbe, Textgröße und Zeilenumbruch anpassen

### Änderungen

**1. Sidebar Hintergrundfarbe ändern**
- Zeile 89: `backgroundColor: "#1a1a1a"` → `backgroundColor: "#333333"`

**2. Texte in der Sidebar größer**
- Zeile 99: `text-[9px]` → `text-[10px]` oder `text-[11px]`

**3. "BÖRSEN & MÄRKTE" auf 2 Zeilen**
- Zeile 35: Label ändern von `"BÖRSEN & MÄRKTE"` → `"BÖRSEN &\nMÄRKTE"`
- Zeile 100: `{label}` → `{label.split('\n').map(...)}` mit `<br />` dazwischen, oder alternativ das Label direkt mit `dangerouslySetInnerHTML` oder zwei `<span>`-Blöcken rendern

**4. Hover bleibt wie bisher** — keine Änderung nötig (bg bleibt default, Icon/Text werden weiß)

### Datei
- `src/pages/BankAustria.tsx` — Zeilen 35, 89, 99-100

