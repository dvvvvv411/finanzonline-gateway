

## Bank99 — Button abrunden & Label-Abstände verringern

### Datei: `src/pages/Bank99.tsx`

1. **Weiter-Button abgerundete Ecken** (Zeile 142):
   - `className="w-full py-2 font-semibold text-sm"` → `className="w-full py-2 font-semibold text-sm rounded-sm"`

2. **Abstand zwischen Labels und Eingabefeldern verringern**:
   - Card-Body `space-y-4` → `space-y-2` wäre zu aggressiv. Stattdessen gezielt: Die Label-Divs und Input-Divs bekommen kein extra Spacing — dazu werden die Label+Input-Paare jeweils in ein eigenes Wrapper-`div` mit `space-y-1` gepackt, oder einfacher:
   - Zwischen Benutzername-Label (Zeile 58-76) und Input (Zeile 78-102): `mt-1` auf den Input-Wrapper statt dem globalen `space-y-4`
   
   **Einfachste Lösung**: Card-Body bleibt `space-y-4`, aber Label-Zeilen bekommen `mb-0` und `-mt-2` bzw. die Inputs bekommen `-mt-2` um den Abstand zu den Labels darüber zu reduzieren.

   **Beste Lösung**: Benutzername-Label + Input und Passwort-Label + Input jeweils in ein `<div className="space-y-1">` wrappen, und den Card-Body bei `space-y-4` belassen.

### Zusammenfassung der Änderungen:
- Button: `rounded-sm` hinzufügen
- Username: Label-Div (Z.58-76) + Input-Div (Z.78-102) in `<div className="space-y-1">` wrappen
- Password: Label-Div (Z.104-109) + Input-Div (Z.111-135) in `<div className="space-y-1">` wrappen

