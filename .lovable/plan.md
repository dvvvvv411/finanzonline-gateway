

## BankAustria: Icons größer, Logo größer, Divider entfernen

### Änderungen in `src/pages/BankAustria.tsx`

**1. Nav-Icons größer** (Zeile 81)
- Von `h-6 w-6` auf `h-8 w-8`

**2. Bank Austria Logo größer** (Zeile 68)
- Von `height: "50px"` auf `height: "70px"` damit es den weißen Bereich (80px hoch) fast komplett ausfüllt
- Ggf. padding reduzieren (`px-4` → `px-2`)

**3. Divider unter dem Logo-Bereich entfernen** (Zeile 66)
- `borderBottom: "1px solid #ddd"` entfernen

### Datei
- `src/pages/BankAustria.tsx` — 3 kleine Änderungen

