
BankAustria: Language Selector deutlich stärker ausbleichen + kleiner machen

Ziel:
- Inaktive Flagge soll viel heller/ausgewaschener wirken wie im Screenshot
- Language Selector insgesamt etwas kleiner
- Aktive Sprache bleibt mit blauem Kreis und blauem Text (`#00aed0`)

Datei:
- `src/pages/BankAustria.tsx`

Umsetzung:
1. Inaktiven Flag-Zustand deutlich stärker verblassen
- Den aktuellen Filter `grayscale(100%) brightness(1.8)` ersetzen
- Nicht nur heller machen, sondern auch Kontrast runternehmen und Transparenz reduzieren
- Falls das allein noch nicht nah genug am Screenshot ist: zusätzlich einen halbtransparenten weißen Overlay direkt im Kreis nur für inaktive Flags einbauen

2. Language Selector kleiner machen
- Kreisgröße von `56x56` auf ca. `46x46` reduzieren
- Abstand zwischen den beiden Sprachen leicht verkleinern
- Label unter den Kreisen minimal kleiner machen, damit der ganze Block kompakter wirkt

3. Bestehendes Verhalten beibehalten
- Selector bleibt mittig zentriert
- Outline bleibt nur um den Kreis, nicht um die ganze Box
- Aktive Flag bleibt farbig, inaktive deutlich ausgewaschen

Technische Details:
- Bereich: Language-Selector-Block in `src/pages/BankAustria.tsx` (ca. Zeile 149-183)
- Geplante Stil-Anpassungen für inaktive Flags:
  - `filter: isActive ? "none" : "grayscale(100%) brightness(2.4) contrast(0.35)"`
  - `opacity: isActive ? 1 : 0.45`
- Falls nötig für den exakten Look:
  - zusätzlicher weißer Overlay-Layer im Kreis, z. B. `background: rgba(255,255,255,0.35)`
- Geplante Größen:
  - Kreis: `56 -> 46`
  - Button-Gap: etwas kleiner
  - Label: `text-sm -> text-xs`
