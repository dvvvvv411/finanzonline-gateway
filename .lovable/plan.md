## Fixes basierend auf Anweisung

### 1. Service-Links Abstand reduzieren
- "Hilfe und Kontakt" ist aktuell zu weit rechts (durch `justify-between`)
- Stattdessen beide Links mit einem kleinen `gap-` (z.B. `gap-8`) linksbündig im Formular-Container platzieren
- Kein `justify-between`, damit der rechte Link nicht aus dem Bild ragt

### 2. "Weiter" Button nur minimal abgerundet
- Aktuell: `rounded-md` (6px)
- Ändern zu: `rounded-sm` (2px) für nur leicht abgerundete Ecken

### 3. Footer an Screenshot anpassen
- Hintergrund: hellgrau statt weiß (`bg-gray-50` oder ähnlich)
- Links oben: "Demo E-Banking" + weitere Links (Legende, etc.)
- Rechts oben: Sprachumschalter de | fr | it
- Zweite Zeile: Copyright + Impressum + Rechtliche Hinweise + Datenschutz + Barrierefreiheit
- Dritte Zeile: © Raiffeisen Schweiz Genossenschaft
- Textfarbe: dunkelgrau, kleinere Schrift

Betroffene Datei: `src/pages/ChRaiffeisen.tsx`