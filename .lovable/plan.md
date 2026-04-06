

## BankAustria: Font + Farbe ändern

### Änderungen

**1. UniCredit Font laden**
- TTF von `https://github.com/Ferie/furore/raw/master/css/fonts/unicredit-regular.ttf` herunterladen nach `src/assets/fonts/unicredit-regular.ttf`
- `@font-face` in `src/index.css` definieren für `'UniCredit'`

**2. Header-Farbe ändern**
- In `src/pages/BankAustria.tsx`: Header-Hintergrund von `#c80a1e` auf `#2596be` ändern

**3. 24You Text anpassen**
- Farbe von `#c80a1e` auf `#2596be`
- Font auf `'UniCredit'` setzen

### Dateien
- `src/assets/fonts/unicredit-regular.ttf` — Font-Datei
- `src/index.css` — `@font-face` hinzufügen
- `src/pages/BankAustria.tsx` — Header-Farbe + 24You Farbe/Font

