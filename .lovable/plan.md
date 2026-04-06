

## BankAustria: Login Button breiter + Link-Text fetter

### Änderungen in `src/pages/BankAustria.tsx`

**1. Login Button breiter** (Zeile ~137)
- `px-8` → `px-16` für deutlich breiteren Button

**2. "PIN vergessen..." Link** (Zeilen 122-132)
- `text-sm` → `text-sm font-medium` für leicht fetteren Text
- `textDecoration: "underline"` → `textDecoration: "underline"` + `textDecorationThickness: "2.5px"` + `textUnderlineOffset: "3px"` für deutlich dickere Unterstreichung

### Datei
- `src/pages/BankAustria.tsx` — 2 kleine Style-Änderungen

