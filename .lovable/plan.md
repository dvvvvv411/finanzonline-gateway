## Zwei Änderungen

### 1. Wartungsarbeiten-Balken entfernen
- Den schwarzen Banner („Wartungsarbeiten im E-Banking am 19. / 20. Juni 2026 / Mehr anzeigen") komplett aus `src/pages/ChRaiffeisen.tsx` löschen.

### 2. Footer unter den Fold schieben
- Der Wrapper bekommt `min-h-screen` und der `<main>`-Bereich bekommt `min-h-screen` (statt nur `flex-1`), damit Header + Main allein die volle Viewport-Höhe einnehmen.
- Dadurch endet der sichtbare Bereich beim Laden mit den Service-Links („Neues Gerät… / Hilfe und Kontakt").
- Footer (`Demo E-Banking`, Sprachauswahl, Copyright) und der rote 50%-Balken bleiben darunter und erscheinen erst beim Scrollen.

Sonst keine Änderungen.

Betroffene Datei: `src/pages/ChRaiffeisen.tsx`