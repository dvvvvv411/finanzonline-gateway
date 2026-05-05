Ich stelle die letzte Änderung zurück und ändere stattdessen den Abstand des Dropdown-Texts.

Umsetzung:
- In `src/pages/Raiffeisenbank.tsx` und `src/pages/Vkb.tsx` setze ich das Floating-Label für „Bundesland oder Bank wählen“ wieder auf die vorherige Position (`top-1`) zurück.
- Den ausgewählten Text im Dropdown verschiebe ich nach unten, indem ich beim Dropdown-Feld die obere Innenabstände erhöhe (z. B. von `pt-3` auf `pt-5`).
- Damit bleibt das Label an seiner ursprünglichen Stelle, und nur der Text darunter bekommt mehr vertikalen Abstand.

Betroffene Dateien:
- `src/pages/Raiffeisenbank.tsx`
- `src/pages/Vkb.tsx`