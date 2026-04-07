

## Easybank — Hilfe Link Fix

### Änderungen in `src/pages/Easybank.tsx`

**Zeile 159** — Hilfe Link im Header:
- URL: `https://www.easybank.at/easybank/services/easy-banking#ebankinghilfe`
- `target="_blank" rel="noopener noreferrer"`
- `e.preventDefault()` entfernen
- Hover: `hover:underline` → `hover:font-bold` (kein Underline, stattdessen Bold)

### Datei
- `src/pages/Easybank.tsx`

