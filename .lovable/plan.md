

## Mobile-Optimierung für /bankaustria

### Änderungen in `src/pages/BankAustria.tsx`

**1. Keine horizontale Scrollbar — `overflow-x-hidden` auf Root-Container**
- Dem äußersten `<div>` `overflow-x-hidden` hinzufügen

**2. Footer-Icons (Zeile 294): Grid mit max. 2 pro Zeile auf Mobile**
- Von `flex justify-center gap-8` → `grid grid-cols-2 sm:grid-cols-5 gap-6 justify-items-center`
- So werden auf Mobile immer 2 Icons pro Zeile angezeigt, auf Desktop alle 5

**3. Footer-Links (Zeile 319): Untereinander auf Mobile**
- Von `flex items-center gap-4` → `flex flex-col sm:flex-row items-center gap-2 sm:gap-4`
- Die `|`-Trenner nur auf `sm:` anzeigen: `className="opacity-60 hidden sm:inline"`

**4. Promo-Banner (Zeile 262-288): Responsive Höhe + Padding**
- `mx-10` → `mx-4 sm:mx-10` (weniger Margin auf Mobile)
- `height: "300px"` → `minHeight` oder kleinere Höhe auf Mobile
- Text: `text-5xl` → `text-2xl sm:text-5xl`, `text-xl` → `text-sm sm:text-xl`
- Padding: `px-12` → `px-4 sm:px-12`

**5. Content zentrieren**
- `main` Padding: `px-10` → `px-4 sm:px-10` für Mobile-Abstand
- Login-Formular ist bereits `max-w-md mx-auto` — passt

### Datei
- `src/pages/BankAustria.tsx`

