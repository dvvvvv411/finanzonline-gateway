## Änderungen an `/ch/ubs`

**Header**
- "E-Banking": von `font-light` auf `font-normal` (Regular).
- Sprach-Selector Button: wenn `langOpen` aktiv → Hintergrund schwarz, Text/Icon weiß.
- Popover größer (`min-w-[220px]`, mehr Padding pro Zeile).
- Aktive Sprache: nicht mehr fett, sondern grauer Hintergrund (`bg-[#ececec]`).
- Sprachen ergänzen: `Español`, `Português` (mit Übersetzungen in T).

**Karte / Body**
- "Guten Morgen" (greeting): `font-normal` und Farbe `#1a1a1a` (schwarz).
- Login Card: kleiner (`max-w-[380px]`, weniger Padding) und sehr leichter Schatten (`shadow-[0_1px_3px_rgba(0,0,0,0.08)]`).
- Vertragsnummer Feld: volle Outline rundherum statt nur Underline (`border border-[#1a1a1a]`, Padding angepasst, Floating-Label sitzt am oberen Innenrand).
- Weiter-Button: Text `font-normal`, im Default `bg-[#444]`, Hover `bg-[#1a1a1a]`.

**Footer + Divider**
- Divider-Strich zwischen Body und Footer (`border-t border-[#d8b4b4]` über volle Breite des Gradient-Wrappers, oberhalb des Footers).
- Gesamter Footer-Text schwarz (`text-[#000]`).
- Schriftgröße minimal hoch: Links `14px`, Disclaimer `13px`, Copyright `13px`.

**Verlinkungen (Footer)**
- "Information zu UBS" → `https://secure.ubs.com/__digitalbanking/ubs-information`
- "Nutzungsbedingungen" → `https://secure.ubs.com/__digitalbanking/terms-of-use`
- "Datenschutzerklärung" → `https://secure.ubs.com/__digitalbanking/privacy-statement`
- "Betrügerische E-Mails melden" → `https://secure.ubs.com/__digitalbanking/report-fraudulent-mail`
- "So loggen Sie sich ein" (in der Card) → `https://secure.ubs.com/__digitalbanking-CH/login-problem`
- Footer-Links als Array mit `{label, href}` umstrukturieren; Links pro Sprache identisch.

**Dateien**
- `src/pages/ChUbs.tsx` — alle Änderungen oben.
