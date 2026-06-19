## Feinschliff `/ch/ubs`

- Header "E-Banking": `font-normal` → `font-bold`.
- Vertragsnummer-Input: Floating Label bleibt INNERHALB der Outline (kein `-top-2` mehr; stattdessen `top-1` mit kleinerer Schrift, kein weißer Hintergrund-Cutout). Input bekommt etwas mehr `pt-`, damit Wert und Label nicht kollidieren.
- Vertragsnummer-Input Outline: im Fokus `border-2` (statt `border`), Padding leicht angepasst um Layout-Shift zu vermeiden (z.B. via `outline` statt border-width-Wechsel: `focus` setzt `border-[#1a1a1a] border-2 -m-px`).
- Weiter-Button: `font-normal` → `font-bold`.
- Info-Icon (`lucide Info`): dünnerer Kreis via `strokeWidth={1.25}` (statt Default 2).
- Divider zwischen Body und Footer: 10px Abstand links/rechts (`mx-[10px]`).

Datei: `src/pages/ChUbs.tsx`.
