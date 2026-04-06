

## BankAustria: Underline, Eingabefelder, Abstand anpassen

### Änderungen in `src/pages/BankAustria.tsx`

**1. Underline schmaler + höher** (Zeilen 129-130)
- `textDecorationThickness: "2.5px"` → `"1.5px"`
- `textUnderlineOffset: "3px"` → `"1px"` (höher = näher am Text, g-Buchstaben brechen die Linie)

**2. Eingabefelder dünnere Border** (Zeilen 106, 117)
- `border: "2px solid #ccc"` → `"1px solid #ccc"`

**3. Mehr Abstand zwischen Header und 24You** (Zeile 91)
- `py-8` → `pt-14 pb-8` für mehr Abstand oben

### Datei
- `src/pages/BankAustria.tsx` — 4 kleine Style-Änderungen

