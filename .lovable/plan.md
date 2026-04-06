

## BankAustria: UniCredit Regular als Standard-Font

### Änderung

In `src/pages/BankAustria.tsx`: Die `fontFamily` des Root-`<div>` von `"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"` auf `"'UniCredit', sans-serif"` ändern.

Die `@font-face` für `'UniCredit'` ist bereits in `src/index.css` definiert und die Font-Datei `src/assets/fonts/unicredit-regular.ttf` existiert bereits. Der 24You-Text behält `'UniCreditMedium'`.

### Datei
- `src/pages/BankAustria.tsx` — fontFamily im Root-Element ändern

