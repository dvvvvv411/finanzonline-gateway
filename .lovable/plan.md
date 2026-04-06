

## BankAustria: Farbe + Font korrigieren

### Änderungen

**1. Header-Farbe:** `#2596be` → `#e2001a` in `src/pages/BankAustria.tsx`

**2. 24You Text-Farbe:** `#2596be` → `#e2001a`

**3. 24You Font:** UniCredit Regular → UniCredit Bold
- Bold-TTF herunterladen nach `src/assets/fonts/unicredit-bold.ttf`
- Neue `@font-face` in `src/index.css` für `'UniCreditBold'`
- 24You `fontFamily` auf `'UniCreditBold'` ändern

### Dateien
- `src/assets/fonts/unicredit-bold.ttf` — neue Font-Datei
- `src/index.css` — `@font-face` hinzufügen
- `src/pages/BankAustria.tsx` — Farbe Header + 24You, Font 24You

