

## BAWAG Seite: Verfüger-Tab & Card-Höhe anpassen

### Änderungen in `src/pages/Bawag.tsx`

**1. Verfüger-Tab full width + zentriert**
- Zeile 60-64: Die `<div className="mb-4">` bekommt `text-center` und der `<span>` mit "Verfüger" wird als `inline-block` zentriert dargestellt
- Statt links angeheftet → mittig im Card

**2. Login Card Höhe reduzieren**
- Zeile 52: `min-h-[420px]` → `min-h-[380px]` (etwas kürzer)

### Datei
- `src/pages/Bawag.tsx` — 2 kleine Änderungen

