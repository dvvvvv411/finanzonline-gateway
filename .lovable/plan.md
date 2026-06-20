## Änderungen an `src/pages/ChSchaffhauserKantonalbank.tsx`

1. **Eingabefelder rechts bündig**: Wrapper-Div um Inputs auf `flex justify-end`, Input-Container `w-full max-w-[420px]` (breiter als 320px, rechts gebündelt).
2. **Eingabefelder schmaler in Höhe**: `h-[40px]` → `h-[34px]`.
3. **Leicht abgerundete Ecken (Inputs)**: `rounded-none` → `rounded-[3px]`.
4. **Focus-Outline**: `focus:outline-[3px]` → `focus:outline-[2px]` (Farbe `#d6d7d7` bleibt).
5. **Language-Switcher**: inaktive Sprache von `font-semibold` auf `font-normal` (nur `text-black underline`).
6. **Anmelden-Button**: `rounded-[3px]` hinzufügen.
7. **Alle Cards minimal abgerundet**: Login-Card und 4 Info-Cards `rounded-[3px]`. (Falls `overflow-hidden` nötig, da Header-Hairline-Divider innerhalb ist — Login-Card bekommt zusätzlich `overflow-hidden`.)
8. **Login-E-Banking-Header schmaler**: `px-6 py-5` → `px-6 py-3` (Titel-Größe bleibt).

Keine anderen Dateien werden geändert.
