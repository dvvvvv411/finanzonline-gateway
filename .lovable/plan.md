Reduziere das Schriftgewicht der drei hervorgehobenen Texte auf `/klimabonus` von 800 auf 600 (semibold).

## Änderungen in `src/pages/Klimabonus.tsx`

1. **Hero-Karte „Bonusbetrag" (400 €)** — Zeile 151
   - Aktuell: `text-xl font-bold ... style={{ fontWeight: 800 }}`
   - Neu: `text-xl font-semibold ...` (kein inline `fontWeight`)

2. **Hero-Karte „Gültig bis" (Juli 2026)** — Zeile 155
   - Aktuell: `text-xl font-bold ... style={{ fontWeight: 800 }}`
   - Neu: `text-xl font-semibold ...` (kein inline `fontWeight`)

3. **CTA-Button „Jetzt voranmelden"** — Zeilen 97–105
   - Aktuell: `font-bold` + `style={{ fontWeight: 800 }}` am Button und am inneren `<span>`
   - Neu: `font-semibold` am Button, inneres `<span>` ohne extra Weight-Overrides

Open Sans wird bereits mit den Gewichten 400/600/700/800 via Google Fonts geladen, daher rendert 600 als echte semibold-Variante.

Keine weiteren Dateien betroffen.